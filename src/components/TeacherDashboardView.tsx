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
}

export const TeacherDashboardView: React.FC<TeacherDashboardViewProps> = ({ 
  currentUser, 
  onRefresh, 
  onOpenHeroSettings,
  onOpenContactSettings,
  onOpenBrandingSettings,
  onNavigateToUsers
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

      {/* Header Banner */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <GraduationCap className="w-4 h-4" />
              <span>{isStudent ? 'Rapor Nilai Siswa TJKT' : 'Portal Guru & Instruktur TJKT'}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-slate-500">
                <Database className="w-3.5 h-3.5" />
                <span>MySQL Active</span>
              </span>
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

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-500 font-medium block">
              {isStudent ? 'Siswa' : 'Total Siswa Terdaftar'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {data?.totalStudents || 0}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-500 font-medium block">Status Verifikasi</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {isStudent ? (data?.students?.[0]?.isVerified ? 'Aktif' : 'Pending') : `${data?.verifiedStudents || 0}`}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-500 font-medium block">
              {isStudent ? 'Modul Diselesaikan' : 'Total Ujian Selesai'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">
              {isStudent ? `${data?.students?.[0]?.completedModulesCount || 0} / 8` : (data?.totalExamsTaken || 0)}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-500 font-medium block">
              {isStudent ? 'Rata-Rata Nilai' : 'Rata-Rata Angkatan'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-amber-500">
              {isStudent ? `${data?.students?.[0]?.averageScore || 0}%` : `${data?.classAverageScore ? data.classAverageScore : 0}%`}
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* INTERACTIVE ADMIN QUICK CARDS (KARTU CEPAT NAVIGASI BAGIAN TERPISAH)        */}
      {/* ========================================================================= */}
      {isAdmin && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 fill-blue-600" />
              <span>Kartu Cepat Dasbor Administrator</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">Klik kartu untuk beralih bagian</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* KARTU 1: Rekapitulasi Nilai Siswa */}
            <div 
              onClick={() => setActiveSection('grades')}
              className={`bg-white dark:bg-slate-900 border rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-3 cursor-pointer transition-all ${
                activeSection === 'grades'
                  ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/20 dark:bg-blue-950/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-blue-400'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
                    Rekapitulasi Nilai
                  </span>
                  {activeSection === 'grades' ? (
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-100 dark:bg-blue-900/60 px-2 py-0.5 rounded-md">
                      ● Aktif
                    </span>
                  ) : (
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                      {filteredStudents.length} Siswa
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-medium">Rata-Rata</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">
                      {data?.classAverageScore ? data.classAverageScore : 0}%
                    </span>
                  </div>
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/80">
                    <span className="text-[10px] text-emerald-800 dark:text-emerald-300 block font-medium">Ujian Selesai</span>
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                      {data?.totalExamsTaken || 0}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSection('grades');
                }}
                className={`w-full py-1.5 px-3 text-xs font-extrabold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeSection === 'grades'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{activeSection === 'grades' ? 'Sedang Ditampilkan' : 'Buka Rekapitulasi Nilai'}</span>
              </button>
            </div>

            {/* KARTU 2: Daftar Pengguna & Identitas */}
            <div 
              onClick={() => setActiveSection('users')}
              className={`bg-white dark:bg-slate-900 border rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-3 cursor-pointer transition-all ${
                activeSection === 'users'
                  ? 'border-purple-500 ring-2 ring-purple-500/20 bg-purple-50/20 dark:bg-purple-950/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-purple-400'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 px-2 py-0.5 rounded-md border border-purple-200 dark:border-purple-800">
                    Daftar Pengguna
                  </span>
                  {activeSection === 'users' ? (
                    <span className="text-[10px] font-bold text-purple-600 bg-purple-100 dark:bg-purple-900/60 px-2 py-0.5 rounded-md">
                      ● Aktif
                    </span>
                  ) : (
                    <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
                      {data?.students?.length || 0} Akun
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-medium">Siswa Terdaftar</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">
                      {data?.students?.filter(s => s.role !== 'admin').length || 0}
                    </span>
                  </div>
                  <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800/80">
                    <span className="text-[10px] text-purple-800 dark:text-purple-300 block font-medium">Email Verified</span>
                    <span className="text-sm font-black text-purple-600 dark:text-purple-400">
                      {data?.verifiedStudents || 0}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSection('users');
                }}
                className={`w-full py-1.5 px-3 text-xs font-extrabold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeSection === 'users'
                    ? 'bg-purple-600 text-white shadow-2xs'
                    : 'bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>{activeSection === 'users' ? 'Sedang Ditampilkan' : 'Buka Daftar Pengguna'}</span>
              </button>
            </div>

            {/* KARTU 3: Kustomisasi Platform & Ekspor */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-3 hover:border-amber-400 transition-all">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                    Pengaturan Platform
                  </span>
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
                    <span>Konfigurasi</span>
                  </span>
                </div>

                <div className="p-2 bg-amber-50/50 dark:bg-amber-950/30 rounded-xl border border-amber-200/60 dark:border-amber-800/60 text-xs">
                  <span className="text-[10px] text-amber-800 dark:text-amber-300 block font-bold">Akses Visual & Rekap</span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    Hero, Branding & Kontak WA
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleDownloadCsv}
                  className="flex-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                  title="Unduh CSV"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Ekspor CSV</span>
                </button>
                {onOpenHeroSettings && (
                  <button
                    type="button"
                    onClick={onOpenHeroSettings}
                    className="p-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 rounded-xl border border-amber-300 dark:border-amber-800 transition-colors cursor-pointer"
                    title="Edit Teks Hero"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Navigasi Tab Pengalih Bagian */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80">
            <button
              onClick={() => setActiveSection('grades')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'grades'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/60 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>1. Rekapitulasi Nilai Siswa</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                activeSection === 'grades' ? 'bg-white/20 text-white' : 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
              }`}>
                {filteredStudents.length} Siswa
              </span>
            </button>

            <button
              onClick={() => setActiveSection('users')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'users'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/60 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>2. Daftar Pengguna & Identitas</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                activeSection === 'users' ? 'bg-white/20 text-white' : 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400'
              }`}>
                {filteredUsersList.length} Akun
              </span>
            </button>
          </div>
        </section>
      )}

      {/* Filter and Search Bar (Only shown for non-students or when searching) */}
      {!isStudent && (
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
      )}

      {/* Main Student Performance Table */}
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

        <div className="overflow-x-auto">
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
                <th className="py-3 px-3 text-center">Rata-Rata</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={13} className="py-12 text-center text-slate-400">
                    Tidak ada data siswa yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((s) => {
                  const isCompetent = s.averageScore >= 75;

                  return (
                    <tr 
                      key={s.userId} 
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{s.namaLengkap}</span>
                          {s.email === currentUser?.email && (
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Anda</span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <School className="w-3 h-3 text-slate-400" />
                          <span>{s.asalSekolah}</span>
                          <span aria-hidden="true">·</span>
                          <span>{s.email}</span>
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

                      <td className="py-3 px-3 text-center font-mono font-black text-slate-900 dark:text-white">
                        {s.averageScore > 0 ? `${s.averageScore.toFixed(1)}%` : '-'}
                      </td>

                      <td className="py-3 px-3 text-center">
                        {s.completedModulesCount > 0 ? (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            isCompetent
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}>
                            {isCompetent ? 'TUNTAS' : 'REMEDIAL'}
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">Belum Ujian</span>
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

      {/* ========================================================================= */}
      {/* LINK NAVIGASI DAFTAR PENGGUNA TERSEPARASI - RINGKAS                        */}
      {/* ========================================================================= */}
      {isAdmin && (
        <section id="section-users" className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden border border-purple-800/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-purple-500/20 border border-purple-400/30 rounded-full text-[11px] font-bold text-purple-300">
                <ShieldCheck className="w-3 h-3 text-purple-400" />
                <span>Halaman Terpisah · Pengaturan Pengguna</span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                Kelola Identitas & Hak Akses Pengguna
              </h2>
            </div>

            {onNavigateToUsers && (
              <button
                onClick={onNavigateToUsers}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-extrabold text-white bg-purple-600 hover:bg-purple-500 active:bg-purple-700 rounded-xl shadow-2xs transition-all cursor-pointer shrink-0"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Halaman Daftar Pengguna &rarr;</span>
              </button>
            )}
          </div>
        </section>
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
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {selectedStudent.namaLengkap}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedStudent.asalSekolah} · {selectedStudent.email}
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
