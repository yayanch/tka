import { OverallUserProgress, CategoryHistoryRecord } from '../types/quiz';
import { fetchUserExamHistory } from '../services/api';

const PROGRESS_STORAGE_KEY = 'tka_smk_tjkt_progress_v1';
const LEGACY_MODULES_KEY = 'tka_completed_module_weeks';

export const DEFAULT_PROGRESS: OverallUserProgress = {
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

function getUserProgressKey(userKey?: string): string {
  if (userKey && userKey.trim()) {
    return `tka_progress_${userKey.trim().toLowerCase()}`;
  }
  return PROGRESS_STORAGE_KEY;
}

export function loadUserProgress(userKey?: string): OverallUserProgress {
  try {
    const key = getUserProgressKey(userKey);
    let raw = localStorage.getItem(key);
    
    // Fallback to legacy default key if user key is empty
    if (!raw && userKey) {
      raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    }

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

export function saveUserProgress(progress: OverallUserProgress, userKey?: string): void {
  try {
    const key = getUserProgressKey(userKey);
    localStorage.setItem(key, JSON.stringify(progress));
    // Also update global fallback key
    if (userKey) {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    }
  } catch (err) {
    console.error('Failed to save user progress:', err);
  }
}

export function recordCompletedSession(record: CategoryHistoryRecord, userKey?: string): OverallUserProgress {
  const current = loadUserProgress(userKey);
  const weekId = record.weekId;
  const isSpecificWeek = weekId >= 1 && weekId <= 8;
  const isSimulation = record.mode === 'simulation';

  const updatedHistory = [record, ...current.history].slice(0, 50); // keep last 50 attempts

  const updatedCategoryStats = { ...current.categoryStats };
  const updatedSimulationStats = { ...(current.simulationStats || {}) };

  if (isSpecificWeek) {
    if (isSimulation) {
      const prevSim = updatedSimulationStats[weekId] || {
        attempts: 0,
        highestScore: 0,
        totalAnswered: 0,
        totalCorrect: 0,
      };
      updatedSimulationStats[weekId] = {
        attempts: prevSim.attempts + 1,
        highestScore: Math.max(prevSim.highestScore, record.score),
        totalAnswered: prevSim.totalAnswered + record.total,
        totalCorrect: prevSim.totalCorrect + record.correct,
      };
    } else {
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
  }

  const updated: OverallUserProgress = {
    ...current,
    totalAttempts: current.totalAttempts + 1,
    totalQuestionsAnswered: current.totalQuestionsAnswered + record.total,
    categoryStats: updatedCategoryStats,
    simulationStats: updatedSimulationStats,
    history: updatedHistory,
  };

  saveUserProgress(updated, userKey);
  return updated;
}

export function toggleBookmarkQuestion(questionId: string, userKey?: string): boolean {
  const progress = loadUserProgress(userKey);
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
  }, userKey);

  return !exists;
}

export function toggleModuleCompleted(weekId: number, userKey?: string): number[] {
  const progress = loadUserProgress(userKey);
  const current = progress.completedModuleWeeks || [];
  const exists = current.includes(weekId);
  const updated = exists ? current.filter(w => w !== weekId) : [...current, weekId];

  saveUserProgress({
    ...progress,
    completedModuleWeeks: updated,
  }, userKey);

  try {
    localStorage.setItem(LEGACY_MODULES_KEY, JSON.stringify(updated));
  } catch {}

  return updated;
}

export function recordCompletedSimulation(weekId: number, simIndex: number, userKey?: string): OverallUserProgress {
  const current = loadUserProgress(userKey);
  const comps = current.completedSimulations || {};
  const weekComps = comps[weekId] || [];
  if (!weekComps.includes(simIndex)) {
    weekComps.push(simIndex);
  }
  const updated: OverallUserProgress = {
    ...current,
    completedSimulations: {
      ...comps,
      [weekId]: weekComps,
    },
  };
  saveUserProgress(updated, userKey);
  return updated;
}

export function resetAllUserProgress(userKey?: string): void {
  saveUserProgress({
    ...DEFAULT_PROGRESS,
    completedModuleWeeks: [],
    completedSimulations: {},
  }, userKey);
  try {
    localStorage.removeItem(LEGACY_MODULES_KEY);
    localStorage.setItem(LEGACY_MODULES_KEY, JSON.stringify([]));
  } catch {}
}

/**
 * Synchronizes user progress with remote exam_sessions from server database.
 * Merges local offline attempts with remote attempts to ensure complete accuracy.
 */
export async function syncUserProgressFromServer(userId: string, email?: string): Promise<OverallUserProgress> {
  const userKey = userId || email || '';
  const localProgress = loadUserProgress(userKey);

  if (!userId && !email) {
    return localProgress;
  }

  try {
    const sessions = await fetchUserExamHistory(userId, email);
    if (!sessions || !Array.isArray(sessions) || sessions.length === 0) {
      return localProgress;
    }

    const updatedCategoryStats: Record<number, any> = { ...DEFAULT_PROGRESS.categoryStats };
    const updatedSimulationStats: Record<number, any> = {};
    let totalAttempts = 0;
    let totalQuestionsAnswered = 0;

    const historyRecords: CategoryHistoryRecord[] = sessions.map((sess: any) => {
      const wId = Number(sess.week_id ?? sess.weekId ?? 1);
      const scoreNum = Number(sess.score ?? 0);
      const correctNum = Number(sess.correct_count ?? sess.correctCount ?? 0);
      const totalNum = Number(sess.total_questions ?? sess.totalQuestions ?? 50);
      const modeStr = (sess.mode || 'exam') as 'exam' | 'practice' | 'simulation';
      const dateStr = sess.created_at
        ? new Date(sess.created_at).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : new Date().toLocaleDateString('id-ID');

      return {
        sessionId: sess.id || `sess_${Date.now()}`,
        date: dateStr,
        weekId: wId,
        score: scoreNum,
        correct: correctNum,
        total: totalNum,
        timeSpentSeconds: Number(sess.time_spent_seconds ?? sess.timeSpentSeconds ?? 0),
        mode: modeStr,
      };
    });

    historyRecords.forEach((record) => {
      totalAttempts++;
      totalQuestionsAnswered += record.total;
      const weekId = record.weekId;
      if (weekId >= 1 && weekId <= 8) {
        if (record.mode === 'simulation') {
          const prevSim = updatedSimulationStats[weekId] || { attempts: 0, highestScore: 0, totalAnswered: 0, totalCorrect: 0 };
          updatedSimulationStats[weekId] = {
            attempts: prevSim.attempts + 1,
            highestScore: Math.max(prevSim.highestScore, record.score),
            totalAnswered: prevSim.totalAnswered + record.total,
            totalCorrect: prevSim.totalCorrect + record.correct,
          };
        } else {
          const prev = updatedCategoryStats[weekId] || { attempts: 0, highestScore: 0, latestScore: 0, latestDate: '', totalAnswered: 0, totalCorrect: 0 };
          updatedCategoryStats[weekId] = {
            attempts: prev.attempts + 1,
            highestScore: Math.max(prev.highestScore, record.score),
            latestScore: record.score,
            latestDate: record.date,
            totalAnswered: prev.totalAnswered + record.total,
            totalCorrect: prev.totalCorrect + record.correct,
          };
        }
      }
    });

    const syncedProgress: OverallUserProgress = {
      ...localProgress,
      totalAttempts: Math.max(localProgress.totalAttempts, totalAttempts),
      totalQuestionsAnswered: Math.max(localProgress.totalQuestionsAnswered, totalQuestionsAnswered),
      categoryStats: updatedCategoryStats,
      simulationStats: { ...localProgress.simulationStats, ...updatedSimulationStats },
      history: historyRecords,
    };

    saveUserProgress(syncedProgress, userKey);
    return syncedProgress;
  } catch (err) {
    console.error('Failed to sync user progress from server:', err);
    return localProgress;
  }
}
