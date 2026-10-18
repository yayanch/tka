import { Question } from '../../types/quiz';

export const MINGGU_7_QUESTIONS: Question[] = [
  {
    "id": "m7_q1",
    "week": 7,
    "number": 1,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "lapisan OSI yang menangani sinyal, konektor, media, bit, dan karakteristik fisik transmisi. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Physical Layer (Layer 1) memproses transmisi bit biner mentah melalui sinyal tegangan listrik, pulsa cahaya, atau gelombang radio.",
    "options": [
      "Application Layer",
      "Network Layer",
      "Session Layer",
      "Presentation Layer",
      "Physical Layer"
    ],
    "correctAnswer": "E",
    "correctOptionIndex": 4
  },
  {
    "id": "m7_q2",
    "week": 7,
    "number": 2,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "lapisan yang menangani frame, alamat MAC, akses media, dan switching lokal. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Data Link Layer (Layer 2) mengemas bit menjadi frame, menyematkan physical MAC address, dan mengatur kontrol akses media (CSMA/CD / CSMA/CA).",
    "options": [
      "Session Layer",
      "Transport Layer",
      "Physical Layer",
      "Network Layer",
      "Data Link Layer"
    ],
    "correctAnswer": "E",
    "correctOptionIndex": 4
  },
  {
    "id": "m7_q3",
    "week": 7,
    "number": 3,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "lapisan yang menangani alamat logis dan routing paket antarjaringan. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Network Layer (Layer 3) bertanggung jawab atas pengalamatan logis (IP address) dan penentuan rute terbaik (routing) paket lintas jaringan.",
    "options": [
      "Presentation Layer",
      "Session Layer",
      "Transport Layer",
      "Data Link Layer",
      "Network Layer"
    ],
    "correctAnswer": "E",
    "correctOptionIndex": 4
  },
  {
    "id": "m7_q4",
    "week": 7,
    "number": 4,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "lapisan yang menyediakan komunikasi ujung-ke-ujung, segmentasi, kontrol aliran, dan reliabilitas. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Transport Layer (Layer 4) mengelola segmentasi data, port numbering, kontrol aliran data (flow control), dan reliabilitas end-to-end (TCP/UDP).",
    "options": [
      "Transport Layer",
      "Network Layer",
      "Session Layer",
      "Physical Layer",
      "Application Layer"
    ],
    "correctAnswer": "A",
    "correctOptionIndex": 0
  },
  {
    "id": "m7_q5",
    "week": 7,
    "number": 5,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "lapisan yang mengelola pembentukan, pemeliharaan, dan penghentian sesi komunikasi. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Session Layer (Layer 5) mengatur dialog antar-aplikasi, sinkronisasi transmisi, dan pemeliharaan koneksi sesi komunikasi.",
    "options": [
      "Session Layer",
      "Application Layer",
      "Data Link Layer",
      "Network Layer",
      "Physical Layer"
    ],
    "correctAnswer": "A",
    "correctOptionIndex": 0
  },
  {
    "id": "m7_q6",
    "week": 7,
    "number": 6,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "lapisan yang menangani format data, enkripsi, kompresi, dan representasi. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Presentation Layer (Layer 6) melakukan translasi format (ASCII, JPEG), kompresi data, dan enkripsi/dekripsi keamanan (TLS/SSL).",
    "options": [
      "Transport Layer",
      "Data Link Layer",
      "Presentation Layer",
      "Session Layer",
      "Application Layer"
    ],
    "correctAnswer": "C",
    "correctOptionIndex": 2
  },
  {
    "id": "m7_q7",
    "week": 7,
    "number": 7,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "lapisan terdekat dengan aplikasi pengguna dan menyediakan layanan jaringan tingkat aplikasi. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Application Layer (Layer 7) berinteraksi langsung dengan software pengguna melalui protokol aplikasi seperti HTTP, DNS, DHCP, dan SMTP.",
    "options": [
      "Physical Layer",
      "Application Layer",
      "Transport Layer",
      "Data Link Layer",
      "Network Layer"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m7_q8",
    "week": 7,
    "number": 8,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "protokol transport berorientasi koneksi yang menyediakan urutan, pengakuan, dan pengiriman ulang. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "TCP (Transmission Control Protocol) bersifat connection-oriented dengan 3-way handshake, nomor urut segment, ACK konfirmasi, dan retransmisi paket hilang.",
    "options": [
      "Presentation Layer",
      "Transport Layer",
      "DNS",
      "HTTPS",
      "TCP"
    ],
    "correctAnswer": "E",
    "correctOptionIndex": 4
  },
  {
    "id": "m7_q9",
    "week": 7,
    "number": 9,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "protokol transport tanpa koneksi dengan overhead rendah dan tanpa jaminan pengiriman bawaan. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "UDP (User Datagram Protocol) bersifat connectionless dengan header minimal (8 byte) tanpa ACK sehingga sangat cepat untuk VoIP dan streaming.",
    "options": [
      "Network Layer",
      "UDP",
      "HTTP",
      "Default Gateway",
      "Transport Layer"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m7_q10",
    "week": 7,
    "number": 10,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "protokol internet dengan alamat 32-bit yang umum ditulis dalam empat oktet desimal. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "IPv4 menggunakan pengalamatan 32-bit yang dipisahkan menjadi 4 oktet desimal bertitik (dotted decimal), misal 192.168.1.1.",
    "options": [
      "IPv4",
      "Firewall",
      "Default Gateway",
      "Application Layer",
      "UDP"
    ],
    "correctAnswer": "A",
    "correctOptionIndex": 0
  },
  {
    "id": "m7_q11",
    "week": 7,
    "number": 11,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "protokol internet dengan alamat 128-bit yang ditulis dalam kelompok heksadesimal. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "IPv6 menggunakan panjang alamat 128-bit yang direpresentasikan dalam 8 grup 4 digit bilangan heksadesimal (misal 2001:db8::1).",
    "options": [
      "Physical Layer",
      "Session Layer",
      "Default Gateway",
      "DNS",
      "IPv6"
    ],
    "correctAnswer": "E",
    "correctOptionIndex": 4
  },
  {
    "id": "m7_q12",
    "week": 7,
    "number": 12,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "penanda bagian jaringan yang menentukan host mana berada pada jaringan yang sama. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Prefix Subnet (CIDR /24 atau subnet mask) memisahkan bit porsi network dan bit porsi host untuk menentukan batas subnet lokal.",
    "options": [
      "DNS",
      "Firewall",
      "WPA3",
      "Prefix/Subnet",
      "IPv4"
    ],
    "correctAnswer": "D",
    "correctOptionIndex": 3
  },
  {
    "id": "m7_q13",
    "week": 7,
    "number": 13,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "router tujuan awal ketika host mengirim paket ke jaringan lain. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Default Gateway adalah alamat IP lokal router yang dituju oleh host saat ingin mengirim paket ke luar subnet lokal.",
    "options": [
      "Session Layer",
      "UDP",
      "Application Layer",
      "Default Gateway",
      "HTTPS"
    ],
    "correctAnswer": "D",
    "correctOptionIndex": 3
  },
  {
    "id": "m7_q14",
    "week": 7,
    "number": 14,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "protokol yang memberikan konfigurasi jaringan kepada klien secara otomatis. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "DHCP (Dynamic Host Configuration Protocol) mengotomatisasi distribusi konfigurasi IP, subnet mask, gateway, dan DNS ke klien.",
    "options": [
      "DHCP",
      "HTTPS",
      "IPv6",
      "SSID",
      "IPv4"
    ],
    "correctAnswer": "A",
    "correctOptionIndex": 0
  },
  {
    "id": "m7_q15",
    "week": 7,
    "number": 15,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "sistem yang memetakan nama domain dengan alamat IP dan data terkait. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "DNS (Domain Name System) adalah basis data terdistribusi global yang memetakan nama domain (URL) ke alamat IP host.",
    "options": [
      "Firewall",
      "Default Gateway",
      "DNS",
      "HTTPS",
      "Data Link Layer"
    ],
    "correctAnswer": "C",
    "correctOptionIndex": 2
  },
  {
    "id": "m7_q16",
    "week": 7,
    "number": 16,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "protokol aplikasi untuk pertukaran sumber daya web tanpa enkripsi bawaan. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "HTTP (Hypertext Transfer Protocol) mengirimkan data halaman web dalam bentuk plain text melalui port 80 tanpa enkripsi data.",
    "options": [
      "HTTP",
      "Transport Layer",
      "Prefix/Subnet",
      "Presentation Layer",
      "IPv4"
    ],
    "correctAnswer": "A",
    "correctOptionIndex": 0
  },
  {
    "id": "m7_q17",
    "week": 7,
    "number": 17,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "HTTP yang dilindungi TLS untuk enkripsi dan autentikasi server. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "HTTPS (HTTP Secure) mengamankan komunikasi web menggunakan lapisan enkripsi TLS/SSL pada port 443 untuk menjamin kerahasiaan dan integritas.",
    "options": [
      "UDP",
      "Session Layer",
      "IPv6",
      "DNS",
      "HTTPS"
    ],
    "correctAnswer": "E",
    "correctOptionIndex": 4
  },
  {
    "id": "m7_q18",
    "week": 7,
    "number": 18,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "nama logis jaringan nirkabel yang ditampilkan atau digunakan klien untuk memilih jaringan. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "SSID (Service Set Identifier) adalah nama pengenal jaringan Wi-Fi (WLAN) yang dipancarkan oleh Access Point.",
    "options": [
      "SSID",
      "Physical Layer",
      "Application Layer",
      "Presentation Layer",
      "TCP"
    ],
    "correctAnswer": "A",
    "correctOptionIndex": 0
  },
  {
    "id": "m7_q19",
    "week": 7,
    "number": 19,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "standar keamanan WLAN yang meningkatkan perlindungan autentikasi dibanding generasi sebelumnya. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "WPA3 menggunakan protokol SAE (Simultaneous Authentication of Equals) dan enkripsi 192-bit yang kebal terhadap serangan brute-force dictionary attack offline.",
    "options": [
      "IPv6",
      "HTTPS",
      "Default Gateway",
      "UDP",
      "WPA3"
    ],
    "correctAnswer": "E",
    "correctOptionIndex": 4
  },
  {
    "id": "m7_q20",
    "week": 7,
    "number": 20,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "kontrol yang mengizinkan atau menolak trafik berdasarkan aturan sumber, tujuan, port, protokol, dan keadaan koneksi. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Firewall (Stateful Inspection) menyaring paket data keluar-masuk jaringan sesuai rulebase keamanan port, IP, protokol, dan state koneksi.",
    "options": [
      "Firewall",
      "WPA3",
      "Session Layer",
      "HTTPS",
      "HTTP"
    ],
    "correctAnswer": "A",
    "correctOptionIndex": 0
  },
  {
    "id": "m7_q21",
    "week": 7,
    "number": 21,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Lampu link pada NIC mati. Masalah paling mungkin berada pada ...",
    "pembahasan": "Lampu link mati menunjukkan kegagalan sinyal elektrik/optik pada Layer 1 (Physical Layer).",
    "options": [
      "DNS saja",
      "Physical Layer",
      "Session Layer",
      "Application Layer",
      "Presentation Layer"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m7_q22",
    "week": 7,
    "number": 22,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Switch memilih port keluaran berdasarkan ...",
    "pembahasan": "Switch bekerja pada Layer 2 (Data Link Layer) dan memeriksa Destination MAC Address pada header frame untuk memilih port keluaran.",
    "options": [
      "Alamat email",
      "Password Wi-Fi",
      "Nama domain",
      "Port HTTP saja",
      "Alamat MAC pada Data Link Layer"
    ],
    "correctAnswer": "E",
    "correctOptionIndex": 4
  },
  {
    "id": "m7_q23",
    "week": 7,
    "number": 23,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Router meneruskan paket berdasarkan ...",
    "pembahasan": "Router bekerja pada Layer 3 (Network Layer) dan memeriksa Destination IP Address pada header paket untuk menentukan arah interface keluar.",
    "options": [
      "MAC saja lintas semua jaringan",
      "Alamat IP pada Network Layer",
      "Nama pengguna",
      "Warna kabel",
      "Sertifikat"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m7_q24",
    "week": 7,
    "number": 24,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Aplikasi membutuhkan pengiriman andal dan berurutan. Protokol yang lebih tepat adalah ...",
    "pembahasan": "Aplikasi seperti web, transfer file (FTP), dan database memerlukan TCP karena memiliki fitur garansi pengiriman data berurutan dan retransmisi bila hilang.",
    "options": [
      "UDP",
      "ARP",
      "ICMP",
      "TCP",
      "SSID"
    ],
    "correctAnswer": "D",
    "correctOptionIndex": 3
  },
  {
    "id": "m7_q25",
    "week": 7,
    "number": 25,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Streaming real-time tertentu memilih overhead rendah dan toleran terhadap kehilangan kecil. Protokol yang sering dipakai adalah ...",
    "pembahasan": "UDP lebih disukai untuk streaming live dan game online karena tidak ada overhead acknowledgement sehingga latensi jauh lebih rendah.",
    "options": [
      "VLAN",
      "TCP selalu",
      "ARP",
      "UDP",
      "HTTP saja"
    ],
    "correctAnswer": "D",
    "correctOptionIndex": 3
  },
  {
    "id": "m7_q26",
    "week": 7,
    "number": 26,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Dua host IPv4 berada pada subnet berbeda. Untuk berkomunikasi mereka memerlukan ...",
    "pembahasan": "Komunikasi antar subnet berbeda (inter-network) wajib melalui perangkat Layer 3 yaitu router atau switch L3 sebagai default gateway.",
    "options": [
      "Hub saja",
      "Crimping tool",
      "DNS saja",
      "Patch cord crossover wajib",
      "Router/default gateway"
    ],
    "correctAnswer": "E",
    "correctOptionIndex": 4
  },
  {
    "id": "m7_q27",
    "week": 7,
    "number": 27,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Ping ke IP web server berhasil, tetapi browser ke nama domain gagal. Fokus pemeriksaan adalah ...",
    "pembahasan": "Karena ping IP langsung sukses, konektivitas routing L1-L3 baik. Masalah murni terletak pada sistem translasi nama domain (DNS).",
    "options": [
      "CPU server",
      "Power supply switch mati",
      "T568A",
      "Kabel NIC pasti putus",
      "DNS"
    ],
    "correctAnswer": "E",
    "correctOptionIndex": 4
  },
  {
    "id": "m7_q28",
    "week": 7,
    "number": 28,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "HTTPS lebih aman daripada HTTP karena ...",
    "pembahasan": "HTTPS mengenkripsi seluruh payload transmisi HTTP menggunakan Transport Layer Security (TLS) dan memvalidasi keaslian server lewat sertifikat digital.",
    "options": [
      "Tidak memakai port",
      "Menggunakan TLS untuk enkripsi dan autentikasi",
      "Menghapus firewall",
      "Selalu lebih cepat tanpa syarat",
      "Tidak membutuhkan sertifikat"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m7_q29",
    "week": 7,
    "number": 29,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Jaringan Wi-Fi padat pada kanal yang sama. Tindakan yang tepat adalah ...",
    "pembahasan": "Kepadatan kanal Wi-Fi (Co-Channel Interference) diatasi dengan frequency channel planning yang baik (menggunakan non-overlapping channel 1, 6, 11 pada 2.4 GHz atau beralih ke 5 GHz).",
    "options": [
      "Menambah SSID tanpa analisis",
      "Menonaktifkan enkripsi",
      "Mengganti IP menjadi publik",
      "Menganalisis kanal dan memilih perencanaan kanal yang lebih baik",
      "Menaikkan daya maksimum semua AP"
    ],
    "correctAnswer": "D",
    "correctOptionIndex": 3
  },
  {
    "id": "m7_q30",
    "week": 7,
    "number": 30,
    "type": "PG",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Kredensial administrator access point masih bawaan pabrik. Tindakan pertama adalah ...",
    "pembahasan": "Password default pabrik (admin/admin) adalah celah keamanan paling umum. Wajib segera diubah ke kombinasi password kuat dan perbarui firmware.",
    "options": [
      "Mengganti kredensial dengan kuat dan memperbarui firmware/config keamanan",
      "Membuka manajemen dari internet",
      "Membagikan password ke semua orang",
      "Menonaktifkan WPA",
      "Mengabaikan karena SSID tersembunyi"
    ],
    "correctAnswer": "A",
    "correctOptionIndex": 0
  },
  {
    "id": "m7_q31",
    "week": 7,
    "number": 31,
    "type": "PGK_KATEGORI",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "A benar, B salah (itu Presentation Layer), C salah (itu Application Layer).",
    "statements": [
      {
        "id": "A",
        "text": "UDP paling tepat dijelaskan sebagai protokol transport tanpa koneksi dengan overhead rendah dan tanpa jaminan pengiriman bawaan.",
        "answer": "Benar"
      },
      {
        "id": "B",
        "text": "Physical Layer paling tepat dijelaskan sebagai lapisan yang menangani format data, enkripsi, kompresi, dan representasi.",
        "answer": "Salah"
      },
      {
        "id": "C",
        "text": "Data Link Layer paling tepat dijelaskan sebagai lapisan terdekat dengan aplikasi pengguna dan menyediakan layanan jaringan tingkat aplikasi.",
        "answer": "Salah"
      }
    ]
  },
  {
    "id": "m7_q32",
    "week": 7,
    "number": 32,
    "type": "PGK_KATEGORI",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "Ketiganya salah: A adalah Data Link, B adalah IPv4, C adalah Network Layer.",
    "statements": [
      {
        "id": "A",
        "text": "Prefix/Subnet paling tepat dijelaskan sebagai lapisan yang menangani frame, alamat MAC, akses media, dan switching lokal.",
        "answer": "Salah"
      },
      {
        "id": "B",
        "text": "Session Layer paling tepat dijelaskan sebagai protokol internet dengan alamat 32-bit yang umum ditulis dalam empat oktet desimal.",
        "answer": "Salah"
      },
      {
        "id": "C",
        "text": "Default Gateway paling tepat dijelaskan sebagai lapisan yang menangani alamat logis dan routing paket antarjaringan.",
        "answer": "Salah"
      }
    ]
  },
  {
    "id": "m7_q33",
    "week": 7,
    "number": 33,
    "type": "PGK_KATEGORI",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "Ketiga pernyataan benar mendefinisikan Transport, Application, dan Physical Layer.",
    "statements": [
      {
        "id": "A",
        "text": "Transport Layer paling tepat dijelaskan sebagai lapisan yang menyediakan komunikasi ujung-ke-ujung, segmentasi, kontrol aliran, dan reliabilitas.",
        "answer": "Benar"
      },
      {
        "id": "B",
        "text": "Application Layer paling tepat dijelaskan sebagai lapisan terdekat dengan aplikasi pengguna dan menyediakan layanan jaringan tingkat aplikasi.",
        "answer": "Benar"
      },
      {
        "id": "C",
        "text": "Physical Layer paling tepat dijelaskan sebagai lapisan OSI yang menangani sinyal, konektor, media, bit, dan karakteristik fisik transmisi.",
        "answer": "Benar"
      }
    ]
  },
  {
    "id": "m7_q34",
    "week": 7,
    "number": 34,
    "type": "PGK_KATEGORI",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "Semua pernyataan benar.",
    "statements": [
      {
        "id": "A",
        "text": "Prefix/Subnet paling tepat dijelaskan sebagai penanda bagian jaringan yang menentukan host mana berada pada jaringan yang sama.",
        "answer": "Benar"
      },
      {
        "id": "B",
        "text": "IPv4 paling tepat dijelaskan sebagai protokol internet dengan alamat 32-bit yang umum ditulis dalam empat oktet desimal.",
        "answer": "Benar"
      },
      {
        "id": "C",
        "text": "Default Gateway paling tepat dijelaskan sebagai router tujuan awal ketika host mengirim paket ke jaringan lain.",
        "answer": "Benar"
      }
    ]
  },
  {
    "id": "m7_q35",
    "week": 7,
    "number": 35,
    "type": "PGK_KATEGORI",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "A benar, B salah (itu UDP), C benar.",
    "statements": [
      {
        "id": "A",
        "text": "Presentation Layer paling tepat dijelaskan sebagai lapisan yang menangani format data, enkripsi, kompresi, dan representasi.",
        "answer": "Benar"
      },
      {
        "id": "B",
        "text": "Transport Layer paling tepat dijelaskan sebagai protokol transport tanpa koneksi dengan overhead rendah dan tanpa jaminan pengiriman bawaan.",
        "answer": "Salah"
      },
      {
        "id": "C",
        "text": "TCP paling tepat dijelaskan sebagai protokol transport berorientasi koneksi yang menyediakan urutan, pengakuan, dan pengiriman ulang.",
        "answer": "Benar"
      }
    ]
  },
  {
    "id": "m7_q36",
    "week": 7,
    "number": 36,
    "type": "PGK_KATEGORI",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "A benar, B salah (itu TCP), C salah (itu Physical Layer).",
    "statements": [
      {
        "id": "A",
        "text": "DHCP paling tepat dijelaskan sebagai protokol yang memberikan konfigurasi jaringan kepada klien secara otomatis.",
        "answer": "Benar"
      },
      {
        "id": "B",
        "text": "Network Layer paling tepat dijelaskan sebagai protokol transport berorientasi koneksi yang menyediakan urutan, pengakuan, dan pengiriman ulang.",
        "answer": "Salah"
      },
      {
        "id": "C",
        "text": "IPv6 paling tepat dijelaskan sebagai lapisan OSI yang menangani sinyal, konektor, media, bit, dan karakteristik fisik transmisi.",
        "answer": "Salah"
      }
    ]
  },
  {
    "id": "m7_q37",
    "week": 7,
    "number": 37,
    "type": "PGK_KATEGORI",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "A salah (itu Prefix/Subnet), B salah (itu Default Gateway), C benar (Network Layer).",
    "statements": [
      {
        "id": "A",
        "text": "Application Layer paling tepat dijelaskan sebagai penanda bagian jaringan yang menentukan host mana berada pada jaringan yang sama.",
        "answer": "Salah"
      },
      {
        "id": "B",
        "text": "TCP paling tepat dijelaskan sebagai router tujuan awal ketika host mengirim paket ke jaringan lain.",
        "answer": "Salah"
      },
      {
        "id": "C",
        "text": "Network Layer paling tepat dijelaskan sebagai lapisan yang menangani alamat logis dan routing paket antarjaringan.",
        "answer": "Benar"
      }
    ]
  },
  {
    "id": "m7_q38",
    "week": 7,
    "number": 38,
    "type": "PGK_KATEGORI",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "A salah (itu Session Layer), B salah (itu Transport Layer), C benar.",
    "statements": [
      {
        "id": "A",
        "text": "DNS paling tepat dijelaskan sebagai lapisan yang mengelola pembentukan, pemeliharaan, dan penghentian sesi komunikasi.",
        "answer": "Salah"
      },
      {
        "id": "B",
        "text": "DHCP paling tepat dijelaskan sebagai lapisan yang menyediakan komunikasi ujung-ke-ujung, segmentasi, kontrol aliran, dan reliabilitas.",
        "answer": "Salah"
      },
      {
        "id": "C",
        "text": "Data Link Layer paling tepat dijelaskan sebagai lapisan yang menangani frame, alamat MAC, akses media, dan switching lokal.",
        "answer": "Benar"
      }
    ]
  },
  {
    "id": "m7_q39",
    "week": 7,
    "number": 39,
    "type": "PGK_KATEGORI",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "Semua pernyataan benar.",
    "statements": [
      {
        "id": "A",
        "text": "IPv6 paling tepat dijelaskan sebagai protokol internet dengan alamat 128-bit yang ditulis dalam kelompok heksadesimal.",
        "answer": "Benar"
      },
      {
        "id": "B",
        "text": "DNS paling tepat dijelaskan sebagai sistem yang memetakan nama domain dengan alamat IP dan data terkait.",
        "answer": "Benar"
      },
      {
        "id": "C",
        "text": "Session Layer paling tepat dijelaskan sebagai lapisan yang mengelola pembentukan, pemeliharaan, dan penghentian sesi komunikasi.",
        "answer": "Benar"
      }
    ]
  },
  {
    "id": "m7_q40",
    "week": 7,
    "number": 40,
    "type": "PGK_KATEGORI",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "Ketiganya salah: A adalah IPv6, B adalah DHCP, C adalah DNS.",
    "statements": [
      {
        "id": "A",
        "text": "Presentation Layer paling tepat dijelaskan sebagai protokol internet dengan alamat 128-bit yang ditulis dalam kelompok heksadesimal.",
        "answer": "Salah"
      },
      {
        "id": "B",
        "text": "UDP paling tepat dijelaskan sebagai protokol yang memberikan konfigurasi jaringan kepada klien secara otomatis.",
        "answer": "Salah"
      },
      {
        "id": "C",
        "text": "IPv4 paling tepat dijelaskan sebagai sistem yang memetakan nama domain dengan alamat IP dan data terkait.",
        "answer": "Salah"
      }
    ]
  },
  {
    "id": "m7_q41",
    "week": 7,
    "number": 41,
    "type": "PGK_MCMA",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Diagnosis berdasarkan OSI dapat dimulai dengan ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Pendekatan troubleshooting berbasis model OSI: mulai dari Layer 1 fisik (kabel/link), lanjut ke Layer 2 (VLAN/MAC), hingga Layer 3-7 (IP, port, dan software).",
    "mcmaOptions": [
      "Memeriksa link dan media",
      "Memeriksa VLAN/MAC",
      "Memeriksa IP, route, port, dan aplikasi secara bertahap",
      "Langsung menginstal ulang semua komputer",
      "Mengabaikan gejala"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m7_q42",
    "week": 7,
    "number": 42,
    "type": "PGK_MCMA",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "TCP memiliki karakteristik ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Karakteristik TCP: connection-oriented (handshake), nomor urut & ACK (acknowledgement), serta mekanisme retransmisi paket rusak/hilang.",
    "mcmaOptions": [
      "Connection-oriented",
      "Mendukung urutan dan ACK",
      "Dapat melakukan retransmisi",
      "Tidak memiliki kontrol sama sekali",
      "Selalu lebih cepat untuk semua aplikasi"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m7_q43",
    "week": 7,
    "number": 43,
    "type": "PGK_MCMA",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "UDP memiliki karakteristik ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Karakteristik UDP: connectionless tanpa jabat tangan, header ringan hemat bandwidth, dan tanpa jaminan retransmisi bawaan.",
    "mcmaOptions": [
      "Connectionless",
      "Overhead relatif rendah",
      "Tidak menjamin pengiriman bawaan",
      "Selalu melakukan retransmisi",
      "Menggunakan alamat MAC sebagai pengganti port"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m7_q44",
    "week": 7,
    "number": 44,
    "type": "PGK_MCMA",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Konfigurasi IPv4 host lengkap mencakup ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Parameter konfigurasi IPv4 host: IP address unik, subnet mask, default gateway, dan alamat IP DNS server primer/sekunder.",
    "mcmaOptions": [
      "Alamat IP",
      "Subnet mask/prefix",
      "Gateway dan DNS sesuai kebutuhan",
      "Nama warna kabel",
      "Nomor seri monitor"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m7_q45",
    "week": 7,
    "number": 45,
    "type": "PGK_MCMA",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Keamanan WLAN yang baik mencakup ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Pengamanan Wi-Fi: enkripsi WPA2/WPA3 Enterprise/Personal, password admin router yang kuat, pembaruan firmware, dan VLAN isolasi guest.",
    "mcmaOptions": [
      "WPA2/WPA3",
      "Kredensial administrator kuat",
      "Firmware dan segmentasi tamu",
      "Open network untuk semua",
      "Password default"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m7_q46",
    "week": 7,
    "number": 46,
    "type": "PGK_MCMA",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Gangguan Wi-Fi dianalisis melalui ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Audit performa WLAN: ukur kekuatan sinyal (RSSI dalam dBm), utilisasi spektrum kanal sekitar, dan jumlah asosiasi klien aktif per AP.",
    "mcmaOptions": [
      "RSSI dan lokasi",
      "Kanal dan interferensi",
      "Kapasitas AP dan jumlah klien",
      "Warna ikon Wi-Fi",
      "Menghapus DNS tanpa uji"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m7_q47",
    "week": 7,
    "number": 47,
    "type": "PGK_MCMA",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "DNS troubleshooting mencakup ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Troubleshoot DNS: periksa IP DNS di klien, lakukan query via nslookup/dig, dan pastikan port 53 UDP/TCP di server DNS terbuka.",
    "mcmaOptions": [
      "Memeriksa resolver klien",
      "Menguji query nama",
      "Memeriksa record dan konektivitas port",
      "Mengganti semua kabel jika ping IP berhasil",
      "Menonaktifkan NIC"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m7_q48",
    "week": 7,
    "number": 48,
    "type": "PGK_MCMA",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "HTTPS yang benar memerlukan ... (Jawaban benar lebih dari satu)",
    "pembahasan": "HTTPS yang aman: negosiasi TLS cipher kuat, sertifikat SSL valid yang cocok dengan FQDN situs, serta sinkronisasi waktu jam sistem (NTP).",
    "mcmaOptions": [
      "TLS",
      "Sertifikat yang valid sesuai nama",
      "Waktu sistem yang benar",
      "Mengabaikan semua peringatan",
      "Membuka seluruh firewall"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m7_q49",
    "week": 7,
    "number": 49,
    "type": "PGK_MCMA",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "Firewall dapat digunakan untuk ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Fungsi firewall: memfilter port TCP/UDP, membatasi IP address sumber dan tujuan, serta mencatat log riwayat koneksi jaringan.",
    "mcmaOptions": [
      "Membatasi port layanan",
      "Membatasi sumber/tujuan",
      "Mencatat atau memantau trafik sesuai fitur",
      "Mengganti fungsi backup",
      "Memperbaiki kabel putus"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m7_q50",
    "week": 7,
    "number": 50,
    "type": "PGK_MCMA",
    "kompetensi": "Mengidentifikasi model OSI/TCP-IP dalam analisis jaringan",
    "subKompetensi": "Prinsip dasar OSI dan TCP/IP",
    "kasus": "IPv6 relevan karena ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Urgensi IPv6: kapasitas ruang alamat 128 bit yang masif, arsitektur routing modern tanpa keharusan bergantung pada NAT, dan format heksadesimal.",
    "mcmaOptions": [
      "Ruang alamat sangat besar",
      "Mendukung pengalamatan modern",
      "Ditulis dalam kelompok heksadesimal",
      "Hanya memiliki 32 bit",
      "Selalu menggunakan NAT sebagai syarat utama"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  }
];
