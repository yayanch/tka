import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { OverallUserProgress } from '../types/quiz';
import { UserProfile } from '../types/auth';
import { BadgeDisplaySection } from './BadgeDisplaySection';
import { 
  Play, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  Award, 
  Zap, 
  ArrowRight,
  TrendingUp,
  Briefcase,
  Server,
  Network,
  ShieldAlert,
  Cpu,
  Layers,
  Gauge,
  Database,
  School,
  User,
  GraduationCap,
  BarChart3,
  FileCheck,
  ListChecks,
  Target,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles,
  Trophy
} from 'lucide-react';

import { JadwalHariIniCard } from './JadwalHariIniCard';
import { MaintenanceConfig } from './MaintenanceView';

interface DashboardViewProps {
  progress: OverallUserProgress;
  onStartExam: (weekId: number, mode: 'exam' | 'practice') => void;
  onStartSimulation?: (weekId: number, simIndex: number) => void;
  onExploreWeek?: (weekId: number) => void;
  onReadMaterial?: (weekId: number) => void;
  currentUser?: UserProfile | null;
  onOpenAuth?: (mode: 'register' | 'login') => void;
  onOpenTeacher?: () => void;
  onOpenTopScores?: () => void;
  onNavigateToModules?: () => void;
  viewMode?: 'home' | 'modules' | 'all';
  maintenanceConfig?: MaintenanceConfig;
}

const CATEGORY_ICONS: Record<number, React.ReactNode> = {
  1: <Briefcase className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
  2: <Server className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
  3: <Network className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
  4: <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
  5: <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  6: <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
  7: <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  8: <Gauge className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
};

// =========================================================================
// KOMPONEN STATISTIK SINGKAT (INTERACTIVE STATS GRID)
// =========================================================================
export interface StatistikSingkatProps {
  progress: OverallUserProgress;
  onStartExam?: (weekId: number, mode: 'exam' | 'practice') => void;
  onExploreWeek?: (weekId: number) => void;
  onReadMaterial?: (weekId: number) => void;
}

export const StatistikSingkat: React.FC<StatistikSingkatProps> = ({
  progress,
  onStartExam,
  onExploreWeek,
  onReadMaterial,
}) => {
  const [activeDetail, setActiveDetail] = useState<'none' | 'exams' | 'score' | 'mastered' | 'questions'>('none');

  // Aggregate stats
  const officialHistory = progress.history.filter(h => h.mode !== 'simulation');
  const totalAttempts = officialHistory.length;
  const totalAnswered = officialHistory.reduce((acc, curr) => acc + curr.total, 0);
  
  let totalScoreSum = 0;
  let countScored = 0;
  let masteredWeeks = 0;
  let attemptedModulesCount = 0;

  CATEGORIES.forEach(cat => {
    const stat = progress.categoryStats[cat.id];
    if (stat && stat.attempts > 0) {
      attemptedModulesCount += 1;
      totalScoreSum += stat.highestScore;
      countScored += 1;
      if (stat.highestScore >= 75) {
        masteredWeeks += 1;
      }
    }
  });

  const averageScoreNum = totalScoreSum / 8;
  const averageHighestScore = averageScoreNum.toFixed(1);
  const progressPercent = Math.round((masteredWeeks / 8) * 100);

  const getScoreStatus = () => {
    if (countScored === 0) return { label: 'Belum Ada Ujian', color: 'text-slate-500 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700' };
    if (averageScoreNum >= 85) return { label: 'Sangat Memuaskan (A)', color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' };
    if (averageScoreNum >= 75) return { label: 'Kompeten / Lulus KKM (B)', color: 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800' };
    return { label: 'Perlu Peningkatan (< 75)', color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800' };
  };

  const scoreStatus = getScoreStatus();

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Statistik Singkat
              </h2>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Interaktif
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Ringkasan performa ujian mandiri dan rata-rata skor siswa pada 8 modul TKA
            </p>
          </div>
        </div>
        <div className="text-[11px] text-slate-500 font-medium">
          {activeDetail !== 'none' ? 'Klik kartu kembali untuk menutup rincian' : 'Klik kartu untuk melihat rincian modul'}
        </div>
      </div>

      {/* 4-Card Interactive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* CARD 1: Jumlah Ujian Diselesaikan */}
        <div 
          onClick={() => setActiveDetail(activeDetail === 'exams' ? 'none' : 'exams')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group select-none ${
            activeDetail === 'exams'
              ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
              : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-blue-400 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              Ujian Diselesaikan
            </span>
            <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {totalAttempts}
            </span>
            <span className="text-xs text-slate-400 ml-1.5 font-semibold">kali ujian</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 font-medium">
              {attemptedModulesCount} dari 8 Modul
            </span>
            <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-0.5">
              <span>{activeDetail === 'exams' ? 'Tutup' : 'Rincian'}</span>
              {activeDetail === 'exams' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </span>
          </div>
        </div>

        {/* CARD 2: Rata-Rata Skor Siswa */}
        <div 
          onClick={() => setActiveDetail(activeDetail === 'score' ? 'none' : 'score')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group select-none ${
            activeDetail === 'score'
              ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
              : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-emerald-400 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              Rata-rata Skor Siswa
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
              {averageHighestScore}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ 100</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] gap-1">
            <span className={`px-2 py-0.5 rounded-full font-bold border text-[10px] truncate max-w-[130px] ${scoreStatus.color}`}>
              {scoreStatus.label}
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 shrink-0">
              <span>{activeDetail === 'score' ? 'Tutup' : 'Rincian'}</span>
              {activeDetail === 'score' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </span>
          </div>
        </div>

        {/* CARD 3: Modul Kompeten (>= 75) */}
        <div 
          onClick={() => setActiveDetail(activeDetail === 'mastered' ? 'none' : 'mastered')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group select-none ${
            activeDetail === 'mastered'
              ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
              : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-amber-400 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              Modul Kompeten (&ge;75)
            </span>
            <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {masteredWeeks}
            </span>
            <span className="text-xs text-slate-400 ml-1.5 font-semibold">dari 8 Modul</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-amber-600 dark:text-amber-400 font-bold">
              {progressPercent}% Tuntas KKM
            </span>
            <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
              <span>{activeDetail === 'mastered' ? 'Tutup' : 'Rincian'}</span>
              {activeDetail === 'mastered' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </span>
          </div>
        </div>

        {/* CARD 4: Total Soal Diselesaikan */}
        <div 
          onClick={() => setActiveDetail(activeDetail === 'questions' ? 'none' : 'questions')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group select-none ${
            activeDetail === 'questions'
              ? 'bg-purple-50/80 dark:bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/20 shadow-xs'
              : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-purple-400 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              Soal Dikerjakan
            </span>
            <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400">
              <ListChecks className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {totalAnswered}
            </span>
            <span className="text-xs text-slate-400 ml-1.5 font-semibold">butir soal</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 font-medium">
              Dari 400 bank soal
            </span>
            <span className="font-bold text-purple-600 dark:text-purple-400 flex items-center gap-0.5">
              <span>{activeDetail === 'questions' ? 'Tutup' : 'Rincian'}</span>
              {activeDetail === 'questions' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Detail Expansion Panel */}
      {activeDetail !== 'none' && (
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 animate-fadeIn">
          <div className="bg-slate-50 dark:bg-slate-800/70 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  {activeDetail === 'exams' && 'Rincian Frekuensi Pengerjaan per Modul'}
                  {activeDetail === 'score' && 'Rincian Skor Tertinggi vs Standar KKM (75.0)'}
                  {activeDetail === 'mastered' && 'Status Kelulusan per Modul (&ge;75.0)'}
                  {activeDetail === 'questions' && 'Distribusi Latihan Soal per Modul'}
                </span>
              </div>
              <button
                onClick={() => setActiveDetail('none')}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                title="Tutup Rincian"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content for EXAMS breakdown */}
            {activeDetail === 'exams' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
                {CATEGORIES.map(cat => {
                  const stat = progress.categoryStats[cat.id];
                  const attempts = stat?.attempts || 0;
                  return (
                    <div 
                      key={cat.id} 
                      className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span className="font-bold text-blue-600 dark:text-blue-400">Modul {cat.id}</span>
                          <span className="font-semibold">{attempts}x Dikerjakan</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                          {cat.shortTitle}
                        </h4>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">Skor: <strong className="text-slate-700 dark:text-slate-200 font-bold">{stat?.highestScore ?? '-'}</strong></span>
                        {onStartExam && (
                          <button
                            onClick={() => onStartExam(cat.id, 'exam')}
                            className="text-[10px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
                          >
                            {attempts > 0 ? 'Ujian Lagi' : 'Mulai'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Content for SCORE breakdown */}
            {activeDetail === 'score' && (
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CATEGORIES.map(cat => {
                    const stat = progress.categoryStats[cat.id];
                    const score = stat?.highestScore || 0;
                    const isPass = score >= 75;
                    const hasAttempt = (stat?.attempts || 0) > 0;

                    return (
                      <div key={cat.id} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
                            Modul {cat.id}: {cat.shortTitle}
                          </span>
                          <span className={`font-black font-mono ${hasAttempt ? (isPass ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400') : 'text-slate-400'}`}>
                            {hasAttempt ? `${score} / 100` : 'Belum Ujian'}
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${hasAttempt ? (isPass ? 'bg-emerald-500' : 'bg-amber-500') : 'bg-slate-300 dark:bg-slate-700'}`}
                            style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Content for MASTERED breakdown */}
            {activeDetail === 'mastered' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Column 1: Modul Kompeten */}
                <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Modul Kompeten (&ge; 75.0) — {masteredWeeks} Modul</span>
                  </div>
                  {masteredWeeks === 0 ? (
                    <p className="text-xs text-slate-500 italic py-2">
                      Belum ada modul yang mencapai skor &ge; 75. Mulai simulasi ujian untuk meraih kelulusan!
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      {CATEGORIES.filter(cat => (progress.categoryStats[cat.id]?.highestScore || 0) >= 75).map(cat => (
                        <div key={cat.id} className="flex items-center justify-between text-xs bg-white dark:bg-slate-900 p-2 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                            Modul {cat.id}: {cat.shortTitle}
                          </span>
                          <span className="font-black text-emerald-600 font-mono">
                            {progress.categoryStats[cat.id]?.highestScore}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Column 2: Modul Belum Kompeten */}
                <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Perlu Peningkatan / Belum Dikerjakan — {8 - masteredWeeks} Modul</span>
                  </div>
                  {8 - masteredWeeks === 0 ? (
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold py-2">
                      Luar biasa! Seluruh 8 modul pembelajaran telah berhasil dikuasai dengan tuntas.
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      {CATEGORIES.filter(cat => (progress.categoryStats[cat.id]?.highestScore || 0) < 75).map(cat => {
                        const stat = progress.categoryStats[cat.id];
                        return (
                          <div key={cat.id} className="flex items-center justify-between text-xs bg-white dark:bg-slate-900 p-2 rounded-lg border border-amber-100 dark:border-amber-900/50">
                            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                              Modul {cat.id}: {cat.shortTitle}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-slate-500 font-mono">
                                {stat && stat.attempts > 0 ? `Skor ${stat.highestScore}` : 'Belum'}
                              </span>
                              {onStartExam && (
                                <button
                                  onClick={() => onStartExam(cat.id, 'exam')}
                                  className="text-[10px] font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded transition-colors cursor-pointer"
                                >
                                  Mulai
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Content for QUESTIONS breakdown */}
            {activeDetail === 'questions' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
                {CATEGORIES.map(cat => {
                  const stat = progress.categoryStats[cat.id];
                  const attempts = stat?.attempts || 0;
                  const answeredInCat = attempts * 50;
                  return (
                    <div key={cat.id} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div className="text-[11px] font-bold text-purple-600 dark:text-purple-400">
                        Modul {cat.id}
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                        {cat.shortTitle}
                      </h4>
                      <div className="mt-2 text-xs flex items-center justify-between text-slate-500">
                        <span>Paket Soal:</span>
                        <strong className="text-slate-800 dark:text-slate-200">50 Soal</strong>
                      </div>
                      <div className="mt-1 text-xs flex items-center justify-between text-slate-500">
                        <span>Dikerjakan:</span>
                        <strong className="text-purple-600 dark:text-purple-400">{answeredInCat} butir</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export const DashboardView: React.FC<DashboardViewProps> = ({
  progress,
  onStartExam,
  onStartSimulation,
  onExploreWeek,
  onReadMaterial,
  currentUser,
  onOpenAuth,
  onOpenTeacher,
  onOpenTopScores,
  onNavigateToModules,
  viewMode = 'all',
  maintenanceConfig,
}) => {
  // Aggregate stats
  const totalAttempts = progress.totalAttempts;
  const totalAnswered = progress.totalQuestionsAnswered;
  
  let totalScoreSum = 0;
  let countScored = 0;
  let masteredWeeks = 0;

  Object.values(progress.categoryStats).forEach(stat => {
    if (stat.attempts > 0) {
      totalScoreSum += stat.highestScore;
      countScored += 1;
      if (stat.highestScore >= 75) {
        masteredWeeks += 1;
      }
    }
  });

  const averageHighestScore = (totalScoreSum / 8).toFixed(1);

  // Compute active week (first uncompleted week or week 1)
  let activeWeekId = 1;
  for (let w = 1; w <= 8; w++) {
    const st = progress.categoryStats[w];
    if (!st || st.attempts === 0 || st.highestScore < 75) {
      activeWeekId = w;
      break;
    }
  }
  const activeCategory = CATEGORIES.find(c => c.id === activeWeekId) || CATEGORIES[0];
  const activeStat = progress.categoryStats[activeWeekId];
  const progressPercent = Math.round((masteredWeeks / 8) * 100);

  return (
    <div className="space-y-6 pb-16">
      {/* Widget Jadwal Hari Ini & Status Operasional Server */}
      <JadwalHariIniCard
        progress={progress}
        maintenanceConfig={maintenanceConfig}
        onStartExam={onStartExam}
        onNavigateToModules={onNavigateToModules}
      />

      {/* 8 Modul Pembelajaran Header (when viewMode is 'modules') */}
      {viewMode === 'modules' && (
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white border border-blue-600/30 rounded-2xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-xl pointer-events-none" />
          <div className="space-y-1 relative z-10">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-200">
              <Layers className="w-4 h-4 text-blue-300" />
              <span>8 Modul Pembelajaran TKA</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Paket Ujian & Pembelajaran CBT TKA SMK TJKT
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl leading-relaxed">
              Tersedia 8 modul kurikulum kejuruan (total 400 bank soal terstandar). Pilih modul di bawah ini untuk memulai latihan kuis mandiri atau membaca materi rangkuman.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 self-stretch sm:self-center justify-end relative z-10">
            <div className="px-3 py-1.5 rounded-xl bg-white/15 border border-white/20 backdrop-blur-md text-xs font-bold text-white shadow-2xs">
              KKM: &ge; 75.0
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/15 border border-white/20 backdrop-blur-md text-xs font-bold text-white shadow-2xs">
              8 Modul · 400 Soal
            </div>
          </div>
        </div>
      )}

      {/* Student Account & MySQL Persistence Status Banner (shown on home or guest) */}
      {viewMode !== 'modules' && (
        currentUser ? (
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white border border-blue-600/30 rounded-2xl p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/30 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs backdrop-blur-md">
                {currentUser.namaLengkap.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-extrabold text-white text-sm sm:text-base">
                    {currentUser.namaLengkap}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-400/30">
                    <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                    <span>Email Terverifikasi</span>
                  </span>
                  <span className="text-[10px] text-blue-100 bg-white/15 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold border border-white/20">
                    {currentUser.authProvider === 'google' ? 'Google Auth' : 'Form Registrasi'}
                  </span>
                </div>
                <p className="text-xs text-blue-100/90 flex items-center gap-1.5 mt-1">
                  <School className="w-3.5 h-3.5 text-blue-200 shrink-0" />
                  <span className="font-semibold text-white">{currentUser.asalSekolah}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentUser.email}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 self-stretch sm:self-center justify-end relative z-10">
              {onOpenTopScores && (
                <button
                  onClick={onOpenTopScores}
                  className="text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 px-4 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-md shrink-0"
                >
                  <Trophy className="w-4 h-4 text-slate-950" />
                  <span>🏆 Top Skor & Leaderboard</span>
                </button>
              )}

              {onOpenTeacher && currentUser?.role === 'admin' && (
                <button
                  onClick={onOpenTeacher}
                  className="text-xs font-bold text-white bg-white/20 hover:bg-white/30 border border-white/30 px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs backdrop-blur-md"
                >
                  <GraduationCap className="w-4 h-4 text-blue-200" />
                  <span>Portal Admin</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white border border-blue-600/30 rounded-2xl p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
            <div className="space-y-1 relative z-10">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-200">
                <Database className="w-4 h-4 text-blue-300 shrink-0" />
                <span>Pencatatan Riwayat Ujian & Hasil Kuis ke Basis Data MySQL</span>
              </div>
              <p className="text-xs text-blue-100/90 max-w-2xl leading-relaxed">
                Daftarkan diri Anda melalui formulir isian (Nama Lengkap, Asal Sekolah, Email) atau Masuk Cepat dengan Akun Google. Seluruh hasil pengerjaan quiz Anda akan otomatis tersimpan di database MySQL.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 relative z-10">
              <button
                onClick={() => onOpenAuth?.('register')}
                className="px-4 py-2 text-xs font-bold text-blue-900 bg-white hover:bg-blue-50 rounded-xl shadow-2xs transition-colors cursor-pointer whitespace-nowrap"
              >
                Daftar
              </button>
              <button
                onClick={() => onOpenAuth?.('login')}
                className="px-4 py-2 text-xs font-bold text-white bg-white/15 hover:bg-white/25 rounded-xl border border-white/25 backdrop-blur-md transition-colors cursor-pointer whitespace-nowrap"
              >
                Masuk
              </button>
            </div>
          </div>
        )
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE STUDENT QUICK CARDS (KARTU CEPAT SISWA) - RINGKAS & MINIMALIS   */}
      {/* ========================================================================= */}
      {(viewMode === 'home' || viewMode === 'all') && (
        <>
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Kartu Cepat Dasbor Siswa</span>
              </h2>
              <span className="text-xs text-slate-500 font-medium">Aksi Cepat & Navigasi</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {/* CARD 1: Modul Latihan Aktif */}
              <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-3 hover:shadow-md transition-all border border-blue-500/30">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md text-blue-100 backdrop-blur-xs">
                      Modul Aktif
                    </span>
                    <span className="text-xs font-bold text-blue-200 font-mono">
                      Modul {activeWeekId} / 8
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-white truncate">
                      {activeCategory.shortTitle}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-blue-100 font-medium bg-black/15 px-2.5 py-1.5 rounded-lg border border-white/10">
                    <span className="truncate">Skor: <strong className="text-white font-bold">{activeStat?.highestScore ?? 0}</strong></span>
                    <span className="opacity-40">•</span>
                    <span className="truncate">Ujian: <strong className="text-white font-bold">{activeStat?.attempts ?? 0}x</strong></span>
                  </div>
                </div>

                <button
                  onClick={() => onStartExam(activeWeekId, 'exam')}
                  className="w-full py-1.5 px-3 bg-white hover:bg-blue-50 text-blue-800 text-xs font-extrabold rounded-xl shadow-2xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-blue-800" />
                  <span>Lanjutkan Kuis</span>
                </button>
              </div>

              {/* CARD 2: Progres Belajar */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-3 hover:border-emerald-500/50 transition-all">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                      Progres Belajar
                    </span>
                    <span className="text-xs font-black font-mono text-emerald-600 dark:text-emerald-400">
                      {progressPercent}% Tuntas
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Penguasaan:</span>
                      <span className="font-extrabold text-slate-900 dark:text-white text-xs">{masteredWeeks} / 8 Modul (&ge;75)</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-1 text-[11px] pt-0.5">
                    <span className="text-slate-500">Rerata: <strong className="text-blue-600 dark:text-blue-400 font-black">{averageHighestScore}</strong></span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">Soal Dijawab: <strong className="text-slate-900 dark:text-white font-black">{totalAnswered}</strong></span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (onNavigateToModules) {
                      onNavigateToModules();
                    } else {
                      const el = document.getElementById('daftar-modul-pembelajaran');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full py-1.5 px-3 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-emerald-200/80 dark:border-emerald-800/60"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Buka 8 Modul Pembelajaran</span>
                </button>
              </div>

              {/* CARD 3: Status Akun */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-3 hover:border-purple-500/50 transition-all">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 px-2 py-0.5 rounded-md border border-purple-200 dark:border-purple-800">
                      Status Akun
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {currentUser?.authProvider === 'google' ? 'Google OAuth' : 'Email Direct'}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                      {currentUser ? currentUser.namaLengkap : 'Pengunjung Tamu'}
                    </h3>
                    <p className="text-xs text-slate-500 truncate">
                      {currentUser ? currentUser.email : 'Belum Login / Terdaftar'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-0.5">
                    <span className="text-slate-500 text-[11px] truncate">{currentUser?.asalSekolah || 'SMK Kejuruan'}</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 shrink-0 text-[11px]">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Terverifikasi</span>
                    </span>
                  </div>
                </div>

                {!currentUser ? (
                  <button
                    onClick={() => onOpenAuth?.('register')}
                    className="w-full py-1.5 px-3 bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Daftar Akun Sekarang</span>
                  </button>
                ) : (
                  <div className="py-1 px-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-center text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    Siswa Terdaftar Active
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* STATISTIK SINGKAT (INTERACTIVE STATS GRID)                                 */}
          {/* ========================================================================= */}
          <StatistikSingkat
            progress={progress}
            onStartExam={onStartExam}
            onExploreWeek={onExploreWeek}
            onReadMaterial={onReadMaterial}
          />

          {/* ========================================================================= */}
          {/* LENCANA & PENCAPAIAN SISWA (BADGE SYSTEM)                                   */}
          {/* ========================================================================= */}
          <BadgeDisplaySection
            progress={progress}
            onNavigateToModules={onNavigateToModules}
          />

          {/* Quick CTA banner to open 8 Modul Pembelajaran on Home (Hidden for Admin) */}
          {onNavigateToModules && currentUser?.role !== 'admin' && (
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <h3 className="text-base font-bold flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-200" />
                  <span>Siap Memulai Ujian 8 Modul Pembelajaran?</span>
                </h3>
                <p className="text-xs text-blue-100/90 max-w-xl">
                  Akses 400 bank soal terstandar kurikulum TKA TJKT yang terbagi rata dalam 8 modul kompetensi kejuruan.
                </p>
              </div>
              <button
                onClick={onNavigateToModules}
                className="px-4 py-2.5 bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <span>Buka 8 Modul Pembelajaran</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}

      {/* Categories Grid (8 Weeks) - ONLY SHOWN ON 'modules' OR 'all' */}
      {(viewMode === 'modules' || viewMode === 'all') && (
        <>
          <section id="daftar-modul-pembelajaran" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Daftar 8 Paket Pembelajaran TKA
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Setiap modul terdiri dari 50 soal (30 PG + 10 PGK Kategori + 10 PGK MCMA) sesuai standar asesmen SMK
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Kriteria Kelulusan: &ge; 75.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CATEGORIES.map((cat) => {
            const stat = progress.categoryStats[cat.id] || {
              attempts: 0,
              highestScore: 0,
              latestScore: 0,
              latestDate: '',
            };
            const isCompleted = stat.attempts > 0;
            const isMastered = stat.highestScore >= 75;

            return (
              <div
                key={cat.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                        {CATEGORY_ICONS[cat.id]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-semibold text-blue-600 dark:text-blue-400">
                            Modul {cat.id}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{cat.questionCount} Soal</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                          {cat.shortTitle}
                        </h3>
                      </div>
                    </div>

                    {isCompleted ? (
                      <div className="text-right shrink-0">
                        <span className="text-[11px] text-slate-400 block">Skor Terbaik</span>
                        <span className={`text-base font-bold tabular-nums ${isMastered ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                          {stat.highestScore}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 shrink-0">
                        Belum Dikerjakan
                      </span>
                    )}
                  </div>

                  {/* Subtitle / Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Composition Breakdown */}
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 flex-wrap">
                    <span>30 PG</span>
                    <span aria-hidden="true">·</span>
                    <span>10 PGK Kategori</span>
                    <span aria-hidden="true">·</span>
                    <span>10 PGK MCMA</span>
                    {stat.attempts > 0 && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-500">Dikerjakan {stat.attempts}x</span>
                      </>
                    )}
                  </div>
                </div>

                {/* 5 Simulation Circles (1 to 5, 10 questions each) */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    Simulasi per Modul (5 Sesi x 10 Soal):
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {[1, 2, 3, 4, 5].map(simNum => {
                      const isSimCompleted = progress.completedSimulations?.[cat.id]?.includes(simNum);
                      return (
                        <button
                          key={simNum}
                          onClick={() => {
                            if (onStartSimulation) {
                              onStartSimulation(cat.id, simNum);
                            } else {
                              onStartExam(cat.id, 'practice');
                            }
                          }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shadow-xs transition-transform hover:scale-110 cursor-pointer ${
                            isSimCompleted
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                          title={`Simulasi ${simNum} Modul ${cat.id} (10 Soal). ${isSimCompleted ? 'Status: Selesai (Hijau)' : 'Status: Belum Selesai (Biru)'}`}
                        >
                          {simNum}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                  {onReadMaterial ? (
                    <button
                      onClick={() => onReadMaterial(cat.id)}
                      className="px-3.5 py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-blue-200 dark:border-blue-800 cursor-pointer shrink-0"
                      title="Baca Materi Pembelajaran Modul Ini"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Materi Modul</span>
                    </button>
                  ) : null}

                  <button
                    onClick={() => onStartExam(cat.id, 'exam')}
                    className="flex-1 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Mulai Ujian</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Learning Advice & Strategy */}
      <section className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Petunjuk Format Soal TKA SMK TJKT
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-semibold text-slate-900 dark:text-white block">
              1. Pilihan Ganda Biasa (No. 1–30)
            </span>
            <p>
              Pilih satu jawaban paling tepat dari opsi A, B, C, D, atau E. Setiap jawaban benar bernilai 1 poin penuh.
            </p>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-semibold text-slate-900 dark:text-white block">
              2. PGK Kategori Benar / Salah (No. 31–40)
            </span>
            <p>
              Tentukan status Benar atau Salah untuk masing-masing dari 3 pernyataan (A, B, C). Skor dihitung proporsional per pernyataan benar.
            </p>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-semibold text-slate-900 dark:text-white block">
              3. PGK MCMA / Kotak Centang (No. 41–50)
            </span>
            <p>
              Pilihlah semua jawaban yang benar (jawaban benar lebih dari satu). Centang semua pernyataan yang valid sesuai SOP.
            </p>
          </div>
        </div>
      </section>
        </>
      )}
    </div>
  );
};
