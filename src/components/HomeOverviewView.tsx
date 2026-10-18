import React from 'react';
import { GraduationCap, ArrowRight, Edit3, Network, Server, Wifi } from 'lucide-react';
import { UserProfile } from '../types/auth';
import { HeroConfig, getStoredHeroConfig } from '../utils/heroStorage';

interface HomeOverviewViewProps {
  currentUser?: UserProfile | null;
  onOpenAuth?: (mode: 'register' | 'login') => void;
  onOpenDashboard?: () => void;
  onOpenHeroSettings?: () => void;
  heroConfig?: HeroConfig;
}

export const HomeOverviewView: React.FC<HomeOverviewViewProps> = ({
  currentUser,
  onOpenAuth,
  onOpenDashboard,
  onOpenHeroSettings,
  heroConfig,
}) => {
  const config = heroConfig || getStoredHeroConfig();

  // If user is logged in, show clean role overview or shortcut card instead of public promo hero banner
  if (currentUser) {
    const isAdmin = currentUser.role === 'admin';
    return (
      <div className="pb-16 space-y-6">
        <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Subtle Watermark Icon */}
          <div className="absolute -right-6 -bottom-6 pointer-events-none text-slate-100 dark:text-slate-800/40 select-none">
            <Network className="w-56 h-56 stroke-[1] transform rotate-12" />
          </div>

          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              <GraduationCap className="w-4 h-4" />
              <span>{isAdmin ? 'Portal Admin & Instruktur' : 'Dasbor Pembelajaran Siswa'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Selamat Datang Kembali, {currentUser.namaLengkap}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
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
                className="px-4 py-3 text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 border border-amber-200 dark:border-amber-800 rounded-2xl transition-colors cursor-pointer flex items-center gap-2 shrink-0"
                title="Pengaturan Teks Hero Banner"
              >
                <Edit3 className="w-4 h-4" />
                <span>Pengaturan Hero</span>
              </button>
            )}

            <button
              onClick={onOpenDashboard}
              className="px-6 py-3 text-xs sm:text-sm font-extrabold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-2xl shadow-sm transition-colors cursor-pointer flex items-center gap-2 shrink-0"
            >
              <span>{isAdmin ? 'Buka Dasbor Admin' : 'Buka 8 Modul Ujian'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Public Hero Banner (Only shown for guest visitors before login - Full Page without space)
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-x-hidden">
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
