import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('NotFound');
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-7xl font-semibold text-gold">404</p>
      <h1 className="mt-6 font-serif text-3xl font-semibold text-ink-900">{t('title')}</h1>
      <p className="mt-4 max-w-md text-lg text-ink-700">{t('body')}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-primary">
          {t('home')}
        </Link>
        <Link href="/stories" className="btn-secondary">
          {t('stories')}
        </Link>
      </div>
    </div>
  );
}
