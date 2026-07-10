'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { localeShort, localeNames } from '@/lib/site';

/** Explicit language switch (no forced redirect — spec §9.1). Preserves the current path. */
export default function LocaleSwitcher({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const t = useTranslations('Nav');
  const activeLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onSelect(locale: Locale) {
    if (locale === activeLocale) return;
    startTransition(() => {
      // usePathname() already resolves dynamic params, so the same route is kept.
      router.replace(pathname, { locale });
    });
  }

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full border border-current/20 p-0.5"
      role="group"
      aria-label={t('language')}
    >
      {routing.locales.map((locale) => {
        const isActive = locale === activeLocale;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => onSelect(locale)}
            disabled={isPending}
            aria-current={isActive ? 'true' : undefined}
            aria-label={localeNames[locale]}
            className={[
              'rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors',
              isActive
                ? variant === 'dark'
                  ? 'bg-white text-ink-900'
                  : 'bg-ink-800 text-white'
                : 'opacity-70 hover:opacity-100',
            ].join(' ')}
          >
            {localeShort[locale]}
          </button>
        );
      })}
    </div>
  );
}
