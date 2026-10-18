export type Theme = 'light' | 'dark';

const STORAGE_THEME_KEY = 'tka_app_theme_v1';

export function getStoredTheme(): Theme {
  try {
    const raw = localStorage.getItem(STORAGE_THEME_KEY);
    if (raw === 'dark' || raw === 'light') {
      return raw;
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (e) {
    console.error('Error reading theme from localStorage:', e);
  }
  return 'light';
}

export function applyTheme(theme: Theme): void {
  try {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_THEME_KEY, theme);
  } catch (e) {
    console.error('Error applying theme:', e);
  }
}
