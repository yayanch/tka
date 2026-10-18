import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Question, 
  ExamSession, 
  UserAnswerValue 
} from '../types/quiz';
import { evaluateAnswer } from '../utils/scoring';
import { renderTechnicalDiagram, getQuestionDiagramId } from './NetworkIllustrations';
import { 
  Award, 
  RotateCcw, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Bookmark, 
  Printer, 
  HelpCircle,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Image as ImageIcon,
  Database
} from 'lucide-react';

interface SessionResultViewProps {
  session: ExamSession;
  questions: Question[];
  bookmarkedIds: string[];
  onRetry: () => void;
  onDrillWrong: (wrongQuestions: Question[]) => void;
  onBackToDashboard: () => void;
  onToggleBookmark: (questionId: string) => void;
}

export const SessionResultView: React.FC<SessionResultViewProps> = ({
  session,
  questions,
  bookmarkedIds,
  onRetry,
  onDrillWrong,
  onBackToDashboard,
  onToggleBookmark,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'wrong' | 'correct' | 'flagged'>('all');
  const [expandedAll, setExpandedAll] = useState<boolean>(true);

  const finalScore = session.finalScore || 0;
  const isPassed = finalScore >= 75;

  // Fire celebratory confetti for good scores
  useEffect(() => {
    if (finalScore >= 75) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6'],
        });
      } catch {
        // ignore if confetti fails
      }
    }
  }, [finalScore]);

  // Evaluate each question result
  const evaluatedQuestions = questions.map((q, idx) => {
    const qState = session.answers[q.id];
    const userVal = qState?.value;
    const isAnswered = qState?.answered && userVal !== undefined;
    const { isCorrect, scoreEarned } = evaluateAnswer(q, userVal);

    return {
      question: q,
      index: idx + 1,
      userVal,
      isAnswered,
      isCorrect,
      scoreEarned,
      isFlagged: !!qState?.isFlagged,
    };
  });

  const wrongList = evaluatedQuestions.filter(item => !item.isCorrect && item.isAnswered);
  const correctList = evaluatedQuestions.filter(item => item.isCorrect);
  const flaggedList = evaluatedQuestions.filter(item => item.isFlagged);
  const unansweredList = evaluatedQuestions.filter(item => !item.isAnswered);

  const filteredItems = evaluatedQuestions.filter(item => {
    if (filterTab === 'wrong') return !item.isCorrect;
    if (filterTab === 'correct') return item.isCorrect;
    if (filterTab === 'flagged') return item.isFlagged;
    return true;
  });

  // Breakdown by question group
  const pgItems = evaluatedQuestions.filter(item => item.question.type === 'PG');
  const pgCorrect = pgItems.filter(item => item.isCorrect).length;

  const kategoriItems = evaluatedQuestions.filter(item => item.question.type === 'PGK_KATEGORI');
  const kategoriCorrect = kategoriItems.filter(item => item.isCorrect).length;

  const mcmaItems = evaluatedQuestions.filter(item => item.question.type === 'PGK_MCMA');
  const mcmaCorrect = mcmaItems.filter(item => item.isCorrect).length;

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}d`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-20 print:p-0">
      {/* Top Banner / Score Hero */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span>Hasil Evaluasi Otomatis</span>
              <span aria-hidden="true">·</span>
              <span>{session.title}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md border border-blue-200/60 dark:border-blue-900/60">
                <Database className="w-3 h-3 text-blue-500" />
                <span>Terekam di MySQL</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {isPassed ? 'Selamat, Anda Dinyatakan Kompeten!' : 'Perlu Penguatan & Latihan Remedial'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              {isPassed
                ? 'Hasil evaluasi Anda memenuhi dan melampaui Standar Kompetensi Kelulusan (&ge;75). Pelajari pembahasan di bawah untuk memperdalam konsep.'
                : 'Skor Anda masih berada di bawah ambang kompetensi (&ge;75). Gunakan tombol "Latihan Soal Salah" untuk memperkuat konsep yang belum dikuasai.'}
            </p>
          </div>

          {/* Primary Score Ring / Badge */}
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 shrink-0 self-start md:self-center">
            <div className="text-center">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Skor Akhir
              </span>
              <div className="flex items-baseline justify-center gap-1">
                <span className={`text-4xl sm:text-5xl font-black tabular-nums ${
                  isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                }`}>
                  {finalScore}
                </span>
                <span className="text-sm font-semibold text-slate-400">/ 100</span>
              </div>
              <span className={`inline-block mt-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                isPassed ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}>
                {isPassed ? 'KOMPETEN' : 'BELUM KOMPETEN'}
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown Metric Strip */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="space-y-1">
            <span className="text-xs text-slate-400">Jawaban Benar</span>
            <p className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {correctList.length} <span className="text-xs font-normal text-slate-400">soal</span>
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400">Jawaban Salah</span>
            <p className="text-lg sm:text-xl font-bold text-red-500 tabular-nums">
              {wrongList.length} <span className="text-xs font-normal text-slate-400">soal</span>
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400">Tidak Terjawab</span>
            <p className="text-lg sm:text-xl font-bold text-slate-500 tabular-nums">
              {unansweredList.length} <span className="text-xs font-normal text-slate-400">soal</span>
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400">Akurasi Jawaban</span>
            <p className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 tabular-nums">
              {session.accuracyRate || 0}%
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400">Waktu Tempuh</span>
            <p className="text-lg sm:text-xl font-bold text-slate-700 dark:text-slate-300 tabular-nums">
              {formatDuration(session.elapsedSeconds)}
            </p>
          </div>
        </div>

        {/* Sub-format performance bars */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
            <span className="text-slate-500">Pilihan Ganda (1–30)</span>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 tabular-nums">
              {pgCorrect} / {pgItems.length} Benar ({pgItems.length > 0 ? Math.round((pgCorrect / pgItems.length) * 100) : 0}%)
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
            <span className="text-slate-500">PGK Kategori (31–40)</span>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 tabular-nums">
              {kategoriCorrect} / {kategoriItems.length} Sempurna
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
            <span className="text-slate-500">PGK MCMA (41–50)</span>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 tabular-nums">
              {mcmaCorrect} / {mcmaItems.length} Sempurna
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Menu Utama</span>
          </button>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Hasil</span>
            </button>

            {wrongList.length > 0 && (
              <button
                onClick={() => onDrillWrong(wrongList.map(item => item.question))}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Drill {wrongList.length} Soal Salah Saja</span>
              </button>
            )}

            <button
              onClick={onRetry}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi Seluruh Modul</span>
            </button>
          </div>
        </div>
      </section>

      {/* Review & Pembahasan Otomatis Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-blue-600" />
              <span>Pembahasan Otomatis & Rincian Jawaban</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Analisis konsep pedagogis dan rasional kunci jawaban untuk setiap nomor soal
            </p>
          </div>

          {/* Filter Tabs (Interactive Segmented Control) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg self-start sm:self-auto text-xs font-medium">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                filterTab === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Semua ({evaluatedQuestions.length})
            </button>
            <button
              onClick={() => setFilterTab('wrong')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                filterTab === 'wrong'
                  ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-red-600'
              }`}
            >
              Salah ({wrongList.length + unansweredList.length})
            </button>
            <button
              onClick={() => setFilterTab('correct')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                filterTab === 'correct'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
              }`}
            >
              Benar ({correctList.length})
            </button>
            {flaggedList.length > 0 && (
              <button
                onClick={() => setFilterTab('flagged')}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  filterTab === 'flagged'
                    ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-amber-600'
                }`}
              >
                Ragu ({flaggedList.length})
              </button>
            )}
          </div>
        </div>

        {/* Question Review Cards List */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 text-xs">
              Tidak ada soal pada kategori filter ini.
            </div>
          ) : (
            filteredItems.map(({ question: q, index, userVal, isAnswered, isCorrect, scoreEarned, isFlagged }) => {
              const isSaved = bookmarkedIds.includes(q.id);
              const diagramId = getQuestionDiagramId(q);

              return (
                <div
                  key={q.id}
                  className={`bg-white dark:bg-slate-900 rounded-xl border p-5 sm:p-6 transition-all space-y-4 ${
                    isCorrect
                      ? 'border-emerald-200 dark:border-emerald-900/60'
                      : !isAnswered
                      ? 'border-slate-200 dark:border-slate-800'
                      : 'border-red-200 dark:border-red-900/60'
                  }`}
                >
                  {/* Item Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                        <span className="font-bold text-slate-900 dark:text-white">
                          Soal Nomor {index}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{q.type}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-600 dark:text-slate-300 font-medium">
                          {q.subKompetensi}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onToggleBookmark(q.id)}
                        className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                          isSaved
                            ? 'bg-amber-50 text-amber-600 border-amber-300 dark:bg-amber-950/40 dark:border-amber-700'
                            : 'text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-700'
                        }`}
                        title="Tandai Bookmark"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                      </button>

                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 px-2.5 py-1 rounded-md">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Benar (+{scoreEarned})</span>
                        </span>
                      ) : scoreEarned > 0 ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 px-2.5 py-1 rounded-md">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Sebagian (+{scoreEarned})</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/80 px-2.5 py-1 rounded-md">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>{isAnswered ? 'Salah' : 'Kosong'} (0)</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Kasus Prompt */}
                  <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                    {q.kasus}
                  </p>

                  {/* Answers Comparison Display according to Question Type */}
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs space-y-2 border border-slate-100 dark:border-slate-800">
                    {/* PG Review */}
                    {q.type === 'PG' && q.options && (
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-2">
                          <span className="w-24 shrink-0 text-slate-400">Jawaban Anda:</span>
                          <span className={`font-semibold ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                            {userVal !== undefined ? (
                              `${String.fromCharCode(65 + Number(userVal))}. ${q.options[Number(userVal)]}`
                            ) : (
                              '(Tidak dijawab)'
                            )}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="w-24 shrink-0 text-slate-400">Kunci Benar:</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            {q.correctOptionIndex !== undefined ? `${String.fromCharCode(65 + q.correctOptionIndex)}. ${q.options[q.correctOptionIndex]}` : q.correctAnswer}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* PGK Kategori Review */}
                    {q.type === 'PGK_KATEGORI' && q.statements && (
                      <div className="space-y-2">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 block">
                          Pemeriksaan Pernyataan:
                        </span>
                        <div className="space-y-1">
                          {q.statements.map((stmt) => {
                            const userMap = (userVal as Record<string, 'Benar' | 'Salah'>) || {};
                            const userPick = userMap[stmt.id];
                            const stmtCorrect = userPick === stmt.answer;

                            return (
                              <div key={stmt.id} className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60 dark:border-slate-700/60 last:border-0">
                                <span className="text-slate-700 dark:text-slate-300 pr-2">
                                  <strong>{stmt.id}.</strong> {stmt.text}
                                </span>
                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="text-slate-400">
                                    Anda: <strong className={stmtCorrect ? 'text-emerald-600' : 'text-red-500'}>{userPick || '-'}</strong>
                                  </span>
                                  <span aria-hidden="true">·</span>
                                  <span className="text-emerald-600 font-bold">
                                    Kunci: {stmt.answer}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* PGK MCMA Review */}
                    {q.type === 'PGK_MCMA' && q.mcmaOptions && (
                      <div className="space-y-2">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 block">
                          Pilihan Centang yang Benar:
                        </span>
                        <div className="space-y-1">
                          {q.mcmaOptions.map((optText, optIdx) => {
                            const selectedArr = (userVal as number[]) || [];
                            const isPickedByUser = selectedArr.includes(optIdx);
                            const shouldBePicked = (q.correctMcmaIndices || [0, 1, 2]).includes(optIdx);

                            return (
                              <div
                                key={optIdx}
                                className={`p-2 rounded-lg flex items-start justify-between gap-2 ${
                                  shouldBePicked
                                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
                                    : isPickedByUser
                                    ? 'bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-200'
                                    : 'text-slate-600 dark:text-slate-400'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="w-4 h-4 rounded text-[10px] font-bold flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                    {optIdx + 1}
                                  </span>
                                  <span>{optText}</span>
                                </div>
                                <div className="text-[11px] shrink-0 font-medium">
                                  {shouldBePicked && isPickedByUser && <span className="text-emerald-600 font-bold">Tepat Centang</span>}
                                  {shouldBePicked && !isPickedByUser && <span className="text-amber-600 font-bold">Harusnya Dicentang</span>}
                                  {!shouldBePicked && isPickedByUser && <span className="text-red-500 font-bold">Salah Centang</span>}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contextual Technical Diagram (Non-license) */}
                  {diagramId && (
                    <div className="space-y-1.5 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400">
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Diagram Ilustrasi Terkait Soal Ini:</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">
                          Bebas Lisensi
                        </span>
                      </div>
                      <div className="pt-1">
                        {renderTechnicalDiagram(diagramId)}
                      </div>
                    </div>
                  )}

                  {/* Pembahasan Konseptual Otomatis */}
                  <div className="p-4 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-200/70 dark:border-blue-900/60 text-xs sm:text-sm space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-300">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Pembahasan Otomatis:</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {q.pembahasan}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};
