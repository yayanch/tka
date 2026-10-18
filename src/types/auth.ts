export interface UserProfile {
  id: string;
  namaLengkap: string;
  asalSekolah: string;
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

export interface TeacherClassOverview {
  totalStudents: number;
  verifiedStudents: number;
  totalExamsTaken: number;
  classAverageScore: number;
  students: TeacherStudentSummary[];
  moduleAverageScores: Record<number, number>;
  emailLogs?: EmailLogEntry[];
  databaseStatus?: {
    isMySqlConnected: boolean;
    host: string;
    database: string;
  };
}
