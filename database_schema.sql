-- ============================================================================
-- SKEMA & DATA AWAL DATABASE MYSQL (COMPATIBLE UNTUK HOSTINGER & CPANEL)
-- Aplikasi Evaluasi & Simulasi TKA SMK TJKT
-- ============================================================================
-- CATATAN UNTUK SHARED HOSTING (HOSTINGER / CPANEL):
-- Pada Hosting (seperti Hostinger), nama database ditentukan oleh hosting (misal: u722023907_tka).
-- Perintah `CREATE DATABASE` & `USE` di-comment agar tidak terjadi error #1044 Access Denied.
-- 
-- Jika Anda menggunakan Localhost (XAMPP/Laragon) dan ingin otomatis buat DB:
-- Hilangkan tanda `--` pada dua baris di bawah ini:
-- CREATE DATABASE IF NOT EXISTS `tka_smk_tjkt` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE `tka_smk_tjkt`;

-- ----------------------------------------------------------------------------
-- 1. TABEL: users (Data Akun Siswa & Administrator/Guru)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `exam_sessions`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` VARCHAR(64) NOT NULL COMMENT 'ID Unik Pengguna (usr_xxx)',
  `nama_lengkap` VARCHAR(255) NOT NULL COMMENT 'Nama Lengkap Siswa / Guru',
  `asal_sekolah` VARCHAR(255) NOT NULL COMMENT 'Nama Sekolah / Institusi',
  `email` VARCHAR(255) NOT NULL COMMENT 'Alamat Email Siswa / Admin',
  `password_hash` VARCHAR(255) DEFAULT NULL COMMENT 'Kata Sandi Opsional / Hash',
  `role` VARCHAR(50) NOT NULL DEFAULT 'siswa' COMMENT 'Peran: siswa / admin',
  `auth_provider` VARCHAR(50) NOT NULL DEFAULT 'local' COMMENT 'Metode Daftar: local / google',
  `is_verified` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Status Verifikasi Email: 0 (Belum), 1 (Aktif)',
  `verification_code` VARCHAR(10) DEFAULT NULL COMMENT 'Kode Verifikasi OTP 6-Digit',
  `verification_expires_at` BIGINT DEFAULT NULL COMMENT 'Timestamp Kedaluwarsa Kode OTP',
  `avatar_url` TEXT DEFAULT NULL COMMENT 'URL Foto Profil / Avatar',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Waktu Pendaftaran',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 2. TABEL: exam_sessions (Record Track Pembelajaran & Hasil Kuis)
-- ----------------------------------------------------------------------------
CREATE TABLE `exam_sessions` (
  `id` VARCHAR(64) NOT NULL COMMENT 'ID Unik Sesi Evaluasi (sess_xxx)',
  `user_id` VARCHAR(64) NOT NULL COMMENT 'Foreign Key ke users.id',
  `user_email` VARCHAR(255) NOT NULL COMMENT 'Email Siswa saat mengerjakan',
  `user_name` VARCHAR(255) NOT NULL COMMENT 'Nama Siswa saat mengerjakan',
  `asal_sekolah` VARCHAR(255) NOT NULL COMMENT 'Asal Sekolah Siswa',
  `week_id` INT NOT NULL COMMENT 'Nomor Modul Kuis (1 s.d. 8)',
  `title` VARCHAR(255) NOT NULL COMMENT 'Judul Modul / Paket Soal',
  `score` FLOAT NOT NULL COMMENT 'Nilai Akhir (Skala 0 - 100)',
  `correct_count` INT NOT NULL COMMENT 'Jumlah Jawaban Benar',
  `total_questions` INT NOT NULL COMMENT 'Total Soal yang Dikerjakan',
  `time_spent_seconds` INT NOT NULL COMMENT 'Durasi Pengerjaan (Detik)',
  `is_competent` TINYINT(1) NOT NULL COMMENT 'Status Kelulusan: 1 (TUNTAS >= 75), 0 (REMEDIAL)',
  `mode` VARCHAR(50) NOT NULL DEFAULT 'exam' COMMENT 'Mode: exam / practice',
  `wrong_question_ids` TEXT DEFAULT NULL COMMENT 'Daftar ID Soal yang Salah (JSON Array)',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Waktu Selesai Ujian',
  PRIMARY KEY (`id`),
  KEY `idx_sessions_user_id` (`user_id`),
  KEY `idx_sessions_email` (`user_email`),
  KEY `idx_sessions_week` (`week_id`),
  CONSTRAINT `fk_sessions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 3. SEED DATA AWAL: AKUN ADMINISTRATOR & SISWA DEMO
-- ----------------------------------------------------------------------------
INSERT INTO `users` (`id`, `nama_lengkap`, `asal_sekolah`, `email`, `password_hash`, `role`, `auth_provider`, `is_verified`, `verification_code`, `created_at`) VALUES
('usr_admin_1', 'Administrator / Guru Utama TJKT', 'SMKN 1 Cimahi (Dinas Pendidikan)', 'admin@smk.belajar.id', 'admin123', 'admin', 'local', 1, '123456', NOW()),
('usr_admin_2', 'Administrator Sistem TKA', 'Direktorat SMK', 'admin@tjkt.sch.id', 'admin123', 'admin', 'local', 1, '123456', NOW()),
('usr_sample_1', 'Budi Raharjo', 'SMKN 1 Cimahi', 'budi.raharjo@smk.belajar.id', '123456', 'siswa', 'local', 1, '123456', DATE_SUB(NOW(), INTERVAL 3 DAY)),
('usr_sample_2', 'Siti Aminah', 'SMKN 2 Bandung', 'siti.aminah@smk.belajar.id', '123456', 'siswa', 'google', 1, '654321', DATE_SUB(NOW(), INTERVAL 2 DAY)),
('usr_sample_3', 'Fajar Nugraha', 'SMK Telkom Malang', 'fajar.nugraha@smk.belajar.id', '123456', 'siswa', 'local', 1, '889900', DATE_SUB(NOW(), INTERVAL 1 DAY));

-- ----------------------------------------------------------------------------
-- 4. SEED DATA AWAL: RECORD EVALUASI KUIS SISWA DEMO
-- ----------------------------------------------------------------------------
INSERT INTO `exam_sessions` (`id`, `user_id`, `user_email`, `user_name`, `asal_sekolah`, `week_id`, `title`, `score`, `correct_count`, `total_questions`, `time_spent_seconds`, `is_competent`, `mode`, `wrong_question_ids`, `created_at`) VALUES
('sess_sample_1', 'usr_sample_1', 'budi.raharjo@smk.belajar.id', 'Budi Raharjo', 'SMKN 1 Cimahi', 1, 'Modul Minggu 1 (50 Soal)', 86.0, 43, 50, 2100, 1, 'exam', '["m1_q7", "m1_q12"]', DATE_SUB(NOW(), INTERVAL 2 DAY)),
('sess_sample_2', 'usr_sample_1', 'budi.raharjo@smk.belajar.id', 'Budi Raharjo', 'SMKN 1 Cimahi', 2, 'Modul Minggu 2 (50 Soal)', 78.0, 39, 50, 2400, 1, 'exam', '["m2_q4", "m2_q18"]', DATE_SUB(NOW(), INTERVAL 1 DAY)),
('sess_sample_3', 'usr_sample_2', 'siti.aminah@smk.belajar.id', 'Siti Aminah', 'SMKN 2 Bandung', 1, 'Modul Minggu 1 (50 Soal)', 92.0, 46, 50, 1950, 1, 'exam', '[]', DATE_SUB(NOW(), INTERVAL 1 DAY)),
('sess_sample_4', 'usr_sample_2', 'siti.aminah@smk.belajar.id', 'Siti Aminah', 'SMKN 2 Bandung', 6, 'Modul Minggu 6 (50 Soal)', 84.0, 42, 50, 2300, 1, 'exam', '["m6_q10"]', DATE_SUB(NOW(), INTERVAL 12 HOUR)),
('sess_sample_5', 'usr_sample_3', 'fajar.nugraha@smk.belajar.id', 'Fajar Nugraha', 'SMK Telkom Malang', 5, 'Modul Minggu 5 (50 Soal)', 68.0, 34, 50, 2700, 0, 'exam', '["m5_q3", "m5_q15", "m5_q22"]', DATE_SUB(NOW(), INTERVAL 1 HOUR));

-- ============================================================================
-- Selesai.
-- ============================================================================
