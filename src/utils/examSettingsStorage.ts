export interface ExamDurationSettings {
  defaultDurationMinutes: number;
  moduleDurations: Record<number, number>;
  enableAutoSubmit: boolean;
  warningThresholdMinutes: number;
}

export const DEFAULT_EXAM_SETTINGS: ExamDurationSettings = {
  defaultDurationMinutes: 50,
  moduleDurations: {
    1: 50,
    2: 50,
    3: 50,
    4: 50,
    5: 50,
    6: 50,
    7: 50,
    8: 50,
  },
  enableAutoSubmit: true,
  warningThresholdMinutes: 5,
};

const STORAGE_KEY = 'tka_exam_duration_settings';

export function getExamSettings(): ExamDurationSettings {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return {
        ...DEFAULT_EXAM_SETTINGS,
        ...parsed,
        moduleDurations: {
          ...DEFAULT_EXAM_SETTINGS.moduleDurations,
          ...(parsed.moduleDurations || {}),
        },
      };
    }
  } catch (err) {
    console.error('Failed to parse exam settings:', err);
  }
  return DEFAULT_EXAM_SETTINGS;
}

export function saveExamSettings(settings: ExamDurationSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    // Dispatch custom event so active listeners can update in real-time
    window.dispatchEvent(new Event('tka_exam_settings_updated'));
  } catch (err) {
    console.error('Failed to save exam settings:', err);
  }
}

export function getExamDurationForWeek(weekId: number): number {
  const settings = getExamSettings();
  if (settings.moduleDurations && typeof settings.moduleDurations[weekId] === 'number') {
    return settings.moduleDurations[weekId];
  }
  return settings.defaultDurationMinutes || 50;
}
