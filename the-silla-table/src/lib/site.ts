import type { Locale } from '@/i18n/routing';

export const siteConfig = {
  name: 'The Silla Table',
  shortName: 'The Silla Table',
  email: process.env.CONTACT_TO_EMAIL ?? 'hello@thesillatable.com',
  // Falls back to localhost for the local MVP.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
  social: {
    instagram: 'https://instagram.com/thesillatable',
  },
  location: {
    label: 'Gyeongju, Republic of Korea',
    // Gyeongju city centre — used for the JSON-LD address / map placeholder.
    lat: 35.8562,
    lng: 129.2247,
  },
} as const;

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
};

export const localeShort: Record<Locale, string> = {
  en: 'EN',
  ko: 'KO',
};

/** Absolute URL for a given locale + path (used for canonical / OG / sitemap). */
export function absoluteUrl(locale: Locale, pathname = ''): string {
  const clean = pathname === '' ? '' : `/${pathname.replace(/^\//, '')}`;
  return `${siteConfig.url}/${locale}${clean}`;
}

/** canonical + hreflang alternates for a page (spec §9.1). */
export function buildAlternates(locale: Locale, pathname = '') {
  return {
    canonical: absoluteUrl(locale, pathname),
    languages: {
      en: absoluteUrl('en', pathname),
      ko: absoluteUrl('ko', pathname),
      'x-default': absoluteUrl('en', pathname),
    },
  };
}
