# Rencana Implementasi: Kartu Cepat (Quick Cards) Beranda Admin & Siswa

Membuat komponen **Kartu Cepat (Quick Cards)** beranda yang dinamis, interaktif, dan disesuaikan dengan peran pengguna (Admin/Siswa) pada aplikasi Portal Kuis & Pembelajaran TJKT.

---

## 1. Konsep & Tata Letak

- **Gaya Visual:** Grid kartu interaktif (Responsive 3-Column / 2-Column Grid) dengan statistik waktu-nyata (*real-time stats*), badge indikator visual, serta tombol aksi cepat (*quick action buttons*) untuk navigasi langsung tanpa membuang waktu.
- **Desain UI/UX:** Memanfaatkan Tailwind CSS dengan variasi warna gradients, border halus, serta mikro-interaksi kustom yang elegan dan responsif untuk tampilan desktop maupun mobile.

---

## 2. Kartu Cepat Admin (Role: `admin`)

Kartu Cepat khusus untuk Admin akan ditampilkan di bagian atas Beranda Admin (`TeacherDashboardView.tsx`):

1. **Kartu 1: Ringkasan Pengguna (User Overview Card)**
   - **Metrik:** Total pengguna terdaftar, rasio Siswa vs Admin, serta statistik status verifikasi email.
   - **Aksi Langsung:** Tombol *"Kelola Daftar Pengguna"* yang langsung melakukan scroll atau memfilter tabel identitas pengguna.

2. **Kartu 2: Monitoring Email OTP (SMTP Delivery Monitor Card)**
   - **Metrik:** Total log pengiriman email OTP, persentase pengiriman sukses vs gagal, serta status layanan email.
   - **Aksi Langsung:** Tombol *"Buka Log Email & Uji SMTP"* untuk mengirim email percobaan atau memantau kendala pengiriman OTP.

3. **Kartu 3: Kelola Identitas & Keamanan (Identity & Security Card)**
   - **Metrik:** Status Keamanan Sistem (*Single Admin Active*), proteksi akun admin utama (`admin@smk.belajar.id`).
   - **Aksi Langsung:** Tombol *"Cetak / Ekspor Rekap Nilai Siswa"* untuk mengunduh laporan format CSV/Excel secara instan.

---

## 3. Kartu Cepat Siswa (Role: `siswa`)

Kartu Cepat khusus untuk Siswa akan ditampilkan di bagian atas Beranda Siswa (`DashboardView.tsx`):

1. **Kartu 1: Modul Latihan Aktif (Active Learning Module Card)**
   - **Metrik:** Minggu modul kuis terakhir yang diakses, status kelulusan (>=75%), dan jumlah percobaan.
   - **Aksi Langsung:** Tombol *"Lanjutkan Kuis"* atau *"Mulai Ujian"* yang menavigasi langsung ke sesi kuis modul terkait.

2. **Kartu 2: Progres Belajar (Learning Progress Card)**
   - **Metrik:** Persentase penguasaan 8 modul (Minggu 1–8), rata-rata nilai tertinggi, serta lencana kelulusan.
   - **Aksi Langsung:** Tombol *"Lihat Analisis Statistik"* untuk berpindah ke tab Statistik Lengkap.

3. **Kartu 3: Status Akun & Profil (Account Status Card)**
   - **Metrik:** Status verifikasi email (Terverifikasi / Pending), metode login (Google / Form Registrasi), dan identitas siswa.
   - **Aksi Langsung:** Tombol *"Perbarui Status / Verifikasi"* jika belum terverifikasi atau untuk melihat detail akun.

---

## 4. Langkah-Langkah Integrasi Kuis & Dashboard

1. **Pengembangan Komponen Quick Cards:**
   - Membuat sub-komponen `AdminQuickCards` di `src/components/TeacherDashboardView.tsx`.
   - Membuat sub-komponen `StudentQuickCards` di `src/components/DashboardView.tsx`.
2. **Penyambungan State & Handlers:**
   - Hubungkan aksi tombol dengan fungsi navigasi yang ada (`onStartExam`, `onReadMaterial`, scroll to element ID, modal trigger).
3. **Pengujian & Validasi Build:**
   - Jalankan `compile_applet` dan `lint_applet` untuk memastikan kompilasi berjalan tanpa error.
