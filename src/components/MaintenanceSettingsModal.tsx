import React, { useState } from 'react';
import { 
  Wrench, 
  Clock, 
  Save, 
  X, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar,
  Lock,
  Phone,
  Mail
} from 'lucide-react';
import { MaintenanceConfig, DEFAULT_MAINTENANCE_CONFIG } from './MaintenanceView';

interface MaintenanceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: MaintenanceConfig;
  onSave: (newConfig: MaintenanceConfig) => Promise<void>;
}

export const MaintenanceSettingsModal: React.FC<MaintenanceSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [enabled, setEnabled] = useState(config.enabled);
  const [title, setTitle] = useState(config.title || DEFAULT_MAINTENANCE_CONFIG.title);
  const [message, setMessage] = useState(config.message || DEFAULT_MAINTENANCE_CONFIG.message);
  const [targetEndTime, setTargetEndTime] = useState(() => {
    try {
      const d = new Date(config.targetEndTime || Date.now() + 2 * 3600 * 1000);
      // Format as YYYY-MM-THH:mm for datetime-local input
      return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    } catch {
      return new Date(Date.now() + 2 * 3600 * 1000).toISOString().slice(0, 16);
    }
  });
  const [allowAdminBypass, setAllowAdminBypass] = useState(config.allowAdminBypass ?? true);
  const [contactEmail, setContactEmail] = useState(config.contactEmail || 'admin@smk.belajar.id');
  const [contactWhatsapp, setContactWhatsapp] = useState(config.contactWhatsapp || '081234567890');

  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Preset time adder helper
  const addHoursToTimer = (hoursToAdd: number) => {
    const newTargetMs = Date.now() + hoursToAdd * 3600 * 1000;
    const d = new Date(newTargetMs);
    const localIso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    setTargetEndTime(localIso);
  };

  const addMinutesToTimer = (minutesToAdd: number) => {
    const newTargetMs = Date.now() + minutesToAdd * 60 * 1000;
    const d = new Date(newTargetMs);
    const localIso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    setTargetEndTime(localIso);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg('');

    try {
      const isoEndTime = new Date(targetEndTime).toISOString();
      const updated: MaintenanceConfig = {
        enabled,
        title,
        message,
        targetEndTime: isoEndTime,
        allowAdminBypass,
        contactEmail,
        contactWhatsapp,
      };

      await onSave(updated);
      setSuccessMsg('Pengaturan mode pemeliharaan berhasil disimpan!');
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      alert('Gagal menyimpan pengaturan: ' + (err.message || 'Error'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-amber-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                Pengaturan Mode Pemeliharaan Sistem (Maintenance)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Atur timer penghitung mundur dan pesan pemberitahuan pemeliharaan untuk siswa
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
        <form onSubmit={handleFormSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-left">
          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Toggle Switch Mode Maintenance */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Status Mode Pemeliharaan (Maintenance)</span>
                {enabled ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 uppercase">
                    Aktif (ON)
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 uppercase">
                    Nonaktif (OFF)
                  </span>
                )}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Bila DIAKTIFKAN, seluruh halaman siswa akan dialihkan secara otomatis ke layar pemeliharaan dengan countdown timer.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setEnabled(!enabled)}
              className={`w-14 h-8 rounded-full transition-colors relative p-1 cursor-pointer shrink-0 ${
                enabled ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                  enabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Timer Countdown Configuration */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Jadwal Waktu Selesai (Target Timer Countdown):</span>
            </label>

            {/* Quick Presets Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-semibold text-slate-400 mr-1">Tambah Timer Cepat:</span>
              <button
                type="button"
                onClick={() => addMinutesToTimer(15)}
                className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 text-[11px] font-bold border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer"
              >
                +15 Menit
              </button>
              <button
                type="button"
                onClick={() => addMinutesToTimer(30)}
                className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 text-[11px] font-bold border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer"
              >
                +30 Menit
              </button>
              <button
                type="button"
                onClick={() => addHoursToTimer(1)}
                className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 text-[11px] font-bold border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer"
              >
                +1 Jam
              </button>
              <button
                type="button"
                onClick={() => addHoursToTimer(3)}
                className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 text-[11px] font-bold border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer"
              >
                +3 Jam
              </button>
              <button
                type="button"
                onClick={() => addHoursToTimer(6)}
                className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 text-[11px] font-bold border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer"
              >
                +6 Jam
              </button>
              <button
                type="button"
                onClick={() => addHoursToTimer(24)}
                className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 text-purple-700 dark:text-purple-300 text-[11px] font-bold border border-purple-200 dark:border-purple-800 transition-colors cursor-pointer"
              >
                +24 Jam
              </button>
            </div>

            {/* Datetime Input */}
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="datetime-local"
                required
                value={targetEndTime}
                onChange={(e) => setTargetEndTime(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-extrabold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Title Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
              Judul Pemeliharaan:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Sistem Dalam Pemeliharaan Berkala & Optimasi Server"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Message Textarea */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
              Pesan Penjelasan Pemeliharaan Untuk Siswa:
            </label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan alasan pemeliharaan server..."
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Support Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-blue-500" />
                <span>Email Helpdesk:</span>
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                <span>WhatsApp Helpdesk:</span>
              </label>
              <input
                type="text"
                value={contactWhatsapp}
                onChange={(e) => setContactWhatsapp(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Allow Admin Bypass Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="bypass_checkbox"
              checked={allowAdminBypass}
              onChange={(e) => setAllowAdminBypass(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
            />
            <label htmlFor="bypass_checkbox" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
              Izinkan Administrator / Guru Melakukan Bypass (Login) di Layar Maintenance
            </label>
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
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Pengaturan Maintenance'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
