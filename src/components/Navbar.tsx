import { 
  Home, 
  BookOpen, 
  BarChart3, 
  Layers, 
  GraduationCap, 
  User, 
  LogOut, 
  CheckCircle2,
  Settings,
  Sun,
  Moon,
  Phone,
  Users,
  Building2,
  Trophy,
  MessageSquarePlus,
  Wrench
} from 'lucide-react';
import { UserProfile } from '../types/auth';
import { Theme } from '../utils/theme';
import { BrandingConfig, getStoredBrandingConfig } from '../utils/brandingStorage';

interface NavbarProps {
  currentTab: 'home' | 'dashboard' | 'learning' | 'bank' | 'stats' | 'teacher' | 'users' | 'schools';
  onSelectTab: (tab: 'home' | 'dashboard' | 'learning' | 'bank' | 'stats' | 'teacher' | 'users' | 'schools') => void;
  currentUser: UserProfile | null;
  onOpenAuth: (mode: 'register' | 'login') => void;
  onLogout: () => void;
  onOpenSettings?: () => void;
  onOpenTopScores?: () => void;
  onOpenFeedback?: () => void;
  onOpenMaintenanceSettings?: () => void;
  onOpenModuleSettings?: () => void;
  theme?: Theme;
  onToggleTheme?: () => void;
  onOpenContact?: () => void;
  brandingConfig?: BrandingConfig;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenSettings,
  onOpenTopScores,
  onOpenFeedback,
  onOpenMaintenanceSettings,
  theme,
  onToggleTheme,
  onOpenContact,
  brandingConfig,
}) => {
  const branding = brandingConfig || getStoredBrandingConfig();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title */}
        <div 
          onClick={() => {
            if (currentUser) onSelectTab('home');
          }} 
          className={`flex items-center gap-2.5 whitespace-nowrap shrink-0 group ${currentUser ? 'cursor-pointer' : 'cursor-default'}`}
          title={currentUser ? 'Kembali ke Beranda' : 'Platform TKA SMK TJKT'}
        >
          <div className="w-9 h-9 flex items-center justify-center overflow-hidden">
            {branding.logoUrl ? (
              <img id="navbar-logo-img" src={branding.logoUrl} alt="Logo" className="w-full h-full object-contain" />
            ) : branding.logoIcon ? (
              <i className={`${branding.logoIcon} text-xl text-blue-600 dark:text-blue-400`}></i>
            ) : (
              <span className="text-base font-black text-blue-600 dark:text-blue-400">
                {branding.logoText || 'TK'}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
              {branding.appShortName || 'TKA SMK TJKT'}
            </span>
            <span className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {branding.headerBadge || 'Bank 400 Soal & Pembahasan'}
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (HANYA DITAMPILKAN JIKA SUDAH LOGIN) */}
        {currentUser && (
          <nav className="hidden lg:flex items-center gap-4 text-xs xl:text-sm font-medium">
            <button
              onClick={() => onSelectTab('home')}
              className={`flex items-center gap-1.5 py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentTab === 'home'
                  ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Beranda</span>
            </button>

            {currentUser.role !== 'admin' && (
              <>
                <button
                  onClick={() => onSelectTab('dashboard')}
                  className={`flex items-center gap-1.5 py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    currentTab === 'dashboard'
                      ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>8 Modul Pembelajaran</span>
                </button>

                <button
                  onClick={() => onSelectTab('bank')}
                  className={`flex items-center gap-1.5 py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    currentTab === 'bank'
                      ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  <span>Bank Soal (400+)</span>
                </button>

                <button
                  onClick={() => onSelectTab('stats')}
                  className={`flex items-center gap-1.5 py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    currentTab === 'stats'
                      ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Progres Belajar</span>
                </button>

                <button
                  onClick={onOpenTopScores}
                  className="flex items-center gap-1.5 py-1.5 text-amber-600 dark:text-amber-400 hover:text-amber-700 font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  title="Lihat Peringkat Top Skor & Leaderboard"
                >
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Top Skor</span>
                </button>

                <button
                  onClick={onOpenFeedback}
                  className="flex items-center gap-1.5 py-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  title="Kirim Kritik & Saran"
                >
                  <MessageSquarePlus className="w-4 h-4 text-blue-500" />
                  <span>Kritik & Saran</span>
                </button>
              </>
            )}

            {(currentUser.role === 'admin' || currentUser.role === 'guru') && (
              <>
                <button
                  onClick={() => onSelectTab('teacher')}
                  className={`flex items-center gap-1.5 py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    currentTab === 'teacher'
                      ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Rekap Nilai Siswa</span>
                </button>

                <button
                  onClick={() => onSelectTab('users')}
                  className={`flex items-center gap-1.5 py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    currentTab === 'users'
                      ? 'text-purple-600 dark:text-purple-400 font-semibold border-b-2 border-purple-600 dark:border-purple-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Daftar Pengguna</span>
                </button>

                <button
                  onClick={() => onSelectTab('schools')}
                  className={`flex items-center gap-1.5 py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    currentTab === 'schools'
                      ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Daftar Sekolah</span>
                </button>

                {onOpenMaintenanceSettings && (
                  <button
                    onClick={onOpenMaintenanceSettings}
                    className="flex items-center gap-1.5 py-1.5 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    title="Pengaturan Mode Pemeliharaan & Timer Countdown"
                  >
                    <Wrench className="w-4 h-4 text-amber-500" />
                    <span>Maintenance</span>
                  </button>
                )}
              </>
            )}
          </nav>
        )}

        {/* Zone 3: User Auth & Theme Switch */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Dark Mode Switch Button */}
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700/80 shadow-2xs"
              title={theme === 'dark' ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
              aria-label={theme === 'dark' ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>
          )}

          {currentUser ? (
            <div className="flex items-center gap-2.5">

              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-1 pr-2">
                {currentUser.avatarUrl ? (
                  <img 
                    src={currentUser.avatarUrl} 
                    alt={currentUser.namaLengkap} 
                    className="w-7 h-7 rounded-xl object-cover bg-blue-100"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    {currentUser.namaLengkap.charAt(0).toUpperCase()}
                  </div>
                )}
                
                <div className="hidden sm:flex flex-col text-left max-w-[140px]">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {currentUser.namaLengkap}
                    </span>
                    {currentUser.isVerified && (
                      <span title="Email Terverifikasi" className="inline-flex items-center">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 truncate">
                    {currentUser.asalSekolah}
                  </span>
                </div>

                <button
                  onClick={onOpenFeedback}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                  title="Kirim Kritik & Saran"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onOpenSettings}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                  title="Pengaturan Akun & Profil"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                  title="Keluar Akun"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* SEBELUM LOGIN: SEMBUNYIKAN SEMUA LINK KECUALI DAFTAR SISWA DAN MASUK */
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => onOpenAuth('register')}
                className="flex items-center gap-1 px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Daftar</span>
              </button>

              <button
                onClick={() => onOpenAuth('login')}
                className="inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-2 text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer shrink-0"
              >
                <span>Masuk</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar (HANYA DITAMPILKAN JIKA SUDAH LOGIN) */}
      {currentUser && (
        <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 px-4 py-2 flex items-center justify-around text-xs font-medium bg-white dark:bg-slate-900 overflow-x-auto">
          <button
            onClick={() => onSelectTab('home')}
            className={`py-1 px-2 whitespace-nowrap cursor-pointer ${
              currentTab === 'home' ? 'text-blue-600 font-bold' : 'text-slate-500'
            }`}
          >
            Beranda
          </button>
          {currentUser.role !== 'admin' && (
            <>
              <button
                onClick={() => onSelectTab('dashboard')}
                className={`py-1 px-2 whitespace-nowrap cursor-pointer ${
                  currentTab === 'dashboard' ? 'text-blue-600 font-bold' : 'text-slate-500'
                }`}
              >
                8 Modul
              </button>
              <button
                onClick={() => onSelectTab('bank')}
                className={`py-1 px-2 whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                  currentTab === 'bank' ? 'text-blue-600 font-bold' : 'text-slate-500'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                <span>Bank Soal</span>
              </button>

              <button
                onClick={() => onSelectTab('stats')}
                className={`py-1 px-2 whitespace-nowrap cursor-pointer ${
                  currentTab === 'stats' ? 'text-blue-600 font-bold' : 'text-slate-500'
                }`}
              >
                Progres
              </button>
            </>
          )}
          {(currentUser.role === 'admin' || currentUser.role === 'guru') && (
            <>
              <button
                onClick={() => onSelectTab('teacher')}
                className={`py-1 px-2 whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                  currentTab === 'teacher' ? 'text-blue-600 font-bold' : 'text-emerald-600'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Rekap Nilai</span>
              </button>

              <button
                onClick={() => onSelectTab('users')}
                className={`py-1 px-2 whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                  currentTab === 'users' ? 'text-purple-600 font-bold' : 'text-purple-600'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Pengguna</span>
              </button>

              <button
                onClick={() => onSelectTab('schools')}
                className={`py-1 px-2 whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                  currentTab === 'schools' ? 'text-indigo-600 font-bold' : 'text-indigo-600'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Sekolah</span>
              </button>
            </>
          )}

          <button
            onClick={onOpenFeedback}
            className="py-1 px-2 whitespace-nowrap cursor-pointer flex items-center gap-1 text-blue-600 font-bold"
            title="Kritik & Saran"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>Kritik & Saran</span>
          </button>
        </div>
      )}
    </header>
  );
};
