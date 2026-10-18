import React, { useState, useEffect } from 'react';
import { 
  X, 
  Image as ImageIcon, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  Sparkles, 
  Globe,
  Lock,
  Database,
  Loader2,
  Trash2,
  Upload
} from 'lucide-react';
import { UserProfile } from '../types/auth';
import { 
  BrandingConfig, 
  DEFAULT_BRANDING_CONFIG, 
  getStoredBrandingConfig, 
  saveStoredBrandingConfig,
  applyBrandingToDOM
} from '../utils/brandingStorage';
import { fetchBrandingConfig, saveBrandingConfigToDB } from '../services/settingsSync';

interface BrandingSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: UserProfile | null;
  onConfigChange?: (newConfig: BrandingConfig) => void;
}

export const BrandingSettingsModal: React.FC<BrandingSettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onConfigChange,
}) => {
  const [config, setConfig] = useState<BrandingConfig>(DEFAULT_BRANDING_CONFIG);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSuccessMsg(null);
      setErrorMsg(null);
      setIsLoading(true);

      // Fetch fresh configuration directly from MySQL Database
      fetchBrandingConfig()
        .then((fetched) => {
          setConfig(fetched);
        })
        .catch((err) => {
          console.warn('Failed to load branding from DB, using cached local config:', err);
          setConfig(getStoredBrandingConfig());
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  if (currentUser?.role !== 'admin') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-400 mx-auto flex items-center justify-center font-bold">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Akses Dibatasi</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pengaturan logo dan favicon hanya dapat diubah oleh akun <strong>Administrator / Guru Utama TJKT</strong>.
          </p>
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (field: keyof BrandingConfig, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    // Save locally immediately for fast UI response
    saveStoredBrandingConfig(config);
    if (onConfigChange) {
      onConfigChange(config);
    }

    // Persist to MySQL Database
    const res = await saveBrandingConfigToDB(config);
    setIsSaving(false);

    if (res.success) {
      setSuccessMsg('Pengaturan logo & favicon berhasil disimpan ke database!');
      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 1500);
    } else {
      setErrorMsg(res.error || 'Gagal menyimpan pengaturan ke database.');
    }
  };

  const handleReset = async () => {
    if (window.confirm('Kembalikan logo dan favicon ke pengaturan standar dan simpan ke database?')) {
      setIsSaving(true);
      setErrorMsg(null);
      setSuccessMsg(null);

      setConfig(DEFAULT_BRANDING_CONFIG);
      saveStoredBrandingConfig(DEFAULT_BRANDING_CONFIG);
      if (onConfigChange) {
        onConfigChange(DEFAULT_BRANDING_CONFIG);
      }

      const res = await saveBrandingConfigToDB(DEFAULT_BRANDING_CONFIG);
      setIsSaving(false);

      if (res.success) {
        setSuccessMsg('Logo dan favicon berhasil di-reset ke standar dan disimpan di database.');
        setTimeout(() => {
          setSuccessMsg(null);
        }, 1500);
      } else {
        setErrorMsg(res.error || 'Gagal mereset ke database.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Pengaturan Logo & Favicon
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <Database className="w-3 h-3 text-emerald-500" />
                  Database
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Logo dan favicon disimpan terpusat di database untuk semua pengguna
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-2xl text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2 animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Memuat konfigurasi logo & favicon terbaru dari database...</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-semibold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-xl text-xs font-semibold text-rose-900 dark:text-rose-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          
          {/* Section: Favicon */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-500" />
                <span>Favicon Browser (Ikon Tab)</span>
              </label>
              {config.faviconUrl && (
                <button
                  type="button"
                  onClick={() => handleChange('faviconUrl', '')}
                  className="text-[11px] text-rose-500 hover:text-rose-600 flex items-center gap-1 font-medium cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  Hapus Favicon
                </button>
              )}
            </div>

            {/* Favicon Preview & Inputs */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                {config.faviconUrl ? (
                  <img src={config.faviconUrl} alt="Favicon Preview" className="w-8 h-8 object-contain" />
                ) : (
                  <span className="text-2xl" role="img" aria-label="Default Favicon">🎓</span>
                )}
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={config.faviconUrl}
                  onChange={(e) => handleChange('faviconUrl', e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  placeholder="https://.../favicon.png atau unggah file"
                />
                <label className="px-3.5 py-2 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 shrink-0 text-slate-700 dark:text-slate-200 shadow-xs">
                  <Upload className="w-3.5 h-3.5 text-blue-500" />
                  <span>Upload</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/png,image/x-icon,image/vnd.microsoft.icon,image/svg+xml,image/jpeg,image/webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleChange('faviconUrl', reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Format: PNG, ICO, atau SVG. Favicon langsung tampil di tab browser dan disimpan di database MySQL.
            </p>
          </div>

          {/* Section: Logo Header */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-indigo-500" />
                <span>Logo Header (Navbar)</span>
              </label>
              {config.logoUrl && (
                <button
                  type="button"
                  onClick={() => handleChange('logoUrl', '')}
                  className="text-[11px] text-rose-500 hover:text-rose-600 flex items-center gap-1 font-medium cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  Hapus Gambar Logo
                </button>
              )}
            </div>

            {/* Logo Preview & Upload */}
            <div className="flex items-center gap-3">
              <div className="h-12 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden shrink-0 shadow-xs min-w-16">
                {config.logoUrl ? (
                  <img src={config.logoUrl} alt="Logo Preview" className="max-h-9 max-w-28 object-contain" />
                ) : config.logoIcon ? (
                  <i className={`${config.logoIcon} text-2xl text-blue-600 dark:text-blue-400`}></i>
                ) : (
                  <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                    {config.logoText || 'TK'}
                  </span>
                )}
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={config.logoUrl}
                  onChange={(e) => handleChange('logoUrl', e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  placeholder="https://.../logo.png atau unggah file"
                />
                <label className="px-3.5 py-2 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 shrink-0 text-slate-700 dark:text-slate-200 shadow-xs">
                  <Upload className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Upload</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleChange('logoUrl', reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Icon FontAwesome Alternatif
                </label>
                <input
                  type="text"
                  value={config.logoIcon}
                  onChange={(e) => handleChange('logoIcon', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  placeholder="Contoh: fas fa-network-wired"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Teks Inisial Logo (Jika tanpa gambar)
                </label>
                <input
                  type="text"
                  value={config.logoText}
                  onChange={(e) => handleChange('logoText', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  placeholder="TK / TKA"
                />
              </div>
            </div>
          </div>

          {/* Section: App Texts & Typography */}
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Nama Singkat Aplikasi di Header
              </label>
              <input
                type="text"
                required
                value={config.appShortName}
                onChange={(e) => handleChange('appShortName', e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                placeholder="TKA SMK TJKT"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Sub-teks Header Samping Logo
              </label>
              <input
                type="text"
                required
                value={config.headerBadge}
                onChange={(e) => handleChange('headerBadge', e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                placeholder="Bank 400 Soal & Pembahasan"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Judul Lengkap Aplikasi (Browser Title & SEO)
              </label>
              <input
                type="text"
                required
                value={config.appName}
                onChange={(e) => handleChange('appName', e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                placeholder="Simulasi TKA SMK TJKT - Bank 400 Soal & Pembahasan"
              />
            </div>

            <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Gaya Font Utama Aplikasi</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  Tersimpan di Database
                </span>
              </label>
              <select
                value={config.fontStyle}
                onChange={(e) => {
                  const newFont = e.target.value;
                  handleChange('fontStyle', newFont);
                  applyBrandingToDOM({ ...config, fontStyle: newFont });
                }}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white font-medium cursor-pointer"
              >
                <option value="font-sans">Plus Jakarta Sans (Standar TKA Modern)</option>
                <option value="font-inter">Inter (Clean & Minimalist)</option>
                <option value="font-poppins">Poppins (Geometric & Rapi)</option>
                <option value="font-jakarta">Plus Jakarta Sans (Professional)</option>
                <option value="font-outfit">Outfit (Modern Display)</option>
                <option value="font-roboto">Roboto (Android Style)</option>
                <option value="font-serif">Merriweather (Klasik / Serif Formil)</option>
                <option value="font-mono">Fira Code (Monospace / Teknis Kode)</option>
              </select>

              {/* Live Preview Sample */}
              <div className={`p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 ${config.fontStyle || 'font-sans'} transition-all`}>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                  Pratinjau Font Live:
                </span>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Simulasi TKA SMK Teknik Jaringan Komputer & Telekomunikasi
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  1234567890 · Bank 400 Soal & Pembahasan Modul
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={isSaving}
              onClick={handleReset}
              className="px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Standar</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isSaving}
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menyimpan ke Database...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Simpan ke Database</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
