import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  HelpCircle, 
  Layers, 
  BookOpen, 
  FileText, 
  Eye, 
  ChevronRight, 
  Sparkles, 
  X,
  PieChart,
  Target
} from 'lucide-react';
import { 
  computeItemAnalysis, 
  ItemAnalysisResult, 
  ItemAnalysisSummary 
} from '../utils/itemAnalysis';
import { renderTechnicalDiagram, getQuestionDiagramId } from './NetworkIllustrations';
import { getQuestionById } from '../data/questions';

interface ItemAnalysisViewProps {
  sessionAnswersList?: Array<Record<string, any>>;
  onBackToDashboard?: () => void;
}

export const ItemAnalysisView: React.FC<ItemAnalysisViewProps> = ({
  sessionAnswersList = [],
  onBackToDashboard,
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(0); // 0 = All 400 questions
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<ItemAnalysisResult | null>(null);

  // Compute Item Analysis metrics
  const analysisData: ItemAnalysisSummary = useMemo(() => {
    return computeItemAnalysis(selectedWeek || undefined, sessionAnswersList);
  }, [selectedWeek, sessionAnswersList]);

  // Filter items based on user selection
  const filteredItems = useMemo(() => {
    return analysisData.items.filter((item) => {
      // Difficulty Filter
      if (difficultyFilter !== 'all' && item.difficultyCategory.toLowerCase() !== difficultyFilter.toLowerCase()) {
        return false;
      }
      // Status Filter
      if (statusFilter !== 'all' && item.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesNum = item.questionNumber.toString().includes(q) || `soal ${item.questionNumber}`.includes(q);
        const matchesText = item.questionText.toLowerCase().includes(q);
        const matchesKomp = item.kompetensi.toLowerCase().includes(q);
        if (!matchesNum && !matchesText && !matchesKomp) {
          return false;
        }
      }
      return true;
    });
  }, [analysisData.items, difficultyFilter, statusFilter, searchQuery]);

  // Export to CSV
  const handleExportCSV = () => {
    let csv = 'Nomor Soal,Modul Minggu,Kompetensi,Tingkat Kesukaran (P),Kategori Kesukaran,Daya Pembeda (D),Kategori Pembeda,Status,Jumlah Peserta,Menjawab Benar,Rekomendasi\n';

    filteredItems.forEach((item) => {
      const cleanKasus = (item.questionText || '').replace(/"/g, '""').replace(/\n/g, ' ');
      const cleanKomp = (item.kompetensi || '').replace(/"/g, '""');
      const cleanRec = (item.recommendationNote || '').replace(/"/g, '""');

      csv += `${item.questionNumber},Modul ${item.weekId},"${cleanKomp}",${item.difficultyIndex},"${item.difficultyCategory}",${item.discriminationIndex},"${item.discriminationCategory}","${item.status}",${item.totalAttempts},${item.correctAttempts},"${cleanRec}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Analisis_Butir_Soal_TKA_TJKT_Modul${selectedWeek || 'Semua'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header & Breadcrumb */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <BarChart3 className="w-4 h-4" />
              <span>Sistem Analisis Kualitas Asesmen CBT</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Analisis Butir Soal (Item Analysis)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
              Evaluasi validitas, tingkat kesukaran ($P$), daya pembeda ($D$), serta efektivitas pengecoh opsi jawaban untuk seluruh 400 butir soal TKA SMK TJKT.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Ekspor CSV</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Laporan PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary KPI Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Questions Analyzed */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Total Soal Dianalisis
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {analysisData.totalQuestions} <span className="text-xs font-normal text-slate-400">Butir</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {selectedWeek ? `Modul Minggu ${selectedWeek}` : 'Seluruh Modul 1–8'}
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Avg Difficulty Index P */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Indeks Kesukaran ($P$ Avg)
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {analysisData.avgDifficulty}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Kategori Standar (Proporsional)</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Target className="w-6 h-6" />
          </div>
        </div>

        {/* Avg Discrimination Index D */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Daya Pembeda ($D$ Avg)
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {analysisData.avgDiscrimination}
            </div>
            <div className="text-[11px] text-blue-600 dark:text-blue-400 font-bold mt-1">
              Daya Pembeda Baik ($D \ge 0.30$)
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Kelayakan Soal
            </div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-1.5 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">{analysisData.statusBreakdown.diterima} Diterima</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>{analysisData.statusBreakdown.revisi} Revisi</span>
                <span className="w-2 h-2 rounded-full bg-rose-500 ml-1" />
                <span>{analysisData.statusBreakdown.ditolak} Ditolak</span>
              </div>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <PieChart className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Module Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedWeek(0)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedWeek === 0
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Semua Modul (400 Soal)
          </button>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((w) => (
            <button
              key={w}
              onClick={() => setSelectedWeek(w)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedWeek === w
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Modul M{w} (50 Soal)
            </button>
          ))}
        </div>

        {/* Search & Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-2 border-t border-slate-100 dark:border-slate-800">
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nomor soal, teks kasus, atau kompetensi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="sm:col-span-3">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer focus:outline-none"
            >
              <option value="all">Semua Kesukaran (P)</option>
              <option value="mudah">Mudah (P &gt; 0.70)</option>
              <option value="sedang">Sedang (0.30 - 0.70)</option>
              <option value="sukar">Sukar (P &lt; 0.30)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer focus:outline-none"
            >
              <option value="all">Semua Status Kelayakan</option>
              <option value="diterima">Diterima (Standar)</option>
              <option value="revisi">Perlu Revisi</option>
              <option value="ditolak">Ditolak / Ganti</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Analysis Data Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Hasil Analisis Butir Soal ({filteredItems.length} Soal Ditampilkan)</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3.5 px-4 text-center w-16">No</th>
                <th className="py-3.5 px-4 w-28">Modul</th>
                <th className="py-3.5 px-4">Teks Soal &amp; Kompetensi</th>
                <th className="py-3.5 px-4 text-center w-32">Kesukaran ($P$)</th>
                <th className="py-3.5 px-4 text-center w-32">Daya Pembeda ($D$)</th>
                <th className="py-3.5 px-4 text-center w-40">Distribusi Pengecoh</th>
                <th className="py-3.5 px-4 text-center w-32">Status</th>
                <th className="py-3.5 px-4 text-center w-20">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    Tidak ada butir soal yang sesuai dengan kriteria filter.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const fullQ = getQuestionById(item.questionId);
                  const hasDiagram = fullQ ? Boolean(getQuestionDiagramId(fullQ)) : false;

                  return (
                    <tr 
                      key={item.questionId}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Number */}
                      <td className="py-3.5 px-4 text-center font-bold text-slate-900 dark:text-white">
                        {item.questionNumber}
                      </td>

                      {/* Module */}
                      <td className="py-3.5 px-4 font-semibold text-slate-600 dark:text-slate-400">
                        Modul M{item.weekId}
                      </td>

                      {/* Text & Competency */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className="font-semibold text-slate-900 dark:text-white line-clamp-2 max-w-lg">
                            {item.questionText}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono">
                              {item.kompetensi}
                            </span>
                            {hasDiagram && (
                              <span className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded text-[9px] font-bold">
                                Diagram Topologi
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Difficulty P */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="space-y-1">
                          <div className="font-mono font-extrabold text-sm text-slate-900 dark:text-white">
                            {item.difficultyIndex}
                          </div>
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                            item.difficultyCategory === 'Sukar'
                              ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                              : item.difficultyCategory === 'Sedang'
                              ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                              : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                          }`}>
                            {item.difficultyCategory}
                          </span>
                        </div>
                      </td>

                      {/* Discrimination D */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="space-y-1">
                          <div className="font-mono font-extrabold text-sm text-slate-900 dark:text-white">
                            {item.discriminationIndex}
                          </div>
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                            item.discriminationCategory === 'Sangat Baik' || item.discriminationCategory === 'Baik'
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                              : item.discriminationCategory === 'Cukup'
                              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                              : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                          }`}>
                            {item.discriminationCategory}
                          </span>
                        </div>
                      </td>

                      {/* Distractor Breakdown mini chart */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1 max-w-[140px] mx-auto">
                          {item.optionsStats.map((opt) => (
                            <div key={opt.optionIndex} className="flex-1 space-y-1" title={`${opt.label}: ${opt.percentage}% (${opt.count} siswa)`}>
                              <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-sm relative overflow-hidden flex items-end">
                                <div 
                                  className={`w-full rounded-sm transition-all ${
                                    opt.isCorrect 
                                      ? 'bg-emerald-500' 
                                      : 'bg-slate-400 dark:bg-slate-600'
                                  }`}
                                  style={{ height: `${Math.max(8, opt.percentage)}%` }}
                                />
                              </div>
                              <span className={`text-[9px] font-mono font-bold block ${opt.isCorrect ? 'text-emerald-600 dark:text-emerald-400 font-black' : 'text-slate-400'}`}>
                                {opt.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                          item.status === 'Diterima'
                            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                            : item.status === 'Revisi'
                            ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                            : 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                        }`}>
                          {item.status === 'Diterima' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : item.status === 'Revisi' ? (
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          )}
                          <span>{item.status}</span>
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-600 dark:text-blue-400 transition-colors cursor-pointer"
                          title="Lihat Detail Analisis Soal"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Item Analysis Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div 
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 font-mono font-bold text-base">
                  #{selectedItem.questionNumber}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Analisis Butir Soal Nomor {selectedItem.questionNumber}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      Modul M{selectedItem.weekId}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Kompetensi: {selectedItem.kompetensi}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
              {/* Question Text & Diagram */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Naskah Kasus / Soal Ujian:
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                  {selectedItem.questionText}
                </p>

                {/* Technical Diagram if available */}
                {(() => {
                  const fullQ = getQuestionById(selectedItem.questionId);
                  const diagId = fullQ ? getQuestionDiagramId(fullQ) : null;
                  if (!diagId) return null;
                  return (
                    <div className="pt-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">
                        Ilustrasi Topologi &amp; Diagram Soal:
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-center">
                        {renderTechnicalDiagram(diagId)}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Statistical Indicators Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Tingkat Kesukaran ($P$)</div>
                  <div className="text-lg font-black text-slate-900 dark:text-white font-mono">
                    {selectedItem.difficultyIndex}
                  </div>
                  <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                    {selectedItem.difficultyCategory}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Daya Pembeda ($D$)</div>
                  <div className="text-lg font-black text-slate-900 dark:text-white font-mono">
                    {selectedItem.discriminationIndex}
                  </div>
                  <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedItem.discriminationCategory}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1 col-span-2 sm:col-span-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Status Kelayakan</div>
                  <div className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5 mt-1">
                    {selectedItem.status === 'Diterima' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                    )}
                    <span>{selectedItem.status}</span>
                  </div>
                </div>
              </div>

              {/* Option Distractor Breakdown List */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Analisis Pengecoh &amp; Distribusi Pilihan Jawaban:
                </div>

                <div className="space-y-2">
                  {selectedItem.optionsStats.map((opt) => (
                    <div
                      key={opt.optionIndex}
                      className={`p-3 rounded-2xl border transition-all ${
                        opt.isCorrect
                          ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5">
                          <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                            opt.isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}>
                            {opt.label}
                          </span>
                          <span className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                            {opt.text}
                          </span>
                        </div>

                        <div className="text-right shrink-0 font-mono">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {opt.percentage}%
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            ({opt.count} Siswa)
                          </span>
                        </div>
                      </div>

                      {/* Percentage progress bar */}
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            opt.isCorrect ? 'bg-emerald-500' : 'bg-slate-400 dark:bg-slate-500'
                          }`}
                          style={{ width: `${opt.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pedagogical Recommendation Note */}
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Catatan &amp; Rekomendasi Pedagogis:</span>
                </div>
                <p className="leading-relaxed">
                  {selectedItem.recommendationNote}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
