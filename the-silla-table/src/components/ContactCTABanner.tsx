import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/** Persistent inquiry CTA shown near the bottom of every page (spec §4). */
export default function ContactCTABanner() {
  const t = useTranslations('CTA');
  return (
    <section className="bg-ink-800">
      <div className="container-page flex flex-col items-start gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
            {t('bannerTitle')}
          </h2>
          <p className="mt-2 max-w-xl text-white/70">{t('bannerBody')}</p>
        </div>
        <Link href="/contact" className="btn-primary shrink-0">
          {t('bannerButton')}
        </Link>
      </div>
    </section>
  );
}
