import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  X, 
  CheckCircle2, 
  RotateCcw, 
  Settings2, 
  Sparkles, 
  Layers, 
  Save 
} from 'lucide-react';
import { 
  getExamSettings, 
  saveExamSettings, 
  DEFAULT_EXAM_SETTINGS, 
  ExamDurationSettings 
} from '../utils/examSettingsStorage';

interface ExamSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: () => void;
}

export const ExamSettingsModal: React.FC<ExamSettingsModalProps> = ({
  isOpen,
  onClose,
  onSaved,
}) => {
  const [settings, setSettings] = useState<ExamDurationSettings>(DEFAULT_EXAM_SETTINGS);
  const [activeTab, setActiveTab] = useState<'global' | 'modules'>('global');
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSettings(getExamSettings());
      setFeedback(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePresetSelect = (minutes: number) => {
    setSettings((prev) => ({
      ...prev,
      defaultDurationMinutes: minutes,
    }));
  };

  const handleApplyPresetToAllModules = (minutes: number) => {
    const updatedModules: Record<number, number> = {};
    for (let i = 1; i <= 8; i++) {
      updatedModules[i] = minutes;
    }
    setSettings((prev) => ({
      ...prev,
      defaultDurationMinutes: minutes,
      moduleDurations: updatedModules,
    }));
    setFeedback(`Seluruh modul (1–8) berhasil diatur ke durasi ${minutes} Menit.`);
  };

  const handleModuleDurationChange = (weekId: number, minutes: number) => {
    const safeMins = Math.max(1, Math.min(360, minutes || 1));
    setSettings((prev) => ({
      ...prev,
      moduleDurations: {
        ...prev.moduleDurations,
        [weekId]: safeMins,
      },
    }));
  };

  const handleSave = () => {
    saveExamSettings(settings);
    setFeedback('Pengaturan durasi ujian berhasil disimpan dan diterapkan secara real-time!');
    if (onSaved) onSaved();
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const handleReset = () => {
    if (window.confirm('Kembalikan semua pengaturan durasi ujian ke standar sistem (50 Menit)?')) {
      setSettings(DEFAULT_EXAM_SETTINGS);
      saveExamSettings(DEFAULT_EXAM_SETTINGS);
      setFeedback('Pengaturan berhasil dikembalikan ke standar default (50 Menit).');
      if (onSaved) onSaved();
    }
  };

  const presets = [15, 30, 45, 50, 60, 90, 120];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Pengaturan Durasi Ujian</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  Timer System
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Atur alokasi waktu ujian per modul atau seluruh modul untuk semua peserta didik.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="p-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex gap-1">
          <button
            onClick={() => setActiveTab('global')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'global'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs border border-slate-200/80 dark:border-slate-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Durasi Umum &amp; Preset</span>
          </button>
          <button
            onClick={() => setActiveTab('modules')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'modules'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs border border-slate-200/80 dark:border-slate-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Atur Per Modul (1–8)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'global' ? (
            <div className="space-y-6">
              {/* Main Input */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <label className="block text-xs font-bold text-slate-900 dark:text-white">
                  Durasi Standar Ujian (Menit)
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      min={1}
                      max={360}
                      value={settings.defaultDurationMinutes}
                      onChange={(e) => setSettings({ ...settings, defaultDurationMinutes: Math.max(1, parseInt(e.target.value, 10) || 1) })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono font-bold text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <span className="absolute right-3 top-3 text-xs font-semibold text-slate-400">
                      Menit
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleApplyPresetToAllModules(settings.defaultDurationMinutes)}
                    className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer shrink-0"
                  >
                    Terapkan ke Semua Modul
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Waktu ini akan menjadi standar default saat peserta didik memulai ujian modul apapun yang tidak memiliki durasi khusus.
                </p>
              </div>

              {/* Presets */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pilih Opsi Durasi Cepat (Preset):</span>
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {presets.map((min) => {
                    const isSelected = settings.defaultDurationMinutes === min;
                    return (
                      <button
                        key={min}
                        type="button"
                        onClick={() => handlePresetSelect(min)}
                        className={`py-2 px-2 rounded-xl text-xs font-extrabold transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-500/30'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                        }`}
                      >
                        {min} Mnt
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Behavior Settings */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-blue-500" />
                  <span>Perilaku Timer Ujian</span>
                </h4>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Otomatis Kumpulkan Saat Waktu Habis
                    </label>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Jawaban akan langsung dikirim otomatis ketika hitungan mundur mencapai 00:00.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.enableAutoSubmit}
                    onChange={(e) => setSettings({ ...settings, enableAutoSubmit: e.target.checked })}
                    className="w-5 h-5 accent-blue-600 rounded cursor-pointer shrink-0"
                  />
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700/60 pt-3 flex items-center justify-between gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Peringatan Waktu Kritis
                    </label>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Tampilkan warna merah menyala pada timer saat waktu tersisa sedikit.
                    </p>
                  </div>
                  <select
                    value={settings.warningThresholdMinutes}
                    onChange={(e) => setSettings({ ...settings, warningThresholdMinutes: parseInt(e.target.value, 10) || 5 })}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
                  >
                    <option value={3}>3 Menit Terakhir</option>
                    <option value={5}>5 Menit Terakhir</option>
                    <option value={10}>10 Menit Terakhir</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Durasi Khusus Masing-masing Modul (1 s.d. 8)
                </span>
                <button
                  type="button"
                  onClick={() => handleApplyPresetToAllModules(50)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-semibold"
                >
                  Reset Semua ke 50 Mnt
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((week) => {
                  const currentMins = settings.moduleDurations?.[week] || settings.defaultDurationMinutes || 50;
                  return (
                    <div
                      key={week}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                          Modul Ujian Minggu {week}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {currentMins * 60} Detik Total
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <input
                          type="number"
                          min={1}
                          max={360}
                          value={currentMins}
                          onChange={(e) => handleModuleDurationChange(week, parseInt(e.target.value, 10) || 1)}
                          className="w-20 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono font-bold text-xs text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <span className="text-xs font-bold text-slate-500">Mnt</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Pengaturan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
