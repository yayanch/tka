import React, { useState, useEffect, useMemo } from 'react';
import { 
  Question, 
  QuestionState, 
  UserAnswerValue, 
  ExamSession 
} from '../types/quiz';
import { calculateSessionSummary } from '../utils/scoring';
import { renderTechnicalDiagram, getQuestionDiagramId } from './NetworkIllustrations';
import { 
  Clock, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  CheckCircle2, 
  AlertTriangle,
  HelpCircle,
  LogOut,
  Sparkles,
  Image as ImageIcon,
  Eye,
  EyeOff
} from 'lucide-react';

interface QuizSessionViewProps {
  session: ExamSession;
  questions: Question[];
  isBookmarked: boolean;
  onAnswerQuestion: (questionId: string, value: UserAnswerValue) => void;
  onToggleFlag: (questionId: string) => void;
  onToggleBookmark: (questionId: string) => void;
  onJumpToQuestion: (index: number) => void;
  onFinishSession: () => void;
  onExitSession: () => void;
}

export const QuizSessionView: React.FC<QuizSessionViewProps> = ({
  session,
  questions,
  isBookmarked,
  onAnswerQuestion,
  onToggleFlag,
  onToggleBookmark,
  onJumpToQuestion,
  onFinishSession,
  onExitSession,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [showConfirmFinishModal, setShowConfirmFinishModal] = useState<boolean>(false);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(() => {
    const totalSec = (session.timeLimitMinutes || 50) * 60;
    return Math.max(0, totalSec - session.elapsedSeconds);
  });

  const currentQ = questions[session.currentIndex];
  const currentState = currentQ ? session.answers[currentQ.id] : undefined;
  const [showDiagram, setShowDiagram] = useState<boolean>(true);
  const questionDiagramId = currentQ ? getQuestionDiagramId(currentQ) : null;

  // Real-time score computation
  const summary = useMemo(() => {
    return calculateSessionSummary(questions, session.answers);
  }, [questions, session.answers]);

  // Timer countdown for exam mode
  useEffect(() => {
    if (session.mode !== 'exam' || session.isFinished) return;

    const timer = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onFinishSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [session.mode, session.isFinished, onFinishSession]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Keyboard navigation & shortcuts (1-5 for options, Left/Right arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if inside input/textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowLeft' && session.currentIndex > 0) {
        onJumpToQuestion(session.currentIndex - 1);
      } else if (e.key === 'ArrowRight' && session.currentIndex < questions.length - 1) {
        onJumpToQuestion(session.currentIndex + 1);
      } else if (currentQ?.type === 'PG' && ['1', '2', '3', '4', '5'].includes(e.key)) {
        const optIdx = parseInt(e.key, 10) - 1;
        if (optIdx >= 0 && optIdx < (currentQ.options?.length || 0)) {
          onAnswerQuestion(currentQ.id, optIdx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [session.currentIndex, questions.length, currentQ, onJumpToQuestion, onAnswerQuestion]);

  if (!currentQ) {
    return <div className="p-8 text-center text-slate-500">Memuat soal...</div>;
  }

  const currentAnswerVal = currentState?.value;

  return (
    <div className="space-y-6 pb-20">
      {/* Top Session Status Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Module Title & Mode */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowExitModal(true)}
              className="p-1.5 text-slate-500 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Keluar Sesi"
            >
              <LogOut className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Simulasi Ujian Resmi
                </span>
                <span aria-hidden="true">·</span>
                <span>Soal {session.currentIndex + 1} dari {questions.length}</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate max-w-md">
                {session.title}
              </h2>
            </div>
          </div>

          {/* Metrics: Real-time Score, Timer, Actions */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {/* Real-Time Live Score */}
            <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-lg px-3 py-1.5 text-center">
              <span className="text-[10px] uppercase font-semibold text-blue-600 dark:text-blue-400 block tracking-wider">
                Skor Real-Time
              </span>
              <span className="text-sm sm:text-base font-bold text-blue-700 dark:text-blue-300 tabular-nums">
                {summary.finalScore} <span className="text-xs font-normal text-slate-500">/ 100</span>
              </span>
            </div>

            {/* Answered Counter */}
            <div className="hidden sm:block text-xs text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">{summary.answeredCount}</span> Dijawab ·{' '}
              <span className="font-semibold text-amber-600 dark:text-amber-400 tabular-nums">{summary.flaggedCount}</span> Ragu
            </div>

            {/* Timer (Exam Mode) */}
            {session.mode === 'exam' && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-sm font-bold tabular-nums ${
                remainingSeconds < 300
                  ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800'
                  : remainingSeconds < 600
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimer(remainingSeconds)}</span>
              </div>
            )}

            {/* Font Size Adjuster */}
            <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700 text-xs">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded cursor-pointer ${fontSize === 'normal' ? 'bg-white dark:bg-slate-700 font-bold shadow-xs' : 'text-slate-500'}`}
                title="Ukuran Font Standar"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded cursor-pointer ${fontSize === 'large' ? 'bg-white dark:bg-slate-700 font-bold shadow-xs' : 'text-slate-500'}`}
                title="Ukuran Font Sedang"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 rounded cursor-pointer ${fontSize === 'xlarge' ? 'bg-white dark:bg-slate-700 font-bold shadow-xs' : 'text-slate-500'}`}
                title="Ukuran Font Besar"
              >
                A++
              </button>
            </div>

            {/* Selesaikan Ujian Button */}
            <button
              onClick={() => setShowConfirmFinishModal(true)}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Selesaikan
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Question Content (Left 70%) & Question Palette (Right 30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Active Question Workspace */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs space-y-6">
            {/* Question Header & Meta */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-slate-900 dark:text-white">
                    Nomor {currentQ.number}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {currentQ.type === 'PG' && 'Pilihan Ganda (PG)'}
                    {currentQ.type === 'PGK_KATEGORI' && 'PGK Kategori (Benar / Salah)'}
                    {currentQ.type === 'PGK_MCMA' && 'PGK MCMA (Pilihan Majemuk)'}
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                  <span>Kompetensi: {currentQ.kompetensi}</span>
                </div>
              </div>

              {/* Action Icons: Bookmark & Flag */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onToggleBookmark(currentQ.id)}
                  className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                    isBookmarked
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 border-amber-300 dark:border-amber-700'
                      : 'text-slate-400 hover:text-slate-700 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                  title={isBookmarked ? 'Hapus Bookmark' : 'Simpan Bookmark Soal'}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={() => onToggleFlag(currentQ.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                    currentState?.isFlagged
                      ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Flag className={`w-3.5 h-3.5 ${currentState?.isFlagged ? 'fill-current' : ''}`} />
                  <span className="hidden sm:inline">Ragu-ragu</span>
                </button>
              </div>
            </div>

            {/* Question Prompt (Kasus) */}
            <div className={`space-y-3 ${
              fontSize === 'xlarge' ? 'text-lg leading-relaxed' : fontSize === 'large' ? 'text-base leading-relaxed' : 'text-sm leading-normal'
            }`}>
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Deskripsi Kasus / Soal:
              </div>
              <p className="font-medium text-slate-900 dark:text-white whitespace-pre-line">
                {currentQ.kasus}
              </p>
            </div>

            {/* Contextual Technical Diagram for Question (Non-license) */}
            {questionDiagramId && (
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Diagram Ilustrasi Soal:</span>
                    <span className="text-[10px] font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                      Bebas Lisensi
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDiagram(!showDiagram)}
                    className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                  >
                    {showDiagram ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Sembunyikan Diagram</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Tampilkan Diagram</span>
                      </>
                    )}
                  </button>
                </div>

                {showDiagram && (
                  <div className="pt-1">
                    {renderTechnicalDiagram(questionDiagramId)}
                  </div>
                )}
              </div>
            )}

            {/* Interactive Inputs according to Question Type */}
            <div className="pt-2">
              {/* 1. PG (Single Choice A, B, C, D, E) */}
              {currentQ.type === 'PG' && currentQ.options && (
                <div className="space-y-3">
                  <span className="text-xs text-slate-500 block">
                    Pilih satu opsi jawaban yang paling tepat:
                  </span>
                  <div className="space-y-2.5">
                    {currentQ.options.map((optionText, idx) => {
                      const letter = String.fromCharCode(65 + idx);
                      const isSelected = currentAnswerVal === idx;

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => onAnswerQuestion(currentQ.id, idx)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-900 dark:text-blue-100 ring-1 ring-blue-500'
                              : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}>
                            {letter}
                          </span>
                          <span className={`flex-1 ${fontSize === 'large' ? 'text-base' : fontSize === 'xlarge' ? 'text-lg' : 'text-sm'}`}>
                            {optionText}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 2. PGK Kategori (Statements A, B, C with Benar/Salah toggle) */}
              {currentQ.type === 'PGK_KATEGORI' && currentQ.statements && (
                <div className="space-y-3">
                  <span className="text-xs text-slate-500 block">
                    Tentukan apakah setiap pernyataan berikut Benar atau Salah:
                  </span>
                  <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-200 dark:divide-slate-800">
                    {currentQ.statements.map((stmt) => {
                      const userMap = (currentAnswerVal as Record<string, 'Benar' | 'Salah'>) || {};
                      const selectedVal = userMap[stmt.id];

                      const handleSelect = (choice: 'Benar' | 'Salah') => {
                        const updated = {
                          ...userMap,
                          [stmt.id]: choice,
                        };
                        onAnswerQuestion(currentQ.id, updated);
                      };

                      return (
                        <div key={stmt.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900">
                          <div className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                              {stmt.id}
                            </span>
                            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                              {stmt.text}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            <button
                              type="button"
                              onClick={() => handleSelect('Benar')}
                              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                                selectedVal === 'Benar'
                                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              Benar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSelect('Salah')}
                              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                                selectedVal === 'Salah'
                                  ? 'bg-red-600 text-white border-red-600 shadow-xs'
                                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              Salah
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. PGK MCMA (Multiple Choice Checkboxes) */}
              {currentQ.type === 'PGK_MCMA' && currentQ.mcmaOptions && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Centang semua pernyataan yang benar (jawaban lebih dari satu):</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400 tabular-nums">
                      {((currentAnswerVal as number[]) || []).length} dipilih
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {currentQ.mcmaOptions.map((optText, idx) => {
                      const selectedIndices = (currentAnswerVal as number[]) || [];
                      const isChecked = selectedIndices.includes(idx);

                      const handleToggle = () => {
                        let updated: number[];
                        if (isChecked) {
                          updated = selectedIndices.filter(i => i !== idx);
                        } else {
                          updated = [...selectedIndices, idx];
                        }
                        onAnswerQuestion(currentQ.id, updated);
                      };

                      return (
                        <div
                          key={idx}
                          onClick={handleToggle}
                          className={`p-3.5 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                            isChecked
                              ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-900 dark:text-blue-100 ring-1 ring-blue-500'
                              : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 ${
                            isChecked
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                          }`}>
                            {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                          <span className={`flex-1 ${fontSize === 'large' ? 'text-base' : fontSize === 'xlarge' ? 'text-lg' : 'text-sm'}`}>
                            {optText}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Controls: Prev, Next */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => onJumpToQuestion(session.currentIndex - 1)}
              disabled={session.currentIndex === 0}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                session.currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            {session.currentIndex < questions.length - 1 ? (
              <button
                onClick={() => onJumpToQuestion(session.currentIndex + 1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-xs cursor-pointer"
              >
                <span>Selanjutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmFinishModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 transition-colors shadow-xs cursor-pointer"
              >
                <span>Kirim & Selesaikan</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Question Navigation Grid Palette (Desktop) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Navigasi Soal (1–{questions.length})
              </h3>
              <span className="text-[11px] text-slate-400 tabular-nums">
                {summary.answeredCount} / {questions.length} Selesai
              </span>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500"></span>
                <span>Dijawab</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-400"></span>
                <span>Ragu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600"></span>
                <span>Kosong</span>
              </div>
            </div>

            {/* Grid of 50 numbers */}
            <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-5 gap-2 max-h-[380px] overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const qState = session.answers[q.id];
                const isAnswered = qState?.answered && qState.value !== undefined;
                const isFlagged = qState?.isFlagged;
                const isActive = idx === session.currentIndex;

                let badgeClass = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200';
                if (isFlagged) {
                  badgeClass = 'bg-amber-400 text-slate-900 font-bold';
                } else if (isAnswered) {
                  badgeClass = 'bg-emerald-600 text-white font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => onJumpToQuestion(idx)}
                    className={`h-9 rounded-lg text-xs transition-all relative flex items-center justify-center cursor-pointer ${badgeClass} ${
                      isActive ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900 scale-105 z-10' : ''
                    }`}
                  >
                    <span>{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Selesai trigger */}
            <button
              onClick={() => setShowConfirmFinishModal(true)}
              className="w-full py-2.5 text-xs font-semibold text-center text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors cursor-pointer"
            >
              Kumpulkan Semua Jawaban
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal to Finish */}
      {showConfirmFinishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Konfirmasi Pengumpulan
                </h3>
                <span className="text-xs text-slate-500">
                  {session.title}
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Soal Terjawab:</span>
                <span className="font-bold text-emerald-600 tabular-nums">{summary.answeredCount} dari {questions.length}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Soal Masih Ragu:</span>
                <span className="font-bold text-amber-600 tabular-nums">{summary.flaggedCount} soal</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Soal Belum Terjawab:</span>
                <span className="font-bold text-red-500 tabular-nums">{summary.unansweredCount} soal</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-slate-900 dark:text-white">
                <span>Estimasi Skor Akhir:</span>
                <span className="text-blue-600 text-sm tabular-nums">{summary.finalScore} / 100</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Setelah dikumpulkan, sesi akan ditutup dan Anda akan langsung diarahkan ke layar **Pembahasan Otomatis & Analisis Lengkap**.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmFinishModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                Kembali Periksa
              </button>
              <button
                onClick={() => {
                  setShowConfirmFinishModal(false);
                  onFinishSession();
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm cursor-pointer"
              >
                Ya, Kumpulkan Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Session Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Keluar dari Sesi?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Apakah Anda yakin ingin meninggalkan sesi pengerjaan ini? Jawaban pada sesi saat ini tidak akan disimpan ke statistik rekap jika keluar sekarang.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowExitModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                Lanjutkan Ujian
              </button>
              <button
                onClick={() => {
                  setShowExitModal(false);
                  onExitSession();
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
