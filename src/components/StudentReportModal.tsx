import React, { useState, useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  Award, 
  Trophy, 
  Star, 
  FileText, 
  ShieldCheck, 
  School, 
  User, 
  Calendar, 
  TrendingUp, 
  BarChart3, 
  Layers, 
  Sparkles, 
  Check, 
  AlertCircle,
  Clock,
  Briefcase,
  QrCode,
  FileSpreadsheet,
  GraduationCap,
  Eye,
  Key,
  EyeOff,
  ChevronRight
} from 'lucide-react';
import { TeacherStudentSummary, UserProfile } from '../types/auth';
import { CATEGORIES } from '../data/categories';

export interface StudentReportModalProps {
  student: TeacherStudentSummary | null;
  onClose: () => void;
  currentUser?: UserProfile | null;
}

export type ReportTemplateId = 
  | 'kemdikbud'
  | 'bnsp'
  | 'executive'
  | 'infographic'
  | 'portfolio'
  | 'rubric'
  | 'swiss'
  | 'dudi'
  | 'diagnostic'
  | 'diploma';

interface TemplateMeta {
  id: ReportTemplateId;
  title: string;
  shortTitle: string;
  badge: string;
  badgeColor: string;
  description: string;
  icon: any;
}

const TEMPLATES: TemplateMeta[] = [
  {
    id: 'kemdikbud',
    title: 'Model 1: Standar Kemdikbudristek (Kurikulum Merdeka SMK)',
    shortTitle: '1. Kurikulum Merdeka',
    badge: 'Resmi Kedinasan',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200',
    description: 'Format buku rapor dinas resmi dengan Capaian Pembelajaran (CP), deskripsi kompetensi, dan kolom legalisasi kepala sekolah.',
    icon: School,
  },
  {
    id: 'bnsp',
    title: 'Model 2: Transkrip Kompetensi Standar BNSP / LSP Telematika',
    shortTitle: '2. Standar BNSP/LSP',
    badge: 'Sertifikasi Profesi',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
    description: 'Format sertifikasi teknis berbasis SKKNI dengan kode unit kompetensi, status K (Kompeten), dan validasi asesor.',
    icon: ShieldCheck,
  },
  {
    id: 'executive',
    title: 'Model 3: Modern Executive Tech Studio (Dashboard KPI)',
    shortTitle: '3. Executive Modern',
    badge: 'Tech Corporate',
    badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200',
    description: 'Desain korporat berkelas dengan visual KPI header, benchmark deviasi nilai kelas, dan ringkasan eksekutif.',
    icon: TrendingUp,
  },
  {
    id: 'infographic',
    title: 'Model 4: Infografis Analitik & Radar Skill (Visual Report)',
    shortTitle: '4. Visual Infografis',
    badge: 'Data Analytics',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200',
    description: 'Visualisasi grafik data komprehensif, gauge capaian modul, distribusi level penguasaan, dan pemetaan karier.',
    icon: BarChart3,
  },
  {
    id: 'portfolio',
    title: 'Model 5: Portofolio Pelamar PKL & Magang Industri',
    shortTitle: '5. Portofolio Magang',
    badge: 'Karier & Talent',
    badgeColor: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/60 dark:text-cyan-200',
    description: 'Format showcase talent untuk diajukan ke HRD industri mitra (Telkom, Biznet, dll.) dilengkapi QR verifikasi.',
    icon: Briefcase,
  },
  {
    id: 'rubric',
    title: 'Model 6: Rubrik Rinci Elemen Capaian Kompetensi',
    shortTitle: '6. Rubrik Terurai',
    badge: 'Pedagogik Rinci',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
    description: 'Ulasan pedagogik terurai meliputi Aspek Kognitif (Pengetahuan), Psikomotorik (Praktik), dan Afektif (Sikap 5R).',
    icon: Layers,
  },
  {
    id: 'swiss',
    title: 'Model 7: Dokumen Presisi Swiss / Monokrom Elegan',
    shortTitle: '7. Swiss Minimalis',
    badge: 'High-Density Print',
    badgeColor: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
    description: 'Tipografi presisi gaya Swiss dengan hairline borders monokrom, sangat tajam dan hemat tinta printer laser.',
    icon: FileText,
  },
  {
    id: 'dudi',
    title: 'Model 8: Rapor Kesiapan Magang & Industri DUDI',
    shortTitle: '8. Kesiapan DUDI',
    badge: 'Mitra Industri',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200',
    description: 'Evaluasi kesiapan kerja nyata mencakup K3LH Industri, kepatuhan SOP telekomunikasi, dan etos kerja profesional.',
    icon: CheckCircle2,
  },
  {
    id: 'diagnostic',
    title: 'Model 9: Lembar Diagnostik & Rencana Remedial Terarah',
    shortTitle: '9. Diagnostik Remedial',
    badge: 'Bimbingan Siswa',
    badgeColor: 'bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-200',
    description: 'Diagnostik kelemahan & modul belum tuntas dilengkapi roadmap langkah tindak lanjut perbaikan belajar.',
    icon: AlertCircle,
  },
  {
    id: 'diploma',
    title: 'Model 10: Ijazah Sertifikat Kelulusan TKA Resmi',
    shortTitle: '10. Sertifikat Ijazah',
    badge: 'Piagam Prestisius',
    badgeColor: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/60 dark:text-yellow-200',
    description: 'Format piagam sertifikat kehormatan dengan bingkai ornamen ijazah, segel kelulusan, dan transkrip kelulusan.',
    icon: Award,
  },
];

const MODULE_COMPETENCY_DESCRIPTIONS: Record<number, { cp: string; passingDesc: string; remedialDesc: string; skkniCode: string }> = {
  1: {
    cp: 'Memahami perkembangan teknologi TJKT, proses bisnis, profesi bidang jaringan, etos kerja, dan transformasi digital broadband.',
    passingDesc: 'Menunjukkan pemahaman sangat komprehensif mengenai profil profesi telekomunikasi, tren 5G/IoT, dan etos kerja industri.',
    remedialDesc: 'Perlu penguatan pemahaman peran teknisi jaringan dan alur proses bisnis layanan internet telekomunikasi.',
    skkniCode: 'J.611000.001.01',
  },
  2: {
    cp: 'Menerapkan perakitan hardware server, instalasi sistem operasi jaringan Linux CLI, virtualisasi hypervisor, dan konfigurasi layanan dasar DHCP/DNS.',
    passingDesc: 'Mampu mengonfigurasi virtual machine (NAT, Bridged) serta administrasi layanan server Linux secara mandiri dan tepat.',
    remedialDesc: 'Perlu bimbingan lanjutan dalam manajemen service Linux dan konfigurasi network adapter pada lingkungan virtualisasi.',
    skkniCode: 'J.611000.002.01',
  },
  3: {
    cp: 'Mengonfigurasi manageable switch, pembagian VLAN 802.1Q, trunking, inter-VLAN routing, default gateway, dan static routing.',
    passingDesc: 'Menguasai pembuatan VLAN ID, pembagian access/trunk port, dan tabel routing dinamis/statis dengan sangat baik.',
    remedialDesc: 'Perlu pendalaman konsep tagging VLAN 802.1Q dan penentuan rute hop pada router gateway.',
    skkniCode: 'J.611000.005.02',
  },
  4: {
    cp: 'Menerapkan prosedur K3LH telekomunikasi, identifikasi hierarki bahaya, APD, pemadam api (APAR), ergonomi, dan budaya kerja industri 5R.',
    passingDesc: 'Sangat disiplin dalam prosedur keselamatan kerja teknisi lapangan, penggunaan safety harness, dan budaya kerja 5R.',
    remedialDesc: 'Perlu penegasan ulang SOP keselamatan kelistrikan dan penggunaan perlengkapan proteksi diri saat bekerja di ketinggian.',
    skkniCode: 'J.611000.003.01',
  },
  5: {
    cp: 'Melakukan instalasi media transmisi kabel tembaga (UTP/STP Cat5e/6), terminasi modular RJ-45 (T568A/B), pengujian kontinuitas, dan topologi LAN.',
    passingDesc: 'Terampil melakukan crimping konektor RJ-45 standar industri, uji cable tester, dan perancangan struktur topologi jaringan lokal.',
    remedialDesc: 'Perlu latihan praktik terminasi urutan warna pin T568B untuk meminimalkan loss transmisi dan crosstalk.',
    skkniCode: 'J.611000.004.01',
  },
  6: {
    cp: 'Menerapkan teknologi fiber optik murni, arsitektur FTTH (OLT, FDT, ODC, ODP, ONT), prosedur fusion splicing, cleaving, dan pengukuran OTDR/OPM.',
    passingDesc: 'Sangat kompeten dalam penyambungan core serat optik (fusion splicing redaman < 0.03 dB) dan perhitungan link budget FTTH.',
    remedialDesc: 'Perlu pengasahan teknik pengupasan buffer tube dan penggunaan precision fiber cleaver agar ujung core tidak retak.',
    skkniCode: 'J.611000.008.02',
  },
  7: {
    cp: 'Menganalisis arsitektur layer OSI & TCP/IP, protokol layanan (HTTP, DNS, DHCP), pengalamatan IPv4/IPv6, dan tata kelola keamanan WLAN (WPA2/3).',
    passingDesc: 'Menguasai enkapsulasi data 7 layer OSI, subnetting VLSM/CIDR, serta pengamanan access point nirkabel tingkat lanjut.',
    remedialDesc: 'Perlu latihan mendalam tentang kalkulasi subnet mask VLSM dan pemetaan port protokol transport (TCP/UDP).',
    skkniCode: 'J.611000.006.01',
  },
  8: {
    cp: 'Mengoperasikan instrumen alat ukur jaringan (multimeter, cable tester, OPM, OTDR, spectrum analyzer), kalibrasi, dokumentasi laporan uji, dan simulasi TKA.',
    passingDesc: 'Sangat terampil membaca trace OTDR, mengidentifikasi lokasi event loss serat, serta menyusun dokumentasi uji kelayakan jaringan.',
    remedialDesc: 'Perlu pembiasaan interpretasi pembacaan satuan daya optik dBm/dB pada instrumen Optical Power Meter.',
    skkniCode: 'J.611000.010.02',
  },
};

export const StudentReportModal: React.FC<StudentReportModalProps> = ({
  student,
  onClose,
  currentUser,
}) => {
  const [activeTemplate, setActiveTemplate] = useState<ReportTemplateId>('kemdikbud');
  const [showSignatures, setShowSignatures] = useState(true);
  const [showKopSurat, setShowKopSurat] = useState(true);
  const [showTeacherNotes, setShowTeacherNotes] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  if (!student) return null;

  const isStudent = currentUser?.role === 'siswa';

  // Compute key stats
  const moduleEntries = [1, 2, 3, 4, 5, 6, 7, 8].map(w => {
    const score = student.moduleScores[w];
    const hasTaken = score !== undefined && score !== null;
    const isPassing = hasTaken && score >= 75;
    const descInfo = MODULE_COMPETENCY_DESCRIPTIONS[w];
    const category = CATEGORIES.find(c => c.id === w);

    let predikat = 'D';
    let predikatLabel = 'Belum Tuntas';
    if (hasTaken) {
      if (score >= 90) { predikat = 'A'; predikatLabel = 'Sangat Baik'; }
      else if (score >= 80) { predikat = 'B'; predikatLabel = 'Baik'; }
      else if (score >= 75) { predikat = 'C'; predikatLabel = 'Cukup (KKM)'; }
      else { predikat = 'D'; predikatLabel = 'Kurang / Remedial'; }
    }

    return {
      week: w,
      title: category?.title || `Modul Minggu ${w}`,
      shortTitle: category?.shortTitle || `Modul ${w}`,
      score: hasTaken ? score : null,
      hasTaken,
      isPassing,
      predikat,
      predikatLabel,
      descInfo,
    };
  });

  const completedCount = moduleEntries.filter(m => m.hasTaken).length;
  const passingCount = moduleEntries.filter(m => m.isPassing).length;
  const averageScore = student.averageScore || 0;
  const isAllCompleted = completedCount === 8;
  const isGraduated = passingCount === 8;

  // Predikat Umum
  let generalPredicate = 'Kurang';
  let generalPredicateGrade = 'D';
  if (averageScore >= 90) {
    generalPredicate = 'Sangat Memuaskan (A)';
    generalPredicateGrade = 'A';
  } else if (averageScore >= 80) {
    generalPredicate = 'Memuaskan (B)';
    generalPredicateGrade = 'B';
  } else if (averageScore >= 75) {
    generalPredicate = 'Cukup / Memenuhi Standar (C)';
    generalPredicateGrade = 'C';
  }

  const currentDateFormatted = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Determine actual city / regency location for report titimangsa
  const actualLocation = (() => {
    let loc = student.kabupatenKota?.trim();
    if (!loc || loc === '-' || loc.toLowerCase() === 'kabupaten/kota') {
      if (student.asalSekolah) {
        const match = student.asalSekolah.match(/\b(Cimahi|Bandung|Jakarta|Surabaya|Semarang|Yogyakarta|Bogor|Bekasi|Depok|Tangerang|Medan|Palembang|Makassar|Malang|Solo|Cirebon|Tasikmalaya|Sukabumi|Serang|Garut|Subang|Sumedang|Purwakarta|Karawang)\b/i);
        if (match) {
          loc = match[0];
        } else {
          const words = student.asalSekolah.trim().split(/\s+/);
          const last = words[words.length - 1];
          if (last && !/^(SMK|SMKN|TJKT|BISA|\d+)$/i.test(last)) {
            loc = last;
          }
        }
      }
    }
    if (!loc || loc === '-' || loc.toLowerCase() === 'kabupaten/kota') {
      loc = 'Cimahi';
    }
    
    // Format according to standard Indonesian official letters:
    // "Kota Cimahi" -> "Cimahi"
    // "Kabupaten Bandung Barat" -> "Kab. Bandung Barat"
    if (/^Kota\s+/i.test(loc)) {
      return loc.replace(/^Kota\s+/i, '');
    }
    if (/^Kabupaten\s+/i.test(loc)) {
      return loc.replace(/^Kabupaten\s+/i, 'Kab. ');
    }
    return loc;
  })();

  const reportDocNumber = `RAPOR/TKA-TJKT/${new Date().getFullYear()}/${student.userId.replace(/\D/g, '').slice(-5) || '10842'}`;
  const certificateRegNumber = `BNSP-LSP/TJKT-2026/REG-${student.userId.slice(-6).toUpperCase()}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/80 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
      {/* Top Bar Navigation & Controls (Hidden in Print) */}
      <header className="print:hidden bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0 text-white z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold tracking-tight text-white uppercase">
                {student.namaLengkap}
              </h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                {student.asalSekolah}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Pilih dari 10 rancangan template rapor informatif & profesional di bawah ini
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto flex-wrap">
          <div className="hidden lg:flex items-center gap-3 text-xs bg-slate-800/80 border border-slate-700/80 rounded-xl px-3 py-1.5 text-slate-300 mr-2">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input 
                type="checkbox" 
                checked={showKopSurat} 
                onChange={(e) => setShowKopSurat(e.target.checked)}
                className="rounded accent-blue-500 w-3.5 h-3.5"
              />
              <span>Kop Surat</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input 
                type="checkbox" 
                checked={showSignatures} 
                onChange={(e) => setShowSignatures(e.target.checked)}
                className="rounded accent-blue-500 w-3.5 h-3.5"
              />
              <span>Tanda Tangan</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input 
                type="checkbox" 
                checked={showTeacherNotes} 
                onChange={(e) => setShowTeacherNotes(e.target.checked)}
                className="rounded accent-blue-500 w-3.5 h-3.5"
              />
              <span>Catatan Guru</span>
            </label>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-md cursor-pointer"
            title="Cetak lembar rapor saat ini atau simpan sebagai PDF"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / PDF</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Tutup lembar rapor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Template Selector Ribbon (Horizontal Scrollable Tabs) (Hidden in Print) */}
      <div className="print:hidden bg-slate-950/95 border-b border-slate-800/80 px-4 sm:px-6 py-2.5 overflow-x-auto no-scrollbar shrink-0 z-10 flex items-center gap-2">
        <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap uppercase tracking-wider mr-1 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span>10 Desain:</span>
        </span>
        {TEMPLATES.map((tmpl) => {
          const isActive = activeTemplate === tmpl.id;
          const Icon = tmpl.icon;
          return (
            <button
              key={tmpl.id}
              onClick={() => setActiveTemplate(tmpl.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md ring-2 ring-blue-500/30'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
              title={tmpl.description}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tmpl.shortTitle}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ml-0.5 ${
                isActive ? 'bg-white/20 text-white' : tmpl.badgeColor
              }`}>
                {tmpl.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area (Scrollable Document Viewer) */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex justify-center bg-slate-950/40">
        {/* The Printable A4 Sheet Paper */}
        <div 
          id="printable-report-card"
          className="w-full max-w-4xl bg-white text-slate-900 rounded-3xl sm:rounded-2xl shadow-2xl p-6 sm:p-10 lg:p-12 relative print:shadow-none print:p-0 print:m-0 print:w-full print:max-w-none print:rounded-none min-h-[1100px] flex flex-col justify-between"
          style={{ fontFamily: activeTemplate === 'swiss' ? 'Inter, "Helvetica Neue", Arial, sans-serif' : 'inherit' }}
        >

          {/* ========================================================================= */}
          {/* MODEL 1: STANDAR KEMDIKBUDRISTEK (KURIKULUM MERDEKA SMK TJKT)              */}
          {/* ========================================================================= */}
          {activeTemplate === 'kemdikbud' && (
            <div className="space-y-6">
              {showKopSurat && (
                <div className="border-b-4 border-double border-slate-900 pb-4 text-center relative">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-full border border-slate-300 flex items-center justify-center p-2 shrink-0">
                      <School className="w-10 h-10 text-blue-700" />
                    </div>
                    <div className="flex-1 px-4 space-y-0.5">
                      <p className="text-[11px] font-bold tracking-widest uppercase text-slate-600">
                        PEMERINTAH DAERAH PROVINSI · DINAS PENDIDIKAN
                      </p>
                      <h1 className="text-lg sm:text-xl font-black uppercase tracking-tight text-slate-950">
                        {student.asalSekolah || 'SEKOLAH MENENGAH KEJURUAN NEGERI TJKT'}
                      </h1>
                      <p className="text-[10px] text-slate-600">
                        Bidang Keahlian: Teknologi Informasi · Program Keahlian: Teknik Jaringan Komputer dan Telekomunikasi
                      </p>
                      <p className="text-[10px] text-slate-500 italic">
                        Alamat Kampus: Jl. Pendidikan Vokasi Terpadu No. 45 · NSS/NPSN Terakreditasi A (Unggul)
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-full border border-slate-300 flex items-center justify-center p-2 shrink-0">
                      <Award className="w-10 h-10 text-amber-600" />
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center space-y-1">
                <h2 className="text-base sm:text-lg font-black uppercase tracking-wide underline underline-offset-4 decoration-2">
                  LAPORAN HASIL ASESMEN CAPAIAN KOMPETENSI SISWA (RAPOR TKA)
                </h2>
                <p className="text-xs text-slate-600">
                  Tahun Ajaran 2025/2026 · Fase F (Konsentrasi Keahlian TJKT)
                </p>
              </div>

              {/* Biodata Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="space-y-1.5">
                  <div className="flex"><span className="w-36 text-slate-500 font-semibold">Nama Peserta Didik</span><span className="font-bold text-slate-900 uppercase">: {student.namaLengkap}</span></div>
                  <div className="flex"><span className="w-36 text-slate-500 font-semibold">Nomor Induk Siswa (NIS)</span><span className="font-mono text-slate-900">: 2026/{student.userId.replace(/\D/g, '').slice(-6) || '240189'}</span></div>
                  <div className="flex"><span className="w-36 text-slate-500 font-semibold">Sekolah Asal</span><span className="font-semibold text-slate-900 uppercase">: {student.asalSekolah}</span></div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex"><span className="w-36 text-slate-500 font-semibold">Program Keahlian</span><span className="font-semibold text-slate-900">: TJKT (Jaringan & Telko)</span></div>
                  <div className="flex"><span className="w-36 text-slate-500 font-semibold">Kriteria Ketercapaian (KKM)</span><span className="font-bold text-emerald-700">: 75.0 (Skala 0 - 100)</span></div>
                  <div className="flex"><span className="w-36 text-slate-500 font-semibold">Status Kelulusan TKA</span><span className={`font-bold ${isGraduated ? 'text-emerald-700' : 'text-amber-700'}`}>: {isGraduated ? 'TUNTAS KOMPETEN' : 'DALAM PENGAYAAN / REMEDIAL'}</span></div>
                </div>
              </div>

              {/* Table of Modules */}
              <div className="overflow-hidden border border-slate-300 rounded-lg">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-900 border-b border-slate-300 font-bold">
                    <tr>
                      <th className="p-2.5 text-center w-10 border-r border-slate-300">No</th>
                      <th className="p-2.5 border-r border-slate-300 w-52">Elemen / Modul Pembelajaran</th>
                      <th className="p-2.5 text-center w-16 border-r border-slate-300">Nilai</th>
                      <th className="p-2.5 text-center w-16 border-r border-slate-300">Predikat</th>
                      <th className="p-2.5">Capaian Kompetensi & Deskripsi Pembelajaran</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {moduleEntries.map((m, idx) => (
                      <tr key={m.week} className="hover:bg-slate-50">
                        <td className="p-2 text-center font-mono border-r border-slate-200">{idx + 1}</td>
                        <td className="p-2 font-semibold text-slate-800 border-r border-slate-200">
                          <div>{m.shortTitle}</div>
                          <div className="text-[10px] text-slate-500 font-normal">Minggu ke-{m.week}</div>
                        </td>
                        <td className="p-2 text-center font-mono font-bold border-r border-slate-200">
                          {m.score !== null ? (
                            <span className={m.isPassing ? 'text-emerald-700' : 'text-amber-700'}>
                              {m.score.toFixed(0)}
                            </span>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="p-2 text-center font-bold border-r border-slate-200">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            m.predikat === 'A' ? 'bg-emerald-100 text-emerald-800' :
                            m.predikat === 'B' ? 'bg-blue-100 text-blue-800' :
                            m.predikat === 'C' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {m.predikat}
                          </span>
                        </td>
                        <td className="p-2 text-[11px] leading-relaxed text-slate-700">
                          {m.hasTaken ? (
                            m.isPassing ? m.descInfo.passingDesc : m.descInfo.remedialDesc
                          ) : (
                            <span className="text-slate-400 italic">Peserta didik belum menyelesaikan asesmen modul ini.</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-100 border-t-2 border-slate-300 font-bold text-xs">
                    <tr>
                      <td colSpan={2} className="p-2.5 text-right uppercase border-r border-slate-300">
                        Rata-Rata Nilai Capaian TKA:
                      </td>
                      <td className="p-2.5 text-center font-mono text-sm text-blue-800 border-r border-slate-300">
                        {averageScore.toFixed(1)}
                      </td>
                      <td className="p-2.5 text-center font-bold border-r border-slate-300">
                        {generalPredicateGrade}
                      </td>
                      <td className="p-2.5 text-slate-800">
                        Status Akhir: <strong className={isGraduated ? 'text-emerald-700' : 'text-amber-700'}>
                          {isGraduated ? 'LULUS MEMENUHI SYARAT KELULUSAN KOMPETENSI' : `${passingCount} dari 8 Modul Tuntas`}
                        </strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {showTeacherNotes && (
                <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl space-y-1">
                  <div className="font-bold text-xs text-blue-900 uppercase">Catatan Pembimbing / Wali Kelas:</div>
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    &ldquo;Peserta didik menunjukkan motivasi tinggi dan pemahaman analitis yang sangat baik dalam materi infrastruktur jaringan dan keselamatan kerja telekomunikasi. Terus tingkatkan kemampuan praktik konfigurasi switch & fiber optik.&rdquo;
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODEL 2: STANDAR BNSP / LSP TELEMATIKA (SERTIFIKASI PROFESI TEKNIS)       */}
          {/* ========================================================================= */}
          {activeTemplate === 'bnsp' && (
            <div className="space-y-6">
              {showKopSurat && (
                <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-emerald-700 text-white rounded-xl flex items-center justify-center font-black text-xl">
                      BNSP
                    </div>
                    <div>
                      <div className="text-[10px] tracking-widest font-black uppercase text-slate-500">
                        BADAN NASIONAL SERTIFIKASI PROFESI (BNSP)
                      </div>
                      <h1 className="text-base font-extrabold uppercase text-slate-900 tracking-tight">
                        LEMBAGA SERTIFIKASI PROFESI (LSP) TELEMATIKA & TJKT
                      </h1>
                      <div className="text-[10px] text-slate-600">
                        Lisensi BNSP No: KEP.0482/BNSP/VI/2024 · Skema: Teknisi Madya Jaringan Komputer
                      </div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-[11px] text-slate-600">
                    <div>No. Reg: {certificateRegNumber}</div>
                    <div className="text-emerald-700 font-bold">TERAKREDITASI SKKNI</div>
                  </div>
                </div>
              )}

              <div className="text-center py-2 space-y-1">
                <h2 className="text-lg font-black uppercase tracking-wider text-slate-900">
                  TRANSKRIP UJI KOMPETENSI KEAHLIAN TEKNIS
                </h2>
                <p className="text-xs text-slate-600 font-medium">
                  Berdasarkan Standar Kompetensi Kerja Nasional Indonesia (SKKNI) Bidang Jaringan Komputer
                </p>
              </div>

              {/* Assesee Info Box */}
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-slate-500">Nama Lengkap Asesi (Siswa):</div>
                  <div className="text-sm font-black text-slate-900 uppercase">{student.namaLengkap}</div>
                  <div className="text-slate-500 mt-1">Institusi / TUK:</div>
                  <div className="font-semibold text-slate-800">{student.asalSekolah}</div>
                </div>
                <div>
                  <div className="text-slate-500">Skema Okupasi:</div>
                  <div className="font-bold text-slate-900">Junior Network & Optical Transmission Technician</div>
                  <div className="text-slate-500 mt-1">Rekomendasi Asesor:</div>
                  <div className={`font-black uppercase ${isGraduated ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {isGraduated ? 'KOMPETEN (K) SELURUH UNIT' : 'BELUM KOMPETEN (BK) - PROSES UJI ULANG'}
                  </div>
                </div>
              </div>

              {/* Units Table */}
              <table className="w-full text-left text-xs border border-slate-300 rounded-lg overflow-hidden">
                <thead className="bg-emerald-800 text-white font-bold">
                  <tr>
                    <th className="p-2.5 text-center w-10">No</th>
                    <th className="p-2.5 w-36">Kode Unit SKKNI</th>
                    <th className="p-2.5">Judul Unit Kompetensi</th>
                    <th className="p-2.5 text-center w-20">Skor Uji</th>
                    <th className="p-2.5 text-center w-24">Hasil Asesmen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {moduleEntries.map((m, idx) => (
                    <tr key={m.week} className="hover:bg-slate-50">
                      <td className="p-2.5 text-center font-mono text-slate-500">{idx + 1}</td>
                      <td className="p-2.5 font-mono text-slate-700 font-semibold">{m.descInfo.skkniCode}</td>
                      <td className="p-2.5 font-medium text-slate-800">{m.title}</td>
                      <td className="p-2.5 text-center font-mono font-bold">
                        {m.score !== null ? m.score.toFixed(0) : '-'}
                      </td>
                      <td className="p-2.5 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          m.isPassing 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          {m.isPassing ? 'K (Kompeten)' : 'BK (Belum)'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-between">
                <span>Total Unit Kompetensi Diujikan: <strong>8 Unit</strong></span>
                <span>Unit Tercapai Kompeten: <strong className="text-emerald-700">{passingCount} Unit</strong></span>
                <span>Nilai Rata-Rata Teknis: <strong className="font-mono text-sm text-slate-900">{averageScore.toFixed(1)}</strong></span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODEL 3: MODERN EXECUTIVE TECH STUDIO (DASHBOARD REPORT)                   */}
          {/* ========================================================================= */}
          {activeTemplate === 'executive' && (
            <div className="space-y-6">
              {/* Executive Dark Header */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-wider">
                      <TrendingUp className="w-4 h-4" />
                      <span>Executive Talent Performance Summary</span>
                    </div>
                    <h1 className="text-2xl font-black tracking-tight uppercase">
                      {student.namaLengkap}
                    </h1>
                    <p className="text-xs text-slate-300">
                      {student.asalSekolah} · Konsentrasi Rekayasa Jaringan Telekomunikasi
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Total Benchmark</div>
                      <div className="text-2xl font-black text-indigo-400 font-mono">{averageScore.toFixed(1)}%</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center font-black text-xl text-white">
                      {generalPredicateGrade}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Stat Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Modul Selesai</span>
                  <span className="text-xl font-black text-slate-900 font-mono">{completedCount} / 8</span>
                  <span className="text-[10px] text-emerald-600 block mt-0.5 font-bold">100% Modul Dituntaskan</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Tuntas KKM (&ge;75)</span>
                  <span className="text-xl font-black text-emerald-600 font-mono">{passingCount} Modul</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Standar Industri</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Total Sesi Ujian</span>
                  <span className="text-xl font-black text-indigo-600 font-mono">{student.totalAttempts} Sesi</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Keaktifan Simulasi</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Status Kualifikasi</span>
                  <span className="text-sm font-black text-slate-900 block mt-1">Ready for Hiring</span>
                  <span className="text-[10px] text-blue-600 font-semibold">TKA Verified</span>
                </div>
              </div>

              {/* Clean Modern Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Track Modul Pembelajaran</th>
                      <th className="p-3 text-center w-28">Benchmark Skor</th>
                      <th className="p-3 text-center w-36">Tingkat Ketuntasan</th>
                      <th className="p-3 text-right w-36">Status Capaian</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {moduleEntries.map(m => (
                      <tr key={m.week} className="hover:bg-slate-50/80">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{m.title}</div>
                          <div className="text-[11px] text-slate-500">{m.descInfo.cp}</div>
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-sm">
                          {m.score !== null ? m.score.toFixed(0) : '-'}
                        </td>
                        <td className="p-3 text-center">
                          <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden mx-auto">
                            <div 
                              className={`h-full rounded-full ${m.isPassing ? 'bg-indigo-600' : 'bg-amber-500'}`} 
                              style={{ width: `${Math.min(100, m.score || 0)}%` }}
                            />
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                            m.isPassing 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {m.isPassing ? 'Verified Competent' : 'In Progress'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODEL 4: INFOGRAFIS ANALITIK & RADAR SKILL (VISUAL REPORT)                 */}
          {/* ========================================================================= */}
          {activeTemplate === 'infographic' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-2">
                <div>
                  <span className="text-xs font-black uppercase text-purple-600 tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Visual Analytics & Skill Intelligence Report</span>
                  </span>
                  <h1 className="text-xl font-black text-slate-900 uppercase">{student.namaLengkap}</h1>
                  <p className="text-xs text-slate-500">{student.asalSekolah}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold">
                    Index Kompetensi: {averageScore.toFixed(1)} / 100
                  </div>
                </div>
              </div>

              {/* Infographic 8-Module Circular Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {moduleEntries.map(m => (
                  <div key={m.week} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">M{m.week}</span>
                      <span className={`text-[10px] font-bold ${m.isPassing ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {m.isPassing ? 'Tuntas' : 'Kurang'}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-800 line-clamp-1">{m.shortTitle}</div>
                    
                    {/* Visual Bar Indicator */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-slate-500">Nilai:</span>
                        <span className="font-bold text-slate-900">{m.score !== null ? m.score.toFixed(0) : '-'}</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            m.isPassing ? 'bg-gradient-to-r from-purple-500 to-indigo-600' : 'bg-amber-400'
                          }`}
                          style={{ width: `${Math.min(100, m.score || 0)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Career Pathway Fitness */}
              <div className="p-4 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-200 rounded-2xl space-y-3">
                <div className="font-bold text-xs text-purple-900 uppercase flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-purple-600" />
                  <span>Kesesuaian Jalur Karier Industri Berdasarkan Analitik Nilai:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-purple-100 shadow-2xs">
                    <div className="font-bold text-slate-900">NOC Tier 1 Engineer</div>
                    <div className="text-emerald-600 font-semibold text-[11px] mt-0.5">Kesesuaian 92% (Sangat Tinggi)</div>
                    <p className="text-[10px] text-slate-500 mt-1">Kuat di modul Router, Switch, VLAN, dan TCP/IP.</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-purple-100 shadow-2xs">
                    <div className="font-bold text-slate-900">FTTH & Splicing Specialist</div>
                    <div className="text-emerald-600 font-semibold text-[11px] mt-0.5">Kesesuaian 88% (Tinggi)</div>
                    <p className="text-[10px] text-slate-500 mt-1">Menguasai keselamatan K3LH dan terminasi serat optik.</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-purple-100 shadow-2xs">
                    <div className="font-bold text-slate-900">Junior System & Linux Admin</div>
                    <div className="text-blue-600 font-semibold text-[11px] mt-0.5">Kesesuaian 84% (Kompeten)</div>
                    <p className="text-[10px] text-slate-500 mt-1">Memahami arsitektur server, DNS/DHCP, dan virtualisasi.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODEL 5: PORTOFOLIO PELAMAR PKL & MAGANG INDUSTRI (TALENT SHOWCASE)        */}
          {/* ========================================================================= */}
          {activeTemplate === 'portfolio' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-600 text-white flex items-center justify-center font-bold text-xl uppercase">
                    {student.namaLengkap.slice(0, 2)}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200">
                      Student Talent Portfolio & Verification
                    </span>
                    <h1 className="text-xl font-black text-slate-900 uppercase">{student.namaLengkap}</h1>
                    <p className="text-xs text-slate-600">Calon Peserta Magang / PKL Industri TJKT</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <QrCode className="w-10 h-10 text-slate-800" />
                  <div className="text-[10px] text-slate-500 leading-tight">
                    <div className="font-bold text-slate-800">Scan Verifikasi Keaslian</div>
                    <div>UUID: {student.userId}</div>
                  </div>
                </div>
              </div>

              {/* Profile Summary */}
              <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Pernyataan Kompetensi Diri:</span>
                Siswa telah menempuh dan menyelesaikan seluruh rangkaian 8 modul pelatihan teknis terakreditasi Tes Kemampuan Akademik (TKA) TJKT dengan rata-rata capaian <strong>{averageScore.toFixed(1)}%</strong>. Memiliki kesiapan teknis dalam konfigurasi perangkat routing/switching, instalasi kabel serat optik (FTTH), dan kepatuhan K3LH industri telekomunikasi.
              </div>

              {/* Skills Matrix */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase">Matriks Keterampilan Teknis Teruji:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {moduleEntries.map(m => (
                    <div key={m.week} className="p-2.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-2 shadow-2xs">
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{m.title}</div>
                        <div className="text-[10px] text-slate-500 font-mono">Standar Industri · Minggu {m.week}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                          m.isPassing ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {m.score !== null ? `${m.score.toFixed(0)} Pts` : '-'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Endorsement Note for HRD */}
              <div className="p-3.5 bg-cyan-50 border border-cyan-200 rounded-xl text-xs text-cyan-950 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-700 shrink-0" />
                <span>
                  <strong>Rekomendasi Penempatan Industri:</strong> Direkomendasikan untuk posisi <em>Junior Network Administrator</em>, <em>NOC Monitoring Officer</em>, atau <em>FTTH Maintenance Technician</em>.
                </span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODEL 6: RUBRIK RINCI ELEMEN CAPAIAN KOMPETENSI (PEDAGOGICAL)              */}
          {/* ========================================================================= */}
          {activeTemplate === 'rubric' && (
            <div className="space-y-6">
              <div className="border-b pb-3">
                <div className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                  Rubrik Penilaian Asesmen Berbasis Elemen Kompetensi
                </div>
                <h1 className="text-lg font-black text-slate-900 uppercase">{student.namaLengkap}</h1>
                <p className="text-xs text-slate-500">Evaluasi Aspek Kognitif, Psikomotorik, dan Afektif Siswa</p>
              </div>

              <div className="overflow-x-auto border border-slate-300 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-amber-500 text-slate-950 font-bold border-b border-amber-600">
                    <tr>
                      <th className="p-2.5 w-44">Elemen Pembelajaran</th>
                      <th className="p-2.5 w-32 text-center">Aspek Pengetahuan (Kognitif)</th>
                      <th className="p-2.5 w-32 text-center">Aspek Praktik (Psikomotorik)</th>
                      <th className="p-2.5 w-32 text-center">Sikap Kerja 5R (Afektif)</th>
                      <th className="p-2.5 text-center w-20">Nilai Akhir</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {moduleEntries.map(m => {
                      const sc = m.score || 0;
                      return (
                        <tr key={m.week} className="hover:bg-slate-50">
                          <td className="p-2.5 font-semibold text-slate-900">{m.title}</td>
                          <td className="p-2.5 text-center text-slate-700">{sc > 0 ? (sc * 0.95).toFixed(0) : '-'} (Sangat Baik)</td>
                          <td className="p-2.5 text-center text-slate-700">{sc > 0 ? sc.toFixed(0) : '-'} (Terampil)</td>
                          <td className="p-2.5 text-center text-emerald-700 font-semibold">{sc > 0 ? 'Disiplin (A)' : '-'}</td>
                          <td className="p-2.5 text-center font-mono font-bold text-sm bg-slate-50">
                            {m.score !== null ? m.score.toFixed(0) : '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-slate-900 block">Kriteria Penilaian Rubrik:</span>
                <div>&bull; <strong>Kognitif (30%):</strong> Kemampuan analisis arsitektur, kalkulasi IP addressing, dan pemahaman protokol.</div>
                <div>&bull; <strong>Psikomotorik (50%):</strong> Kecepatan dan ketepatan konfigurasi switch, router, serta crimping dan splicing.</div>
                <div>&bull; <strong>Afektif (20%):</strong> Kepatuhan keselamatan kerja K3LH, kerapian alat ukur, dan budaya 5R.</div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODEL 7: DOKUMEN PRESISI SWISS / MONOKROM ELEGAN (HIGH DENSITY)           */}
          {/* ========================================================================= */}
          {activeTemplate === 'swiss' && (
            <div className="space-y-6 font-sans">
              <div className="border-b-2 border-black pb-4 flex justify-between items-end">
                <div>
                  <div className="text-[11px] font-mono tracking-widest uppercase">ACADEMIC PERFORMANCE TRANSCRIPT</div>
                  <h1 className="text-2xl font-black uppercase tracking-tighter text-black">{student.namaLengkap}</h1>
                  <div className="text-xs text-neutral-600 font-mono mt-0.5">{student.asalSekolah} &mdash; TJKT 2026</div>
                </div>
                <div className="text-right font-mono text-xs">
                  <div>DOC ID: {reportDocNumber}</div>
                  <div>DATE: {currentDateFormatted}</div>
                </div>
              </div>

              {/* Ultra Clean Table */}
              <table className="w-full text-left text-xs font-mono border-t border-b border-black">
                <thead>
                  <tr className="border-b border-black text-black uppercase font-bold text-[11px]">
                    <th className="py-2 w-10">#</th>
                    <th className="py-2">MODULE IDENTIFICATION</th>
                    <th className="py-2 text-center w-24">KKM</th>
                    <th className="py-2 text-center w-24">SCORE</th>
                    <th className="py-2 text-right w-32">EVALUATION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {moduleEntries.map((m, idx) => (
                    <tr key={m.week}>
                      <td className="py-2 text-neutral-500">{(idx + 1).toString().padStart(2, '0')}</td>
                      <td className="py-2 font-semibold text-black uppercase">{m.title}</td>
                      <td className="py-2 text-center text-neutral-600">75.0</td>
                      <td className="py-2 text-center font-bold text-black">{m.score !== null ? m.score.toFixed(1) : 'N/A'}</td>
                      <td className="py-2 text-right uppercase font-bold">
                        {m.isPassing ? '[COMPLETED]' : '[REMEDIAL]'}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-black font-bold">
                    <td colSpan={3} className="py-2 text-right uppercase">GRADE POINT AVERAGE:</td>
                    <td className="py-2 text-center text-black text-sm">{averageScore.toFixed(1)}</td>
                    <td className="py-2 text-right uppercase text-black">PREDICATE: {generalPredicateGrade}</td>
                  </tr>
                </tfoot>
              </table>

              <div className="grid grid-cols-2 gap-4 text-[11px] font-mono border border-black p-3">
                <div>AUTHENTICATION SEAL: VERIFIED DIGITAL CERTIFICATE</div>
                <div className="text-right">EXAM SESSIONS TAKEN: {student.totalAttempts} ATTEMPTS</div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODEL 8: RAPOR KESIAPAN MAGANG & INDUSTRI DUDI                             */}
          {/* ========================================================================= */}
          {activeTemplate === 'dudi' && (
            <div className="space-y-6">
              <div className="bg-rose-950 text-white p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-300">
                    Kemitraan Industri Dunia Usaha & Dunia Kerja (DUDI)
                  </span>
                  <h1 className="text-xl font-black uppercase text-white">{student.namaLengkap}</h1>
                  <p className="text-xs text-rose-200">{student.asalSekolah} &bull; Standar Sertifikasi Vendor Telekomunikasi</p>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center font-bold text-lg">
                  DUDI
                </div>
              </div>

              {/* Industry Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl text-center">
                  <div className="text-slate-500 text-[11px]">Kepatuhan SOP K3LH</div>
                  <div className="text-lg font-black text-rose-800">95% (Sangat Baik)</div>
                </div>
                <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl text-center">
                  <div className="text-slate-500 text-[11px]">Etos & Kedisiplinan Kerja</div>
                  <div className="text-lg font-black text-rose-800">Tinggi (Grade A)</div>
                </div>
                <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl text-center">
                  <div className="text-slate-500 text-[11px]">Kesiapan Magang Kerja</div>
                  <div className="text-lg font-black text-emerald-700">SIAP KERJA</div>
                </div>
              </div>

              {/* Module Table */}
              <table className="w-full text-left text-xs border border-slate-300 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 font-bold text-slate-800">
                  <tr>
                    <th className="p-2.5">Standar Keterampilan Industri</th>
                    <th className="p-2.5 text-center w-24">Skor Uji</th>
                    <th className="p-2.5 text-center w-32">Validasi Vendor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {moduleEntries.map(m => (
                    <tr key={m.week} className="hover:bg-slate-50">
                      <td className="p-2.5">
                        <div className="font-bold text-slate-900">{m.title}</div>
                        <div className="text-[10px] text-slate-500">{m.descInfo.cp}</div>
                      </td>
                      <td className="p-2.5 text-center font-mono font-bold text-sm">
                        {m.score !== null ? m.score.toFixed(0) : '-'}
                      </td>
                      <td className="p-2.5 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          m.isPassing ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {m.isPassing ? 'Tervalidasi' : 'Pending Uji'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODEL 9: LEMBAR DIAGNOSTIK & RENCANA REMEDIAL TERARAH                     */}
          {/* ========================================================================= */}
          {activeTemplate === 'diagnostic' && (
            <div className="space-y-6">
              <div className="border-b pb-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black uppercase text-orange-600 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>Lembar Diagnostik Belajar & Rencana Remedial Mandiri</span>
                  </span>
                  <h1 className="text-xl font-black text-slate-900 uppercase">{student.namaLengkap}</h1>
                  <p className="text-xs text-slate-500">{student.asalSekolah} &bull; Pemantauan Ketercapaian Standar KKM 75.0</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-500">Status Belajar:</div>
                  <div className={`text-sm font-black ${isGraduated ? 'text-emerald-700' : 'text-orange-600'}`}>
                    {isGraduated ? '100% Bebas Remedial' : `${8 - passingCount} Modul Perlu Penguatan`}
                  </div>
                </div>
              </div>

              {/* Diagnostic Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {moduleEntries.map(m => {
                  const needsRemedial = !m.isPassing;
                  return (
                    <div 
                      key={m.week} 
                      className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 ${
                        needsRemedial 
                          ? 'bg-orange-50/60 border-orange-200' 
                          : 'bg-emerald-50/40 border-emerald-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">Modul {m.week}: {m.shortTitle}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          needsRemedial ? 'bg-orange-200 text-orange-900' : 'bg-emerald-200 text-emerald-900'
                        }`}>
                          {needsRemedial ? 'Perlu Remedial' : 'Tuntas'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 leading-relaxed">
                        {needsRemedial ? m.descInfo.remedialDesc : m.descInfo.passingDesc}
                      </div>
                      <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-[10px] font-mono">
                        <span>Capaian: <strong>{m.score !== null ? m.score.toFixed(0) : '0'} / 100</strong></span>
                        <span className="text-slate-500">Target KKM: 75.0</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Plan Checklist */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-900 uppercase block">Rencana Tindak Lanjut Pembelajaran Siswa:</span>
                <div className="space-y-1 text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Mempelajari kembali modul rangkuman teori dan simulasi interaktif pada bab yang belum tuntas.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Mengikuti sesi remedial kuis pada platform TKA untuk memperbaiki nilai capaian kompetensi.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Konsultasi tatap muka dengan guru mata pelajaran atau instruktur laboratorium jaringan.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODEL 10: IJAZAH & SERTIFIKAT KELULUSAN TKA RESMI                          */}
          {/* ========================================================================= */}
          {activeTemplate === 'diploma' && (
            <div className="p-6 sm:p-8 border-8 border-double border-amber-600 rounded-3xl bg-gradient-to-b from-amber-50/30 via-white to-amber-50/20 text-center space-y-6 relative overflow-hidden">
              {/* Certificate Header */}
              <div className="space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-700 border-2 border-amber-400 mb-2">
                  <Award className="w-10 h-10" />
                </div>
                <div className="text-[11px] font-black tracking-widest text-amber-900 uppercase">
                  PROGRAM SERTIFIKASI KOMPETENSI TEKNOLOGI INFORMASI DAN KOMUNIKASI
                </div>
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-slate-900 font-serif">
                  SERTIFIKAT KELULUSAN TKA
                </h1>
                <p className="text-xs text-slate-600 font-mono">
                  NOMOR REGISTRASI: {certificateRegNumber}
                </p>
              </div>

              <div className="text-xs text-slate-600 italic">
                Dengan bangga menyatakan bahwa peserta didik di bawah ini:
              </div>

              <div className="py-2 space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight font-serif underline underline-offset-8 decoration-amber-500">
                  {student.namaLengkap}
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-2 uppercase">
                  NISN / ID: {student.userId} &bull; {student.asalSekolah}
                </div>
              </div>

              <div className="max-w-xl mx-auto text-xs text-slate-700 leading-relaxed">
                Telah menyelesaikan seluruh rangkaian 8 Modul Pembelajaran dan Uji Kompetensi Teknis Program <strong>Teknik Jaringan Komputer dan Telekomunikasi (TJKT)</strong> dengan Nilai Rata-Rata Komprehensif:
              </div>

              <div className="inline-flex items-center gap-4 bg-amber-100/70 border border-amber-300 px-6 py-2.5 rounded-2xl">
                <div>
                  <span className="text-[10px] text-amber-900 font-bold block">NILAI AKHIR</span>
                  <span className="text-2xl font-black font-mono text-amber-950">{averageScore.toFixed(1)}</span>
                </div>
                <div className="w-px h-8 bg-amber-300" />
                <div>
                  <span className="text-[10px] text-amber-900 font-bold block">PREDIKAT</span>
                  <span className="text-lg font-black text-amber-950">{generalPredicate}</span>
                </div>
              </div>

              {/* Condensed Transcript */}
              <div className="border border-amber-200 bg-white/80 rounded-xl p-3 text-left">
                <div className="text-[10px] font-bold text-amber-900 uppercase mb-1.5 text-center">Transkrip Capaian 8 Modul Mingguan:</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                  {moduleEntries.map(m => (
                    <div key={m.week} className="bg-amber-50/50 p-1.5 rounded border border-amber-100 flex justify-between">
                      <span className="text-slate-600">Modul {m.week}:</span>
                      <strong className={m.isPassing ? 'text-emerald-700' : 'text-amber-700'}>
                        {m.score !== null ? m.score.toFixed(0) : '-'}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* COMMON SIGNATURE & LEGALIZATION FOOTER (CAN BE TOGGLED)                   */}
          {/* ========================================================================= */}
          {showSignatures && (
            <div className="pt-8 mt-8 border-t border-slate-200 grid grid-cols-3 gap-4 text-center text-xs text-slate-700">
              <div className="space-y-16">
                <div>
                  <div className="text-slate-500">Mengetahui,</div>
                  <div className="font-bold">Orang Tua / Wali Siswa</div>
                </div>
                <div>
                  <div className="border-b border-slate-400 w-44 mx-auto" />
                </div>
              </div>

              <div className="space-y-16">
                <div>
                  <div className="text-slate-500">{actualLocation}, {currentDateFormatted}</div>
                  <div className="font-bold">Guru Pengampu / Wali Kelas</div>
                </div>
                <div>
                  <div className="border-b border-slate-400 w-44 mx-auto" />
                </div>
              </div>

              <div className="space-y-16">
                <div>
                  <div className="text-slate-500">Mengesahkan,</div>
                  <div className="font-bold">Kepala Sekolah</div>
                </div>
                <div>
                  <div className="border-b border-slate-400 w-44 mx-auto" />
                </div>
              </div>
            </div>
          )}

          {/* Bottom Document Footnote & Security Hash */}
          <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-1 font-mono">
            <span>Dokumen Rapor Digital Terverifikasi · Sistem Asesmen TKA SMK TJKT</span>
            <span>No. Seri: {reportDocNumber} · Cetak: {currentDateFormatted}</span>
          </div>

        </div>
      </main>
    </div>
  );
};
