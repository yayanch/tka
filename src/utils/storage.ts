import { OverallUserProgress, CategoryHistoryRecord } from '../types/quiz';

const PROGRESS_STORAGE_KEY = 'tka_smk_tjkt_progress_v1';
const LEGACY_MODULES_KEY = 'tka_completed_module_weeks';

const DEFAULT_PROGRESS: OverallUserProgress = {
  totalAttempts: 0,
  totalQuestionsAnswered: 0,
  completedModuleWeeks: [],
  categoryStats: {
    1: { attempts: 0, highestScore: 0, latestScore: 0, latestDate: '', totalAnswered: 0, totalCorrect: 0 },
    2: { attempts: 0, highestScore: 0, latestScore: 0, latestDate: '', totalAnswered: 0, totalCorrect: 0 },
    3: { attempts: 0, highestScore: 0, latestScore: 0, latestDate: '', totalAnswered: 0, totalCorrect: 0 },
    4: { attempts: 0, highestScore: 0, latestScore: 0, latestDate: '', totalAnswered: 0, totalCorrect: 0 },
    5: { attempts: 0, highestScore: 0, latestScore: 0, latestDate: '', totalAnswered: 0, totalCorrect: 0 },
    6: { attempts: 0, highestScore: 0, latestScore: 0, latestDate: '', totalAnswered: 0, totalCorrect: 0 },
    7: { attempts: 0, highestScore: 0, latestScore: 0, latestDate: '', totalAnswered: 0, totalCorrect: 0 },
    8: { attempts: 0, highestScore: 0, latestScore: 0, latestDate: '', totalAnswered: 0, totalCorrect: 0 },
  },
  bookmarkedQuestionIds: [],
  history: [],
};

export function loadUserProgress(): OverallUserProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    
    // Support completed module weeks from progress or legacy key
    let completedWeeks: number[] = [];
    if (Array.isArray(parsed.completedModuleWeeks)) {
      completedWeeks = parsed.completedModuleWeeks;
    } else {
      try {
        const legacy = localStorage.getItem(LEGACY_MODULES_KEY);
        if (legacy) completedWeeks = JSON.parse(legacy);
      } catch {}
    }

    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      completedModuleWeeks: completedWeeks,
      categoryStats: {
        ...DEFAULT_PROGRESS.categoryStats,
        ...(parsed.categoryStats || {}),
      },
    };
  } catch (err) {
    console.error('Failed to load user progress:', err);
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: OverallUserProgress): void {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save user progress:', err);
  }
}

export function recordCompletedSession(record: CategoryHistoryRecord): OverallUserProgress {
  const current = loadUserProgress();
  const weekId = record.weekId;
  const isSpecificWeek = weekId >= 1 && weekId <= 8;

  const updatedHistory = [record, ...current.history].slice(0, 50); // keep last 50 attempts

  const updatedCategoryStats = { ...current.categoryStats };
  if (isSpecificWeek) {
    const prev = updatedCategoryStats[weekId] || {
      attempts: 0,
      highestScore: 0,
      latestScore: 0,
      latestDate: '',
      totalAnswered: 0,
      totalCorrect: 0,
    };

    updatedCategoryStats[weekId] = {
      attempts: prev.attempts + 1,
      highestScore: Math.max(prev.highestScore, record.score),
      latestScore: record.score,
      latestDate: record.date,
      totalAnswered: prev.totalAnswered + record.total,
      totalCorrect: prev.totalCorrect + record.correct,
    };
  }

  const updated: OverallUserProgress = {
    ...current,
    totalAttempts: current.totalAttempts + 1,
    totalQuestionsAnswered: current.totalQuestionsAnswered + record.total,
    categoryStats: updatedCategoryStats,
    history: updatedHistory,
  };

  saveUserProgress(updated);
  return updated;
}

export function toggleBookmarkQuestion(questionId: string): boolean {
  const progress = loadUserProgress();
  const exists = progress.bookmarkedQuestionIds.includes(questionId);
  let updatedBookmarks: string[];

  if (exists) {
    updatedBookmarks = progress.bookmarkedQuestionIds.filter(id => id !== questionId);
  } else {
    updatedBookmarks = [...progress.bookmarkedQuestionIds, questionId];
  }

  saveUserProgress({
    ...progress,
    bookmarkedQuestionIds: updatedBookmarks,
  });

  return !exists;
}

export function toggleModuleCompleted(weekId: number): number[] {
  const progress = loadUserProgress();
  const current = progress.completedModuleWeeks || [];
  const exists = current.includes(weekId);
  const updated = exists ? current.filter(w => w !== weekId) : [...current, weekId];

  saveUserProgress({
    ...progress,
    completedModuleWeeks: updated,
  });

  try {
    localStorage.setItem(LEGACY_MODULES_KEY, JSON.stringify(updated));
  } catch {}

  return updated;
}

export function resetAllUserProgress(): void {
  saveUserProgress({
    ...DEFAULT_PROGRESS,
    completedModuleWeeks: [],
  });
  try {
    localStorage.removeItem(LEGACY_MODULES_KEY);
    localStorage.setItem(LEGACY_MODULES_KEY, JSON.stringify([]));
  } catch {}
}
