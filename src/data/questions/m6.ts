import { Question } from '../../types/quiz';

export const MINGGU_6_QUESTIONS: Question[] = [
  {
    "id": "m6_q1",
    "week": 6,
    "number": 1,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "serat dengan inti sangat kecil untuk transmisi jarak jauh dan bandwidth tinggi menggunakan satu mode dominan. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Single-mode Fiber (SMF) memiliki diameter core sekitar 9 mikron, menghantarkan satu mode cahaya laser untuk jarak puluhan kilometer tanpa dispersi modal.",
    "options": [
      "Patch Cord Fiber",
      "Drop Cable",
      "Single-mode Fiber",
      "Optical Power Meter",
      "ONT/ONU"
    ],
    "correctAnswer": "C",
    "correctOptionIndex": 2
  },
  {
    "id": "m6_q2",
    "week": 6,
    "number": 2,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "serat dengan inti lebih besar yang membawa banyak mode cahaya dan umum digunakan pada jarak lebih pendek. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Multimode Fiber (MMF) memiliki diameter core 50 atau 62,5 mikron, memanfaatkan sumber LED/VCSEL untuk koneksi jarak pendek (kampus/data center).",
    "options": [
      "ONT/ONU",
      "Multimode Fiber",
      "Cladding",
      "VFL",
      "Fiber Cleaver"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m6_q3",
    "week": 6,
    "number": 3,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "bagian pusat serat tempat cahaya merambat. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Core adalah bagian inti kaca silika paling dalam berindeks bias tinggi tempat berkas cahaya dipandu merambat.",
    "options": [
      "Optical Light Source",
      "Closure",
      "Core",
      "Fiber Cleaver",
      "OTDR"
    ],
    "correctAnswer": "C",
    "correctOptionIndex": 2
  },
  {
    "id": "m6_q4",
    "week": 6,
    "number": 4,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "lapisan dengan indeks bias lebih rendah yang membantu menjaga cahaya tetap berada dalam core. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Cladding membungkus core dengan indeks bias lebih rendah, menciptakan fenomena Total Internal Reflection (pemantulan internal sempurna).",
    "options": [
      "Optical Splitter",
      "OLT",
      "Drop Cable",
      "Cladding",
      "OTDR"
    ],
    "correctAnswer": "D",
    "correctOptionIndex": 3
  },
  {
    "id": "m6_q5",
    "week": 6,
    "number": 5,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "perangkat di sisi penyedia yang mengirim dan menerima sinyal optik serta mengelola pelanggan pada jaringan PON. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "OLT (Optical Line Terminal) ditempatkan di Sentral Telepon/CO untuk mengendalikan transmisi downstream dan upstream ke ratusan ONT pelanggan.",
    "options": [
      "ONT/ONU",
      "Optical Splitter",
      "ODC",
      "ODP",
      "OLT"
    ],
    "correctAnswer": "E",
    "correctOptionIndex": 4
  },
  {
    "id": "m6_q6",
    "week": 6,
    "number": 6,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "kabinet distribusi optik yang menjadi titik pengelolaan, penyambungan, atau pembagian kabel feeder dan distribusi. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "ODC (Optical Distribution Cabinet) adalah rak outdoor perantara yang membagi kabel feeder dari OLT ke kabel distribusi menggunakan splitter pasif tahap pertama.",
    "options": [
      "ODP",
      "Optical Splitter",
      "OLT",
      "ONT/ONU",
      "ODC"
    ],
    "correctAnswer": "E",
    "correctOptionIndex": 4
  },
  {
    "id": "m6_q7",
    "week": 6,
    "number": 7,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "titik distribusi dekat pelanggan yang menghubungkan kabel distribusi ke drop cable pelanggan. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "ODP (Optical Distribution Point) dipasang di tiang atau dinding dekat perumahan untuk membagikan sinyal optik ke kabel drop wire menuju rumah pelanggan.",
    "options": [
      "ODP",
      "ONT/ONU",
      "Optical Splitter",
      "OLT",
      "ODC"
    ],
    "correctAnswer": "A",
    "correctOptionIndex": 0
  },
  {
    "id": "m6_q8",
    "week": 6,
    "number": 8,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "perangkat di sisi pelanggan yang mengubah sinyal optik menjadi layanan data atau antarmuka pengguna. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "ONT (Optical Network Terminal) atau ONU berada di rumah pelanggan untuk mengonversi sinyal foton optik ke port Ethernet RJ45 dan Wi-Fi.",
    "options": [
      "ONT/ONU",
      "ODP",
      "OLT",
      "Optical Splitter",
      "ODC"
    ],
    "correctAnswer": "A",
    "correctOptionIndex": 0
  },
  {
    "id": "m6_q9",
    "week": 6,
    "number": 9,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "komponen pasif yang membagi satu sinyal optik menjadi beberapa jalur dengan loss tertentu. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Optical Splitter (PLC Splitter) membagi daya optik dari 1 serat menjadi 2, 4, 8, 16, atau 32 keluaran dengan redaman proporsional (misal 1:8 redaman ~10.5 dB).",
    "options": [
      "OLT",
      "Optical Splitter",
      "ODP",
      "ONT/ONU",
      "ODC"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m6_q10",
    "week": 6,
    "number": 10,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "potongan serat pendek dengan konektor pada satu ujung dan ujung lain untuk disambung melalui splicing. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Pigtail memiliki satu ujung terkonektor fabrikasi dan ujung kabel terbuka tanpa konektor yang siap disambung las menggunakan fusion splicer.",
    "options": [
      "Closure",
      "Pigtail",
      "ODP",
      "Multimode Fiber",
      "Patch Cord Fiber"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m6_q11",
    "week": 6,
    "number": 11,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "kabel fiber dengan konektor pada kedua ujung untuk menghubungkan port atau panel. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Patch Cord Fiber Optik memiliki konektor di kedua ujungnya (misal SC-UPC ke SC-APC) untuk jumper antar adapter OTB, switch SFP, atau ONT.",
    "options": [
      "Patch Cord Fiber",
      "OTDR",
      "ONT/ONU",
      "Optical Splitter",
      "Optical Light Source"
    ],
    "correctAnswer": "A",
    "correctOptionIndex": 0
  },
  {
    "id": "m6_q12",
    "week": 6,
    "number": 12,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "pelindung sambungan fiber dari kelembapan, debu, tarikan, dan kondisi lingkungan. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Joint Closure adalah selongsong tabung kedap air dan udara yang melindungi tray hasil splicing kabel optik di tiang atau manhole tanah.",
    "options": [
      "Optical Splitter",
      "Drop Cable",
      "Closure",
      "Fiber Cleaver",
      "Optical Light Source"
    ],
    "correctAnswer": "C",
    "correctOptionIndex": 2
  },
  {
    "id": "m6_q13",
    "week": 6,
    "number": 13,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "kabel dari titik distribusi menuju lokasi pelanggan pada jaringan akses. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Drop Cable (drop core) membawa 1-2 core serat optik berpelindung kawat baja gantung (messenger wire) dari ODP menuju roset rumah pelanggan.",
    "options": [
      "Patch Cord Fiber",
      "ONT/ONU",
      "Drop Cable",
      "Closure",
      "Optical Light Source"
    ],
    "correctAnswer": "C",
    "correctOptionIndex": 2
  },
  {
    "id": "m6_q14",
    "week": 6,
    "number": 14,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "alat yang menyelaraskan dan menyatukan dua ujung serat menggunakan pelelehan terkontrol. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Fusion Splicer menyejajarkan inti core secara mikro menggunakan kamera visual dan meleburkan kaca dengan loncatan busur listrik elektroda.",
    "options": [
      "Optical Power Meter",
      "Fusion Splicer",
      "Fiber Cleaver",
      "Optical Light Source",
      "VFL"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m6_q15",
    "week": 6,
    "number": 15,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "alat pemotong presisi untuk menghasilkan ujung serat rata sebelum fusion splicing. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Fiber Cleaver memiliki pisau intan presisi tinggi untuk mematahkan serat kaca sehingga menghasilkan potongan tegak lurus sempurna (<1 derajat).",
    "options": [
      "VFL",
      "Optical Power Meter",
      "Fiber Cleaver",
      "Optical Light Source",
      "Fusion Splicer"
    ],
    "correctAnswer": "C",
    "correctOptionIndex": 2
  },
  {
    "id": "m6_q16",
    "week": 6,
    "number": 16,
    "type": "PG",
    "kompetensi": "Menentukan, menerapkan, dan menganalisis prosedur penggunaan berbagai jenis alat ukur jaringan untuk menghasilkan data pengujian dan pengukuran infrastruktur telekomunikasi yang valid serta akurat sesuai dengan standar operasional prosedur (SOP) industri.",
    "subKompetensi": "Jenis, Fungsi, serta Prosedur operasional dan analisis kerja alat ukur jaringan",
    "kasus": "sumber cahaya tampak untuk membantu menemukan putus, kebocoran, atau jalur serat pada jarak terbatas. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "VFL (Visual Fault Locator) memancarkan sinar laser merah tampak (panjang gelombang ~650 nm) untuk menemukan kabel optik bengkok patah atau tertukar core.",
    "options": [
      "VFL",
      "Fiber Cleaver",
      "Optical Light Source",
      "Optical Power Meter",
      "Fusion Splicer"
    ],
    "correctAnswer": "A",
    "correctOptionIndex": 0
  },
  {
    "id": "m6_q17",
    "week": 6,
    "number": 17,
    "type": "PG",
    "kompetensi": "Menentukan, menerapkan, dan menganalisis prosedur penggunaan berbagai jenis alat ukur jaringan untuk menghasilkan data pengujian dan pengukuran infrastruktur telekomunikasi yang valid serta akurat sesuai dengan standar operasional prosedur (SOP) industri.",
    "subKompetensi": "Jenis, Fungsi, serta Prosedur operasional dan analisis kerja alat ukur jaringan",
    "kasus": "alat yang mengukur daya optik yang diterima pada panjang gelombang tertentu. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "OPM (Optical Power Meter) membaca besaran daya optik yang masuk dalam satuan dBm atau mengukur rugi redaman (loss) dalam dB.",
    "options": [
      "OTDR",
      "Optical Power Meter",
      "Fiber Cleaver",
      "Fusion Splicer",
      "VFL"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m6_q18",
    "week": 6,
    "number": 18,
    "type": "PG",
    "kompetensi": "Menentukan, menerapkan, dan menganalisis prosedur penggunaan berbagai jenis alat ukur jaringan untuk menghasilkan data pengujian dan pengukuran infrastruktur telekomunikasi yang valid serta akurat sesuai dengan standar operasional prosedur (SOP) industri.",
    "subKompetensi": "Jenis, Fungsi, serta Prosedur operasional dan analisis kerja alat ukur jaringan",
    "kasus": "sumber cahaya stabil pada panjang gelombang tertentu untuk pengukuran loss bersama power meter. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "OLS (Optical Light Source) menghasilkan sumber laser stabil pada gelombang standar (1310/1490/1550 nm) yang dipasangkan dengan OPM untuk uji redaman total.",
    "options": [
      "Optical Power Meter",
      "Optical Light Source",
      "Fusion Splicer",
      "OTDR",
      "Fiber Cleaver"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m6_q19",
    "week": 6,
    "number": 19,
    "type": "PG",
    "kompetensi": "Menentukan, menerapkan, dan menganalisis prosedur penggunaan berbagai jenis alat ukur jaringan untuk menghasilkan data pengujian dan pengukuran infrastruktur telekomunikasi yang valid serta akurat sesuai dengan standar operasional prosedur (SOP) industri.",
    "subKompetensi": "Jenis, Fungsi, serta Prosedur operasional dan analisis kerja alat ukur jaringan",
    "kasus": "alat yang menganalisis pantulan sepanjang serat untuk memperkirakan jarak, loss, sambungan, dan lokasi gangguan. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "OTDR (Optical Time Domain Reflectometer) memancarkan pulsa cahaya laser dan menganalisis pantulan Rayleigh & Fresnel untuk memetakan jejak serat.",
    "options": [
      "OTDR",
      "Optical Light Source",
      "VFL",
      "Fiber Cleaver",
      "Optical Power Meter"
    ],
    "correctAnswer": "A",
    "correctOptionIndex": 0
  },
  {
    "id": "m6_q20",
    "week": 6,
    "number": 20,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "perhitungan total daya pancar, sensitivitas penerima, loss kabel, sambungan, konektor, splitter, dan margin. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Link Budget menghitung neraca daya total (TX power - Loss total - Safety margin >= RX sensitivity) untuk memastikan sinyal sampai di penerima dengan andal.",
    "options": [
      "Core",
      "ONT/ONU",
      "Drop Cable",
      "Closure",
      "Link Budget"
    ],
    "correctAnswer": "E",
    "correctOptionIndex": 4
  },
  {
    "id": "m6_q21",
    "week": 6,
    "number": 21,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Jaringan FTTH dari ODP ke rumah pelanggan menggunakan ...",
    "pembahasan": "Segmen akses terakhir dari ODP tiang ke rumah pelanggan menggunakan drop cable optik (drop wire) dengan kawat penggantung penahan beban.",
    "options": [
      "USB cable",
      "Crossover Cat5e",
      "Drop cable fiber yang sesuai untuk lingkungan instalasi",
      "Kabel audio",
      "Kabel UTP indoor"
    ],
    "correctAnswer": "C",
    "correctOptionIndex": 2
  },
  {
    "id": "m6_q22",
    "week": 6,
    "number": 22,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Komponen yang membagi satu sinyal optik menjadi beberapa keluaran adalah ...",
    "pembahasan": "Optical Splitter adalah komponen pasif yang mendistribusikan sinyal optik menjadi beberapa cabang tanpa memerlukan suplai catu daya listrik.",
    "options": [
      "Crimping tool",
      "Optical Splitter",
      "VFL",
      "Fusion splicer",
      "NIC"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m6_q23",
    "week": 6,
    "number": 23,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Perangkat pelanggan yang mengubah sinyal optik menjadi antarmuka data adalah ...",
    "pembahasan": "ONT/ONU (Optical Network Terminal) menerima sinyal optik dari kabel drop dan mengubahnya menjadi antarmuka tembaga Ethernet atau nirkabel.",
    "options": [
      "Cleaver",
      "ODC",
      "ONT/ONU",
      "OTDR",
      "OLT"
    ],
    "correctAnswer": "C",
    "correctOptionIndex": 2
  },
  {
    "id": "m6_q24",
    "week": 6,
    "number": 24,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Ujung serat harus dipotong rata sebelum fusion splicing menggunakan ...",
    "pembahasan": "Pemotongan sudut kaca serat optik secara presisi wajib memakai Fiber Cleaver agar kedua ujung serat dapat menyatu sempurna saat disambung fusion.",
    "options": [
      "Fiber Cleaver",
      "Multimeter",
      "Tone probe",
      "Cable tester",
      "Access point"
    ],
    "correctAnswer": "A",
    "correctOptionIndex": 0
  },
  {
    "id": "m6_q25",
    "week": 6,
    "number": 25,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Hasil sambungan fusion mempunyai estimasi loss tinggi. Langkah yang tepat adalah ...",
    "pembahasan": "Jika perkiraan loss sambungan buruk (>0.05 dB), bersihkan ulang serat dengan alkohol, potong ulang dengan cleaver, dan lakukan penyambungan ulang.",
    "options": [
      "Mengabaikan angka",
      "Memeriksa cleave, kebersihan, alignment, dan mengulang splice bila perlu",
      "Menggunakan RJ45",
      "Menyentuh core",
      "Menambah panjang kabel tanpa uji"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m6_q26",
    "week": 6,
    "number": 26,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Kabel fiber ditekuk sangat tajam. Dampak yang mungkin terjadi adalah ...",
    "pembahasan": "Menekuk kabel fiber melebihi batas kelengkungan (bending radius) menyebabkan macrobending loss (cahaya bocor keluar core) atau bahkan retak/putus permanen.",
    "options": [
      "CPU panas",
      "Loss meningkat akibat macrobend atau kerusakan serat",
      "DNS gagal selalu",
      "Sinyal listrik bertambah",
      "VLAN berubah"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m6_q27",
    "week": 6,
    "number": 27,
    "type": "PG",
    "kompetensi": "Menentukan, menerapkan, dan menganalisis prosedur penggunaan berbagai jenis alat ukur jaringan untuk menghasilkan data pengujian dan pengukuran infrastruktur telekomunikasi yang valid serta akurat sesuai dengan standar operasional prosedur (SOP) industri.",
    "subKompetensi": "Jenis, Fungsi, serta Prosedur operasional dan analisis kerja alat ukur jaringan",
    "kasus": "Alat untuk mengukur daya optik di titik penerima adalah ...",
    "pembahasan": "Optical Power Meter (OPM) adalah instrumen pengukur daya sinyal optik aktual yang diterima pada konektor fiber pelanggan.",
    "options": [
      "Crimping tool",
      "VFL",
      "OTDR",
      "Cleaver",
      "Optical Power Meter"
    ],
    "correctAnswer": "E",
    "correctOptionIndex": 4
  },
  {
    "id": "m6_q28",
    "week": 6,
    "number": 28,
    "type": "PG",
    "kompetensi": "Menentukan, menerapkan, dan menganalisis prosedur penggunaan berbagai jenis alat ukur jaringan untuk menghasilkan data pengujian dan pengukuran infrastruktur telekomunikasi yang valid serta akurat sesuai dengan standar operasional prosedur (SOP) industri.",
    "subKompetensi": "Jenis, Fungsi, serta Prosedur operasional dan analisis kerja alat ukur jaringan",
    "kasus": "Alat untuk memperkirakan lokasi putus beberapa kilometer dari titik ukur adalah ...",
    "pembahasan": "OTDR mengukur jarak kilometer dan lokasi titik putus serat optik secara akurat melalui jejak gelombang pantulan backscatter.",
    "options": [
      "ESD strap",
      "RJ45 tester",
      "Access point",
      "OTDR",
      "OPM saja"
    ],
    "correctAnswer": "D",
    "correctOptionIndex": 3
  },
  {
    "id": "m6_q29",
    "week": 6,
    "number": 29,
    "type": "PG",
    "kompetensi": "Menentukan, menerapkan, dan menganalisis prosedur penggunaan berbagai jenis alat ukur jaringan untuk menghasilkan data pengujian dan pengukuran infrastruktur telekomunikasi yang valid serta akurat sesuai dengan standar operasional prosedur (SOP) industri.",
    "subKompetensi": "Jenis, Fungsi, serta Prosedur operasional dan analisis kerja alat ukur jaringan",
    "kasus": "Konektor terlihat bersih oleh mata tetapi hasil loss tidak stabil. Tindakan tepat adalah ...",
    "pembahasan": "Partikel debu mikro tidak terlihat mata biasa. Gunakan mikroskop fiber inspection probe, bersihkan dengan one-click cleaner / wipes alkohol IPA, lalu periksa ulang.",
    "options": [
      "Inspect-clean-inspect dengan alat dan bahan pembersih yang sesuai",
      "Menggosok dengan kain pakaian",
      "Menambah splitter",
      "Meniup konektor dengan mulut",
      "Mengabaikan"
    ],
    "correctAnswer": "A",
    "correctOptionIndex": 0
  },
  {
    "id": "m6_q30",
    "week": 6,
    "number": 30,
    "type": "PG",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Link budget harus memasukkan ...",
    "pembahasan": "Parameter link budget mencakup: redaman kabel per km, rugi sambungan splice, rugi konektor adapter, redaman splitter pasif, dan safety margin cadangan.",
    "options": [
      "Warna jaket saja",
      "Loss fiber, splice, konektor, splitter, dan margin",
      "Nama pelanggan saja",
      "Jumlah akun email",
      "Ukuran monitor"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m6_q31",
    "week": 6,
    "number": 31,
    "type": "PGK_KATEGORI",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "Semua pernyataan benar mendefinisikan Cladding, ODC, dan ONT/ONU.",
    "statements": [
      {
        "id": "A",
        "text": "Cladding paling tepat dijelaskan sebagai lapisan dengan indeks bias lebih rendah yang membantu menjaga cahaya tetap berada dalam core.",
        "answer": "Benar"
      },
      {
        "id": "B",
        "text": "ODC paling tepat dijelaskan sebagai kabinet distribusi optik yang menjadi titik pengelolaan, penyambungan, atau pembagian kabel feeder dan distribusi.",
        "answer": "Benar"
      },
      {
        "id": "C",
        "text": "ONT/ONU paling tepat dijelaskan sebagai perangkat di sisi pelanggan yang mengubah sinyal optik menjadi layanan data atau antarmuka pengguna.",
        "answer": "Benar"
      }
    ]
  },
  {
    "id": "m6_q32",
    "week": 6,
    "number": 32,
    "type": "PGK_KATEGORI",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "Ketiganya salah: A adalah Drop Cable, B adalah ODC, C adalah Single-mode Fiber.",
    "statements": [
      {
        "id": "A",
        "text": "ONT/ONU paling tepat dijelaskan sebagai kabel dari titik distribusi menuju lokasi pelanggan pada jaringan akses.",
        "answer": "Salah"
      },
      {
        "id": "B",
        "text": "Single-mode Fiber paling tepat dijelaskan sebagai kabinet distribusi optik yang menjadi titik pengelolaan, penyambungan, atau pembagian kabel feeder dan distribusi.",
        "answer": "Salah"
      },
      {
        "id": "C",
        "text": "Patch Cord Fiber paling tepat dijelaskan sebagai serat dengan inti sangat kecil untuk transmisi jarak jauh dan bandwidth tinggi menggunakan satu mode dominan.",
        "answer": "Salah"
      }
    ]
  },
  {
    "id": "m6_q33",
    "week": 6,
    "number": 33,
    "type": "PGK_KATEGORI",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "Semua pernyataan benar mendefinisikan OLT, Cleaver, dan Multimode Fiber.",
    "statements": [
      {
        "id": "A",
        "text": "OLT paling tepat dijelaskan sebagai perangkat di sisi penyedia yang mengirim dan menerima sinyal optik serta mengelola pelanggan pada jaringan PON.",
        "answer": "Benar"
      },
      {
        "id": "B",
        "text": "Fiber Cleaver paling tepat dijelaskan sebagai alat pemotong presisi untuk menghasilkan ujung serat rata sebelum fusion splicing.",
        "answer": "Benar"
      },
      {
        "id": "C",
        "text": "Multimode Fiber paling tepat dijelaskan sebagai serat dengan inti lebih besar yang membawa banyak mode cahaya dan umum digunakan pada jarak lebih pendek.",
        "answer": "Benar"
      }
    ]
  },
  {
    "id": "m6_q34",
    "week": 6,
    "number": 34,
    "type": "PGK_KATEGORI",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "A benar, B salah (itu ODP), C salah (itu Cleaver).",
    "statements": [
      {
        "id": "A",
        "text": "Pigtail paling tepat dijelaskan sebagai potongan serat pendek dengan konektor pada satu ujung dan ujung lain untuk disambung melalui splicing.",
        "answer": "Benar"
      },
      {
        "id": "B",
        "text": "Multimode Fiber paling tepat dijelaskan sebagai titik distribusi dekat pelanggan yang menghubungkan kabel distribusi ke drop cable pelanggan.",
        "answer": "Salah"
      },
      {
        "id": "C",
        "text": "Pigtail paling tepat dijelaskan sebagai alat pemotong presisi untuk menghasilkan ujung serat rata sebelum fusion splicing.",
        "answer": "Salah"
      }
    ]
  },
  {
    "id": "m6_q35",
    "week": 6,
    "number": 35,
    "type": "PGK_KATEGORI",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "A salah (itu Fusion Splicer), B benar, C salah (itu ONT/ONU).",
    "statements": [
      {
        "id": "A",
        "text": "Optical Splitter paling tepat dijelaskan sebagai alat yang menyelaraskan dan menyatukan dua ujung serat menggunakan pelelehan terkontrol.",
        "answer": "Salah"
      },
      {
        "id": "B",
        "text": "Drop Cable paling tepat dijelaskan sebagai kabel dari titik distribusi menuju lokasi pelanggan pada jaringan akses.",
        "answer": "Benar"
      },
      {
        "id": "C",
        "text": "Core paling tepat dijelaskan sebagai perangkat di sisi pelanggan yang mengubah sinyal optik menjadi layanan data atau antarmuka pengguna.",
        "answer": "Salah"
      }
    ]
  },
  {
    "id": "m6_q36",
    "week": 6,
    "number": 36,
    "type": "PGK_KATEGORI",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "A benar, B benar, C salah (itu OLT).",
    "statements": [
      {
        "id": "A",
        "text": "Fusion Splicer paling tepat dijelaskan sebagai alat yang menyelaraskan dan menyatukan dua ujung serat menggunakan pelelehan terkontrol.",
        "answer": "Benar"
      },
      {
        "id": "B",
        "text": "Closure paling tepat dijelaskan sebagai pelindung sambungan fiber dari kelembapan, debu, tarikan, dan kondisi lingkungan.",
        "answer": "Benar"
      },
      {
        "id": "C",
        "text": "Fiber Cleaver paling tepat dijelaskan sebagai perangkat di sisi penyedia yang mengirim dan menerima sinyal optik serta mengelola pelanggan pada jaringan PON.",
        "answer": "Salah"
      }
    ]
  },
  {
    "id": "m6_q37",
    "week": 6,
    "number": 37,
    "type": "PGK_KATEGORI",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "A salah (itu Pigtail), B benar, C salah (itu Splitter).",
    "statements": [
      {
        "id": "A",
        "text": "OLT paling tepat dijelaskan sebagai potongan serat pendek dengan konektor pada satu ujung dan ujung lain untuk disambung melalui splicing.",
        "answer": "Salah"
      },
      {
        "id": "B",
        "text": "Patch Cord Fiber paling tepat dijelaskan sebagai kabel fiber dengan konektor pada kedua ujung untuk menghubungkan port atau panel.",
        "answer": "Benar"
      },
      {
        "id": "C",
        "text": "Cladding paling tepat dijelaskan sebagai komponen pasif yang membagi satu sinyal optik menjadi beberapa jalur dengan loss tertentu.",
        "answer": "Salah"
      }
    ]
  },
  {
    "id": "m6_q38",
    "week": 6,
    "number": 38,
    "type": "PGK_KATEGORI",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "A salah (itu Closure), B salah (itu Multimode Fiber), C benar.",
    "statements": [
      {
        "id": "A",
        "text": "ODP paling tepat dijelaskan sebagai pelindung sambungan fiber dari kelembapan, debu, tarikan, dan kondisi lingkungan.",
        "answer": "Salah"
      },
      {
        "id": "B",
        "text": "Closure paling tepat dijelaskan sebagai serat dengan inti lebih besar yang membawa banyak mode cahaya dan umum digunakan pada jarak lebih pendek.",
        "answer": "Salah"
      },
      {
        "id": "C",
        "text": "Optical Splitter paling tepat dijelaskan sebagai komponen pasif yang membagi satu sinyal optik menjadi beberapa jalur dengan loss tertentu.",
        "answer": "Benar"
      }
    ]
  },
  {
    "id": "m6_q39",
    "week": 6,
    "number": 39,
    "type": "PGK_KATEGORI",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "A benar, B salah (itu Cladding), C benar (ODP).",
    "statements": [
      {
        "id": "A",
        "text": "Core paling tepat dijelaskan sebagai bagian pusat serat tempat cahaya merambat.",
        "answer": "Benar"
      },
      {
        "id": "B",
        "text": "Fusion Splicer paling tepat dijelaskan sebagai lapisan dengan indeks bias lebih rendah yang membantu menjaga cahaya tetap berada dalam core.",
        "answer": "Salah"
      },
      {
        "id": "C",
        "text": "ODP paling tepat dijelaskan sebagai titik distribusi dekat pelanggan yang menghubungkan kabel distribusi ke drop cable pelanggan.",
        "answer": "Benar"
      }
    ]
  },
  {
    "id": "m6_q40",
    "week": 6,
    "number": 40,
    "type": "PGK_KATEGORI",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "A benar, B salah (itu Core), C salah (itu Patch Cord).",
    "statements": [
      {
        "id": "A",
        "text": "Single-mode Fiber paling tepat dijelaskan sebagai serat dengan inti sangat kecil untuk transmisi jarak jauh dan bandwidth tinggi menggunakan satu mode dominan.",
        "answer": "Benar"
      },
      {
        "id": "B",
        "text": "Drop Cable paling tepat dijelaskan sebagai bagian pusat serat tempat cahaya merambat.",
        "answer": "Salah"
      },
      {
        "id": "C",
        "text": "ODC paling tepat dijelaskan sebagai kabel fiber dengan konektor pada kedua ujung untuk menghubungkan port atau panel.",
        "answer": "Salah"
      }
    ]
  },
  {
    "id": "m6_q41",
    "week": 6,
    "number": 41,
    "type": "PGK_MCMA",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Instalasi FTTH udara yang aman menggunakan ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Instalasi FTTH udara (aerial): kabel drop outdoor berkawat penguat, APD climbing helm/harness, serta perhatikan batas lekukan & tension.",
    "mcmaOptions": [
      "Drop cable outdoor sesuai standar",
      "APD pekerjaan ketinggian",
      "Pengendalian bending radius dan tarikan",
      "Kabel indoor tanpa perlindungan",
      "Menarik kabel pada angin kencang tanpa evaluasi"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m6_q42",
    "week": 6,
    "number": 42,
    "type": "PGK_MCMA",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Prosedur fusion splicing mencakup ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Langkah penyambungan serat optik: kupas coating luar, bersihkan dengan alkohol 95%+, potong dengan cleaver, las fusion, dan pasang protection sleeve ke tray kaset.",
    "mcmaOptions": [
      "Strip dan cleaning serat",
      "Cleaving presisi",
      "Splice, sleeve, dan penataan tray",
      "Menyentuh ujung serat",
      "Mengikat serat dengan simpul"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m6_q43",
    "week": 6,
    "number": 43,
    "type": "PGK_MCMA",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Pengukuran OPM dan light source valid memerlukan ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Uji redaman OLS + OPM valid jika: wavelength disamakan (misal 1310nm), setting reference/zeroing sebelum ukur, dan konektor optik higienis.",
    "mcmaOptions": [
      "Panjang gelombang sama",
      "Reference/zero yang benar",
      "Konektor bersih dan koneksi stabil",
      "Mengabaikan kalibrasi",
      "Memilih angka secara acak"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m6_q44",
    "week": 6,
    "number": 44,
    "type": "PGK_MCMA",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "OTDR dapat membantu menganalisis ... (Jawaban benar lebih dari satu)",
    "pembahasan": "OTDR mendeteksi jarak link, loss sambungan fusion (dB), loss konektor, dan titik patahan kabel serat optik.",
    "mcmaOptions": [
      "Jarak event",
      "Loss sambungan atau konektor",
      "Lokasi putus atau refleksi",
      "Urutan warna RJ45",
      "Tegangan adaptor"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m6_q45",
    "week": 6,
    "number": 45,
    "type": "PGK_MCMA",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Link budget memasukkan ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Komponen perhitungan Link Budget: redaman kabel per kilometer (alfa x L), jumlah sambungan las, jumlah konektor, redaman splitter cabang, dan margin keselamatan.",
    "mcmaOptions": [
      "Loss kabel sesuai panjang",
      "Loss splice dan konektor",
      "Loss splitter serta margin",
      "Warna ODP",
      "Nama SSID"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m6_q46",
    "week": 6,
    "number": 46,
    "type": "PGK_MCMA",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Kebersihan konektor dijaga dengan ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Standar industri kebersihan konektor serat optik: prosedur Inspect-Clean-Inspect, penutup dust cap bersih, dan pembersih khusus (cassette cleaner).",
    "mcmaOptions": [
      "Inspect-clean-inspect",
      "Dust cap bersih",
      "Alat pembersih sesuai",
      "Meniup dengan mulut",
      "Menyentuh ferrule"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m6_q47",
    "week": 6,
    "number": 47,
    "type": "PGK_MCMA",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Arsitektur FTTH umumnya melibatkan ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Komponen utama FTTH GPON: OLT di Central Office, ODC/ODP dan splitter pasif di jaringan distribusi, serta ONT/ONU di sisi pelanggan.",
    "mcmaOptions": [
      "OLT",
      "ODC/ODP dan splitter",
      "ONT/ONU pelanggan",
      "Hub Ethernet sebagai pengganti seluruh PON",
      "Crimping RJ45 untuk menyambung core fiber"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m6_q48",
    "week": 6,
    "number": 48,
    "type": "PGK_MCMA",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Penyimpanan patch cord fiber yang baik adalah ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Penyimpanan patch cord optik: pasang selalu dust cap penutup ferrule, gulung dengan diameter aman (>60mm), dan simpan di wadah kering.",
    "mcmaOptions": [
      "Menggunakan dust cap",
      "Menggulung dengan radius aman",
      "Menyimpan bersih dan kering",
      "Melipat tajam",
      "Meletakkan di bawah alat berat"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m6_q49",
    "week": 6,
    "number": 49,
    "type": "PGK_MCMA",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Loss tidak stabil dapat disebabkan ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Penyebab pembacaan redaman optik fluktuatif/tidak stabil: ferrule konektor berdebu/berminyak, adapter longgar, atau mismatch panjang gelombang ukur.",
    "mcmaOptions": [
      "Konektor kotor",
      "Koneksi longgar",
      "Panjang gelombang atau referensi salah",
      "Label kabel rapi",
      "Dokumentasi lengkap"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m6_q50",
    "week": 6,
    "number": 50,
    "type": "PGK_MCMA",
    "kompetensi": "Mengidentifikasi dan menerapkan konfigurasi media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "subKompetensi": "Konsep dasar media transmisi telekomunikasi meliputi penggunaan kabel tembaga (UTP/STP), fiber optik beserta karakteristiknya, serta perangkat jaringan telekomunikasi",
    "kasus": "Keselamatan fiber mencakup ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Aturan keselamatan kerja fiber optik: pakai safety glasses, wadah limbah tertutup untuk pecahan kaca, dan larangan keras menatap langsung ujung konektor laser.",
    "mcmaOptions": [
      "Kacamata pelindung",
      "Wadah serpihan",
      "Larangan makan/minum di area kerja",
      "Mengecek cahaya dengan mata langsung",
      "Membuang serpihan sembarangan"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  }
];
