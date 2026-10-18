export interface ContactConfig {
  email: string;
  whatsapp: string;
  operationalHours: string;
  adminName: string;
  supportInfo: string;
}

const STORAGE_CONTACT_KEY = 'tka_app_contact_config_v1';

export const DEFAULT_CONTACT_CONFIG: ContactConfig = {
  email: 'support@tjkt.smk.sch.id',
  whatsapp: '+62 812-3456-7890',
  operationalHours: 'Senin - Jumat (08.00 - 16.00 WIB)',
  adminName: 'Tim Pengembang & Instruktur TJKT',
  supportInfo: 'Hubungi kontak di atas untuk kendala akun, verifikasi email OTP, atau bantuan teknis modul ujian TKA.',
};

export function getStoredContactConfig(): ContactConfig {
  try {
    const raw = localStorage.getItem(STORAGE_CONTACT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_CONTACT_CONFIG, ...parsed };
    }
  } catch (e) {
    console.error('Error reading contact config from localStorage:', e);
  }
  return DEFAULT_CONTACT_CONFIG;
}

export function saveStoredContactConfig(config: ContactConfig): void {
  try {
    localStorage.setItem(STORAGE_CONTACT_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving contact config to localStorage:', e);
  }
}
