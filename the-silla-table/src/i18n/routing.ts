import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // English-first, Korean secondary (spec D-2 / §9).
  locales: ['en', 'ko'],
  defaultLocale: 'en',
  // Always keep the locale prefix in the URL (/en/..., /ko/...) for clean hreflang.
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
