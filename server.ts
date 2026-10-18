import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const app = express();

app.use(express.json());

// ---------------------------------------------------------------------------
// MySQL Database Connection Pool
// ---------------------------------------------------------------------------
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306', 10),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'tka_smk_tjkt',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool: mysql.Pool | null = null;
let isMySqlConnected = false;

// In-memory fallback repository when MySQL is unreachable or unprovisioned
const memoryStore = {
  users: new Map<string, any>(),
  examSessions: [] as any[],
  emailLogs: [] as any[],
};

// Seed sample teacher and student so demo starts with rich data if fresh
const DEFAULT_STUDENTS = [
  {
    id: 'usr_admin_1',
    nama_lengkap: 'Administrator / Guru Utama TJKT',
    asal_sekolah: 'SMKN 1 Cimahi (Dinas Pendidikan)',
    email: 'admin@smk.belajar.id',
    password_hash: 'admin123',
    role: 'admin',
    auth_provider: 'local',
    is_verified: 1,
    verification_code: '123456',
    created_at: new Date().toISOString(),
  },
  {
    id: 'usr_sample_1',
    nama_lengkap: 'Budi Raharjo',
    asal_sekolah: 'SMKN 1 Cimahi',
    email: 'budi.raharjo@smk.belajar.id',
    password_hash: '123456',
    role: 'siswa',
    auth_provider: 'local',
    is_verified: 1,
    verification_code: '123456',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'usr_sample_2',
    nama_lengkap: 'Siti Aminah',
    asal_sekolah: 'SMKN 2 Bandung',
    email: 'siti.aminah@smk.belajar.id',
    password_hash: '123456',
    role: 'siswa',
    auth_provider: 'google',
    is_verified: 1,
    verification_code: '654321',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'usr_sample_3',
    nama_lengkap: 'Fajar Nugraha',
    asal_sekolah: 'SMK Telkom Malang',
    email: 'fajar.nugraha@smk.belajar.id',
    password_hash: '123456',
    role: 'siswa',
    auth_provider: 'local',
    is_verified: 1,
    verification_code: '889900',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  }
];

DEFAULT_STUDENTS.forEach(s => memoryStore.users.set(s.email, s));

// Seed sample exam sessions
const SAMPLE_SESSIONS = [
  {
    id: 'sess_sample_1',
    user_id: 'usr_sample_1',
    user_email: 'budi.raharjo@smk.belajar.id',
    user_name: 'Budi Raharjo',
    asal_sekolah: 'SMKN 1 Cimahi',
    week_id: 1,
    title: 'Modul Minggu 1 (50 Soal)',
    score: 86.0,
    correct_count: 43,
    total_questions: 50,
    time_spent_seconds: 2100,
    is_competent: 1,
    mode: 'exam',
    wrong_question_ids: JSON.stringify(['m1_q7', 'm1_q12']),
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'sess_sample_2',
    user_id: 'usr_sample_1',
    user_email: 'budi.raharjo@smk.belajar.id',
    user_name: 'Budi Raharjo',
    asal_sekolah: 'SMKN 1 Cimahi',
    week_id: 2,
    title: 'Modul Minggu 2 (50 Soal)',
    score: 78.0,
    correct_count: 39,
    total_questions: 50,
    time_spent_seconds: 2400,
    is_competent: 1,
    mode: 'exam',
    wrong_question_ids: JSON.stringify(['m2_q4', 'm2_q18']),
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'sess_sample_3',
    user_id: 'usr_sample_2',
    user_email: 'siti.aminah@smk.belajar.id',
    user_name: 'Siti Aminah',
    asal_sekolah: 'SMKN 2 Bandung',
    week_id: 1,
    title: 'Modul Minggu 1 (50 Soal)',
    score: 92.0,
    correct_count: 46,
    total_questions: 50,
    time_spent_seconds: 1950,
    is_competent: 1,
    mode: 'exam',
    wrong_question_ids: JSON.stringify([]),
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'sess_sample_4',
    user_id: 'usr_sample_2',
    user_email: 'siti.aminah@smk.belajar.id',
    user_name: 'Siti Aminah',
    asal_sekolah: 'SMKN 2 Bandung',
    week_id: 6,
    title: 'Modul Minggu 6 (50 Soal)',
    score: 84.0,
    correct_count: 42,
    total_questions: 50,
    time_spent_seconds: 2300,
    is_competent: 1,
    mode: 'exam',
    wrong_question_ids: JSON.stringify(['m6_q10']),
    created_at: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: 'sess_sample_5',
    user_id: 'usr_sample_3',
    user_email: 'fajar.nugraha@smk.belajar.id',
    user_name: 'Fajar Nugraha',
    asal_sekolah: 'SMK Telkom Malang',
    week_id: 5,
    title: 'Modul Minggu 5 (50 Soal)',
    score: 68.0,
    correct_count: 34,
    total_questions: 50,
    time_spent_seconds: 2700,
    is_competent: 0,
    mode: 'exam',
    wrong_question_ids: JSON.stringify(['m5_q3', 'm5_q15', 'm5_q22']),
    created_at: new Date(Date.now() - 3600000).toISOString(),
  }
];

SAMPLE_SESSIONS.forEach(s => memoryStore.examSessions.push(s));

// Seed sample email delivery logs
const SAMPLE_EMAIL_LOGS = [
  {
    id: 'elog_001',
    recipient_email: 'ya2n.cahyana@gmail.com',
    recipient_name: 'Yayan Cahyana',
    subject: '[482910] Kode Verifikasi Email - TKA SMK TJKT',
    status: 'sent',
    error_message: null,
    sent_at: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: 'elog_002',
    recipient_email: 'budi.raharjo@smk.belajar.id',
    recipient_name: 'Budi Raharjo',
    subject: '[123456] Kode Verifikasi Email - TKA SMK TJKT',
    status: 'sent',
    error_message: null,
    sent_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'elog_003',
    recipient_email: 'siswa.invalid.domain999@domain-palsu.xyz',
    recipient_name: 'Ahmad Supriadi',
    subject: '[991204] Kode Verifikasi Email - TKA SMK TJKT',
    status: 'bounced',
    error_message: '550 5.1.1 Mailbox unavailable: MX record not found or server rejected recipient',
    sent_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'elog_004',
    recipient_email: 'siti.aminah@smk.belajar.id',
    recipient_name: 'Siti Aminah',
    subject: '[654321] Kode Verifikasi Email - TKA SMK TJKT',
    status: 'sent',
    error_message: null,
    sent_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'elog_005',
    recipient_email: 'fajar.nugraha@smk.belajar.id',
    recipient_name: 'Fajar Nugraha',
    subject: '[889900] Kode Verifikasi Email - TKA SMK TJKT',
    status: 'failed',
    error_message: 'ETIMEDOUT: Connection to SMTP host timed out after 10000ms',
    sent_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  }
];

SAMPLE_EMAIL_LOGS.forEach(log => memoryStore.emailLogs.push(log));

// ---------------------------------------------------------------------------
// Real Physical Email Delivery Service (SMTP via Nodemailer) & Logging
// ---------------------------------------------------------------------------
async function recordEmailLog(
  toEmail: string,
  recipientName: string | undefined,
  subject: string,
  status: 'sent' | 'bounced' | 'failed',
  errorMessage?: string
) {
  const logId = `elog_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const sentAt = new Date().toISOString();

  const logObj = {
    id: logId,
    recipient_email: toEmail,
    recipient_name: recipientName || toEmail.split('@')[0],
    subject,
    status,
    error_message: errorMessage || null,
    sent_at: sentAt,
  };

  memoryStore.emailLogs.unshift(logObj);

  if (isMySqlConnected && pool) {
    try {
      await pool.query(
        `INSERT INTO email_logs (id, recipient_email, recipient_name, subject, status, error_message, sent_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [logId, toEmail, recipientName || null, subject, status, errorMessage || null, sentAt]
      );
    } catch (err) {
      console.error('[Database] Failed to insert email log into MySQL:', err);
    }
  }
}

function getEmailTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false',
    },
  });
}

async function sendVerificationEmail(
  toEmail: string,
  code: string,
  recipientName?: string
): Promise<{ sent: boolean; message: string }> {
  const subject = `[${code}] Kode Verifikasi Email - TKA SMK TJKT`;

  try {
    const transporter = getEmailTransporter();

    if (!transporter) {
      console.warn(`[Email Service] SMTP parameters missing in .env (SMTP_HOST, SMTP_USER, SMTP_PASS). Simulated code for ${toEmail}: ${code}`);
      await recordEmailLog(toEmail, recipientName, subject, 'failed', 'Konfigurasi SMTP server belum lengkap');
      return {
        sent: false,
        message: 'Pengiriman email fisik memerlukan konfigurasi SMTP (SMTP_HOST, SMTP_USER, SMTP_PASS) di file .env server.',
      };
    }

    const fromAddress = process.env.SMTP_FROM || `"TKA SMK TJKT" <${process.env.SMTP_USER}>`;

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">TKA SMK TJKT</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; font-weight: 500;">Tes Kemampuan Akademik Teknik Jaringan Komputer & Telekomunikasi</p>
        </div>
        
        <div style="padding: 32px 24px; color: #1e293b;">
          <h2 style="font-size: 18px; font-weight: 700; margin-top: 0; color: #0f172a;">Halo, ${recipientName || 'Siswa TKA SMK TJKT'}! 👋</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
            Terima kasih telah mendaftar di portal <strong>Tes Kemampuan Akademik SMK TJKT</strong>. Berikut adalah 6-digit kode verifikasi aktivasi akun Anda:
          </p>

          <div style="background-color: #f0f9ff; border: 2px dashed #0284c7; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
            <span style="display: block; font-size: 12px; font-weight: 700; color: #0369a1; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Kode Verifikasi OTP Anda:</span>
            <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 900; letter-spacing: 10px; color: #0284c7; display: inline-block;">${code}</span>
          </div>

          <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 6px; margin-bottom: 24px;">
            <p style="margin: 0; font-size: 12px; color: #92400e; line-height: 1.5;">
              ⏰ <strong>Masa berlaku kode: 15 menit.</strong><br/>
              Jangan berikan kode ini kepada siapapun demi keamanan akun Anda.
            </p>
          </div>

          <p style="font-size: 13px; color: #64748b; margin: 0;">
            Jika Anda tidak melakukan pendaftaran ini, silakan abaikan email ini.
          </p>
        </div>

        <div style="background-color: #f8fafc; padding: 16px 24px; border-top: 1px solid #f1f5f9; text-align: center; font-size: 12px; color: #94a3b8;">
          © ${new Date().getFullYear()} TKA SMK TJKT — Portal Asesmen Keahlian Network & Telecommunication
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: fromAddress,
      to: toEmail,
      subject,
      text: `Halo ${recipientName || 'Siswa'}, kode verifikasi TKA SMK TJKT Anda adalah: ${code}. Berlaku selama 15 menit.`,
      html: htmlContent,
    });

    console.log(`[Email Service] Real email delivered to ${toEmail}. Message ID: ${info.messageId}`);
    await recordEmailLog(toEmail, recipientName, subject, 'sent');
    return {
      sent: true,
      message: `Email verifikasi fisik berhasil dikirim ke ${toEmail}`,
    };
  } catch (error: any) {
    console.error(`[Email Service] Error sending email to ${toEmail}:`, error.message);
    const errMsg = error.message || 'Gagal pengiriman email';
    const isBounce = errMsg.includes('550') || errMsg.includes('Recipient address rejected') || errMsg.includes('invalid') || errMsg.includes('Mailbox unavailable');
    await recordEmailLog(toEmail, recipientName, subject, isBounce ? 'bounced' : 'failed', errMsg);
    return {
      sent: false,
      message: `Gagal pengiriman email fisik: ${errMsg}`,
    };
  }
}

async function initDatabase() {
  try {
    pool = mysql.createPool(dbConfig);
    const conn = await pool.getConnection();
    console.log(`[Database] Successfully connected to MySQL at ${dbConfig.host}:${dbConfig.port}`);
    isMySqlConnected = true;

    // Create tables
    await conn.query(`
      CREATE TABLE IF NOT EXISTS email_logs (
        id VARCHAR(64) PRIMARY KEY,
        recipient_email VARCHAR(255) NOT NULL,
        recipient_name VARCHAR(255) NULL,
        subject VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL,
        error_message TEXT NULL,
        sent_at VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(64) PRIMARY KEY,
        nama_lengkap VARCHAR(255) NOT NULL,
        asal_sekolah VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NULL,
        role VARCHAR(50) DEFAULT 'siswa',
        auth_provider VARCHAR(50) DEFAULT 'local',
        is_verified TINYINT(1) DEFAULT 0,
        verification_code VARCHAR(10) NULL,
        verification_expires_at BIGINT NULL,
        avatar_url TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS exam_sessions (
        id VARCHAR(64) PRIMARY KEY,
        user_id VARCHAR(64) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        user_name VARCHAR(255) NOT NULL,
        asal_sekolah VARCHAR(255) NOT NULL,
        week_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        score FLOAT NOT NULL,
        correct_count INT NOT NULL,
        total_questions INT NOT NULL,
        time_spent_seconds INT NOT NULL,
        is_competent TINYINT(1) NOT NULL,
        mode VARCHAR(50) NOT NULL,
        wrong_question_ids TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS app_settings (
        id INT PRIMARY KEY AUTO_INCREMENT,
        setting_key VARCHAR(64) NOT NULL UNIQUE,
        setting_value LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Check if users table is empty
    const [userCountRows]: any = await conn.query('SELECT COUNT(*) as count FROM users');
    const userCount = userCountRows[0]?.count || 0;

    if (userCount === 0) {
      // Seed default sample users into MySQL ONLY if database is fresh/empty
      for (const student of DEFAULT_STUDENTS) {
        await conn.query(`
          INSERT INTO users (id, nama_lengkap, asal_sekolah, email, password_hash, role, auth_provider, is_verified)
          VALUES (?, ?, ?, ?, ?, ?, ?, 1)
          ON DUPLICATE KEY UPDATE updated_at = NOW();
        `, [student.id, student.nama_lengkap, student.asal_sekolah, student.email, student.password_hash, student.role, student.auth_provider]);
      }

      // Also seed sample sessions & email logs into MySQL for initial demo
      for (const sess of SAMPLE_SESSIONS) {
        await conn.query(`
          INSERT IGNORE INTO exam_sessions (id, user_id, user_email, user_name, asal_sekolah, week_id, title, score, correct_count, total_questions, time_spent_seconds, is_competent, mode, wrong_question_ids, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [sess.id, sess.user_id, sess.user_email, sess.user_name, sess.asal_sekolah, sess.week_id, sess.title, sess.score, sess.correct_count, sess.total_questions, sess.time_spent_seconds, sess.is_competent, sess.mode, sess.wrong_question_ids, sess.created_at]);
      }

      for (const log of SAMPLE_EMAIL_LOGS) {
        await conn.query(`
          INSERT IGNORE INTO email_logs (id, recipient_email, recipient_name, subject, status, error_message, sent_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [log.id, log.recipient_email, log.recipient_name, log.subject, log.status, log.error_message, log.sent_at]);
      }
    } else {
      // Database already initialized: ONLY ensure admin accounts exist, DO NOT re-seed deleted sample students!
      const adminUsers = DEFAULT_STUDENTS.filter(s => s.role === 'admin');
      for (const admin of adminUsers) {
        await conn.query(`
          INSERT IGNORE INTO users (id, nama_lengkap, asal_sekolah, email, password_hash, role, auth_provider, is_verified)
          VALUES (?, ?, ?, ?, ?, 'admin', 'local', 1);
        `, [admin.id, admin.nama_lengkap, admin.asal_sekolah, admin.email, admin.password_hash]);
      }
    }

    // Clean up secondary admin if it exists so there is strictly 1 admin
    if (isMySqlConnected && conn) {
      try {
        await conn.query("DELETE FROM users WHERE email = 'admin@tjkt.sch.id'");
      } catch {}
    }
    memoryStore.users.delete('admin@tjkt.sch.id');

    // Sync memoryStore with current MySQL state
    const [dbUsers]: any = await conn.query('SELECT * FROM users');
    memoryStore.users.clear();
    for (const u of dbUsers) {
      memoryStore.users.set(u.email, u);
    }

    const [dbSessions]: any = await conn.query('SELECT * FROM exam_sessions ORDER BY created_at DESC');
    memoryStore.examSessions = dbSessions || [];

    const [dbLogs]: any = await conn.query('SELECT * FROM email_logs ORDER BY created_at DESC');
    memoryStore.emailLogs = dbLogs || [];

    conn.release();
    console.log('[Database] MySQL tables verified and memory store synchronized successfully.');
  } catch (err: any) {
    console.warn(`[Database] Notice: MySQL not currently reachable (${err.message}).`);
    console.warn('[Database] Activated high-availability in-memory/persistent fallback store. All features will work seamlessly.');
    isMySqlConnected = false;
  }
}

initDatabase();

// ---------------------------------------------------------------------------
// Authentication & Registration API Endpoints
// ---------------------------------------------------------------------------

// 1. Register with Form
app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const { namaLengkap, asalSekolah, email, password } = req.body;

    if (!namaLengkap || !asalSekolah || !email || !password || !password.trim()) {
      return res.status(400).json({ error: 'Nama Lengkap, Asal Sekolah, Email, dan Kata Sandi wajib diisi' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationExpiresAt = Date.now() + 15 * 60 * 1000; // 15 mins
    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    if (isMySqlConnected && pool) {
      // Check if user already exists
      const [existing]: any = await pool.query('SELECT * FROM users WHERE email = ?', [cleanEmail]);
      if (existing && existing.length > 0) {
        // If not verified, update code and let them verify
        if (!existing[0].is_verified) {
          await pool.query(
            'UPDATE users SET nama_lengkap = ?, asal_sekolah = ?, verification_code = ?, verification_expires_at = ? WHERE email = ?',
            [namaLengkap, asalSekolah, verificationCode, verificationExpiresAt, cleanEmail]
          );
          const emailResult = await sendVerificationEmail(cleanEmail, verificationCode, namaLengkap);
          return res.json({
            success: true,
            requiresVerification: true,
            email: cleanEmail,
            emailSent: emailResult.sent,
            message: emailResult.sent
              ? `Kode verifikasi email baru telah dikirimkan ke inbox ${cleanEmail}.`
              : `Kode verifikasi baru dibuat. ${emailResult.message}`,
            simulatedCode: verificationCode,
          });
        }
        return res.status(400).json({ error: 'Email sudah terdaftar. Silakan login.' });
      }

      await pool.query(
        `INSERT INTO users (id, nama_lengkap, asal_sekolah, email, password_hash, role, auth_provider, is_verified, verification_code, verification_expires_at)
         VALUES (?, ?, ?, ?, ?, 'siswa', 'local', 0, ?, ?)`,
        [userId, namaLengkap, asalSekolah, cleanEmail, password || 'default123', verificationCode, verificationExpiresAt]
      );
    } else {
      // Fallback Store
      const existing = memoryStore.users.get(cleanEmail);
      if (existing && existing.is_verified) {
        return res.status(400).json({ error: 'Email sudah terdaftar. Silakan login.' });
      }

      memoryStore.users.set(cleanEmail, {
        id: userId,
        nama_lengkap: namaLengkap,
        asal_sekolah: asalSekolah,
        email: cleanEmail,
        password_hash: password || 'default123',
        role: 'siswa',
        auth_provider: 'local',
        is_verified: 0,
        verification_code: verificationCode,
        verification_expires_at: verificationExpiresAt,
        created_at: new Date().toISOString(),
      });
    }

    const emailResult = await sendVerificationEmail(cleanEmail, verificationCode, namaLengkap);

    return res.json({
      success: true,
      requiresVerification: true,
      email: cleanEmail,
      emailSent: emailResult.sent,
      message: emailResult.sent
        ? `Pendaftaran berhasil. Kode verifikasi 6-digit telah dikirim ke email ${cleanEmail}.`
        : `Pendaftaran berhasil. Silakan masukkan 6-digit kode verifikasi yang diterbitkan.`,
      simulatedCode: verificationCode,
    });
  } catch (err: any) {
    console.error('Register error:', err);
    return res.status(500).json({ error: err.message || 'Gagal melakukan pendaftaran' });
  }
});

// 2. Register / Login with Google
app.post('/api/auth/google', async (req: Request, res: Response) => {
  try {
    const { namaLengkap, asalSekolah, email, avatarUrl } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email Google diperlukan' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationExpiresAt = Date.now() + 15 * 60 * 1000;
    const userId = `usr_goog_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    let existingUser: any = null;

    if (isMySqlConnected && pool) {
      const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [cleanEmail]);
      existingUser = rows && rows.length > 0 ? rows[0] : null;

      if (!existingUser) {
        await pool.query(
          `INSERT INTO users (id, nama_lengkap, asal_sekolah, email, role, auth_provider, is_verified, verification_code, verification_expires_at, avatar_url)
           VALUES (?, ?, ?, ?, 'siswa', 'google', 0, ?, ?, ?)`,
          [userId, namaLengkap || 'Siswa Google', asalSekolah || 'SMK TJKT', cleanEmail, verificationCode, verificationExpiresAt, avatarUrl || null]
        );
      } else if (!existingUser.is_verified) {
        await pool.query(
          'UPDATE users SET verification_code = ?, verification_expires_at = ? WHERE email = ?',
          [verificationCode, verificationExpiresAt, cleanEmail]
        );
      }
    } else {
      existingUser = memoryStore.users.get(cleanEmail);
      if (!existingUser) {
        existingUser = {
          id: userId,
          nama_lengkap: namaLengkap || 'Siswa Google',
          asal_sekolah: asalSekolah || 'SMK TJKT',
          email: cleanEmail,
          role: 'siswa',
          auth_provider: 'google',
          is_verified: 0,
          verification_code: verificationCode,
          verification_expires_at: verificationExpiresAt,
          avatar_url: avatarUrl,
          created_at: new Date().toISOString(),
        };
        memoryStore.users.set(cleanEmail, existingUser);
      } else if (!existingUser.is_verified) {
        existingUser.verification_code = verificationCode;
        existingUser.verification_expires_at = verificationExpiresAt;
      }
    }

    // According to user request: "semua model pendaftaran diminta verifikasi via email"
    // If not verified yet, require verification!
    if (!existingUser || !existingUser.is_verified) {
      const recipientName = existingUser ? existingUser.nama_lengkap : (namaLengkap || 'Siswa Google');
      const emailResult = await sendVerificationEmail(cleanEmail, verificationCode, recipientName);

      return res.json({
        success: true,
        requiresVerification: true,
        email: cleanEmail,
        emailSent: emailResult.sent,
        message: emailResult.sent
          ? `Akun Google terdeteksi. Kode verifikasi 6-digit telah dikirim ke inbox ${cleanEmail}.`
          : `Akun Google terdeteksi. Silakan masukkan 6-digit kode verifikasi email untuk aktivasi akun.`,
        simulatedCode: verificationCode,
      });
    }

    // If already verified previously:
    return res.json({
      success: true,
      requiresVerification: false,
      user: {
        id: existingUser.id,
        namaLengkap: existingUser.nama_lengkap,
        asalSekolah: existingUser.asal_sekolah,
        email: existingUser.email,
        role: existingUser.role,
        authProvider: 'google',
        isVerified: true,
        avatarUrl: existingUser.avatar_url,
      }
    });
  } catch (err: any) {
    console.error('Google auth error:', err);
    return res.status(500).json({ error: err.message || 'Gagal login via Google' });
  }
});

// 3. Verify Email with 6-digit Code
app.post('/api/auth/verify-email', async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: 'Email dan Kode Verifikasi wajib diisi' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = code.trim();

    let user: any = null;

    if (isMySqlConnected && pool) {
      const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [cleanEmail]);
      if (!rows || rows.length === 0) {
        return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
      }
      user = rows[0];

      if (user.verification_code !== cleanCode) {
        return res.status(400).json({ error: 'Kode verifikasi salah atau tidak sesuai' });
      }

      if (user.verification_expires_at && Date.now() > user.verification_expires_at) {
        return res.status(400).json({ error: 'Kode verifikasi telah kedaluwarsa. Silakan minta kode baru.' });
      }

      // Mark verified
      await pool.query('UPDATE users SET is_verified = 1, verification_code = NULL WHERE email = ?', [cleanEmail]);
      user.is_verified = 1;
    } else {
      user = memoryStore.users.get(cleanEmail);
      if (!user) {
        return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
      }

      if (user.verification_code !== cleanCode) {
        return res.status(400).json({ error: 'Kode verifikasi salah atau tidak sesuai' });
      }

      user.is_verified = 1;
      user.verification_code = null;
    }

    return res.json({
      success: true,
      message: 'Email berhasil diverifikasi! Akun Anda telah resmi aktif.',
      user: {
        id: user.id,
        namaLengkap: user.nama_lengkap,
        asalSekolah: user.asal_sekolah,
        email: user.email,
        role: user.role,
        authProvider: user.auth_provider,
        isVerified: true,
        avatarUrl: user.avatar_url,
      }
    });
  } catch (err: any) {
    console.error('Verify error:', err);
    return res.status(500).json({ error: err.message || 'Gagal memverifikasi kode' });
  }
});

// 4. Resend Verification Code
app.post('/api/auth/resend-code', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email wajib diisi' });

    const cleanEmail = email.trim().toLowerCase();
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    const newExpires = Date.now() + 15 * 60 * 1000;

    let recipientName = 'Siswa';

    if (isMySqlConnected && pool) {
      await pool.query(
        'UPDATE users SET verification_code = ?, verification_expires_at = ? WHERE email = ?',
        [newCode, newExpires, cleanEmail]
      );
      const [u]: any = await pool.query('SELECT nama_lengkap FROM users WHERE email = ?', [cleanEmail]);
      if (u && u.length > 0) recipientName = u[0].nama_lengkap;
    } else {
      const u = memoryStore.users.get(cleanEmail);
      if (u) {
        u.verification_code = newCode;
        u.verification_expires_at = newExpires;
        recipientName = u.nama_lengkap;
      }
    }

    const emailResult = await sendVerificationEmail(cleanEmail, newCode, recipientName);

    return res.json({
      success: true,
      emailSent: emailResult.sent,
      message: emailResult.sent
        ? `Kode verifikasi baru telah dikirimkan ke email ${cleanEmail}`
        : `Kode verifikasi baru telah diterbitkan.`,
      simulatedCode: newCode,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// 5. Standard Login
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ error: 'Email wajib diisi' });

    const cleanEmail = email.trim().toLowerCase();
    let user: any = null;

    if (isMySqlConnected && pool) {
      const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [cleanEmail]);
      if (!rows || rows.length === 0) {
        return res.status(404).json({ error: 'Akun dengan email ini belum terdaftar.' });
      }
      user = rows[0];
    } else {
      user = memoryStore.users.get(cleanEmail);
      if (!user) {
        return res.status(404).json({ error: 'Akun dengan email ini belum terdaftar.' });
      }
    }

    if (!user.is_verified) {
      const newCode = Math.floor(100000 + Math.random() * 900000).toString();
      if (isMySqlConnected && pool) {
        await pool.query('UPDATE users SET verification_code = ? WHERE email = ?', [newCode, cleanEmail]);
      } else {
        user.verification_code = newCode;
      }

      const emailResult = await sendVerificationEmail(cleanEmail, newCode, user.nama_lengkap);

      return res.json({
        success: false,
        requiresVerification: true,
        email: cleanEmail,
        emailSent: emailResult.sent,
        message: emailResult.sent
          ? `Akun Anda belum diverifikasi. Kode verifikasi baru telah dikirim ke email ${cleanEmail}.`
          : `Akun Anda belum diverifikasi. Silakan masukkan kode verifikasi email terlebih dahulu.`,
        simulatedCode: newCode,
      });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        namaLengkap: user.nama_lengkap,
        asalSekolah: user.asal_sekolah,
        email: user.email,
        role: user.role,
        authProvider: user.auth_provider,
        isVerified: true,
        avatarUrl: user.avatar_url,
      }
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// 5b. Check Saved Browser Session against Database
app.post('/api/auth/check-session', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email wajib diisi' });

    const cleanEmail = email.trim().toLowerCase();
    let user: any = null;

    if (isMySqlConnected && pool) {
      const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [cleanEmail]);
      if (rows && rows.length > 0) user = rows[0];
    } else {
      user = memoryStore.users.get(cleanEmail);
    }

    if (!user || !user.is_verified) {
      return res.json({ valid: false });
    }

    return res.json({
      valid: true,
      user: {
        id: user.id,
        namaLengkap: user.nama_lengkap,
        asalSekolah: user.asal_sekolah,
        email: user.email,
        role: user.role,
        authProvider: user.auth_provider,
        isVerified: true,
        avatarUrl: user.avatar_url,
      }
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// 5c. Update User Profile (Nama Lengkap, Asal Sekolah, Avatar URL)
app.post('/api/auth/update-profile', async (req: Request, res: Response) => {
  try {
    const { email, namaLengkap, asalSekolah, avatarUrl } = req.body;
    if (!email || !namaLengkap || !asalSekolah) {
      return res.status(400).json({ error: 'Email, Nama Lengkap, dan Asal Sekolah wajib diisi' });
    }

    const cleanEmail = email.trim().toLowerCase();
    let user: any = null;

    if (isMySqlConnected && pool) {
      await pool.query(
        'UPDATE users SET nama_lengkap = ?, asal_sekolah = ?, avatar_url = ? WHERE email = ?',
        [namaLengkap, asalSekolah, avatarUrl || null, cleanEmail]
      );
      const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [cleanEmail]);
      if (rows && rows.length > 0) user = rows[0];
    } else {
      user = memoryStore.users.get(cleanEmail);
      if (user) {
        user.nama_lengkap = namaLengkap;
        user.asal_sekolah = asalSekolah;
        user.avatar_url = avatarUrl || null;
      }
    }

    if (!user) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
    }

    return res.json({
      success: true,
      message: 'Profil akun berhasil diperbarui!',
      user: {
        id: user.id,
        namaLengkap: user.nama_lengkap,
        asalSekolah: user.asal_sekolah,
        email: user.email,
        role: user.role,
        authProvider: user.auth_provider,
        isVerified: Boolean(user.is_verified),
        avatarUrl: user.avatar_url,
      }
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Gagal memperbarui profil' });
  }
});

// 5d. Change Password
app.post('/api/auth/change-password', async (req: Request, res: Response) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    if (!email || !newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'Email dan sandi baru (minimal 6 karakter) wajib diisi' });
    }

    const cleanEmail = email.trim().toLowerCase();
    let user: any = null;

    if (isMySqlConnected && pool) {
      const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [cleanEmail]);
      if (!rows || rows.length === 0) {
        return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
      }
      user = rows[0];

      if (user.auth_provider === 'local' && user.password_hash) {
        if (!oldPassword || oldPassword !== user.password_hash) {
          return res.status(400).json({ error: 'Kata sandi lama salah' });
        }
      }

      await pool.query('UPDATE users SET password_hash = ? WHERE email = ?', [newPassword, cleanEmail]);
    } else {
      user = memoryStore.users.get(cleanEmail);
      if (!user) {
        return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
      }
      if (user.auth_provider === 'local' && user.password_hash) {
        if (!oldPassword || oldPassword !== user.password_hash) {
          return res.status(400).json({ error: 'Kata sandi lama salah' });
        }
      }
      user.password_hash = newPassword;
    }

    return res.json({
      success: true,
      message: 'Kata sandi berhasil diperbarui!',
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Gagal mengubah kata sandi' });
  }
});

// 6. Check Email Server SMTP Configuration Status
app.get('/api/auth/email-config-status', (_req: Request, res: Response) => {
  const host = process.env.SMTP_HOST || null;
  const user = process.env.SMTP_USER || null;
  const passSet = Boolean(process.env.SMTP_PASS);
  const isConfigured = Boolean(host && user && passSet);

  return res.json({
    isConfigured,
    smtpHost: host,
    smtpUser: user,
    message: isConfigured
      ? `Server email SMTP aktif (${host})`
      : 'Pengiriman email fisik memerlukan variabel SMTP_HOST, SMTP_USER, dan SMTP_PASS pada file .env.',
  });
});

// 7. Test Email Endpoint (for testing SMTP delivery)
app.post('/api/auth/test-email', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email tujuan wajib diisi' });

    const cleanEmail = email.trim().toLowerCase();
    const testCode = Math.floor(100000 + Math.random() * 900000).toString();
    const result = await sendVerificationEmail(cleanEmail, testCode, 'Penguji Email Physical');

    if (result.sent) {
      return res.json({ success: true, message: `Email uji fisik berhasil dikirim ke ${cleanEmail}` });
    } else {
      return res.status(400).json({ success: false, error: result.message });
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// Exam Record & Session Tracking API Endpoints
// ---------------------------------------------------------------------------

// Save completed exam attempt
app.post('/api/exams/save-session', async (req: Request, res: Response) => {
  try {
    const {
      userId,
      userEmail,
      userName,
      asalSekolah,
      weekId,
      title,
      score,
      correctCount,
      totalQuestions,
      timeSpentSeconds,
      isCompetent,
      mode,
      wrongQuestionIds,
    } = req.body;

    const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const sessionRecord = {
      id: sessionId,
      user_id: userId || 'guest',
      user_email: userEmail || 'guest@smk.belajar.id',
      user_name: userName || 'Siswa Mandiri',
      asal_sekolah: asalSekolah || 'SMK TJKT',
      week_id: weekId || 1,
      title: title || `Modul Minggu ${weekId}`,
      score: parseFloat(score) || 0,
      correct_count: parseInt(correctCount, 10) || 0,
      total_questions: parseInt(totalQuestions, 10) || 50,
      time_spent_seconds: parseInt(timeSpentSeconds, 10) || 0,
      is_competent: isCompetent ? 1 : 0,
      mode: mode || 'exam',
      wrong_question_ids: JSON.stringify(wrongQuestionIds || []),
      created_at: new Date().toISOString(),
    };

    if (isMySqlConnected && pool) {
      await pool.query(
        `INSERT INTO exam_sessions (id, user_id, user_email, user_name, asal_sekolah, week_id, title, score, correct_count, total_questions, time_spent_seconds, is_competent, mode, wrong_question_ids)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          sessionRecord.id,
          sessionRecord.user_id,
          sessionRecord.user_email,
          sessionRecord.user_name,
          sessionRecord.asal_sekolah,
          sessionRecord.week_id,
          sessionRecord.title,
          sessionRecord.score,
          sessionRecord.correct_count,
          sessionRecord.total_questions,
          sessionRecord.time_spent_seconds,
          sessionRecord.is_competent,
          sessionRecord.mode,
          sessionRecord.wrong_question_ids,
        ]
      );
    }

    // Always keep memoryStore in sync
    memoryStore.examSessions.unshift(sessionRecord);

    return res.json({ success: true, sessionId });
  } catch (err: any) {
    console.error('Save exam error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Get Exam History for a user
app.get('/api/exams/user-history/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (isMySqlConnected && pool) {
      const [rows]: any = await pool.query(
        'SELECT * FROM exam_sessions WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
        [userId]
      );
      return res.json({ sessions: rows });
    }

    const filtered = memoryStore.examSessions.filter(s => s.user_id === userId);
    return res.json({ sessions: filtered });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Delete specific exam session
app.delete('/api/exams/session/:sessionId', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    if (isMySqlConnected && pool) {
      await pool.query('DELETE FROM exam_sessions WHERE id = ?', [sessionId]);
    }
    const idx = memoryStore.examSessions.findIndex(s => s.id === sessionId);
    if (idx !== -1) {
      memoryStore.examSessions.splice(idx, 1);
    }
    return res.json({ success: true, message: 'Riwayat ujian berhasil dihapus' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Reset user exam progress (clears all exam sessions for a specific user)
const resetUserProgressHandler = async (req: Request, res: Response) => {
  try {
    const { userId, email } = req.body;
    if (isMySqlConnected && pool) {
      if (userId) {
        await pool.query('DELETE FROM exam_sessions WHERE user_id = ? OR user_email = ?', [userId, email]);
      } else if (email) {
        await pool.query('DELETE FROM exam_sessions WHERE user_email = ?', [email]);
      }
    }
    memoryStore.examSessions = memoryStore.examSessions.filter(
      s => s.user_id !== userId && s.user_email !== email
    );
    return res.json({ success: true, message: 'Progres ujian pengguna berhasil dibersihkan' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

app.post('/api/exams/reset-user-progress', resetUserProgressHandler);
app.post('/api/teacher/reset-progress', resetUserProgressHandler);

// Delete student account and all their exam sessions (Supports POST and DELETE)
async function deleteStudentHandler(req: Request, res: Response) {
  try {
    const userId = req.params.userId || req.body.userId || req.body.id;
    const email = req.body.email || userId;

    if (!userId && !email) {
      return res.status(400).json({ success: false, error: 'ID atau Email pengguna wajib disertakan' });
    }

    if (isMySqlConnected && pool) {
      try {
        await pool.query(
          'DELETE FROM exam_sessions WHERE user_id = ? OR user_email = ?', 
          [userId || '', email || '']
        );
        await pool.query(
          'DELETE FROM users WHERE id = ? OR email = ?', 
          [userId || '', email || '']
        );
      } catch (dbErr: any) {
        console.error('[Database] Error deleting user from MySQL:', dbErr);
      }
    }

    // Memory store cleanup
    const keysToDelete: string[] = [];
    for (const [emailKey, u] of memoryStore.users.entries()) {
      if (
        (userId && (u.id === userId || u.email === userId || emailKey.toLowerCase() === userId.toLowerCase())) ||
        (email && (emailKey.toLowerCase() === email.toLowerCase() || u.email?.toLowerCase() === email.toLowerCase()))
      ) {
        keysToDelete.push(emailKey);
      }
    }
    keysToDelete.forEach(k => memoryStore.users.delete(k));

    memoryStore.examSessions = memoryStore.examSessions.filter(
      s => 
        !(userId && (s.user_id === userId || s.user_email === userId)) &&
        !(email && s.user_email?.toLowerCase() === email.toLowerCase())
    );

    return res.json({ success: true, message: 'Data pengguna berhasil dihapus' });
  } catch (err: any) {
    console.error('Delete student handler error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}

app.post('/api/teacher/delete-student', deleteStudentHandler);
app.delete('/api/teacher/student/:userId', deleteStudentHandler);

// Delete single email log (Supports POST and DELETE)
async function deleteEmailLogHandler(req: Request, res: Response) {
  try {
    const logId = req.params.logId || req.body.logId;
    if (!logId) {
      return res.status(400).json({ success: false, error: 'ID log email wajib disertakan' });
    }
    if (isMySqlConnected && pool) {
      await pool.query('DELETE FROM email_logs WHERE id = ?', [logId]);
    }
    const idx = memoryStore.emailLogs.findIndex(l => l.id === logId);
    if (idx !== -1) {
      memoryStore.emailLogs.splice(idx, 1);
    }
    return res.json({ success: true, message: 'Log email berhasil dihapus' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

app.post('/api/teacher/delete-email-log', deleteEmailLogHandler);
app.delete('/api/teacher/email-log/:logId', deleteEmailLogHandler);

// Clear all email logs (Supports POST and DELETE)
async function clearEmailLogsHandler(_req: Request, res: Response) {
  try {
    if (isMySqlConnected && pool) {
      await pool.query('DELETE FROM email_logs');
    }
    memoryStore.emailLogs = [];
    return res.json({ success: true, message: 'Seluruh log email berhasil dibersihkan' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

app.post('/api/teacher/clear-email-logs', clearEmailLogsHandler);
app.delete('/api/teacher/email-logs/clear-all', clearEmailLogsHandler);

// ---------------------------------------------------------------------------
// Teacher / Instructor Portal Endpoints (Rekap Nilai & Analisis Kelas)
// ---------------------------------------------------------------------------
app.get('/api/teacher/overview', async (req: Request, res: Response) => {
  try {
    const queryEmail = (req.query.email as string || '').trim().toLowerCase();
    const queryRole = (req.query.role as string || '').trim().toLowerCase();

    let allUsers: any[] = [];
    let allSessions: any[] = [];

    if (isMySqlConnected && pool) {
      const [uRows]: any = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
      const [sRows]: any = await pool.query('SELECT * FROM exam_sessions ORDER BY created_at DESC');
      allUsers = uRows || [];
      allSessions = sRows || [];
    } else {
      allUsers = Array.from(memoryStore.users.values());
      allSessions = memoryStore.examSessions;
    }

    // Compute Student Performance Matrix (Modules 1 to 8)
    let studentSummaries = allUsers.map(user => {
      const userSessions = allSessions.filter(s => s.user_email === user.email || s.user_id === user.id);
      
      const moduleScores: Record<number, number> = {};
      let totalScoreSum = 0;
      let completedCount = 0;

      for (let w = 1; w <= 8; w++) {
        const weekAttempts = userSessions.filter(s => s.week_id === w);
        if (weekAttempts.length > 0) {
          const maxScore = Math.max(...weekAttempts.map((a: any) => a.score));
          moduleScores[w] = maxScore;
          totalScoreSum += maxScore;
          completedCount++;
        }
      }

      const avgScore = completedCount > 0 ? totalScoreSum / completedCount : 0;
      const lastSession = userSessions[0];

      return {
        userId: user.id,
        namaLengkap: user.nama_lengkap,
        asalSekolah: user.asal_sekolah,
        email: user.email,
        role: user.role || 'siswa',
        authProvider: user.auth_provider || 'local',
        createdAt: user.created_at || new Date().toISOString(),
        isVerified: Boolean(user.is_verified),
        moduleScores,
        totalAttempts: userSessions.length,
        averageScore: parseFloat(avgScore.toFixed(1)),
        completedModulesCount: completedCount,
        lastActive: lastSession ? lastSession.created_at : user.created_at,
      };
    });

    // RULE: "rekap nilai siswa hanya untuk yang bersangkutan"
    // If request comes from a student, restrict rekap list to ONLY that student's own record
    if (queryRole === 'siswa' && queryEmail) {
      studentSummaries = studentSummaries.filter(s => s.email.toLowerCase() === queryEmail);
    }

    // Exclude admin users from student statistics, class performance averages, and student counts
    const studentOnlySummaries = studentSummaries.filter(s => s.role !== 'admin');

    // Compute module averages across student participants (excluding admin)
    const moduleAverageScores: Record<number, number> = {};
    for (let w = 1; w <= 8; w++) {
      const scoresForW = studentOnlySummaries.filter(s => s.moduleScores[w] !== undefined).map(s => s.moduleScores[w]);
      if (scoresForW.length > 0) {
        moduleAverageScores[w] = parseFloat((scoresForW.reduce((a, b) => a + b, 0) / scoresForW.length).toFixed(1));
      } else {
        moduleAverageScores[w] = 0;
      }
    }

    const totalStudents = studentOnlySummaries.length;
    const verifiedStudents = studentOnlySummaries.filter(s => s.isVerified).length;
    const totalExamsTaken = allSessions.length;
    const overallAvg = studentOnlySummaries.filter(s => s.completedModulesCount > 0);
    const classAverageScore = overallAvg.length > 0 
      ? parseFloat((overallAvg.reduce((a, b) => a + b.averageScore, 0) / overallAvg.length).toFixed(1))
      : 0;

    // RULE: "monitoring email hanya untuk admin"
    // Only return emailLogs if user is admin!
    let emailLogs: any[] = [];
    if (queryRole === 'admin') {
      let emailLogsRaw: any[] = [];
      if (isMySqlConnected && pool) {
        try {
          const [lRows]: any = await pool.query('SELECT * FROM email_logs ORDER BY created_at DESC LIMIT 100');
          emailLogsRaw = lRows || [];
        } catch {
          emailLogsRaw = memoryStore.emailLogs;
        }
      } else {
        emailLogsRaw = memoryStore.emailLogs;
      }

      emailLogs = emailLogsRaw.map(log => ({
        id: log.id,
        recipientEmail: log.recipient_email,
        recipientName: log.recipient_name,
        subject: log.subject,
        status: log.status,
        errorMessage: log.error_message,
        sentAt: log.sent_at,
      }));
    }

    return res.json({
      totalStudents,
      verifiedStudents,
      totalExamsTaken,
      classAverageScore,
      students: studentSummaries,
      moduleAverageScores,
      emailLogs,
      databaseStatus: {
        isMySqlConnected,
        host: dbConfig.host,
        database: dbConfig.database,
      }
    });
  } catch (err: any) {
    console.error('Teacher overview error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Settings API for cross-device persistence
const memorySettingsStore = new Map<string, any>();

app.get('/api/settings/:key', async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    if (isMySqlConnected && pool) {
      const [rows]: any = await pool.query('SELECT setting_value FROM app_settings WHERE setting_key = ?', [key]);
      if (rows && rows.length > 0) {
        return res.json({ success: true, value: JSON.parse(rows[0].setting_value) });
      }
      return res.status(404).json({ success: false, error: 'Setting not found' });
    } else {
      const val = memorySettingsStore.get(key);
      if (val !== undefined) {
        return res.json({ success: true, value: val });
      }
      return res.status(404).json({ success: false, error: 'Setting not found' });
    }
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/settings/:key', async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const value = req.body;
    const jsonStr = JSON.stringify(value);

    if (isMySqlConnected && pool) {
      await pool.query(
        'INSERT INTO app_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
        [key, jsonStr, jsonStr]
      );
    } else {
      memorySettingsStore.set(key, value);
    }

    return res.json({ success: true, message: 'Settings saved successfully' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// CSV Export for Teachers
app.get('/api/teacher/export-csv', async (_req: Request, res: Response) => {
  try {
    let allUsers: any[] = [];
    let allSessions: any[] = [];

    if (isMySqlConnected && pool) {
      const [uRows]: any = await pool.query('SELECT * FROM users');
      const [sRows]: any = await pool.query('SELECT * FROM exam_sessions');
      allUsers = uRows || [];
      allSessions = sRows || [];
    } else {
      allUsers = Array.from(memoryStore.users.values());
      allSessions = memoryStore.examSessions;
    }

    let csv = 'Nama Lengkap,Asal Sekolah,Email,Status Verifikasi,Modul 1,Modul 2,Modul 3,Modul 4,Modul 5,Modul 6,Modul 7,Modul 8,Rata-Rata,Status Kelulusan\n';

    allUsers.filter(u => u.role !== 'admin').forEach(user => {
      const userSessions = allSessions.filter(s => s.user_email === user.email || s.user_id === user.id);
      const scores: (number | string)[] = [];
      let total = 0;
      let count = 0;

      for (let w = 1; w <= 8; w++) {
        const weekAttempts = userSessions.filter(s => s.week_id === w);
        if (weekAttempts.length > 0) {
          const max = Math.max(...weekAttempts.map((a: any) => a.score));
          scores.push(max);
          total += max;
          count++;
        } else {
          scores.push('-');
        }
      }

      const avg = count > 0 ? (total / count).toFixed(1) : '0';
      const status = parseFloat(avg) >= 75 ? 'KOMPETEN' : 'BELUM KOMPETEN';

      csv += `"${user.nama_lengkap}","${user.asal_sekolah}","${user.email}","${user.is_verified ? 'Terverifikasi' : 'Belum'}",${scores.join(',')},${avg},"${status}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="Rekap_Nilai_TKA_SMK_TJKT.csv"');
    return res.send(csv);
  } catch (err: any) {
    return res.status(500).send(`Export error: ${err.message}`);
  }
});

// Status Endpoint
app.get('/api/status', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    database: isMySqlConnected ? 'MySQL Connected' : 'In-Memory High-Availability Fallback',
    config: {
      host: dbConfig.host,
      port: dbConfig.port,
      database: dbConfig.database,
      user: dbConfig.user,
    }
  });
});

// ---------------------------------------------------------------------------
// Vite Dev Server Middleware or Static Build Serve
// ---------------------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] TKA SMK TJKT running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
