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
  EyeOff
} from 'lucide-react';
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
  const [asalSekolah, setAsalSekolah] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [pendingEmail, setPendingEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  // Sync mode whenever modal is opened or initialMode prop changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMsg(null);
      setSuccessMsg(null);
      setIsShaking(false);
    }
  }, [isOpen, initialMode]);

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

    setIsLoading(true);
    const res = await registerWithForm({
      namaLengkap: namaLengkap.trim(),
      asalSekolah: asalSekolah.trim(),
      email: email.trim(),
      password: password || '123456',
    });
    setIsLoading(false);

    if (res.error) {
      triggerShake();
      setErrorMsg(res.error);
      return;
    }

    if (res.requiresVerification && res.email) {
      setPendingEmail(res.email);
      setVerificationCode('');
      setMode('verify');
      setSuccessMsg(res.message || `Kode verifikasi 6-digit telah dikirim ke email ${res.email}. Silakan periksa inbox/spam email Anda.`);
    }
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
      setErrorMsg('Email wajib diisi.');
      return;
    }

    setIsLoading(true);
    const res = await loginUser({ email: cleanMail, password });
    setIsLoading(false);

    if (res.error) {
      triggerShake();
      setEmail(cleanMail);
      setMode('register');
      setErrorMsg(`${res.error} Silakan lakukan pendaftaran akun siswa baru di bawah ini.`);
      return;
    }

    if (res.requiresVerification && res.email) {
      triggerShake();
      setEmail(res.email);
      setPendingEmail(res.email);
      setMode('register');
      setErrorMsg(`Akun (${res.email}) belum terverifikasi. Silakan lakukan pendaftaran/aktivasi akun di bawah ini.`);
      return;
    }

    if (res.user) {
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
              <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Database className="w-3 h-3 text-blue-500" />
                <span>Penyimpanan MySQL via File .env</span>
              </p>
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
          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-600 dark:text-red-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
              <span>{errorMsg}</span>
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
                      placeholder="Contoh: SMKN 1 Cimahi / SMKN 2 Bandung"
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
                      placeholder="nama.siswa@smk.belajar.id"
                      className="w-full pl-10 pr-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    *Wajib verifikasi via 6-digit kode OTP email setelah klik daftar.
                  </span>
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md transition-colors cursor-pointer mt-2"
                >
                  {isLoading ? 'Mendaftarkan...' : 'Daftar & Minta Kode Verifikasi Email'}
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
                      placeholder="nama@smk.belajar.id"
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
        </div>
      </div>
    </div>
  );
};
