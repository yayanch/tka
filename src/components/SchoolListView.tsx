import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  Users, 
  GraduationCap, 
  Search, 
  Download, 
  RefreshCw, 
  ArrowUpDown, 
  CheckCircle2, 
  BarChart3, 
  ChevronRight, 
  Filter, 
  School,
  X,
  UserCheck,
  Zap,
  Award,
  BookOpen,
  MapPin
} from 'lucide-react';
import { UserProfile, TeacherClassOverview, TeacherStudentSummary } from '../types/auth';
import { fetchTeacherOverview } from '../services/api';

interface SchoolListViewProps {
  currentUser: UserProfile;
  onRefresh?: () => void;
  onNavigateToUsers?: () => void;
}

interface SchoolStat {
  schoolName: string;
  totalStudents: number;
  verifiedStudents: number;
  onlineStudents: number;
  totalAttempts: number;
  averageScore: number;
  students: TeacherStudentSummary[];
}

export const SchoolListView: React.FC<SchoolListViewProps> = ({
  currentUser,
  onRefresh,
  onNavigateToUsers,
}) => {
  const [data, setData] = useState<TeacherClassOverview | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<'students-desc' | 'students-asc' | 'score-desc' | 'name-asc'>('students-desc');
  const [selectedSchoolModal, setSelectedSchoolModal] = useState<SchoolStat | null>(null);

  const loadData = async (silent = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);

    try {
      const overview = await fetchTeacherOverview(currentUser.email, currentUser.role);
      setData(overview);
    } catch (err) {
      console.error('Gagal memuat data daftar sekolah:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser.email, currentUser.role]);

  const handleManualRefresh = () => {
    loadData(true);
    if (onRefresh) onRefresh();
  };

  // Group students by school name
  const schoolStatsList = useMemo<SchoolStat[]>(() => {
    if (!data || !data.students) return [];

    const map = new Map<string, TeacherStudentSummary[]>();

    data.students.forEach((student) => {
      if (student.role === 'admin') return;
      const rawSchool = (student.asalSekolah || 'SMK TJKT').trim();
      const normalizedKey = rawSchool.toUpperCase();
      if (!map.has(normalizedKey)) {
        map.set(normalizedKey, []);
      }
      map.get(normalizedKey)!.push(student);
    });

    const stats: SchoolStat[] = [];

    map.forEach((studentsList, key) => {
      const displayName = studentsList[0]?.asalSekolah?.trim() || key;
      const totalStudents = studentsList.length;
      const verifiedStudents = studentsList.filter((s) => s.isVerified).length;
      const onlineStudents = studentsList.filter((s) => s.isOnline).length;
      
      let sumScore = 0;
      let sumAttempts = 0;
      let scoredStudentsCount = 0;

      studentsList.forEach((s) => {
        sumAttempts += s.totalAttempts || 0;
        if (s.averageScore > 0) {
          sumScore += s.averageScore;
          scoredStudentsCount++;
        }
      });

      const averageScore = scoredStudentsCount > 0 ? Math.round(sumScore / scoredStudentsCount) : 0;

      stats.push({
        schoolName: displayName,
        totalStudents,
        verifiedStudents,
        onlineStudents,
        totalAttempts: sumAttempts,
        averageScore,
        students: studentsList,
      });
    });

    return stats;
  }, [data]);

  // Filter & Sort
  const filteredAndSortedSchools = useMemo(() => {
    let list = schoolStatsList.filter((item) =>
      item.schoolName.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );

    list.sort((a, b) => {
      if (sortOption === 'students-desc') return b.totalStudents - a.totalStudents;
      if (sortOption === 'students-asc') return a.totalStudents - b.totalStudents;
      if (sortOption === 'score-desc') return b.averageScore - a.averageScore;
      if (sortOption === 'name-asc') return a.schoolName.localeCompare(b.schoolName);
      return 0;
    });

    return list;
  }, [schoolStatsList, searchQuery, sortOption]);

  // High level overview metrics
  const totalSchools = schoolStatsList.length;
  const totalStudentsOverall = useMemo(
    () => schoolStatsList.reduce((acc, s) => acc + s.totalStudents, 0),
    [schoolStatsList]
  );
  const totalVerifiedOverall = useMemo(
    () => schoolStatsList.reduce((acc, s) => acc + s.verifiedStudents, 0),
    [schoolStatsList]
  );
  const topSchoolByStudents = useMemo(() => {
    if (schoolStatsList.length === 0) return null;
    return [...schoolStatsList].sort((a, b) => b.totalStudents - a.totalStudents)[0];
  }, [schoolStatsList]);

  const topSchoolByScore = useMemo(() => {
    if (schoolStatsList.length === 0) return null;
    return [...schoolStatsList].sort((a, b) => b.averageScore - a.averageScore)[0];
  }, [schoolStatsList]);

  const topProvince = useMemo(() => {
    if (!data || !data.students || data.students.length === 0) return null;

    const counts = new Map<string, { schoolSet: Set<string>; studentCount: number }>();

    data.students.forEach((s) => {
      if (s.role === 'admin') return;
      const rawProv = (s.provinsi || '').trim();
      const provName = rawProv && rawProv !== '-' ? rawProv : 'Jawa Barat';
      const key = provName.toUpperCase();

      if (!counts.has(key)) {
        counts.set(key, { schoolSet: new Set<string>(), studentCount: 0 });
      }

      const entry = counts.get(key)!;
      entry.studentCount++;
      if (s.asalSekolah && s.asalSekolah.trim()) {
        entry.schoolSet.add(s.asalSekolah.trim().toUpperCase());
      }
    });

    let topProvName = '';
    let maxSchools = 0;
    let maxStudents = 0;

    counts.forEach((val, key) => {
      const schoolCount = val.schoolSet.size || 1;
      if (val.studentCount > maxStudents || (val.studentCount === maxStudents && schoolCount > maxSchools)) {
        maxSchools = schoolCount;
        maxStudents = val.studentCount;
        topProvName = key;
      }
    });

    if (!topProvName) return null;

    const formattedName = topProvName
      .toLowerCase()
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return {
      name: formattedName,
      schoolCount: maxSchools,
      studentCount: maxStudents,
    };
  }, [data]);

  // Export CSV
  const handleExportCSV = () => {
    if (schoolStatsList.length === 0) return;

    const headers = ['No', 'Nama Sekolah', 'Jumlah Siswa Terdaftar', 'Siswa Terverifikasi', 'Siswa Online', 'Rata-Rata Nilai'];
    const rows = filteredAndSortedSchools.map((item, idx) => [
      idx + 1,
      `"${item.schoolName.replace(/"/g, '""')}"`,
      item.totalStudents,
      item.verifiedStudents,
      item.onlineStudents,
      item.averageScore,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Daftar_Sekolah_TJKT_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Container Header Banner (Berlatar Biru) */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold text-blue-100 border border-white/20">
              <Building2 className="w-3.5 h-3.5 text-blue-200" />
              <span>Panel Direktori Sekolah Terdaftar</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Daftar Sekolah & Statistik Siswa</span>
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Pantau persebaran jumlah siswa, status verifikasi akun, serta pencapaian rata-rata nilai pada tiap instansi sekolah SMK TJKT yang terdaftar.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleExportCSV}
              disabled={isLoading || schoolStatsList.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-2xl backdrop-blur-md border border-white/20 transition-all shadow-xs cursor-pointer disabled:opacity-50"
              title="Unduh Laporan CSV Sekolah"
            >
              <Download className="w-4 h-4" />
              <span>Ekspor CSV</span>
            </button>

            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs rounded-2xl shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Memuat...' : 'Segarkan Data'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Card 1: Total Sekolah */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Sekolah
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {isLoading ? '...' : totalSchools}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <School className="w-3.5 h-3.5 text-blue-500" />
              <span>Instansi terdaftar di sistem</span>
            </p>
          </div>
        </div>

        {/* Card 2: Total Siswa */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Siswa Terdaftar
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {isLoading ? '...' : totalStudentsOverall}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>{totalVerifiedOverall} terverifikasi email</span>
            </p>
          </div>
        </div>

        {/* Card 3: Provinsi Terbanyak */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Provinsi Terbanyak
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-lg font-bold text-slate-900 dark:text-white truncate">
              {isLoading ? '...' : topProvince?.name || 'Jawa Barat'}
            </div>
            <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-1 flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              <span>{topProvince ? `${topProvince.schoolCount} Sekolah (${topProvince.studentCount} Siswa)` : '-'}</span>
            </p>
          </div>
        </div>

        {/* Card 4: Sekolah Siswa Terbanyak */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Siswa Terbanyak
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-lg font-bold text-slate-900 dark:text-white truncate">
              {isLoading ? '...' : topSchoolByStudents?.schoolName || '-'}
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1 flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{topSchoolByStudents ? `${topSchoolByStudents.totalStudents} Siswa` : '-'}</span>
            </p>
          </div>
        </div>

        {/* Card 5: Nilai Rata-rata Tertinggi */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Performa Tertinggi
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-lg font-bold text-slate-900 dark:text-white truncate">
              {isLoading ? '...' : topSchoolByScore?.schoolName || '-'}
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>Rata-rata: {topSchoolByScore ? `${topSchoolByScore.averageScore} / 100` : '-'}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Table / Directory Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
        {/* Search & Filter Tools Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama sekolah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap hidden sm:inline-block">
              Urutkan:
            </span>
            <div className="relative flex-1 sm:flex-none">
              <select
                value={sortOption}
                onChange={(e: any) => setSortOption(e.target.value)}
                className="w-full sm:w-auto px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="students-desc">Jumlah Siswa Terbanyak</option>
                <option value="students-asc">Jumlah Siswa Terlengkap</option>
                <option value="score-desc">Rata-Rata Nilai Tertinggi</option>
                <option value="name-asc">Nama Sekolah (A - Z)</option>
              </select>
            </div>

            {onNavigateToUsers && (
              <button
                onClick={onNavigateToUsers}
                className="px-3.5 py-2.5 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                title="Kelola Seluruh Akun Pengguna"
              >
                <Users className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Daftar Pengguna</span>
              </button>
            )}
          </div>
        </div>

        {/* Table Content */}
        {isLoading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-medium text-slate-500">Memuat direktori data sekolah...</p>
          </div>
        ) : filteredAndSortedSchools.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
            <Building2 className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Tidak ada data sekolah ditemukan
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Coba kata kunci pencarian lain atau klik tombol segarkan data di atas.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/30">
                  <th className="py-3 px-4 rounded-l-xl">No</th>
                  <th className="py-3 px-4">Nama Sekolah</th>
                  <th className="py-3 px-4 text-center">Jumlah Siswa</th>
                  <th className="py-3 px-4 text-center">Terverifikasi</th>
                  <th className="py-3 px-4 text-center">Siswa Online</th>
                  <th className="py-3 px-4 text-center">Rata-Rata Nilai</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs sm:text-sm">
                {filteredAndSortedSchools.map((school, index) => {
                  const verifiedPercent = school.totalStudents > 0 
                    ? Math.round((school.verifiedStudents / school.totalStudents) * 100) 
                    : 0;

                  return (
                    <tr 
                      key={school.schoolName + index}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group"
                    >
                      <td className="py-4 px-4 font-bold text-slate-400 text-xs">
                        {index + 1}
                      </td>

                      {/* School Name */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-extrabold text-slate-900 dark:text-white block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {school.schoolName}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium">
                              SMK Kejuruan TJKT
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Total Students Badge */}
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full font-black text-xs border border-blue-200 dark:border-blue-800">
                          <Users className="w-3.5 h-3.5" />
                          <span>{school.totalStudents} Siswa</span>
                        </span>
                      </td>

                      {/* Verified Count */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className="inline-flex items-center gap-1 font-bold text-slate-700 dark:text-slate-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{school.verifiedStudents} ({verifiedPercent}%)</span>
                          </span>
                        </div>
                      </td>

                      {/* Online Students */}
                      <td className="py-4 px-4 text-center">
                        {school.onlineStudents > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>{school.onlineStudents} Aktif</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs font-medium">-</span>
                        )}
                      </td>

                      {/* Average Score */}
                      <td className="py-4 px-4 text-center">
                        {school.averageScore > 0 ? (
                          <div className="flex flex-col items-center">
                            <span className={`font-black text-xs px-2.5 py-0.5 rounded-lg ${
                              school.averageScore >= 75 
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' 
                                : school.averageScore >= 60 
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300' 
                                : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                            }`}>
                              {school.averageScore} / 100
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs">Belum ada ujian</span>
                        )}
                      </td>

                      {/* Action Button */}
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => setSelectedSchoolModal(school)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs transition-all cursor-pointer"
                        >
                          <span>Detail Siswa</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Detail Siswa Sekolah */}
      {selectedSchoolModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">
                    {selectedSchoolModal.schoolName}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Daftar anggota siswa terdaftar ({selectedSchoolModal.totalStudents} Siswa)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSchoolModal(null)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Student List Table */}
            <div className="overflow-y-auto flex-1 pr-1 space-y-3">
              {selectedSchoolModal.students.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500">
                  Tidak ada daftar nama siswa untuk sekolah ini.
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedSchoolModal.students.map((student, idx) => (
                    <div 
                      key={student.userId || idx}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {student.namaLengkap.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                              {student.namaLengkap}
                            </span>
                            {student.isVerified && (
                              <span title="Verifikasi Email">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              </span>
                            )}
                            {student.isOnline && (
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Online Aktif" />
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 block truncate">
                            {student.email}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-slate-900 dark:text-white block">
                          {student.averageScore > 0 ? `${student.averageScore} / 100` : 'Belum Ujian'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {student.completedModulesCount || 0} Modul Selesai
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedSchoolModal(null)}
                className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
