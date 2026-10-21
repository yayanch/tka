import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  XCircle, 
  Save, 
  X, 
  Lock, 
  Unlock, 
  HelpCircle,
  FileText,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export interface ModuleStatusConfig {
  disabledModules: number[]; // e.g. [3, 5] means module 3 and 5 are deactivated
  moduleNotes?: Record<number, string>; // optional custom note per module e.g. { 3: 'Ditutup untuk perbaikan' }
}

export const DEFAULT_MODULE_STATUS_CONFIG: ModuleStatusConfig = {
  disabledModules: [],
  moduleNotes: {},
};

export const MODULE_NAMES: Record<number, { title: string; desc: string }> = {
  1: { title: 'Modul 1: Dunia Kerja TJKT', desc: 'Prospek profesi, kewirausahaan, sertifikasi Vendor, & Alur Kerja' },
  2: { title: 'Modul 2: Hardware & Operating System', desc: 'Spesifikasi Server, Router, OS Linux/Windows, & Troubleshooting' },
  3: { title: 'Modul 3: Managed Switch & VLAN', desc: 'Konfigurasi VLAN Trunking, Inter-VLAN Routing, & Akses Control' },
  4: { title: 'Modul 4: K3LH & Budaya Kerja 5R', desc: 'Keselamatan kerja Lab TJKT, SOP APD, & Manajemen 5R' },
  5: { title: 'Modul 5: Kabel & Topologi Jaringan', desc: 'Crimping UTP/STP, ISO/TIA Standards, Patch Panel, & Fluke Test' },
  6: { title: 'Modul 6: Fiber Optik & FTTH', desc: 'Splicing FO, ODP/OTDR Measurement, Attenuation & PON System' },
  7: { title: 'Modul 7: OSI/TCP-IP & WLAN', desc: 'Model 7 Layer, Subnetting IPv4/IPv6, Access Point, & Security' },
  8: { title: 'Modul 8: Alat Ukur & SOP TKA', desc: 'Multimeter, LAN Tester, OTDR, Power Meter, & Kriteria Lulus' },
};

interface ModuleSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ModuleStatusConfig;
  onSave: (newConfig: ModuleStatusConfig) => Promise<void>;
}

export const ModuleSettingsModal: React.FC<ModuleSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [disabledModules, setDisabledModules] = useState<number[]>(config.disabledModules || []);
  const [notes, setNotes] = useState<Record<number, string>>(config.moduleNotes || {});
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const toggleModule = (weekId: number) => {
    if (disabledModules.includes(weekId)) {
      setDisabledModules(disabledModules.filter((id) => id !== weekId));
    } else {
      setDisabledModules([...disabledModules, weekId]);
    }
  };

  const handleNoteChange = (weekId: number, note: string) => {
    setNotes({ ...notes, [weekId]: note });
  };

  const enableAll = () => setDisabledModules([]);
  const disableAll = () => setDisabledModules([1, 2, 3, 4, 5, 6, 7, 8]);
  const enableFirstHalf = () => setDisabledModules([5, 6, 7, 8]);
  const enableSecondHalf = () => setDisabledModules([1, 2, 3, 4]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg('');

    try {
      await onSave({
        disabledModules,
        moduleNotes: notes,
      });
      setSuccessMsg('Pengaturan status modul berhasil disimpan!');
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      alert('Gagal menyimpan pengaturan: ' + (err?.message || 'Error'));
    } finally {
      setIsSaving(false);
    }
  };

  const activeCount = 8 - disabledModules.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Pengaturan Status Aktif/Nonaktif Modul</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {activeCount} / 8 Aktif
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Atur ketersediaan masing-masing modul ujian (1 s.d. 8) untuk diakses siswa
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-left">
          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Quick Action Presets */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Pilihan Pintas Status Modul:
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={enableAll}
                className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 hover:bg-emerald-200 text-emerald-800 dark:text-emerald-300 text-xs font-bold transition-colors cursor-pointer border border-emerald-300 dark:border-emerald-800"
              >
                ✓ Aktifkan Semua (8 Modul)
              </button>
              <button
                type="button"
                onClick={enableFirstHalf}
                className="px-3 py-1.5 rounded-xl bg-blue-100 dark:bg-blue-950/80 hover:bg-blue-200 text-blue-800 dark:text-blue-300 text-xs font-bold transition-colors cursor-pointer border border-blue-300 dark:border-blue-800"
              >
                Hanya Modul 1 - 4
              </button>
              <button
                type="button"
                onClick={enableSecondHalf}
                className="px-3 py-1.5 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 hover:bg-indigo-200 text-indigo-800 dark:text-indigo-300 text-xs font-bold transition-colors cursor-pointer border border-indigo-300 dark:border-indigo-800"
              >
                Hanya Modul 5 - 8
              </button>
              <button
                type="button"
                onClick={disableAll}
                className="px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950/80 hover:bg-rose-200 text-rose-800 dark:text-rose-300 text-xs font-bold transition-colors cursor-pointer border border-rose-300 dark:border-rose-800"
              >
                ✕ Nonaktifkan Semua
              </button>
            </div>
          </div>

          {/* Module List with Toggles */}
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((weekId) => {
              const isDisabled = disabledModules.includes(weekId);
              const info = MODULE_NAMES[weekId];

              return (
                <div
                  key={weekId}
                  className={`p-4 rounded-2xl border transition-all ${
                    isDisabled
                      ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${
                          isDisabled 
                            ? 'bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200' 
                            : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        }`}>
                          {weekId}
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                          {info.title}
                        </h4>
                        {isDisabled ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 uppercase flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            <span>Nonaktif</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 uppercase flex items-center gap-1">
                            <Unlock className="w-3 h-3" />
                            <span>Aktif</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 pl-8">
                        {info.desc}
                      </p>
                    </div>

                    {/* Toggle Switch */}
                    <button
                      type="button"
                      onClick={() => toggleModule(weekId)}
                      className={`w-14 h-8 rounded-full transition-colors relative p-1 cursor-pointer shrink-0 ${
                        !isDisabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                      title={!isDisabled ? 'Klik untuk menonaktifkan modul' : 'Klik untuk mengaktifkan modul'}
                    >
                      <div
                        className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                          !isDisabled ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Optional Note when disabled */}
                  {isDisabled && (
                    <div className="mt-3 pl-8 pt-2 border-t border-rose-200/60 dark:border-rose-900/40 space-y-1">
                      <label className="text-[11px] font-bold text-rose-700 dark:text-rose-300 block">
                        Catatan Alasan Ditutup (Opsional untuk Siswa):
                      </label>
                      <input
                        type="text"
                        value={notes[weekId] || ''}
                        onChange={(e) => handleNoteChange(weekId, e.target.value)}
                        placeholder="Contoh: Modul ditutup sementara untuk perbaikan bank soal..."
                        className="w-full px-3 py-1.5 rounded-xl border border-rose-300 dark:border-rose-800 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 flex justify-end gap-2 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Pengaturan Status Modul'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
