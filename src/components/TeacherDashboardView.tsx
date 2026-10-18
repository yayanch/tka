import React, { useState, useEffect, useMemo } from 'react';
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
  School,
  Mail,
  UserCheck,
  AlertTriangle,
  Send,
  MailCheck,
  MailX,
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
  resendVerificationCode, 
  deleteStudentAccount, 
  deleteEmailLog, 
  clearAllEmailLogs 
} from '../services/api';

interface TeacherDashboardViewProps {
  currentUser?: UserProfile | null;
  onRefresh?: () => void;
  onOpenHeroSettings?: () => void;
  onOpenContactSettings?: () => void;
  onOpenBrandingSettings?: () => void;
}

export const TeacherDashboardView: React.FC<TeacherDashboardViewProps> = ({ 
  currentUser, 
  onRefresh, 
  onOpenHeroSettings,
  onOpenContactSettings,
  onOpenBrandingSettings
}) => {
  const [data, setData] = useState<TeacherClassOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<TeacherStudentSummary | null>(null);

  // State for Registered User List (Admin View)
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'siswa' | 'guru' | 'admin'>('all');
  const [userVerificationFilter, setUserVerificationFilter] = useState<'all' | 'verified' | 'unverified'>('all');

  // State for Email Delivery History / SMTP Logs
  const [emailSearchQuery, setEmailSearchQuery] = useState('');
  const [emailStatusFilter, setEmailStatusFilter] = useState<'all' | 'sent' | 'bounced_or_failed'>('all');
  const [resendingEmail, setResendingEmail] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [isSendingTest, setIsSendingTest] = useState(false);

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

  // Delete single email log
  const handleDeleteEmailLog = async (logId: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus catatan log email ini?')) return;
    setActionFeedback(null);
    const res = await deleteEmailLog(logId);
    if (res.success) {
      setActionFeedback('Log email berhasil dihapus.');
      await loadData();
    } else {
      setActionFeedback(`Gagal menghapus log email: ${res.message || 'Terjadi kesalahan'}`);
    }
  };

  // Clear all email logs
  const handleClearAllEmailLogs = async () => {
    if (!window.confirm('Apakah Anda yakin ingin membersihkan SEMUA riwayat log email? Action ini tidak dapat dibatalkan.')) return;
    setActionFeedback(null);
    const res = await clearAllEmailLogs();
    if (res.success) {
      setActionFeedback('Seluruh log email berhasil dibersihkan.');
      await loadData();
    } else {
      setActionFeedback(`Gagal membersihkan log email: ${res.message || 'Terjadi kesalahan'}`);
    }
  };

  // Filter school options (Excludes Admin accounts from Peserta / Siswa)
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

  // Filtered Email Logs
  const filteredEmailLogs = useMemo(() => {
    if (!data?.emailLogs) return [];
    return data.emailLogs.filter(log => {
      const matchSearch = 
        log.recipientEmail.toLowerCase().includes(emailSearchQuery.toLowerCase()) ||
        (log.recipientName && log.recipientName.toLowerCase().includes(emailSearchQuery.toLowerCase())) ||
        (log.subject && log.subject.toLowerCase().includes(emailSearchQuery.toLowerCase())) ||
        (log.errorMessage && log.errorMessage.toLowerCase().includes(emailSearchQuery.toLowerCase()));

      const matchFilter = 
        emailStatusFilter === 'all' ||
        (emailStatusFilter === 'sent' && log.status === 'sent') ||
        (emailStatusFilter === 'bounced_or_failed' && (log.status === 'bounced' || log.status === 'failed'));

      return matchSearch && matchFilter;
    });
  }, [data?.emailLogs, emailSearchQuery, emailStatusFilter]);

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

  const handleResendForStudent = async (recipientEmail: string) => {
    setResendingEmail(recipientEmail);
    setActionFeedback(null);
    try {
      const res = await resendVerificationCode(recipientEmail);
      if (res.message) {
        setActionFeedback(`[${recipientEmail}] ${res.message}`);
      } else {
        setActionFeedback(`Kode verifikasi berhasil dikirim ulang ke ${recipientEmail}`);
      }
      await loadData();
    } catch (err: any) {
      setActionFeedback(`Gagal mengirim ke ${recipientEmail}: ${err.message}`);
    } finally {
      setResendingEmail(null);
    }
  };

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmailAddress.trim()) return;
    setIsSendingTest(true);
    setActionFeedback(null);
    try {
      const response = await fetch('/api/auth/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmailAddress.trim() }),
      });
      const result = await response.json();
      if (result.success) {
        setActionFeedback(`Email uji coba berhasil dikirim ke ${testEmailAddress.trim()}`);
        setTestEmailAddress('');
      } else {
        setActionFeedback(`Uji pengiriman gagal: ${result.error || result.message}`);
      }
      await loadData();
    } catch (err: any) {
      setActionFeedback(`Uji pengiriman gagal: ${err.message}`);
    } finally {
      setIsSendingTest(false);
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

          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center shrink-0">
            {!isStudent && onOpenContactSettings && (
              <button
                onClick={onOpenContactSettings}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-blue-900 dark:text-blue-200 bg-blue-100 dark:bg-blue-950/80 hover:bg-blue-200 border border-blue-300 dark:border-blue-800 shadow-xs transition-colors cursor-pointer"
                title="Pengaturan Kontak Bantuan"
              >
                <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Pengaturan Kontak</span>
              </button>
            )}

            {!isStudent && onOpenBrandingSettings && (
              <button
                onClick={onOpenBrandingSettings}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-indigo-900 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-950/80 hover:bg-indigo-200 border border-indigo-300 dark:border-indigo-800 shadow-xs transition-colors cursor-pointer"
                title="Pengaturan Logo & Favicon"
              >
                <ImageIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Pengaturan Logo</span>
              </button>
            )}

            {!isStudent && onOpenHeroSettings && (
              <button
                onClick={onOpenHeroSettings}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-amber-900 dark:text-amber-200 bg-amber-100 dark:bg-amber-950/80 hover:bg-amber-200 border border-amber-300 dark:border-amber-800 shadow-xs transition-colors cursor-pointer"
                title="Pengaturan Teks Hero Banner Halaman Depan"
              >
                <Edit3 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Pengaturan Hero</span>
              </button>
            )}

            {!isStudent && (
              <button
                onClick={handleDownloadCsv}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Ekspor Excel / CSV</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Rekap</span>
            </button>

            <button
              onClick={loadData}
              className="p-2.5 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Segarkan Data"
            >
              <RotateCcw className="w-4 h-4" />
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
      {/* INTERACTIVE ADMIN QUICK CARDS (KARTU CEPAT BERANDA ADMIN)                  */}
      {/* ========================================================================= */}
      {isAdmin && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600 fill-purple-600" />
              <span>Kartu Cepat Dasbor Administrator</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">Panel Kendali Pintar</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* CARD 1: Ringkasan Pengguna */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4 hover:border-purple-400 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 dark:bg-purple-950/50 px-2.5 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">
                    Ringkasan Pengguna
                  </span>
                  <span className="text-xs font-mono font-bold text-purple-600">
                    {data?.students?.length || 0} Akun Total
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-medium">Siswa Terdaftar</span>
                    <span className="text-base font-black text-slate-900 dark:text-white">
                      {data?.students?.filter(s => s.role !== 'admin').length || 0}
                    </span>
                  </div>
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/80">
                    <span className="text-[10px] text-emerald-800 dark:text-emerald-300 block font-medium">Email Verified</span>
                    <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                      {data?.verifiedStudents || 0}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Pemantauan akun terdaftar, status verifikasi OTP, dan hak akses guru/siswa.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    const el = document.getElementById('section-users');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2 px-3 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-xs font-extrabold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-purple-200 dark:border-purple-800"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Kelola Daftar Pengguna</span>
                </button>
              </div>
            </div>

            {/* CARD 2: Monitoring Email OTP */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4 hover:border-blue-400 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                    Monitoring Email OTP
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>SMTP Active</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/80">
                    <span className="text-[10px] text-emerald-800 dark:text-emerald-300 block font-medium">Email Terkirim</span>
                    <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                      {data?.emailLogs?.filter(l => l.status === 'sent').length || 0}
                    </span>
                  </div>
                  <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800/80">
                    <span className="text-[10px] text-rose-800 dark:text-rose-300 block font-medium">Gagal / Bounce</span>
                    <span className="text-base font-black text-rose-600 dark:text-rose-400">
                      {data?.emailLogs?.filter(l => l.status === 'bounced' || l.status === 'failed').length || 0}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Pantau logs pengiriman kode verifikasi OTP dan jalankan pengujian server email.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    const el = document.getElementById('section-emails');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2 px-3 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-extrabold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-blue-200 dark:border-blue-800"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Buka Log Email & Uji SMTP</span>
                </button>
              </div>
            </div>

            {/* CARD 3: Kelola Identitas & Ekspor */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-400 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Kelola Identitas & Laporan
                  </span>
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>1 Admin</span>
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 block font-medium">Akun Administrator Utama</span>
                  <p className="text-xs font-mono font-bold text-slate-900 dark:text-white truncate">
                    admin@smk.belajar.id
                  </p>
                  <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Protected Super Administrator</span>
                  </p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Sistem dikunci khusus 1 admin utama. Unduh rekapitulasi nilai 8 modul secara langsung.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={handleDownloadCsv}
                  className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Ekspor Rekap Nilai CSV</span>
                </button>
              </div>
            </div>

            {/* CARD 4: Pengaturan Teks Hero Banner */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-400 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                    Kustomisasi Landing Page
                  </span>
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
                    <span>Live Hero</span>
                  </span>
                </div>

                <div className="p-2.5 bg-amber-50/50 dark:bg-amber-950/30 rounded-xl border border-amber-200/60 dark:border-amber-800/60 space-y-1">
                  <span className="text-[10px] text-amber-800 dark:text-amber-300 block font-bold">Banner Depan Publik</span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    Pengaturan Judul & Deskripsi
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium">
                    Ubah teks badge, judul besar, deskripsi, dan 4 item statistik.
                  </p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Sesuaikan narasi dan headline banner depan sesuai kebutuhan instansi/sekolah.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={onOpenHeroSettings}
                  className="w-full py-2 px-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Teks Hero Banner</span>
                </button>
              </div>
            </div>
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
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={13} className="py-12 text-center text-slate-400">
                    Tidak ada data siswa yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => {
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
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TABEL DAFTAR PENGGUNA TERDAFTAR & IDENTITAS (KHUSUS AKUN ADMIN)           */}
      {/* ========================================================================= */}
      {isAdmin && (
        <section id="section-users" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden space-y-6 p-6 sm:p-8">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Kelola Identitas & Hak Akses Pengguna (Khusus Admin)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Daftar Pengguna Terdaftar & Identitas System
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Lacak dan kelola identitas lengkap seluruh pengguna terdaftar (Admin, Guru, Siswa), status verifikasi email, metode login, dan instansi.
              </p>
            </div>

            {/* Metric Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center min-w-[75px]">
                <span className="text-[10px] text-slate-500 block font-bold uppercase">Total User</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">{data?.students?.length || 0}</span>
              </div>
              <div className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-xl text-center min-w-[75px]">
                <span className="text-[10px] text-emerald-800 dark:text-emerald-300 block font-bold uppercase">Siswa</span>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                  {data?.students?.filter(s => (s.role || 'siswa') === 'siswa').length || 0}
                </span>
              </div>
              <div className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 rounded-xl text-center min-w-[75px]">
                <span className="text-[10px] text-blue-800 dark:text-blue-300 block font-bold uppercase">Guru</span>
                <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                  {data?.students?.filter(s => s.role === 'guru').length || 0}
                </span>
              </div>
              <div className="px-3 py-1.5 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/80 rounded-xl text-center min-w-[75px]">
                <span className="text-[10px] text-purple-800 dark:text-purple-300 block font-bold uppercase">Admin</span>
                <span className="text-sm font-black text-purple-600 dark:text-purple-400">
                  {data?.students?.filter(s => s.role === 'admin').length || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Controls Bar: Search & Filter Dropdowns */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                placeholder="Cari nama, email, sekolah..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <select
                value={userRoleFilter}
                onChange={(e) => setUserRoleFilter(e.target.value as any)}
                className="py-2 px-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                <option value="all">Semua Peran (Role)</option>
                <option value="siswa">Siswa</option>
                <option value="guru">Guru / Instruktur</option>
                <option value="admin">Administrator</option>
              </select>

              <select
                value={userVerificationFilter}
                onChange={(e) => setUserVerificationFilter(e.target.value as any)}
                className="py-2 px-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                <option value="all">Semua Status Email</option>
                <option value="verified">Terverifikasi (Aktif)</option>
                <option value="unverified">Pending (OTP)</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-3 px-4">No & ID User</th>
                    <th className="py-3 px-4">Nama Lengkap & Email</th>
                    <th className="py-3 px-4">Asal Sekolah / Instansi</th>
                    <th className="py-3 px-3 text-center">Peran (Role)</th>
                    <th className="py-3 px-3 text-center">Metode Auth</th>
                    <th className="py-3 px-3 text-center">Status Email</th>
                    <th className="py-3 px-4">Tgl Terdaftar</th>
                    <th className="py-3 px-3 text-right">Aksi Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                  {filteredUsersList.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-10 text-center text-slate-400">
                        Tidak ada pengguna terdaftar yang sesuai dengan kriteria pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredUsersList.map((usr, idx) => {
                      const userRole = usr.role || 'siswa';
                      const authProvider = usr.authProvider || 'local';

                      return (
                        <tr key={usr.userId} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                            <span className="font-bold text-slate-700 dark:text-slate-300 mr-1.5">{idx + 1}.</span>
                            <span className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px]" title={usr.userId}>
                              {usr.userId.length > 10 ? `${usr.userId.substring(0, 8)}...` : usr.userId}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <span>{usr.namaLengkap}</span>
                              {usr.email === currentUser?.email && (
                                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/60 px-1.5 py-0.5 rounded">
                                  Akun Anda
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              {usr.email}
                            </div>
                          </td>

                          <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-medium">
                            <div className="flex items-center gap-1.5">
                              <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{usr.asalSekolah || '-'}</span>
                            </div>
                          </td>

                          <td className="py-3 px-3 text-center whitespace-nowrap">
                            {userRole === 'admin' ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-700 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 px-2.5 py-0.5 rounded-full">
                                <Shield className="w-3 h-3 text-purple-600" />
                                <span>Administrator</span>
                              </span>
                            ) : userRole === 'guru' ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 px-2.5 py-0.5 rounded-full">
                                <GraduationCap className="w-3 h-3 text-blue-600" />
                                <span>Guru / Instruktur</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">
                                <Users className="w-3 h-3 text-emerald-600" />
                                <span>Siswa</span>
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-3 text-center whitespace-nowrap">
                            {authProvider === 'google' ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                                <span>Google OAuth</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                                <Key className="w-3 h-3 text-slate-400" />
                                <span>Password</span>
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-3 text-center whitespace-nowrap">
                            {usr.isVerified ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Terverifikasi</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-full">
                                <Clock className="w-3 h-3" />
                                <span>Pending OTP</span>
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                            {usr.createdAt ? formatDate(usr.createdAt) : '-'}
                          </td>

                          <td className="py-3 px-3 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {!usr.isVerified && (
                                <button
                                  onClick={() => handleResendForStudent(usr.email)}
                                  disabled={resendingEmail === usr.email}
                                  className="px-2 py-1 text-[10px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                                  title="Kirim Ulang Kode OTP Verifikasi"
                                >
                                  OTP
                                </button>
                              )}

                              <button
                                onClick={() => setSelectedStudent(usr)}
                                className="px-2 py-1 text-[10px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                              >
                                Detail
                              </button>

                              <button
                                onClick={() => handleDeleteStudent(usr)}
                                title="Hapus Akun Pengguna"
                                className="p-1 text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
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
        </section>
      )}

      {/* ========================================================================= */}
      {/* TABEL RIWAYAT PENGIRIMAN EMAIL VERIFIKASI (SMTP DELIVERY LOGS)            */}
      {/* RULE: "monitoring email hanya untuk admin"                                 */}
      {/* ========================================================================= */}
      {isAdmin && (
        <section id="section-emails" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden space-y-6 p-6 sm:p-8">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <MailCheck className="w-4 h-4" />
                <span>Monitoring Infrastruktur Email (Khusus Admin)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Riwayat & Monitoring Pengiriman Email Verifikasi
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Lacak status pengiriman email OTP, verifikasi kendala bouncing/gagal, dan hapus/bersihkan log email.
              </p>
            </div>

            {/* Quick Metrics Cards & Clear All */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl text-center min-w-[90px]">
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 block uppercase">
                  Terkirim
                </span>
                <span className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">
                  {data?.emailLogs?.filter(l => l.status === 'sent').length || 0}
                </span>
              </div>

              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 rounded-2xl text-center min-w-[90px]">
                <span className="text-[10px] font-bold text-rose-800 dark:text-rose-300 block uppercase">
                  Gagal
                </span>
                <span className="text-lg font-black font-mono text-rose-600 dark:text-rose-400">
                  {data?.emailLogs?.filter(l => l.status === 'bounced' || l.status === 'failed').length || 0}
                </span>
              </div>

              <button
                onClick={handleClearAllEmailLogs}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 cursor-pointer transition-colors"
                title="Bersihkan Seluruh Log Email"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Bersihkan Log</span>
              </button>
            </div>
          </div>

          {/* Controls Bar: Search + Filter Tabs + Test Email Form */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={emailSearchQuery}
                onChange={(e) => setEmailSearchQuery(e.target.value)}
                placeholder="Cari email, nama, atau error..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              />
            </div>

            {/* Segmented Filter Buttons */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0">
              <button
                onClick={() => setEmailStatusFilter('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
                  emailStatusFilter === 'all'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Semua ({data?.emailLogs?.length || 0})
              </button>
              <button
                onClick={() => setEmailStatusFilter('sent')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
                  emailStatusFilter === 'sent'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Terkirim ({data?.emailLogs?.filter(l => l.status === 'sent').length || 0})
              </button>
              <button
                onClick={() => setEmailStatusFilter('bounced_or_failed')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
                  emailStatusFilter === 'bounced_or_failed'
                    ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Gagal ({data?.emailLogs?.filter(l => l.status === 'bounced' || l.status === 'failed').length || 0})
              </button>
            </div>

            {/* Test Email Form */}
            <form onSubmit={handleSendTestEmail} className="flex items-center gap-2 w-full lg:w-auto shrink-0">
              <input
                type="email"
                value={testEmailAddress}
                onChange={(e) => setTestEmailAddress(e.target.value)}
                placeholder="Uji email..."
                className="py-2 px-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white w-full lg:w-48"
              />
              <button
                type="submit"
                disabled={isSendingTest || !testEmailAddress.trim()}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl shrink-0 cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSendingTest ? 'Menguji...' : 'Uji Kirim'}</span>
              </button>
            </form>
          </div>

          {/* Email Logs Table */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-3 px-4">Waktu Pengiriman</th>
                    <th className="py-3 px-4">Penerima & Nama Siswa</th>
                    <th className="py-3 px-4">Subjek Pesan</th>
                    <th className="py-3 px-3 text-center">Status Delivery</th>
                    <th className="py-3 px-4">Detail Kendala</th>
                    <th className="py-3 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                  {filteredEmailLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-slate-400">
                        Tidak ada catatan pengiriman email yang sesuai dengan filter.
                      </td>
                    </tr>
                  ) : (
                    filteredEmailLogs.map((log) => {
                      const isSent = log.status === 'sent';
                      const isBounced = log.status === 'bounced';

                      return (
                        <tr 
                          key={log.id}
                          className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="py-3 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                            {formatDate(log.sentAt)}
                          </td>

                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-900 dark:text-white">
                              {log.recipientName || 'Siswa'}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              {log.recipientEmail}
                            </div>
                          </td>

                          <td className="py-3 px-4 text-slate-600 dark:text-slate-300 text-xs font-medium max-w-xs truncate">
                            {log.subject}
                          </td>

                          <td className="py-3 px-3 text-center whitespace-nowrap">
                            {isSent ? (
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-lg">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>TERKIRIM (OK)</span>
                              </span>
                            ) : isBounced ? (
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-rose-700 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 px-2.5 py-1 rounded-lg">
                                <MailX className="w-3.5 h-3.5 text-rose-600" />
                                <span>BOUNCED</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 px-2.5 py-1 rounded-lg">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                                <span>GAGAL (ERROR)</span>
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-4 max-w-sm">
                            {log.errorMessage ? (
                              <span className="text-[11px] font-mono text-rose-600 dark:text-rose-400 bg-rose-50/70 dark:bg-rose-950/30 p-1.5 rounded-md block leading-tight border border-rose-100 dark:border-rose-900/40">
                                {log.errorMessage}
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">Berhasil diterima MX server tanpa eror.</span>
                            )}
                          </td>

                          <td className="py-3 px-3 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleResendForStudent(log.recipientEmail)}
                                disabled={resendingEmail === log.recipientEmail}
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-lg cursor-pointer transition-colors disabled:opacity-50"
                              >
                                <RotateCcw className={`w-3 h-3 ${resendingEmail === log.recipientEmail ? 'animate-spin' : ''}`} />
                                <span>{resendingEmail === log.recipientEmail ? 'Kirim...' : 'Kirim Ulang'}</span>
                              </button>

                              <button
                                onClick={() => handleDeleteEmailLog(log.id)}
                                title="Hapus Log Email Ini"
                                className="p-1 text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
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
