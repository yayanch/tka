const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'src', 'data', 'questions');

function writeTsFile(weekNum, data) {
  const code = `import { Question } from '../../types/quiz';

export const MINGGU_${weekNum}_QUESTIONS: Question[] = ${JSON.stringify(data, null, 2)};
`;
  fs.writeFileSync(path.join(outDir, `m${weekNum}.ts`), code, 'utf-8');
  console.log(`Generated m${weekNum}.ts (${data.length} questions)`);
}

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

// ----------------------------------------------------
// MINGGU 2 DATA
// ----------------------------------------------------
const kompetensiM2 = "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.";
const subKompetensiM2 = "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT";

const m2_raw_pg = [
  { n: 1, c: "komponen pemroses instruksi dan operasi logika yang menjadi pusat eksekusi program. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["File System", "CPU", "Driver", "Command Line Linux", "Partisi"], k: "B", ci: 1, p: "CPU (Central Processing Unit) adalah otak pemroses komputer yang mengeksekusi instruksi logika dan aritmatika software." },
  { n: 2, c: "memori kerja sementara yang menyimpan data aktif dan akan kehilangan isinya ketika daya mati. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["DNS Server", "File System", "NAT pada VM", "Command Line Linux", "RAM"], k: "E", ci: 4, p: "RAM (Random Access Memory) merupakan memori primer yang bersifat volatil (data hilang saat pasokan listrik mati)." },
  { n: 3, c: "media penyimpanan berbasis memori flash yang umumnya memiliki akses lebih cepat daripada harddisk mekanis. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["SSD", "Service/Daemon", "Bridged Adapter", "Web Server", "Host-only Adapter"], k: "A", ci: 0, p: "SSD (Solid State Drive) menggunakan chip flash NAND tanpa komponen piringan mekanik bergerak sehingga kecepatan I/O jauh lebih tinggi." },
  { n: 4, c: "antarmuka jaringan yang menghubungkan komputer ke media jaringan dan mempunyai alamat MAC. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["BIOS/UEFI", "DNS Server", "NIC", "Backup", "File System"], k: "C", ci: 2, p: "NIC (Network Interface Card) adalah kartu/port fisik yang menghubungkan host ke media jaringan dan memiliki MAC address layer 2 bawaan pabrik." },
  { n: 5, c: "firmware yang menginisialisasi perangkat keras dan mengatur proses boot sebelum sistem operasi berjalan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["BIOS/UEFI", "Partisi", "Driver", "Service/Daemon", "File System"], k: "A", ci: 0, p: "BIOS/UEFI adalah firmware pada motherboard komputer yang melakukan POST (Power-On Self-Test) dan memuat bootloader OS." },
  { n: 6, c: "pembagian logis media penyimpanan menjadi beberapa bagian untuk sistem, data, atau kebutuhan lain. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Driver", "BIOS/UEFI", "Partisi", "Command Line Linux", "File System"], k: "C", ci: 2, p: "Partisi membagi kapasitas fisik drive menjadi volume/blok logis terpisah (misalnya partisi root /, swap, dan /home di Linux)." },
  { n: 7, c: "struktur yang mengatur penamaan, penyimpanan, izin, dan pengambilan berkas pada media penyimpanan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Driver", "Command Line Linux", "File System", "BIOS/UEFI", "Service/Daemon"], k: "C", ci: 2, p: "File System (seperti ext4, NTFS, XFS) mengorganisasi struktur direktori, metadata inode, hak akses izin (chmod/chown), dan blok penyimpanan file." },
  { n: 8, c: "perangkat lunak penghubung agar sistem operasi dapat berkomunikasi dengan perangkat keras. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["File System", "Command Line Linux", "Driver", "Service/Daemon", "BIOS/UEFI"], k: "C", ci: 2, p: "Device Driver adalah modul software khusus yang menerjemahkan instruksi sistem operasi ke perintah tingkat rendah perangkat keras (hardware)." },
  { n: 9, c: "antarmuka berbasis teks untuk menjalankan perintah administrasi, navigasi, konfigurasi, dan diagnosis. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Command Line Linux", "Partisi", "BIOS/UEFI", "Driver", "Service/Daemon"], k: "A", ci: 0, p: "CLI (Command Line Interface) Linux (misalnya Bash shell) memungkinkan sysadmin mengontrol server secara efisien lewat perintah teks." },
  { n: 10, c: "program latar belakang yang menyediakan fungsi tertentu dan dapat diatur mulai, berhenti, atau otomatis saat boot. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Command Line Linux", "Driver", "File System", "Service/Daemon", "BIOS/UEFI"], k: "D", ci: 3, p: "Service atau Daemon (dikelola lewat systemd/systemctl) berjalan di latar belakang tanpa interaksi langsung layar pengguna untuk menyediakan layanan (misal sshd, apache2)." },
  { n: 11, c: "lapisan perangkat lunak yang membuat dan menjalankan mesin virtual dengan membagi sumber daya host. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["NAT pada VM", "Bridged Adapter", "Snapshot", "Host-only Adapter", "Hypervisor"], k: "E", ci: 4, p: "Hypervisor (seperti KVM, Proxmox, VMware ESXi, VirtualBox) memvirtualisasikan CPU, RAM, disk, dan jaringan untuk menjalankan banyak Guest OS." },
  { n: 12, c: "rekaman keadaan mesin virtual pada suatu waktu yang berguna untuk kembali ke kondisi sebelumnya. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Snapshot", "NAT pada VM", "Hypervisor", "Bridged Adapter", "Host-only Adapter"], k: "A", ci: 0, p: "Snapshot menyimpan kondisi state VM (RAM, disk, konfigurasi) pada titik waktu tertentu sehingga mudah di-revert jika uji konfigurasi gagal." },
  { n: 13, c: "mode jaringan yang memberi VM akses keluar melalui host tanpa langsung muncul sebagai perangkat terpisah di LAN. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["NAT pada VM", "Snapshot", "Host-only Adapter", "Bridged Adapter", "Hypervisor"], k: "A", ci: 0, p: "Mode NAT menerjemahkan trafik VM menggunakan IP host; VM bisa mengakses internet tetapi perangkat lain di LAN tidak bisa langsung mengontak IP VM." },
  { n: 14, c: "mode jaringan yang membuat mesin virtual terhubung ke LAN seperti perangkat fisik tersendiri. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Snapshot", "Hypervisor", "Bridged Adapter", "Host-only Adapter", "NAT pada VM"], k: "C", ci: 2, p: "Mode Bridged menjembatani virtual NIC VM langsung ke adapter fisik host sehingga VM mendapatkan IP dari subnet LAN yang sama dan dapat diakses publik LAN." },
  { n: 15, c: "mode jaringan yang membatasi komunikasi antara host dan VM dalam jaringan virtual lokal. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Bridged Adapter", "Hypervisor", "Host-only Adapter", "NAT pada VM", "Snapshot"], k: "C", ci: 2, p: "Host-only adapter mengisolasi VM dalam jaringan privat virtual yang hanya menghubungkan VM dengan host komputer fisik tanpa akses ke gateway internet luar." },
  { n: 16, c: "layanan yang memberikan konfigurasi IP, subnet mask, gateway, dan DNS kepada klien secara otomatis. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Backup", "SSH", "DNS Server", "Web Server", "DHCP Server"], k: "E", ci: 4, p: "DHCP (Dynamic Host Configuration Protocol) Server menyewakan lease IP address, netmask, default gateway, dan DNS resolver ke host klien secara otomatis." },
  { n: 17, c: "layanan yang menerjemahkan nama domain menjadi alamat IP atau sebaliknya. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Backup", "DNS Server", "DHCP Server", "SSH", "Web Server"], k: "B", ci: 1, p: "DNS (Domain Name System) menerjemahkan FQDN nama domain (misal smk.sch.id) menjadi alamat IP numerik (forward lookup) atau sebaliknya (reverse lookup)." },
  { n: 18, c: "layanan yang menyajikan halaman atau aplikasi melalui protokol HTTP atau HTTPS. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["DNS Server", "DHCP Server", "SSH", "Web Server", "Backup"], k: "D", ci: 3, p: "Web Server (seperti Nginx, Apache) melayani request client browser melalui protokol port 80 (HTTP) dan port 443 (HTTPS)." },
  { n: 19, c: "protokol administrasi jarak jauh terenkripsi untuk masuk dan menjalankan perintah pada perangkat atau server. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["DNS Server", "Web Server", "SSH", "Backup", "DHCP Server"], k: "C", ci: 2, p: "SSH (Secure Shell) berjalan di port 22 menggunakan kriptografi asimetris/simetris untuk remote login dan command execution yang aman." },
  { n: 20, c: "salinan data atau konfigurasi yang disiapkan agar sistem dapat dipulihkan setelah kerusakan atau kesalahan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Web Server", "Backup", "DHCP Server", "SSH", "DNS Server"], k: "B", ci: 1, p: "Backup adalah salinan protektif data dan file konfigurasi sistem untuk mitigasi bencana (Disaster Recovery)." },
  { n: 21, c: "Instalasi Linux di mesin virtual gagal karena ruang disk tidak cukup. Tindakan paling tepat adalah ...", opts: ["Mengganti ISO menjadi EXE", "Memperbesar disk virtual atau membuat VM baru dengan kapasitas disk yang memadai", "Mengubah NAT menjadi bridged", "Menambah jumlah core CPU maksimum", "Menekan refresh berulang kali"], k: "B", ci: 1, p: "Solusi kekurangan disk space pada virtualisasi adalah menambah ukuran virtual hard disk (VHD/VMDK) pada settings VM atau membuat VM baru dengan alokasi storage cukup." },
  { n: 22, c: "Komputer baru tidak mendeteksi NIC setelah instalasi sistem operasi. Langkah awal yang paling tepat adalah ...", opts: ["Memeriksa device manager/lspci dan memasang driver NIC yang sesuai", "Memformat seluruh disk lagi", "Mengganti nama komputer", "Mengubah resolusi layar", "Menghapus akun pengguna"], k: "A", ci: 0, p: "Langkah diagnosis hardware NIC belum terdeteksi OS: cek `lspci` di Linux atau Device Manager di Windows, lalu install driver chipset ethernet/WLAN yang sesuai." },
  { n: 23, c: "Sebuah VM harus dapat diakses langsung oleh komputer lain di LAN dan memperoleh IP dari DHCP LAN. Mode yang tepat adalah ...", opts: ["Internal clipboard", "Host-only Adapter", "Disabled", "Bridged Adapter", "NAT"], k: "D", ci: 3, p: "Mode Bridged Adapter menempatkan kartu jaringan VM langsung sejajar pada segmen fisik LAN host sehingga VM memperoleh IP dari DHCP LAN." },
  { n: 24, c: "Siswa akan mencoba perubahan konfigurasi berisiko pada server virtual. Tindakan sebelum perubahan adalah ...", opts: ["Menambah wallpaper", "Membuat snapshot dan backup konfigurasi", "Menonaktifkan semua keamanan", "Menghapus log", "Mengganti hostname tanpa catatan"], k: "B", ci: 1, p: "Sebelum mengubah konfigurasi kritis server: ambil snapshot VM dan backup file konfigurasi (misal /etc/...) agar dapat di-rollback jika terjadi error." },
  { n: 25, c: "Server web gagal berjalan setelah konfigurasi diubah. Prosedur diagnosis yang tepat adalah ...", opts: ["Menghapus seluruh sistem operasi", "Mengganti monitor", "Memutus semua kabel LAN", "Restart terus-menerus tanpa membaca pesan", "Memeriksa status layanan dan log, memvalidasi konfigurasi, lalu melakukan perbaikan terukur"], k: "E", ci: 4, p: "Diagnosis sistematis Linux: periksa `systemctl status <service>`, baca error log di `/var/log/`, cek validitas sintaks konfigurasi (misal `nginx -t`), lalu perbaiki parameternya." },
  { n: 26, c: "Pengguna tidak boleh memasang aplikasi atau mengubah sistem. Jenis akun yang tepat adalah ...", opts: ["Akun tanpa kata sandi", "Satu akun bersama administrator", "Akun root untuk semua pengguna", "Akun BIOS", "Akun standar dengan hak minimum"], k: "E", ci: 4, p: "Prinsip Least Privilege: berikan akun standar (standard user tanpa hak sudo/administrator) agar pengguna tidak dapat memodifikasi file sistem atau menginstall program sembarangan." },
  { n: 27, c: "VM dengan NAT dapat mengakses internet tetapi tidak dapat langsung diakses dari LAN. Kondisi tersebut ...", opts: ["Wajar; perlu bridged atau port forwarding sesuai tujuan", "Berarti CPU tidak kompatibel", "Harus diperbaiki dengan crimping", "Membuktikan RAM rusak", "Menunjukkan file system salah"], k: "A", ci: 0, p: "Karakteristik bawaan mode NAT menyembunyikan IP guest di balik IP host. Untuk dapat diakses dari luar, perlu konfigurasi Port Forwarding atau ubah ke Bridged." },
  { n: 28, c: "Sebuah server harus memberikan alamat IP otomatis kepada klien. Layanan yang dipasang adalah ...", opts: ["SSH", "DHCP Server", "Web Server", "FTP client", "DNS Server"], k: "B", ci: 1, p: "Layanan penugasan IP address otomatis ke klien di jaringan lokal adalah DHCP Server (misal ISC-DHCP-Server atau dnsmasq)." },
  { n: 29, c: "Pengguna dapat ping IP server tetapi tidak dapat mengakses nama server. Fokus pemeriksaan pertama adalah ...", opts: ["Ukuran RAM", "Kecepatan kipas", "BIOS password", "Warna kabel", "DNS dan konfigurasi resolusi nama"], k: "E", ci: 4, p: "Jika ping IP berhasil tapi nama FQDN tidak bisa diakses, maka konektivitas layer 3 normal dan sumber masalah ada pada resolusi nama (DNS server/resolv.conf/hosts)." },
  { n: 30, c: "Cadangan konfigurasi tersedia tetapi belum pernah diuji. Penilaian yang benar adalah ...", opts: ["Backup dapat menggantikan pembaruan", "Backup pasti sempurna karena file ada", "Backup harus disimpan hanya pada server yang sama", "Backup tidak perlu dicatat", "Backup belum dapat dianggap andal sebelum dilakukan uji pemulihan"], k: "E", ci: 4, p: "Prinsip Disaster Recovery: file backup belum terverifikasi andal sebelum dilakukan uji restore (pemulihan) secara berkala untuk memastikan integritas datanya." }
];

const m2_kategori_keys = [
  // 31: B, B, B
  { n: 31, sts: [
    { id: "A", text: "Hypervisor paling tepat dijelaskan sebagai lapisan perangkat lunak yang membuat dan menjalankan mesin virtual dengan membagi sumber daya host.", answer: "Benar" },
    { id: "B", text: "Host-only Adapter paling tepat dijelaskan sebagai mode jaringan yang membatasi komunikasi antara host dan VM dalam jaringan virtual lokal.", answer: "Benar" },
    { id: "C", text: "File System paling tepat dijelaskan sebagai struktur yang mengatur penamaan, penyimpanan, izin, dan pengambilan berkas pada media penyimpanan.", answer: "Benar" }
  ], p: "Ketiga pernyataan mendefinisikan Hypervisor, Host-only adapter, dan File System secara tepat." },
  // 32: S, S, S
  { n: 32, sts: [
    { id: "A", text: "Snapshot paling tepat dijelaskan sebagai memori kerja sementara yang menyimpan data aktif dan akan kehilangan isinya ketika daya mati.", answer: "Salah" },
    { id: "B", text: "NIC paling tepat dijelaskan sebagai antarmuka berbasis teks untuk menjalankan perintah administrasi, navigasi, konfigurasi, dan diagnosis.", answer: "Salah" },
    { id: "C", text: "RAM paling tepat dijelaskan sebagai struktur yang mengatur penamaan, penyimpanan, izin, dan pengambilan berkas pada media penyimpanan.", answer: "Salah" }
  ], p: "Semua salah: A adalah definisi RAM, B adalah definisi CLI Linux, C adalah definisi File System." },
  // 33: S, S, B
  { n: 33, sts: [
    { id: "A", text: "Service/Daemon paling tepat dijelaskan sebagai mode jaringan yang membatasi komunikasi antara host dan VM dalam jaringan virtual lokal.", answer: "Salah" },
    { id: "B", text: "Driver paling tepat dijelaskan sebagai mode jaringan yang memberi VM akses keluar melalui host tanpa langsung muncul sebagai perangkat terpisah di LAN.", answer: "Salah" },
    { id: "C", text: "SSD paling tepat dijelaskan sebagai media penyimpanan berbasis memori flash yang umumnya memiliki akses lebih cepat daripada harddisk mekanis.", answer: "Benar" }
  ], p: "A salah (itu host-only adapter), B salah (itu mode NAT), C benar (SSD berbasis memori flash)." },
  // 34: B, S, B
  { n: 34, sts: [
    { id: "A", text: "NIC paling tepat dijelaskan sebagai antarmuka jaringan yang menghubungkan komputer ke media jaringan dan mempunyai alamat MAC.", answer: "Benar" },
    { id: "B", text: "SSD paling tepat dijelaskan sebagai perangkat lunak penghubung agar sistem operasi dapat berkomunikasi dengan perangkat keras.", answer: "Salah" },
    { id: "C", text: "Snapshot paling tepat dijelaskan sebagai rekaman keadaan mesin virtual pada suatu waktu yang berguna untuk kembali ke kondisi sebelumnya.", answer: "Benar" }
  ], p: "A benar, B salah (itu driver perangkat lunak), C benar (definisi snapshot VM)." },
  // 35: S, S, S
  { n: 35, sts: [
    { id: "A", text: "Host-only Adapter paling tepat dijelaskan sebagai firmware yang menginisialisasi perangkat keras dan mengatur proses boot sebelum sistem operasi berjalan.", answer: "Salah" },
    { id: "B", text: "File System paling tepat dijelaskan sebagai rekaman keadaan mesin virtual pada suatu waktu yang berguna untuk kembali ke kondisi sebelumnya.", answer: "Salah" },
    { id: "C", text: "Partisi paling tepat dijelaskan sebagai lapisan perangkat lunak yang membuat dan menjalankan mesin virtual dengan membagi sumber daya host.", answer: "Salah" }
  ], p: "Ketiga pernyataan salah: A adalah BIOS/UEFI, B adalah Snapshot, C adalah Hypervisor." },
  // 36: B, S, B
  { n: 36, sts: [
    { id: "A", text: "Partisi paling tepat dijelaskan sebagai pembagian logis media penyimpanan menjadi beberapa bagian untuk sistem, data, atau kebutuhan lain.", answer: "Benar" },
    { id: "B", text: "CPU paling tepat dijelaskan sebagai pembagian logis media penyimpanan menjadi beberapa bagian untuk sistem, data, atau kebutuhan lain.", answer: "Salah" },
    { id: "C", text: "BIOS/UEFI paling tepat dijelaskan sebagai firmware yang menginisialisasi perangkat keras dan mengatur proses boot sebelum sistem operasi berjalan.", answer: "Benar" }
  ], p: "A benar, B salah (CPU pemroses logika), C benar (definisi BIOS/UEFI)." },
  // 37: B, S, B
  { n: 37, sts: [
    { id: "A", text: "Bridged Adapter paling tepat dijelaskan sebagai mode jaringan yang membuat mesin virtual terhubung ke LAN seperti perangkat fisik tersendiri.", answer: "Benar" },
    { id: "B", text: "NAT pada VM paling tepat dijelaskan sebagai media penyimpanan berbasis memori flash yang umumnya memiliki akses lebih cepat daripada harddisk mekanis.", answer: "Salah" },
    { id: "C", text: "Driver paling tepat dijelaskan sebagai perangkat lunak penghubung agar sistem operasi dapat berkomunikasi dengan perangkat keras.", answer: "Benar" }
  ], p: "A benar, B salah (itu SSD), C benar." },
  // 38: S, B, B
  { n: 38, sts: [
    { id: "A", text: "BIOS/UEFI paling tepat dijelaskan sebagai program latar belakang yang menyediakan fungsi tertentu dan dapat diatur mulai, berhenti, atau otomatis saat boot.", answer: "Salah" },
    { id: "B", text: "NAT pada VM paling tepat dijelaskan sebagai mode jaringan yang memberi VM akses keluar melalui host tanpa langsung muncul sebagai perangkat terpisah di LAN.", answer: "Benar" },
    { id: "C", text: "Service/Daemon paling tepat dijelaskan sebagai program latar belakang yang menyediakan fungsi tertentu dan dapat diatur mulai, berhenti, atau otomatis saat boot.", answer: "Benar" }
  ], p: "A salah (itu Service/Daemon), B benar, C benar." },
  // 39: S, B, B
  { n: 39, sts: [
    { id: "A", text: "Hypervisor paling tepat dijelaskan sebagai komponen pemroses instruksi dan operasi logika yang menjadi pusat eksekusi program.", answer: "Salah" },
    { id: "B", text: "RAM paling tepat dijelaskan sebagai memori kerja sementara yang menyimpan data aktif dan akan kehilangan isinya ketika daya mati.", answer: "Benar" },
    { id: "C", text: "CPU paling tepat dijelaskan sebagai komponen pemroses instruksi dan operasi logika yang menjadi pusat eksekusi program.", answer: "Benar" }
  ], p: "A salah (itu CPU), B benar (RAM volatil), C benar." },
  // 40: B, S, S
  { n: 40, sts: [
    { id: "A", text: "Command Line Linux paling tepat dijelaskan sebagai antarmuka berbasis teks untuk menjalankan perintah administrasi, navigasi, konfigurasi, dan diagnosis.", answer: "Benar" },
    { id: "B", text: "Bridged Adapter paling tepat dijelaskan sebagai antarmuka jaringan yang menghubungkan komputer ke media jaringan dan mempunyai alamat MAC.", answer: "Salah" },
    { id: "C", text: "Command Line Linux paling tepat dijelaskan sebagai mode jaringan yang membuat mesin virtual terhubung ke LAN seperti perangkat fisik tersendiri.", answer: "Salah" }
  ], p: "A benar, B salah (itu NIC), C salah (itu Bridged Adapter)." }
];

const m2_mcma_raw = [
  { n: 41, c: "Sebelum instalasi sistem operasi, teknisi perlu ... (Jawaban benar lebih dari satu)", opts: ["Memeriksa kebutuhan perangkat keras", "Mencadangkan data penting", "Memverifikasi media instalasi", "Memformat tanpa konfirmasi", "Mengabaikan daya listrik"], p: "Pra-instalasi OS wajib cek hardware requirements, backup data, dan verifikasi checksum media ISO/USB instalasi." },
  { n: 42, c: "Akun server yang aman menerapkan ... (Jawaban benar lebih dari satu)", opts: ["Hak minimum sesuai tugas", "Kata sandi kuat", "Pencatatan aktivitas administratif", "Satu akun root bersama", "Login tanpa password"], p: "Keamanan akun server: least privilege, password kompleks, serta audit logging berkala." },
  { n: 43, c: "VM akan digunakan sebagai server yang diakses LAN. Tindakan sesuai adalah ... (Jawaban benar lebih dari satu)", opts: ["Memilih bridged atau konfigurasi jaringan yang memungkinkan akses", "Mengalokasikan RAM dan disk memadai", "Menguji IP dan layanan dari klien", "Menonaktifkan NIC VM", "Menganggap NAT selalu dapat diakses langsung"], p: "VM server LAN butuh mode Bridged/Static routing, alokasi resource memadai, dan uji konektivitas end-to-end dari klien." },
  { n: 44, c: "Snapshot digunakan secara tepat ketika ... (Jawaban benar lebih dari satu)", opts: ["Dibuat sebelum perubahan berisiko", "Diberi nama dan catatan waktu", "Tetap disertai backup untuk data penting", "Dianggap pengganti backup selamanya", "Dibiarkan menumpuk tanpa pengelolaan"], p: "Snapshot dibuat sesaat sebelum update/perubahan berisiko dan diberi label jelas. Snapshot bukan pengganti backup permanen." },
  { n: 45, c: "Diagnosis service Linux yang gagal mencakup ... (Jawaban benar lebih dari satu)", opts: ["Memeriksa systemctl status", "Membaca log", "Memvalidasi file konfigurasi", "Menghapus sistem operasi langsung", "Mengganti monitor"], p: "Diagnosis service Linux: cek systemctl status, analisa log systemd/journalctl, dan periksa validitas sintaks file config." },
  { n: 46, c: "Konfigurasi DHCP server memerlukan ... (Jawaban benar lebih dari satu)", opts: ["Rentang alamat yang sesuai", "Subnet mask dan gateway yang benar", "DNS serta pengecualian alamat jika perlu", "Pool tumpang tindih tanpa kontrol", "Alamat gateway di luar desain tanpa alasan"], p: "Elemen konfigurasi DHCP: IP pool range, netmask, default gateway, DNS server, dan IP reservation/exclusion list." },
  { n: 47, c: "DNS server yang baik perlu ... (Jawaban benar lebih dari satu)", opts: ["Record yang benar", "Layanan aktif dan port dapat diakses", "Pengujian resolusi dari klien", "Menghapus seluruh cache setiap menit", "Menggunakan nama acak tanpa dokumentasi"], p: "DNS andal mensyaratkan record zona (A, CNAME, PTR) valid, port 53 UDP/TCP terbuka, dan uji nslookup/dig dari klien sukses." },
  { n: 48, c: "Backup yang andal mencakup ... (Jawaban benar lebih dari satu)", opts: ["Jadwal dan cakupan jelas", "Salinan pada media/lokasi berbeda", "Uji restore berkala", "Hanya satu salinan di disk server yang sama", "Tidak ada pencatatan"], p: "Strategi 3-2-1 backup: jadwal teratur, media berbeda/off-site, dan verifikasi berkala uji pemulihan (restore testing)." },
  { n: 49, c: "Setelah instalasi OS, pekerjaan yang perlu dilakukan adalah ... (Jawaban benar lebih dari satu)", opts: ["Memasang pembaruan dan driver", "Mengatur akun serta keamanan", "Menguji perangkat dan jaringan", "Membiarkan akun default", "Menonaktifkan log"], p: "Pasca-instalasi OS: instalasi security patch/driver, setup user & firewall, serta pengujian fungsionalitas hardware & network." },
  { n: 50, c: "Pengelolaan sumber daya VM yang benar adalah ... (Jawaban benar lebih dari satu)", opts: ["Menyisakan sumber daya untuk host", "Memberi disk sesuai kebutuhan", "Memantau penggunaan CPU dan RAM", "Mengalokasikan seluruh RAM host ke satu VM", "Mengabaikan kapasitas penyimpanan"], p: "Best practice virtualisasi: sisakan RAM/CPU yang cukup untuk host OS, alokasikan storage proporsional, dan monitor resource utilization." }
];

const m2_full = [];
m2_raw_pg.forEach(item => {
  m2_full.push({
    num: item.n,
    kompetensi: kompetensiM2,
    subKompetensi: subKompetensiM2,
    kasus: item.c,
    options: item.opts,
    kunci: item.k,
    correctIndex: item.ci,
    pembahasan: item.p
  });
});
m2_kategori_keys.forEach(item => {
  m2_full.push({
    num: item.n,
    kompetensi: kompetensiM2,
    subKompetensi: subKompetensiM2,
    kasus: "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    statements: item.sts,
    pembahasan: item.p
  });
});
m2_mcma_raw.forEach(item => {
  m2_full.push({
    num: item.n,
    kompetensi: kompetensiM2,
    subKompetensi: subKompetensiM2,
    kasus: item.c,
    options: item.opts,
    kunci: "Pernyataan 1, Pernyataan 2, Pernyataan 3",
    correctIndices: [0, 1, 2],
    pembahasan: item.p
  });
});

writeTsFile(2, transformWeekData(m2_full, 2));

// ----------------------------------------------------
// MINGGU 3 DATA
// ----------------------------------------------------
const kompetensiM3 = "Menerapkan, menginterpretasi, dan mengoperasikan perangkat keras, sistem operasi, serta layanan jaringan dasar pada infrastruktur Teknik Jaringan Komputer dan Telekomunikasi secara mandiri dan sesuai standar operasional.";
const subKompetensiM3 = "Pengoperasian dan Konfigurasi Dasar Perangkat TJKT";

const m3_raw_pg = [
  { n: 1, c: "perangkat yang meneruskan paket antarjaringan berdasarkan alamat IP dan tabel routing. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Modem", "Access Point", "Router", "Hub", "Switch"], k: "C", ci: 2, p: "Router bekerja pada Layer 3 (Network Layer) meneruskan paket antar-subnet berbeda berdasarkan IP tujuan dan routing table." },
  { n: 2, c: "perangkat LAN yang meneruskan frame berdasarkan alamat MAC dan port. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Router", "Switch", "Hub", "Modem", "Access Point"], k: "B", ci: 1, p: "Switch bekerja pada Layer 2 (Data Link) menggunakan MAC Address Table untuk meneruskan frame ke port tujuan secara spesifik (unicast)." },
  { n: 3, c: "perangkat sederhana yang mengirim sinyal masuk ke seluruh port tanpa mempelajari alamat. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Router", "Access Point", "Modem", "Hub", "Switch"], k: "D", ci: 3, p: "Hub bekerja pada Layer 1 (Physical) sebagai multiport repeater pasif yang membroadcast frame ke semua port sehingga rawan collision." },
  { n: 4, c: "perangkat yang menghubungkan klien nirkabel ke jaringan kabel atau distribusi. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Modem", "Access Point", "Hub", "Router", "Switch"], k: "B", ci: 1, p: "Access Point (AP) mengonversi sinyal nirkabel radio Wi-Fi (802.11) ke jaringan kabel Ethernet (802.3)." },
  { n: 5, c: "perangkat yang melakukan modulasi atau penyesuaian sinyal untuk menghubungkan jaringan ke media layanan tertentu. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Access Point", "Modem", "Switch", "Hub", "Router"], k: "B", ci: 1, p: "Modem (Modulator-Demodulator) mengubah sinyal digital komputer menjadi sinyal analog carrier (atau sebaliknya) untuk media transmisi tertentu." },
  { n: 6, c: "alamat router yang digunakan host untuk mencapai jaringan di luar subnet lokal. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Router", "Default Gateway", "Ping", "Access Point", "VLAN"], k: "B", ci: 1, p: "Default Gateway adalah IP interface router lokal tempat host mengirimkan paket yang ditujukan ke luar jaringan subnet lokalnya." },
  { n: 7, c: "pemisahan jaringan logis pada infrastruktur switch untuk membentuk broadcast domain berbeda. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Access Port", "VLAN", "Default Route", "Subnet Mask", "Static Route"], k: "B", ci: 1, p: "VLAN (Virtual Local Area Network) memecah switch fisik menjadi beberapa broadcast domain logis terpisah demi keamanan dan efisiensi broadcast." },
  { n: 8, c: "port switch yang membawa satu VLAN untuk perangkat akhir. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Default Gateway", "IP Configuration", "Switch", "Access Port", "Router"], k: "D", ci: 3, p: "Access Port dikonfigurasikan hanya membawa trafik single VLAN tanpa tag 802.1Q dan dihubungkan ke end-device (PC, printer, IP phone)." },
  { n: 9, c: "port switch yang membawa beberapa VLAN antarperangkat jaringan dengan penandaan VLAN. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["IP Configuration", "Subnet Mask", "Static Route", "Trunk Port", "Access Port"], k: "D", ci: 3, p: "Trunk Port (IEEE 802.1Q) menyematkan VLAN Tag pada header frame untuk melewatkan trafik multi-VLAN antar switch atau switch-ke-router." },
  { n: 10, c: "rute yang dimasukkan administrator secara manual menuju jaringan tujuan tertentu. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Trunk Port", "Static Route", "Access Point", "Access Port", "Modem"], k: "B", ci: 1, p: "Static Route diinput secara manual oleh administrator jaringan pada tabel routing yang menentukan network tujuan, prefix mask, dan next-hop." },
  { n: 11, c: "rute umum yang digunakan ketika tidak ada rute yang lebih spesifik dalam tabel routing. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Subnet Mask", "MAC Address Table", "Default Route", "DNS Resolver", "DHCP Pool"], k: "C", ci: 2, p: "Default Route (0.0.0.0/0 pada IPv4 atau ::/0 pada IPv6) menjadi rute gateway of last resort saat paket tujuan tidak cocok dengan rute lain di tabel routing." },
  { n: 12, c: "mekanisme penerjemahan alamat IP, sering digunakan agar banyak alamat privat berbagi akses keluar. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Router", "NAT", "IP Configuration", "Subnet Mask", "DHCP Pool"], k: "B", ci: 1, p: "NAT (Network Address Translation) atau NAPT/PAT memetakan IP privat lokal (RFC 1918) ke IP publik untuk komunikasi ke internet." },
  { n: 13, c: "rentang dan parameter alamat yang disediakan DHCP untuk diberikan kepada klien. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["DHCP Pool", "Trunk Port", "Subnet Mask", "Default Gateway", "IP Configuration"], k: "A", ci: 0, p: "DHCP Pool (scope) mendefinisikan kumpulan rentang alamat IP yang siap dialokasikan DHCP server ke klien." },
  { n: 14, c: "komponen yang mencari jawaban nama domain untuk klien melalui cache atau server lain. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Access Port", "Ping", "DNS Resolver", "Hub", "ARP Table"], k: "C", ci: 2, p: "DNS Resolver (klien atau recursive server) bertugas mengkueri nama domain ke server otoritatif berjenjang untuk memperoleh alamat IP." },
  { n: 15, c: "alat untuk menguji keterjangkauan dan waktu respons menggunakan pesan ICMP. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["MAC Address Table", "IP Configuration", "Ping", "Traceroute", "ARP Table"], k: "C", ci: 2, p: "Ping memanfaatkan protokol ICMP Echo Request dan Echo Reply untuk mengecek reachability dan Round Trip Time (RTT) suatu host." },
  { n: 16, c: "alat untuk melihat lintasan hop yang dilalui paket menuju tujuan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["IP Configuration", "ARP Table", "Traceroute", "MAC Address Table", "Ping"], k: "C", ci: 2, p: "Traceroute (tracert) memanfaatkan manipulasi TTL (Time to Live) IP untuk memetakan setiap router hop di sepanjang rute transmisi paket." },
  { n: 17, c: "tabel pemetaan alamat IPv4 lokal ke alamat MAC yang diketahui host. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Traceroute", "ARP Table", "MAC Address Table", "IP Configuration", "Ping"], k: "B", ci: 1, p: "ARP (Address Resolution Protocol) Table memetakan IP address Layer 3 ke MAC address Layer 2 pada antarmuka jaringan lokal." },
  { n: 18, c: "informasi alamat IP, prefix atau subnet mask, gateway, dan DNS pada suatu antarmuka. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["ARP Table", "Ping", "MAC Address Table", "IP Configuration", "Traceroute"], k: "D", ci: 3, p: "IP Configuration merangkum seluruh parameter layer 3 antarmuka (IP, netmask, default gateway, dan primary/secondary DNS)." },
  { n: 19, c: "tabel pada switch yang memetakan alamat MAC dengan port tempat alamat tersebut dipelajari. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["MAC Address Table", "ARP Table", "Traceroute", "Ping", "IP Configuration"], k: "A", ci: 0, p: "MAC Address Table (CAM Table) switch mengasosiasikan source MAC address frame yang masuk dengan nomor port fisik tempat frame tersebut diterima." },
  { n: 20, c: "nilai yang membedakan bagian jaringan dan bagian host pada alamat IPv4. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["NAT", "ARP Table", "DHCP Pool", "IP Configuration", "Subnet Mask"], k: "E", ci: 4, p: "Subnet Mask (misal 255.255.255.0 atau prefix /24) menggunakan bit 1 untuk network ID dan bit 0 untuk host ID." },
  { n: 21, c: "Komputer satu subnet tidak dapat terhubung dan lampu link mati. Pemeriksaan pertama adalah ...", opts: ["Nama domain", "DNS publik", "Sertifikat HTTPS", "Daya perangkat, kabel, konektor, dan status port", "Static route internet"], k: "D", ci: 3, p: "Lampu link mati adalah indikasi kegagalan Layer 1 (Physical). Cek kabel UTP, jack RJ45, port switch, dan daya perangkat." },
  { n: 22, c: "Dua VLAN berbeda harus saling berkomunikasi. Komponen yang diperlukan adalah ...", opts: ["Inter-VLAN routing pada router atau switch layer 3", "Patch cord crossover selalu", "Cable tester saja", "Hub pasif", "DNS resolver"], k: "A", ci: 0, p: "Karena VLAN memisahkan broadcast domain, komunikasi antar-VLAN wajib melalui routing Layer 3 (Router-on-a-Stick atau Switch Layer 3 SVI)." },
  { n: 23, c: "Port switch ke komputer pengguna hanya membawa VLAN 20. Mode port yang tepat adalah ...", opts: ["Trunk semua VLAN", "Access port VLAN 20", "Port mirroring", "Shutdown", "Loopback"], k: "B", ci: 1, p: "Port ke host pengguna akhir (PC klien) harus disetel sebagai Access Port dan diasosiasikan dengan VLAN 20." },
  { n: 24, c: "Link antar-switch harus membawa VLAN 10, 20, dan 30. Konfigurasi yang tepat adalah ...", opts: ["Access VLAN 10 saja", "DNS forwarder", "Trunk yang mengizinkan VLAN 10, 20, dan 30", "NAT overload", "DHCP reservation"], k: "C", ci: 2, p: "Link switch-to-switch harus beroperasi dalam mode Trunk (802.1Q) dengan konfigurasi `switchport trunk allowed vlan 10,20,30`." },
  { n: 25, c: "Klien mendapat IP 169.254.x.x dan tidak dapat mengakses jaringan. Penyebab yang paling mungkin adalah ...", opts: ["DNS terlalu cepat", "Gateway memakai IPv6", "Switch belajar MAC dengan benar", "Klien gagal memperoleh lease dari DHCP", "Kabel selalu crossover"], k: "D", ci: 3, p: "IP 169.254.0.0/16 adalah APIPA (Automatic Private IP Addressing), yang otomatis diberikan OS saat klien gagal menghubungi DHCP Server." },
  { n: 26, c: "Ping ke gateway berhasil, ping ke 8.8.8.8 berhasil, tetapi nama domain gagal. Masalah paling mungkin adalah ...", opts: ["NIC mati", "VLAN access", "DNS", "Kabel fisik", "Daya switch"], k: "C", ci: 2, p: "Karena ping IP numerik gateway dan internet (8.8.8.8) lancar, routing layer 3 berfungsi baik. Kegagalan akses via nama domain murni disebabkan kendala DNS." },
  { n: 27, c: "Router mempunyai beberapa rute dan menerima paket ke jaringan yang tidak ada pada rute spesifik. Rute yang dipakai adalah ...", opts: ["DHCP pool", "SSID", "Default route jika tersedia", "ARP table", "MAC address table"], k: "C", ci: 2, p: "Router menggunakan Default Route (0.0.0.0/0) sebagai jalur keluar alternatif saat tidak ditemukan rute yang cocok dalam routing table." },
  { n: 28, c: "Switch meneruskan frame berdasarkan ...", opts: ["Nama domain", "Alamat MAC tujuan dan tabel MAC", "Link budget", "Nomor seri CPU", "Alamat email"], k: "B", ci: 1, p: "Switch membaca Destination MAC Address pada header frame Layer 2, lalu mencocokkannya ke MAC Address Table untuk meneruskan frame." },
  { n: 29, c: "Perintah yang paling tepat untuk melihat lintasan hop menuju server adalah ...", opts: ["Crimping tool", "Snapshot", "Format disk", "Ping saja", "Traceroute"], k: "E", ci: 4, p: "Perintah `traceroute` (Linux) atau `tracert` (Windows) menampilkan daftar IP semua hop router yang dilalui paket sampai ke server tujuan." },
  { n: 30, c: "Teknisi mengganti banyak konfigurasi sekaligus sehingga tidak tahu perubahan mana yang memperbaiki masalah. Praktik yang benar adalah ...", opts: ["Menonaktifkan log", "Mengubah satu variabel, menguji, dan mencatat hasil", "Menghapus semua konfigurasi", "Mengabaikan baseline", "Restart setiap menit"], k: "B", ci: 1, p: "Metodologi troubleshooting ilmiah: ubah satu variabel dalam satu waktu, uji dampaknya, dan catat hasilnya sebelum mencoba konfigurasi lain." }
];

const m3_kategori_keys = [
  // 31: B, S, B
  { n: 31, sts: [
    { id: "A", text: "Router paling tepat dijelaskan sebagai perangkat yang meneruskan paket antarjaringan berdasarkan alamat IP dan tabel routing.", answer: "Benar" },
    { id: "B", text: "Default Gateway paling tepat dijelaskan sebagai rute umum yang digunakan ketika tidak ada rute yang lebih spesifik dalam tabel routing.", answer: "Salah" },
    { id: "C", text: "Trunk Port paling tepat dijelaskan sebagai port switch yang membawa beberapa VLAN antarperangkat jaringan dengan penandaan VLAN.", answer: "Benar" }
  ], p: "A benar, B salah (itu definisi Default Route, bukan Default Gateway host), C benar (trunk 802.1Q)." },
  // 32: S, S, S
  { n: 32, sts: [
    { id: "A", text: "VLAN paling tepat dijelaskan sebagai mekanisme penerjemahan alamat IP, sering digunakan agar banyak alamat privat berbagi akses keluar.", answer: "Salah" },
    { id: "B", text: "NAT paling tepat dijelaskan sebagai perangkat LAN yang meneruskan frame berdasarkan alamat MAC dan port.", answer: "Salah" },
    { id: "C", text: "Static Route paling tepat dijelaskan sebagai alat untuk menguji keterjangkauan dan waktu respons menggunakan pesan ICMP.", answer: "Salah" }
  ], p: "Ketiganya salah: A adalah NAT, B adalah Switch, C adalah Ping." },
  // 33: S, B, S
  { n: 33, sts: [
    { id: "A", text: "Ping paling tepat dijelaskan sebagai perangkat yang melakukan modulasi atau penyesuaian sinyal untuk menghubungkan jaringan ke media layanan tertentu.", answer: "Salah" },
    { id: "B", text: "Access Point paling tepat dijelaskan sebagai perangkat yang menghubungkan klien nirkabel ke jaringan kabel atau distribusi.", answer: "Benar" },
    { id: "C", text: "Access Point paling tepat dijelaskan sebagai port switch yang membawa beberapa VLAN antarperangkat jaringan dengan penandaan VLAN.", answer: "Salah" }
  ], p: "A salah (itu Modem), B benar (Access Point Wi-Fi), C salah (itu Trunk Port)." },
  // 34: S, S, B
  { n: 34, sts: [
    { id: "A", text: "DHCP Pool paling tepat dijelaskan sebagai perangkat sederhana yang mengirim sinyal masuk ke seluruh port tanpa mempelajari alamat.", answer: "Salah" },
    { id: "B", text: "Hub paling tepat dijelaskan sebagai port switch yang membawa satu VLAN untuk perangkat akhir.", answer: "Salah" },
    { id: "C", text: "DNS Resolver paling tepat dijelaskan sebagai komponen yang mencari jawaban nama domain untuk klien melalui cache atau server lain.", answer: "Benar" }
  ], p: "A salah (itu Hub), B salah (itu Access Port), C benar (DNS Resolver)." },
  // 35: S, S, B
  { n: 35, sts: [
    { id: "A", text: "Router paling tepat dijelaskan sebagai alamat router yang digunakan host untuk mencapai jaringan di luar subnet lokal.", answer: "Salah" },
    { id: "B", text: "Trunk Port paling tepat dijelaskan sebagai komponen yang mencari jawaban nama domain untuk klien melalui cache atau server lain.", answer: "Salah" },
    { id: "C", text: "Access Port paling tepat dijelaskan sebagai port switch yang membawa satu VLAN untuk perangkat akhir.", answer: "Benar" }
  ], p: "A salah (itu Default Gateway), B salah (itu DNS Resolver), C benar (Access Port single VLAN)." },
  // 36: B, B, B
  { n: 36, sts: [
    { id: "A", text: "DHCP Pool paling tepat dijelaskan sebagai rentang dan parameter alamat yang disediakan DHCP untuk diberikan kepada klien.", answer: "Benar" },
    { id: "B", text: "Ping paling tepat dijelaskan sebagai alat untuk menguji keterjangkauan dan waktu respons menggunakan pesan ICMP.", answer: "Benar" },
    { id: "C", text: "Default Gateway paling tepat dijelaskan sebagai alamat router yang digunakan host untuk mencapai jaringan di luar subnet lokal.", answer: "Benar" }
  ], p: "Ketiga pernyataan mendefinisikan DHCP Pool, Ping, dan Default Gateway dengan tepat." },
  // 37: B, B, B
  { n: 37, sts: [
    { id: "A", text: "Default Route paling tepat dijelaskan sebagai rute umum yang digunakan ketika tidak ada rute yang lebih spesifik dalam tabel routing.", answer: "Benar" },
    { id: "B", text: "Static Route paling tepat dijelaskan sebagai rute yang dimasukkan administrator secara manual menuju jaringan tujuan tertentu.", answer: "Benar" },
    { id: "C", text: "Hub paling tepat dijelaskan sebagai perangkat sederhana yang mengirim sinyal masuk ke seluruh port tanpa mempelajari alamat.", answer: "Benar" }
  ], p: "Ketiga pernyataan benar." },
  // 38: S, S, B
  { n: 38, sts: [
    { id: "A", text: "Modem paling tepat dijelaskan sebagai rute yang dimasukkan administrator secara manual menuju jaringan tujuan tertentu.", answer: "Salah" },
    { id: "B", text: "DNS Resolver paling tepat dijelaskan sebagai perangkat yang menghubungkan klien nirkabel ke jaringan kabel atau distribusi.", answer: "Salah" },
    { id: "C", text: "VLAN paling tepat dijelaskan sebagai pemisahan jaringan logis pada infrastruktur switch untuk membentuk broadcast domain berbeda.", answer: "Benar" }
  ], p: "A salah (itu Static Route), B salah (itu Access Point), C benar (definisi VLAN)." },
  // 39: B, B, S
  { n: 39, sts: [
    { id: "A", text: "Modem paling tepat dijelaskan sebagai perangkat yang melakukan modulasi atau penyesuaian sinyal untuk menghubungkan jaringan ke media layanan tertentu.", answer: "Benar" },
    { id: "B", text: "Switch paling tepat dijelaskan sebagai perangkat LAN yang meneruskan frame berdasarkan alamat MAC dan port.", answer: "Benar" },
    { id: "C", text: "Access Port paling tepat dijelaskan sebagai rentang dan parameter alamat yang disediakan DHCP untuk diberikan kepada klien.", answer: "Salah" }
  ], p: "A benar, B benar, C salah (itu DHCP Pool)." },
  // 40: B, S, S
  { n: 40, sts: [
    { id: "A", text: "NAT paling tepat dijelaskan sebagai mekanisme penerjemahan alamat IP, sering digunakan agar banyak alamat privat berbagi akses keluar.", answer: "Benar" },
    { id: "B", text: "Switch paling tepat dijelaskan sebagai pemisahan jaringan logis pada infrastruktur switch untuk membentuk broadcast domain berbeda.", answer: "Salah" },
    { id: "C", text: "Default Route paling tepat dijelaskan sebagai perangkat yang meneruskan paket antarjaringan berdasarkan alamat IP dan tabel routing.", answer: "Salah" }
  ], p: "A benar (NAT), B salah (itu VLAN), C salah (itu Router)." }
];

const m3_mcma_raw = [
  { n: 41, c: "Troubleshooting konektivitas dilakukan dengan ... (Jawaban benar lebih dari satu)", opts: ["Memeriksa link fisik", "Memeriksa IP, mask, gateway, dan DNS", "Menguji bertahap dari lokal ke luar", "Mengganti semua perangkat sekaligus", "Menonaktifkan log"], p: "Metode isolasi gangguan: verifikasi kabel fisik, periksa parameter IP host, dan uji bertahap (ping loopback -> gateway -> DNS internet)." },
  { n: 42, c: "Konfigurasi VLAN yang benar mencakup ... (Jawaban benar lebih dari satu)", opts: ["Membuat VLAN sesuai desain", "Menempatkan access port pada VLAN yang benar", "Mengizinkan VLAN pada trunk yang diperlukan", "Menetapkan semua port ke semua VLAN tanpa alasan", "Mengabaikan native VLAN mismatch"], p: "Konfigurasi VLAN tepat: buat ID VLAN, assign port access ke VLAN anggota yang tepat, dan izinkan ID VLAN terkait pada link trunk." },
  { n: 43, c: "Inter-VLAN routing memerlukan ... (Jawaban benar lebih dari satu)", opts: ["Antarmuka/SVI atau subinterface yang benar", "Alamat gateway tiap VLAN", "Routing aktif", "Hub pasif sebagai router", "DNS sebagai pengganti routing"], p: "Inter-VLAN routing membutuhkan gateway virtual (SVI/sub-interface dengan enkapsulasi dot1q) dan tabel routing layer 3 aktif." },
  { n: 44, c: "DHCP gagal memberi IP. Hal yang perlu diperiksa adalah ... (Jawaban benar lebih dari satu)", opts: ["Status layanan dan pool", "VLAN atau relay DHCP", "Firewall dan konektivitas", "Warna kabel", "Nama pengguna browser"], p: "Troubleshoot DHCP: pastikan service aktif, IP pool belum habis, helper-address (DHCP relay) terpasang jika lintas VLAN, dan port 67/68 tidak terblokir firewall." },
  { n: 45, c: "DNS diduga bermasalah jika ... (Jawaban benar lebih dari satu)", opts: ["Ping ke IP berhasil tetapi nama gagal", "Query DNS timeout", "Resolver klien salah", "Lampu link mati selalu", "CPU tidak memiliki wallpaper"], p: "Indikasi problem DNS: ping alamat IP sukses tapi gagal buka domain web, nslookup timeout, atau alamat DNS resolver pada konfigurasi IP klien keliru." },
  { n: 46, c: "Static route yang baik harus ... (Jawaban benar lebih dari satu)", opts: ["Menunjuk next-hop atau interface yang benar", "Menggunakan jaringan tujuan dan prefix tepat", "Diverifikasi di tabel routing", "Dimasukkan secara acak", "Menggantikan kebutuhan gateway klien tanpa desain"], p: "Static routing memerlukan network ID tujuan, subnet prefix yang tepat, next-hop IP yang valid, serta verifikasi pada output routing table." },
  { n: 47, c: "NAT yang benar memerlukan ... (Jawaban benar lebih dari satu)", opts: ["Penentuan trafik inside dan outside sesuai desain", "Aturan alamat yang jelas", "Pengujian serta logging bila perlu", "Menganggap NAT otomatis memblokir semua serangan", "Menghapus routing"], p: "Konfigurasi NAT menuntut penetapan antarmuka inside dan outside, access list (ACL) pemetaan IP, serta pengujian translasi alamat." },
  { n: 48, c: "Switch belajar MAC melalui ... (Jawaban benar lebih dari satu)", opts: ["Alamat sumber frame yang masuk", "Port tempat frame diterima", "Pembaruan tabel sesuai waktu", "Nama domain DNS", "Nomor seri kabel"], p: "Switch mempelajari MAC address dari Source MAC pada header frame yang masuk ke port fisiknya dan memperbarui aging timer tabel." },
  { n: 49, c: "Perintah diagnosis yang relevan adalah ... (Jawaban benar lebih dari satu)", opts: ["ping untuk keterjangkauan", "traceroute untuk jalur hop", "ipconfig/ifconfig/ip untuk konfigurasi lokal", "format untuk memeriksa VLAN", "cleaver untuk memeriksa DNS"], p: "Utility standar uji jaringan komputer: ping (reachability), traceroute (hop path), dan ip/ipconfig/ifconfig (parameter adapter lokal)." },
  { n: 50, c: "Dokumentasi jaringan sebaiknya mencakup ... (Jawaban benar lebih dari satu)", opts: ["Diagram topologi", "Daftar VLAN dan IP", "Backup konfigurasi dan hasil uji", "Password ditempel di tempat umum", "Perubahan tanpa tanggal"], p: "Kelengkapan dokumentasi jaringan profesional: topologi logis/fisik, IP addressing & VLAN mapping, serta backup konfigurasi perangkat aktif." }
];

const m3_full = [];
m3_raw_pg.forEach(item => {
  m3_full.push({
    num: item.n,
    kompetensi: kompetensiM3,
    subKompetensi: subKompetensiM3,
    kasus: item.c,
    options: item.opts,
    kunci: item.k,
    correctIndex: item.ci,
    pembahasan: item.p
  });
});
m3_kategori_keys.forEach(item => {
  m3_full.push({
    num: item.n,
    kompetensi: kompetensiM3,
    subKompetensi: subKompetensiM3,
    kasus: "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    statements: item.sts,
    pembahasan: item.p
  });
});
m3_mcma_raw.forEach(item => {
  m3_full.push({
    num: item.n,
    kompetensi: kompetensiM3,
    subKompetensi: subKompetensiM3,
    kasus: item.c,
    options: item.opts,
    kunci: "Pernyataan 1, Pernyataan 2, Pernyataan 3",
    correctIndices: [0, 1, 2],
    pembahasan: item.p
  });
});

writeTsFile(3, transformWeekData(m3_full, 3));

// ----------------------------------------------------
// MINGGU 4 DATA
// ----------------------------------------------------
const kompetensiM4 = "Menerapkan dan menganalisis prinsip K3LH serta Budaya Kerja (K3BK), meliputi penggunaan APD secara tepat, manajemen waktu penyelesaian tugas secara efisien, serta perwujudan kepedulian terhadap keselamatan, kesehatan, dan lingkungan kerja";
const subKompetensiM4 = "Penerapan K3LH di tempat kerja mencakup penggunaan APD, manajemen waktu dalam penyelesaian tugas, serta kepedulian terhadap keselamatan, kesehatan, dan lingkungan";

const m4_raw_pg = [
  { n: 1, c: "sumber, kondisi, atau tindakan yang berpotensi menimbulkan cedera, penyakit, kerusakan, atau pencemaran. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Risiko", "Bahaya", "Eliminasi", "Lockout/Tagout", "Rawat"], k: "B", ci: 1, p: "Bahaya (Hazard) adalah segala sumber, situasi, atau tindakan yang berpotensi mencederai manusia, merusak alat, atau mencemari lingkungan." },
  { n: 2, c: "kombinasi kemungkinan terjadinya bahaya dan tingkat keparahan dampaknya. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Pengendalian Administratif", "Pelaporan Insiden", "Risiko", "Rajin", "Ergonomi"], k: "C", ci: 2, p: "Risiko (Risk) adalah perkalian atau kombinasi antara kemungkinan (likelihood) terjadinya insiden dan tingkat keparahan (severity) dampaknya." },
  { n: 3, c: "menghilangkan sumber bahaya dari pekerjaan dan merupakan pengendalian yang paling efektif. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Eliminasi", "Substitusi", "APD", "Pengendalian Teknik", "Pengendalian Administratif"], k: "A", ci: 0, p: "Dalam hierarki pengendalian bahaya K3, Eliminasi menempati tingkat teratas paling efektif karena secara total membuang sumber bahaya dari lingkungan kerja." },
  { n: 4, c: "mengganti bahan, alat, atau metode berbahaya dengan alternatif yang lebih aman. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Eliminasi", "Substitusi", "Pengendalian Administratif", "APD", "Pengendalian Teknik"], k: "B", ci: 1, p: "Substitusi mengganti bahan kimia atau peralatan berisiko tinggi dengan alternatif yang lebih ramah dan aman bagi pekerja." },
  { n: 5, c: "mengisolasi atau mengurangi bahaya melalui desain, pelindung, ventilasi, pembatas, atau sistem teknis. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Substitusi", "Pengendalian Teknik", "Eliminasi", "APD", "Pengendalian Administratif"], k: "B", ci: 1, p: "Pengendalian Teknik (Engineering Controls) memasang rekayasa fisik seperti exhaust fan ventilasi, penutup pengaman mesin, atau pembatas area." },
  { n: 6, c: "mengurangi paparan melalui SOP, pelatihan, tanda, jadwal, izin kerja, dan pengawasan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Pengendalian Teknik", "Substitusi", "Pengendalian Administratif", "Eliminasi", "APD"], k: "C", ci: 2, p: "Pengendalian Administratif mengatur perilaku dan durasi paparan pekerja melalui SOP, safety induction, perizinan kerja (permit to work), dan rambu keselamatan." },
  { n: 7, c: "perlengkapan pelindung terakhir yang dipakai pekerja sesuai risiko dan tidak menghilangkan sumber bahaya. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["APD", "Substitusi", "Eliminasi", "Pengendalian Administratif", "Pengendalian Teknik"], k: "A", ci: 0, p: "APD (Alat Pelindung Diri) adalah garda pertahanan terakhir yang melindungi tubuh pekerja dari paparan bahaya sisa jika pengendalian lain belum memadai." },
  { n: 8, c: "sistem penahan tubuh untuk mengurangi risiko jatuh saat bekerja di ketinggian dengan titik tambat yang benar. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["APD", "Safety Harness", "Pelaporan Insiden", "Eliminasi", "ESD Wrist Strap"], k: "B", ci: 1, p: "Full body safety harness dengan lanyard dan peredam kejut ditambatkan ke anchor point kokoh saat teknisi memanjat tower atau tiang telekomunikasi." },
  { n: 9, c: "pelindung kepala terhadap benturan atau benda jatuh. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Bahaya", "APAR", "Pengendalian Teknik", "Lockout/Tagout", "Helm Keselamatan"], k: "E", ci: 4, p: "Safety Helmet (Helm Keselamatan) melindungi kepala pekerja dari benturan material jatuh di area instalasi kabel tiang atau gedung." },
  { n: 10, c: "pelindung tangan yang dipilih sesuai risiko mekanis, listrik, panas, atau bahan tertentu. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Eliminasi", "Sarung Tangan Kerja", "Lockout/Tagout", "Rawat", "Bahaya"], k: "B", ci: 1, p: "Sarung tangan kerja melindungi tangan dari goresan kabel, serpihan serat kaca optik, sengatan listrik, atau panas saat menyolder." },
  { n: 11, c: "alat pengendali muatan statis saat menangani komponen elektronik dengan titik grounding yang sesuai. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Rawat", "Rajin", "ESD Wrist Strap", "Rapi", "Resik"], k: "C", ci: 2, p: "ESD (Electrostatic Discharge) Wrist Strap mengalirkan muatan listrik statis dari tubuh teknisi ke tanah (grounding) agar IC motherboard tidak rusak." },
  { n: 12, c: "alat pemadam api ringan yang dipilih dan digunakan sesuai kelas kebakaran serta kondisi aman. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["APAR", "Safety Harness", "Ringkas", "Pelaporan Insiden", "Rajin"], k: "A", ci: 0, p: "APAR (Alat Pemadam Api Ringan) gas CO2 atau Clean Agent ideal untuk kebakaran kelas C (peralatan elektronik bertegangan) tanpa merusak perangkat." },
  { n: 13, c: "prosedur mengisolasi sumber energi dan memberi tanda agar peralatan tidak diaktifkan selama pekerjaan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Rapi", "Rawat", "Bahaya", "Lockout/Tagout", "APD"], k: "D", ci: 3, p: "LOTO (Lockout/Tagout) adalah prosedur mematikan sumber arus listrik, mengunci panel sakelar, dan memasang label peringatan selama teknisi bekerja." },
  { n: 14, c: "memilah barang yang diperlukan dan menyingkirkan yang tidak diperlukan dari area kerja. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Rawat", "Rajin", "Ringkas", "Rapi", "Resik"], k: "C", ci: 2, p: "Ringkas (Seiri) dalam budaya 5R berarti memilah barang yang masih terpakai dan menyingkirkan barang yang tidak diperlukan dari meja kerja." },
  { n: 15, c: "menata barang pada tempat yang jelas agar mudah diambil, digunakan, dan dikembalikan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Resik", "Rajin", "Rapi", "Rawat", "Ringkas"], k: "C", ci: 2, p: "Rapi (Seiton) berarti menata peralatan dan kabel pada tempatnya dengan label yang jelas untuk efisiensi akses kerja." },
  { n: 16, c: "membersihkan area dan peralatan sambil memeriksa adanya kondisi tidak normal. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Rawat", "Resik", "Rapi", "Ringkas", "Rajin"], k: "B", ci: 1, p: "Resik (Seiso) adalah membersihkan area kerja secara rutin sekaligus melakukan inspeksi terhadap kabel lecet, kebocoran, atau baut kendor." },
  { n: 17, c: "menstandarkan kondisi ringkas, rapi, dan resik agar dipertahankan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Resik", "Rapi", "Rawat", "Ringkas", "Rajin"], k: "C", ci: 2, p: "Rawat (Seiketsu) adalah menetapkan standar dan SOP agar kondisi Ringkas, Rapi, dan Resik tetap terjaga konsisten di tempat kerja." },
  { n: 18, c: "membiasakan disiplin menjalankan standar secara konsisten dan terus-menerus. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Rajin", "Rapi", "Ringkas", "Resik", "Rawat"], k: "A", ci: 0, p: "Rajin (Shitsuke) adalah pembentukan kedisiplinan dan kesadaran diri pekerja untuk mematuhi aturan K3 dan standar kerja secara berkesinambungan." },
  { n: 19, c: "penyesuaian alat, posisi, dan metode kerja terhadap kemampuan manusia untuk mengurangi kelelahan serta cedera. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Pengendalian Teknik", "APAR", "Substitusi", "Ergonomi", "Bahaya"], k: "D", ci: 3, p: "Ergonomi menyesuaikan perabotan kerja (kursi, tinggi meja, monitor) dengan anatomi tubuh manusia guna mencegah Repetitive Strain Injury (RSI)." },
  { n: 20, c: "pencatatan kejadian, hampir celaka, penyebab, tindakan awal, dan tindak lanjut untuk mencegah pengulangan. Istilah/perangkat/profesi yang paling tepat adalah ...", opts: ["Ergonomi", "Rawat", "Pelaporan Insiden", "Risiko", "Pengendalian Teknik"], k: "C", ci: 2, p: "Pelaporan insiden (Incident Reporting) mencatat kronologi kecelakaan kerja maupun near miss untuk analisis penyebab dasar (root cause) pencegahan." },
  { n: 21, c: "Kabel berserakan di jalur orang. Pengendalian awal paling efektif adalah ...", opts: ["Menutup lampu ruangan", "Memindahkan atau menata kabel agar tidak melintasi jalur", "Mengabaikan karena pekerjaan singkat", "Memberi sepatu safety saja", "Menambah kecepatan kerja"], k: "B", ci: 1, p: "Tindakan mitigasi bahaya tersandung (tripping hazard): segera pindahkan atau rapikan kabel menggunakan ducting/cable protector agar jalur jalan bebas rintangan." },
  { n: 22, c: "Teknisi akan bekerja pada tiang 7 meter. APD utama selain helm dan sepatu adalah ...", opts: ["ESD wrist strap saja", "Kacamata hitam biasa", "Full-body safety harness dengan anchor yang benar", "Masker kain saja", "Earphone"], k: "C", ci: 2, p: "Bekerja di ketinggian di atas 1,8 meter wajib menggunakan full-body safety harness yang dikaitkan pada titik jangkar (anchor point) yang aman dan teruji." },
  { n: 23, c: "Angin kencang muncul saat pekerjaan di ketinggian. Tindakan yang tepat adalah ...", opts: ["Menghentikan pekerjaan dan mengevaluasi kondisi keselamatan", "Melepas harness agar lincah", "Melanjutkan tanpa komunikasi", "Mempercepat agar cepat selesai", "Meminta satu orang memegang kabel saja"], k: "A", ci: 0, p: "Jika cuaca ekstrem (angin kencang, hujan, petir) melanda pekerjaan di ketinggian, pekerjaan wajib segera dihentikan demi keselamatan jiwa." },
  { n: 24, c: "Serpihan fiber sisa cleaving harus ...", opts: ["Dibuang ke lantai", "Dicampur dengan makanan", "Ditiup dari meja", "Dikumpulkan dalam wadah limbah khusus yang tertutup", "Disimpan di saku"], k: "D", ci: 3, p: "Pecahan kaca mikro serat optik sangat tajam dan berbahaya jika tertelan atau menusuk kulit. Wajib ditampung di wadah limbah tertutup khusus (sharps disposal)." },
  { n: 25, c: "Ringkas dalam 5R berarti ...", opts: ["Memakai harness", "Menyusun laporan insiden", "Mengecat semua alat", "Membersihkan saja", "Memilah barang perlu dan menyingkirkan yang tidak perlu"], k: "E", ci: 4, p: "Prinsip Seiri (Ringkas): singkirkan barang yang rusak/tidak diperlukan dari area kerja sehingga hanya peralatan penting yang tersisa." },
  { n: 26, c: "Rapi dalam 5R ditunjukkan oleh ...", opts: ["Menghapus SOP", "Membuang alat yang masih dipakai", "Menumpuk kabel di pintu", "Menyimpan semua alat dalam satu kardus tanpa label", "Memberi lokasi dan label alat agar mudah diambil dan dikembalikan"], k: "E", ci: 4, p: "Prinsip Seiton (Rapi): setiap alat memiliki tempat yang jelas dengan kode label terstandar sehingga siap pakai tanpa membuang waktu pencarian." },
  { n: 27, c: "Teknisi hampir tersandung tetapi tidak cedera. Kejadian tersebut ...", opts: ["Bukan bagian K3", "Harus disembunyikan", "Near miss yang tetap perlu dilaporkan dan dianalisis", "Hanya masalah pribadi", "Tidak perlu dicatat"], k: "C", ci: 2, p: "Kejadian hampir celaka (Near Miss) wajib dicatat dan dilaporkan agar sumber bahayanya dapat dieliminasi sebelum terjadi kecelakaan fatal di kemudian hari." },
  { n: 28, c: "Sebelum mengerjakan perangkat bertenaga, sumber energi harus ...", opts: ["Dihubungkan ke internet", "Diberi nama baru", "Dibiarkan menyala agar cepat", "Diisolasi dan diberi lockout/tagout sesuai prosedur", "Hanya ditutup kain"], k: "D", ci: 3, p: "SOP kelistrikan: matikan MCB/sakelar, cabut sumber daya listrik, dan lakukan Lockout/Tagout (LOTO) serta pastikan tegangan nol dengan multimeter." },
  { n: 29, c: "Posisi monitor terlalu rendah dan teknisi bekerja membungkuk lama. Risiko utama adalah ...", opts: ["Kabel menjadi STP", "VLAN bertambah", "Keluhan muskuloskeletal akibat ergonomi buruk", "Alamat IP berubah", "Loss optik turun"], k: "C", ci: 2, p: "Postur tubuh membungkuk berulang memicu gangguan muskuloskeletal (nyeri leher, pinggang, dan bahu) akibat pelanggaran prinsip ergonomi kerja komputer." },
  { n: 30, c: "Target waktu terlambat. Tindakan profesional adalah ...", opts: ["Melaporkan kendala, menyesuaikan rencana, dan tetap mengikuti SOP", "Menyalahkan pelanggan", "Memalsukan laporan selesai", "Menggunakan alat rusak", "Melewati pengujian keselamatan"], k: "A", ci: 0, p: "Etos kerja profesional: transparan melaporkan kendala ke pengawas, revisi timeline kerja, dan pantang mengorbankan keselamatan atau SOP demi terburu-buru." }
];

const m4_kategori_keys = [
  // 31: S, S, S
  { n: 31, sts: [
    { id: "A", text: "Helm Keselamatan paling tepat dijelaskan sebagai memilah barang yang diperlukan dan menyingkirkan yang tidak diperlukan dari area kerja.", answer: "Salah" },
    { id: "B", text: "APD paling tepat dijelaskan sebagai alat pemadam api ringan yang dipilih dan digunakan sesuai kelas kebakaran serta kondisi aman.", answer: "Salah" },
    { id: "C", text: "Rapi paling tepat dijelaskan sebagai mengisolasi atau mengurangi bahaya melalui desain, pelindung, ventilasi, pembatas, atau sistem teknis.", answer: "Salah" }
  ], p: "Ketiga pernyataan salah total: A adalah Ringkas, B adalah APAR, C adalah Pengendalian Teknik." },
  // 32: B, B, B
  { n: 32, sts: [
    { id: "A", text: "Helm Keselamatan paling tepat dijelaskan sebagai pelindung kepala terhadap benturan atau benda jatuh.", answer: "Benar" },
    { id: "B", text: "Bahaya paling tepat dijelaskan sebagai sumber, kondisi, atau tindakan yang berpotensi menimbulkan cedera, penyakit, kerusakan, atau pencemaran.", answer: "Benar" },
    { id: "C", text: "ESD Wrist Strap paling tepat dijelaskan sebagai alat pengendali muatan statis saat menangani komponen elektronik dengan titik grounding yang sesuai.", answer: "Benar" }
  ], p: "Semua pernyataan benar sesuai standar K3 TJKT." },
  // 33: B, B, B
  { n: 33, sts: [
    { id: "A", text: "Sarung Tangan Kerja paling tepat dijelaskan sebagai pelindung tangan yang dipilih sesuai risiko mekanis, listrik, panas, atau bahan tertentu.", answer: "Benar" },
    { id: "B", text: "APAR paling tepat dijelaskan sebagai alat pemadam api ringan yang dipilih dan digunakan sesuai kelas kebakaran serta kondisi aman.", answer: "Benar" },
    { id: "C", text: "Lockout/Tagout paling tepat dijelaskan sebagai prosedur mengisolasi sumber energi dan memberi tanda agar peralatan tidak diaktifkan selama pekerjaan.", answer: "Benar" }
  ], p: "Semua pernyataan benar." },
  // 34: S, B, S
  { n: 34, sts: [
    { id: "A", text: "Eliminasi paling tepat dijelaskan sebagai sistem penahan tubuh untuk mengurangi risiko jatuh saat bekerja di ketinggian dengan titik tambat yang benar.", answer: "Salah" },
    { id: "B", text: "Pengendalian Teknik paling tepat dijelaskan sebagai mengisolasi atau mengurangi bahaya melalui desain, pelindung, ventilasi, pembatas, atau sistem teknis.", answer: "Benar" },
    { id: "C", text: "APAR paling tepat dijelaskan sebagai kombinasi kemungkinan terjadinya bahaya dan tingkat keparahan dampaknya.", answer: "Salah" }
  ], p: "A salah (itu Safety Harness), B benar, C salah (itu definisi Risiko)." },
  // 35: S, S, B
  { n: 35, sts: [
    { id: "A", text: "Safety Harness paling tepat dijelaskan sebagai prosedur mengisolasi sumber energi dan memberi tanda agar peralatan tidak diaktifkan selama pekerjaan.", answer: "Salah" },
    { id: "B", text: "Ringkas paling tepat dijelaskan sebagai mengganti bahan, alat, atau metode berbahaya dengan alternatif yang lebih aman.", answer: "Salah" },
    { id: "C", text: "Pengendalian Administratif paling tepat dijelaskan sebagai mengurangi paparan melalui SOP, pelatihan, tanda, jadwal, izin kerja, dan pengawasan.", answer: "Benar" }
  ], p: "A salah (itu LOTO), B salah (itu Substitusi), C benar (Pengendalian Administratif)." },
  // 36: B, B, B
  { n: 36, sts: [
    { id: "A", text: "Rapi paling tepat dijelaskan sebagai menata barang pada tempat yang jelas agar mudah diambil, digunakan, dan dikembalikan.", answer: "Benar" },
    { id: "B", text: "Safety Harness paling tepat dijelaskan sebagai sistem penahan tubuh untuk mengurangi risiko jatuh saat bekerja di ketinggian dengan titik tambat yang benar.", answer: "Benar" },
    { id: "C", text: "APD paling tepat dijelaskan sebagai perlengkapan pelindung terakhir yang dipakai pekerja sesuai risiko dan tidak menghilangkan sumber bahaya.", answer: "Benar" }
  ], p: "Semua pernyataan benar." },
  // 37: B, S, S
  { n: 37, sts: [
    { id: "A", text: "Ringkas paling tepat dijelaskan sebagai memilah barang yang diperlukan dan menyingkirkan yang tidak diperlukan dari area kerja.", answer: "Benar" },
    { id: "B", text: "Bahaya paling tepat dijelaskan sebagai mengurangi paparan melalui SOP, pelatihan, tanda, jadwal, izin kerja, dan pengawasan.", answer: "Salah" },
    { id: "C", text: "Pengendalian Teknik paling tepat dijelaskan sebagai pelindung tangan yang dipilih sesuai risiko mekanis, listrik, panas, atau bahan tertentu.", answer: "Salah" }
  ], p: "A benar, B salah (itu Pengendalian Administratif), C salah (itu Sarung Tangan)." },
  // 38: S, B, S
  { n: 38, sts: [
    { id: "A", text: "ESD Wrist Strap paling tepat dijelaskan sebagai sumber, kondisi, atau tindakan yang berpotensi menimbulkan cedera, penyakit, kerusakan, atau pencemaran.", answer: "Salah" },
    { id: "B", text: "Risiko paling tepat dijelaskan sebagai kombinasi kemungkinan terjadinya bahaya dan tingkat keparahan dampaknya.", answer: "Benar" },
    { id: "C", text: "Pengendalian Administratif paling tepat dijelaskan sebagai alat pengendali muatan statis saat menangani komponen elektronik dengan titik grounding yang sesuai.", answer: "Salah" }
  ], p: "A salah (itu Bahaya), B benar (definisi Risiko), C salah (itu ESD Wrist Strap)." },
  // 39: S, B, S
  { n: 39, sts: [
    { id: "A", text: "Lockout/Tagout paling tepat dijelaskan sebagai menghilangkan sumber bahaya dari pekerjaan dan merupakan pengendalian yang paling efektif.", answer: "Salah" },
    { id: "B", text: "Substitusi paling tepat dijelaskan sebagai mengganti bahan, alat, atau metode berbahaya dengan alternatif yang lebih aman.", answer: "Benar" },
    { id: "C", text: "Substitusi paling tepat dijelaskan sebagai pelindung kepala terhadap benturan atau benda jatuh.", answer: "Salah" }
  ], p: "A salah (itu Eliminasi), B benar, C salah (itu Helm Keselamatan)." },
  // 40: S, S, B
  { n: 40, sts: [
    { id: "A", text: "Risiko paling tepat dijelaskan sebagai perlengkapan pelindung terakhir yang dipakai pekerja sesuai risiko dan tidak menghilangkan sumber bahaya.", answer: "Salah" },
    { id: "B", text: "Sarung Tangan Kerja paling tepat dijelaskan sebagai menata barang pada tempat yang jelas agar mudah diambil, digunakan, dan dikembalikan.", answer: "Salah" },
    { id: "C", text: "Eliminasi paling tepat dijelaskan sebagai menghilangkan sumber bahaya dari pekerjaan dan merupakan pengendalian yang paling efektif.", answer: "Benar" }
  ], p: "A salah (itu APD), B salah (itu Rapi 5R), C benar (Eliminasi pengendalian paling tinggi)." }
];

const m4_mcma_raw = [
  { n: 41, c: "Pekerjaan di ketinggian aman memerlukan ... (Jawaban benar lebih dari satu)", opts: ["Penilaian cuaca dan lokasi", "Full-body harness dan anchor benar", "Pengamanan area di bawah", "Bekerja sendiri tanpa komunikasi", "Menggunakan tangga rusak"], p: "Keselamatan kerja di ketinggian: evaluasi cuaca/angin, pemakaian full-body harness tertambat anchor point, dan sterilisasi drop zone di bawah tiang." },
  { n: 42, c: "Penanganan serpihan fiber yang benar adalah ... (Jawaban benar lebih dari satu)", opts: ["Menggunakan kacamata pelindung", "Mengumpulkan serpihan dalam wadah tertutup", "Membersihkan meja kerja", "Meniup serpihan", "Membuang ke saku"], p: "Pengelolaan limbah serat optik: kenakan safety glasses, buang pecahan core ke wadah pembuangan tertutup, dan bersihkan alas kerja dengan selotip/kain basah." },
  { n: 43, c: "Penerapan 5R mencakup ... (Jawaban benar lebih dari satu)", opts: ["Memilah alat yang diperlukan", "Memberi tempat dan label", "Membersihkan serta mempertahankan standar", "Menumpuk semua kabel di pintu", "Mengabaikan kebiasaan harian"], p: "Penerapan 5R: memilah alat fungsional (Ringkas), memberi penataan & label (Rapi), serta membersihkan area dan menjaga kedisiplinan kerja (Resik & Rawat)." },
  { n: 44, c: "Pengendalian risiko lebih efektif dilakukan dengan ... (Jawaban benar lebih dari satu)", opts: ["Menghilangkan bahaya jika mungkin", "Menggunakan pengendalian teknik", "Menerapkan SOP dan APD sebagai lapisan tambahan", "Hanya memasang poster", "Mengandalkan keberanian pekerja"], p: "Hierarki K3 yang efektif: eliminasi bahaya, rekayasa teknik (ventilasi/guard), disempurnakan dengan SOP administratif dan APD lengkap." },
  { n: 45, c: "Sebelum pekerjaan listrik/perangkat bertenaga ... (Jawaban benar lebih dari satu)", opts: ["Identifikasi sumber energi", "Isolasi dan LOTO sesuai prosedur", "Verifikasi tidak ada energi berbahaya", "Menyentuh konduktor untuk mengecek", "Membiarkan orang lain menyalakan"], p: "SOP keselamatan listrik: identifikasi sumber power, terapkan Lockout/Tagout, dan ukur ketiadaan arus menggunakan multimeter sebelum menyentuh kabel." },
  { n: 46, c: "APAR digunakan dengan benar jika ... (Jawaban benar lebih dari satu)", opts: ["Jenis APAR sesuai kelas kebakaran", "Jalur keluar tetap tersedia", "Api masih kecil dan pengguna terlatih", "Api besar dan asap pekat tetap dilawan sendiri", "APAR diarahkan tanpa memperhatikan sumber api"], p: "Penggunaan APAR: gunakan jenis sesuai kelas kebakaran (CO2 untuk listrik), pastikan ada jalur evakuasi di belakang, dan gunakan saat api masih tahap awal." },
  { n: 47, c: "Pelaporan near miss yang baik mencakup ... (Jawaban benar lebih dari satu)", opts: ["Fakta kejadian", "Penyebab dan kondisi pendukung", "Tindakan perbaikan", "Menyembunyikan nama lokasi", "Menghapus bukti tanpa analisis"], p: "Komponen laporan near miss: deskripsi kronologi faktual, analisis unsafe action/condition, dan rekomendasi langkah korektif pencegahan." },
  { n: 48, c: "Ergonomi kerja komputer diperbaiki dengan ... (Jawaban benar lebih dari satu)", opts: ["Menyesuaikan tinggi kursi dan monitor", "Memberi jeda dan variasi posisi", "Menata alat dalam jangkauan aman", "Membungkuk terus-menerus", "Menaruh kabel di bawah kaki"], p: "Prinsip ergonomi komputer: sejajarkan sudut pandang mata ke monitor, lakukan peregangan berkala, serta posisikan keyboard dan mouse dalam jangkauan rileks." },
  { n: 49, c: "Manajemen waktu yang aman mencakup ... (Jawaban benar lebih dari satu)", opts: ["Membuat rencana dan estimasi", "Memeriksa alat sebelum berangkat", "Menyampaikan progres dan kendala", "Melewati pengujian", "Memalsukan waktu selesai"], p: "Manajemen waktu kerja teknisi TJKT: estimasi waktu realistis, checklist alat kerja pra-keberangkatan, dan komunikasi proaktif atas kendala di lapangan." },
  { n: 50, c: "Kepedulian lingkungan ditunjukkan dengan ... (Jawaban benar lebih dari satu)", opts: ["Memilah limbah elektronik", "Mengelola baterai dan bahan pembersih sesuai aturan", "Mengurangi penggunaan bahan yang tidak perlu", "Membuang baterai ke selokan", "Membakar kabel"], p: "Aspek lingkungan K3LH: daur ulang e-waste (kabel/PCB/router bekas), penanganan limbah B3 (alkohol fiber & baterai UPS), dan efisiensi material." }
];

const m4_full = [];
m4_raw_pg.forEach(item => {
  m4_full.push({
    num: item.n,
    kompetensi: kompetensiM4,
    subKompetensi: subKompetensiM4,
    kasus: item.c,
    options: item.opts,
    kunci: item.k,
    correctIndex: item.ci,
    pembahasan: item.p
  });
});
m4_kategori_keys.forEach(item => {
  m4_full.push({
    num: item.n,
    kompetensi: kompetensiM4,
    subKompetensi: subKompetensiM4,
    kasus: "Tentukan apakah setiap pernyataan berikut Benar atau Salah berdasarkan materi dan praktik TJKT.",
    statements: item.sts,
    pembahasan: item.p
  });
});
m4_mcma_raw.forEach(item => {
  m4_full.push({
    num: item.n,
    kompetensi: kompetensiM4,
    subKompetensi: subKompetensiM4,
    kasus: item.c,
    options: item.opts,
    kunci: "Pernyataan 1, Pernyataan 2, Pernyataan 3",
    correctIndices: [0, 1, 2],
    pembahasan: item.p
  });
});

writeTsFile(4, transformWeekData(m4_full, 4));
