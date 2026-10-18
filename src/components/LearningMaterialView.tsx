import React, { useState, useEffect } from 'react';
import { LEARNING_MODULES, LearningModule } from '../data/learningModules';
import { renderTechnicalDiagram } from './NetworkIllustrations';
import { StudentProfile } from './ProgressStatsView';
import { 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Play, 
  ChevronRight, 
  ChevronLeft, 
  Printer, 
  Search,
  Lightbulb,
  Layers,
  HelpCircle,
  Bookmark,
  ShieldCheck,
  Image as ImageIcon,
  Info,
  ArrowUp,
  ArrowLeft
} from 'lucide-react';

const MODULE_DIAGRAMS: Record<number, { id: string; title: string; desc: string }[]> = {
  1: [
    { id: 'ftth_architecture', title: 'Arsitektur Jaringan FTTH GPON (ODN)', desc: 'Skema transmisi OLT, kabel Feeder, ODC, Distribusi, ODP, Drop Cable, hingga ONT pelanggan.' },
    { id: 'microwave_vsat', title: 'Transmisi Microwave Link LOS & VSAT', desc: 'Garis pandang Line of Sight (LOS) dan kelonggaran zona Fresnel 60% bebas halangan bukit/gedung.' },
  ],
  2: [
    { id: 'hypervisor', title: 'Hypervisor Tipe 1 (Bare-Metal) vs Tipe 2 (Hosted)', desc: 'Perbandingan VMware ESXi/Proxmox langsung di hardware vs VirtualBox di atas OS induk.' },
    { id: 'datacenter_aisle', title: 'Aliran Pendingin Hot Aisle & Cold Aisle Data Center', desc: 'Pemisahan koridor udara dingin masukan (18°C-22°C) dan pembuangan udara panas server.' },
  ],
  3: [
    { id: 'vlan_trunking', title: 'VLAN IEEE 802.1Q & Isolasi Broadcast Domain', desc: 'Pemisahan segmen logis port access dan trunk link antar-switch pembawa tag VLAN.' },
    { id: 'subnetting', title: 'Kalkulasi CIDR Subnetting IPv4 (/24, /25, /26, /27)', desc: 'Pembagian ruang alamat IP, netmask, network ID, broadcast ID, dan usable host.' },
  ],
  4: [
    { id: 'router_on_a_stick', title: 'Router-on-a-Stick Inter-VLAN Routing', desc: 'Perutean antar-VLAN melalui sub-interface virtual fa0/0.10 & fa0/0.20 pada satu kabel trunk fisik.' },
    { id: 'routing_topology', title: 'Topologi Dinamis OSPF Area 0 Backbone & Redundansi', desc: 'Perutean multi-router otomatis dengan konvergensi cepat dan jalur failover cadangan.' },
  ],
  5: [
    { id: 'rj45_wiring', title: 'Standar Susunan Pinout RJ45: T568A vs T568B', desc: 'Urutan 8 warna kabel twisted pair untuk pembuatan kabel straight-through dan crossover.' },
    { id: 'fusion_splicer', title: 'Mekanisme Pemotongan Cleaver 90° & Fusion Splicer', desc: 'Peleburan dua ujung inti serat optik menggunakan busur listrik dengan redaman <0.05 dB.' },
  ],
  6: [
    { id: 'fiber_structure', title: 'Anatomi Serat Optik & Total Internal Reflection', desc: 'Perambatan gelombang cahaya dalam core kaca silika berindeks bias lebih tinggi dari cladding.' },
    { id: 'optical_splitter', title: 'Rasio Passive Splitter PLC & Redaman Teoretis', desc: 'Karakteristik rugi daya insertion loss splitter 1:2 (3.5dB), 1:4 (7.2dB), 1:8 (10.5dB), 1:16 (14dB).' },
  ],
  7: [
    { id: 'osi_tcpip', title: 'Komparasi 7 Layer OSI vs 4 Layer TCP/IP', desc: 'Pemetaan Application, Transport, Network, Data Link, dan Physical beserta PDU dan protokolnya.' },
    { id: 'tcp_handshake', title: 'Alur Sesi TCP 3-Way Handshake (SYN, SYN-ACK, ACK)', desc: 'Mekanisme handshaking handal pembentukan koneksi sebelum data dikirimkan.' },
  ],
  8: [
    { id: 'otdr_trace', title: 'Interpretasi Grafik Jejak Reflektometri OTDR', desc: 'Analisis event loss sambungan splice, dead zone, pantulan konektor mekanik, dan titik patah serat.' },
    { id: 'measuring_tools', title: 'Skema Alat Ukur Jaringan: OTDR, OPM, OLS & LAN Tester', desc: 'Pemetaan instrumen ukur besaran optik, elektrik, dan pemetaan kawat tembaga.' },
  ],
};

interface LearningMaterialViewProps {
  initialWeekId?: number;
  completedModuleWeeks?: number[];
  onStartExam: (weekId: number, mode: 'exam' | 'practice') => void;
  onExploreQuestions: (weekId: number) => void;
  activeStudent?: StudentProfile;
  onToggleModuleCompleted?: (weekId: number) => void;
  onBack?: () => void;
  onSelectWeek?: (weekId: number) => void;
}

export const LearningMaterialView: React.FC<LearningMaterialViewProps> = ({
  initialWeekId = 1,
  completedModuleWeeks,
  onStartExam,
  onExploreQuestions,
  activeStudent,
  onToggleModuleCompleted,
  onBack,
  onSelectWeek,
}) => {
  const [activeWeek, setActiveWeek] = useState<number>(initialWeekId);

  // Sync active week when initialWeekId changes (e.g. from browser back/forward)
  useEffect(() => {
    if (initialWeekId) {
      setActiveWeek(initialWeekId);
    }
  }, [initialWeekId]);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [localCompletedWeeks, setLocalCompletedWeeks] = useState<number[]>(() => {
    if (completedModuleWeeks) return completedModuleWeeks;
    try {
      const raw = localStorage.getItem('tka_completed_module_weeks');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (completedModuleWeeks) {
      setLocalCompletedWeeks(completedModuleWeeks);
    }
  }, [completedModuleWeeks]);

  const isCompleted = completedModuleWeeks
    ? completedModuleWeeks.includes(activeWeek)
    : activeStudent?.completedModuleWeeks
    ? activeStudent.completedModuleWeeks.includes(activeWeek)
    : localCompletedWeeks.includes(activeWeek);

  const toggleComplete = (weekId: number) => {
    if (onToggleModuleCompleted) {
      onToggleModuleCompleted(weekId);
    }
    setLocalCompletedWeeks(prev => {
      const next = prev.includes(weekId) ? prev.filter(w => w !== weekId) : [...prev, weekId];
      try {
        localStorage.setItem('tka_completed_module_weeks', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentMod = LEARNING_MODULES.find(m => m.week === activeWeek) || LEARNING_MODULES[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-20 relative">
      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center group"
          title="Kembali ke Atas"
          aria-label="Kembali ke Atas"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Top Banner & Module Selector */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span>Materi Pembelajaran Mandiri</span>
              <span aria-hidden="true">·</span>
              <span>8 Modul Kejuruan TJKT</span>
              <span aria-hidden="true">·</span>
              <span>Kurikulum Merdeka SMK</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Modul Pembelajaran & Teori TKA SMK
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Pelajari konsep esensial, standar operasional industri telekomunikasi, tabel komparasi teknis, dan glosarium sebelum mengikuti simulasi 400 butir soal.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <button
              onClick={() => {
                if (onBack) {
                  onBack();
                } else {
                  window.history.back();
                }
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              title="Kembali ke halaman sebelumnya"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Materi Ini</span>
            </button>
          </div>
        </div>

        {/* 8 Module Selector Bar */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-400 block mb-2.5">
            Pilih Modul Pembelajaran:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {LEARNING_MODULES.map((mod) => {
              const isActive = mod.week === activeWeek;
              return (
                <button
                  key={mod.id}
                  onClick={() => {
                    setActiveWeek(mod.week);
                    if (onSelectWeek) onSelectWeek(mod.week);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 ring-1 ring-blue-600'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${
                    isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'
                  }`}>
                    Minggu {mod.week}
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                    Modul {mod.week}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Module Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Quick Table of Contents & Action Launcher */}
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
          {/* Module Completion Tracker Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Status Belajar:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1 max-w-[150px]">
                {activeStudent?.name || 'Siswa TKA TJKT'}
              </span>
            </div>
            <button
              onClick={() => toggleComplete(currentMod.week)}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isCompleted
                  ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {isCompleted
                  ? 'Materi Selesai Dipelajari ✓'
                  : 'Tandai Selesai Dipelajari'}
              </span>
            </button>
          </div>

          {/* Table of Contents / Index */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Daftar Sub-Materi:
            </h4>
            <div className="space-y-1.5 text-xs">
              {currentMod.sections.map((sec, idx) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="block p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <span className="font-semibold">{sec.title}</span>
                </a>
              ))}
              <a
                href="#diagram-teknis"
                className="block p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors font-semibold flex items-center justify-between text-blue-600 dark:text-blue-400"
              >
                <span>Diagram Teknis (Bebas Lisensi)</span>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded font-bold">2 Skema</span>
              </a>
              <a
                href="#glosarium"
                className="block p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors font-medium"
              >
                Glosarium Istilah Kunci
              </a>
              <a
                href="#tips-ujian"
                className="block p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors font-medium"
              >
                Tips Khusus Soal TKA
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Full Learning Guide */}
        <div className="lg:col-span-8 space-y-8">
          {/* Module Banner */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-bold text-blue-600 dark:text-blue-400">
                Paket Modul Minggu ke-{currentMod.week}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Estimasi Baca: {currentMod.estimatedReadMinutes} Menit</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">
              {currentMod.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentMod.overview}
            </p>

            {/* Competency Goals */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Target Capaian Pembelajaran Modul:</span>
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pl-1">
                {currentMod.competencies.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Sections */}
          <div className="space-y-6">
            {currentMod.sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4 scroll-mt-24"
              >
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                  {section.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>

                {/* Table Data if available */}
                {section.tableData && (
                  <div className="mt-4 border border-slate-200 dark:border-slate-700/80 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                        <thead className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                          <tr>
                            {section.tableData.headers.map((h, hi) => (
                              <th key={hi} className="py-2.5 px-3.5 whitespace-nowrap">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {section.tableData.rows.map((row, ri) => (
                            <tr key={ri} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                              {row.map((cell, ci) => (
                                <td key={ci} className={`py-2.5 px-3.5 align-top ${ci === 0 ? 'font-semibold text-slate-900 dark:text-white' : ''}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Key Points */}
                {section.keyPoints && section.keyPoints.length > 0 && (
                  <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/20 rounded-xl border border-blue-200/60 dark:border-blue-900/40 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-blue-900 dark:text-blue-300 block">
                      Poin Kunci Konseptual:
                    </span>
                    <ul className="space-y-1 list-disc list-inside">
                      {section.keyPoints.map((kp, kpi) => (
                        <li key={kpi}>{kp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Practical Tip */}
                {section.tips && (
                  <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Catatan Praktis:</strong>
                      <span>{section.tips}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Technical Diagrams & Illustrations Gallery (Non-License) */}
          <div id="diagram-teknis" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>Diagram & Skema Teknis Modul {currentMod.week}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Visualisasi arsitektur, topologi, dan instrumen ukur standar industri TJKT
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Bebas Lisensi / Non-License (Public Domain)</span>
              </span>
            </div>

            <div className="space-y-6">
              {(MODULE_DIAGRAMS[currentMod.week] || []).map((diagram) => (
                <div key={diagram.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                      {diagram.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      Ref: Modul {currentMod.week}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {diagram.desc}
                  </p>
                  <div className="pt-1">
                    {renderTechnicalDiagram(diagram.id)}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span>
                <strong>Kepemilikan & Lisensi Gambar:</strong> Seluruh diagram dan skema teknis di atas dirancang dalam format vektor SVG asli dengan lisensi terbuka / bebas royalti (Public Domain / CC0) tanpa keterikatan hak cipta pihak ketiga, sehingga aman dipakai sepenuhnya untuk kebutuhan edukasi, simulasi ANBK/TKA, serta pembelajaran mandiri.
              </span>
            </div>
          </div>

          {/* Glossary Section */}
          <div id="glosarium" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4 scroll-mt-24">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Glosarium Istilah Penting Industri</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {currentMod.glossary.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    {item.term}
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Tips Section */}
          <div id="tips-ujian" className="bg-blue-50/80 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-900 p-6 sm:p-8 space-y-4 scroll-mt-24">
            <h3 className="text-base sm:text-lg font-bold text-blue-950 dark:text-blue-200 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Tips Taktis Menghadapi Soal TKA Modul {currentMod.week}</span>
            </h3>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {currentMod.examTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-blue-200/60 dark:border-blue-900/60 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-blue-800 dark:text-blue-300 font-medium">
                Paham materinya? Langsung uji kesiapan Anda sekarang!
              </span>

              <button
                onClick={() => onStartExam(currentMod.week, 'exam')}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Mulai Ujian Modul {currentMod.week} (50 Soal)</span>
              </button>
            </div>
          </div>

          {/* Bottom Completion Toggle Banner */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Status Pembelajaran Modul {currentMod.week}
              </h4>
              <p className="text-xs text-slate-500">
                {isCompleted
                  ? 'Anda telah menandai modul ini sebagai selesai dipelajari.'
                  : 'Tandai modul ini sebagai selesai jika Anda sudah memahami seluruh materinya.'}
              </p>
            </div>

            <button
              onClick={() => toggleComplete(currentMod.week)}
              className={`w-full sm:w-auto py-3 px-6 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {isCompleted
                  ? '✓ Materi Selesai Dipelajari (Klik untuk Batal)'
                  : 'Tandai Selesai Dipelajari'}
              </span>
            </button>
          </div>

          {/* Bottom Module Pagination */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                if (currentMod.week > 1) {
                  const prevWeek = currentMod.week - 1;
                  setActiveWeek(prevWeek);
                  if (onSelectWeek) onSelectWeek(prevWeek);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              disabled={currentMod.week === 1}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border text-xs font-medium cursor-pointer ${
                currentMod.week === 1
                  ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Modul Minggu {currentMod.week - 1}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 cursor-pointer bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
              title="Kembali ke Bagian Atas Halaman"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Kembali ke Atas</span>
            </button>

            <button
              onClick={() => {
                if (currentMod.week < 8) {
                  const nextWeek = currentMod.week + 1;
                  setActiveWeek(nextWeek);
                  if (onSelectWeek) onSelectWeek(nextWeek);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              disabled={currentMod.week === 8}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border text-xs font-medium cursor-pointer ${
                currentMod.week === 8
                  ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              <span>Modul Minggu {currentMod.week + 1}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
