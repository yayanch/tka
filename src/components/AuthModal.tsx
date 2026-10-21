import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  School, 
  CheckCircle2, 
  AlertCircle, 
  KeyRound,
  Database,
  Info,
  Eye,
  EyeOff,
  Clock,
  RefreshCw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Zap } from 'lucide-react';
import { UserProfile } from '../types/auth';
import { 
  registerWithForm, 
  verifyEmailCode, 
  resendVerificationCode, 
  loginUser
} from '../services/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
  initialMode?: 'register' | 'login';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'register',
}) => {
  const [mode, setMode] = useState<'register' | 'login' | 'verify'>(initialMode);
  const [namaLengkap, setNamaLengkap] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [kabupatenKota, setKabupatenKota] = useState('');
  const [asalSekolah, setAsalSekolah] = useState('SMKN 2 MAGETAN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [pendingEmail, setPendingEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  const [queueState, setQueueState] = useState<{
    isActive: boolean;
    countdown: number;
    totalWait: number;
    ticketNum: number;
    message: string;
  } | null>(null);

  // Sync mode whenever modal is opened or initialMode prop changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMsg(null);
      setSuccessMsg(null);
      setIsShaking(false);
      setConfirmPassword('');
      setShowConfirmPassword(false);
      setQueueState(null);
    }
  }, [isOpen, initialMode]);

  // Countdown timer effect for server slot queueing
  useEffect(() => {
    if (!queueState || !queueState.isActive) return;
    if (queueState.countdown <= 0) {
      setQueueState(null);
      handleLoginDirect();
      return;
    }

    const timer = setInterval(() => {
      setQueueState(prev => {
        if (!prev) return null;
        return {
          ...prev,
          countdown: prev.countdown - 1
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [queueState]);

  const checkAndSetQueue = (res: any) => {
    if (!res) return false;
    const isTrafficLimit = res.isQueued || 
      Boolean(res.retryAfterSeconds) || 
      (res.error && typeof res.error === 'string' && (
        res.error.includes('429') || 
        res.error.toLowerCase().includes('sibuk') || 
        res.error.toLowerCase().includes('antrean') || 
        res.error.toLowerCase().includes('terlalu banyak') ||
        res.error.toLowerCase().includes('slot') ||
        res.error.toLowerCase().includes('coba sekali lagi') ||
        res.error.toLowerCase().includes('memuat')
      ));

    if (isTrafficLimit) {
      const retrySec = res.retryAfterSeconds || 5;
      const ticket = res.queuePosition || Math.floor(Math.random() * 3) + 1;
      setQueueState({
        isActive: true,
        countdown: retrySec,
        totalWait: retrySec,
        ticketNum: ticket,
        message: res.message || res.error || 'Antrean slot masuk server aktif. Mengalokasikan slot jalur khusus untuk Anda...'
      });
      setErrorMsg(null);
      return true;
    }
    return false;
  };

  const handleLoginDirect = async () => {
    const cleanMail = email.trim().toLowerCase();
    if (!cleanMail || !password) return;

    setIsLoading(true);
    const res = await loginUser({ email: cleanMail, password });
    setIsLoading(false);

    if (checkAndSetQueue(res)) return;

    if (res.error) {
      setQueueState(null);
      triggerShake();
      setErrorMsg(res.error);
      return;
    }

    if (res.user) {
      setQueueState(null);
      onSuccess(res.user);
      onClose();
    }
  };

  if (!isOpen) return null;

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 650);
  };

  // Handle Form Registration
  const handleFormRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!namaLengkap.trim() || !asalSekolah.trim() || !email.trim() || !password.trim()) {
      triggerShake();
      setErrorMsg('Nama Lengkap, Asal Sekolah, Email, dan Kata Sandi wajib diisi.');
      return;
    }

    if (password.trim().length < 6) {
      triggerShake();
      setErrorMsg('Kata Sandi minimal 6 karakter.');
      return;
    }

    if (!confirmPassword.trim()) {
      triggerShake();
      setErrorMsg('Silakan isi kolom Konfirmasi Kata Sandi.');
      return;
    }

    if (password !== confirmPassword) {
      triggerShake();
      setErrorMsg('Konfirmasi Kata Sandi tidak sesuai dengan Kata Sandi yang dimasukkan. Silakan periksa kembali.');
      return;
    }

    setIsLoading(true);
    const res = await registerWithForm({
      namaLengkap: namaLengkap.trim(),
      provinsi: provinsi.trim(),
      kabupatenKota: kabupatenKota.trim(),
      asalSekolah: asalSekolah.trim(),
      email: email.trim(),
      password: password || '123456',
    });
    setIsLoading(false);

    if (checkAndSetQueue(res)) return;

    if (res.error) {
      triggerShake();
      setErrorMsg(res.error);
      return;
    }

    // Pendaftaran selesai tanpa OTP: Arahkan pengguna ke tab 'login' (Masuk)
    setMode('login');
    setErrorMsg(null);
    setSuccessMsg(res.message || 'Pendaftaran berhasil! Akun Anda telah siap. Silakan klik "Masuk ke Akun" di bawah ini.');
  };

  // Handle Verification
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!verificationCode.trim()) {
      triggerShake();
      setErrorMsg('Silakan masukkan 6-digit kode verifikasi.');
      return;
    }

    setIsLoading(true);
    const res = await verifyEmailCode({
      email: pendingEmail,
      code: verificationCode.trim(),
    });
    setIsLoading(false);

    if (res.error) {
      triggerShake();
      setErrorMsg(res.error);
      return;
    }

    if (res.user) {
      setSuccessMsg('Email berhasil diverifikasi! Sesi akun Anda telah aktif.');
      setTimeout(() => {
        onSuccess(res.user!);
        onClose();
      }, 700);
    }
  };

  // Resend Verification Code
  const handleResend = async () => {
    if (!pendingEmail) return;
    setIsLoading(true);
    const res = await resendVerificationCode(pendingEmail);
    setIsLoading(false);

    setVerificationCode('');
    setSuccessMsg(res.message || `Kode baru telah dikirimkan ke email ${pendingEmail}. Silakan periksa inbox Anda.`);
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanMail = email.trim().toLowerCase();
    if (!cleanMail) {
      triggerShake();
      setErrorMsg('Alamat Email / Username wajib diisi.');
      return;
    }

    if (!password) {
      triggerShake();
      setErrorMsg('Email/Username atau Kata Sandi salah. Silakan periksa kembali kata sandi Anda.');
      return;
    }

    setIsLoading(true);
    const res = await loginUser({ email: cleanMail, password });
    setIsLoading(false);

    if (checkAndSetQueue(res)) return;

    if (res.error) {
      triggerShake();
      setErrorMsg(res.error);
      return;
    }

    if (res.user) {
      setQueueState(null);
      onSuccess(res.user);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col transition-all ${
          isShaking 
            ? 'animate-shake border-red-500 shadow-red-500/30 ring-4 ring-red-500/20' 
            : 'border-slate-200 dark:border-slate-800'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              TK
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                {mode === 'verify'
                  ? 'Verifikasi Alamat Email Siswa'
                  : mode === 'register'
                  ? 'Pendaftaran Siswa TKA TJKT'
                  : 'Masuk ke Akun Siswa'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Queue & Traffic Slot Manager Waiting Room UI */}
          {queueState && queueState.isActive ? (
            <div className="p-5 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl border border-blue-500/30 shadow-xl space-y-4 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                    Ruang Tunggu Slot Masuk Server
                  </span>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-200 text-[10px] font-bold border border-blue-400/30">
                  Tiket #{queueState.ticketNum ? String(queueState.ticketNum).padStart(3, '0') : '001'}
                </div>
              </div>

              <div className="text-center py-2 space-y-3">
                <div className="relative inline-flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-4 border-blue-500/20 border-t-blue-400 animate-spin absolute" />
                  <div className="w-20 h-20 rounded-full bg-blue-950/90 border border-blue-400/40 flex flex-col items-center justify-center shadow-inner">
                    <span className="text-2xl font-black font-mono text-blue-300 tracking-tight">
                      00:0{Math.max(0, queueState.countdown)}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-blue-200/70">Detik</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">
                    Mengalokasikan Slot Akses Real-Time
                  </h4>
                  <p className="text-xs text-blue-200/80 max-w-xs mx-auto leading-relaxed">
                    {queueState.message || 'Lalu lintas masuk tinggi. Antrean slot diaktifkan agar seluruh siswa dapat masuk dengan lancar.'}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] text-blue-200/80 font-medium">
                    <span>Posisi Antrean: Slot ke-#{queueState.ticketNum || 1}</span>
                    <span>{Math.round(((queueState.totalWait - Math.max(0, queueState.countdown)) / (queueState.totalWait || 1)) * 100)}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-blue-500/20 p-0.5">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-300 rounded-full transition-all duration-1000 ease-linear shadow-xs"
                      style={{ width: `${Math.min(100, Math.max(8, ((queueState.totalWait - Math.max(0, queueState.countdown)) / (queueState.totalWait || 1)) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Live Step Timeline */}
              <div className="p-3 bg-slate-950/60 rounded-2xl border border-white/10 text-[11px] space-y-2">
                <div className="flex items-center justify-between text-blue-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Verifikasi Data Akses</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">Siap</span>
                </div>
                <div className="flex items-center justify-between text-white font-medium">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-blue-400 animate-spin shrink-0" />
                    <span>Mengalokasikan Jalur Slot ({queueState.countdown}s)</span>
                  </div>
                  <span className="text-[10px] text-blue-300 font-bold">Berjalan</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Pengalihan Otomatis ke Dashboard</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Menunggu</span>
                </div>
              </div>

              {/* Tips Jam Masuk Ujian */}
              <div className="p-3 bg-blue-900/30 rounded-2xl border border-blue-400/20 text-[11px] text-blue-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-blue-100">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>Perencanaan & Solusi Masuk Lancar:</span>
                </div>
                <p className="text-[10.5px] leading-relaxed text-blue-200/90">
                  Sistem slot timer bekerja secara real-time mengurutkan antrean masuk per detik. Saat timer mencapai 0, Anda akan langsung dialihkan secara otomatis tanpa perlu mengetik ulang password.
                </p>
              </div>

              {/* Controls */}
              <div className="pt-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setQueueState(null);
                    handleLoginDirect();
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Masuk Sekarang (Coba Lagi)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setQueueState(null)}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </div>
          ) : (
            <>
          {/* Error Message */}
          {errorMsg && (
            <div className="p-3.5 bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-800 rounded-2xl text-xs text-red-700 dark:text-red-200 flex items-start gap-2.5 shadow-xs animate-in fade-in slide-in-from-top-1 duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400 animate-bounce" />
              <div className="space-y-0.5 leading-snug">
                <p className="font-bold text-red-800 dark:text-red-300 text-xs">Gagal Masuk / Terjadi Kesalahan</p>
                <p>{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {successMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB SWITCHER: DAFTAR SISWA BARU VS MASUK AKUN            */}
          {/* ======================================================== */}
          {(mode === 'register' || mode === 'login') && (
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80">
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className={`py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  mode === 'register'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Daftar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className={`py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  mode === 'login'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Masuk ke Akun</span>
              </button>
            </div>
          )}

          {/* ======================================================== */}
          {/* MODE: VERIFIKASI EMAIL (OTP 6 DIGIT)                     */}
          {/* ======================================================== */}
          {mode === 'verify' && (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800/80 text-xs text-slate-800 dark:text-slate-200 space-y-2 shadow-xs">
                <div className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-300 text-xs sm:text-sm">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Silakan Cek Kotak Masuk (Inbox) Email Anda</span>
                </div>

                <p className="leading-relaxed text-xs text-slate-600 dark:text-slate-300">
                  Kode verifikasi 6-digit (OTP) telah dikirimkan ke email <strong>{pendingEmail}</strong>. Silakan periksa inbox atau folder spam email Anda, lalu masukkan kodenya di bawah ini.
                </p>

                <div className="flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400 font-medium pt-1">
                  <Info className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Kode berlaku selama 15 menit. Demi keamanan, jangan berikan kode ke siapa pun.</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Masukkan 6-Digit Kode Verifikasi:
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="Contoh: 123456"
                    className="w-full pl-10 pr-4 py-2.5 text-center font-mono text-xl font-black tracking-widest bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || verificationCode.length < 6}
                className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer transition-colors"
              >
                {isLoading ? 'Memverifikasi...' : 'Verifikasi & Aktifkan Akun Siswa'}
              </button>

              <div className="flex items-center justify-between text-xs pt-1 text-slate-500">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isLoading}
                  className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer font-medium"
                >
                  Kirim Ulang Kode
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
                >
                  Ubah Email / Pendaftaran
                </button>
              </div>
            </form>
          )}

          {/* ======================================================== */}
          {/* MODE: FORMULIR PENDAFTARAN SISWA                         */}
          {/* ======================================================== */}
          {mode === 'register' && (
            <div className="space-y-4">
              <form onSubmit={handleFormRegister} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Nama Lengkap:
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={namaLengkap}
                      onChange={(e) => setNamaLengkap(e.target.value)}
                      placeholder="Contoh: Muhammad Ihsan"
                      className="w-full pl-10 pr-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Provinsi:
                    </label>
                    <input
                      type="text"
                      value={provinsi}
                      onChange={(e) => setProvinsi(e.target.value)}
                      placeholder="Contoh: Jawa Barat"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Kabupaten/Kota:
                    </label>
                    <input
                      type="text"
                      value={kabupatenKota}
                      onChange={(e) => setKabupatenKota(e.target.value)}
                      placeholder="Contoh: Kota Cimahi"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Asal Sekolah:
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={asalSekolah}
                      onChange={(e) => setAsalSekolah(e.target.value)}
                      placeholder="isi dengan nama sekolah anda"
                      className="w-full pl-10 pr-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Email:
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="akun email anda yang aktif"
                      className="w-full pl-10 pr-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Kata Sandi:
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimal 6 karakter"
                      className="w-full pl-10 pr-10 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                      title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                      aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Konfirmasi Kata Sandi:
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Masukkan ulang kata sandi Anda"
                      className={`w-full pl-10 pr-10 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none focus:ring-2 text-slate-900 dark:text-white transition-colors ${
                        confirmPassword.length > 0 && confirmPassword !== password
                          ? 'border-red-400 focus:ring-red-500 bg-red-50/40 dark:bg-red-950/20'
                          : confirmPassword.length > 0 && confirmPassword === password
                          ? 'border-emerald-500 focus:ring-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20'
                          : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
                      }`}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                      title={showConfirmPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                      aria-label={showConfirmPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Peringatan jika kata sandi konfirmasi tidak sesuai */}
                  {confirmPassword.length > 0 && (
                    <div className="pt-0.5">
                      {confirmPassword !== password ? (
                        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-red-600 dark:text-red-400">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>Kata sandi tidak sesuai. Pastikan sama persis.</span>
                        </p>
                      ) : (
                        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>Kata sandi sesuai</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md transition-colors cursor-pointer mt-2"
                >
                  {isLoading ? 'Mendaftarkan...' : 'Daftar Akun Siswa'}
                </button>
              </form>

              <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium"
                >
                  Sudah punya akun siswa? Masuk di sini
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* MODE: MASUK (LOGIN)                                      */}
          {/* ======================================================== */}
          {mode === 'login' && (
            <div className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Alamat Email:
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="akun email anda yang aktif"
                      className="w-full pl-10 pr-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Kata Sandi:
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Kata sandi akun Anda"
                      className="w-full pl-10 pr-10 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                      title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                      aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md transition-colors cursor-pointer mt-2"
                >
                  {isLoading ? 'Memeriksa...' : 'Masuk ke Akun'}
                </button>
              </form>

              <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium"
                >
                  Belum punya akun? Buat akun baru sekarang
                </button>
              </div>
            </div>
          )}
        </>
      )}
        </div>
      </div>
    </div>
  );
};
