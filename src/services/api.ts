import { UserProfile, TeacherClassOverview } from '../types/auth';

const STORAGE_USER_KEY = 'tka_current_user_v1';

export const DEFAULT_DEMO_STUDENT: UserProfile = {
  id: 'usr_sample_1',
  namaLengkap: 'Budi Raharjo',
  asalSekolah: 'SMKN 1 Cimahi',
  email: 'budi.raharjo@smk.belajar.id',
  role: 'siswa',
  authProvider: 'local',
  isVerified: true,
  createdAt: '2026-01-01T00:00:00.000Z',
};

export const DEFAULT_DEMO_ADMIN: UserProfile = {
  id: 'usr_admin_1',
  namaLengkap: 'Administrator / Guru Utama TJKT',
  asalSekolah: 'SMKN 1 Cimahi (Dinas Pendidikan)',
  email: 'admin@smk.belajar.id',
  role: 'admin',
  authProvider: 'local',
  isVerified: true,
  createdAt: '2026-01-01T00:00:00.000Z',
};

export function getStoredUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_USER_KEY);
    if (raw) return JSON.parse(raw);
    return null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: UserProfile | null): void {
  if (user) {
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_USER_KEY);
  }
}

async function safeFetch(url: string, options?: RequestInit, retries = 1, delay = 300): Promise<any> {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type');
    
    // If server returned non-JSON (e.g. 500 HTML page or Vite startup interstitial)
    if (!res.ok || !contentType || !contentType.includes('application/json')) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return safeFetch(url, options, retries - 1, delay * 2);
      }
      const text = await res.text().catch(() => '');
      console.warn(`API non-JSON response from ${url} (${res.status}):`, text.slice(0, 150));
      return { 
        success: false, 
        error: `Koneksi server sibuk atau sedang memuat (${res.status}). Silakan coba sekali lagi.`,
        message: `Koneksi server sibuk atau sedang memuat (${res.status}). Silakan coba sekali lagi.` 
      };
    }
    
    const data = await res.json();
    return data;
  } catch (err: any) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return safeFetch(url, options, retries - 1, delay * 2);
    }
    console.warn(`API fetch error on ${url}:`, err);
    return { 
      success: false, 
      error: 'Koneksi terputus atau server sedang melakukan restart. Silakan coba sekali lagi.',
      message: 'Koneksi terputus atau server sedang melakukan restart. Silakan coba sekali lagi.' 
    };
  }
}

export async function checkUserSession(email: string): Promise<{
  valid: boolean;
  user?: UserProfile;
}> {
  const result = await safeFetch('/api/auth/check-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return result;
}

export async function registerWithForm(data: {
  namaLengkap: string;
  asalSekolah: string;
  email: string;
  password?: string;
}): Promise<{
  success: boolean;
  requiresVerification?: boolean;
  email?: string;
  message: string;
  simulatedCode?: string;
  error?: string;
}> {
  const result = await safeFetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return result;
}

export async function registerWithGoogle(data: {
  namaLengkap: string;
  asalSekolah: string;
  email: string;
  avatarUrl?: string;
}): Promise<{
  success: boolean;
  requiresVerification?: boolean;
  email?: string;
  message?: string;
  user?: UserProfile;
  simulatedCode?: string;
  error?: string;
}> {
  const result = await safeFetch('/api/auth/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return result;
}

export async function verifyEmailCode(data: {
  email: string;
  code: string;
}): Promise<{
  success: boolean;
  message?: string;
  user?: UserProfile;
  error?: string;
}> {
  const result = await safeFetch('/api/auth/verify-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (result.success && result.user) {
    setStoredUser(result.user);
  }
  return result;
}

export async function resendVerificationCode(email: string): Promise<{
  success: boolean;
  message?: string;
  simulatedCode?: string;
  error?: string;
}> {
  const result = await safeFetch('/api/auth/resend-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return result;
}

export async function loginUser(data: {
  email: string;
  password?: string;
}): Promise<{
  success: boolean;
  requiresVerification?: boolean;
  email?: string;
  user?: UserProfile;
  message?: string;
  simulatedCode?: string;
  error?: string;
}> {
  const result = await safeFetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (result.success && result.user) {
    setStoredUser(result.user);
  }
  return result;
}

export async function updateUserProfile(data: {
  email: string;
  namaLengkap: string;
  asalSekolah: string;
  avatarUrl?: string;
}): Promise<{
  success: boolean;
  user?: UserProfile;
  message?: string;
  error?: string;
}> {
  const result = await safeFetch('/api/auth/update-profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (result.success && result.user) {
    setStoredUser(result.user);
  }
  return result;
}

export async function changePassword(data: {
  email: string;
  oldPassword?: string;
  newPassword: string;
}): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  const result = await safeFetch('/api/auth/change-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return result;
}

export async function saveExamToDatabase(payload: {
  userId?: string;
  userEmail?: string;
  userName?: string;
  asalSekolah?: string;
  weekId: number;
  title: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  isCompetent: boolean;
  mode: string;
  wrongQuestionIds?: string[];
}): Promise<{ success: boolean; sessionId?: string }> {
  const result = await safeFetch('/api/exams/save-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return result;
}

export async function fetchTeacherOverview(email?: string, role?: string): Promise<TeacherClassOverview | null> {
  const params = new URLSearchParams();
  if (email) params.append('email', email);
  if (role) params.append('role', role);

  const queryString = params.toString() ? `?${params.toString()}` : '';
  const result = await safeFetch(`/api/teacher/overview${queryString}`);
  if (!result || result.success === false) {
    return null;
  }
  return result;
}

export async function deleteStudentAccount(userIdOrEmail: string): Promise<{ success: boolean; message?: string }> {
  const result = await safeFetch('/api/teacher/delete-student', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: userIdOrEmail, email: userIdOrEmail }),
  });
  return result;
}

export async function deleteEmailLog(logId: string): Promise<{ success: boolean; message?: string }> {
  const result = await safeFetch('/api/teacher/delete-email-log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ logId }),
  });
  return result;
}

export async function clearAllEmailLogs(): Promise<{ success: boolean; message?: string }> {
  const result = await safeFetch('/api/teacher/clear-email-logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  return result;
}

export async function resetRemoteUserProgress(email: string, userId?: string): Promise<{ success: boolean }> {
  const result = await safeFetch('/api/teacher/reset-progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, userId }),
  });
  return result;
}
