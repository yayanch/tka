import React, { useState, useEffect } from 'react';
import { Trophy, X, School, Award, Loader2, CheckCircle2 } from 'lucide-react';
import { TeacherStudentSummary } from '../types/auth';
import { fetchTeacherOverview } from '../services/api';
import { maskStudentName } from '../utils/maskName';

interface TopScoresModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth?: (mode: 'register' | 'login') => void;
}

export const TopScoresModal: React.FC<TopScoresModalProps> = ({
  isOpen,
  onClose,
  onOpenAuth,
}) => {
  const [students, setStudents] = useState<TeacherStudentSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;
    const loadData = async () => {
      setIsLoading(true);
      try {
        const overview = await fetchTeacherOverview();
        if (isMounted && overview?.students) {
          const validStudents = overview.students.filter(s => s.role !== 'admin');
          // Sort by modules tuntas (>= 75), completed modules count, average score, name
          const sorted = [...validStudents].sort((a, b) => {
            const aTuntas = [1, 2, 3, 4, 5, 6, 7, 8].filter(w => (a.moduleScores?.[w] ?? 0) >= 75).length;
            const bTuntas = [1, 2, 3, 4, 5, 6, 7, 8].filter(w => (b.moduleScores?.[w] ?? 0) >= 75).length;
            if (bTuntas !== aTuntas) return bTuntas - aTuntas;

            const aComp = a.completedModulesCount || 0;
            const bComp = b.completedModulesCount || 0;
            if (bComp !== aComp) return bComp - aComp;

            const aAvg = a.averageScore || 0;
            const bAvg = b.averageScore || 0;
            if (bAvg !== aAvg) return bAvg - aAvg;

            return a.namaLengkap.localeCompare(b.namaLengkap);
          });
          setStudents(sorted);
        }
      } catch (err) {
        console.error('Failed to load top scores:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getRankBadgeStyle = (rank: number) => {
    if (rank === 1) return 'bg-amber-500 text-white shadow-amber-500/30 ring-4 ring-amber-500/20';
    if (rank === 2) return 'bg-slate-300 text-slate-900 shadow-slate-300/30 ring-4 ring-slate-300/20';
    if (rank === 3) return 'bg-amber-700 text-white shadow-amber-700/30 ring-4 ring-amber-700/20';
    return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-blue-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Top Skor & Leaderboard Peserta</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300">
                  Live Rankings
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Peringkat siswa terbaik berdasarkan jumlah modul tuntas (nilai ≥ 75) dan rata-rata nilai ujian.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <p className="text-xs font-medium">Memuat peringkat peserta...</p>
            </div>
          ) : students.length === 0 ? (
            <div className="py-16 text-center text-slate-400 space-y-2">
              <Award className="w-12 h-12 mx-auto opacity-40" />
              <p className="text-sm font-semibold">Belum ada data pengerjaan ujian siswa.</p>
              <p className="text-xs text-slate-400">Jadilah yang pertama menyelesaikan modul ujian dan raih peringkat 1!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {students.map((s, idx) => {
                const rank = idx + 1;
                const completedCount = Math.min(8, Math.max(s.completedModulesCount || 0, Object.keys(s.moduleScores || {}).length));
                const tuntasCount = [1, 2, 3, 4, 5, 6, 7, 8].filter(w => (s.moduleScores?.[w] ?? 0) >= 75).length;
                const avgScore = s.averageScore || 0;

                return (
                  <div
                    key={s.userId}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      rank <= 3
                        ? 'bg-gradient-to-r from-amber-50/50 via-white to-blue-50/20 dark:from-amber-950/15 dark:via-slate-900 dark:to-blue-950/15 border-amber-200/60 dark:border-amber-800/40 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-black text-xs sm:text-sm shadow-xs shrink-0 ${getRankBadgeStyle(rank)}`}>
                        {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                      </div>

                      <div className="min-w-0 space-y-0.5">
                        <div className="font-extrabold text-slate-900 dark:text-white uppercase text-xs sm:text-sm truncate flex items-center gap-1.5">
                          <span className="truncate">{maskStudentName(s.namaLengkap)}</span>
                          {s.isVerified && (
                            <span title="Akun Terverifikasi" className="inline-flex items-center">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                          <School className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="uppercase truncate">{s.asalSekolah || '-'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 text-right">
                      <div className="hidden sm:block">
                        <div className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                          {tuntasCount} / 8 Modul Tuntas
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Rata-rata: <strong className="text-blue-600 dark:text-blue-400">{Math.round(avgScore)}</strong>
                        </div>
                      </div>

                      <div className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-800/60 flex flex-col items-center">
                        <span className="text-xs sm:text-sm font-black text-blue-700 dark:text-blue-300 tabular-nums">
                          {completedCount}/8
                        </span>
                        <span className="text-[9px] text-slate-400 uppercase font-bold">Modul</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
