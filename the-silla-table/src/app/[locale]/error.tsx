'use client';

import { useTranslations } from 'next-intl';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('Error');
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="font-serif text-3xl font-semibold text-ink-900">{t('title')}</h1>
      <p className="mt-4 max-w-md text-lg text-ink-700">{t('body')}</p>
      <button type="button" onClick={reset} className="btn-primary mt-8">
        {t('retry')}
      </button>
    </div>
  );
}
