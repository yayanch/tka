export interface HeroConfig {
  badge: string;
  title: string;
  description: string;
  stat1Number: string;
  stat1Label: string;
  stat2Number: string;
  stat2Label: string;
  stat3Number: string;
  stat3Label: string;
  stat4Number: string;
  stat4Label: string;
  titleFontSize: string; // e.g. 'text-3xl sm:text-5xl lg:text-6xl'
  descFontSize: string;  // e.g. 'text-base sm:text-lg lg:text-xl'
}

export const DEFAULT_HERO_CONFIG: HeroConfig = {
  badge: 'Platform Pembelajaran & Simulasi CBT Kurikulum Merdeka SMK',
  title: 'Platform Simulasi & Bank 400 Soal Tes Kejuruan Asesmen (TKA) SMK TJKT',
  description: 'Aplikasi interaktif terpadu untuk penguasaan kompetensi kejuruan Teknik Jaringan Komputer dan Telekomunikasi. Dilengkapi dengan materi pembelajaran mandiri 8 modul, sistem skor real-time, pembahasan otomatis, diagram teknis bebas lisensi (public domain), serta pelacakan progres belajar per kategori.',
  stat1Number: '400',
  stat1Label: 'Butir Soal Kejuruan',
  stat2Number: '8 Minggu',
  stat2Label: 'Modul Kompetensi TJKT',
  stat3Number: '16 Skema',
  stat3Label: 'Diagram Bebas Lisensi',
  stat4Number: 'Real-Time',
  stat4Label: 'Skor & Pembahasan',
  titleFontSize: 'text-3xl sm:text-5xl lg:text-6xl',
  descFontSize: 'text-base sm:text-lg lg:text-xl',
};

const STORAGE_HERO_KEY = 'tka_hero_config_v3';

export function getStoredHeroConfig(): HeroConfig {
  try {
    const raw = localStorage.getItem(STORAGE_HERO_KEY);
    if (raw) {
      return { ...DEFAULT_HERO_CONFIG, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Error loading hero config:', e);
  }
  return DEFAULT_HERO_CONFIG;
}

export function saveStoredHeroConfig(config: HeroConfig): void {
  try {
    localStorage.setItem(STORAGE_HERO_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving hero config:', e);
  }
}
