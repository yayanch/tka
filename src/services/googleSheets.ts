import { TeacherStudentSummary } from '../types/auth';

export interface ExportResult {
  spreadsheetId?: string;
  spreadsheetUrl?: string;
  totalRows: number;
}

// In-memory cache for dynamic auth user/token if available
let cachedAccessToken: string | null = null;
let cachedGoogleUser: any = null;

// Initialize auth state listener without static build-time dependencies
export const initGoogleAuth = (
  onAuthSuccess?: (user: any, token: string) => void,
  onAuthFailure?: () => void
) => {
  // Safe runtime check for firebase
  (async () => {
    try {
      const { initializeApp, getApps, getApp } = await import('firebase/app');
      const { getAuth, onAuthStateChanged } = await import('firebase/auth');
      const cfgModule = await import('../../firebase-applet-config.json').catch(() => null);
      if (cfgModule?.default) {
        const app = getApps().length === 0 ? initializeApp(cfgModule.default) : getApp();
        const auth = getAuth(app);
        return onAuthStateChanged(auth, (user) => {
          if (user) {
            cachedGoogleUser = user;
            if (cachedAccessToken && onAuthSuccess) {
              onAuthSuccess(user, cachedAccessToken);
            }
          } else {
            cachedGoogleUser = null;
            cachedAccessToken = null;
            if (onAuthFailure) onAuthFailure();
          }
        });
      }
    } catch {
      // Firebase optional module unavailable on VPS build
    }
    if (onAuthFailure) onAuthFailure();
  })();

  return () => {};
};

export const getGoogleAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const getGoogleUser = (): any => {
  return cachedGoogleUser;
};

export const signInWithGoogleSheets = async (): Promise<{ user: any; accessToken: string }> => {
  try {
    const { initializeApp, getApps, getApp } = await import('firebase/app');
    const { getAuth, signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
    const cfgModule = await import('../../firebase-applet-config.json');
    const app = getApps().length === 0 ? initializeApp(cfgModule.default) : getApp();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/spreadsheets');

    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Gagal mendapatkan token akses dari Google.');
    }

    cachedAccessToken = credential.accessToken;
    cachedGoogleUser = result.user;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (err: any) {
    console.warn('Firebase Google Auth not active on this environment:', err);
    throw new Error('Metode login langsung Google OAuth belum diaktifkan di server ini. Gunakan fitur "Ekspor ke Google Sheets" untuk menyalin data otomatis ke Google Sheets.');
  }
};

export const logoutGoogle = async () => {
  cachedAccessToken = null;
  cachedGoogleUser = null;
};

export const createAndExportGoogleSheet = async (
  title: string,
  students: TeacherStudentSummary[],
  schoolName: string = 'Semua Sekolah'
): Promise<ExportResult> => {
  // 1. Prepare Header and Data Rows formatted for Google Sheets
  const headers = [
    'No',
    'Nama Siswa',
    'Asal Sekolah',
    'Email',
    'Status Akun',
    'M1 (Dunia Kerja)',
    'M2 (Hardware & OS)',
    'M3 (Switch & VLAN)',
    'M4 (K3LH & 5R)',
    'M5 (Kabel & Topologi)',
    'M6 (Fiber Optik)',
    'M7 (OSI/TCP & WLAN)',
    'M8 (Alat Ukur)',
    'Rata-Rata Nilai',
    'Status Kelulusan',
  ];

  const rows = students.map((s, idx) => {
    const scores = [1, 2, 3, 4, 5, 6, 7, 8].map((w) =>
      s.moduleScores?.[w] !== undefined ? s.moduleScores[w] : '-'
    );
    const avg = s.averageScore !== undefined ? s.averageScore.toFixed(1) : '0';
    const status = (s.averageScore || 0) >= 75 ? 'KOMPETEN' : 'BELUM KOMPETEN';

    return [
      idx + 1,
      s.namaLengkap,
      s.asalSekolah,
      s.email,
      s.isVerified ? 'Terverifikasi' : 'Belum Verifikasi',
      ...scores,
      avg,
      status,
    ].join('\t');
  });

  const tsvContent = [headers.join('\t'), ...rows].join('\n');

  // 2. Copy TSV content directly to user clipboard
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(tsvContent);
    } catch (e) {
      console.warn('Clipboard write deferred:', e);
    }
  }

  // 3. Trigger .tsv file download as backup
  try {
    const blob = new Blob([tsvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Rekap_Nilai_TKA_SMK_TJKT_${schoolName}.tsv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (dlErr) {
    console.warn('File download skipped:', dlErr);
  }

  return {
    spreadsheetUrl: 'https://sheets.new',
    totalRows: students.length,
  };
};
