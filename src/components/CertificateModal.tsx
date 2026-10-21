import React, { useRef, useState } from 'react';
import { 
  Award, 
  Download, 
  Printer, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  School, 
  Calendar, 
  FileCheck,
  Sparkles,
  Loader2
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UserProfile } from '../types/auth';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  schoolName: string;
  examTitle: string;
  score: number;
  weekId: number;
  sessionId: string;
  completedDate?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
  schoolName,
  examTitle,
  score,
  weekId,
  sessionId,
  completedDate,
}) => {
  const certRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const issueDate = completedDate || new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const certNumber = `SERT/TKA-TJKT/${new Date().getFullYear()}/M${weekId || 1}/${(sessionId || '001').slice(-6).toUpperCase()}`;

  const handleDownloadPDF = async () => {
    if (!certRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2, // High resolution
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      const safeStudentName = (studentName || 'Siswa').replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `Sertifikat_Kelulusan_${safeStudentName}_Modul${weekId || 1}.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error('Gagal mengunduh PDF sertifikat:', err);
      alert('Terjadi kesalahan saat memproses file PDF. Silakan coba lagi.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Sertifikat Kelulusan Digital</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Resmi &amp; Terverifikasi
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Dokumen bukti kelulusan standar kompetensi keahlian TKA TJKT (&ge;75)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 rounded-xl shadow-md transition-all cursor-pointer"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Membuat PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Unduh PDF</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Container */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-200/60 dark:bg-slate-950/80 flex justify-center items-center">
          
          {/* Printable A4 Certificate Canvas */}
          <div 
            ref={certRef}
            id="printable-certificate"
            className="w-[1000px] min-h-[700px] bg-white text-slate-900 p-10 rounded-2xl border-[12px] border-amber-600/90 shadow-2xl relative flex flex-col justify-between overflow-hidden font-sans select-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.03) 0%, rgba(255, 255, 255, 0) 70%)',
            }}
          >
            {/* Decorative Corner Ornaments */}
            <div className="absolute top-3 left-3 w-16 h-16 border-t-4 border-l-4 border-amber-500 pointer-events-none" />
            <div className="absolute top-3 right-3 w-16 h-16 border-t-4 border-r-4 border-amber-500 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-16 h-16 border-b-4 border-l-4 border-amber-500 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-16 h-16 border-b-4 border-r-4 border-amber-500 pointer-events-none" />

            {/* Inner Gold Frame Border */}
            <div className="absolute inset-4 border-2 border-amber-400/60 rounded-lg pointer-events-none" />

            {/* Watermark Crest Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <Award className="w-96 h-96 text-amber-600" />
            </div>

            {/* Header Section */}
            <div className="text-center space-y-2 relative z-10 pt-2">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-md">
                  TK
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-black tracking-widest text-amber-700 uppercase">
                    PEMERINTAH PROVINSI JAWA BARAT
                  </h4>
                  <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
                    DINAS PENDIDIKAN · UJI KOMPETENSI KEAHLIAN TJKT
                  </p>
                </div>
              </div>

              <div className="pt-3">
                <h1 className="text-2xl font-black tracking-widest text-slate-900 uppercase border-b-2 border-amber-500/80 inline-block pb-1 px-8">
                  SERTIFIKAT KELULUSAN KOMPETENSI
                </h1>
                <p className="text-xs font-mono font-bold text-slate-500 pt-1.5">
                  {certNumber}
                </p>
              </div>
            </div>

            {/* Body Section */}
            <div className="text-center space-y-5 relative z-10 py-4 my-auto">
              <p className="text-xs text-slate-600 uppercase tracking-widest font-semibold">
                Diberikan Kepada Siswa / Peserta Didik:
              </p>

              <div className="space-y-1">
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-wide text-blue-950 font-serif">
                  {studentName || 'Nama Siswa'}
                </h2>
                <p className="text-sm font-bold text-amber-800 uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <School className="w-4 h-4 text-amber-600" />
                  <span>{schoolName || 'SMK NEGERI 1 CIMAHI'}</span>
                </p>
              </div>

              <p className="text-xs text-slate-700 max-w-2xl mx-auto leading-relaxed">
                Telah menyelesaikan dan dinyatakan <strong className="text-emerald-700 font-extrabold">KOMPETEN</strong> dalam Evaluasi Uji Kompetensi Keahlian Teknik Komputer dan Jaringan / Telekomunikasi pada modul:
              </p>

              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl max-w-xl mx-auto space-y-1 shadow-xs">
                <h3 className="text-base font-extrabold text-slate-900 uppercase">
                  {examTitle || 'Uji Kompetensi Keahlian TJKT'}
                </h3>
                <div className="flex items-center justify-center gap-4 text-xs pt-1">
                  <span className="font-bold text-slate-700">
                    Nilai Kelulusan: <strong className="text-emerald-700 font-black text-sm">{score} / 100</strong>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-black text-[10px]">
                    SANGAT BAIK (KOMPETEN)
                  </span>
                </div>
              </div>
            </div>

            {/* Footer / Signatures Section */}
            <div className="relative z-10 pt-4 border-t border-slate-200 flex items-end justify-between px-6 pb-2">
              <div className="text-center space-y-1">
                <div className="w-20 h-20 border-2 border-dashed border-amber-400 rounded-2xl mx-auto flex flex-col items-center justify-center text-[9px] text-amber-700 font-bold p-1 bg-amber-50/50">
                  <ShieldCheck className="w-6 h-6 text-amber-600 mb-0.5" />
                  <span>VERIFIED</span>
                  <span className="text-[7px]">SYSTEM OK</span>
                </div>
                <p className="text-[9px] font-mono text-slate-400 pt-1">
                  ID: {sessionId.slice(0, 12)}
                </p>
              </div>

              <div className="text-center space-y-1">
                <p className="text-[11px] text-slate-500 font-medium">
                  Cimahi, {issueDate}
                </p>
                <p className="text-xs font-bold text-slate-800">
                  Kepala Sekolah / Penanggung Jawab Uji
                </p>
                <div className="h-14 flex items-center justify-center">
                  <span className="font-serif italic text-slate-400 text-sm font-bold opacity-60">
                    ( Tanda Tangan Digital )
                  </span>
                </div>
                <p className="text-xs font-black text-slate-900 uppercase underline decoration-amber-500">
                  Kepala Sekolah
                </p>
                <p className="text-[10px] text-slate-500">
                  Dinas Pendidikan Provinsi Jawa Barat
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
