const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'src', 'data', 'questions');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Minggu 1 data
const m1 = [
  // 1-30 PG
  {
    num: 1,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "personel yang merancang topologi, jalur, kapasitas, kebutuhan perangkat, dan dokumen desain jaringan sebelum instalasi. Istilah/perangkat/profesi yang paling tepat adalah ...",
    options: ["Cloud Engineer", "Cybersecurity Analyst", "Project Manager", "Network Planner", "Teknisi Fiber Optik"],
    kunci: "D",
    correctIndex: 3,
    pembahasan: "Network Planner bertugas merencanakan arsitektur, topologi, kapasitas jalur, dan kebutuhan perangkat keras sebelum instalasi fisik dimulai."
  },
  {
    num: 2,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "tenaga yang membangun, mengonfigurasi, menguji, dan mengoptimalkan infrastruktur jaringan. Istilah/perangkat/profesi yang paling tepat adalah ...",
    options: ["Network Planner", "RF Engineer", "Cybersecurity Analyst", "Cloud Engineer", "Network Engineer"],
    kunci: "E",
    correctIndex: 4,
    pembahasan: "Network Engineer bertugas mengeksekusi pembangunan fisik/logis jaringan, konfigurasi perangkat aktif, pengujian performa, dan optimasi jaringan."
  },
  {
    num: 3,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "petugas yang mengelola akun, konfigurasi harian, hak akses, pencadangan, serta ketersediaan layanan jaringan. Istilah/perangkat/profesi yang paling tepat adalah ...",
    options: ["Cybersecurity Analyst", "Network Engineer", "Network Administrator", "Network Planner", "Teknisi Fiber Optik"],
    kunci: "C",
    correctIndex: 2,
    pembahasan: "Network Administrator bertanggung jawab atas operasional harian: hak akses user, backup berkala, pemeliharaan rutin, dan ketersediaan layanan."
  },
  {
    num: 4,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "petugas lapangan yang menarik kabel, melakukan splicing, terminasi, dan pengujian jaringan serat optik. Istilah/perangkat/profesi yang paling tepat adalah ...",
    options: ["Cybersecurity Analyst", "Teknisi Fiber Optik", "RF Engineer", "Cloud Engineer", "Network Planner"],
    kunci: "B",
    correctIndex: 1,
    pembahasan: "Teknisi Fiber Optik bertugas di lapangan untuk instalasi fisik kabel optik, penyambungan core (splicing), terminasi ODP/patch panel, dan pengukuran loss."
  },
  {
    num: 5,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "petugas pusat operasi jaringan yang memantau alarm, trafik, gangguan, tiket, dan eskalasi layanan. Istilah/perangkat/profesi yang paling tepat adalah ...",
    options: ["Teknisi Fiber Optik", "Network Engineer", "NOC Engineer", "Project Manager", "Network Planner"],
    kunci: "C",
    correctIndex: 2,
    pembahasan: "NOC (Network Operations Center) Engineer bertugas memantau ketersediaan infrastruktur secara 24/7, menangani alarm, dan eskalasi tiket gangguan."
  },
  {
    num: 6,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "tenaga yang memantau ancaman, menganalisis insiden, mengelola kontrol keamanan, dan memberikan rekomendasi mitigasi. Istilah/perangkat/profesi yang paling tepat adalah ...",
    options: ["Project Manager", "Network Administrator", "Customer Service", "Data Center Technician", "Cybersecurity Analyst"],
    kunci: "E",
    correctIndex: 4,
    pembahasan: "Cybersecurity Analyst mengawasi ancaman keamanan siber, menganalisis anomali dan log insiden, serta merumuskan langkah proteksi/mitigasi."
  },
  {
    num: 7,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "tenaga yang merancang, menerapkan, dan mengelola sumber daya komputasi, penyimpanan, serta jaringan pada platform cloud. Istilah/perangkat/profesi yang paling tepat adalah ...",
    options: ["Teknisi Fiber Optik", "RF Engineer", "Customer Service", "Cloud Engineer", "Project Manager"],
    kunci: "D",
    correctIndex: 3,
    pembahasan: "Cloud Engineer bertugas mendesain dan mengelola infrastruktur komputasi berbasis awan (cloud platform) seperti VM, storage, dan VPC."
  },
  {
    num: 8,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "petugas yang menangani pemasangan rak, kabel, server, daya, pendinginan, dan pemeriksaan fisik di pusat data. Istilah/perangkat/profesi yang paling tepat adalah ...",
    options: ["Technopreneur TJKT", "NOC Engineer", "Teknisi Fiber Optik", "Network Administrator", "Data Center Technician"],
    kunci: "E",
    correctIndex: 4,
    pembahasan: "Data Center Technician menangani infrastruktur fasilitas fisik data center: rak server, kabel patching, sistem daya (UPS/PDU), pendingin (HVAC), dan kebersihan lingkungan."
  },
  {
    num: 9,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "tenaga yang merencanakan dan mengoptimalkan cakupan, frekuensi, antena, dan kualitas sinyal radio. Istilah/perangkat/profesi yang paling tepat adalah ...",
    options: ["RF Engineer", "Technopreneur TJKT", "Customer Service", "Cloud Engineer", "Project Manager"],
    kunci: "A",
    correctIndex: 0,
    pembahasan: "RF (Radio Frequency) Engineer bertugas menganalisis propagasi gelombang elektromagnetik, alokasi pita frekuensi, dan penataan antena untuk kualitas sinyal optimal."
  },
  {
    num: 10,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "petugas yang menerima keluhan, memverifikasi kebutuhan, memberikan informasi, dan mencatat tindak lanjut pelanggan. Istilah/perangkat/profesi yang paling tepat adalah ...",
    options: ["Network Administrator", "Customer Service", "Data Center Technician", "Network Planner", "NOC Engineer"],
    kunci: "B",
    correctIndex: 1,
    pembahasan: "Customer Service adalah frontliner yang berinteraksi langsung dengan pelanggan untuk mencatat keluhan, konfirmasi data, dan eskalasi ke divisi teknis."
  },
  {
    num: 11,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "pelaku usaha yang menggabungkan kemampuan teknis dan kewirausahaan untuk menawarkan produk atau jasa berbasis jaringan. Istilah/perangkat/profesi yang paling tepat adalah ...",
    options: ["Data Center Technician", "Network Administrator", "Customer Service", "RF Engineer", "Technopreneur TJKT"],
    kunci: "E",
    correctIndex: 4,
    pembahasan: "Technopreneur TJKT memadukan keahlian teknologi informatika/jaringan telekomunikasi dengan keterampilan bisnis mandiri untuk menghasilkan nilai tambah ekonomi."
  },
  {
    num: 12,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "personel yang mengelola ruang lingkup, waktu, biaya, mutu, risiko, komunikasi, dan serah terima proyek. Istilah/perangkat/profesi yang paling tepat adalah ...",
    options: ["Teknisi Fiber Optik", "Data Center Technician", "Technopreneur TJKT", "Project Manager", "RF Engineer"],
    kunci: "D",
    correctIndex: 3,
    pembahasan: "Project Manager bertanggung jawab mengendalikan seluruh siklus proyek: scope, timeline, budget, quality control, stakeholder communication, dan handover."
  },
  {
    num: 13,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "teknologi seluler generasi kelima yang menawarkan latensi lebih rendah, kapasitas lebih besar, dan dukungan koneksi masif. Istilah/perangkat/profesi yang paling tepat adalah ...",
    options: ["Cloud Computing", "VSAT", "Data Center", "Keamanan Jaringan", "5G"],
    kunci: "E",
    correctIndex: 4,
    pembahasan: "5G adalah teknologi komunikasi seluler generasi ke-5 yang membawa keunggulan eMBB (high speed), URLLC (ultra low latency), dan mMTC (massive IoT)."
  },
  {
    num: 14,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "sistem komunikasi satelit dengan terminal berantena kecil untuk menghubungkan lokasi yang sulit dijangkau jaringan terestrial. Istilah/perangkat/profesi yang paling tepat adalah ...",
    options: ["Internet of Things", "Keamanan Jaringan", "IPv6", "VSAT", "Data Center"],
    kunci: "D",
    correctIndex: 3,
    pembahasan: "VSAT (Very Small Aperture Terminal) adalah sistem stasiun bumi satelit dengan antena piringan kecil untuk menjangkau lokasi terpencil tanpa jalur kabel."
  },
  {
    num: 15,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "komunikasi nirkabel titik-ke-titik menggunakan gelombang mikro dan membutuhkan jalur pandang yang baik. Istilah/perangkat/profesi yang paling tepat adalah ...",
    options: ["Microwave Link", "Keamanan Jaringan", "VSAT", "Data Center", "Cloud Computing"],
    kunci: "A",
    correctIndex: 0,
    pembahasan: "Microwave link merupakan sistem transmisi gelombang mikro point-to-point frekuensi tinggi yang memerlukan Line of Sight (LOS) bebas halangan."
  },
  {
    num: 16,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "protokol internet dengan ruang alamat 128-bit yang dirancang mengatasi keterbatasan alamat IPv4. Istilah/perangkat/profesi yang paling tepat adalah ...",
    options: ["VSAT", "IPv6", "5G", "Cloud Computing", "Keamanan Jaringan"],
    kunci: "B",
    correctIndex: 1,
    pembahasan: "IPv6 menggunakan panjang alamat 128-bit (heksadesimal) sehingga menyediakan kapasitas miliaran triliun alamat unik untuk mengatasi kejenuhan IPv4 (32-bit)."
  },
  {
    num: 17,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "ekosistem perangkat sensor atau aktuator yang terhubung untuk mengirim data dan menerima kendali melalui jaringan. Istilah/perangkat/profesi yang paling tepat adalah ...",
    options: ["5G", "Microwave Link", "Cloud Computing", "Internet of Things", "VSAT"],
    kunci: "D",
    correctIndex: 3,
    pembahasan: "Internet of Things (IoT) adalah konsep interkoneksi perangkat pintar tertanam (embedded sensor/aktuator) yang bertukar data otomatis melalui internet."
  },
  {
    num: 18,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "penyediaan sumber daya komputasi melalui jaringan secara fleksibel, terukur, dan sesuai kebutuhan. Istilah/perangkat/profesi yang paling tepat adalah ...",
    options: ["Cloud Computing", "Microwave Link", "VSAT", "5G", "Internet of Things"],
    kunci: "A",
    correctIndex: 0,
    pembahasan: "Cloud Computing memungkinkan akses on-demand ke server virtual, penyimpanan, dan database melalui jaringan dengan skalabilitas tinggi."
  },
  {
    num: 19,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "fasilitas terkontrol yang menampung server, penyimpanan, jaringan, daya cadangan, keamanan, dan sistem pendingin. Istilah/perangkat/profesi yang paling tepat adalah ...",
    options: ["Keamanan Jaringan", "Data Center", "Internet of Things", "Cloud Computing", "IPv6"],
    kunci: "B",
    correctIndex: 1,
    pembahasan: "Data Center adalah fasilitas fisik terpusat dengan kontrol suhu, daya darurat, dan pengamanan ketat untuk menempatkan server dan storage utama."
  },
  {
    num: 20,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "serangkaian kebijakan, perangkat, dan proses untuk menjaga kerahasiaan, integritas, dan ketersediaan data serta layanan. Istilah/perangkat/profesi yang paling tepat adalah ...",
    options: ["VSAT", "Internet of Things", "Cloud Computing", "Keamanan Jaringan", "Microwave Link"],
    kunci: "D",
    correctIndex: 3,
    pembahasan: "Keamanan Jaringan (Network Security) bertujuan melindungi CIA Triad (Confidentiality, Integrity, Availability) aset informasi dan transmisi data jaringan."
  },
  {
    num: 21,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "Pada proyek FTTH, seseorang melakukan survei jalur, membuat topologi, menghitung splitter dan panjang kabel sebelum instalasi. Profesi yang paling tepat adalah ...",
    options: ["NOC Engineer", "Network Planner", "Customer Service", "Data Center Technician", "Teknisi Fiber Optik"],
    kunci: "B",
    correctIndex: 1,
    pembahasan: "Kegiatan survei rute kabel, pemilihan titik ODC/ODP, perhitungan loss splitter, dan pembuatan gambar kerja sebelum instalasi adalah tanggung jawab Network Planner."
  },
  {
    num: 22,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "Alarm backbone muncul di sistem pemantauan. Petugas memeriksa grafik trafik, membuat tiket, dan mengeskalasi ke tim lapangan. Peran petugas tersebut adalah ...",
    options: ["RF Engineer", "Cloud Engineer", "NOC Engineer", "Technopreneur TJKT", "Customer Service"],
    kunci: "C",
    correctIndex: 2,
    pembahasan: "Petugas yang memonitor alarm NMS, menganalisis drop traffic backbone, membuat trouble ticket, dan mengontak tim lapangan adalah NOC Engineer."
  },
  {
    num: 23,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "Pelanggan mengeluh internet lambat. Tindakan awal customer service yang paling profesional adalah ...",
    options: [
      "Menjanjikan perbaikan lima menit tanpa konfirmasi teknis",
      "Mendengarkan keluhan, memverifikasi data, dan mencatat gejala dalam tiket",
      "Menutup tiket agar antrean berkurang",
      "Meminta pelanggan mengganti seluruh kabel sendiri",
      "Menyalahkan perangkat pelanggan tanpa pemeriksaan"
    ],
    kunci: "B",
    correctIndex: 1,
    pembahasan: "SOP baku customer service: dengarkan secara empati, verifikasi nomor pelanggan dan alamat, identifikasi detail gejala gangguan, dan buat catatan tiket yang akurat."
  },
  {
    num: 24,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "Sebuah lokasi tambang jauh dari jaringan fiber dan seluler membutuhkan koneksi data. Solusi yang paling relevan adalah ...",
    options: ["Access point indoor tunggal", "Loopback plug", "Kabel crossover", "VSAT", "Topologi bus"],
    kunci: "D",
    correctIndex: 3,
    pembahasan: "Lokasi pertambangan remote yang berada di luar jangkauan jaringan kabel dan BTS terrestrial mengandalkan sambungan satelit VSAT."
  },
  {
    num: 25,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "Dua menara akan dihubungkan nirkabel sejauh beberapa kilometer dan terdapat line of sight. Teknologi yang tepat adalah ...",
    options: ["Microwave Link", "Bluetooth", "NFC", "USB tethering", "UTP Cat5e"],
    kunci: "A",
    correctIndex: 0,
    pembahasan: "Jarak antarmenara beberapa kilometer dengan kondisi Line of Sight (LOS) bebas hambatan ideal menggunakan link gelombang mikro (Microwave Link Point-to-Point)."
  },
  {
    num: 26,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "Perusahaan ingin menyediakan server yang kapasitasnya dapat ditambah cepat tanpa membeli seluruh perangkat fisik di awal. Pilihan yang tepat adalah ...",
    options: ["T568A", "Crimping", "Topologi ring", "Cloud Computing", "Cable management"],
    kunci: "D",
    correctIndex: 3,
    pembahasan: "Cloud Computing menyediakan kemampuan provisioning elastis; kapasitas RAM, CPU, dan storage dapat dinaikkan instan tanpa membeli hardware server fisik di awal."
  },
  {
    num: 27,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "Sebuah tim mengubah konfigurasi inti jaringan tanpa persetujuan dan tanpa rencana pemulihan. Prinsip proses bisnis yang dilanggar adalah ...",
    options: [
      "Change management dan pengendalian risiko",
      "Pengenalan profesi",
      "Pemilihan warna kabel",
      "Pemilihan SSID",
      "Pemasaran produk"
    ],
    kunci: "A",
    correctIndex: 0,
    pembahasan: "Change management mengatur bahwa setiap modifikasi konfigurasi core harus melewati review, persetujuan, jadwal maintenance, dan rencana pemulihan (rollback plan)."
  },
  {
    num: 28,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "Teknisi selesai memasang jaringan tetapi tidak menyerahkan diagram aktual, konfigurasi, dan hasil uji. Risiko utama kondisi tersebut adalah ...",
    options: [
      "Sinyal satelit menguat",
      "Pemeliharaan dan troubleshooting berikutnya menjadi sulit",
      "Kabel berubah menjadi STP",
      "Kecepatan CPU langsung turun",
      "Alamat IPv6 otomatis bertambah"
    ],
    kunci: "B",
    correctIndex: 1,
    pembahasan: "Tanpa dokumentasi teknis (as-built drawing, port mapping, IP plan), proses pemeliharaan berkala dan pencarian akar masalah (troubleshooting) akan sangat lambat dan berisiko tinggi."
  },
  {
    num: 29,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "Perangkat sensor suhu mengirim data secara otomatis ke aplikasi pemantauan. Teknologi yang paling sesuai adalah ...",
    options: ["Topologi bus", "Internet of Things", "APAR", "Crossover manual", "BIOS/UEFI"],
    kunci: "B",
    correctIndex: 1,
    pembahasan: "Telemetri otomatis sensor fisik ke platform server/cloud merupakan implementasi praktis arsitektur Internet of Things (IoT)."
  },
  {
    num: 30,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "Seorang teknisi menemukan indikasi serangan dan langsung menghapus semua log agar ruang disk kosong. Tindakan tersebut ...",
    options: [
      "Tepat jika dilakukan tanpa laporan",
      "Merupakan tugas customer service",
      "Tepat karena log tidak berguna",
      "Wajib agar koneksi lebih cepat",
      "Tidak tepat karena log perlu diamankan sebagai bukti analisis insiden"
    ],
    kunci: "E",
    correctIndex: 4,
    pembahasan: "Log sistem adalah barang bukti forensik digital. Menghapus log saat ada insiden merusak jejak investigasi terhadap metode dan asal serangan."
  },

  // 31-40 PGK Kategori
  {
    num: 31,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    statements: [
      { id: "A", text: "NOC Engineer paling tepat dijelaskan sebagai petugas yang menerima keluhan, memverifikasi kebutuhan, memberikan informasi, dan mencatat tindak lanjut pelanggan.", answer: "Salah" },
      { id: "B", text: "Customer Service paling tepat dijelaskan sebagai petugas yang menerima keluhan, memverifikasi kebutuhan, memberikan informasi, dan mencatat tindak lanjut pelanggan.", answer: "Benar" },
      { id: "C", text: "Cloud Engineer paling tepat dijelaskan sebagai personel yang mengelola ruang lingkup, waktu, biaya, mutu, risiko, komunikasi, dan serah terima proyek.", answer: "Salah" }
    ],
    pembahasan: "A Salah (itu tugas Customer Service), B Benar, C Salah (pengelola ruang lingkup, biaya, dan serah terima proyek adalah Project Manager)."
  },
  {
    num: 32,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    statements: [
      { id: "A", text: "RF Engineer paling tepat dijelaskan sebagai sistem komunikasi satelit dengan terminal berantena kecil untuk menghubungkan lokasi yang sulit dijangkau jaringan terestrial.", answer: "Salah" },
      { id: "B", text: "RF Engineer paling tepat dijelaskan sebagai tenaga yang merencanakan dan mengoptimalkan cakupan, frekuensi, antena, dan kualitas sinyal radio.", answer: "Benar" },
      { id: "C", text: "Data Center Technician paling tepat dijelaskan sebagai petugas yang menangani pemasangan rak, kabel, server, daya, pendinginan, dan pemeriksaan fisik di pusat data.", answer: "Benar" }
    ],
    pembahasan: "A Salah (itu sistem VSAT, bukan RF Engineer), B Benar (RF Engineer mengurus antena dan frekuensi), C Benar (tugas teknisi data center)."
  },
  {
    num: 33,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    statements: [
      { id: "A", text: "Network Planner paling tepat dijelaskan sebagai tenaga yang memantau ancaman, menganalisis insiden, mengelola kontrol keamanan, dan memberikan rekomendasi mitigasi.", answer: "Salah" },
      { id: "B", text: "Network Planner paling tepat dijelaskan sebagai personel yang merancang topologi, jalur, kapasitas, kebutuhan perangkat, dan dokumen desain jaringan sebelum instalasi.", answer: "Benar" },
      { id: "C", text: "NOC Engineer paling tepat dijelaskan sebagai petugas pusat operasi jaringan yang memantau alarm, trafik, gangguan, tiket, dan eskalasi layanan.", answer: "Benar" }
    ],
    pembahasan: "A Salah (itu tugas Cybersecurity Analyst), B Benar (perencana jaringan), C Benar (petugas Network Operations Center)."
  },
  {
    num: 34,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    statements: [
      { id: "A", text: "Network Administrator paling tepat dijelaskan sebagai petugas yang menangani pemasangan rak, kabel, server, daya, pendinginan, dan pemeriksaan fisik di pusat data.", answer: "Salah" },
      { id: "B", text: "Cloud Engineer paling tepat dijelaskan sebagai tenaga yang merancang, menerapkan, dan mengelola sumber daya komputasi, penyimpanan, serta jaringan pada platform cloud.", answer: "Benar" },
      { id: "C", text: "Customer Service paling tepat dijelaskan sebagai komunikasi nirkabel titik-ke-titik menggunakan gelombang mikro dan membutuhkan jalur pandang yang baik.", answer: "Salah" }
    ],
    pembahasan: "A Salah (itu tugas Data Center Technician), B Benar, C Salah (itu definisi Microwave Link)."
  },
  {
    num: 35,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    statements: [
      { id: "A", text: "5G paling tepat dijelaskan sebagai teknologi seluler generasi kelima yang menawarkan latensi lebih rendah, kapasitas lebih besar, dan dukungan koneksi masif.", answer: "Benar" },
      { id: "B", text: "Network Engineer paling tepat dijelaskan sebagai tenaga yang membangun, mengonfigurasi, menguji, dan mengoptimalkan infrastruktur jaringan.", answer: "Benar" },
      { id: "C", text: "VSAT paling tepat dijelaskan sebagai petugas lapangan yang menarik kabel, melakukan splicing, terminasi, dan pengujian jaringan serat optik.", answer: "Salah" }
    ],
    pembahasan: "A Benar, B Benar, C Salah (itu Teknisi Fiber Optik, bukan teknologi satelit VSAT)."
  },
  {
    num: 36,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    statements: [
      { id: "A", text: "Teknisi Fiber Optik paling tepat dijelaskan sebagai tenaga yang merencanakan dan mengoptimalkan cakupan, frekuensi, antena, dan kualitas sinyal radio.", answer: "Salah" },
      { id: "B", text: "Data Center Technician paling tepat dijelaskan sebagai teknologi seluler generasi kelima yang menawarkan latensi lebih rendah, kapasitas lebih besar, dan dukungan koneksi masif.", answer: "Salah" },
      { id: "C", text: "Teknisi Fiber Optik paling tepat dijelaskan sebagai petugas lapangan yang menarik kabel, melakukan splicing, terminasi, dan pengujian jaringan serat optik.", answer: "Benar" }
    ],
    pembahasan: "A Salah (itu tugas RF Engineer), B Salah (itu teknologi 5G), C Benar."
  },
  {
    num: 37,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    statements: [
      { id: "A", text: "Technopreneur TJKT paling tepat dijelaskan sebagai pelaku usaha yang menggabungkan kemampuan teknis dan kewirausahaan untuk menawarkan produk atau jasa berbasis jaringan.", answer: "Benar" },
      { id: "B", text: "Microwave Link paling tepat dijelaskan sebagai petugas pusat operasi jaringan yang memantau alarm, trafik, gangguan, tiket, dan eskalasi layanan.", answer: "Salah" },
      { id: "C", text: "5G paling tepat dijelaskan sebagai petugas yang mengelola akun, konfigurasi harian, hak akses, pencadangan, serta ketersediaan layanan jaringan.", answer: "Salah" }
    ],
    pembahasan: "A Benar, B Salah (itu tugas NOC Engineer), C Salah (itu tugas Network Administrator)."
  },
  {
    num: 38,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    statements: [
      { id: "A", text: "Project Manager paling tepat dijelaskan sebagai tenaga yang membangun, mengonfigurasi, menguji, dan mengoptimalkan infrastruktur jaringan.", answer: "Salah" },
      { id: "B", text: "Network Administrator paling tepat dijelaskan sebagai petugas yang mengelola akun, konfigurasi harian, hak akses, pencadangan, serta ketersediaan layanan jaringan.", answer: "Benar" },
      { id: "C", text: "VSAT paling tepat dijelaskan sebagai sistem komunikasi satelit dengan terminal berantena kecil untuk menghubungkan lokasi yang sulit dijangkau jaringan terestrial.", answer: "Benar" }
    ],
    pembahasan: "A Salah (itu Network Engineer), B Benar, C Benar."
  },
  {
    num: 39,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    statements: [
      { id: "A", text: "Microwave Link paling tepat dijelaskan sebagai komunikasi nirkabel titik-ke-titik menggunakan gelombang mikro dan membutuhkan jalur pandang yang baik.", answer: "Benar" },
      { id: "B", text: "Cybersecurity Analyst paling tepat dijelaskan sebagai pelaku usaha yang menggabungkan kemampuan teknis dan kewirausahaan untuk menawarkan produk atau jasa berbasis jaringan.", answer: "Salah" },
      { id: "C", text: "Technopreneur TJKT paling tepat dijelaskan sebagai personel yang merancang topologi, jalur, kapasitas, kebutuhan perangkat, dan dokumen desain jaringan sebelum instalasi.", answer: "Salah" }
    ],
    pembahasan: "A Benar, B Salah (itu Technopreneur), C Salah (itu Network Planner)."
  },
  {
    num: 40,
    kompetensi: "Mengidentifikasi jenis profesi atau jabatan kerja di bidang TJKT secara tepat",
    subKompetensi: "Jenis profesi dan jabatan kerja di bidang TJKT",
    kasus: "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    statements: [
      { id: "A", text: "Cybersecurity Analyst paling tepat dijelaskan sebagai tenaga yang memantau ancaman, menganalisis insiden, mengelola kontrol keamanan, dan memberikan rekomendasi mitigasi.", answer: "Benar" },
      { id: "B", text: "Project Manager paling tepat dijelaskan sebagai personel yang mengelola ruang lingkup, waktu, biaya, mutu, risiko, komunikasi, dan serah terima proyek.", answer: "Benar" },
      { id: "C", text: "Network Engineer paling tepat dijelaskan sebagai tenaga yang merancang, menerapkan, dan mengelola sumber daya komputasi, penyimpanan, serta jaringan pada platform cloud.", answer: "Salah" }
    ],
    pembahasan: "A Benar, B Benar, C Salah (itu tugas Cloud Engineer)."
  },

  // 41-50 PGK MCMA
  {
    num: 41,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "Tim akan merencanakan jaringan FTTH baru. Tindakan yang sesuai tahap perencanaan adalah ... (Jawaban benar lebih dari satu)",
    options: [
      "Melakukan survei lokasi dan kebutuhan pelanggan",
      "Membuat desain topologi serta jalur kabel",
      "Menghitung perangkat dan estimasi biaya",
      "Memulai instalasi sebelum desain disetujui",
      "Mengabaikan risiko dan izin jalur"
    ],
    kunci: "Pernyataan 1, Pernyataan 2, Pernyataan 3",
    correctIndices: [0, 1, 2],
    pembahasan: "Tahap perencanaan wajib mencakup survei lapangan, pembuatan diagram topologi/jalur, serta perhitungan RAB. Memasang sebelum desain disetujui atau mengabaikan izin melanggar SOP."
  },
  {
    num: 42,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "Customer service menerima gangguan berulang. Tindakan profesional adalah ... (Jawaban benar lebih dari satu)",
    options: [
      "Memverifikasi identitas dan gejala",
      "Mencatat tiket serta waktu kejadian",
      "Memberikan pembaruan status yang realistis",
      "Menyalahkan pelanggan tanpa pemeriksaan",
      "Menutup tiket sebelum pelanggan mengonfirmasi"
    ],
    kunci: "Pernyataan 1, Pernyataan 2, Pernyataan 3",
    correctIndices: [0, 1, 2],
    pembahasan: "Tindakan profesional CS: memverifikasi identitas, mencatat kronologi gangguan secara runut di sistem ticketing, dan memberikan update realistis kepada pelanggan."
  },
  {
    num: 43,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "NOC mendeteksi kenaikan packet loss. Langkah yang tepat adalah ... (Jawaban benar lebih dari satu)",
    options: [
      "Memeriksa alarm dan grafik historis",
      "Membuat atau memperbarui tiket",
      "Mengeskalasi dengan bukti yang cukup",
      "Menghapus log agar dashboard bersih",
      "Menyembunyikan insiden dari tim"
    ],
    kunci: "Pernyataan 1, Pernyataan 2, Pernyataan 3",
    correctIndices: [0, 1, 2],
    pembahasan: "Langkah mitigasi packet loss: cek grafik NMS historis, perbarui status tiket, dan eskalasikan ke tim transmisi/lapangan lengkap dengan bukti metrik uji."
  },
  {
    num: 44,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "Technopreneur akan menawarkan jasa instalasi jaringan. Hal yang perlu disiapkan adalah ... (Jawaban benar lebih dari satu)",
    options: [
      "Analisis kebutuhan pasar",
      "Perhitungan biaya dan margin",
      "Ruang lingkup serta garansi tertulis",
      "Janji tanpa batas kapasitas",
      "Menggunakan data pelanggan tanpa izin"
    ],
    kunci: "Pernyataan 1, Pernyataan 2, Pernyataan 3",
    correctIndices: [0, 1, 2],
    pembahasan: "Persiapan usaha jasa jaringan profesional: analisis pasar target, rincian biaya (COGS) dan margin laba, serta kontrak Service Level Agreement (SLA) bergaransi tertulis."
  },
  {
    num: 45,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "Perubahan konfigurasi inti akan dilakukan. Praktik yang benar adalah ... (Jawaban benar lebih dari satu)",
    options: [
      "Mendapat persetujuan perubahan",
      "Membuat backup dan rollback plan",
      "Menjadwalkan serta menguji setelah perubahan",
      "Mengubah langsung di jam sibuk tanpa komunikasi",
      "Menghapus konfigurasi lama sebelum backup"
    ],
    kunci: "Pernyataan 1, Pernyataan 2, Pernyataan 3",
    correctIndices: [0, 1, 2],
    pembahasan: "Standar Change Management ITIL: persetujuan Change Advisory Board, backup konfigurasi & rencana rollback teruji, serta jadwal eksekusi di luar jam sibuk (maintenance window)."
  },
  {
    num: 46,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "Pemanfaatan IoT di sekolah perlu memperhatikan ... (Jawaban benar lebih dari satu)",
    options: [
      "Identitas dan autentikasi perangkat",
      "Pembaruan firmware",
      "Segmentasi serta pengamanan data",
      "Password bawaan untuk semua perangkat",
      "Membuka semua port ke internet"
    ],
    kunci: "Pernyataan 1, Pernyataan 2, Pernyataan 3",
    correctIndices: [0, 1, 2],
    pembahasan: "Pengamanan perangkat IoT: pastikan autentikasi unik, rutin perbarui patch firmware, dan pisahkan ke VLAN khusus (segmentasi) agar tidak membahayakan server sekolah."
  },
  {
    num: 47,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "Serah terima proyek jaringan yang baik mencakup ... (Jawaban benar lebih dari satu)",
    options: [
      "Hasil uji dan berita acara",
      "Diagram as-built dan backup konfigurasi",
      "Pelatihan singkat kepada pengelola",
      "Menghapus dokumentasi agar rahasia",
      "Meninggalkan akun default"
    ],
    kunci: "Pernyataan 1, Pernyataan 2, Pernyataan 3",
    correctIndices: [0, 1, 2],
    pembahasan: "Dokumen serah terima (handover) proyek wajib menyertakan Berita Acara Uji Terima (BAUT), as-built drawing, file backup konfigurasi, serta sesi knowledge transfer kepada pengelola."
  },
  {
    num: 48,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "Data center memerlukan pengelolaan yang baik melalui ... (Jawaban benar lebih dari satu)",
    options: [
      "Kontrol akses fisik",
      "Pemantauan daya dan pendinginan",
      "Pelabelan rak dan kabel",
      "Menutup ventilasi untuk mengurangi debu",
      "Menaruh minuman di atas server"
    ],
    kunci: "Pernyataan 1, Pernyataan 2, Pernyataan 3",
    correctIndices: [0, 1, 2],
    pembahasan: "Pilar manajemen data center: security fisik bertingkat, monitoring temperatur & konsumsi daya secara kontinyu, serta kerapian pengkabelan dan pelabelan terstandar."
  },
  {
    num: 49,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "Saat insiden keamanan, tindakan awal yang tepat adalah ... (Jawaban benar lebih dari satu)",
    options: [
      "Mengisolasi sistem terdampak sesuai prosedur",
      "Mengamankan log dan bukti",
      "Melapor serta mengikuti rencana respons",
      "Menyebarkan kredensial tim di grup umum",
      "Menghapus bukti tanpa analisis"
    ],
    kunci: "Pernyataan 1, Pernyataan 2, Pernyataan 3",
    correctIndices: [0, 1, 2],
    pembahasan: "Prosedur Incident Response awal: isolasi host yang terinfeksi dari jaringan, amankan snapshot memori/log untuk bukti forensik, dan laporkan ke Incident Response Team."
  },
  {
    num: 50,
    kompetensi: "Mengidentifikasi, menginterpretasi, dan menganalisis alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja dalam bidang jaringan komputer dan telekomunikasi",
    subKompetensi: "Alur kerja, proses bisnis layanan, perkembangan industri, budaya kerja dan etos kerja jaringan komputer dan telekomunikasi",
    kasus: "Teknologi yang relevan untuk konektivitas modern TJKT meliputi ... (Jawaban benar lebih dari satu)",
    options: [
      "IPv6",
      "Cloud computing",
      "5G",
      "Mesin ketik manual sebagai media jaringan",
      "Kabel listrik sebagai satu-satunya konsep jaringan"
    ],
    kunci: "Pernyataan 1, Pernyataan 2, Pernyataan 3",
    correctIndices: [0, 1, 2],
    pembahasan: "Pilar konektivitas digital modern TJKT bertumpu pada pengalamatan global IPv6, infrastruktur elastis Cloud Computing, dan kecepatan tinggi latensi rendah jaringan 5G."
  }
];

function transformWeekData(rawList, weekNum) {
  return rawList.map(item => {
    const isPG = item.num <= 30;
    const isKategori = item.num >= 31 && item.num <= 40;
    const isMCMA = item.num >= 41 && item.num <= 50;

    let type = 'PG';
    if (isKategori) type = 'PGK_KATEGORI';
    if (isMCMA) type = 'PGK_MCMA';

    const obj = {
      id: `m${weekNum}_q${item.num}`,
      week: weekNum,
      number: item.num,
      type: type,
      kompetensi: item.kompetensi,
      subKompetensi: item.subKompetensi,
      kasus: item.kasus,
      pembahasan: item.pembahasan
    };

    if (isPG) {
      obj.options = item.options;
      obj.correctAnswer = item.kunci;
      obj.correctOptionIndex = item.correctIndex;
    } else if (isKategori) {
      obj.statements = item.statements;
    } else if (isMCMA) {
      obj.mcmaOptions = item.options;
      obj.correctMcmaIndices = item.correctIndices;
    }

    return obj;
  });
}

function writeTsFile(weekNum, data) {
  const code = `import { Question } from '../../types/quiz';

export const MINGGU_${weekNum}_QUESTIONS: Question[] = ${JSON.stringify(data, null, 2)};
`;
  fs.writeFileSync(path.join(outDir, `m${weekNum}.ts`), code, 'utf-8');
  console.log(`Generated m${weekNum}.ts (${data.length} questions)`);
}

// Write m1
const m1Questions = transformWeekData(m1, 1);
writeTsFile(1, m1Questions);
