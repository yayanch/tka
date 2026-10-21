import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User, 
  signOut 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { TeacherStudentSummary } from '../types/auth';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.setCustomParameters({
  prompt: 'consent',
});

// Flag to indicate if we are in the middle of a sign-in flow.
let isSigningIn = false;
// Cache the access token in memory (never in localStorage/sessionStorage).
let cachedAccessToken: string | null = null;
let cachedGoogleUser: User | null = null;

// Initialize auth state listener.
export const initGoogleAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      cachedGoogleUser = user;
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedGoogleUser = null;
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const getGoogleAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const getGoogleUser = (): User | null => {
  return cachedGoogleUser || auth.currentUser;
};

export const signInWithGoogleSheets = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Gagal mendapatkan token akses dari Google.');
    }

    cachedAccessToken = credential.accessToken;
    cachedGoogleUser = result.user;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign-in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const logoutGoogle = async () => {
  await signOut(auth);
  cachedAccessToken = null;
  cachedGoogleUser = null;
};

export interface ExportResult {
  spreadsheetId: string;
  spreadsheetUrl: string;
  totalRows: number;
}

export const createAndExportGoogleSheet = async (
  title: string,
  students: TeacherStudentSummary[],
  schoolName: string = 'Semua Sekolah'
): Promise<ExportResult> => {
  let token = cachedAccessToken;
  if (!token) {
    const authResult = await signInWithGoogleSheets();
    token = authResult.accessToken;
  }

  // 1. Create Spreadsheet
  const sheetTitle = `${title} - ${schoolName} (${new Date().toLocaleDateString('id-ID')})`;
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: sheetTitle,
      },
      sheets: [
        {
          properties: {
            title: 'Rekap Nilai Siswa',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
        },
      ],
    }),
  });

  if (!createRes.ok) {
    const errData = await createRes.json().catch(() => ({}));
    if (createRes.status === 401) {
      // Token might be expired, prompt sign-in again
      cachedAccessToken = null;
      const reAuth = await signInWithGoogleSheets();
      return createAndExportGoogleSheet(title, students, schoolName);
    }
    throw new Error(errData.error?.message || 'Gagal membuat Google Spreadsheet baru.');
  }

  const createdData = await createRes.json();
  const spreadsheetId = createdData.spreadsheetId;
  const spreadsheetUrl = createdData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // 2. Prepare Data Rows
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
      parseFloat(avg),
      status,
    ];
  });

  const allValues = [headers, ...rows];

  // 3. Write Data Values
  const writeRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'Rekap Nilai Siswa'!A1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        range: `'Rekap Nilai Siswa'!A1`,
        majorDimension: 'ROWS',
        values: allValues,
      }),
    }
  );

  if (!writeRes.ok) {
    const errData = await writeRes.json().catch(() => ({}));
    throw new Error(errData.error?.message || 'Gagal mengunggah data ke Google Sheets.');
  }

  // 4. Beautify Header Format via BatchUpdate (Optional styling: header color, bold)
  try {
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: headers.length,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.12, green: 0.25, blue: 0.69 }, // #1e40af
                  textFormat: {
                    bold: true,
                    foregroundColor: { red: 1, green: 1, blue: 1 },
                    fontSize: 10,
                  },
                  horizontalAlignment: 'CENTER',
                },
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)',
            },
          },
          {
            autoResizeDimensions: {
              dimensions: {
                sheetId: 0,
                dimension: 'COLUMNS',
                startIndex: 0,
                endIndex: headers.length,
              },
            },
          },
        ],
      }),
    });
  } catch (styleErr) {
    // Non-fatal styling error
    console.warn('Styling spreadsheet skipped:', styleErr);
  }

  return {
    spreadsheetId,
    spreadsheetUrl,
    totalRows: students.length,
  };
};
