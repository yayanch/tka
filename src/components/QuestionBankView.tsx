import React, { useState, useMemo, useEffect } from 'react';
import { ALL_400_QUESTIONS } from '../data/questions';
import { Question } from '../types/quiz';
import { CATEGORIES } from '../data/categories';
import { renderTechnicalDiagram, getQuestionDiagramId } from './NetworkIllustrations';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Bookmark, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Sparkles,
  Layers,
  ArrowRight,
  ArrowLeft,
  Play,
  Image as ImageIcon
} from 'lucide-react';

interface QuestionBankViewProps {
  initialWeekId?: number;
  bookmarkedIds: string[];
  onToggleBookmark: (questionId: string) => void;
  onStartExam: (weekId: number, mode: 'exam' | 'practice') => void;
  onBack?: () => void;
  onSelectWeek?: (weekId: number) => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  initialWeekId,
  bookmarkedIds,
  onToggleBookmark,
  onStartExam,
  onBack,
  onSelectWeek,
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(initialWeekId || 0); // 0 = all

  // Sync selected week when initialWeekId changes from history
  useEffect(() => {
    if (initialWeekId !== undefined) {
      setSelectedWeek(initialWeekId);
    }
  }, [initialWeekId]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState<boolean>(false);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    filteredQuestions.forEach(q => { allExpanded[q.id] = true; });
    setExpandedIds(allExpanded);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  const filteredQuestions = useMemo(() => {
    return ALL_400_QUESTIONS.filter(q => {
      if (selectedWeek !== 0 && q.week !== selectedWeek) return false;
      if (selectedType !== 'all' && q.type !== selectedType) return false;
      if (showBookmarksOnly && !bookmarkedIds.includes(q.id)) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesKasus = q.kasus.toLowerCase().includes(query);
        const matchesKomp = q.kompetensi.toLowerCase().includes(query) || q.subKompetensi.toLowerCase().includes(query);
        const matchesExplanation = q.pembahasan.toLowerCase().includes(query);
        const matchesOpts = (q.options || []).some(o => o.toLowerCase().includes(query)) ||
                            (q.mcmaOptions || []).some(o => o.toLowerCase().includes(query)) ||
                            (q.statements || []).some(s => s.text.toLowerCase().includes(query));

        if (!matchesKasus && !matchesKomp && !matchesExplanation && !matchesOpts) {
          return false;
        }
      }

      return true;
    });
  }, [selectedWeek, selectedType, searchQuery, showBookmarksOnly, bookmarkedIds]);

  return (
    <div className="space-y-6 pb-20">
      {/* Header & Search Control Strip */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span>Repositori Resmi TKA</span>
              <span aria-hidden="true">·</span>
              <span>400 Butir Soal Terbuka</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Eksplorasi Seluruh Bank Soal TKA SMK TJKT
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Telusuri pertanyaan, opsi jawaban, kunci resmi, serta pembahasan terperinci dari 8 modul mingguan
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                if (onBack) {
                  onBack();
                } else {
                  window.history.back();
                }
              }}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              title="Kembali ke halaman sebelumnya"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali</span>
            </button>

            {selectedWeek !== 0 && (
              <button
                onClick={() => onStartExam(selectedWeek, 'exam')}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Mulai Ujian Modul {selectedWeek}</span>
              </button>
            )}
          </div>
        </div>

        {/* Search Bar Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kata kunci materi (contoh: OTDR, VLAN, Splice, LOTO, WPA3, NAT, Subnet, 5G, APAR)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Filter Toolbar: Week Selector, Type Selector, Bookmarks toggle */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-medium text-slate-400 mr-1">Filter Modul:</span>
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => {
                setSelectedWeek(0);
                if (onSelectWeek) onSelectWeek(0);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedWeek === 0
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              Semua (400)
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedWeek(cat.id);
                  if (onSelectWeek) onSelectWeek(cat.id);
                }}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedWeek === cat.id
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                M{cat.id}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2 pt-2 sm:pt-0">
            {/* Type selector */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="all">Semua Tipe Soal</option>
              <option value="PG">Pilihan Ganda (PG)</option>
              <option value="PGK_KATEGORI">PGK Kategori (B/S)</option>
              <option value="PGK_MCMA">PGK MCMA (Centang)</option>
            </select>

            {/* Bookmark filter toggle */}
            <button
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                showBookmarksOnly
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300'
                  : 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'fill-current' : ''}`} />
              <span>Tersimpan ({bookmarkedIds.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Header Count & Expand/Collapse All */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Menampilkan <strong className="text-slate-900 dark:text-white tabular-nums">{filteredQuestions.length}</strong> soal ditemukan</span>
        <div className="flex items-center gap-3">
          <button
            onClick={expandAll}
            className="hover:text-blue-600 cursor-pointer font-medium"
          >
            Buka Semua Pembahasan
          </button>
          <span aria-hidden="true">·</span>
          <button
            onClick={collapseAll}
            className="hover:text-blue-600 cursor-pointer font-medium"
          >
            Tutup Semua
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Tidak ada soal yang cocok dengan filter atau kata kunci pencarian.
            </p>
            <p className="text-xs text-slate-400">
              Coba ganti filter modul atau reset kata kunci pencarian.
            </p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedIds[q.id];
            const isSaved = bookmarkedIds.includes(q.id);
            const diagramId = getQuestionDiagramId(q);

            return (
              <div
                key={q.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                {/* Question Info Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        Minggu {q.week}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        Soal No. {q.number}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-500">
                        {q.type === 'PG' ? 'Pilihan Ganda' : q.type === 'PGK_KATEGORI' ? 'PGK Kategori (B/S)' : 'PGK MCMA'}
                      </span>
                      {diagramId && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
                            <ImageIcon className="w-3 h-3" />
                            <span>Diagram Soal (Bebas Lisensi)</span>
                          </span>
                        </>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      <span>{q.subKompetensi}</span>
                    </div>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => onToggleBookmark(q.id)}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      isSaved
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 border-amber-300 dark:border-amber-700'
                        : 'text-slate-400 hover:text-slate-700 border-slate-200 dark:border-slate-700'
                    }`}
                    title="Simpan ke Bookmark"
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Kasus Prompt */}
                <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white leading-relaxed whitespace-pre-line">
                  {q.kasus}
                </p>

                {/* Question Details: Options preview */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-2 text-xs border border-slate-100 dark:border-slate-800">
                  {q.type === 'PG' && q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, idx) => {
                        const letter = String.fromCharCode(65 + idx);
                        const isCorrectOpt = q.correctOptionIndex === idx;

                        return (
                          <div
                            key={idx}
                            className={`p-2 rounded-lg flex items-center gap-2 ${
                              isCorrectOpt && isExpanded
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700'
                                : 'text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <span className="font-bold text-slate-500 w-5">{letter}.</span>
                            <span>{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {q.type === 'PGK_KATEGORI' && q.statements && (
                    <div className="space-y-1.5">
                      {q.statements.map((stmt) => (
                        <div key={stmt.id} className="flex items-center justify-between py-1 border-b border-slate-200/50 dark:border-slate-700/50 last:border-0">
                          <span className="text-slate-700 dark:text-slate-300 pr-2">
                            <strong>{stmt.id}.</strong> {stmt.text}
                          </span>
                          {isExpanded && (
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                              stmt.answer === 'Benar' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {stmt.answer}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {q.type === 'PGK_MCMA' && q.mcmaOptions && (
                    <div className="space-y-1">
                      {q.mcmaOptions.map((opt, idx) => {
                        const isKey = (q.correctMcmaIndices || [0, 1, 2]).includes(idx);
                        return (
                          <div
                            key={idx}
                            className={`p-1.5 rounded flex items-center gap-2 ${
                              isKey && isExpanded
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-medium'
                                : 'text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <span className="font-semibold text-slate-400">[{idx + 1}]</span>
                            <span>{opt}</span>
                            {isKey && isExpanded && (
                              <span className="ml-auto text-[11px] font-bold text-emerald-600">
                                Kunci Benar
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Explanation Expand Toggle */}
                <div className="pt-1 flex items-center justify-between">
                  <button
                    onClick={() => toggleExpand(q.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Sembunyikan Pembahasan' : 'Lihat Kunci & Pembahasan Lengkap'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => onStartExam(q.week, 'exam')}
                    className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    <span>Ujian Modul {q.week}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Expanded Pedagogical Explanation & Technical Diagram */}
                {isExpanded && (
                  <div className="space-y-3 pt-1">
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

                    <div className="p-4 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-200/70 dark:border-blue-900/60 text-xs sm:text-sm space-y-1.5 animate-fadeIn">
                      <div className="flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-300">
                        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Pembahasan Konseptual & Jawaban Benar:</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {q.pembahasan}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
