import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/site';
import CoverImage from '@/components/CoverImage';
import ContactCTABanner from '@/components/ContactCTABanner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: buildAlternates(locale, 'about'),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('About');
  const nav = await getTranslations('Nav');

  const sections = [
    { title: t('nameMeaningTitle'), body: t('nameMeaningBody') },
    { title: t('philosophyTitle'), body: t('philosophyBody') },
    { title: t('trustTitle'), body: t('trustBody') },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div className="absolute inset-0 opacity-30">
          <CoverImage category="food" alt="" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 to-ink-900/50" />
        <div className="container-page relative py-24 sm:py-28">
          <p className="kicker text-gold-400">{nav('about')}</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{t('lead')}</p>
        </div>
      </section>

      <section className="section container-page">
        <div className="mx-auto max-w-prose space-y-14">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-serif text-2xl font-semibold text-ink-900 sm:text-3xl">{s.title}</h2>
              <p className="mt-4 text-lg leading-8 text-ink-700">{s.body}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-sand-200 bg-sand-50 p-8 text-center">
            <h2 className="font-serif text-2xl font-semibold text-ink-900">{t('ctaTitle')}</h2>
            <Link href="/contact" className="btn-primary mt-6">
              {nav('contact')}
            </Link>
          </div>
        </div>
      </section>

      <ContactCTABanner />
    </>
  );
}
