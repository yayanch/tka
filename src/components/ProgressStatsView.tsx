import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../data/categories';
import { OverallUserProgress } from '../types/quiz';
import { UserProfile } from '../types/auth';
import { 
  BarChart3, 
  Award, 
  Clock, 
  RotateCcw, 
  Trash2, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle,
  Play,
  FileText,
  User,
  GraduationCap,
  Printer,
  Calendar,
  Check,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  School
} from 'lucide-react';

export interface StudentProfile {
  id: string;
  name: string;
  nisn: string;
  kelas: string;
  sekolah: string;
  createdAt: string;
  avatarColor: string;
  completedModuleWeeks?: number[];
}

interface ProgressStatsViewProps {
  progress: OverallUserProgress;
  currentUser?: UserProfile | null;
  activeStudent?: StudentProfile;
  allStudents?: StudentProfile[];
  onStartWeekExam: (weekId: number, mode: 'exam' | 'practice') => void;
  onResetProgress: () => void;
  onOpenProfileModal?: () => void;
  onToggleModuleCompleted?: (weekId: number) => void;
  onSwitchStudent?: (studentId: string) => void;
}

const DEFAULT_ACTIVE_STUDENT: StudentProfile = {
  id: 'current',
  name: 'Siswa TJKT Mandiri',
  nisn: '0054321098',
  kelas: 'XII TJKT 1',
  sekolah: 'SMK Negeri TJKT',
  createdAt: '2026',
  avatarColor: '#2563eb',
  completedModuleWeeks: []
};

export const ProgressStatsView: React.FC<ProgressStatsViewProps> = ({
  progress,
  currentUser,
  activeStudent = DEFAULT_ACTIVE_STUDENT,
  allStudents = [DEFAULT_ACTIVE_STUDENT],
  onStartWeekExam,
  onResetProgress,
  onOpenProfileModal,
  onToggleModuleCompleted,
  onSwitchStudent,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState<boolean>(false);
  const [showPrintReport, setShowPrintReport] = useState<boolean>(false);

  // Compute active student profile from logged-in currentUser if available
  const displayStudent: StudentProfile = useMemo(() => {
    const liveCompleted = progress.completedModuleWeeks || [];
    if (currentUser) {
      return {
        id: currentUser.id,
        name: currentUser.namaLengkap,
        nisn: currentUser.email,
        kelas: currentUser.role === 'admin' ? 'Administrator' : currentUser.role === 'guru' ? 'Guru TJKT' : 'Siswa TJKT',
        sekolah: currentUser.asalSekolah || 'SMK Kejuruan TJKT',
        createdAt: currentUser.createdAt ? new Date(currentUser.createdAt).getFullYear().toString() : '2026',
        avatarColor: '#2563eb',
        completedModuleWeeks: liveCompleted,
      };
    }
    return {
      ...(activeStudent || DEFAULT_ACTIVE_STUDENT),
      completedModuleWeeks: liveCompleted,
    };
  }, [currentUser, activeStudent, progress.completedModuleWeeks]);

  // Calculate overall metrics for active student
  const totalAttempts = progress.totalAttempts;
  const history = progress.history || [];
  const completedModules = progress.completedModuleWeeks || [];

  let highestSum = 0;
  let attemptedWeeksCount = 0;
  let masteredWeeksCount = 0;

  Object.entries(progress.categoryStats).forEach(([_, stat]) => {
    if (stat.attempts > 0) {
      attemptedWeeksCount += 1;
      highestSum += stat.highestScore;
      if (stat.highestScore >= 75) {
        masteredWeeksCount += 1;
      }
    }
  });

  const averageHighest = attemptedWeeksCount > 0 ? (highestSum / attemptedWeeksCount).toFixed(1) : '0';
  const overallMasteryPct = Math.round((masteredWeeksCount / 8) * 100);
  const isOverallCompetent = masteredWeeksCount >= 6; // At least 6 of 8 modules >= 75

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Student Profile Card & Mode Switcher */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-start sm:items-center gap-4">
            <div 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl text-white font-black text-xl sm:text-2xl flex items-center justify-center shrink-0 shadow-md"
              style={{ backgroundColor: displayStudent.avatarColor }}
            >
              {displayStudent.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  Profil Siswa Aktif
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  NISN: <strong className="text-slate-800 dark:text-slate-200">{displayStudent.nisn}</strong>
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {displayStudent.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                  <span>Kelas: <strong>{displayStudent.kelas}</strong></span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <School className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{displayStudent.sekolah}</span>
                </span>
                <span>•</span>
                <span>Terdaftar sejak: {displayStudent.createdAt}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center shrink-0">
            {onOpenProfileModal && (
              <button
                onClick={() => onOpenProfileModal()}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer shadow-2xs"
              >
                <User className="w-4 h-4 text-blue-600" />
                <span>Ganti Siswa ({allStudents.length})</span>
              </button>
            )}

            <button
              onClick={() => setShowPrintReport(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Rapor Belajar</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Rapor Belajar Siswa: <strong className="text-slate-900 dark:text-white font-bold">{displayStudent.name}</strong></span>
          </div>

          <button
            onClick={() => setShowConfirmReset(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Progres Belajar</span>
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            <span className="text-xs text-slate-400">Tingkat Penguasaan</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 tabular-nums">
                {overallMasteryPct}%
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block">
              {masteredWeeksCount} dari 8 Modul Kompeten
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400">Rata-rata Skor Tertinggi</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
                {averageHighest}
              </span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <span className="text-[11px] text-slate-400 block">
              Target kelulusan SMK: &ge; 75.0
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400">Materi Selesai Dipelajari</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 tabular-nums">
                {completedModules.length}
              </span>
              <span className="text-xs text-slate-400">/ 8 Modul</span>
            </div>
            <span className="text-[11px] text-slate-400 block">
              Track modul pembelajaran
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400">Total Percobaan Ujian</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-500 tabular-nums">
                {totalAttempts}
              </span>
              <span className="text-xs text-slate-400">kali</span>
            </div>
            <span className="text-[11px] text-slate-400 block">
              {progress.bookmarkedQuestionIds.length} soal di-bookmark
            </span>
          </div>
        </div>
      </section>

      {/* Track 8 Modul Mingguan (Materi & Ujian) */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <span>Track Pembelajaran & Ujian Mandiri: 8 Modul TJKT</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Pantau penyelesaian membaca modul dan skor ujian kelulusan untuk {displayStudent.name}
                </p>
              </div>

              <span className="text-xs text-slate-400 font-medium">
                Ambang Batas Kompeten: Nilai &ge; 75.0
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CATEGORIES.map(cat => {
                const stat = progress.categoryStats[cat.id] || {
                  attempts: 0,
                  highestScore: 0,
                  latestScore: 0,
                  latestDate: '',
                };
                const isDone = stat.attempts > 0;
                const isCompetent = stat.highestScore >= 75;
                const isMaterialRead = completedModules.includes(cat.id);

                return (
                  <div
                    key={cat.id}
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-3.5 transition-all hover:border-slate-300 dark:hover:border-slate-700"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">
                          Modul {cat.id} · {cat.questionCount} Soal
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                          {cat.title}
                        </h3>
                      </div>

                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        !isDone
                          ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          : isCompetent
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {!isDone ? 'Belum Ujian' : isCompetent ? 'Kompeten' : 'Perlu Remedi'}
                      </span>
                    </div>

                    {/* Score Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Skor Tertinggi Ujian:</span>
                        <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                          {stat.highestScore} / 100
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isCompetent ? 'bg-emerald-500' : isDone ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'
                          }`}
                          style={{ width: `${Math.min(100, stat.highestScore)}%` }}
                        />
                      </div>
                    </div>

                    {/* Track Actions: Mark as studied & Start exam */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs border-t border-slate-100 dark:border-slate-800">
                      {/* Checkbox reading progress */}
                      <button
                        type="button"
                        onClick={() => onToggleModuleCompleted?.(cat.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                          isMaterialRead
                            ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
                        }`}
                        title="Tandai apakah materi modul ini sudah dipelajari"
                      >
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isMaterialRead ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400'}`} />
                        <span>{isMaterialRead ? 'Materi Selesai Dibaca' : 'Tandai Materi Selesai'}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400">
                          {isDone ? `${stat.attempts}x Ujian` : '0x'}
                        </span>
                        <button
                          onClick={() => onStartWeekExam(cat.id, 'exam')}
                          className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Mulai Ujian</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* History Log Table for Active Student */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Riwayat Sesi Ujian Siswa ({displayStudent.name})
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Semua catatan simulasi dan pengerjaan yang diselesaikan oleh profil ini
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {history.length} Catatan Tersimpan
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              {history.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  Belum ada riwayat ujian untuk siswa ini. Silakan mulai simulasi pertama di modul mingguan!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                    <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Waktu Pengerjaan</th>
                        <th className="py-3 px-4">Modul / Paket</th>
                        <th className="py-3 px-4">Mode</th>
                        <th className="py-3 px-4">Jawaban Benar</th>
                        <th className="py-3 px-4">Skor Akhir</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {history.map((rec) => {
                        const isRecPassed = rec.score >= 75;
                        return (
                          <tr key={rec.sessionId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                            <td className="py-3 px-4 whitespace-nowrap text-slate-400">
                              {rec.date}
                            </td>
                            <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                              {rec.weekId === 0 ? 'Simulasi Terpadu (400 Soal)' : `Modul Minggu ${rec.weekId}`}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className="capitalize">{rec.mode === 'exam' ? 'Ujian Resmi' : 'Latihan Mandiri'}</span>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap tabular-nums">
                              {rec.correct} dari {rec.total} soal
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap font-bold tabular-nums">
                              <span className={isRecPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}>
                                {rec.score}
                              </span>
                              <span className="text-slate-400 font-normal"> / 100</span>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                isRecPassed
                                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                              }`}>
                                {isRecPassed ? 'KOMPETEN' : 'BELUM'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

      {/* PRINTABLE REPORT CARD MODAL */}
      {showPrintReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-3xl bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 p-6 sm:p-10 space-y-6">
            {/* Header controls for screen only */}
            <div className="print:hidden flex items-center justify-between pb-4 border-b border-slate-200">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Pratinjau Rapor Resmi Hasil Belajar Siswa
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak / Simpan PDF</span>
                </button>
                <button
                  onClick={() => setShowPrintReport(false)}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>

            {/* Official Report Card Body */}
            <div className="space-y-6 text-slate-900 font-sans">
              {/* Kop Surat Sekolah */}
              <div className="text-center pb-4 border-b-2 border-slate-900 space-y-1">
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-wide">
                  {displayStudent.sekolah}
                </h2>
                <h3 className="text-sm sm:text-base font-bold uppercase text-slate-700">
                  Laporan Capaian Asesmen Kompetensi Kejuruan (TKA SMK)
                </h3>
                <p className="text-xs text-slate-500">
                  Program Keahlian: Teknik Jaringan Komputer dan Telekomunikasi (TJKT) · Kurikulum Merdeka
                </p>
              </div>

              {/* Biodata Siswa */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-500 block">Nama Lengkap Siswa:</span>
                  <span className="font-bold text-sm text-slate-900">{displayStudent.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Nomor Induk Siswa / Email:</span>
                  <span className="font-bold text-sm text-slate-900">{displayStudent.nisn}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Kelas / Konsentrasi:</span>
                  <span className="font-bold text-slate-900">{displayStudent.kelas} (TJKT)</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Tanggal Cetak Dokumen:</span>
                  <span className="font-bold text-slate-900">{new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}</span>
                </div>
              </div>

              {/* Tabel Capaian 8 Modul */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Rincian Capaian Nilai 8 Modul Kompetensi TJKT:
                </h4>
                <table className="w-full text-left text-xs border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-300">
                      <th className="py-2.5 px-3 border border-slate-300 text-center w-10">No</th>
                      <th className="py-2.5 px-3 border border-slate-300">Modul Kompetensi Kejuruan</th>
                      <th className="py-2.5 px-3 border border-slate-300 text-center">Materi</th>
                      <th className="py-2.5 px-3 border border-slate-300 text-center">Ujian</th>
                      <th className="py-2.5 px-3 border border-slate-300 text-center">Skor Tertinggi</th>
                      <th className="py-2.5 px-3 border border-slate-300 text-center">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CATEGORIES.map(cat => {
                      const stat = progress.categoryStats[cat.id] || { attempts: 0, highestScore: 0 };
                      const isRead = completedModules.includes(cat.id);
                      const isPassed = stat.highestScore >= 75;

                      return (
                        <tr key={cat.id} className="border-b border-slate-200">
                          <td className="py-2 px-3 border border-slate-300 text-center font-bold">
                            {cat.id}
                          </td>
                          <td className="py-2 px-3 border border-slate-300 font-medium">
                            {cat.title}
                          </td>
                          <td className="py-2 px-3 border border-slate-300 text-center">
                            {isRead ? 'Tuntas' : 'Belum'}
                          </td>
                          <td className="py-2 px-3 border border-slate-300 text-center font-mono">
                            {stat.attempts}x
                          </td>
                          <td className="py-2 px-3 border border-slate-300 text-center font-bold font-mono">
                            {stat.highestScore}
                          </td>
                          <td className="py-2 px-3 border border-slate-300 text-center font-bold">
                            <span className={isPassed ? 'text-emerald-700' : 'text-amber-700'}>
                              {stat.attempts === 0 ? 'Belum Ujian' : isPassed ? 'KOMPETEN' : 'BELUM KOMPETEN'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Kesimpulan Kelulusan */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block">Rata-rata Skor Keseluruhan:</span>
                  <span className="text-xl font-black text-blue-700">{averageHighest} / 100</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Ketuntasan Modul (Skor &ge; 75):</span>
                  <span className="text-lg font-bold text-slate-900">{masteredWeeksCount} dari 8 Modul</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block">Status Rekomendasi TKA:</span>
                  <span className={`text-sm font-extrabold px-3 py-1 rounded-full inline-block ${
                    isOverallCompetent ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {isOverallCompetent ? 'LULUS / SIAP UJIAN' : 'PERLU PEMANTAPAN'}
                  </span>
                </div>
              </div>

              {/* Tanda Tangan */}
              <div className="pt-6 grid grid-cols-2 gap-8 text-center text-xs">
                <div>
                  <span className="block text-slate-500 mb-16">Mengetahui,<br />Kepala Program Keahlian TJKT</span>
                  <span className="font-bold underline block">_________________________</span>
                  <span className="text-slate-500">NIP. ........................................</span>
                </div>
                <div>
                  <span className="block text-slate-500 mb-16">Guru Pengampu / Instruktur,<br />Teknik Jaringan Komputer</span>
                  <span className="font-bold underline block">_________________________</span>
                  <span className="text-slate-500">NIP. ........................................</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Reset Catatan Siswa: {displayStudent.name}?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Tindakan ini akan menghapus riwayat nilai dan track modul milik siswa <strong>{displayStudent.name}</strong> dari penyimpanan lokal & database.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowConfirmReset(false);
                  onResetProgress();
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer"
              >
                Ya, Reset Siswa Ini
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
