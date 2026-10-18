import { HeroConfig, DEFAULT_HERO_CONFIG, getStoredHeroConfig } from '../utils/heroStorage';
import { ContactConfig, DEFAULT_CONTACT_CONFIG, getStoredContactConfig } from '../utils/contactStorage';
import { BrandingConfig, DEFAULT_BRANDING_CONFIG, getStoredBrandingConfig, applyBrandingToDOM } from '../utils/brandingStorage';

const STORAGE_HERO_KEY = 'tka_hero_config_v3';
const STORAGE_CONTACT_KEY = 'tka_app_contact_config_v1';
const STORAGE_BRANDING_KEY = 'tka_app_branding_config_v1';

// ----------------- HERO CONFIG -----------------
export async function fetchHeroConfig(): Promise<HeroConfig> {
  try {
    const res = await fetch('/api/settings/hero_config');
    const data = await res.json();
    if (data.success && data.value) {
      const merged = { ...DEFAULT_HERO_CONFIG, ...data.value };
      localStorage.setItem(STORAGE_HERO_KEY, JSON.stringify(merged));
      return merged;
    }
  } catch (e) {
    console.warn('Failed to fetch hero config from DB, falling back to local storage:', e);
  }
  return getStoredHeroConfig();
}

export async function saveHeroConfigToDB(config: HeroConfig): Promise<void> {
  localStorage.setItem(STORAGE_HERO_KEY, JSON.stringify(config));
  try {
    await fetch('/api/settings/hero_config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
  } catch (e) {
    console.error('Failed to save hero config to DB:', e);
  }
}

// ----------------- CONTACT CONFIG -----------------
export async function fetchContactConfig(): Promise<ContactConfig> {
  try {
    const res = await fetch('/api/settings/contact_config');
    const data = await res.json();
    if (data.success && data.value) {
      const merged = { ...DEFAULT_CONTACT_CONFIG, ...data.value };
      localStorage.setItem(STORAGE_CONTACT_KEY, JSON.stringify(merged));
      return merged;
    }
  } catch (e) {
    console.warn('Failed to fetch contact config from DB, falling back to local storage:', e);
  }
  return getStoredContactConfig();
}

export async function saveContactConfigToDB(config: ContactConfig): Promise<void> {
  localStorage.setItem(STORAGE_CONTACT_KEY, JSON.stringify(config));
  try {
    await fetch('/api/settings/contact_config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
  } catch (e) {
    console.error('Failed to save contact config to DB:', e);
  }
}

// ----------------- BRANDING CONFIG -----------------
export async function fetchBrandingConfig(): Promise<BrandingConfig> {
  try {
    const res = await fetch('/api/settings/branding_config');
    const data = await res.json();
    if (data.success && data.value) {
      const merged = { ...DEFAULT_BRANDING_CONFIG, ...data.value };
      localStorage.setItem(STORAGE_BRANDING_KEY, JSON.stringify(merged));
      applyBrandingToDOM(merged);
      return merged;
    }
  } catch (e) {
    console.warn('Failed to fetch branding config from DB, falling back to local storage:', e);
  }
  const cfg = getStoredBrandingConfig();
  applyBrandingToDOM(cfg);
  return cfg;
}

export async function saveBrandingConfigToDB(config: BrandingConfig): Promise<void> {
  localStorage.setItem(STORAGE_BRANDING_KEY, JSON.stringify(config));
  applyBrandingToDOM(config);
  try {
    await fetch('/api/settings/branding_config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
  } catch (e) {
    console.error('Failed to save branding config to DB:', e);
  }
}
