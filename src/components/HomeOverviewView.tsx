import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  ArrowRight, 
  Edit3, 
  Network, 
  Server, 
  Wifi, 
  Trophy,
  Users,
  School,
  Radio
} from 'lucide-react';
import { UserProfile } from '../types/auth';
import { HeroConfig, getStoredHeroConfig } from '../utils/heroStorage';

interface HomeOverviewViewProps {
  currentUser?: UserProfile | null;
  onOpenAuth?: (mode: 'register' | 'login') => void;
  onOpenDashboard?: () => void;
  onOpenHeroSettings?: () => void;
  onOpenTopScores?: () => void;
  heroConfig?: HeroConfig;
}

export const HomeOverviewView: React.FC<HomeOverviewViewProps> = ({
  currentUser,
  onOpenAuth,
  onOpenDashboard,
  onOpenHeroSettings,
  onOpenTopScores,
  heroConfig,
}) => {
  const config = heroConfig || getStoredHeroConfig();
  const [liveOnline, setLiveOnline] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/server/metrics')
      .then(res => res.json())
      .then(data => {
        if (isMounted && data && typeof data.activeOnlineSessions === 'number') {
          setLiveOnline(data.activeOnlineSessions);
        }
      })
      .catch(() => {});
    return () => { isMounted = false; };
  }, []);

  const totalStudents = config.totalStudentsCount || '2315';
  const totalSchools = config.totalSchoolsCount || '483';
  const onlineStudents = config.onlineStudentsCount || (liveOnline !== null ? String(liveOnline) : '13');

  // Hero Stats Items Component without fill and border
  const renderHeroStatsCards = (isHeroDark = true) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 w-full">
      {/* Item 1: Total Siswa Terdaftar */}
      <div className="flex flex-col justify-between py-1 transition-transform duration-300 hover:-translate-y-0.5">
        <div className="flex items-center justify-between gap-3">
          <span className={`text-xs sm:text-sm font-bold block leading-tight tracking-wide ${
            isHeroDark ? 'text-blue-100/80' : 'text-slate-500 dark:text-slate-400'
          }`}>
            Total Siswa Terdaftar
          </span>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105 ${
            isHeroDark 
              ? 'bg-blue-500/20 text-blue-300'
              : 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
          }`}>
            <Users className="w-5 h-5" />
          </div>
        </div>
        <div className={`mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight tabular-nums ${
          isHeroDark ? 'text-white' : 'text-slate-900 dark:text-white'
        }`}>
          {totalStudents}
        </div>
      </div>

      {/* Item 2: Jumlah Sekolah Terdaftar */}
      <div className="flex flex-col justify-between py-1 transition-transform duration-300 hover:-translate-y-0.5">
        <div className="flex items-center justify-between gap-3">
          <span className={`text-xs sm:text-sm font-bold block leading-tight tracking-wide ${
            isHeroDark ? 'text-purple-100/80' : 'text-slate-500 dark:text-slate-400'
          }`}>
            Jumlah Sekolah Terdaftar
          </span>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105 ${
            isHeroDark 
              ? 'bg-purple-500/20 text-purple-300'
              : 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400'
          }`}>
            <School className="w-5 h-5" />
          </div>
        </div>
        <div className={`mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight tabular-nums ${
          isHeroDark ? 'text-purple-400' : 'text-purple-600 dark:text-purple-400'
        }`}>
          {totalSchools}
        </div>
      </div>

      {/* Item 3: Siswa Sedang Online */}
      <div className="flex flex-col justify-between py-1 transition-transform duration-300 hover:-translate-y-0.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className={`text-xs sm:text-sm font-bold block leading-tight truncate tracking-wide ${
              isHeroDark ? 'text-emerald-100/80' : 'text-slate-500 dark:text-slate-400'
            }`}>
              Siswa Sedang Online
            </span>
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 ${
                isHeroDark ? 'shadow-[0_0_10px_rgba(52,211,153,0.9)]' : ''
              }`}></span>
            </span>
          </div>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105 ${
            isHeroDark 
              ? 'bg-emerald-500/20 text-emerald-300'
              : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
          }`}>
            <Radio className="w-5 h-5" />
          </div>
        </div>
        <div className={`mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight tabular-nums ${
          isHeroDark ? 'text-emerald-400' : 'text-emerald-600 dark:text-emerald-400'
        }`}>
          {onlineStudents}
        </div>
      </div>
    </div>
  );

  // If user is logged in, show clean role overview and quick hero stats
  if (currentUser) {
    const isAdmin = currentUser.role === 'admin';
    return (
      <div className="pb-16 space-y-6">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white border border-blue-600/30 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Subtle Watermark Icon */}
          <div className="absolute -right-6 -bottom-6 pointer-events-none text-white/5 select-none">
            <Network className="w-56 h-56 stroke-[1] transform rotate-12" />
          </div>

          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-blue-100 border border-white/20 backdrop-blur-md">
              <GraduationCap className="w-4 h-4 text-blue-200" />
              <span>{isAdmin ? 'Portal Admin & Instruktur' : 'Dasbor Pembelajaran Siswa'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Selamat Datang Kembali, {currentUser.namaLengkap}!
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/90 max-w-xl leading-relaxed">
              {isAdmin 
                ? 'Kelola identitas pengguna terdaftar, pantau log email OTP, dan unduh rekapitulasi nilai kelas.'
                : 'Akses 8 modul kuis TKA TJKT, pantau progres belajar, dan pelajari materi kompetensi.'
              }
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap relative z-10">
            {isAdmin && onOpenHeroSettings && (
              <button
                onClick={onOpenHeroSettings}
                className="px-4 py-3 text-xs sm:text-sm font-bold text-amber-200 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 rounded-2xl transition-colors cursor-pointer flex items-center gap-2 shrink-0 backdrop-blur-md"
                title="Pengaturan Teks Hero Banner"
              >
                <Edit3 className="w-4 h-4 text-amber-300" />
                <span>Pengaturan Hero</span>
              </button>
            )}

            <button
              onClick={onOpenDashboard}
              className="px-6 py-3 text-xs sm:text-sm font-extrabold text-blue-950 bg-white hover:bg-blue-50 active:bg-blue-100 rounded-2xl shadow-sm transition-colors cursor-pointer flex items-center gap-2 shrink-0"
            >
              <span>{isAdmin ? 'Buka Dasbor Admin' : 'Buka 8 Modul Ujian'}</span>
              <ArrowRight className="w-4 h-4 text-blue-900" />
            </button>
          </div>
        </div>

        {/* 3 Main Hero Stats Cards in Logged-in Overview */}
        {renderHeroStatsCards(false)}
      </div>
    );
  }

  // Public Hero Banner (Only shown for guest visitors before login - Full Page without space)
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-x-clip">
      {/* Full Page Hero Section */}
      <section className="relative overflow-hidden w-full min-h-[calc(100vh-4rem)] bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 text-white px-4 sm:px-8 lg:px-16 py-12 flex flex-col justify-center shadow-2xl box-border">
        {/* Subtle Decorative Background Circles */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-[450px] h-[450px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* TJKT Decorative Background Watermarks */}
        <div className="absolute -right-12 -bottom-12 pointer-events-none select-none text-blue-400/10 transition-all">
          <Network className="w-96 h-96 sm:w-[520px] sm:h-[520px] stroke-[1] transform rotate-12" />
        </div>
        <div className="absolute right-1/3 -top-16 pointer-events-none select-none text-indigo-400/5 hidden md:block">
          <Server className="w-80 h-80 stroke-[1] transform -rotate-12" />
        </div>
        <div className="absolute left-1/2 bottom-4 pointer-events-none select-none text-emerald-400/5 hidden lg:block">
          <Wifi className="w-64 h-64 stroke-[1]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full space-y-8 my-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 backdrop-blur-xs">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            <span>{config.badge}</span>
          </div>

          <h1 className={`${config.titleFontSize || 'text-3xl sm:text-5xl lg:text-6xl'} font-black tracking-tight leading-tight sm:leading-tight max-w-5xl`}>
            {config.title}
          </h1>

          <p className={`${config.descFontSize || 'text-base sm:text-lg lg:text-xl'} text-slate-300 leading-relaxed max-w-4xl whitespace-pre-line font-normal`}>
            {config.description}
          </p>

          {onOpenAuth && (
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onOpenAuth('register')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Daftar &amp; Mulai Ujian</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* 3 Main Hero Stats Cards (Total Siswa Terdaftar, Jumlah Sekolah Terdaftar, Siswa Sedang Online) */}
          <div className="pt-2">
            {renderHeroStatsCards(true)}
          </div>

          {/* Stats Bar - Positioned at bottom inside full page hero */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            <div className="space-y-1">
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-black text-white">{config.stat1Number}</span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">{config.stat1Label}</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-black text-blue-400">{config.stat2Number}</span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">{config.stat2Label}</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-400">{config.stat3Number}</span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">{config.stat3Label}</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-black text-amber-400">{config.stat4Number}</span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">{config.stat4Label}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

