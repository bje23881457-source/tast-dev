'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const STORAGE_KEY = 'sillatable-consent';

/**
 * Cookie consent banner (spec §15.2). Analytics (GA) must only load AFTER consent.
 * Choice is stored in localStorage; no analytics is wired in this local MVP, but the
 * gate is in place so GA can be added behind `consent === 'accepted'`.
 */
export default function CookieBanner() {
  const t = useTranslations('Cookie');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* localStorage unavailable — do not block the page. */
    }
  }, []);

  function choose(choice: 'accepted' | 'declined') {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore */
    }
    setVisible(false);
    // GA hook would go here once NEXT_PUBLIC_GA_ID is configured:
    // if (choice === 'accepted') loadAnalytics();
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="container-page">
        <div className="flex flex-col gap-4 rounded-2xl border border-sand-200 bg-white p-5 shadow-2xl shadow-ink-900/10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-ink-700">
            {t('message')}{' '}
            <Link href="/privacy" className="font-medium text-clay underline underline-offset-4">
              {t('learnMore')}
            </Link>
          </p>
          <div className="flex shrink-0 gap-3">
            <button type="button" onClick={() => choose('declined')} className="btn-secondary !py-2 !px-4 text-sm">
              {t('decline')}
            </button>
            <button type="button" onClick={() => choose('accepted')} className="btn-primary !py-2 !px-4 text-sm">
              {t('accept')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
