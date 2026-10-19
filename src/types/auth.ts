export interface UserProfile {
  id: string;
  namaLengkap: string;
  asalSekolah: string;
  provinsi?: string;
  kabupatenKota?: string;
  email: string;
  role: 'siswa' | 'guru' | 'admin';
  authProvider: 'local' | 'google';
  isVerified: boolean;
  avatarUrl?: string;
  createdAt: string;
}

export interface StudentExamRecord {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  asalSekolah: string;
  weekId: number;
  title: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  isCompetent: boolean;
  mode: 'exam' | 'practice' | 'comprehensive';
  wrongQuestionIds?: string[];
  createdAt: string;
}

export interface TeacherStudentSummary {
  userId: string;
  namaLengkap: string;
  asalSekolah: string;
  email: string;
  role?: 'siswa' | 'guru' | 'admin';
  authProvider?: 'local' | 'google';
  createdAt?: string;
  isVerified: boolean;
  moduleScores: Record<number, number>; // weekId -> highest score (0-100)
  totalAttempts: number;
  averageScore: number;
  completedModulesCount: number;
  lastActive: string;
  isOnline?: boolean;
}

export interface EmailLogEntry {
  id: string;
  recipientEmail: string;
  recipientName?: string;
  subject: string;
  status: 'sent' | 'bounced' | 'failed';
  errorMessage?: string;
  sentAt: string;
}

export interface LoginLogEntry {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  asalSekolah: string;
  role: string;
  loginMethod: string;
  ipAddress?: string;
  loginAt: string;
}

export interface ServerMetrics {
  cpuUsagePercent: number;
  cpuCount?: number;
  cpuModel?: string;
  memoryUsagePercent: number;
  memoryUsedMB: number;
  memoryTotalMB: number;
  memoryUsedGB?: number;
  memoryTotalGB?: number;
  dbPoolUsagePercent: number;
  dbActiveConnections: number;
  dbConnectionLimit: number;
  storageUsagePercent: number;
  storageUsedMB: number;
  storageLimitMB: number;
  storageUsedGB?: number;
  storageTotalGB?: number;
  uptimeSeconds: number;
  uptimeFormatted: string;
  latencyMs: number;
  activeOnlineStudents: number;
  serverStatus: 'optimal' | 'warning' | 'critical';
}

export interface TeacherClassOverview {
  totalStudents: number;
  verifiedStudents: number;
  totalExamsTaken: number;
  classAverageScore: number;
  students: TeacherStudentSummary[];
  moduleAverageScores: Record<number, number>;
  emailLogs?: EmailLogEntry[];
  loginLogs?: LoginLogEntry[];
  databaseStatus?: {
    isMySqlConnected: boolean;
    host: string;
    database: string;
  };
  serverMetrics?: ServerMetrics;
}
