# Rencana Perbaikan: Visibilitas & Sinkronisasi Progres Akun Siswa

## 1. Penjelasan Penyebab Utama (Root Cause)

Progres belajar dan riwayat ujian siswa tidak terlihat ketika siswa login di akunnya disebabkan oleh faktor-faktor arsitektur berikut:

1. **Penyimpanan Bersifat Client-Only (`localStorage` Lokal Browser)**:
   - Aplikasi saat ini memuat data statistik (`userProgress`) menggunakan fungsi `loadUserProgress()` dari `localStorage` browser lokal dengan kunci global (`tka_smk_tjkt_progress_v1`).
   - Apabila siswa melakukan login di peramban (browser) baru, komputer/HP berbeda, atau setelah membersihkan cache browser, `localStorage` bernilai kosong (`DEFAULT_PROGRESS` dengan 0 riwayat).
2. **Tidak Ada Sinkronisasi Otomatis dari Database Server**:
   - Meskipun backend (`server.ts`) berhasil menyimpan setiap sesi ujian siswa ke tabel database `exam_sessions` via `/api/exams/save-session`, frontend **belum pernah memanggil** endpoint riwayat (`/api/exams/user-history/:userId`) saat akun siswa login atau saat tab Progres dibuka.
3. **Data Progres Belum Di-scope Berdasarkan User ID / Email**:
   - `userProgress` disajikan secara global pada level browser tanpa dipisahkan berdasarkan identitas pengguna (`currentUser.id` / `currentUser.email`), sehingga pergantian akun pada perangkat yang sama dapat menampilkan data lama atau kosong.

---

## 2. Rencana Perbaikan (Implementation Plan)

### Tahap 1: Penambahan Endpoint API Service pada Frontend (`src/services/api.ts`)
- Menambahkan fungsi `fetchUserExamHistory(userIdOrEmail: string)` untuk mengambil seluruh riwayat pengerjaan dari `/api/exams/user-history/:userId`.
- Memastikan response memuat detail modul (`week_id`), mode ujian/praktik, skor, jumlah benar, dan waktu pengerjaan.

### Tahap 2: Mekanisme Sinkronisasi Progres Server & User-Scoped Storage (`src/utils/storage.ts` & `src/App.tsx`)
- Mengubah Kunci Storage menjadi User-Scoped: `tka_progress_${userId}` agar data tiap siswa terisolasi dengan aman di lokal browser.
- Menambahkan fungsi `syncUserProgressWithServer(user: UserProfile)`:
  - Mengunduh riwayat ujian dari server database.
  - Membangun kembali `categoryStats`, `history`, `totalAttempts`, dan persentase penguasaan modul murni berdasarkan data ujian autentik dari server database.
  - Memadukan (merge) modul selesai dan bookmark pertanyaan siswa.

### Tahap 3: Pemanggilan Auto-Sync saat Login & Mount (`src/App.tsx`)
- Pada hook `useEffect` saat `currentUser` terdeteksi/login, otomatis jalankan `syncUserProgressWithServer(currentUser)`.
- Memperbarui state `userProgress` secara realtime sehingga tampilan `ProgressStatsView` langsung menyajikan data progres yang akurat.

### Tahap 4: Tampilan & Indikator Sinkronisasi pada `ProgressStatsView.tsx`
- Menambahkan tombol **"Sinkronkan Progres"** / **"Refresh Data Server"** pada header profil siswa di `ProgressStatsView.tsx`.
- Menampilkan status terakhir kali sinkronisasi dilakukan agar siswa yakin data mereka tersimpan aman di server database.

---

## 3. Hasil yang Diharapkan
- Siswa dapat melihat statistik progres, riwayat ujian, skor modul, dan sertifikat/keterangan kompetensi mereka dari perangkat atau browser apa pun setelah login.
- Data progres tersimpan permanen di database MySQL dan tersinkronisasi otomatis saat login.
