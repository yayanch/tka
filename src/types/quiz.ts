export type QuestionType = 'PG' | 'PGK_KATEGORI' | 'PGK_MCMA';

export interface CategoryInfo {
  id: number;
  title: string;
  subtitle: string;
  shortTitle: string;
  description: string;
  questionCount: number;
  iconName: string;
  badgeColor: string;
  learningUrl?: string; // Optional external learning resource URL
}

export interface StatementItem {
  id: string; // 'A', 'B', 'C'
  text: string;
  answer: 'Benar' | 'Salah';
}

export interface Question {
  id: string; // e.g. 'm1_q1'
  week: number; // 1 to 8
  number: number; // 1 to 50
  type: QuestionType;
  kompetensi: string;
  subKompetensi: string;
  kasus: string;
  // For PG:
  options?: string[];
  correctAnswer?: string; // e.g. 'D' or option letter
  correctOptionIndex?: number; // 0 to 4
  // For PGK Kategori:
  statements?: StatementItem[];
  // For PGK MCMA:
  mcmaOptions?: string[];
  correctMcmaIndices?: number[]; // e.g. [0, 1, 2]
  // Detailed explanation:
  pembahasan: string;
  // Optional Technical Diagram (Non-license vector / schematic):
  diagramId?: string;
}

export type UserAnswerValue = 
  | number // For PG: index of selected option
  | Record<string, 'Benar' | 'Salah'> // For PGK Kategori: statement ID -> 'Benar' | 'Salah'
  | number[]; // For PGK MCMA: array of selected option indices

export interface QuestionState {
  answered: boolean;
  value?: UserAnswerValue;
  isFlagged: boolean; // Ragu-ragu
  isCorrect?: boolean;
  scoreEarned?: number; // 0.0 to 1.0
}

export interface ExamSession {
  sessionId: string;
  weekId: number; // 1-8, or 0 for comprehensive full test
  title: string;
  mode: 'exam' | 'practice' | 'drill_wrong';
  startTime: number;
  timeLimitMinutes: number;
  elapsedSeconds: number;
  isFinished: boolean;
  questionIds: string[];
  currentIndex: number;
  answers: Record<string, QuestionState>;
  finalScore?: number;
  accuracyRate?: number;
  summary?: {
    total: number;
    correct: number;
    partial: number;
    wrong: number;
    unanswered: number;
  };
}

export interface CategoryHistoryRecord {
  sessionId: string;
  date: string;
  weekId: number;
  score: number;
  correct: number;
  total: number;
  timeSpentSeconds: number;
  mode: string;
}

export interface OverallUserProgress {
  totalAttempts: number;
  totalQuestionsAnswered: number;
  completedModuleWeeks?: number[];
  categoryStats: Record<number, {
    attempts: number;
    highestScore: number;
    latestScore: number;
    latestDate: string;
    totalAnswered: number;
    totalCorrect: number;
  }>;
  bookmarkedQuestionIds: string[];
  history: CategoryHistoryRecord[];
}
