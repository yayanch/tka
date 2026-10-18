export interface BrandingConfig {
  appName: string;
  appShortName: string;
  logoText: string;
  logoUrl: string;
  logoIcon: string;
  fontStyle: string; // Add this
  faviconUrl: string;
  headerBadge: string;
}

const STORAGE_BRANDING_KEY = 'tka_app_branding_config_v1';

export const DEFAULT_BRANDING_CONFIG: BrandingConfig = {
  appName: 'Simulasi TKA SMK TJKT - Bank 400 Soal & Pembahasan',
  appShortName: 'TKA SMK TJKT',
  logoText: 'TK',
  logoUrl: '',
  logoIcon: '',
  fontStyle: 'font-sans', // Default
  faviconUrl: '',
  headerBadge: 'Bank 400 Soal & Pembahasan',
};

export function getStoredBrandingConfig(): BrandingConfig {
  try {
    const raw = localStorage.getItem(STORAGE_BRANDING_KEY);
    if (raw) {
      return { ...DEFAULT_BRANDING_CONFIG, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Error loading branding config:', e);
  }
  return DEFAULT_BRANDING_CONFIG;
}

export function saveStoredBrandingConfig(config: BrandingConfig): void {
  try {
    localStorage.setItem(STORAGE_BRANDING_KEY, JSON.stringify(config));
    applyBrandingToDOM(config);
  } catch (e) {
    console.error('Error saving branding config:', e);
  }
}

export function applyBrandingToDOM(config: BrandingConfig): void {
  try {
    if (config.appName) {
      document.title = config.appName;
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', config.appName);
    }
    if (config.faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = config.faviconUrl;
    }
    
    // Also update logo image if it exists
    if (config.logoUrl) {
      const logoImg = document.getElementById('navbar-logo-img') as HTMLImageElement;
      if (logoImg) logoImg.src = config.logoUrl;
    }

    // Apply font style
    if (config.fontStyle) {
      document.documentElement.className = document.documentElement.className.replace(/font-(sans|serif|mono|inter|poppins|roboto)/g, '').trim();
      document.documentElement.classList.add(config.fontStyle);
    }
  } catch (e) {
    console.error('Error applying branding to DOM:', e);
  }
}
