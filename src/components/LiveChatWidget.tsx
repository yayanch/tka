import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  Users, 
  User, 
  Check, 
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { UserProfile } from '../types/auth';

export interface ChatMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  senderRole: 'siswa' | 'guru' | 'admin';
  text: string;
  timestamp: string;
}

interface LiveChatWidgetProps {
  currentUser: UserProfile | null;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      senderName: 'Sistem TKA TJKT',
      senderEmail: 'system@tka-tjkt.edu',
      senderRole: 'admin',
      text: 'Selamat datang di Ruang Diskusi & Bantuan TKA SMK TJKT! Silakan tanyakan kendala ujian atau materi modul di sini.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat messages from localStorage on mount & poll
  useEffect(() => {
    try {
      const stored = localStorage.getItem('tka_live_chat_messages_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('tka_live_chat_messages_v1', JSON.stringify(messages));
    } catch {
      // ignore
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      senderName: currentUser ? currentUser.namaLengkap : 'Tamu / Siswa Tamu',
      senderEmail: currentUser ? currentUser.email : 'guest@tka.edu',
      senderRole: currentUser?.role || 'siswa',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    setInputText('');

    // If sent by student, simulate auto-reply help bot or encouragement
    if (!currentUser || currentUser.role === 'siswa') {
      setTimeout(() => {
        const botReplies = [
          'Halo! Pertanyaan Anda telah dicatat. Guru atau Admin akan segera merespons rekap nilai Anda.',
          'Tetap semangat berlatih! Pastikan Anda mengerjakan 5 simulasi per modul dengan skor KKM ≥ 75.0.',
          'Jika menemui kendala pada soal atau jaringan server VPS, silakan hubungi nomor bantuan WhatsApp di menu kontak.',
        ];
        const randomReply = botReplies[Math.floor(Math.random() * botReplies.length)];
        const botMsg: ChatMessage = {
          id: 'msg-' + Date.now(),
          senderName: 'Bantuan Asisten TKA',
          senderEmail: 'bot@tka-tjkt.edu',
          senderRole: 'admin',
          text: randomReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, botMsg]);
      }, 1500);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="relative group w-14 h-14 bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 cursor-pointer border-2 border-white/40 dark:border-slate-800 flex items-center justify-center"
          title="Buka Ruang Diskusi & Bantuan Cepat"
        >
          <MessageCircle className="w-6 h-6 text-white animate-pulse" />
          <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 animate-ping" />
          <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-bold">
            <MessageCircle className="w-5 h-5 text-blue-100" />
          </div>
          <div>
            <div className="font-extrabold text-sm flex items-center gap-1.5">
              <span>Diskusi &amp; Bantuan TKA</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="text-[10px] text-blue-100/90 font-normal">
              {currentUser ? `Masuk sebagai: ${currentUser.namaLengkap} (${currentUser.role})` : 'Ruang Pesan Terbuka'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 rounded-lg hover:bg-white/20 text-blue-100 transition-colors cursor-pointer"
            title={isMinimized ? 'Perbesar' : 'Perkecil'}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/20 text-blue-100 transition-colors cursor-pointer"
            title="Tutup Chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Message List */}
          <div className="p-4 flex-1 h-80 overflow-y-auto space-y-3 bg-slate-50/70 dark:bg-slate-950/50 text-xs">
            {messages.map((msg) => {
              const isMe = currentUser && msg.senderEmail === currentUser.email;
              const isAdminOrGuru = msg.senderRole === 'admin' || msg.senderRole === 'guru';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {msg.senderName}
                    </span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase ${
                      isAdminOrGuru 
                        ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300' 
                        : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                    }`}>
                      {msg.senderRole}
                    </span>
                    <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                      isMe
                        ? 'bg-blue-600 text-white rounded-tr-xs shadow-xs'
                        : isAdminOrGuru
                        ? 'bg-purple-600 text-white rounded-tl-xs shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-xs shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tulis pesan atau pertanyaan Anda di sini..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-sm shrink-0 flex items-center justify-center"
              title="Kirim Pesan"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </>
      )}
    </div>
  );
};
