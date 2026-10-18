import { Question } from '../../types/quiz';

export const MINGGU_3_QUESTIONS: Question[] = [
  {
    "id": "m3_q1",
    "week": 3,
    "number": 1,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "perangkat yang meneruskan paket antarjaringan berdasarkan alamat IP dan tabel routing. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Router bekerja pada Layer 3 (Network Layer) meneruskan paket antar-subnet berbeda berdasarkan IP tujuan dan routing table.",
    "options": [
      "Modem",
      "Access Point",
      "Router",
      "Hub",
      "Switch"
    ],
    "correctAnswer": "C",
    "correctOptionIndex": 2
  },
  {
    "id": "m3_q2",
    "week": 3,
    "number": 2,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "perangkat LAN yang meneruskan frame berdasarkan alamat MAC dan port. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Switch bekerja pada Layer 2 (Data Link) menggunakan MAC Address Table untuk meneruskan frame ke port tujuan secara spesifik (unicast).",
    "options": [
      "Router",
      "Switch",
      "Hub",
      "Modem",
      "Access Point"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m3_q3",
    "week": 3,
    "number": 3,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "perangkat sederhana yang mengirim sinyal masuk ke seluruh port tanpa mempelajari alamat. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Hub bekerja pada Layer 1 (Physical) sebagai multiport repeater pasif yang membroadcast frame ke semua port sehingga rawan collision.",
    "options": [
      "Router",
      "Access Point",
      "Modem",
      "Hub",
      "Switch"
    ],
    "correctAnswer": "D",
    "correctOptionIndex": 3
  },
  {
    "id": "m3_q4",
    "week": 3,
    "number": 4,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "perangkat yang menghubungkan klien nirkabel ke jaringan kabel atau distribusi. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Access Point (AP) mengonversi sinyal nirkabel radio Wi-Fi (802.11) ke jaringan kabel Ethernet (802.3).",
    "options": [
      "Modem",
      "Access Point",
      "Hub",
      "Router",
      "Switch"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m3_q5",
    "week": 3,
    "number": 5,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "perangkat yang melakukan modulasi atau penyesuaian sinyal untuk menghubungkan jaringan ke media layanan tertentu. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Modem (Modulator-Demodulator) mengubah sinyal digital komputer menjadi sinyal analog carrier (atau sebaliknya) untuk media transmisi tertentu.",
    "options": [
      "Access Point",
      "Modem",
      "Switch",
      "Hub",
      "Router"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m3_q6",
    "week": 3,
    "number": 6,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "alamat router yang digunakan host untuk mencapai jaringan di luar subnet lokal. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Default Gateway adalah IP interface router lokal tempat host mengirimkan paket yang ditujukan ke luar jaringan subnet lokalnya.",
    "options": [
      "Router",
      "Default Gateway",
      "Ping",
      "Access Point",
      "VLAN"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m3_q7",
    "week": 3,
    "number": 7,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "pemisahan jaringan logis pada infrastruktur switch untuk membentuk broadcast domain berbeda. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "VLAN (Virtual Local Area Network) memecah switch fisik menjadi beberapa broadcast domain logis terpisah demi keamanan dan efisiensi broadcast.",
    "options": [
      "Access Port",
      "VLAN",
      "Default Route",
      "Subnet Mask",
      "Static Route"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m3_q8",
    "week": 3,
    "number": 8,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "port switch yang membawa satu VLAN untuk perangkat akhir. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Access Port dikonfigurasikan hanya membawa trafik single VLAN tanpa tag 802.1Q dan dihubungkan ke end-device (PC, printer, IP phone).",
    "options": [
      "Default Gateway",
      "IP Configuration",
      "Switch",
      "Access Port",
      "Router"
    ],
    "correctAnswer": "D",
    "correctOptionIndex": 3
  },
  {
    "id": "m3_q9",
    "week": 3,
    "number": 9,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "port switch yang membawa beberapa VLAN antarperangkat jaringan dengan penandaan VLAN. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Trunk Port (IEEE 802.1Q) menyematkan VLAN Tag pada header frame untuk melewatkan trafik multi-VLAN antar switch atau switch-ke-router.",
    "options": [
      "IP Configuration",
      "Subnet Mask",
      "Static Route",
      "Trunk Port",
      "Access Port"
    ],
    "correctAnswer": "D",
    "correctOptionIndex": 3
  },
  {
    "id": "m3_q10",
    "week": 3,
    "number": 10,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "rute yang dimasukkan administrator secara manual menuju jaringan tujuan tertentu. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Static Route diinput secara manual oleh administrator jaringan pada tabel routing yang menentukan network tujuan, prefix mask, dan next-hop.",
    "options": [
      "Trunk Port",
      "Static Route",
      "Access Point",
      "Access Port",
      "Modem"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m3_q11",
    "week": 3,
    "number": 11,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "rute umum yang digunakan ketika tidak ada rute yang lebih spesifik dalam tabel routing. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Default Route (0.0.0.0/0 pada IPv4 atau ::/0 pada IPv6) menjadi rute gateway of last resort saat paket tujuan tidak cocok dengan rute lain di tabel routing.",
    "options": [
      "Subnet Mask",
      "MAC Address Table",
      "Default Route",
      "DNS Resolver",
      "DHCP Pool"
    ],
    "correctAnswer": "C",
    "correctOptionIndex": 2
  },
  {
    "id": "m3_q12",
    "week": 3,
    "number": 12,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "mekanisme penerjemahan alamat IP, sering digunakan agar banyak alamat privat berbagi akses keluar. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "NAT (Network Address Translation) atau NAPT/PAT memetakan IP privat lokal (RFC 1918) ke IP publik untuk komunikasi ke internet.",
    "options": [
      "Router",
      "NAT",
      "IP Configuration",
      "Subnet Mask",
      "DHCP Pool"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m3_q13",
    "week": 3,
    "number": 13,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "rentang dan parameter alamat yang disediakan DHCP untuk diberikan kepada klien. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "DHCP Pool (scope) mendefinisikan kumpulan rentang alamat IP yang siap dialokasikan DHCP server ke klien.",
    "options": [
      "DHCP Pool",
      "Trunk Port",
      "Subnet Mask",
      "Default Gateway",
      "IP Configuration"
    ],
    "correctAnswer": "A",
    "correctOptionIndex": 0
  },
  {
    "id": "m3_q14",
    "week": 3,
    "number": 14,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "komponen yang mencari jawaban nama domain untuk klien melalui cache atau server lain. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "DNS Resolver (klien atau recursive server) bertugas mengkueri nama domain ke server otoritatif berjenjang untuk memperoleh alamat IP.",
    "options": [
      "Access Port",
      "Ping",
      "DNS Resolver",
      "Hub",
      "ARP Table"
    ],
    "correctAnswer": "C",
    "correctOptionIndex": 2
  },
  {
    "id": "m3_q15",
    "week": 3,
    "number": 15,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "alat untuk menguji keterjangkauan dan waktu respons menggunakan pesan ICMP. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Ping memanfaatkan protokol ICMP Echo Request dan Echo Reply untuk mengecek reachability dan Round Trip Time (RTT) suatu host.",
    "options": [
      "MAC Address Table",
      "IP Configuration",
      "Ping",
      "Traceroute",
      "ARP Table"
    ],
    "correctAnswer": "C",
    "correctOptionIndex": 2
  },
  {
    "id": "m3_q16",
    "week": 3,
    "number": 16,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "alat untuk melihat lintasan hop yang dilalui paket menuju tujuan. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Traceroute (tracert) memanfaatkan manipulasi TTL (Time to Live) IP untuk memetakan setiap router hop di sepanjang rute transmisi paket.",
    "options": [
      "IP Configuration",
      "ARP Table",
      "Traceroute",
      "MAC Address Table",
      "Ping"
    ],
    "correctAnswer": "C",
    "correctOptionIndex": 2
  },
  {
    "id": "m3_q17",
    "week": 3,
    "number": 17,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "tabel pemetaan alamat IPv4 lokal ke alamat MAC yang diketahui host. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "ARP (Address Resolution Protocol) Table memetakan IP address Layer 3 ke MAC address Layer 2 pada antarmuka jaringan lokal.",
    "options": [
      "Traceroute",
      "ARP Table",
      "MAC Address Table",
      "IP Configuration",
      "Ping"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m3_q18",
    "week": 3,
    "number": 18,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "informasi alamat IP, prefix atau subnet mask, gateway, dan DNS pada suatu antarmuka. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "IP Configuration merangkum seluruh parameter layer 3 antarmuka (IP, netmask, default gateway, dan primary/secondary DNS).",
    "options": [
      "ARP Table",
      "Ping",
      "MAC Address Table",
      "IP Configuration",
      "Traceroute"
    ],
    "correctAnswer": "D",
    "correctOptionIndex": 3
  },
  {
    "id": "m3_q19",
    "week": 3,
    "number": 19,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "tabel pada switch yang memetakan alamat MAC dengan port tempat alamat tersebut dipelajari. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "MAC Address Table (CAM Table) switch mengasosiasikan source MAC address frame yang masuk dengan nomor port fisik tempat frame tersebut diterima.",
    "options": [
      "MAC Address Table",
      "ARP Table",
      "Traceroute",
      "Ping",
      "IP Configuration"
    ],
    "correctAnswer": "A",
    "correctOptionIndex": 0
  },
  {
    "id": "m3_q20",
    "week": 3,
    "number": 20,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "nilai yang membedakan bagian jaringan dan bagian host pada alamat IPv4. Istilah/perangkat/profesi yang paling tepat adalah ...",
    "pembahasan": "Subnet Mask (misal 255.255.255.0 atau prefix /24) menggunakan bit 1 untuk network ID dan bit 0 untuk host ID.",
    "options": [
      "NAT",
      "ARP Table",
      "DHCP Pool",
      "IP Configuration",
      "Subnet Mask"
    ],
    "correctAnswer": "E",
    "correctOptionIndex": 4
  },
  {
    "id": "m3_q21",
    "week": 3,
    "number": 21,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Komputer satu subnet tidak dapat terhubung dan lampu link mati. Pemeriksaan pertama adalah ...",
    "pembahasan": "Lampu link mati adalah indikasi kegagalan Layer 1 (Physical). Cek kabel UTP, jack RJ45, port switch, dan daya perangkat.",
    "options": [
      "Nama domain",
      "DNS publik",
      "Sertifikat HTTPS",
      "Daya perangkat, kabel, konektor, dan status port",
      "Static route internet"
    ],
    "correctAnswer": "D",
    "correctOptionIndex": 3
  },
  {
    "id": "m3_q22",
    "week": 3,
    "number": 22,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Dua VLAN berbeda harus saling berkomunikasi. Komponen yang diperlukan adalah ...",
    "pembahasan": "Karena VLAN memisahkan broadcast domain, komunikasi antar-VLAN wajib melalui routing Layer 3 (Router-on-a-Stick atau Switch Layer 3 SVI).",
    "options": [
      "Inter-VLAN routing pada router atau switch layer 3",
      "Patch cord crossover selalu",
      "Cable tester saja",
      "Hub pasif",
      "DNS resolver"
    ],
    "correctAnswer": "A",
    "correctOptionIndex": 0
  },
  {
    "id": "m3_q23",
    "week": 3,
    "number": 23,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Port switch ke komputer pengguna hanya membawa VLAN 20. Mode port yang tepat adalah ...",
    "pembahasan": "Port ke host pengguna akhir (PC klien) harus disetel sebagai Access Port dan diasosiasikan dengan VLAN 20.",
    "options": [
      "Trunk semua VLAN",
      "Access port VLAN 20",
      "Port mirroring",
      "Shutdown",
      "Loopback"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m3_q24",
    "week": 3,
    "number": 24,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Link antar-switch harus membawa VLAN 10, 20, dan 30. Konfigurasi yang tepat adalah ...",
    "pembahasan": "Link switch-to-switch harus beroperasi dalam mode Trunk (802.1Q) dengan konfigurasi `switchport trunk allowed vlan 10,20,30`.",
    "options": [
      "Access VLAN 10 saja",
      "DNS forwarder",
      "Trunk yang mengizinkan VLAN 10, 20, dan 30",
      "NAT overload",
      "DHCP reservation"
    ],
    "correctAnswer": "C",
    "correctOptionIndex": 2
  },
  {
    "id": "m3_q25",
    "week": 3,
    "number": 25,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Klien mendapat IP 169.254.x.x dan tidak dapat mengakses jaringan. Penyebab yang paling mungkin adalah ...",
    "pembahasan": "IP 169.254.0.0/16 adalah APIPA (Automatic Private IP Addressing), yang otomatis diberikan OS saat klien gagal menghubungi DHCP Server.",
    "options": [
      "DNS terlalu cepat",
      "Gateway memakai IPv6",
      "Switch belajar MAC dengan benar",
      "Klien gagal memperoleh lease dari DHCP",
      "Kabel selalu crossover"
    ],
    "correctAnswer": "D",
    "correctOptionIndex": 3
  },
  {
    "id": "m3_q26",
    "week": 3,
    "number": 26,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Ping ke gateway berhasil, ping ke 8.8.8.8 berhasil, tetapi nama domain gagal. Masalah paling mungkin adalah ...",
    "pembahasan": "Karena ping IP numerik gateway dan internet (8.8.8.8) lancar, routing layer 3 berfungsi baik. Kegagalan akses via nama domain murni disebabkan kendala DNS.",
    "options": [
      "NIC mati",
      "VLAN access",
      "DNS",
      "Kabel fisik",
      "Daya switch"
    ],
    "correctAnswer": "C",
    "correctOptionIndex": 2
  },
  {
    "id": "m3_q27",
    "week": 3,
    "number": 27,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Router mempunyai beberapa rute dan menerima paket ke jaringan yang tidak ada pada rute spesifik. Rute yang dipakai adalah ...",
    "pembahasan": "Router menggunakan Default Route (0.0.0.0/0) sebagai jalur keluar alternatif saat tidak ditemukan rute yang cocok dalam routing table.",
    "options": [
      "DHCP pool",
      "SSID",
      "Default route jika tersedia",
      "ARP table",
      "MAC address table"
    ],
    "correctAnswer": "C",
    "correctOptionIndex": 2
  },
  {
    "id": "m3_q28",
    "week": 3,
    "number": 28,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Switch meneruskan frame berdasarkan ...",
    "pembahasan": "Switch membaca Destination MAC Address pada header frame Layer 2, lalu mencocokkannya ke MAC Address Table untuk meneruskan frame.",
    "options": [
      "Nama domain",
      "Alamat MAC tujuan dan tabel MAC",
      "Link budget",
      "Nomor seri CPU",
      "Alamat email"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m3_q29",
    "week": 3,
    "number": 29,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Perintah yang paling tepat untuk melihat lintasan hop menuju server adalah ...",
    "pembahasan": "Perintah `traceroute` (Linux) atau `tracert` (Windows) menampilkan daftar IP semua hop router yang dilalui paket sampai ke server tujuan.",
    "options": [
      "Crimping tool",
      "Snapshot",
      "Format disk",
      "Ping saja",
      "Traceroute"
    ],
    "correctAnswer": "E",
    "correctOptionIndex": 4
  },
  {
    "id": "m3_q30",
    "week": 3,
    "number": 30,
    "type": "PG",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Teknisi mengganti banyak konfigurasi sekaligus sehingga tidak tahu perubahan mana yang memperbaiki masalah. Praktik yang benar adalah ...",
    "pembahasan": "Metodologi troubleshooting ilmiah: ubah satu variabel dalam satu waktu, uji dampaknya, dan catat hasilnya sebelum mencoba konfigurasi lain.",
    "options": [
      "Menonaktifkan log",
      "Mengubah satu variabel, menguji, dan mencatat hasil",
      "Menghapus semua konfigurasi",
      "Mengabaikan baseline",
      "Restart setiap menit"
    ],
    "correctAnswer": "B",
    "correctOptionIndex": 1
  },
  {
    "id": "m3_q31",
    "week": 3,
    "number": 31,
    "type": "PGK_KATEGORI",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "A benar, B salah (itu definisi Default Route, bukan Default Gateway host), C benar (trunk 802.1Q).",
    "statements": [
      {
        "id": "A",
        "text": "Router paling tepat dijelaskan sebagai perangkat yang meneruskan paket antarjaringan berdasarkan alamat IP dan tabel routing.",
        "answer": "Benar"
      },
      {
        "id": "B",
        "text": "Default Gateway paling tepat dijelaskan sebagai rute umum yang digunakan ketika tidak ada rute yang lebih spesifik dalam tabel routing.",
        "answer": "Salah"
      },
      {
        "id": "C",
        "text": "Trunk Port paling tepat dijelaskan sebagai port switch yang membawa beberapa VLAN antarperangkat jaringan dengan penandaan VLAN.",
        "answer": "Benar"
      }
    ]
  },
  {
    "id": "m3_q32",
    "week": 3,
    "number": 32,
    "type": "PGK_KATEGORI",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "Ketiganya salah: A adalah NAT, B adalah Switch, C adalah Ping.",
    "statements": [
      {
        "id": "A",
        "text": "VLAN paling tepat dijelaskan sebagai mekanisme penerjemahan alamat IP, sering digunakan agar banyak alamat privat berbagi akses keluar.",
        "answer": "Salah"
      },
      {
        "id": "B",
        "text": "NAT paling tepat dijelaskan sebagai perangkat LAN yang meneruskan frame berdasarkan alamat MAC dan port.",
        "answer": "Salah"
      },
      {
        "id": "C",
        "text": "Static Route paling tepat dijelaskan sebagai alat untuk menguji keterjangkauan dan waktu respons menggunakan pesan ICMP.",
        "answer": "Salah"
      }
    ]
  },
  {
    "id": "m3_q33",
    "week": 3,
    "number": 33,
    "type": "PGK_KATEGORI",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "A salah (itu Modem), B benar (Access Point Wi-Fi), C salah (itu Trunk Port).",
    "statements": [
      {
        "id": "A",
        "text": "Ping paling tepat dijelaskan sebagai perangkat yang melakukan modulasi atau penyesuaian sinyal untuk menghubungkan jaringan ke media layanan tertentu.",
        "answer": "Salah"
      },
      {
        "id": "B",
        "text": "Access Point paling tepat dijelaskan sebagai perangkat yang menghubungkan klien nirkabel ke jaringan kabel atau distribusi.",
        "answer": "Benar"
      },
      {
        "id": "C",
        "text": "Access Point paling tepat dijelaskan sebagai port switch yang membawa beberapa VLAN antarperangkat jaringan dengan penandaan VLAN.",
        "answer": "Salah"
      }
    ]
  },
  {
    "id": "m3_q34",
    "week": 3,
    "number": 34,
    "type": "PGK_KATEGORI",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "A salah (itu Hub), B salah (itu Access Port), C benar (DNS Resolver).",
    "statements": [
      {
        "id": "A",
        "text": "DHCP Pool paling tepat dijelaskan sebagai perangkat sederhana yang mengirim sinyal masuk ke seluruh port tanpa mempelajari alamat.",
        "answer": "Salah"
      },
      {
        "id": "B",
        "text": "Hub paling tepat dijelaskan sebagai port switch yang membawa satu VLAN untuk perangkat akhir.",
        "answer": "Salah"
      },
      {
        "id": "C",
        "text": "DNS Resolver paling tepat dijelaskan sebagai komponen yang mencari jawaban nama domain untuk klien melalui cache atau server lain.",
        "answer": "Benar"
      }
    ]
  },
  {
    "id": "m3_q35",
    "week": 3,
    "number": 35,
    "type": "PGK_KATEGORI",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "A salah (itu Default Gateway), B salah (itu DNS Resolver), C benar (Access Port single VLAN).",
    "statements": [
      {
        "id": "A",
        "text": "Router paling tepat dijelaskan sebagai alamat router yang digunakan host untuk mencapai jaringan di luar subnet lokal.",
        "answer": "Salah"
      },
      {
        "id": "B",
        "text": "Trunk Port paling tepat dijelaskan sebagai komponen yang mencari jawaban nama domain untuk klien melalui cache atau server lain.",
        "answer": "Salah"
      },
      {
        "id": "C",
        "text": "Access Port paling tepat dijelaskan sebagai port switch yang membawa satu VLAN untuk perangkat akhir.",
        "answer": "Benar"
      }
    ]
  },
  {
    "id": "m3_q36",
    "week": 3,
    "number": 36,
    "type": "PGK_KATEGORI",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "Ketiga pernyataan mendefinisikan DHCP Pool, Ping, dan Default Gateway dengan tepat.",
    "statements": [
      {
        "id": "A",
        "text": "DHCP Pool paling tepat dijelaskan sebagai rentang dan parameter alamat yang disediakan DHCP untuk diberikan kepada klien.",
        "answer": "Benar"
      },
      {
        "id": "B",
        "text": "Ping paling tepat dijelaskan sebagai alat untuk menguji keterjangkauan dan waktu respons menggunakan pesan ICMP.",
        "answer": "Benar"
      },
      {
        "id": "C",
        "text": "Default Gateway paling tepat dijelaskan sebagai alamat router yang digunakan host untuk mencapai jaringan di luar subnet lokal.",
        "answer": "Benar"
      }
    ]
  },
  {
    "id": "m3_q37",
    "week": 3,
    "number": 37,
    "type": "PGK_KATEGORI",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "Ketiga pernyataan benar.",
    "statements": [
      {
        "id": "A",
        "text": "Default Route paling tepat dijelaskan sebagai rute umum yang digunakan ketika tidak ada rute yang lebih spesifik dalam tabel routing.",
        "answer": "Benar"
      },
      {
        "id": "B",
        "text": "Static Route paling tepat dijelaskan sebagai rute yang dimasukkan administrator secara manual menuju jaringan tujuan tertentu.",
        "answer": "Benar"
      },
      {
        "id": "C",
        "text": "Hub paling tepat dijelaskan sebagai perangkat sederhana yang mengirim sinyal masuk ke seluruh port tanpa mempelajari alamat.",
        "answer": "Benar"
      }
    ]
  },
  {
    "id": "m3_q38",
    "week": 3,
    "number": 38,
    "type": "PGK_KATEGORI",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "A salah (itu Static Route), B salah (itu Access Point), C benar (definisi VLAN).",
    "statements": [
      {
        "id": "A",
        "text": "Modem paling tepat dijelaskan sebagai rute yang dimasukkan administrator secara manual menuju jaringan tujuan tertentu.",
        "answer": "Salah"
      },
      {
        "id": "B",
        "text": "DNS Resolver paling tepat dijelaskan sebagai perangkat yang menghubungkan klien nirkabel ke jaringan kabel atau distribusi.",
        "answer": "Salah"
      },
      {
        "id": "C",
        "text": "VLAN paling tepat dijelaskan sebagai pemisahan jaringan logis pada infrastruktur switch untuk membentuk broadcast domain berbeda.",
        "answer": "Benar"
      }
    ]
  },
  {
    "id": "m3_q39",
    "week": 3,
    "number": 39,
    "type": "PGK_KATEGORI",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "A benar, B benar, C salah (itu DHCP Pool).",
    "statements": [
      {
        "id": "A",
        "text": "Modem paling tepat dijelaskan sebagai perangkat yang melakukan modulasi atau penyesuaian sinyal untuk menghubungkan jaringan ke media layanan tertentu.",
        "answer": "Benar"
      },
      {
        "id": "B",
        "text": "Switch paling tepat dijelaskan sebagai perangkat LAN yang meneruskan frame berdasarkan alamat MAC dan port.",
        "answer": "Benar"
      },
      {
        "id": "C",
        "text": "Access Port paling tepat dijelaskan sebagai rentang dan parameter alamat yang disediakan DHCP untuk diberikan kepada klien.",
        "answer": "Salah"
      }
    ]
  },
  {
    "id": "m3_q40",
    "week": 3,
    "number": 40,
    "type": "PGK_KATEGORI",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    "pembahasan": "A benar (NAT), B salah (itu VLAN), C salah (itu Router).",
    "statements": [
      {
        "id": "A",
        "text": "NAT paling tepat dijelaskan sebagai mekanisme penerjemahan alamat IP, sering digunakan agar banyak alamat privat berbagi akses keluar.",
        "answer": "Benar"
      },
      {
        "id": "B",
        "text": "Switch paling tepat dijelaskan sebagai pemisahan jaringan logis pada infrastruktur switch untuk membentuk broadcast domain berbeda.",
        "answer": "Salah"
      },
      {
        "id": "C",
        "text": "Default Route paling tepat dijelaskan sebagai perangkat yang meneruskan paket antarjaringan berdasarkan alamat IP dan tabel routing.",
        "answer": "Salah"
      }
    ]
  },
  {
    "id": "m3_q41",
    "week": 3,
    "number": 41,
    "type": "PGK_MCMA",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Troubleshooting konektivitas dilakukan dengan ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Metode isolasi gangguan: verifikasi kabel fisik, periksa parameter IP host, dan uji bertahap (ping loopback -> gateway -> DNS internet).",
    "mcmaOptions": [
      "Memeriksa link fisik",
      "Memeriksa IP, mask, gateway, dan DNS",
      "Menguji bertahap dari lokal ke luar",
      "Mengganti semua perangkat sekaligus",
      "Menonaktifkan log"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m3_q42",
    "week": 3,
    "number": 42,
    "type": "PGK_MCMA",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Konfigurasi VLAN yang benar mencakup ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Konfigurasi VLAN tepat: buat ID VLAN, assign port access ke VLAN anggota yang tepat, dan izinkan ID VLAN terkait pada link trunk.",
    "mcmaOptions": [
      "Membuat VLAN sesuai desain",
      "Menempatkan access port pada VLAN yang benar",
      "Mengizinkan VLAN pada trunk yang diperlukan",
      "Menetapkan semua port ke semua VLAN tanpa alasan",
      "Mengabaikan native VLAN mismatch"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m3_q43",
    "week": 3,
    "number": 43,
    "type": "PGK_MCMA",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Inter-VLAN routing memerlukan ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Inter-VLAN routing membutuhkan gateway virtual (SVI/sub-interface dengan enkapsulasi dot1q) dan tabel routing layer 3 aktif.",
    "mcmaOptions": [
      "Antarmuka/SVI atau subinterface yang benar",
      "Alamat gateway tiap VLAN",
      "Routing aktif",
      "Hub pasif sebagai router",
      "DNS sebagai pengganti routing"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m3_q44",
    "week": 3,
    "number": 44,
    "type": "PGK_MCMA",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "DHCP gagal memberi IP. Hal yang perlu diperiksa adalah ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Troubleshoot DHCP: pastikan service aktif, IP pool belum habis, helper-address (DHCP relay) terpasang jika lintas VLAN, dan port 67/68 tidak terblokir firewall.",
    "mcmaOptions": [
      "Status layanan dan pool",
      "VLAN atau relay DHCP",
      "Firewall dan konektivitas",
      "Warna kabel",
      "Nama pengguna browser"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m3_q45",
    "week": 3,
    "number": 45,
    "type": "PGK_MCMA",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "DNS diduga bermasalah jika ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Indikasi problem DNS: ping alamat IP sukses tapi gagal buka domain web, nslookup timeout, atau alamat DNS resolver pada konfigurasi IP klien keliru.",
    "mcmaOptions": [
      "Ping ke IP berhasil tetapi nama gagal",
      "Query DNS timeout",
      "Resolver klien salah",
      "Lampu link mati selalu",
      "CPU tidak memiliki wallpaper"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m3_q46",
    "week": 3,
    "number": 46,
    "type": "PGK_MCMA",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Static route yang baik harus ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Static routing memerlukan network ID tujuan, subnet prefix yang tepat, next-hop IP yang valid, serta verifikasi pada output routing table.",
    "mcmaOptions": [
      "Menunjuk next-hop atau interface yang benar",
      "Menggunakan jaringan tujuan dan prefix tepat",
      "Diverifikasi di tabel routing",
      "Dimasukkan secara acak",
      "Menggantikan kebutuhan gateway klien tanpa desain"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m3_q47",
    "week": 3,
    "number": 47,
    "type": "PGK_MCMA",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "NAT yang benar memerlukan ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Konfigurasi NAT menuntut penetapan antarmuka inside dan outside, access list (ACL) pemetaan IP, serta pengujian translasi alamat.",
    "mcmaOptions": [
      "Penentuan trafik inside dan outside sesuai desain",
      "Aturan alamat yang jelas",
      "Pengujian serta logging bila perlu",
      "Menganggap NAT otomatis memblokir semua serangan",
      "Menghapus routing"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m3_q48",
    "week": 3,
    "number": 48,
    "type": "PGK_MCMA",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Switch belajar MAC melalui ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Switch mempelajari MAC address dari Source MAC pada header frame yang masuk ke port fisiknya dan memperbarui aging timer tabel.",
    "mcmaOptions": [
      "Alamat sumber frame yang masuk",
      "Port tempat frame diterima",
      "Pembaruan tabel sesuai waktu",
      "Nama domain DNS",
      "Nomor seri kabel"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m3_q49",
    "week": 3,
    "number": 49,
    "type": "PGK_MCMA",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Perintah diagnosis yang relevan adalah ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Utility standar uji jaringan komputer: ping (reachability), traceroute (hop path), dan ip/ipconfig/ifconfig (parameter adapter lokal).",
    "mcmaOptions": [
      "ping untuk keterjangkauan",
      "traceroute untuk jalur hop",
      "ipconfig/ifconfig/ip untuk konfigurasi lokal",
      "format untuk memeriksa VLAN",
      "cleaver untuk memeriksa DNS"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  },
  {
    "id": "m3_q50",
    "week": 3,
    "number": 50,
    "type": "PGK_MCMA",
    "kompetensi": "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.",
    "subKompetensi": "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT",
    "kasus": "Dokumentasi jaringan sebaiknya mencakup ... (Jawaban benar lebih dari satu)",
    "pembahasan": "Kelengkapan dokumentasi jaringan profesional: topologi logis/fisik, IP addressing & VLAN mapping, serta backup konfigurasi perangkat aktif.",
    "mcmaOptions": [
      "Diagram topologi",
      "Daftar VLAN dan IP",
      "Backup konfigurasi dan hasil uji",
      "Password ditempel di tempat umum",
      "Perubahan tanpa tanggal"
    ],
    "correctMcmaIndices": [
      0,
      1,
      2
    ]
  }
];
