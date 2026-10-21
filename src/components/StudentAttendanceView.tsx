import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  Printer, 
  FileSpreadsheet, 
  BookOpen, 
  Award, 
  AlertCircle,
  CheckSquare,
  Square,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { TeacherClassOverview, TeacherStudentSummary } from '../types/auth';
import { MODULE_NAMES } from './ModuleSettingsModal';

interface StudentAttendanceViewProps {
  data: TeacherClassOverview | null;
  onRefresh?: () => void;
  onBack: () => void;
}

type AttendanceStatus = 'HADIR' | 'IZIN' | 'SAKIT' | 'ALPHA' | 'OTOMATIS';

export const StudentAttendanceView: React.FC<StudentAttendanceViewProps> = ({
  data,
  onRefresh,
  onBack,
}) => {
  const [selectedModule, setSelectedModule] = useState<number>(1);
  const [selectedSchool, setSelectedSchool] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, AttendanceStatus>>({});
  const [activeDate, setActiveDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Load saved attendance from localStorage on mount or module change
  useEffect(() => {
    try {
      const key = `tka_attendance_m${selectedModule}_${activeDate}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        setAttendanceRecords(JSON.parse(saved));
      } else {
        setAttendanceRecords({});
      }
    } catch {
      setAttendanceRecords({});
    }
  }, [selectedModule, activeDate]);

  const handleStatusChange = (email: string, status: AttendanceStatus) => {
    const updated = { ...attendanceRecords, [email]: status };
    setAttendanceRecords(updated);
    try {
      const key = `tka_attendance_m${selectedModule}_${activeDate}`;
      localStorage.setItem(key, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const markAll = (status: AttendanceStatus) => {
    const updated: Record<string, AttendanceStatus> = {};
    filteredStudents.forEach((s) => {
      updated[s.email] = status;
    });
    setAttendanceRecords(updated);
    try {
      const key = `tka_attendance_m${selectedModule}_${activeDate}`;
      localStorage.setItem(key, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const students = data?.students || [];

  // Schools list for filter
  const schoolsList = Array.from(new Set(students.map((s) => s.asalSekolah).filter(Boolean)));

  const filteredStudents = students.filter((s) => {
    if (selectedSchool !== 'all' && s.asalSekolah !== selectedSchool) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.namaLengkap.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.asalSekolah.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Calculate summary stats
  const totalCount = filteredStudents.length;
  let hadirCount = 0;
  let izinCount = 0;
  let sakitCount = 0;
  let alphaCount = 0;
  let otomatisCount = 0;

  filteredStudents.forEach((s) => {
    const status = attendanceRecords[s.email];
    const hasAttempted = (s.moduleScores?.[selectedModule] !== undefined);

    if (status === 'HADIR') hadirCount++;
    else if (status === 'IZIN') izinCount++;
    else if (status === 'SAKIT') sakitCount++;
    else if (status === 'ALPHA') alphaCount++;
    else {
      // Automatic detection based on exam attempt
      if (hasAttempted) hadirCount++;
      else alphaCount++;
    }
  });

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ['No', 'Nama Siswa', 'Asal Sekolah', 'Email', `Modul ${selectedModule}`, 'Status Kehadiran', 'Tanggal'];
    const rows = filteredStudents.map((s, idx) => {
      const hasAttempted = (s.moduleScores?.[selectedModule] !== undefined);
      const status = attendanceRecords[s.email] || (hasAttempted ? 'HADIR (Otomatis Ujian)' : 'ALPHA');
      return [
        idx + 1,
        s.namaLengkap,
        s.asalSekolah,
        s.email,
        hasAttempted ? `${s.moduleScores[selectedModule]} (Selesai)` : 'Belum Ujian',
        status,
        activeDate,
      ].join('\t');
    });

    const tsvContent = [headers.join('\t'), ...rows].join('\n');
    const blob = new Blob([tsvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Rekap_Absensi_Modul_${selectedModule}_${activeDate}.tsv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors cursor-pointer"
            title="Kembali"
          >
            &larr;
          </button>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              Rekap Absensi Siswa per Mata Pelajaran (Modul TJKT)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pantau dan catat kehadiran siswa pada modul pembelajaran dan ujian TKA SMK TJKT
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Ekspor Rekap Absensi</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Absensi</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Module Selector */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Pilih Mata Pelajaran / Modul TJKT:
          </label>
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(parseInt(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((m) => (
              <option key={m} value={m}>
                Modul {m}: {MODULE_NAMES[m]?.title.replace(`Modul ${m}: `, '')}
              </option>
            ))}
          </select>
        </div>

        {/* Date Selector */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Tanggal Pertemuan / Absensi:
          </label>
          <input
            type="date"
            value={activeDate}
            onChange={(e) => setActiveDate(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* School Filter */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Filter Asal Sekolah:
          </label>
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Sekolah ({schoolsList.length} Sekolah)</option>
            {schoolsList.map((sch) => (
              <option key={sch} value={sch}>
                {sch}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">Total Siswa</span>
          <span className="text-2xl font-black">{totalCount}</span>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">Hadir</span>
          <span className="text-2xl font-black">{hadirCount}</span>
        </div>
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">Izin</span>
          <span className="text-2xl font-black">{izinCount}</span>
        </div>
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">Sakit</span>
          <span className="text-2xl font-black">{sakitCount}</span>
        </div>
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 col-span-2 sm:col-span-1 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400">Alpha / Belum</span>
          <span className="text-2xl font-black">{alphaCount}</span>
        </div>
      </div>

      {/* Quick Mark All Bar */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama siswa atau email..."
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none w-60"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-500">Tandai Semua:</span>
          <button
            type="button"
            onClick={() => markAll('HADIR')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            Semua Hadir
          </button>
          <button
            type="button"
            onClick={() => markAll('IZIN')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Semua Izin
          </button>
          <button
            type="button"
            onClick={() => markAll('SAKIT')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 transition-colors cursor-pointer"
          >
            Semua Sakit
          </button>
          <button
            type="button"
            onClick={() => markAll('ALPHA')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition-colors cursor-pointer"
          >
            Semua Alpha
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
                <th className="p-4 w-12 text-center">No</th>
                <th className="p-4">Nama Siswa &amp; Asal Sekolah</th>
                <th className="p-4 text-center">Status Ujian Modul {selectedModule}</th>
                <th className="p-4 text-center">Status Kehadiran</th>
                <th className="p-4 text-center">Aksi Cepat Absensi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    Tidak ada data siswa yang sesuai dengan filter.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s, idx) => {
                  const hasAttempted = s.moduleScores?.[selectedModule] !== undefined;
                  const score = s.moduleScores?.[selectedModule];
                  const currentStatus = attendanceRecords[s.email] || (hasAttempted ? 'HADIR' : 'ALPHA');

                  return (
                    <tr key={s.email} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 text-center font-bold text-slate-500">{idx + 1}</td>
                      <td className="p-4">
                        <div className="font-extrabold text-slate-900 dark:text-white">
                          {s.namaLengkap}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>{s.asalSekolah}</span>
                          <span>·</span>
                          <span>{s.email}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {hasAttempted ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Selesai (Nilai: {score})</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Belum Ujian</span>
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider ${
                          currentStatus === 'HADIR'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : currentStatus === 'IZIN'
                            ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                            : currentStatus === 'SAKIT'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                            : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                        }`}>
                          {currentStatus}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                          <button
                            type="button"
                            onClick={() => handleStatusChange(s.email, 'HADIR')}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                              currentStatus === 'HADIR' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                            Hadir
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(s.email, 'IZIN')}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                              currentStatus === 'IZIN' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                            Izin
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(s.email, 'SAKIT')}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                              currentStatus === 'SAKIT' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                            Sakit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(s.email, 'ALPHA')}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                              currentStatus === 'ALPHA' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                            Alpha
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
    </div>
  );
};
