import React, { useState, useEffect } from 'react';
import { MessageSquarePlus, X, Send, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { UserProfile } from '../types/auth';

interface FeedbackNotificationModalProps {
  currentUser?: UserProfile | null;
  isOpen?: boolean;
  onClose?: () => void;
}

export const FeedbackNotificationModal: React.FC<FeedbackNotificationModalProps> = ({
  currentUser,
  isOpen: controlledIsOpen,
  onClose,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const [category, setCategory] = useState<'fitur' | 'soal' | 'bug' | 'lainnya'>('fitur');
  const [rating, setRating] = useState<number>(5);
  const [message, setMessage] = useState('');
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Only show after logging into an individual account
    if (!currentUser || controlledIsOpen !== undefined) {
      if (!currentUser) setInternalIsOpen(false);
      return;
    }

    const hideKey = `tka_hide_feedback_${currentUser.email}`;
    const hidden = localStorage.getItem(hideKey);
    if (hidden === 'true') return;

    // Show after 3 seconds upon entering the student account dashboard
    const timer = setTimeout(() => {
      setInternalIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentUser, controlledIsOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newFeedback = {
      user: currentUser ? currentUser.namaLengkap : 'Pengunjung',
      email: currentUser ? currentUser.email : '-',
      category,
      rating,
      message,
      createdAt: new Date().toISOString(),
    };

    try {
      // Fetch existing feedbacks from server settings
      const res = await fetch('/api/settings/tka_user_feedbacks');
      let feedbackList: any[] = [];
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && Array.isArray(data.value)) {
          feedbackList = data.value;
        }
      }

      feedbackList.unshift(newFeedback);

      // Save back to server settings
      await fetch('/api/settings/tka_user_feedbacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackList),
      });
    } catch {
      // Fallback to localStorage if offline
      const localList = JSON.parse(localStorage.getItem('tka_user_feedbacks') || '[]');
      localList.unshift(newFeedback);
      localStorage.setItem('tka_user_feedbacks', JSON.stringify(localList));
    }

    if (dontShowAgain && currentUser) {
      const hideKey = `tka_hide_feedback_${currentUser.email}`;
      localStorage.setItem(hideKey, 'true');
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setInternalIsOpen(false);
      onClose?.();
      setIsSubmitted(false);
      setMessage('');
    }, 2500);
  };

  const handleDismiss = () => {
    if (dontShowAgain && currentUser) {
      const hideKey = `tka_hide_feedback_${currentUser.email}`;
      localStorage.setItem(hideKey, 'true');
    }
    setInternalIsOpen(false);
    onClose?.();
  };

  if (!isOpen || !currentUser) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md w-full p-4 animate-slideUp">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-5 sm:p-6 space-y-4 relative overflow-hidden">
        {/* Decorative Background Gradient */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Kritik & Saran Akun</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </h3>
              <p className="text-[11px] text-slate-500">
                Masukan Anda untuk peningkatan modul & platform TKA TJKT
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-2 animate-fadeIn">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Terima Kasih!</h4>
            <p className="text-xs text-slate-500">Kritik dan saran dari akun Anda telah berhasil terkirim.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Category selection */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setCategory('fitur')}
                className={`p-2 rounded-xl border text-center font-bold transition-colors cursor-pointer ${
                  category === 'fitur'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                💡 Ide Fitur Baru
              </button>
              <button
                type="button"
                onClick={() => setCategory('soal')}
                className={`p-2 rounded-xl border text-center font-bold transition-colors cursor-pointer ${
                  category === 'soal'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                📝 Evaluasi Soal
              </button>
              <button
                type="button"
                onClick={() => setCategory('bug')}
                className={`p-2 rounded-xl border text-center font-bold transition-colors cursor-pointer ${
                  category === 'bug'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                🐛 Laporkan Bug
              </button>
              <button
                type="button"
                onClick={() => setCategory('lainnya')}
                className={`p-2 rounded-xl border text-center font-bold transition-colors cursor-pointer ${
                  category === 'lainnya'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                💬 Lainnya
              </button>
            </div>

            {/* Rating Stars */}
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Penilaian Anda:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Message input */}
            <div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan kritik, masukan, atau saran Anda dari akun ini secara detail di sini..."
                rows={3}
                required
                className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 resize-none"
              />
            </div>

            {/* Do not show again option */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-[11px] text-slate-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                />
                <span>Jangan tampilkan lagi</span>
              </label>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
