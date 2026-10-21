import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Wrench, 
  AlertTriangle, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Layers, 
  Wifi, 
  ShieldCheck 
} from 'lucide-react';
import { MaintenanceConfig } from './MaintenanceView';
import { OverallUserProgress } from '../types/quiz';

interface JadwalHariIniCardProps {
  progress?: OverallUserProgress;
  maintenanceConfig?: MaintenanceConfig;
  onStartExam?: (weekId: number, mode: 'exam' | 'practice') => void;
  onNavigateToModules?: () => void;
}

export const JadwalHariIniCard: React.FC<JadwalHariIniCardProps> = ({
  progress,
  maintenanceConfig,
  onStartExam,
  onNavigateToModules,
}) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format today's date in Indonesian
  const formattedToday = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedTime = now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const isMaintenance = maintenanceConfig?.enabled;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-5 text-left">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Jadwal Hari Ini</span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300">
                {formattedToday}
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Status operasional server, jadwal sesi ujian CBT, dan estimasi waktu pemeliharaan.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>{formattedTime} WIB</span>
          </span>
        </div>
      </div>

      {/* Maintenance vs Active System Status Banner */}
      {isMaintenance ? (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
              <Wrench className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-2">
                <span>Jadwal Pemeliharaan Server Aktif</span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-200/90 mt-0.5 font-medium">
                {maintenanceConfig?.title || 'Sistem dalam pemeliharaan berkala.'}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 block">
              Target Selesai:
            </span>
            <span className="text-xs font-black text-amber-900 dark:text-white block">
              {new Date(maintenanceConfig?.targetEndTime || Date.now()).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
              })} WIB
            </span>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <span>Sistem Operasional Normal (Online)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Portal ujian CBT 8 Modul TKA SMK TJKT siap diakses 24 Jam hari ini.
              </p>
            </div>
          </div>

          {onNavigateToModules && (
            <button
              onClick={onNavigateToModules}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-2xs cursor-pointer flex items-center gap-2 self-start sm:self-center shrink-0"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Lihat Sesi Ujian Hari Ini</span>
            </button>
          )}
        </div>
      )}

      {/* Grid Status Sesi Ujian 8 Modul Hari Ini */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-500" />
            <span>Jadwal &amp; Status 8 Modul Ujian Hari Ini</span>
          </span>
          <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">
            Standar KKM: &ge; 75.0
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((modNum) => {
            const stat = progress?.categoryStats?.[modNum];
            const hasPassed = (stat?.highestScore || 0) >= 75;
            const hasAttempted = (stat?.attempts || 0) > 0;

            return (
              <div
                key={modNum}
                className={`p-3 rounded-2xl border transition-all flex flex-col justify-between gap-2 ${
                  hasPassed
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                    : hasAttempted
                    ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[11px] font-black text-blue-600 dark:text-blue-400">
                      Modul {modNum}
                    </span>
                    {hasPassed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : hasAttempted ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </div>
                  <div className="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-tight">
                    {hasPassed ? 'Tuntas KKM' : hasAttempted ? 'Belum Tuntas' : 'Siap Diambil'}
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-900 dark:text-white tabular-nums">
                    {stat?.highestScore !== undefined ? stat.highestScore.toFixed(0) : '-'}
                  </span>
                  {onStartExam && (
                    <button
                      onClick={() => onStartExam(modNum, 'exam')}
                      className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      Mulai
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
