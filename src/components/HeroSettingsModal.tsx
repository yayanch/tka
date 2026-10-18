import React, { useState, useEffect } from 'react';
import { 
  X, 
  Edit3, 
  RotateCcw, 
  Save, 
  CheckCircle2, 
  Sparkles,
  Type,
  AlignLeft,
  Tag,
  BarChart2,
  Lock
} from 'lucide-react';
import { UserProfile } from '../types/auth';
import { 
  HeroConfig, 
  DEFAULT_HERO_CONFIG, 
  getStoredHeroConfig, 
  saveStoredHeroConfig 
} from '../utils/heroStorage';

interface HeroSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: UserProfile | null;
  onConfigChange?: (newConfig: HeroConfig) => void;
}

export const HeroSettingsModal: React.FC<HeroSettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onConfigChange,
}) => {
  const [config, setConfig] = useState<HeroConfig>(DEFAULT_HERO_CONFIG);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const current = getStoredHeroConfig();
      setConfig(current);
      setSuccessMsg(null);
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
            Pengaturan teks Hero Banner hanya dapat diubah oleh akun <strong>Administrator / Guru Utama TJKT</strong>.
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

  const handleChange = (field: keyof HeroConfig, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredHeroConfig(config);
    if (onConfigChange) {
      onConfigChange(config);
    }
    setSuccessMsg('Teks bagian Hero berhasil disimpan dan diperbarui!');
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    if (window.confirm('Kembalikan seluruh teks Hero ke pengaturan standar?')) {
      setConfig(DEFAULT_HERO_CONFIG);
      saveStoredHeroConfig(DEFAULT_HERO_CONFIG);
      if (onConfigChange) {
        onConfigChange(DEFAULT_HERO_CONFIG);
      }
      setSuccessMsg('Teks Hero berhasil dikembalikan ke standar bawaan.');
      setTimeout(() => {
        setSuccessMsg(null);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Pengaturan Teks Hero Banner
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ubah judul, badge, deskripsi, dan statistik pada tampilan utama
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSave} className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Section 1: Badge & Title */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-blue-500" />
              <span>Label Badge & Judul Utama</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Teks Badge (Pill Badge Atas)
              </label>
              <input
                type="text"
                value={config.badge}
                onChange={(e) => handleChange('badge', e.target.value)}
                placeholder="Contoh: Platform Pembelajaran & Simulasi CBT..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Type className="w-3.5 h-3.5 text-blue-500" />
                  <span>Judul Utama (Heading Hero)</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-medium">Ukuran Font:</span>
                  <select
                    value={config.titleFontSize || 'text-3xl sm:text-5xl lg:text-6xl'}
                    onChange={(e) => handleChange('titleFontSize', e.target.value)}
                    className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 outline-none cursor-pointer"
                  >
                    <option value="text-xl sm:text-3xl lg:text-4xl">1. Sangat Kecil (Sangat Rapat)</option>
                    <option value="text-2xl sm:text-4xl lg:text-5xl">2. Kecil (Compact)</option>
                    <option value="text-3xl sm:text-5xl lg:text-6xl">3. Normal (Standar)</option>
                    <option value="text-4xl sm:text-6xl lg:text-7xl">4. Besar (Bold Header)</option>
                    <option value="text-5xl sm:text-7xl lg:text-8xl">5. Sangat Besar (Maksimal)</option>
                  </select>
                </div>
              </div>
              <textarea
                value={config.title}
                onChange={(e) => handleChange('title', e.target.value)}
                rows={2}
                placeholder="Judul utama hero banner..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-y"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <AlignLeft className="w-3.5 h-3.5 text-blue-500" />
                  <span>Deskripsi Lengkap Hero</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-medium">Ukuran Font:</span>
                  <select
                    value={config.descFontSize || 'text-base sm:text-lg lg:text-xl'}
                    onChange={(e) => handleChange('descFontSize', e.target.value)}
                    className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 outline-none cursor-pointer"
                  >
                    <option value="text-xs sm:text-xs lg:text-sm">1. Sangat Kecil (Compact)</option>
                    <option value="text-xs sm:text-sm lg:text-base">2. Kecil (Small)</option>
                    <option value="text-sm sm:text-base lg:text-lg">3. Sedang (Medium)</option>
                    <option value="text-base sm:text-lg lg:text-xl">4. Normal (Standard)</option>
                    <option value="text-lg sm:text-xl lg:text-2xl">5. Besar (Extra Large)</option>
                  </select>
                </div>
              </div>
              <textarea
                value={config.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                placeholder="Tuliskan penjelasan singkat mengenai platform..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-y"
                required
              />
            </div>
          </div>

          {/* Section 2: Four Statistics Items */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Kartu Statistik Hero (4 Item)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Stat 1 */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Statistik #1</span>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Angka / Nilai</label>
                  <input
                    type="text"
                    value={config.stat1Number}
                    onChange={(e) => handleChange('stat1Number', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-extrabold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Label Keterangan</label>
                  <input
                    type="text"
                    value={config.stat1Label}
                    onChange={(e) => handleChange('stat1Label', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              {/* Stat 2 */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Statistik #2</span>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Angka / Nilai</label>
                  <input
                    type="text"
                    value={config.stat2Number}
                    onChange={(e) => handleChange('stat2Number', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-extrabold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Label Keterangan</label>
                  <input
                    type="text"
                    value={config.stat2Label}
                    onChange={(e) => handleChange('stat2Label', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              {/* Stat 3 */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Statistik #3</span>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Angka / Nilai</label>
                  <input
                    type="text"
                    value={config.stat3Number}
                    onChange={(e) => handleChange('stat3Number', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-extrabold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Label Keterangan</label>
                  <input
                    type="text"
                    value={config.stat3Label}
                    onChange={(e) => handleChange('stat3Label', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              {/* Stat 4 */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Statistik #4</span>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Angka / Nilai</label>
                  <input
                    type="text"
                    value={config.stat4Number}
                    onChange={(e) => handleChange('stat4Number', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-extrabold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Label Keterangan</label>
                  <input
                    type="text"
                    value={config.stat4Label}
                    onChange={(e) => handleChange('stat4Label', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Modal Actions Footer */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 rounded-xl border border-amber-200 dark:border-amber-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Standar</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Batal
              </button>

              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
