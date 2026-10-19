import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Shield, 
  GraduationCap, 
  Search, 
  Download, 
  RefreshCw, 
  Trash2, 
  UserPlus, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  School, 
  Mail, 
  Key, 
  X, 
  FileSpreadsheet, 
  Printer, 
  Filter, 
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Award,
  MapPin,
  Check
} from 'lucide-react';
import { UserProfile, TeacherClassOverview, TeacherStudentSummary } from '../types/auth';
import { 
  fetchTeacherOverview, 
  deleteStudentAccount, 
  resetRemoteUserProgress, 
  updateUserRole,
  registerWithForm,
  updateStudentDataAdmin
} from '../services/api';

interface UserManagementViewProps {
  currentUser: UserProfile;
  onRefresh?: () => void;
  onNavigateToTeacher?: () => void;
}

type SortField = 'createdAt' | 'namaLengkap' | 'email' | 'asalSekolah';
type SortOrder = 'asc' | 'desc';

export const UserManagementView: React.FC<UserManagementViewProps> = ({
  currentUser,
  onRefresh,
  onNavigateToTeacher
}) => {
  const [data, setData] = useState<TeacherClassOverview | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'siswa' | 'guru' | 'admin'>('all');
  const [verificationFilter, setVerificationFilter] = useState<'all' | 'verified' | 'unverified'>('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Modals state
  const [selectedStudent, setSelectedStudent] = useState<TeacherStudentSummary | null>(null);
  const [editingUser, setEditingUser] = useState<TeacherStudentSummary | null>(null);
  const [newRoleInput, setNewRoleInput] = useState<'siswa' | 'guru' | 'admin'>('siswa');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(false);
  
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);
  const [addUserForm, setAddUserForm] = useState({
    namaLengkap: '',
    asalSekolah: 'SMKN 1 Cimahi',
    email: '',
    password: '',
    role: 'siswa' as 'siswa' | 'guru' | 'admin'
  });
  const [addUserError, setAddUserError] = useState<string | null>(null);
  const [addUserLoading, setAddUserLoading] = useState<boolean>(false);

  // Full Student Edit Modal State
  const [isEditStudentModalOpen, setIsEditStudentModalOpen] = useState<boolean>(false);
  const [editStudentForm, setEditStudentForm] = useState({
    userId: '',
    originalEmail: '',
    namaLengkap: '',
    asalSekolah: '',
    provinsi: '',
    kabupatenKota: '',
    email: '',
    role: 'siswa' as 'siswa' | 'guru' | 'admin',
    isVerified: true,
    password: ''
  });
  const [editStudentError, setEditStudentError] = useState<string | null>(null);
  const [editStudentLoading, setEditStudentLoading] = useState<boolean>(false);

  const handleOpenEditStudentModal = (user: TeacherStudentSummary) => {
    setEditStudentForm({
      userId: user.userId,
      originalEmail: user.email,
      namaLengkap: user.namaLengkap,
      asalSekolah: user.asalSekolah || '',
      provinsi: user.provinsi || '',
      kabupatenKota: user.kabupatenKota || '',
      email: user.email,
      role: (user.role as 'siswa' | 'guru' | 'admin') || 'siswa',
      isVerified: Boolean(user.isVerified),
      password: ''
    });
    setEditStudentError(null);
    setIsEditStudentModalOpen(true);
  };

  const handleSaveEditStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditStudentError(null);

    if (!editStudentForm.namaLengkap.trim() || !editStudentForm.email.trim() || !editStudentForm.asalSekolah.trim()) {
      setEditStudentError('Nama Lengkap, Asal Sekolah, dan Email wajib diisi.');
      return;
    }

    setEditStudentLoading(true);
    try {
      const res = await updateStudentDataAdmin({
        userId: editStudentForm.userId,
        originalEmail: editStudentForm.originalEmail,
        namaLengkap: editStudentForm.namaLengkap,
        asalSekolah: editStudentForm.asalSekolah,
        provinsi: editStudentForm.provinsi,
        kabupatenKota: editStudentForm.kabupatenKota,
        email: editStudentForm.email,
        role: editStudentForm.role,
        isVerified: editStudentForm.isVerified,
        password: editStudentForm.password
      });

      if (res.success) {
        setActionFeedback(`Data siswa/pengguna "${editStudentForm.namaLengkap}" berhasil diperbarui.`);
        setIsEditStudentModalOpen(false);
        if (selectedStudent?.userId === editStudentForm.userId) {
          setSelectedStudent(prev => prev ? {
            ...prev,
            namaLengkap: editStudentForm.namaLengkap,
            asalSekolah: editStudentForm.asalSekolah,
            provinsi: editStudentForm.provinsi,
            kabupatenKota: editStudentForm.kabupatenKota,
            email: editStudentForm.email,
            role: editStudentForm.role,
            isVerified: editStudentForm.isVerified
          } : null);
        }
        await loadData();
        if (onRefresh) onRefresh();
      } else {
        setEditStudentError(res.message || 'Gagal menyimpan data siswa.');
      }
    } catch (err: any) {
      setEditStudentError(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setEditStudentLoading(false);
    }
  };

  const isAdmin = currentUser.role === 'admin';

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchTeacherOverview(currentUser.email, currentUser.role);
      setData(result);
    } catch (err) {
      console.error('Error loading user management data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser.email, currentUser.role]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle Search, Filter & Sorting
  const filteredUsers = useMemo(() => {
    if (!data?.students) return [];

    return data.students.filter(u => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        u.namaLengkap.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.asalSekolah.toLowerCase().includes(q) ||
        u.userId.toLowerCase().includes(q);

      const userRole = u.role || 'siswa';
      const matchRole = roleFilter === 'all' || userRole === roleFilter;

      const matchVerification =
        verificationFilter === 'all' ||
        (verificationFilter === 'verified' && u.isVerified) ||
        (verificationFilter === 'unverified' && !u.isVerified);

      return matchSearch && matchRole && matchVerification;
    }).sort((a, b) => {
      let valA: string = a[sortField] || '';
      let valB: string = b[sortField] || '';

      if (sortField === 'createdAt') {
        valA = a.createdAt || '';
        valB = b.createdAt || '';
      }

      const cmp = valA.localeCompare(valB, 'id', { sensitivity: 'base' });
      return sortOrder === 'asc' ? cmp : -cmp;
    });
  }, [data?.students, searchQuery, roleFilter, verificationFilter, sortField, sortOrder]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, roleFilter, verificationFilter, pageSize, sortField, sortOrder]);

  // Paginated user list
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

  // Action handlers
  const handleDeleteUser = async (user: TeacherStudentSummary) => {
    if (user.email === currentUser.email) {
      alert('Anda tidak dapat menghapus akun Anda sendiri.');
      return;
    }

    if (!window.confirm(`Apakah Anda yakin ingin menghapus akun pengguna "${user.namaLengkap}" (${user.email}) beserta seluruh riwayatnya?`)) {
      return;
    }

    setActionFeedback(null);
    const res = await deleteStudentAccount(user.userId);
    if (res.success) {
      setActionFeedback(`Akun "${user.namaLengkap}" berhasil dihapus dari database.`);
      if (selectedStudent?.userId === user.userId) {
        setSelectedStudent(null);
      }
      await loadData();
      if (onRefresh) onRefresh();
    } else {
      setActionFeedback(`Gagal menghapus pengguna: ${res.message || 'Terjadi kesalahan'}`);
    }
  };

  const handleResetProgress = async (user: TeacherStudentSummary) => {
    if (!window.confirm(`Reset seluruh nilai & riwayat ujian untuk "${user.namaLengkap}"?`)) {
      return;
    }
    setActionFeedback(null);
    const res = await resetRemoteUserProgress(user.email, user.userId);
    if (res.success) {
      setActionFeedback(`Progres ujian "${user.namaLengkap}" berhasil direset.`);
      await loadData();
      if (onRefresh) onRefresh();
    } else {
      setActionFeedback(`Gagal mereset progres: ${(res as any).message || 'Terjadi kesalahan'}`);
    }
  };

  const handleOpenRoleModal = (user: TeacherStudentSummary) => {
    setEditingUser(user);
    setNewRoleInput((user.role as 'siswa' | 'guru' | 'admin') || 'siswa');
    setIsRoleModalOpen(true);
  };

  const handleSaveRole = async () => {
    if (!editingUser) return;
    setActionFeedback(null);
    const res = await updateUserRole({
      userId: editingUser.userId,
      email: editingUser.email,
      newRole: newRoleInput
    });

    if (res.success) {
      setActionFeedback(`Role "${editingUser.namaLengkap}" berhasil diubah menjadi ${newRoleInput.toUpperCase()}.`);
      setIsRoleModalOpen(false);
      setEditingUser(null);
      await loadData();
      if (onRefresh) onRefresh();
    } else {
      alert(`Gagal mengubah role: ${res.message || 'Terjadi kesalahan'}`);
    }
  };

  const handleAddUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddUserError(null);
    if (!addUserForm.namaLengkap || !addUserForm.email) {
      setAddUserError('Nama lengkap dan email wajib diisi.');
      return;
    }

    setAddUserLoading(true);
    try {
      const res = await registerWithForm({
        namaLengkap: addUserForm.namaLengkap,
        provinsi: '-',
        kabupatenKota: '-',
        asalSekolah: addUserForm.asalSekolah || 'SMKN 1 Cimahi',
        email: addUserForm.email,
        password: addUserForm.password || '123456'
      });

      if (res.success) {
        // If role is guru/admin, update role
        if (addUserForm.role !== 'siswa') {
          await updateUserRole({
            email: addUserForm.email,
            newRole: addUserForm.role
          });
        }

        setActionFeedback(`Pengguna baru "${addUserForm.namaLengkap}" (${addUserForm.role.toUpperCase()}) berhasil ditambahkan.`);
        setIsAddUserModalOpen(false);
        setAddUserForm({
          namaLengkap: '',
          asalSekolah: 'SMKN 1 Cimahi',
          email: '',
          password: '',
          role: 'siswa'
        });
        await loadData();
        if (onRefresh) onRefresh();
      } else {
        setAddUserError(res.message || 'Gagal menambahkan pengguna.');
      }
    } catch (err: any) {
      setAddUserError(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setAddUserLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (!filteredUsers.length) return;
    const headers = ['No', 'ID User', 'Nama Lengkap', 'Email', 'Asal Sekolah', 'Role', 'Status Email', 'Metode Login', 'Tgl Terdaftar'];
    const rows = filteredUsers.map((u, i) => [
      i + 1,
      `"${u.userId}"`,
      `"${u.namaLengkap.replace(/"/g, '""')}"`,
      `"${u.email}"`,
      `"${u.asalSekolah.replace(/"/g, '""')}"`,
      u.role || 'siswa',
      u.isVerified ? 'Terverifikasi' : 'Pending',
      u.authProvider || 'local',
      u.createdAt ? new Date(u.createdAt).toISOString() : '-'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Daftar_Pengguna_TKA_TJKT_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString || '-';
    }
  };

  // Metrics summary
  const totalUsersCount = data?.students?.length || 0;
  const siswaCount = data?.students?.filter(s => (s.role || 'siswa') === 'siswa').length || 0;
  const guruCount = data?.students?.filter(s => s.role === 'guru').length || 0;
  const adminCount = data?.students?.filter(s => s.role === 'admin').length || 0;
  const verifiedCount = data?.students?.filter(s => s.isVerified).length || 0;

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white rounded-2xl p-5 sm:p-6 shadow-md relative overflow-hidden border border-blue-600/30">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-white/15 border border-white/20 rounded-full text-xs font-bold text-blue-200 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
              <span>Halaman Terpisah · Pengaturan Hak Akses User</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Daftar Pengguna Terdaftar & Identitas System
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Kelola akun terdaftar (Admin, Guru, Siswa), pantau verifikasi email, ubah role, reset progres, serta ekspor data.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={loadData}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-xl border border-white/15 transition-all cursor-pointer shadow-2xs"
              title="Refresh Data Pengguna"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-xl border border-emerald-400/30 transition-all cursor-pointer shadow-2xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            {isAdmin && (
              <button
                onClick={() => setIsAddUserModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 active:bg-purple-700 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Tambah User</span>
              </button>
            )}

            {onNavigateToTeacher && (
              <button
                onClick={onNavigateToTeacher}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-all cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ke Rekap Nilai</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Action Notification Feedback */}
      {actionFeedback && (
        <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200 text-xs font-semibold flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
            <span>{actionFeedback}</span>
          </div>
          <button 
            onClick={() => setActionFeedback(null)} 
            className="text-purple-500 hover:text-purple-700 dark:hover:text-purple-300 font-bold text-base cursor-pointer"
          >
            &times;
          </button>
        </div>
      )}

      {/* Metrics Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Total User</span>
            <Users className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <p className="text-xl font-black text-slate-900 dark:text-white">{totalUsersCount}</p>
          <span className="text-[10px] text-slate-400 block truncate">Semua akun terdaftar</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Siswa</span>
            <GraduationCap className="w-3.5 h-3.5" />
          </div>
          <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{siswaCount}</p>
          <span className="text-[10px] text-slate-400 block truncate">Peserta Ujian</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-blue-600 dark:text-blue-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Guru</span>
            <Award className="w-3.5 h-3.5" />
          </div>
          <p className="text-xl font-black text-blue-600 dark:text-blue-400">{guruCount}</p>
          <span className="text-[10px] text-slate-400 block truncate">Instruktur/Pengajar</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-purple-600 dark:text-purple-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Admin</span>
            <Shield className="w-3.5 h-3.5" />
          </div>
          <p className="text-xl font-black text-purple-600 dark:text-purple-400">{adminCount}</p>
          <span className="text-[10px] text-slate-400 block truncate">Pengelola Sistem</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-teal-600 dark:text-teal-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Verified Email</span>
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <p className="text-xl font-black text-teal-600 dark:text-teal-400">{verifiedCount}</p>
          <span className="text-[10px] text-slate-400 block truncate">
            {totalUsersCount ? Math.round((verifiedCount / totalUsersCount) * 100) : 0}% Terverifikasi OTP
          </span>
        </div>
      </div>

      {/* Container 1: Controls Bar (Search, Filters & Sorting) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full lg:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan nama, email, sekolah, ID..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white placeholder-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
              >
                &times;
              </button>
            )}
          </div>

          {/* Filters & Sorting */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-300">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="bg-transparent focus:outline-none cursor-pointer font-semibold"
              >
                <option value="all">Semua Peran (Role)</option>
                <option value="siswa">Siswa</option>
                <option value="guru">Guru / Instruktur</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-300">
              <select
                value={verificationFilter}
                onChange={(e) => setVerificationFilter(e.target.value as any)}
                className="bg-transparent focus:outline-none cursor-pointer font-semibold"
              >
                <option value="all">Semua Status Email</option>
                <option value="verified">Terverifikasi (Aktif)</option>
                <option value="unverified">Pending OTP</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-300">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Urut:</span>
              <select
                value={`${sortField}-${sortOrder}`}
                onChange={(e) => {
                  const [f, o] = e.target.value.split('-') as [SortField, SortOrder];
                  setSortField(f);
                  setSortOrder(o);
                }}
                className="bg-transparent focus:outline-none cursor-pointer font-semibold"
              >
                <option value="createdAt-desc">Terbaru Terdaftar</option>
                <option value="createdAt-asc">Terlama Terdaftar</option>
                <option value="namaLengkap-asc">Nama (A - Z)</option>
                <option value="namaLengkap-desc">Nama (Z - A)</option>
                <option value="asalSekolah-asc">Sekolah (A - Z)</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-300">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Baris:</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="bg-transparent focus:outline-none cursor-pointer font-semibold"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Container 2: Main User Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Tampilan Mobile: Grid Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-3 p-4 bg-slate-50/50 dark:bg-slate-900/50">
          {isLoading ? (
            <div className="col-span-full py-12 text-center text-slate-400">
              <div className="flex flex-col items-center justify-center gap-2">
                <RefreshCw className="w-6 h-6 animate-spin text-purple-600" />
                <span>Memuat daftar pengguna terdaftar...</span>
              </div>
            </div>
          ) : paginatedUsers.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400 space-y-2">
              <Users className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
              <p className="font-semibold text-slate-600 dark:text-slate-300">
                Tidak ada pengguna terdaftar yang sesuai dengan kriteria filter.
              </p>
            </div>
          ) : (
            paginatedUsers.map((usr) => {
              const userRole = usr.role || 'siswa';
              const isSelf = usr.email === currentUser.email;

              return (
                <div 
                  key={usr.userId}
                  className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-3 ${
                    isSelf ? 'border-purple-300 dark:border-purple-800/60 ring-1 ring-purple-400/20' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="font-extrabold text-slate-900 dark:text-white uppercase text-xs flex items-center gap-1.5">
                        <span>{usr.namaLengkap}</span>
                        {isSelf && (
                          <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100 dark:bg-purple-900/60 dark:text-purple-300 px-1.5 py-0.5 rounded-md normal-case">
                            Anda
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {usr.email}
                      </div>
                    </div>
                    {userRole === 'admin' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 px-2 py-0.5 rounded-full shrink-0">
                        Admin
                      </span>
                    ) : userRole === 'guru' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded-full shrink-0">
                        Guru
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full shrink-0">
                        Siswa
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="uppercase text-[11px]">{usr.asalSekolah || '-'}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className={usr.isVerified ? 'text-emerald-600 font-bold text-[10px]' : 'text-amber-600 text-[10px]'}>
                      {usr.isVerified ? '✓ Terverifikasi' : '⏳ Pending OTP'}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelectedStudent(usr)}
                        className="px-2 py-1 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Detail
                      </button>
                      {isAdmin && (
                        <>
                          <button
                            onClick={() => handleOpenEditStudentModal(usr)}
                            className="px-2 py-1 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                            title="Edit Data Siswa (Nama, Sekolah, Kab/Kota, Provinsi, Email)"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleResetProgress(usr)}
                            className="p-1.5 text-amber-600 hover:text-amber-700 bg-amber-50 dark:bg-amber-950/50 rounded-lg cursor-pointer transition-colors"
                            title="Reset Progress"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          {!isSelf && (
                            <button
                              onClick={() => handleDeleteUser(usr)}
                              className="p-1.5 text-rose-600 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/50 rounded-lg cursor-pointer transition-colors"
                              title="Hapus Akun"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Tampilan Desktop: Tabel */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">No</th>
                  <th className="py-3.5 px-4">Nama Lengkap & Email</th>
                  <th className="py-3.5 px-4">Asal Sekolah / Instansi</th>
                  <th className="py-3.5 px-3 text-center">Peran (Role)</th>
                  <th className="py-3.5 px-3 text-center">Metode Auth</th>
                  <th className="py-3.5 px-3 text-center">Status Email</th>
                  <th className="py-3.5 px-4">Tgl Terdaftar</th>
                  <th className="py-3.5 px-4 text-right">Aksi Administrator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <RefreshCw className="w-6 h-6 animate-spin text-purple-600" />
                        <span>Memuat daftar pengguna terdaftar...</span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400 space-y-2">
                      <Users className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
                      <p className="font-semibold text-slate-600 dark:text-slate-300">
                        Tidak ada pengguna terdaftar yang sesuai dengan kriteria filter.
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setRoleFilter('all');
                          setVerificationFilter('all');
                        }}
                        className="text-xs text-purple-600 hover:underline font-bold cursor-pointer"
                      >
                        Reset Filter
                      </button>
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((usr, idx) => {
                    const userRole = usr.role || 'siswa';
                    const authProvider = usr.authProvider || 'local';
                    const globalIndex = startIndex + idx + 1;
                    const isSelf = usr.email === currentUser.email;

                    return (
                      <tr 
                        key={usr.userId} 
                        className={`hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors ${
                          isSelf ? 'bg-purple-50/30 dark:bg-purple-950/20' : ''
                        }`}
                      >
                        <td className="py-3.5 px-4 text-center font-mono text-[11px] font-bold text-slate-500">
                          {globalIndex}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="uppercase">{usr.namaLengkap}</span>
                            {isSelf && (
                              <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100 dark:bg-purple-900/60 dark:text-purple-300 px-2 py-0.5 rounded-md border border-purple-200 dark:border-purple-800 normal-case">
                                Anda
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono mt-0.5 flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>{usr.email}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">
                          <div className="flex items-center gap-1.5">
                            <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="uppercase font-extrabold">{usr.asalSekolah || '-'}</span>
                          </div>
                          {(usr.provinsi || usr.kabupatenKota) && (
                            <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                              <span>{[usr.kabupatenKota, usr.provinsi].filter(Boolean).join(', ')}</span>
                            </div>
                          )}
                        </td>

                        <td className="py-3.5 px-3 text-center whitespace-nowrap">
                          {userRole === 'admin' ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 px-2.5 py-1 rounded-full">
                              <Shield className="w-3 h-3 text-purple-600" />
                              <span>Administrator</span>
                            </span>
                          ) : userRole === 'guru' ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-2.5 py-1 rounded-full">
                              <GraduationCap className="w-3 h-3 text-blue-600" />
                              <span>Guru / Instruktur</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full">
                              <Users className="w-3 h-3 text-emerald-600" />
                              <span>Siswa</span>
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-3 text-center whitespace-nowrap">
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

                        <td className="py-3.5 px-3 text-center whitespace-nowrap">
                          {usr.isVerified ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Terverifikasi</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                              <Clock className="w-3 h-3" />
                              <span>Pending OTP</span>
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                          {formatDate(usr.createdAt || '')}
                        </td>

                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedStudent(usr)}
                              className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                              title="Lihat Detail & Capaian Rapor Modul"
                            >
                              Detail
                            </button>

                            {isAdmin && (
                              <>
                                <button
                                  onClick={() => handleOpenEditStudentModal(usr)}
                                  className="px-2.5 py-1 text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                                  title="Edit Lengkap Data Siswa (Sekolah, Kab/Kota, Provinsi, Email, Password, Dll)"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                  <span>Edit Data</span>
                                </button>

                                <button
                                  onClick={() => handleResetProgress(usr)}
                                  className="p-1.5 text-amber-600 hover:text-amber-700 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400 hover:bg-amber-100 rounded-lg cursor-pointer transition-colors"
                                  title="Reset Progres Ujian Siswa"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                </button>

                                {!isSelf && (
                                  <button
                                    onClick={() => handleDeleteUser(usr)}
                                    title="Hapus Akun Pengguna"
                                    className="p-1.5 text-rose-600 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/50 dark:text-rose-400 hover:bg-rose-100 rounded-lg cursor-pointer transition-colors"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </>
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

          {/* Pagination Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 border-t border-slate-100 dark:border-slate-800 text-xs bg-slate-50/50 dark:bg-slate-800/40">
            <span className="text-slate-500 font-medium">
              Menampilkan {totalItems ? startIndex + 1 : 0} - {Math.min(startIndex + pageSize, totalItems)} dari {totalItems} pengguna
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors shadow-2xs flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>

              <span className="font-bold text-slate-800 dark:text-slate-200 px-2">
                Halaman {currentPage} dari {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors shadow-2xs flex items-center gap-1"
              >
                <span>Selanjutnya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
          </div>
        </div>
      </div>

      {/* Modal: Student Performance & Rapor Detail */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  Rapor Capaian Siswa TKA TJKT
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white uppercase">
                  {selectedStudent.namaLengkap}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  <span className="uppercase font-bold">{selectedStudent.asalSekolah}</span>
                  {(selectedStudent.kabupatenKota || selectedStudent.provinsi) && (
                    <span> · {[selectedStudent.kabupatenKota, selectedStudent.provinsi].filter(Boolean).join(', ')}</span>
                  )}
                  <span> · {selectedStudent.email}</span>
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
                  const hasDone = sc !== undefined && sc !== null;
                  return (
                    <div 
                      key={w} 
                      className={`p-3 rounded-2xl border text-center space-y-1 ${
                        hasDone 
                          ? sc >= 75 
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' 
                            : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
                          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Modul {w}</span>
                      <span className={`text-base font-black ${
                        hasDone 
                          ? sc >= 75 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                          : 'text-slate-300 dark:text-slate-600'
                      }`}>
                        {hasDone ? sc : '-'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary Stat */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500 block">Rata-rata Nilai</span>
                <span className="text-lg font-black text-purple-600 dark:text-purple-400">
                  {selectedStudent.averageScore} / 100
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">Modul Selesai</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  {selectedStudent.completedModulesCount} dari 8 Modul
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              {isAdmin && (
                <button
                  onClick={() => {
                    handleOpenEditStudentModal(selectedStudent);
                  }}
                  className="px-4 py-2 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 rounded-xl cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Data Siswa</span>
                </button>
              )}
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl cursor-pointer transition-colors"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Edit Role */}
      {isRoleModalOpen && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-purple-600" />
                <span>Ubah Peran / Hak Akses</span>
              </h3>
              <button 
                onClick={() => setIsRoleModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Pilih peran baru untuk pengguna <strong className="text-slate-900 dark:text-white">{editingUser.namaLengkap}</strong> ({editingUser.email}):
              </p>

              <div className="space-y-2 pt-2">
                <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  newRoleInput === 'siswa'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="roleOption"
                      value="siswa"
                      checked={newRoleInput === 'siswa'}
                      onChange={() => setNewRoleInput('siswa')}
                      className="text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-extrabold block">Siswa</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Akses pengerjaan 8 modul, pembahasan, & statistik pribadi</span>
                    </div>
                  </div>
                  <GraduationCap className="w-5 h-5 text-emerald-600 shrink-0" />
                </label>

                <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  newRoleInput === 'guru'
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-900 dark:text-blue-200'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="roleOption"
                      value="guru"
                      checked={newRoleInput === 'guru'}
                      onChange={() => setNewRoleInput('guru')}
                      className="text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-extrabold block">Guru / Instruktur</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Akses rekapitulasi nilai seluruh siswa & matriks kelulusan</span>
                    </div>
                  </div>
                  <Award className="w-5 h-5 text-blue-600 shrink-0" />
                </label>

                <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  newRoleInput === 'admin'
                    ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 text-purple-900 dark:text-purple-200'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="roleOption"
                      value="admin"
                      checked={newRoleInput === 'admin'}
                      onChange={() => setNewRoleInput('admin')}
                      className="text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-extrabold block">Administrator System</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Akses penuh kelola pengguna, hapus akun, & pengaturan branding</span>
                    </div>
                  </div>
                  <Shield className="w-5 h-5 text-purple-600 shrink-0" />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setIsRoleModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSaveRole}
                className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Simpan Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add / Invite User */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-purple-600" />
                <span>Tambah Pengguna Baru</span>
              </h3>
              <button 
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
              >
                &times;
              </button>
            </div>

            {addUserError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300 text-xs font-semibold">
                {addUserError}
              </div>
            )}

            <form onSubmit={handleAddUserSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Isi nama lengkap pengguna"
                  value={addUserForm.namaLengkap}
                  onChange={(e) => setAddUserForm({ ...addUserForm, namaLengkap: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Email Aktif</label>
                <input
                  type="email"
                  required
                  placeholder="akun email anda yang aktif"
                  value={addUserForm.email}
                  onChange={(e) => setAddUserForm({ ...addUserForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Asal Sekolah / Instansi</label>
                <input
                  type="text"
                  placeholder="isi dengan nama sekolah anda"
                  value={addUserForm.asalSekolah}
                  onChange={(e) => setAddUserForm({ ...addUserForm, asalSekolah: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Password (Opsional, bawaan: 123456)</label>
                <input
                  type="password"
                  placeholder="123456"
                  value={addUserForm.password}
                  onChange={(e) => setAddUserForm({ ...addUserForm, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Peran (Role)</label>
                <select
                  value={addUserForm.role}
                  onChange={(e) => setAddUserForm({ ...addUserForm, role: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white font-semibold cursor-pointer"
                >
                  <option value="siswa">Siswa (Peserta Ujian Modul)</option>
                  <option value="guru">Guru / Instruktur</option>
                  <option value="admin">Administrator System</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={addUserLoading}
                  className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-md transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  {addUserLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>Tambah Pengguna</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Complete Student Data (Nama, Email, Asal Sekolah, Provinsi, Kab/Kota, Role, Pass, Verification) */}
      {isEditStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Edit Data Lengkap Siswa / Pengguna
                  </h3>
                  <p className="text-xs text-slate-500">
                    Administrator dapat memperbarui profil, lokasi daerah, sekolah, serta kata sandi akun
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsEditStudentModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer p-1"
              >
                &times;
              </button>
            </div>

            {editStudentError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300 text-xs font-semibold">
                {editStudentError}
              </div>
            )}

            <form onSubmit={handleSaveEditStudent} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nama Lengkap */}
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    Nama Lengkap <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Isi nama lengkap"
                    value={editStudentForm.namaLengkap}
                    onChange={(e) => setEditStudentForm({ ...editStudentForm, namaLengkap: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium"
                  />
                </div>

                {/* Email Akun */}
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    Email Akun <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alamat.email@smk.belajar.id"
                    value={editStudentForm.email}
                    onChange={(e) => setEditStudentForm({ ...editStudentForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium"
                  />
                </div>
              </div>

              {/* Asal Sekolah */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Asal Sekolah / Instansi <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: SMKN 1 Cimahi"
                  value={editStudentForm.asalSekolah}
                  onChange={(e) => setEditStudentForm({ ...editStudentForm, asalSekolah: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium"
                />
              </div>

              {/* Wilayah / Lokasi: Provinsi & Kabupaten/Kota */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>Provinsi</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Jawa Barat"
                    value={editStudentForm.provinsi}
                    onChange={(e) => setEditStudentForm({ ...editStudentForm, provinsi: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Kabupaten / Kota</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Kota Cimahi"
                    value={editStudentForm.kabupatenKota}
                    onChange={(e) => setEditStudentForm({ ...editStudentForm, kabupatenKota: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Peran (Role) */}
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Peran (Role)</label>
                  <select
                    value={editStudentForm.role}
                    onChange={(e) => setEditStudentForm({ ...editStudentForm, role: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-bold cursor-pointer"
                  >
                    <option value="siswa">Siswa (Peserta Ujian Modul)</option>
                    <option value="guru">Guru / Instruktur</option>
                    <option value="admin">Administrator System</option>
                  </select>
                </div>

                {/* Status Verifikasi */}
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Status Verifikasi Email</label>
                  <select
                    value={editStudentForm.isVerified ? 'verified' : 'unverified'}
                    onChange={(e) => setEditStudentForm({ ...editStudentForm, isVerified: e.target.value === 'verified' })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-bold cursor-pointer"
                  >
                    <option value="verified">Terverifikasi (OTP Selesai)</option>
                    <option value="unverified">Pending Verifikasi (OTP)</option>
                  </select>
                </div>
              </div>

              {/* Password Baru (Optional) */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Ubah Kata Sandi Baru <span className="text-slate-400 font-normal">(Opsional, kosongkan jika tidak diubah)</span>
                </label>
                <input
                  type="password"
                  placeholder="Ketik kata sandi baru untuk pengguna ini"
                  value={editStudentForm.password}
                  onChange={(e) => setEditStudentForm({ ...editStudentForm, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditStudentModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={editStudentLoading}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {editStudentLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
