import 'dotenv/config';
import nodemailer from 'nodemailer';

async function testSmtpConnection() {
  console.log('\n==================================================');
  console.log('  🔍 SKRIP UJI KONEKSI & KREDENSIAL SMTP SERVER');
  console.log('==================================================\n');

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  console.log('📋 Ringkasan Konfigurasi .env yang Terdeteksi:');
  console.log(` - SMTP_HOST   : ${host || '❌ (Belum diisi)'}`);
  console.log(` - SMTP_PORT   : ${port}`);
  console.log(` - SMTP_USER   : ${user || '❌ (Belum diisi)'}`);
  console.log(` - SMTP_PASS   : ${pass ? '***** (Tersedia ' + pass.length + ' karakter)' : '❌ (Belum diisi)'}`);
  console.log(` - SMTP_FROM   : ${from || '❌ (Belum diisi)'}`);
  console.log(` - Mode TLS    : ${secure ? 'SSL/TLS (Port 465)' : 'STARTTLS (Port 587)'}\n`);

  if (!host || !user || !pass) {
    console.error('❌ ERROR DIAGNOSIS: Konfigurasi .env belum lengkap!');
    console.error('Silakan isi variabel SMTP_HOST, SMTP_USER, dan SMTP_PASS di file .env terlebih dahulu.');
    console.error('Contoh untuk Gmail:\n');
    console.error('  SMTP_HOST="smtp.gmail.com"');
    console.error('  SMTP_PORT="587"');
    console.error('  SMTP_USER="alamat.email@gmail.com"');
    console.error('  SMTP_PASS="16_digit_sandi_aplikasi_google"');
    console.error('  SMTP_FROM="\\"TKA SMK TJKT\\" <alamat.email@gmail.com>"\n');
    process.exit(1);
  }

  console.log('🔌 Menghubungkan ke server SMTP dan memverifikasi autentikasi...');

  const transporter = nodemailer.createTransport({
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

  try {
    // 1. Verifikasi Koneksi & Kredensial (transporter.verify)
    await transporter.verify();
    console.log('✅ KONEKSI BERHASIL! Server SMTP dan Kredensial valid (Koneksi & Auth Terverifikasi).\n');

    // 2. Kirim Uji Coba Email Nyata
    const recipientEmail = process.argv[2] || user || 'ya2n.cahyana@gmail.com';
    const testCode = Math.floor(100000 + Math.random() * 900000).toString();

    console.log(`✉️ Mengirimkan email verifikasi pengujian fisik ke: ${recipientEmail}...`);

    const info = await transporter.sendMail({
      from: from || user,
      to: recipientEmail,
      subject: `[${testCode}] Uji Coba Pengiriman Email SMTP - TKA SMK TJKT`,
      text: `Halo, ini adalah pesan pengujian koneksi SMTP untuk portal TKA SMK TJKT. Kode OTP Uji Coba Anda: ${testCode}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; max-width: 500px;">
          <h2 style="color: #2563eb; margin-top: 0;">✅ Uji Coba Pengiriman Email Berhasil!</h2>
          <p>Sistem SMTP portal <strong>TKA SMK TJKT</strong> telah terhubung dengan sempurna ke server email Anda.</p>
          <div style="background-color: #f0f9ff; border: 1px dashed #0284c7; padding: 16px; border-radius: 8px; text-align: center; margin: 16px 0;">
            <span style="font-size: 12px; color: #0369a1; font-weight: bold; display: block;">KODE OTP UJI COBA:</span>
            <span style="font-family: monospace; font-size: 32px; font-weight: bold; color: #0284c7;">${testCode}</span>
          </div>
          <p style="font-size: 12px; color: #64748b;">Waktu Pengujian: ${new Date().toLocaleString('id-ID')}</p>
        </div>
      `,
    });

    console.log(`✅ EMAIL TERKIRIM DENGAN SUKSES!`);
    console.log(` - Message ID : ${info.messageId}`);
    console.log(` - Penerima   : ${recipientEmail}`);
    console.log(` - Response   : ${info.response}\n`);
    console.log('🎉 Kesimpulan: Konfigurasi SMTP Anda 100% siap digunakan di aplikasi!\n');

  } catch (error: any) {
    console.error('\n❌ PENGUJIAN SMTP GAGAL!');
    console.error(`- Kode Error   : ${error.code || error.name || 'UNKNOWN'}`);
    console.error(`- Pesan Error  : ${error.message}\n`);

    console.log('🔍 BANTUAN DIAGNOSIS MASALAH:');
    if (error.code === 'EAUTH' || error.responseCode === 535 || error.message.includes('Invalid login')) {
      console.log('👉 Kredensial Salah (Authentication Failed):');
      console.log('   - Jika menggunakan Gmail: Gunakan "Sandi Aplikasi (App Password)" 16-digit, BUKAN password biasa Gmail.');
      console.log('   - Pastikan Verifikasi 2-Langkah pada akun Google sudah diaktifkan.');
      console.log('   - Periksa kembali ketikan SMTP_USER dan SMTP_PASS pada .env.');
    } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED' || error.code === 'ESOCKET') {
      console.log('👉 Masalah Koneksi Network / Port:');
      console.log('   - Periksa nilai SMTP_HOST (contoh: smtp.gmail.com).');
      console.log('   - Coba ganti SMTP_PORT dari 587 ke 465 (atau sebaliknya).');
    } else {
      console.log('👉 Periksa kembali format SMTP_FROM dan izin pengiriman pada Email Provider Anda.');
    }
    console.log('');
    process.exit(1);
  }
}

testSmtpConnection();
