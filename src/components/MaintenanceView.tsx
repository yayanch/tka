import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Clock, 
  ShieldAlert, 
  RefreshCw, 
  Lock, 
  Mail, 
  Phone, 
  CheckCircle2, 
  KeyRound, 
  Sparkles, 
  Server, 
  Wifi, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { UserProfile } from '../types/auth';

export interface MaintenanceConfig {
  enabled: boolean;
  title: string;
  message: string;
  targetEndTime: string; // ISO string e.g. "2026-10-21T18:00:00+07:00"
  allowAdminBypass: boolean;
  secretKey?: string;
  contactEmail?: string;
  contactWhatsapp?: string;
}

export const DEFAULT_MAINTENANCE_CONFIG: MaintenanceConfig = {
  enabled: false,
  title: 'Sistem Dalam Pemeliharaan Berkala & Optimasi Server',
  message: 'Portal Asesmen TKA SMK TJKT sedang menjalani peningkatan kapasitas database dan optimasi server untuk kenyamanan ujian serentak. Layanan siswa dihentikan sementara hingga timer berakhir.',
  targetEndTime: new Date(Date.now() + 2 * 3600 * 1000).toISOString(),
  allowAdminBypass: true,
  secretKey: 'admin123',
  contactEmail: 'admin@smk.belajar.id',
  contactWhatsapp: '081234567890',
};

interface MaintenanceViewProps {
  config: MaintenanceConfig;
  onRefreshStatus?: () => void;
  onAdminBypassLogin?: (email: string, pass: string) => Promise<boolean>;
  currentUser?: UserProfile | null;
  onContinueAsAdmin?: () => void;
}

export const MaintenanceView: React.FC<MaintenanceViewProps> = ({
  config,
  onRefreshStatus,
  onAdminBypassLogin,
  currentUser,
  onContinueAsAdmin,
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live Timer Countdown Logic
  useEffect(() => {
    const calculateTime = () => {
      const targetMs = new Date(config.targetEndTime || Date.now()).getTime();
      const nowMs = Date.now();
      const diffMs = targetMs - nowMs;

      if (diffMs <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const seconds = Math.floor((diffMs / 1000) % 60);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [config.targetEndTime]);

  // Format End Date string in WIB
  const formattedEndDate = (() => {
    try {
      const d = new Date(config.targetEndTime);
      return d.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      });
    } catch {
      return config.targetEndTime;
    }
  })();

  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);

    try {
      if (onAdminBypassLogin) {
        const success = await onAdminBypassLogin(adminEmail, adminPass);
        if (success) {
          setShowAdminModal(false);
          if (onContinueAsAdmin) onContinueAsAdmin();
        } else {
          setLoginError('Email atau kata sandi administrator tidak valid / tidak memiliki hak akses.');
        }
      } else {
        // Fallback secret key
        if (adminPass === (config.secretKey || 'admin123')) {
          setShowAdminModal(false);
          if (onContinueAsAdmin) onContinueAsAdmin();
        } else {
          setLoginError('Kunci rahasia administrator salah.');
        }
      }
    } catch (err: any) {
      setLoginError(err?.message || 'Gagal autentikasi administrator.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden font-sans selection:bg-blue-500 selection:text-white">
      {/* Background Animated Glowing Ambient Light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header Navbar */}
      <header className="relative z-10 max-w-6xl w-full mx-auto flex items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-extrabold shadow-lg">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-black tracking-tight text-white block leading-none">
              TKA SMK TJKT
            </span>
            <span className="text-[11px] font-semibold text-slate-400 block mt-0.5">
              Portal Asesmen Keahlian Network &amp; Telecommunication
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {currentUser && (currentUser.role === 'admin' || currentUser.role === 'guru') ? (
            <button
              onClick={onContinueAsAdmin}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Masuk Mode Administrator ({currentUser.namaLengkap.split(' ')[0]})</span>
            </button>
          ) : (
            config.allowAdminBypass && (
              <button
                onClick={() => setShowAdminModal(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Login Admin / Guru</span>
              </button>
            )
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-3xl w-full mx-auto text-center space-y-8 my-auto py-8">
        {/* Animated Icon & Badge */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping opacity-75" />
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-blue-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-2xl relative z-10">
              <Wrench className="w-10 h-10 sm:w-12 sm:h-12 animate-bounce" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Mode Pemeliharaan Sistem Aktif</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight max-w-2xl mx-auto leading-tight">
            {config.title || 'Sistem Dalam Pemeliharaan Berkala'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            {config.message || 'Portal TKA SMK TJKT sedang ditingkatkan. Layanan pengerjaan ujian siswa akan kembali aktif setelah jadwal pemeliharaan selesai.'}
          </p>
        </div>

        {/* Real-time Countdown Timer Grid */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>Perkiraan Selesai Dalam:</span>
          </div>

          {timeLeft.isExpired ? (
            <div className="p-6 rounded-3xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 space-y-3 max-w-md mx-auto shadow-2xl">
              <div className="text-lg font-black flex items-center justify-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <span>Pemeliharaan Selesai!</span>
              </div>
              <p className="text-xs text-emerald-200">
                Sistem telah siap digunakan kembali. Silakan muat ulang halaman.
              </p>
              <button
                onClick={onRefreshStatus || (() => window.location.reload())}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Muat Ulang Halaman</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
              {/* Days */}
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-xl backdrop-blur-md flex flex-col items-center">
                <span className="text-2xl sm:text-4xl font-black text-white font-mono tabular-nums">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase mt-1">Hari</span>
              </div>

              {/* Hours */}
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-xl backdrop-blur-md flex flex-col items-center">
                <span className="text-2xl sm:text-4xl font-black text-white font-mono tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase mt-1">Jam</span>
              </div>

              {/* Minutes */}
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-xl backdrop-blur-md flex flex-col items-center">
                <span className="text-2xl sm:text-4xl font-black text-blue-400 font-mono tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase mt-1">Menit</span>
              </div>

              {/* Seconds */}
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 shadow-xl backdrop-blur-md flex flex-col items-center">
                <span className="text-2xl sm:text-4xl font-black text-amber-400 font-mono tabular-nums">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase mt-1">Detik</span>
              </div>
            </div>
          )}

          {/* End Time Badge */}
          <div className="text-xs text-slate-400 bg-slate-900/60 border border-slate-800/80 px-4 py-2 rounded-xl inline-block backdrop-blur-md">
            Target Selesai: <span className="font-bold text-slate-200">{formattedEndDate}</span>
          </div>
        </div>

        {/* Refresh & Support Contact Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onRefreshStatus || (() => window.location.reload())}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border border-slate-700"
          >
            <RefreshCw className="w-4 h-4 text-blue-400" />
            <span>Cek Status Terbaru</span>
          </button>

          {config.contactEmail && (
            <a
              href={`mailto:${config.contactEmail}`}
              className="px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-all flex items-center gap-2 border border-slate-800"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>{config.contactEmail}</span>
            </a>
          )}

          {config.contactWhatsapp && (
            <a
              href={`https://wa.me/${config.contactWhatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 text-xs font-semibold transition-all flex items-center gap-2 border border-emerald-800/80"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Bantuan Helpdesk WA</span>
            </a>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-4 text-xs text-slate-500 border-t border-slate-900/80">
        &copy; {new Date().getFullYear()} TKA SMK TJKT &mdash; Portal Asesmen Keahlian Teknik Jaringan Komputer &amp; Telekomunikasi.
      </footer>

      {/* Emergency Admin Login Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div 
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    Login Administrator / Guru
                  </h3>
                  <p className="text-xs text-slate-400">
                    Bypass mode maintenance untuk mengelola sistem
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAdminModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg text-xs"
              >
                ✕
              </button>
            </div>

            {loginError && (
              <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Email Administrator / Guru
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@smk.belajar.id"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  required
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <UserCheck className="w-4 h-4" />
                  )}
                  <span>Masuk Administrator</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
