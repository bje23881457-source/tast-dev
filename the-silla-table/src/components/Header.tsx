'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import Wordmark from './Wordmark';
import LocaleSwitcher from './LocaleSwitcher';

const NAV = [
  { href: '/stories', key: 'stories' },
  { href: '/experiences', key: 'experiences' },
  { href: '/guide', key: 'guide' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
] as const;

export default function Header() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-white/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <Wordmark />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={[
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                isActive(item.href)
                  ? 'text-ink-900'
                  : 'text-ink-700 hover:text-ink-900 hover:bg-sand-50',
              ].join(' ')}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LocaleSwitcher />
          </div>
          <Link href="/contact" className="btn-primary hidden !py-2 !px-5 md:inline-flex">
            {t('contact')}
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-800 hover:bg-sand-50 lg:hidden"
            aria-expanded={open}
            aria-label={open ? t('closeMenu') : t('openMenu')}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-sand-200 bg-white lg:hidden">
          <nav aria-label="Mobile" className="container-page flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={[
                  'rounded-lg px-4 py-3 text-base font-medium transition-colors',
                  isActive(item.href) ? 'bg-sand-50 text-ink-900' : 'text-ink-700 hover:bg-sand-50',
                ].join(' ')}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between px-4">
              <LocaleSwitcher />
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary !py-2 !px-5">
                {t('contact')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
