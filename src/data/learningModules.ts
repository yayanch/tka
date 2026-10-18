export interface LearningSection {
  id: string;
  title: string;
  content: string;
  keyPoints?: string[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  tips?: string;
  diagramId?: string;
}

export interface LearningModule {
  id: number;
  week: number;
  title: string;
  subtitle: string;
  estimatedReadMinutes: number;
  overview: string;
  competencies: string[];
  sections: LearningSection[];
  glossary: { term: string; definition: string }[];
  examTips: string[];
  diagramIds?: string[];
}

export const LEARNING_MODULES: LearningModule[] = [
  // =========================================================================
  // MODUL 1
  // =========================================================================
  {
    id: 1,
    week: 1,
    title: 'Wawasan Dunia Kerja, Profesi, Proses Bisnis & Tren Teknologi TJKT',
    subtitle: 'Pemetaan peran profesi industri telekomunikasi, siklus bisnis proyek jaringan, etos kerja, serta teknologi generasi baru (5G, IoT, Cloud, VSAT, Microwave Link).',
    estimatedReadMinutes: 12,
    overview: 'Modul ini membekali siswa SMK dengan pemahaman komprehensif mengenai ekosistem industri Teknik Jaringan Komputer dan Telekomunikasi. Fokus utama mencakup diferensiasi tanggung jawab spesifik antar-profesi, kepatuhan proses bisnis (Change Management, SLA, BAUT), serta pemanfaatan teknologi jaringan terkini.',
    competencies: [
      'Mengidentifikasi jenis profesi dan jabatan kerja di bidang TJKT beserta batasan tanggung jawabnya.',
      'Menganalisis alur proses bisnis layanan jaringan, manajemen perubahan (Change Management), dan serah terima proyek.',
      'Memahami konsep dan karakteristik teknologi komunikasi modern: 5G, IoT, Cloud Computing, VSAT, Microwave Link, dan IPv6.'
    ],
    sections: [
      {
        id: 'm1_profesi',
        title: '1. Pemetaan Profesi dan Jabatan Kerja Bidang TJKT',
        content: `Di industri telekomunikasi dan jaringan, setiap peran memiliki spesialisasi tugas yang jelas dan tidak boleh tertukar dalam alur operasional:`,
        tableData: {
          headers: ['Jabatan / Profesi', 'Tanggung Jawab Utama', 'Cakupan Pekerjaan Khas'],
          rows: [
            ['Network Planner', 'Perencanaan arsitektur & desain sebelum instalasi fisik', 'Survei jalur, pembuatan topologi jaringan, kalkulasi kapasitas bandwidth, perhitungan rasio splitter FTTH, dan dokumen BoQ/RAB.'],
            ['Network Engineer', 'Pembangunan, konfigurasi, dan optimasi aktif', 'Konfigurasi perangkat switch, router, firewall; pengujian throughput & routing; tuning QoS.'],
            ['Network Administrator', 'Operasional dan pemeliharaan harian (Day-to-day)', 'Manajemen akun user, hak akses, backup konfigurasi rutin, monitoring berkala, dan penanganan tiket keluhan internal.'],
            ['Teknisi Fiber Optik', 'Pekerjaan fisik kabel serat optik di lapangan', 'Penarikan kabel udara/bawah tanah, pengupasan, splicing dengan fusion splicer, terminasi ODP/roset, dan uji OPM.'],
            ['NOC Engineer', 'Pemantauan pusat operasi jaringan (24/7 Monitoring)', 'Memantau dashboard NMS, alarm link down, fluktuasi grafik trafik, penerbitan trouble ticket, dan eskalasi ke tim lapangan.'],
            ['Cybersecurity Analyst', 'Proteksi ancaman, analisis insiden & mitigasi siber', 'Monitoring log SIEM/firewall, deteksi intrusi, penanganan insiden keamanan, dan audit kepatuhan keamanan informasi.'],
            ['Cloud Engineer', 'Perancangan & pengelolaan sumber daya komputasi awan', 'Manajemen VM, virtual private cloud (VPC), storage terdistribusi, load balancer, dan auto-scaling cloud platform.'],
            ['Data Center Technician', 'Pemeliharaan fasilitas fisik ruang pusat data', 'Racking server, perapihan kabel patch panel, kontrol suhu pendingin (HVAC), daya cadangan (UPS/Genset), dan kebersihan rak.'],
            ['RF Engineer', 'Perencanaan dan optimasi gelombang radio nirkabel', 'Perhitungan link budget gelombang mikro/seluler, azimuth & tilt antena BTS, mitigasi interferensi frekuensi, dan survey coverage sinyal.'],
            ['Customer Service', 'Layanan garda depan interaksi dengan pelanggan', 'Penerimaan keluhan pelanggan, verifikasi data langganan, pencatatan kronologi gejala gangguan pada trouble ticket.'],
            ['Project Manager (PM)', 'Pengendalian proyek end-to-end', 'Mengelola ruang lingkup (scope), jadwal (timeline), biaya (budget), risiko, komunikasi stakeholder, hingga serah terima resmi (handover).'],
            ['Technopreneur TJKT', 'Wirausaha mandiri berbasis teknologi jaringan', 'Menggabungkan keahlian teknis TJKT dengan kemampuan bisnis untuk menawarkan jasa ISP lokal, instalasi jaringan, atau konsultan TI.']
          ]
        },
        tips: 'Ingat pembeda utama: Network Planner bekerja sebelum instalasi (desain); Network Engineer saat instalasi & optimasi; Network Administrator saat operasional harian; NOC Engineer memantau alarm 24/7.'
      },
      {
        id: 'm1_proses_bisnis',
        title: '2. Proses Bisnis & Manajemen Perubahan (Change Management)',
        content: `Jaringan komputer skala institusi atau ISP tidak boleh diubah secara sembarangan di jam sibuk tanpa prosedur tertulis. Standar industri menuntut:
1. Change Management: Setiap perubahan konfigurasi inti harus memiliki dokumen Request for Change (RFC), disetujui pihak berwenang, dijadwalkan pada maintenance window (jam sepi), serta WAJIB memiliki file backup dan rencana pemulihan (Rollback Plan) jika terjadi kegagalan.
2. Manajemen Insiden & Log: Saat terjadi serangan atau gangguan, log sistem TIDAK BOLEH dihapus. Log merupakan bukti digital penting untuk analisis penyebab (root cause analysis) dan penyelidikan forensik siber.
3. Serah Terima Proyek (Handover): Proyek instalasi jaringan baru dinyatakan selesai secara sah jika disertai Berita Acara Uji Terima (BAUT), gambar instalasi aktual (as-built drawing), salinan backup konfigurasi, serta pelatihan (knowledge transfer) kepada pengelola.`,
        keyPoints: [
          'Jangan pernah mengubah konfigurasi inti di jam operasional tanpa persetujuan tertulis.',
          'Rollback plan dan backup konfigurasi adalah syarat mutlak sebelum melakukan perubahan jaringan.',
          'Dokumentasi as-built drawing mencegah tingginya waktu henti (MTTR) saat pemeliharaan di kemudian hari.'
        ]
      },
      {
        id: 'm1_teknologi',
        title: '3. Perkembangan Teknologi Telekomunikasi Modern',
        content: `Pemahaman karakteristik teknologi media transmisi dan platform digital modern:`,
        tableData: {
          headers: ['Teknologi', 'Karakteristik Kunci', 'Skenario Pemanfaatan Nyata'],
          rows: [
            ['5G (Generasi Kelima)', 'Latensi ultra-rendah (<1 ms), kecepatan data masif (eMBB), konektivitas perangkat padat (mMTC)', 'Smart city, otomasi industri robotik, telemedisin jarak jauh, armada kendaraan otonom.'],
            ['Internet of Things (IoT)', 'Ekosistem sensor dan aktuator fisik yang mengirim telemetri otomatis lewat protokol ringan (MQTT/HTTP)', 'Monitoring suhu ruangan server otomatis, smart agriculture, sistem keamanan gerbang pintar.'],
            ['Cloud Computing', 'Penyediaan komputasi on-demand (CPU, RAM, storage) elastis berbasis bayar sesuai pakai', 'Penyediaan server web kampus/sekolah yang kapasitasnya dapat diperbesar instan tanpa beli fisik di awal.'],
            ['VSAT (Satelit)', 'Komunikasi satelit geostasioner dengan terminal antena piringan kecil (aperture 1-3 meter)', 'Koneksi data lokasi remote: pertambangan pedalaman, anjungan minyak lepas pantai, pulau terluar (3T).'],
            ['Microwave Link', 'Transmisi radio gelombang mikro titik-ke-titik (PtP) frekuensi tinggi yang menuntut Line of Sight (LOS)', 'Backbone transmisi nirkabel antarmenara BTS sejauh beberapa kilometer dengan biaya lebih efisien daripada fiber optik.'],
            ['IPv6', 'Protokol internet dengan panjang alamat 128 bit format heksadesimal', 'Mengatasi keterbatasan ruang alamat IPv4 (32 bit) guna menampung triliunan perangkat internet di masa depan.']
          ]
        }
      }
    ],
    glossary: [
      { term: 'BAUT', definition: 'Berita Acara Uji Terima, dokumen bukti pengujian performa yang disahkan kedua pihak saat serah terima proyek.' },
      { term: 'Line of Sight (LOS)', definition: 'Kondisi jalur pandang lurus bebas hambatan antara pemancar dan penerima pada komunikasi radio gelombang mikro.' },
      { term: 'Rollback Plan', definition: 'Langkah terencana untuk mengembalikan konfigurasi sistem ke kondisi stabil semula jika pembaruan mengalami kegagalan.' },
      { term: 'CIA Triad', definition: 'Tiga pilar utama keamanan informasi: Confidentiality (Kerahasiaan), Integrity (Keutuhan), dan Availability (Ketersediaan).' }
    ],
    examTips: [
      'Jika soal menyebut "merancang topologi dan kapasitas sebelum instalasi" -> jawabannya adalah Network Planner.',
      'Jika soal menyebut "lokasi tambang terpencil jauh dari fiber dan BTS seluler" -> jawabannya adalah VSAT.',
      'Jika soal menyebut "dua menara terhubung nirkabel berjarak beberapa kilometer dengan line of sight" -> jawabannya adalah Microwave Link.',
      'Jika teknisi menemukan serangan siber, tindakan yang dilarang adalah menghapus log sistem, karena log adalah bukti digital insiden.'
    ]
  },

  // =========================================================================
  // MODUL 2
  // =========================================================================
  {
    id: 2,
    week: 2,
    title: 'Perangkat Keras, Sistem Operasi, Virtualisasi & Layanan Server Dasar',
    subtitle: 'Arsitektur komponen PC/Server, bootloader BIOS/UEFI, partisi & filesystem, administrasi Linux systemd/CLI, konsep adapter hypervisor, dan konfigurasi server esensial (DHCP, DNS, SSH, Web).',
    estimatedReadMinutes: 14,
    overview: 'Membahas penguasaan dasar infrastruktur komputasi dari level fisik hingga virtualisasi server. Siswa mempelajari peran CPU, RAM, disk SSD, interface NIC, partisi penyimpanan, konfigurasi virtual network adapter pada VM, pemeliharaan Linux via CLI, serta layanan jaringan inti.',
    competencies: [
      'Menerapkan fungsi komponen perangkat keras komputer dan firmware sistem (BIOS/UEFI).',
      'Mengoperasikan perintah dasar Linux CLI dan pengelolaan service latar belakang (systemctl/journalctl).',
      'Mengonfigurasi mode adapter virtualisasi (NAT, Bridged, Host-Only) dan manajemen snapshot mesin virtual.',
      'Menganalisis prinsip kerja dan troubleshooting server dasar: DHCP, DNS, Web Server, dan remote SSH.'
    ],
    sections: [
      {
        id: 'm2_hardware',
        title: '1. Perangkat Keras Komputer & Firmware Booting',
        content: `Hierarki perangkat keras dan perannya dalam pemrosesan data:
- CPU (Central Processing Unit): Unit pemroses logika dan aritmatika utama komputer.
- RAM (Random Access Memory): Memori kerja sementara berkecepatan tinggi yang bersifat volatil (hilang saat daya mati).
- SSD (Solid State Drive): Media penyimpanan sekunder berbasis memori flash NAND, non-volatil, dengan IOPS dan kecepatan akses jauh melampaui hard disk mekanis (HDD).
- NIC (Network Interface Card): Kartu antarmuka fisik yang menghubungkan perangkat ke kabel/nirkabel jaringan dan memiliki alamat fisik Layer 2 (MAC Address).
- BIOS / UEFI: Firmware pada chip ROM/flash motherboard yang melakukan POST (Power-On Self-Test) dan memuat master boot record OS sebelum kernel berjalan.
- Partisi & File System: Partisi membagi hard disk fisik menjadi beberapa volume logis terpisah. File system (ext4 pada Linux, NTFS pada Windows) mengatur struktur hierarki folder, penamaan berkas, hak izin akses, dan alokasi blok data.`,
        keyPoints: [
          'RAM bersifat volatil (data lenyap saat shutdown), sedangkan SSD bersifat non-volatil.',
          'NIC yang belum dikenali OS pasca instalasi memerlukan pemeriksaan driver di Device Manager atau lspci di Linux.'
        ]
      },
      {
        id: 'm2_virtualisasi',
        title: '2. Virtualisasi & Mode Jaringan Virtual Machine (VM)',
        content: `Hypervisor (seperti VirtualBox, Proxmox, VMware ESXi, KVM) adalah lapisan software yang membagi sumber daya fisik komputer host menjadi beberapa mesin virtual (guest OS). Pemilihan adapter jaringan VM menentukan keterjangkauan akses:`,
        tableData: {
          headers: ['Mode Jaringan VM', 'Karakteristik & Mekanisme', 'Akses ke Internet', 'Dapat Diakses dari Komputer Lain di LAN?'],
          rows: [
            ['Bridged Adapter', 'Virtual NIC VM dijembatani langsung ke kartu fisik host. VM bertindak seperti komputer mandiri di LAN fisik dan mendapatkan IP dari DHCP LAN.', 'Ya', 'Ya (Langsung dapat diakses)'],
            ['NAT (Network Address Translation)', 'VM berbagi IP host untuk akses keluar. IP privat VM disembunyikan di balik IP host.', 'Ya', 'Tidak langsung (Kecuali disetel Port Forwarding)'],
            ['Host-Only Adapter', 'Jaringan privat virtual tertutup yang hanya menghubungkan host dengan VM di dalam komputer yang sama.', 'Tidak', 'Tidak (Terisolasi total dari LAN luar)'],
            ['Internal Network', 'Jaringan virtual yang hanya menghubungkan antarmesin virtual di dalam host tanpa melibatkan host.', 'Tidak', 'Tidak']
          ]
        },
        tips: 'Snapshot VM digunakan untuk merekam state VM sesaat sebelum uji coba konfigurasi berisiko. Namun snapshot bukan pengganti backup permanen.'
      },
      {
        id: 'm2_server',
        title: '3. Layanan Jaringan Server Inti & Troubleshooting',
        content: `Prinsip empat layanan server fundamental TJKT:
1. DHCP Server (Port 67/68 UDP): Mendistribusikan parameter IP, subnet mask, default gateway, dan DNS server otomatis kepada klien dari daftar alamat (DHCP Pool). Jika klien memperoleh IP 169.254.x.x (APIPA), artinya klien gagal menghubungi DHCP Server.
2. DNS Server (Port 53 UDP/TCP): Menerjemahkan nama domain (misal smk.sch.id) ke alamat IP numerik. Jika ping ke IP server berhasil (misal ping 8.8.8.8 sukses) tetapi akses via domain gagal di browser, maka sumber masalah dipastikan pada layanan DNS.
3. Web Server (Port 80 HTTP / 443 HTTPS): Menyajikan halaman web ke browser client. Diagnosis service Linux yang gagal dilakukan dengan: cek \`systemctl status nginx/apache2\`, baca file error log di \`/var/log/\`, validasi file konfigurasi, lalu perbaiki parameter.
4. SSH Server (Port 22 TCP): Protokol administrasi remote berbasis command line yang terenkripsi aman untuk mengelola server jarak jauh.`
      }
    ],
    glossary: [
      { term: 'Hypervisor', definition: 'Perangkat lunak pengendali virtualisasi yang mengelola alokasi CPU, RAM, disk, dan adapter VM.' },
      { term: 'Snapshot', definition: 'Rekaman kondisi memori dan disk VM pada suatu waktu untuk kemudahan pemulihan (rollback).' },
      { term: 'Daemon / Service', definition: 'Program Linux yang berjalan di latar belakang (background) melayani request jaringan.' },
      { term: 'APIPA', definition: 'Automatic Private IP Addressing (169.254.0.0/16) saat klien gagal memperoleh IP dari DHCP server.' }
    ],
    examTips: [
      'Jika VM butuh diakses langsung oleh PC lain di jaringan LAN sekolah, modenya wajib Bridged Adapter.',
      'Jika ping IP berhasil tapi nama domain gagal dibuka, periksa DNS server.',
      'Jika service web server mati mendadak, SOP penanganannya adalah periksa status layanan (systemctl status) dan periksa file log.',
      'Backup data baru dapat dinyatakan andal jika telah dilakukan uji pemulihan (restore testing) secara berkala.'
    ]
  },

  // =========================================================================
  // MODUL 3
  // =========================================================================
  {
    id: 3,
    week: 3,
    title: 'Router, Switch, VLAN, Pengalamatan & Layanan Jaringan Dasar',
    subtitle: 'Prinsip kerja Layer 2 Switch vs Layer 3 Router, Access Port vs Trunk 802.1Q, Inter-VLAN routing, subnetting IPv4, tabel routing statis/default, NAT, dan perangkat penguji jaringan.',
    estimatedReadMinutes: 13,
    overview: 'Fokus pada fondasi arsitektur jaringan lokal (LAN) dan interkoneksi antarsubnet (WAN). Menjelaskan mekanisme switching berbasis MAC Address Table, segmentasi virtual broadcast domain melalui VLAN dan trunking, routing statis dan default, serta mitigasi gangguan pengalamatan IP.',
    competencies: [
      'Membedakan peran fungsional Hub (Layer 1), Switch (Layer 2), dan Router (Layer 3).',
      'Mengonfigurasi dan menganalisis Access Port, Trunk Port (802.1Q), dan Inter-VLAN Routing.',
      'Menghitung dan memvalidasi pengalamatan IPv4, subnet mask, default gateway, dan NAT.',
      'Menerapkan perintah diagnosis jaringan: Ping, Traceroute, ARP, dan tabel MAC.'
    ],
    sections: [
      {
        id: 'm3_perangkat',
        title: '1. Perbandingan Perangkat Jaringan: Hub, Switch & Router',
        content: `Perbedaan mendasar cara meneruskan data pada model jaringan:`,
        tableData: {
          headers: ['Perangkat', 'Lapisan OSI', 'Dasar Penerusan Data', 'Karakteristik Broadcast & Collision'],
          rows: [
            ['Hub', 'Layer 1 (Physical)', 'Sinyal elektrik (broadcast murni ke semua port tanpa filter)', '1 Collision Domain bersama untuk seluruh port, rawan tabrakan data (collision), tidak mempelajari alamat.'],
            ['Switch', 'Layer 2 (Data Link)', 'Alamat MAC tujuan (Destination MAC) melalui MAC Address Table', 'Masing-masing port memiliki collision domain terpisah; seluruh port berada dalam 1 broadcast domain yang sama.'],
            ['Router', 'Layer 3 (Network)', 'Alamat IP tujuan (Destination IP) melalui Routing Table', 'Memisahkan broadcast domain antarsubnet jaringan; meneruskan paket antar-jaringan berbeda.'],
            ['Access Point (AP)', 'Layer 2 (Data Link)', 'Menerjemahkan frame nirkabel IEEE 802.11 ke Ethernet 802.3', 'Menghubungkan klien wireless (laptop/HP) ke jaringan kabel distribusi.'],
            ['Modem', 'Layer 1-2', 'Modulasi dan demodulasi sinyal analog-ke-digital', 'Menghubungkan jaringan lokal ke saluran ISP (fiber, kabel koaksial, DSL, atau nirkabel).']
          ]
        }
      },
      {
        id: 'm3_vlan',
        title: '2. Virtual LAN (VLAN), Port Mode & Inter-VLAN Routing',
        content: `VLAN memecah switch fisik menjadi beberapa broadcast domain logis terpisah:
- Access Port: Port switch yang hanya melewatkan satu VLAN tunggal tanpa tag. Port ini dihubungkan ke perangkat akhir (end-device seperti PC klien, printer, telepon IP).
- Trunk Port: Port switch yang melewatkan trafik beberapa VLAN sekaligus antarswitch atau ke router menggunakan penandaan tag IEEE 802.1Q (VLAN ID).
- Inter-VLAN Routing: Karena tiap VLAN adalah subnet logis berbeda, dua VLAN tidak bisa saling kirim data tanpa perantara Layer 3. Diperlukan router (metode Router-on-a-Stick via sub-interface) atau Switch Layer 3 (via Switch Virtual Interface / SVI) dengan status routing aktif.`,
        keyPoints: [
          'Link antarswitch yang membawa VLAN 10, 20, dan 30 wajib berstatus Trunk.',
          'Port switch ke PC pengguna akhir wajib berstatus Access Port.',
          'Komunikasi antar-VLAN berbeda mutlak membutuhkan perutean Layer 3 (Inter-VLAN Routing).'
        ]
      },
      {
        id: 'm3_routing',
        title: '3. Konsep Routing Statis, Default Gateway & Diagnosis',
        content: `Routing menentukan jalur terbaik paket data keluar dari subnet lokal:
- Default Gateway: Alamat interface router lokal yang menjadi pintu keluar host menuju subnet lain atau internet.
- Static Route: Rute manual yang diketikkan administrator pada tabel routing dengan parameter network tujuan, subnet mask, dan next-hop IP.
- Default Route (0.0.0.0/0): Rute umum 'gateway of last resort' yang digunakan router ketika paket tujuan tidak cocok dengan rute spesifik mana pun di tabel routing.
- Network Address Translation (NAT): Mekanisme translasi IP privat (lokal) ke IP publik agar banyak host di LAN dapat mengakses internet secara bersamaan.
- Utilitas Diagnosis:
  * Ping: Menguji konektivitas dan waktu respons (RTT) bolak-balik menggunakan pesan ICMP Echo.
  * Traceroute: Menampilkan daftar setiap hop router yang dilewati paket menuju host tujuan melalui kenaikan nilai TTL (Time to Live).
  * ARP Table: Tabel pemetaan IP lokal ke MAC address kartu jaringan.
  * MAC Address Table: Tabel pada switch yang mencatat alamat MAC perangkat yang terhubung ke nomor port tertentu.`
      }
    ],
    glossary: [
      { term: 'IEEE 802.1Q', definition: 'Standar internasional untuk enkapsulasi VLAN tagging pada frame Ethernet.' },
      { term: 'CAM Table', definition: 'Content Addressable Memory table, nama teknis untuk MAC address table pada switch.' },
      { term: 'Next-Hop', definition: 'Alamat IP router tetangga berikutnya di sepanjang lintasan transmisi paket data.' },
      { term: 'Broadcast Domain', definition: 'Jangkauan wilayah jaringan di mana frame broadcast dapat diterima oleh semua host.' }
    ],
    examTips: [
      'Alamat MAC dipelajari switch dari Source MAC frame yang masuk pada port fisik.',
      'Jika ada dua VLAN berbeda ingin berkomunikasi, jawabannya adalah Inter-VLAN routing pada router atau switch Layer 3.',
      'Jika paket menuju IP yang tidak terdaftar di rute spesifik, router akan mengirimkan paket ke Default Route (jika ada).',
      'Metode troubleshooting ilmiah: ubah satu variabel dalam satu waktu, uji, dan catat hasilnya.'
    ]
  },

  // =========================================================================
  // MODUL 4
  // =========================================================================
  {
    id: 4,
    week: 4,
    title: 'K3LH, Budaya Kerja 5R, APD & Keselamatan Pekerjaan TJKT',
    subtitle: 'Hierarki pengendalian bahaya K3, APD pekerjaan ketinggian & kelistrikan, budaya 5R (Ringkas, Rapi, Resik, Rawat, Rajin), penanganan limbah serat optik, LOTO, dan ergonomi kerja.',
    estimatedReadMinutes: 11,
    overview: 'Keselamatan dan Kesehatan Kerja serta Lingkungan Hidup (K3LH) adalah fondasi profesional teknisi TJKT. Modul ini mengajarkan identifikasi bahaya, perhitungan risiko, protokol bekerja di ketinggian (tower/tiang), isolasi kelistrikan bertegangan (LOTO), penanganan serpihan kaca serat optik, dan penerapan budaya kerja 5R di laboratorium maupun lapangan.',
    competencies: [
      'Menerapkan hierarki pengendalian bahaya K3 (Eliminasi, Substitusi, Teknik, Administratif, APD).',
      'Menggunakan Alat Pelindung Diri (APD) yang tepat untuk pekerjaan ketinggian, listrik, dan fiber optik.',
      'Menerapkan prosedur Lockout/Tagout (LOTO) dan penanganan serpihan limbah serat optik sesuai SOP.',
      'Membudayakan prinsip 5R dan ergonomi kerja guna mencegah kecelakaan dan penyakit akibat kerja.'
    ],
    sections: [
      {
        id: 'm4_hierarki',
        title: '1. Konsep Bahaya, Risiko & Hierarki Pengendalian K3',
        content: `Dalam K3LH:
- Bahaya (Hazard): Sumber, situasi, atau tindakan yang berpotensi menimbulkan cedera, penyakit, atau kerusakan.
- Risiko (Risk): Kombinasi kemungkinan terjadinya bahaya dengan tingkat keparahan dampaknya.
- Kejadian Hampir Celaka (Near Miss): Insiden yang tidak menimbulkan cedera atau kerusakan fisik, namun tetap WAJIB dilaporkan dan dianalisis untuk mencegah kecelakaan serupa di masa depan.

Hierarki Pengendalian Bahaya (dari yang paling efektif hingga terakhir):`,
        tableData: {
          headers: ['Tingkat Pengendalian', 'Efektivitas', 'Deskripsi & Contoh Praktik TJKT'],
          rows: [
            ['1. Eliminasi', 'Paling Efektif', 'Menghilangkan sumber bahaya secara total dari pekerjaan (contoh: memindahkan pekerjaan penyambungan kabel dari atas tiang ke dalam mobil lab).'],
            ['2. Substitusi', 'Tinggi', 'Mengganti alat/bahan berbahaya dengan alternatif lebih aman (contoh: mengganti pembersih kimia beracun dengan cairan pembersih berbahan aman).'],
            ['3. Pengendalian Teknik', 'Menengah-Tinggi', 'Mengisolasi bahaya melalui rekayasa fisik (contoh: memasang pelindung penutup mesin, exhaust fan ventilasi udara ruang server, pembatas area).'],
            ['4. Pengendalian Administratif', 'Sedang', 'Mengatur cara kerja melalui SOP, pelatihan keselamatan, izin kerja ketinggian (work permit), rotasi kerja, dan rambu bahaya.'],
            ['5. APD (Alat Pelindung Diri)', 'Pertahanan Terakhir', 'Perlengkapan yang dikenakan pekerja untuk melindungi tubuh dari bahaya sisa (contoh: helm, kacamata, harness, sepatu safety). APD tidak menghilangkan sumber bahaya.']
          ]
        }
      },
      {
        id: 'm4_apd_spesifik',
        title: '2. APD Spesifik & SOP Keselamatan Kerja TJKT',
        content: `Penerapan perlindungan kerja sesuai bidang risiko:
1. Pekerjaan di Ketinggian (Tiang/Tower): Wajib memakai Full-Body Safety Harness dengan lanyard peredam kejut yang ditambatkan ke titik angkur (anchor point) yang teruji kokoh, helm pengikat dagu, dan sepatu safety. Jika angin kencang atau hujan petir datang, pekerjaan wajib segera dihentikan demi keselamatan.
2. Penanganan Serpihan Fiber Optik: Sisa potongan kaca mikro saat cleaving sangat tajam, tak terlihat, dan dapat masuk ke pembuluh darah jika menusuk kulit atau tertelan. Wajib mengenakan kacamata pelindung (safety glasses), dilarang meniup serpihan, dilarang makan/minum di area kerja, dan pecahan serat kaca wajib dikumpulkan dalam wadah limbah khusus tertutup (sharps container).
3. Pekerjaan Kelistrikan & LOTO: Sebelum memperbaiki power supply atau kabel daya bertegangan, matikan sakelar pemutus, isolasi sumber listrik, dan terapkan Lockout/Tagout (gembok dan label peringatan). Selalu verifikasi tidak ada tegangan tersisa menggunakan multimeter sebelum bekerja.
4. Penggunaan APAR: APAR jenis CO2 atau Clean Agent paling tepat untuk kebakaran kelas C (peralatan listrik bertegangan) karena tidak meninggalkan residu korosif pada perangkat server.`
      },
      {
        id: 'm4_budaya_5r',
        title: '3. Budaya Kerja 5R (Seiri, Seiton, Seiso, Seiketsu, Shitsuke)',
        content: `Prinsip efisiensi dan kerapian lingkungan kerja industri:
- Ringkas (Seiri): Memilah barang yang diperlukan dan menyingkirkan yang tidak diperlukan dari meja/ruang kerja.
- Rapi (Seiton): Menata barang pada tempat yang jelas dan memberi label identitas agar mudah diambil, digunakan, dan dikembalikan.
- Resik (Seiso): Membersihkan area dan peralatan kerja sambil memeriksa adanya kondisi tidak normal (kabel lecet, baut kendur).
- Rawat (Seiketsu): Menstandarkan kondisi Ringkas, Rapi, dan Resik agar dipertahankan secara konsisten.
- Rajin (Shitsuke): Membiasakan disiplin menjalankan standar secara berkesinambungan sebagai etos kerja pribadi.`,
        keyPoints: [
          'Ergonomi kerja komputer: sesuaikan tinggi kursi agar siku 90 derajat, sejajarkan pandangan mata ke sepertiga atas monitor, dan beri jeda peregangan teratur.',
          'Kabel data yang melintang di lantai jalan orang adalah bahaya tersandung; segera pindahkan atau tata menggunakan ducting pengaman.'
        ]
      }
    ],
    glossary: [
      { term: 'LOTO', definition: 'Lockout/Tagout, prosedur isolasi energi berbahaya dengan memasang gembok fisik dan label peringatan.' },
      { term: 'Near Miss', definition: 'Kejadian hampir celaka yang berpotensi menjadi kecelakaan fatal bila tidak dievaluasi.' },
      { term: 'ESD', definition: 'Electrostatic Discharge, pelepasan muatan listrik statis dari tubuh manusia ke komponen sirkuit elektronik sensitif.' },
      { term: 'Ergonomi', definition: 'Ilmu penyesuaian lingkungan dan alat kerja terhadap anatomi dan kemampuan fisik tubuh manusia.' }
    ],
    examTips: [
      'Pengendalian bahaya paling efektif dalam hierarki K3 adalah Eliminasi.',
      'Sisa serpihan potongan kaca serat optik wajib dibuang ke wadah limbah khusus yang tertutup.',
      'Jika muncul angin kencang saat bekerja di ketinggian, tindakan tepat adalah menghentikan pekerjaan dan mengevaluasi keselamatan.',
      'Rapi dalam 5R ditunjukkan dengan memberi lokasi dan label alat agar mudah diambil dan dikembalikan.'
    ]
  },

  // =========================================================================
  // MODUL 5
  // =========================================================================
  {
    id: 5,
    week: 5,
    title: 'Media Tembaga UTP/STP, Terminasi RJ45, Pengujian & Topologi',
    subtitle: 'Kabel twisted pair Cat5e/Cat6, standar susunan pinout T568A vs T568B, straight vs crossover, alat crimping & cable tester, mitigasi EMI/crosstalk, batas jarak 100m, dan komparasi topologi jaringan.',
    estimatedReadMinutes: 13,
    overview: 'Media transmisi tembaga adalah tulang punggung jaringan lokal (LAN). Modul ini mengulas karakteristik fisik kabel UTP/STP, standar internasional urutan terminasi T568A dan T568B, teknik crimping RJ45 yang benar, pengujian integritas kabel dengan wire mapper tester, serta analisis kelebihan dan kekurangan topologi fisik (Star, Mesh, Bus, Ring, Tree).',
    competencies: [
      'Membedakan spesifikasi kabel UTP, STP, Cat5e, dan Cat6 serta batas kanal 100 meter.',
      'Menerapkan susunan pinout T568A dan T568B untuk pembuatan kabel Straight-through dan Crossover.',
      'Menganalisis hasil pengujian cable tester (pass, open, short, miswire) dan faktor penyebab crosstalk/EMI.',
      'Mengevaluasi kelebihan, kelemahan, dan skenario penerapan topologi jaringan komputer.'
    ],
    sections: [
      {
        id: 'm5_kabel',
        title: '1. Karakteristik Kabel Tembaga & Batas Standar Kanal',
        content: `Kabel twisted pair memanfaatkan lilitan pasangan kawat untuk meniadakan gangguan noise:
- UTP (Unshielded Twisted Pair): Kabel tanpa pelindung logam tambahan, murah, fleksibel, standar untuk instalasi indoor gedung.
- STP (Shielded Twisted Pair): Kabel berpelindung foil/anyaman logam untuk meredam interferensi elektromagnetik (EMI) di lingkungan pabrik/mesin listrik. STP efektif HANYA jika dipasang dengan konektor shielded dan grounding yang terhubung sempurna.
- Kategori Kabel:
  * Cat5e: Frekuensi kerja hingga 100 MHz, mendukung Gigabit Ethernet (1000BASE-T) hingga 100 meter.
  * Cat6: Frekuensi kerja hingga 250 MHz, memiliki separator fisik (spline) di tengah untuk meredam Near-End Crosstalk (NEXT) lebih baik, mendukung hingga 10 Gbps pada jarak terbatas (<55m).
- Batas Kanal 100 Meter: Sesuai standar TIA/EIA-568, panjang total kanal Ethernet tembaga maksimal 100 meter (90 meter kabel horizontal permanen di dinding/plafon + 10 meter total patch cord). Jika jarak >100m, koneksi akan mengalami redaman (attenuation) tinggi dan tidak stabil; solusinya gunakan switch perantara atau ganti media ke fiber optik.`,
        keyPoints: [
          'Attenuation adalah pelemahan kekuatan sinyal seiring pertambahan jarak media.',
          'Crosstalk adalah gangguan induksi sinyal antar-pasangan kawat yang berdekatan di dalam satu kabel.'
        ]
      },
      {
        id: 'm5_terminasi',
        title: '2. Terminasi Konektor Modular RJ45 (T568A & T568B)',
        content: `Standar urutan warna 8 pin konektor RJ45 (dilihat dari arah tembaga pin menghadap ke atas):`,
        tableData: {
          headers: ['Nomor Pin', 'Standar T568A', 'Standar T568B'],
          rows: [
            ['Pin 1', 'Putih - Hijau', 'Putih - Oranye'],
            ['Pin 2', 'Hijau', 'Oranye'],
            ['Pin 3', 'Putih - Oranye', 'Putih - Hijau'],
            ['Pin 4', 'Biru', 'Biru'],
            ['Pin 5', 'Putih - Biru', 'Putih - Biru'],
            ['Pin 6', 'Oranye', 'Hijau'],
            ['Pin 7', 'Putih - Cokelat', 'Putih - Cokelat'],
            ['Pin 8', 'Cokelat', 'Cokelat']
          ]
        },
        tips: 'Kabel Straight-Through menggunakan standar yang sama di kedua ujung (A-A atau B-B). Kabel Crossover menggunakan standar berbeda (A di satu ujung dan B di ujung lainnya).'
      },
      {
        id: 'm5_tester_topologi',
        title: '3. Pengujian Kabel & Komparasi Topologi Jaringan',
        content: `Pengujian dan topologi LAN:
- Pengujian Kabel dengan Cable Tester:
  * Open / Putus: Salah satu atau lebih kawat tidak tersambung.
  * Short / Hubung Singkat: Dua atau lebih konduktor saling bersentuhan.
  * Miswire: Urutan pin salah tertukar susunan warnanya.
  * Best practice crimping: Jangan membuka puntiran kabel terlalu panjang (>13 mm) dekat konektor RJ45 karena akan menaikkan crosstalk. Jaket luar kabel harus terjepit di dalam konektor RJ45.
- Evaluasi Topologi Jaringan:
  * Topologi Star: Semua workstation terhubung ke switch sentral. Keunggulan: mudah dikelola, jika satu kabel klien putus klien lain tidak terganggu. Kelemahan: switch pusat menjadi titik kegagalan tunggal (single point of failure).
  * Topologi Mesh: Setiap node memiliki tautan langsung point-to-point ke node lain. Keunggulan: redundansi tinggi dan toleransi kesalahan maksimal. Kelemahan: kebutuhan kabel sangat banyak dan biaya tinggi.
  * Topologi Bus: Berbagi satu kabel backbone utama dengan terminator di ujung. Murah namun gangguan backbone mematikan seluruh jaringan.
  * Topologi Ring: Node membentuk cincin melingkar, frame data berputar searah menggunakan token.
  * Topologi Tree: Struktur hierarkis bertingkat yang menggabungkan beberapa switch bintang.`
      }
    ],
    glossary: [
      { term: 'RJ45 (8P8C)', definition: 'Konektor modular 8 posisi 8 kontak untuk terminasi kabel UTP Ethernet.' },
      { term: 'Crimping Tool', definition: 'Tang khusus untuk menekan bilah pin tembaga konektor modular ke inti kawat kabel.' },
      { term: 'Spline', definition: 'Batang silang plastik di dalam kabel Cat6 untuk memisahkan keempat pasangan kawat agar bebas crosstalk.' },
      { term: 'Permanent Link', definition: 'Bagian bentangan kabel instalasi tetap yang tertanam di dinding antara patch panel dan faceplate outlet (maks 90m).' }
    ],
    examTips: [
      'Jika kedua ujung kabel menggunakan susunan warna T568B, maka jenis kabel tersebut adalah Straight-through.',
      'Jika ujung satu T568A dan ujung lainnya T568B, maka jenis kabelnya adalah Crossover.',
      'Batas panjang kanal Ethernet tembaga standar adalah 100 meter.',
      'Penyebab utama crosstalk meningkat drastis pada terminasi RJ45 adalah membuka puntiran kabel terlalu panjang sebelum konektor.'
    ]
  },

  // =========================================================================
  // MODUL 6
  // =========================================================================
  {
    id: 6,
    week: 6,
    title: 'Fiber Optik, Arsitektur FTTH, Splicing & Pengukuran Link Budget',
    subtitle: 'Struktur serat optik (core, cladding), single-mode vs multimode, elemen GPON FTTH (OLT, ODC, ODP, ONT, Splitter), prosedur fusion splicing presisi, rumus link budget, dan alat ukur optik (OTDR, OPM, OLS, VFL).',
    estimatedReadMinutes: 15,
    overview: 'Teknologi serat optik mentransmisikan data berkecepatan gigabit melalui pulsa cahaya. Modul ini mengajarkan prinsip propagasi cahaya dalam serat optik, arsitektur Fiber to the Home (FTTH), fungsi komponen pasif dan aktif, teknik penyambungan las fusion splicing, kalkulasi anggaran redaman (link budget), serta verifikasi redaman dengan OPM dan OTDR.',
    competencies: [
      'Membedakan karakteristik Single-mode Fiber (SMF) dan Multimode Fiber (MMF).',
      'Mengidentifikasi komponen arsitektur FTTH: OLT, ODC, ODP, ONT, Splitter, Closure, dan Drop Cable.',
      'Menerapkan SOP penyambungan serat optik dengan Fiber Cleaver dan Fusion Splicer.',
      'Menghitung Link Budget optik dan menganalisis pengukuran dengan OPM, OLS, VFL, dan OTDR.'
    ],
    sections: [
      {
        id: 'm6_struktur',
        title: '1. Struktur Serat Optik & Tipe Serat',
        content: `Struktur anatomi serat optik terdiri dari:
- Core (Inti): Lapisan paling dalam terbuat dari silika kaca murni dengan indeks bias (n1) lebih tinggi, tempat berkas cahaya merambat.
- Cladding (Selubung Inti): Lapisan pembungkus core dengan indeks bias (n2) lebih rendah. Perbedaan indeks bias ini menghasilkan fenomena Total Internal Reflection (pemantulan internal total) sehingga cahaya tetap terkungkung di dalam core.
- Coating / Buffer: Lapisan plastik pelindung serat dari goresan fisik dan kelembapan.

Komparasi Single-mode vs Multimode:`,
        tableData: {
          headers: ['Parameter', 'Single-Mode Fiber (SMF)', 'Multimode Fiber (MMF)'],
          rows: [
            ['Diameter Core', 'Kecil (~9 mikron)', 'Besar (50 atau 62,5 mikron)'],
            ['Sumber Cahaya', 'Laser Diode terfokus', 'LED atau VCSEL'],
            ['Panjang Gelombang', '1310 nm, 1490 nm, 1550 nm', '850 nm, 1300 nm'],
            ['Jarak Transmisi', 'Sangat Jauh (puluhan hingga ratusan kilometer)', 'Pendek (<500 meter - beberapa kilometer)'],
            ['Dispersi Modal', 'Tidak ada (hanya satu mode cahaya dominan)', 'Tinggi (akibat banyak lintasan mode pantulan)'],
            ['Penerapan', 'Jaringan FTTH provider, backbone antar-kota, ISP', 'Koneksi antarrack di dalam Data Center, backbone LAN kampus']
          ]
        }
      },
      {
        id: 'm6_ftth',
        title: '2. Arsitektur Jaringan FTTH (Fiber to the Home)',
        content: `Jaringan FTTH berbasis teknologi GPON (Gigabit Passive Optical Network) menghubungkan Central Office ke rumah pelanggan:
1. OLT (Optical Line Terminal): Perangkat aktif di Central Office penyedia layanan yang mengirim sinyal downstream (1490 nm) dan menerima upstream (1310 nm).
2. ODC (Optical Distribution Cabinet): Kabinet distribusi optik outdoor yang menjadi titik terminasi kabel feeder dari OLT dan menampung splitter tahap pertama.
3. ODP (Optical Distribution Point): Kotak distribusi kecil di tiang listrik atau dinding perumahan tempat kabel distribusi dibagi ke kabel drop pelanggan.
4. Optical Splitter: Komponen pasif murni yang membagi daya sinyal optik dari 1 core menjadi beberapa keluaran (misal 1:4 redaman ~7.2 dB; 1:8 redaman ~10.5 dB; 1:16 redaman ~14 dB).
5. Drop Cable: Kabel fiber outdoor berkawat baja penguat (messenger wire) dari ODP menuju roset di rumah pelanggan.
6. ONT / ONU: Perangkat aktif di sisi pelanggan yang mengubah sinyal optik menjadi port Ethernet RJ45, telepon, dan Wi-Fi.
7. Aksesoris Pendukung:
   - Joint Closure: Wadah pelindung kedap air untuk sambungan kabel optik di udara atau manhole bawah tanah.
   - Pigtail: Potongan kabel serat pendek dengan satu ujung berkonektor fabrikasi dan ujung lain terbuka untuk disambung las.
   - Patch Cord Fiber: Kabel jumper dengan konektor di kedua ujungnya (SC/UPC warna biru atau SC/APC warna hijau).`
      },
      {
        id: 'm6_splicing_pengukuran',
        title: '3. Fusion Splicing & Alat Ukur Serat Optik',
        content: `Prosedur penyambungan dan verifikasi redaman:
- SOP Fusion Splicing:
  1. Pasang protection sleeve ke salah satu serat.
  2. Kupas jaket dan coating serat menggunakan fiber stripper.
  3. Bersihkan serat telanjang menggunakan alkohol isopropil (IPA) murni &gt;95% dan tisu bebas serat (lint-free wipes).
  4. Potong tegak lurus rata presisi menggunakan Fiber Cleaver. Dilarang menyentuh ujung serat yang sudah di-cleave!
  5. Tempatkan pada V-groove Fusion Splicer, lakukan alignment otomatis dan pemanasan busur listrik.
  6. Geser protection sleeve ke atas titik sambungan dan panaskan di heater oven splicer.
- Alat Ukur Optik:
  * VFL (Visual Fault Locator): Sinar laser merah tampak (650 nm) untuk melacak patahan kabel dan tracing core jarak pendek.
  * OLS (Optical Light Source) + OPM (Optical Power Meter): Mengukur redaman total link (insertion loss). Wajib disetel pada panjang gelombang yang sama dan dilakukan zero/reference setting sebelum pengujian.
  * OTDR (Optical Time Domain Reflectometer): Mengirimkan pulsa laser dan membaca kurva pantulan backscatter untuk mengukur jarak kabel secara tepat, mengidentifikasi event loss sambungan, dan menemukan lokasi titik putus beberapa kilometer dari lokasi ukur.`
      }
    ],
    glossary: [
      { term: 'Fusion Splicer', definition: 'Alat penyambung dua serat optik secara permanen melalui peleburan busur listrik mikro.' },
      { term: 'Fiber Cleaver', definition: 'Alat pemotong presisi tinggi untuk menghasilkan penampang serat optik rata tegak lurus sempurna.' },
      { term: 'Macrobend', definition: 'Kebocoran cahaya keluar dari core akibat kabel serat optik tertekuk melebihi batas radius kelengkungan.' },
      { term: 'Link Budget', definition: 'Kalkulasi total batas toleransi redaman seluruh komponen (kabel + splice + konektor + splitter) agar sinyal dapat diterima dengan andal.' }
    ],
    examTips: [
      'Alat pemotong presisi untuk menghasilkan ujung serat rata sebelum splicing adalah Fiber Cleaver.',
      'Perangkat pelanggan yang mengubah sinyal optik menjadi port data LAN adalah ONT/ONU.',
      'Alat untuk memperkirakan lokasi putus serat optik beberapa kilometer dari titik ukur adalah OTDR.',
      'Sebelum mengukur dengan OPM dan OLS, pastikan panjang gelombang pada kedua alat telah disamakan dan konektor dalam kondisi bersih (Inspect-Clean-Inspect).'
    ]
  },

  // =========================================================================
  // MODUL 7
  // =========================================================================
  {
    id: 7,
    week: 7,
    title: 'Model OSI/TCP-IP, Pengalamatan IP, Protokol Layanan & Keamanan WLAN',
    subtitle: '7 Lapisan OSI vs 4 Lapisan TCP/IP, TCP vs UDP, format IPv4 & IPv6, protokol web (HTTP/HTTPS TLS), sistem DNS & DHCP, konfigurasi keamanan WLAN (SSID & WPA3), dan prinsip kerja firewall.',
    estimatedReadMinutes: 14,
    overview: 'Mengupas arsitektur komunikasi data berlapis. Siswa mempelajari alur enkapsulasi dan dekapsulasi paket melalui model OSI dan TCP/IP, komparasi protokol transport, prinsip pengalamatan internet masa kini, serta fondasi keamanan nirkabel dan penyaringan lalu lintas jaringan.',
    competencies: [
      'Menganalisis fungsi 7 Lapisan OSI dan 4 Lapisan TCP/IP dalam transmisi paket data.',
      'Membandingkan karakteristik protokol transport TCP (connection-oriented) dan UDP (connectionless).',
      'Mengidentifikasi protokol layanan: DHCP, DNS, HTTP, dan HTTPS berbasis enkripsi TLS.',
      'Menerapkan konfigurasi keamanan jaringan nirkabel (SSID, WPA3) dan aturan penyaringan firewall.'
    ],
    sections: [
      {
        id: 'm7_osi',
        title: '1. Model 7 Lapisan OSI & 4 Lapisan TCP/IP',
        content: `Model OSI menyediakan kerangka konseptual pemrosesan jaringan secara berlapis:`,
        tableData: {
          headers: ['No. & Lapisan OSI', 'Padanan TCP/IP', 'PDU', 'Fungsi Utama & Contoh Protokol/Perangkat'],
          rows: [
            ['7. Application Layer', 'Application', 'Data', 'Antarmuka langsung dengan aplikasi pengguna (HTTP, HTTPS, DNS, DHCP, FTP, SMTP).'],
            ['6. Presentation Layer', 'Application', 'Data', 'Format representasi data, kompresi berkas, dan enkripsi/dekripsi keamanan (TLS, SSL, JPEG, ASCII).'],
            ['5. Session Layer', 'Application', 'Data', 'Pembentukan, pemeliharaan, dan penghentian sesi komunikasi antardialog aplikasi.'],
            ['4. Transport Layer', 'Transport', 'Segment', 'Komunikasi ujung-ke-ujung (end-to-end), segmentasi data, nomor port, kontrol aliran, dan reliabilitas (TCP & UDP).'],
            ['3. Network Layer', 'Internet', 'Packet', 'Pengalamatan logis (IP Address) dan penentuan rute paket antarjaringan (Router, IPv4, IPv6, ICMP).'],
            ['2. Data Link Layer', 'Network Access', 'Frame', 'Pengemasan data menjadi frame, pengalamatan fisik MAC Address, kendali akses media CSMA (Switch, Bridge, NIC).'],
            ['1. Physical Layer', 'Network Access', 'Bit', 'Transmisi bit biner mentah melalui sinyal elektrik, optik, atau radio (Kabel UTP, Fiber, Hub, Konektor RJ45).']
          ]
        }
      },
      {
        id: 'm7_transport_ip',
        title: '2. Protokol Transport (TCP vs UDP) & Pengalamatan IP',
        content: `Perbandingan dua protokol transport utama pada Layer 4:
- TCP (Transmission Control Protocol):
  * Bersifat Connection-oriented (diawali 3-Way Handshake: SYN -> SYN-ACK -> ACK).
  * Menjamin urutan data dan keandalan (Reliable Delivery): setiap segment memiliki Sequence Number dan memerlukan konfirmasi tanda terima (ACK). Jika hilang di jalan, otomatis dilakukan pengiriman ulang (retransmisi).
  * Cocok untuk aplikasi kritis integritas data: Web (HTTP/HTTPS), File Transfer (FTP/SFTP), Email (SMTP/IMAP), Database.
- UDP (User Datagram Protocol):
  * Bersifat Connectionless (tidak ada handshake awal).
  * Tidak menjamin urutan data dan tanpa acknowledgement (Unreliable Delivery) guna meminimalkan overhead header (hanya 8 byte).
  * Cocok untuk transmisi waktu nyata (real-time) yang toleran terhadap sedikit packet loss: Video Streaming live, VoIP panggilan suara, Game online, DNS query.

Pengalamatan IPv4 vs IPv6:
- IPv4: Panjang alamat 32 bit, format 4 oktet desimal (misal 192.168.1.1). Ruang alamat sekitar 4,3 miliar alamat unik.
- IPv6: Panjang alamat 128 bit, format 8 grup heksadesimal dipisahkan titik dua (misal 2001:db8:85a3::8a2e:370:7334). Menyediakan ruang alamat yang masif dan mendukung autokonfigurasi SLAAC tanpa harus bergantung pada NAT.`
      },
      {
        id: 'm7_wlan_security',
        title: '3. Protokol Layanan Web, Keamanan WLAN & Firewall',
        content: `Pengamanan layanan dan konektivitas nirkabel:
1. HTTP vs HTTPS: HTTP mengirim data teks polos tanpa enkripsi melalui port 80. HTTPS (Port 443) menggunakan protokol keamanan Transport Layer Security (TLS) untuk mengenkripsi seluruh muatan data dan memverifikasi sertifikat keaslian server.
2. Pengamanan WLAN (Wi-Fi):
   - SSID (Service Set Identifier): Nama pengenal jaringan nirkabel yang dipancarkan access point.
   - Standar Enkripsi: Hindari WEP dan WPA lawas. Gunakan WPA2-AES atau WPA3 yang memakai Simultaneous Authentication of Equals (SAE) untuk menangkal serangan brute-force dictionary attack offline.
   - Manajemen Access Point: Kredensial administrator pabrik (seperti admin/admin) wajib segera diganti dengan kata sandi kuat, lakukan isolasi jaringan tamu (Guest VLAN), dan perbarui firmware secara berkala.
3. Firewall: Perangkat atau software penyaring lalu lintas data yang mengizinkan (permit) atau menolak (drop/reject) paket berdasarkan kombinasi aturan: IP sumber/tujuan, nomor port layanan, protokol, dan status koneksi (Stateful Inspection).`
      }
    ],
    glossary: [
      { term: 'PDU', definition: 'Protocol Data Unit, nama bentuk data pada tiap lapisan model OSI (Bit, Frame, Packet, Segment).' },
      { term: 'WPA3', definition: 'Standar keamanan nirkabel generasi terkini dengan enkripsi 192-bit dan proteksi jabat tangan SAE.' },
      { term: 'TLS', definition: 'Transport Layer Security, protokol kriptografi pengganti SSL untuk komunikasi terenkripsi di internet.' },
      { term: 'Stateful Firewall', definition: 'Firewall pintar yang memantau status sesi koneksi aktif untuk menyaring paket data secara dinamis.' }
    ],
    examTips: [
      'Lampu link pada NIC mati menunjukkan permasalahan pada Physical Layer (Layer 1).',
      'Switch memilih port keluaran berdasarkan Alamat MAC tujuan pada Data Link Layer (Layer 2).',
      'Router meneruskan paket berdasarkan Alamat IP tujuan pada Network Layer (Layer 3).',
      'Streaming real-time toleran terhadap kehilangan kecil menggunakan protokol transport UDP.'
    ]
  },

  // =========================================================================
  // MODUL 8
  // =========================================================================
  {
    id: 8,
    week: 8,
    title: 'Alat Ukur Jaringan, SOP Pengukuran & Pemeliharaan Terpadu',
    subtitle: 'Penguasaan instrumen Cable Tester, Multimeter, OPM, OLS, OTDR, Spectrum Analyzer, Wi-Fi Analyzer, Tone Probe, prosedur zeroing & kalibrasi, dokumentasi pelaporan, dan strategi ujian TKA.',
    estimatedReadMinutes: 13,
    overview: 'Merangkum keterampilan praktis pengujian infrastruktur kabel tembaga, nirkabel, dan serat optik. Menekankan kepatuhan Standar Operasional Prosedur (SOP) industri, penanganan instrumen ukur terkalibrasi, interpretasi data grafik, pembuatan laporan hasil uji terverifikasi, dan persiapan menghadapi ujian kejuruan TKA.',
    competencies: [
      'Menentukan alat ukur yang tepat sesuai besaran dan media jaringan yang diuji.',
      'Menerapkan SOP pengoperasian alat ukur: kalibrasi acuan, zeroing reference, dan pembersihan konektor.',
      'Melakukan pemeliharaan dan penyimpanan alat ukur industri telekomunikasi (dry storage & battery care).',
      'Menganalisis hasil pengukuran jaringan dan menyusun laporan pengukuran resmi.'
    ],
    sections: [
      {
        id: 'm8_katalog_alat',
        title: '1. Matriks Instrumen Alat Ukur Jaringan TJKT',
        content: `Fungsi spesifik setiap instrumen pengujian jaringan telekomunikasi:`,
        tableData: {
          headers: ['Nama Alat Ukur', 'Media / Objek Uji', 'Besaran / Fungsi yang Diukur', 'Karakteristik & Indikator Output'],
          rows: [
            ['LAN Cable Tester', 'Kabel Tembaga UTP/STP', 'Kontinuitas 8 pin kawat tembaga', 'LED 1-8 menyala berurutan (mendeteksi Pass, Open, Short, Miswire).'],
            ['Multimeter (AVO Meter)', 'Rangkaian Listrik / Perangkat', 'Tegangan (V), Arus (A), Hambatan (Ohm)', 'Angka display digital/jarum analog; menguji voltase adaptor daya dan kontinuitas sirkuit.'],
            ['Optical Power Meter (OPM)', 'Kabel Serat Optik', 'Daya optik masuk (dBm) dan rugi daya/loss (dB)', 'Menampilkan angka daya optik pada panjang gelombang terkalibrasi (1310/1490/1550 nm).'],
            ['Optical Light Source (OLS)', 'Kabel Serat Optik', 'Sumber pancaran sinar laser stabil', 'Dipasangkan dengan OPM untuk pengukuran redaman total link dari ujung ke ujung.'],
            ['Visual Fault Locator (VFL)', 'Kabel Serat Optik', 'Sumber sinar laser merah tampak (~650 nm)', 'Pendaran cahaya merah pada titik kabel retak, lekukan tajam, atau salah core jarak dekat.'],
            ['OTDR', 'Kabel Serat Optik', 'Jejak grafis hamburan balik (backscatter)', 'Menghitung jarak kilometer, event loss sambungan splice, loss konektor, dan titik patah serat.'],
            ['Wi-Fi Analyzer', 'Jaringan Nirkabel (WLAN)', 'Peta kanal, level RSSI (dBm), SSID sekitar', 'Grafik pemetaan interferensi dan kepadatan kanal frekuensi 2.4 GHz dan 5 GHz.'],
            ['Spectrum Analyzer', 'Spektrum Frekuensi Radio (RF)', 'Distribusi daya terhadap frekuensi sinyal mentah', 'Mendeteksi sumber radiasi interferensi non-Wi-Fi (radar, microwave, motor).'],
            ['Tone Generator & Probe', 'Kabel Tembaga Banyak Saluran', 'Induksi sinyal nada frekuensi audio', 'Melacak pasangan kawat kabel tertentu di antara tumpukan kabel patch panel.'],
            ['Loopback Plug', 'Port Antarmuka NIC / Switch', 'Loopback transmisi TX langsung ke RX', 'Menguji fungsionalitas sirkuit internal port perangkat tanpa terhubung ke jaringan luar.']
          ]
        }
      },
      {
        id: 'm8_sop_pengukuran',
        title: '2. Prosedur Operasional Baku (SOP) & Akurasi Pengujian',
        content: `Tahapan krusial untuk menghasilkan data pengukuran yang valid dan dapat dipertanggungjawabkan:
1. Kalibrasi Alat: Proses membandingkan alat ukur terhadap acuan standar laboratorium terakreditasi untuk memastikan alat tidak mengalami deviasi ukur. Alat yang masa kalibrasinya telah lewat tidak boleh digunakan untuk pengambilan keputusan resmi sampai dikalibrasi ulang.
2. Zero / Reference Setting: Sebelum mengukur redaman kabel optik riil dengan OLS dan OPM, teknisi wajib melakukan zeroing menggunakan kabel referensi pendek dan adapter standar agar redaman bawaan alat tidak ikut terhitung sebagai redaman kabel proyek.
3. Pencocokan Panjang Gelombang: Jika OLS memancarkan laser pada panjang gelombang 1310 nm, maka sensor OPM wajib disetel pada 1310 nm. Perbedaan setelan panjang gelombang akan menghasilkan nilai pembacaan yang keliru.
4. Inspeksi & Pembersihan (Inspect-Clean-Inspect): Permukaan ujung konektor (ferrule) harus selalu diperiksa kebersihannya sebelum dicolokkan ke alat ukur. Debu mikro dapat menggores lensa sensor optik.
5. Pemeliharaan dan Penyimpanan: Bersihkan bodi alat setelah dipakai, pasang selalu penutup debu (dust cap), simpan dalam hard case busa di lingkungan kering dan terkontrol suhunya, serta periksa kondisi baterai secara berkala.`,
        keyPoints: [
          'Jika hasil pengukuran tidak stabil: periksa kekencangan koneksi, bersihkan ulang konektor, cek tegangan baterai alat, dan ulangi kalibrasi reference secara terkendali.',
          'Laporan pengujian resmi minimal mencatat: identitas kabel/link, tanggal/jam, model dan nomor seri alat, nama operator penguji, nilai hasil uji (dB/dBm), dan keputusan Pass/Fail.'
        ]
      },
      {
        id: 'm8_strategi_tka',
        title: '3. Strategi Efektif Menghadapi Asesmen TKA SMK',
        content: `Panduan taktis pengerjaan 3 format soal TKA:
- Pilihan Ganda (PG 1–30): Baca kasus dengan cermat, identifikasi kata kunci utama (apakah menanyakan peran profesi, perangkat fisik, protokol, atau langkah penanganan), eliminasi opsi yang jelas keliru, lalu pilih jawaban terbaik.
- PGK Kategori Benar / Salah (31–40): Setiap baris pernyataan dinilai secara independen berdasarkan teori baku TJKT. Jangan berasumsi pola jawaban harus seimbang.
- PGK MCMA (41–50): Jawaban benar dipastikan lebih dari satu (umumnya 3 opsi tepat). Waspadai opsi jebakan yang menyarankan tindakan pintas non-SOP (seperti menghapus log, mengubah IP sembarangan, mengabaikan izin, atau menyalahkan pelanggan tanpa pemeriksaan).`
      }
    ],
    glossary: [
      { term: 'Kalibrasi', definition: 'Proses verifikasi dan penyesuaian instrumen terhadap standar acuan baku yang tertelusur (traceable).' },
      { term: 'Reference Setting', definition: 'Penetapan nilai acuan dasar 0 dB sebelum pengujian redaman optik dilakukan.' },
      { term: 'Distance to Fault', definition: 'Perkiraan jarak dari instrumen ke titik lokasi kerusakan berdasarkan waktu rambat sinyal pantul.' },
      { term: 'Event Loss', definition: 'Penurunan daya optik pada titik sambungan las (splice) atau konektor yang terdeteksi pada kurva OTDR.' }
    ],
    examTips: [
      'Alat untuk mengukur loss total link fiber dari ujung ke ujung adalah kombinasi Optical Light Source (OLS) dan Optical Power Meter (OPM).',
      'Jika masa kalibrasi alat ukur telah lewat, tindakannya adalah tidak menggunakannya untuk keputusan resmi sampai diverifikasi/dikalibrasi ulang sesuai prosedur.',
      'Alat untuk melacak kabel tembaga tertentu di antara kumpulan banyak kabel adalah Tone Generator and Probe.',
      'Penyimpanan alat ukur yang benar adalah dibersihkan, diberi dust cap, dimasukkan case, dan disimpan di tempat kering sesuai suhu rekomendasi.'
    ]
  }
];

export function getLearningModule(weekId: number): LearningModule | undefined {
  return LEARNING_MODULES.find(m => m.week === weekId);
}
