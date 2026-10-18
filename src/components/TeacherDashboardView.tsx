import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Users, 
  Download, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  FileSpreadsheet, 
  Printer, 
  GraduationCap, 
  Layers, 
  Clock, 
  Database, 
  RotateCcw,
  Sparkles,
  Award,
  ChevronRight,
  ChevronDown,
  Settings,
  School,
  Mail,
  UserCheck,
  AlertTriangle,
  AlertCircle,
  Trash2,
  Shield,
  ShieldCheck,
  Key,
  Calendar,
  BadgeCheck,
  Edit3,
  Phone,
  Image as ImageIcon
} from 'lucide-react';
import { TeacherClassOverview, TeacherStudentSummary, UserProfile } from '../types/auth';
import { 
  fetchTeacherOverview, 
  deleteStudentAccount
} from '../services/api';

interface TeacherDashboardViewProps {
  currentUser?: UserProfile | null;
  onRefresh?: () => void;
  onOpenHeroSettings?: () => void;
  onOpenContactSettings?: () => void;
  onOpenBrandingSettings?: () => void;
  onNavigateToUsers?: () => void;
  showScoreRecap?: boolean;
}

export const TeacherDashboardView: React.FC<TeacherDashboardViewProps> = ({ 
  currentUser, 
  onRefresh, 
  onOpenHeroSettings,
  onOpenContactSettings,
  onOpenBrandingSettings,
  onNavigateToUsers,
  showScoreRecap = true
}) => {
  const [data, setData] = useState<TeacherClassOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<TeacherStudentSummary | null>(null);

  // Active section state: 'grades' (Rekapitulasi Nilai), 'users' (Daftar Pengguna)
  const [activeSection, setActiveSection] = useState<'grades' | 'users'>('grades');

  // Pagination states
  const [studentPage, setStudentPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // State for Registered User List (Admin View)
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'siswa' | 'guru' | 'admin'>('all');
  const [userVerificationFilter, setUserVerificationFilter] = useState<'all' | 'verified' | 'unverified'>('all');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Dropdown Action Menu state
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setIsActionMenuOpen(false);
      }
    };
    if (isActionMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActionMenuOpen]);


  const schoolOptions = useMemo(() => {
    if (!data?.students) return [];
    const set = new Set<string>();
    data.students.forEach(s => {
      if (s.role !== 'admin' && s.asalSekolah) set.add(s.asalSekolah);
    });
    return Array.from(set);
  }, [data?.students]);

  // Filtered students (Excludes Admin accounts from Peserta / Siswa)
  const filteredStudents = useMemo(() => {
    if (!data?.students) return [];
    return data.students.filter(s => {
      if (s.role === 'admin') return false;
      const matchSearch = 
        s.namaLengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.asalSekolah.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSchool = selectedSchool === 'all' || s.asalSekolah === selectedSchool;
      return matchSearch && matchSchool;
    });
  }, [data?.students, searchQuery, selectedSchool]);

  // Apply student pagination
  const paginatedStudents = useMemo(() => {
    const start = (studentPage - 1) * ITEMS_PER_PAGE;
    return filteredStudents.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredStudents, studentPage]);

  // Filter for students currently online opening the application
  const onlineStudentsList = useMemo(() => {
    return filteredStudents.filter(s => Boolean(s.isOnline));
  }, [filteredStudents]);

  const paginatedOnlineStudents = useMemo(() => {
    const start = (studentPage - 1) * ITEMS_PER_PAGE;
    return onlineStudentsList.slice(start, start + ITEMS_PER_PAGE);
  }, [onlineStudentsList, studentPage]);

  // Top 10 Students who completed the most modules and passed (tuntas >= 75)
  const top10Students = useMemo(() => {
    if (!data?.students) return [];
    const studentList = data.students.filter(s => s.role !== 'admin');
    const sorted = [...studentList].sort((a, b) => {
      const aTuntas = [1, 2, 3, 4, 5, 6, 7, 8].filter(w => (a.moduleScores[w] ?? 0) >= 75).length;
      const bTuntas = [1, 2, 3, 4, 5, 6, 7, 8].filter(w => (b.moduleScores[w] ?? 0) >= 75).length;
      if (bTuntas !== aTuntas) return bTuntas - aTuntas;

      const aComp = a.completedModulesCount || 0;
      const bComp = b.completedModulesCount || 0;
      if (bComp !== aComp) return bComp - aComp;

      const aAvg = a.averageScore || 0;
      const bAvg = b.averageScore || 0;
      if (bAvg !== aAvg) return bAvg - aAvg;

      return a.namaLengkap.localeCompare(b.namaLengkap);
    });
    return sorted.slice(0, 10);
  }, [data?.students]);



  // Filtered Registered Users (Admin View)
  const filteredUsersList = useMemo(() => {
    if (!data?.students) return [];
    return data.students.filter(u => {
      const q = userSearchQuery.toLowerCase();
      const matchSearch =
        u.namaLengkap.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.asalSekolah.toLowerCase().includes(q) ||
        u.userId.toLowerCase().includes(q);

      const userRole = u.role || 'siswa';
      const matchRole = userRoleFilter === 'all' || userRole === userRoleFilter;

      const matchVerification =
        userVerificationFilter === 'all' ||
        (userVerificationFilter === 'verified' && u.isVerified) ||
        (userVerificationFilter === 'unverified' && !u.isVerified);

      return matchSearch && matchRole && matchVerification;
    });
  }, [data?.students, userSearchQuery, userRoleFilter, userVerificationFilter]);

  // Apply user pagination
  const paginatedUsersList = useMemo(() => {
    const start = (userPage - 1) * ITEMS_PER_PAGE;
    return filteredUsersList.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredUsersList, userPage]);

  // Pagination helpers
  const Pagination = ({ 
    currentPage, 
    totalItems, 
    onPageChange,
    label = 'data'
  }: { 
    currentPage: number; 
    totalItems: number; 
    onPageChange: (p: number) => void;
    label?: string;
  }) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    if (totalPages <= 1) return null;
    const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3 border-t border-slate-100 dark:border-slate-800 text-xs bg-slate-50/50 dark:bg-slate-800/40">
        <span className="text-slate-500 font-medium">
          Menampilkan {startItem} - {endItem} dari {totalItems} {label}
        </span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onPageChange(Math.max(1, currentPage - 1))} 
            disabled={currentPage === 1} 
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors shadow-2xs"
          >
            Sebelumnya
          </button>
          <span className="font-bold text-slate-800 dark:text-slate-200 px-2">
            {currentPage} / {totalPages}
          </span>
          <button 
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} 
            disabled={currentPage === totalPages} 
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors shadow-2xs"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    );
  };





  const isAdmin = currentUser?.role === 'admin';
  const isStudent = currentUser?.role === 'siswa';

  const loadData = async () => {
    setIsLoading(true);
    const result = await fetchTeacherOverview(currentUser?.email, currentUser?.role);
    setData(result);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [currentUser?.email, currentUser?.role]);

  // Delete student account
  const handleDeleteStudent = async (student: TeacherStudentSummary) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus data siswa "${student.namaLengkap}" (${student.email}) beserta seluruh riwayat nilainya?`)) {
      return;
    }
    setActionFeedback(null);
    const res = await deleteStudentAccount(student.userId);
    if (res.success) {
      setActionFeedback(`Data siswa "${student.namaLengkap}" berhasil dihapus.`);
      if (selectedStudent?.userId === student.userId) {
        setSelectedStudent(null);
      }
      await loadData();
    } else {
      setActionFeedback(`Gagal menghapus siswa: ${res.message || 'Terjadi kesalahan'}`);
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  const handleDownloadCsv = () => {
    window.open('/api/teacher/export-csv', '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Action Feedback Notification */}
      {actionFeedback && (
        <div className="p-4 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-2xl text-xs font-semibold text-blue-900 dark:text-blue-200 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{actionFeedback}</span>
          </div>
          <button 
            onClick={() => setActionFeedback(null)}
            className="text-xs font-bold hover:underline cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Container 1: Header Title & Actions Banner */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <GraduationCap className="w-4 h-4" />
              <span>{isStudent ? 'Rapor Nilai Siswa TJKT' : 'Portal Guru & Instruktur TJKT'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {isStudent ? 'Rekapitulasi Nilai Saya' : 'Dasbor Pemantauan & Rekap Nilai Siswa'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {isStudent 
                ? 'Pantau rekam jejak pengerjaan modul, hasil kuis, dan status verifikasi akun Anda.'
                : 'Pantau rekam jejak pengerjaan modul, hasil kuis, dan status verifikasi email siswa secara terpusat dari basis data MySQL.'
              }
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            {/* Single Consolidated Dropdown Action Button */}
            <div className="relative" ref={actionMenuRef}>
              <button
                type="button"
                onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-xs transition-colors cursor-pointer"
                title="Buka menu aksi dan pengaturan"
                aria-expanded={isActionMenuOpen}
              >
                <Settings className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Menu Aksi & Pengaturan</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isActionMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isActionMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {!isStudent && (
                    <>
                      <div className="px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Pengaturan Tampilan
                      </div>

                      {onOpenContactSettings && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsActionMenuOpen(false);
                            onOpenContactSettings();
                          }}
                          className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer text-left"
                        >
                          <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/80 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                            <Phone className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 dark:text-slate-200">Pengaturan Kontak</div>
                            <div className="text-[10px] text-slate-400 font-normal">Kontak bantuan WhatsApp & email</div>
                          </div>
                        </button>
                      )}

                      {onOpenBrandingSettings && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsActionMenuOpen(false);
                            onOpenBrandingSettings();
                          }}
                          className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer text-left"
                        >
                          <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                            <ImageIcon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 dark:text-slate-200">Pengaturan Logo & Favicon</div>
                            <div className="text-[10px] text-slate-400 font-normal">Logo header, favicon, & simpan ke database</div>
                          </div>
                        </button>
                      )}

                      {onOpenHeroSettings && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsActionMenuOpen(false);
                            onOpenHeroSettings();
                          }}
                          className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer text-left"
                        >
                          <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                            <Edit3 className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 dark:text-slate-200">Pengaturan Hero</div>
                            <div className="text-[10px] text-slate-400 font-normal">Teks banner beranda depan</div>
                          </div>
                        </button>
                      )}

                      <div className="my-1.5 border-t border-slate-100 dark:border-slate-800" />
                    </>
                  )}

                  <div className="px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Ekspor & Cetak
                  </div>

                  {!isStudent && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsActionMenuOpen(false);
                        handleDownloadCsv();
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">Ekspor Excel / CSV</div>
                        <div className="text-[10px] text-slate-400 font-normal">Unduh rekap nilai & data siswa</div>
                      </div>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setIsActionMenuOpen(false);
                      handlePrint();
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 shrink-0">
                      <Printer className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">Cetak Rekap</div>
                      <div className="text-[10px] text-slate-400 font-normal">Cetak fisik atau simpan PDF</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Refresh Data Button */}
            <button
              type="button"
              onClick={loadData}
              className="p-2.5 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title="Segarkan Data"
            >
              <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* Container 2: Quick Summary Stats Grid (Transparent Outer Container) */}
      <section className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
              {isStudent ? 'Siswa' : 'Total Siswa Terdaftar'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1 block">
              {data?.totalStudents || 0}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">Status Verifikasi</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
              {isStudent ? (data?.students?.[0]?.isVerified ? 'Aktif' : 'Pending') : `${data?.verifiedStudents || 0}`}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
              {isStudent ? 'Modul Diselesaikan' : 'Total Ujian Selesai'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 mt-1 block">
              {isStudent ? `${data?.students?.[0]?.completedModulesCount || 0} / 8` : (data?.totalExamsTaken || 0)}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
              {isStudent ? 'Rata-Rata Nilai' : 'Rata-Rata Angkatan'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-amber-500 mt-1 block">
              {isStudent ? `${data?.students?.[0]?.averageScore || 0}%` : `${data?.classAverageScore ? data.classAverageScore : 0}%`}
            </span>
          </div>
        </div>
      </section>

      {/* Search Bar & Rekapitulasi Nilai Table */}
      {showScoreRecap ? (
        <>
          {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama siswa, email, atau asal sekolah..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="py-2 px-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-300 cursor-pointer w-full sm:w-auto"
          >
            <option value="all">Semua Asal Sekolah ({schoolOptions.length})</option>
            {schoolOptions.map(sch => (
              <option key={sch} value={sch}>{sch}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Student Performance Table with Score Recap (Modul 1 s.d. 8) */}
      <div id="section-students" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isStudent ? 'Rekapitulasi Nilai Saya (Modul 1 s.d. 8)' : 'Rekapitulasi Nilai Modul 1 s.d. 8'}
            </h3>
            <p className="text-xs text-slate-500">
              Ambang batas nilai kelulusan kompeten: &ge; 75.0 poin
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {filteredStudents.length} {isStudent ? 'Siswa (Anda)' : 'Siswa Terpilih'}
          </span>
        </div>

        {/* Tampilan Mobile: Grid Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-3 p-4 bg-slate-50/50 dark:bg-slate-900/50">
          {paginatedStudents.length === 0 ? (
            <div className="col-span-full py-8 text-center text-slate-400 text-xs">
              Tidak ada data siswa yang cocok dengan pencarian.
            </div>
          ) : (
            paginatedStudents.map((s) => {
              const tuntasCount = [1, 2, 3, 4, 5, 6, 7, 8].filter(w => (s.moduleScores[w] ?? 0) >= 75).length;
              const belumTuntasCount = 8 - tuntasCount;

              return (
                <div 
                  key={s.userId}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="font-extrabold text-slate-900 dark:text-white uppercase text-xs flex items-center gap-1.5">
                        <span>{s.namaLengkap}</span>
                        {s.email === currentUser?.email && (
                          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded normal-case">Anda</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <School className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="uppercase">{s.asalSekolah}</span>
                      </div>
                    </div>
                    {s.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Aktif</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full shrink-0">
                        <Clock className="w-3 h-3" />
                        <span>Pending</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      {belumTuntasCount === 0 ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          0 Belum Tuntas (Tuntas)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                          {belumTuntasCount} Modul Belum Tuntas
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedStudent(s)}
                        className="px-2.5 py-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer"
                      >
                        Detail Rapor
                      </button>
                      {!isStudent && (
                        <button
                          onClick={() => handleDeleteStudent(s)}
                          title="Hapus Data Siswa"
                          className="p-1.5 text-rose-600 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Tampilan Desktop: Tabel */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4">Nama Siswa & Sekolah</th>
                <th className="py-3 px-3 text-center">Verifikasi</th>
                <th className="py-3 px-2.5 text-center">M1</th>
                <th className="py-3 px-2.5 text-center">M2</th>
                <th className="py-3 px-2.5 text-center">M3</th>
                <th className="py-3 px-2.5 text-center">M4</th>
                <th className="py-3 px-2.5 text-center">M5</th>
                <th className="py-3 px-2.5 text-center">M6</th>
                <th className="py-3 px-2.5 text-center">M7</th>
                <th className="py-3 px-2.5 text-center">M8</th>
                <th className="py-3 px-3 text-center">Belum Tuntas</th>
                <th className="py-3 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-slate-400">
                    Tidak ada data siswa yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((s) => {
                  const tuntasCount = [1, 2, 3, 4, 5, 6, 7, 8].filter(w => (s.moduleScores[w] ?? 0) >= 75).length;
                  const belumTuntasCount = 8 - tuntasCount;

                  return (
                    <tr 
                      key={s.userId} 
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span className="uppercase">{s.namaLengkap}</span>
                          {s.email === currentUser?.email && (
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded normal-case">Anda</span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <School className="w-3 h-3 text-slate-400" />
                          <span className="uppercase">{s.asalSekolah}</span>
                        </div>
                      </td>

                      <td className="py-3 px-3 text-center">
                        {s.isVerified ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Aktif</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
                            <Clock className="w-3 h-3" />
                            <span>Pending</span>
                          </span>
                        )}
                      </td>

                      {/* Modules 1 to 8 Scores */}
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(w => {
                        const score = s.moduleScores[w];
                        return (
                          <td key={w} className="py-3 px-2.5 text-center font-mono">
                            {score !== undefined ? (
                              <span className={`px-1.5 py-0.5 rounded font-bold ${
                                score >= 75 
                                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40' 
                                  : 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
                              }`}>
                                {score.toFixed(0)}
                              </span>
                            ) : (
                              <span className="text-slate-300 dark:text-slate-600">-</span>
                            )}
                          </td>
                        );
                      })}

                      {/* Jumlah Modul Belum Tuntas */}
                      <td className="py-3 px-3 text-center">
                        {belumTuntasCount === 0 ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                            0 Modul (Tuntas)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                            {belumTuntasCount} Modul
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedStudent(s)}
                            className="px-2.5 py-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 rounded-lg cursor-pointer transition-colors"
                          >
                            Rapor
                          </button>

                          {!isStudent && (
                            <button
                              onClick={() => handleDeleteStudent(s)}
                              title="Hapus Data Siswa"
                              className="p-1 text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <Pagination currentPage={studentPage} totalItems={filteredStudents.length} onPageChange={setStudentPage} label="siswa" />
        </div>
      </div>
    </>
  ) : (
    /* Section: Dashboard Admin Overview (Top 10 Siswa Tuntas & List Siswa Online) */
    <div className="space-y-8">
      {/* Container 1: Daftar 10 Siswa Paling Banyak Menyelesaikan Modul & Tuntas */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Header Banner Top 10 */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-50/50 via-white to-blue-50/30 dark:from-amber-950/20 dark:via-slate-900 dark:to-blue-950/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Daftar 10 Siswa Paling Banyak Menyelesaikan Modul & Tuntas
                </h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800">
                  <Award className="w-3 h-3 text-amber-500" />
                  <span>Top 10 Leaderboard</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Peringkat 10 siswa terbaik berdasarkan jumlah modul tuntas (nilai ≥ 75), total modul diselesaikan, dan rata-rata nilai.
              </p>
            </div>
          </div>
        </div>

        {/* Tampilan Mobile: Grid Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-3 p-4 bg-slate-50/50 dark:bg-slate-900/50">
          {top10Students.length === 0 ? (
            <div className="col-span-full py-8 text-center text-slate-400 text-xs">
              Belum ada data pengerjaan modul siswa.
            </div>
          ) : (
            top10Students.map((s, idx) => {
              const rank = idx + 1;
              return (
                <div 
                  key={s.userId}
                  className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-3 ${
                    rank === 1 ? 'border-amber-300 dark:border-amber-700/60 ring-1 ring-amber-400/20' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="font-extrabold text-slate-900 dark:text-white uppercase text-xs">
                        {s.namaLengkap}
                      </div>
                    </div>
                    {rank === 1 ? (
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-amber-500 text-white font-black text-xs shadow-xs shrink-0">
                        🥇 #1
                      </span>
                    ) : rank === 2 ? (
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white font-black text-xs shadow-xs shrink-0">
                        🥈 #2
                      </span>
                    ) : rank === 3 ? (
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-amber-700 text-white font-black text-xs shadow-xs shrink-0">
                        🥉 #3
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs shrink-0">
                        #{rank}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="uppercase text-[11px]">{s.asalSekolah || '-'}</span>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => setSelectedStudent(s)}
                      className="w-full sm:w-auto px-3 py-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer text-center"
                    >
                      Detail Rapor
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteStudent(s)}
                        title="Hapus Siswa"
                        className="p-1.5 text-rose-600 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Tampilan Desktop: Tabel */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3.5 px-4 text-center w-20">Peringkat</th>
                <th className="py-3.5 px-4">Nama Siswa</th>
                <th className="py-3.5 px-4">Asal Sekolah</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {top10Students.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    Belum ada data pengerjaan modul siswa.
                  </td>
                </tr>
              ) : (
                top10Students.map((s, idx) => {
                  const rank = idx + 1;

                  return (
                    <tr 
                      key={s.userId} 
                      className={`hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors ${
                        rank === 1 ? 'bg-amber-50/30 dark:bg-amber-950/10' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center">
                        {rank === 1 ? (
                          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-amber-500 text-white font-black text-xs shadow-xs">
                            🥇 #1
                          </span>
                        ) : rank === 2 ? (
                          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white font-black text-xs shadow-xs">
                            🥈 #2
                          </span>
                        ) : rank === 3 ? (
                          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-amber-700 text-white font-black text-xs shadow-xs">
                            🥉 #3
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs">
                            #{rank}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white uppercase">
                          {s.namaLengkap}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-semibold">
                        <div className="flex items-center gap-1.5">
                          <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="uppercase">{s.asalSekolah || '-'}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedStudent(s)}
                            className="px-3 py-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-xl transition-colors cursor-pointer"
                          >
                            Detail Rapor
                          </button>
                          {isAdmin && (
                            <button
                              onClick={() => handleDeleteStudent(s)}
                              title="Hapus Siswa"
                              className="p-1.5 text-rose-600 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Container 2: Header Filter & Status Online Siswa */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Daftar Siswa Sedang Online Membuka Aplikasi
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{onlineStudentsList.length} Siswa Online</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Memantau siswa yang saat ini sedang aktif membuka dan mengakses aplikasi platform pembelajaran.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari siswa online..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
            />
          </div>

          {onNavigateToUsers && (
            <button
              type="button"
              onClick={onNavigateToUsers}
              className="w-full sm:w-auto px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer shrink-0"
            >
              Kelola Pengguna
            </button>
          )}
        </div>
      </div>

      {/* Container 2: Tabel Siswa Sedang Online */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Tampilan Mobile: Grid Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-3 p-4 bg-slate-50/50 dark:bg-slate-900/50">
          {paginatedOnlineStudents.length === 0 ? (
            <div className="col-span-full py-8 text-center text-slate-400 text-xs">
              Tidak ada siswa yang sedang online membuka aplikasi saat ini.
            </div>
          ) : (
            paginatedOnlineStudents.map((s) => (
              <div 
                key={s.userId}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="font-extrabold text-slate-900 dark:text-white uppercase text-xs flex items-center gap-1.5">
                      <span>{s.namaLengkap}</span>
                      <span className="relative flex h-2 w-2" title="Siswa Sedang Online Membuka Aplikasi">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 shrink-0">
                    Online
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="uppercase text-[11px]">{s.asalSekolah || '-'}</span>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-[10px] font-bold">
                      {s.completedModulesCount} / 8 Modul
                    </span>
                    <span className="font-black font-mono text-amber-600 dark:text-amber-400 text-xs">
                      {s.averageScore}%
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedStudent(s)}
                      className="px-2.5 py-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer"
                    >
                      Detail Rapor
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteStudent(s)}
                        title="Hapus Siswa"
                        className="p-1.5 text-rose-600 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Tampilan Desktop: Tabel */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3.5 px-4">Nama Siswa</th>
                <th className="py-3.5 px-4">Asal Sekolah</th>
                <th className="py-3.5 px-3 text-center">Status Sesi</th>
                <th className="py-3.5 px-3 text-center">Modul Selesai</th>
                <th className="py-3.5 px-3 text-center">Rata-Rata Nilai</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedOnlineStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Tidak ada siswa yang sedang online membuka aplikasi saat ini.
                  </td>
                </tr>
              ) : (
                paginatedOnlineStudents.map((s) => (
                  <tr 
                    key={s.userId} 
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="uppercase">{s.namaLengkap}</span>
                        <span className="relative flex h-2 w-2" title="Siswa Sedang Online Membuka Aplikasi">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="uppercase">{s.asalSekolah || '-'}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                        <span>Online App</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-center font-bold">
                      <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-[11px]">
                        {s.completedModulesCount} / 8 Modul
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-center font-black font-mono text-amber-600 dark:text-amber-400">
                      {s.averageScore}%
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedStudent(s)}
                          className="px-3 py-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-xl transition-colors cursor-pointer"
                        >
                          Detail Rapor
                        </button>
                        {isAdmin && (
                          <button
                            onClick={() => handleDeleteStudent(s)}
                            title="Hapus Siswa"
                            className="p-1.5 text-rose-600 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <Pagination currentPage={studentPage} totalItems={onlineStudentsList.length} onPageChange={setStudentPage} label="siswa online" />
        </div>
      </div>
    </div>
  )}



      {/* Modal: Lembar Hasil / Rapor Kompetensi Siswa */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Rapor Capaian Siswa TKA TJKT
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white uppercase">
                  {selectedStudent.namaLengkap}
                </h3>
                <p className="text-xs text-slate-500">
                  <span className="uppercase">{selectedStudent.asalSekolah}</span> · {selectedStudent.email}
                </p>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer text-lg font-bold"
              >
                &times;
              </button>
            </div>

            {/* Score Grid per Module */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Rincian Nilai 8 Modul Mingguan:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(w => {
                  const sc = selectedStudent.moduleScores[w];
                  return (
                    <div 
                      key={w}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center"
                    >
                      <span className="text-[10px] text-slate-400 block font-semibold">Modul {w}</span>
                      <span className={`text-base font-black font-mono ${
                        sc !== undefined && sc >= 75
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : sc !== undefined
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-slate-300'
                      }`}>
                        {sc !== undefined ? `${sc.toFixed(0)}` : '-'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Competency Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-600 dark:text-slate-400">Total Ujian Dikerjakan:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedStudent.totalAttempts} Sesi</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-600 dark:text-slate-400">Rata-Rata Keseluruhan:</span>
                <span className="font-extrabold text-blue-600 text-sm">{selectedStudent.averageScore}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-600 dark:text-slate-400">Status Verifikasi Email:</span>
                <span className={selectedStudent.isVerified ? 'text-emerald-600 font-bold' : 'text-amber-600'}>
                  {selectedStudent.isVerified ? 'Terverifikasi (Aktif)' : 'Menunggu Verifikasi'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              {!isStudent && (
                <button
                  onClick={() => handleDeleteStudent(selectedStudent)}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus Siswa</span>
                </button>
              )}

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                >
                  Cetak Rapor
                </button>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
