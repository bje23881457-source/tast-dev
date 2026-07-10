import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { getFeatured } from '@/lib/content';
import { type Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import SectionHeading from '@/components/SectionHeading';
import ContentCard from '@/components/ContentCard';
import ContactCTABanner from '@/components/ContactCTABanner';
import CheomseongdaeArt from '@/components/CheomseongdaeArt';

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Home');
  const brand = await getTranslations('Brand');
  const nav = await getTranslations('Nav');

  const stories = getFeatured('stories', locale, 3);
  const experiences = getFeatured('experiences', locale, 3);
  const guides = getFeatured('guide', locale, 3);

  return (
    <>
      {/* Hero — backdrop: Cheomseongdae, the Silla stone observatory of Gyeongju */}
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <CheomseongdaeArt className="absolute inset-0 h-full w-full" />
        {/* Dark wash on the left keeps text legible; the monument stays visible on the right. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 to-transparent" />
        <div className="container-page relative flex min-h-[78vh] flex-col justify-center py-24">
          <p className="kicker animate-fade-up text-gold-400">{t('heroKicker')}</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.1] animate-fade-up sm:text-5xl lg:text-6xl">
            {brand('tagline')}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/75 animate-fade-up">
            {brand('valueProp')}
          </p>
          <div className="mt-9 flex flex-wrap gap-4 animate-fade-up">
            <Link href="/stories" className="btn-primary">
              {t('heroCtaExplore')}
            </Link>
            <Link href="/contact" className="btn-ghost-light">
              {t('heroCtaContact')}
            </Link>
          </div>
        </div>
      </section>

      {/* Stories curation */}
      <section className="section container-page">
        <SectionHeading
          eyebrow={nav('stories')}
          title={t('storiesTitle')}
          subtitle={t('storiesSubtitle')}
          action={
            <Link href="/stories" className="btn-secondary !py-2">
              {t('viewAll')}
            </Link>
          }
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((item) => (
            <ContentCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      {/* Experiences curation */}
      <section className="bg-sand-50">
        <div className="section container-page">
          <SectionHeading
            eyebrow={nav('experiences')}
            title={t('experiencesTitle')}
            subtitle={t('experiencesSubtitle')}
            action={
              <Link href="/experiences" className="btn-secondary !py-2">
                {t('viewAll')}
              </Link>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((item) => (
              <ContentCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="section container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-2">{brand('name')}</p>
            <h2 className="font-serif text-3xl font-semibold text-ink-900 sm:text-4xl">
              {t('trustTitle')}
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink-700">{t('trustBody')}</p>
          </div>
          <dl className="grid grid-cols-3 gap-4">
            {[
              { n: '20+', k: t('trustStatYears') },
              { n: '10k+', k: t('trustStatGuests') },
              { n: '500+', k: t('trustStatEvents') },
            ].map((stat) => (
              <div key={stat.n} className="rounded-2xl border border-sand-200 bg-sand-50 p-5 text-center">
                <dt className="font-serif text-3xl font-semibold text-clay sm:text-4xl">{stat.n}</dt>
                <dd className="mt-2 text-xs leading-5 text-ink-700">{stat.k}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Guide curation */}
      <section className="bg-sand-50">
        <div className="section container-page">
          <SectionHeading
            eyebrow={nav('guide')}
            title={t('guideTitle')}
            subtitle={t('guideSubtitle')}
            action={
              <Link href="/guide" className="btn-secondary !py-2">
                {t('viewAll')}
              </Link>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((item) => (
              <ContentCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section container-page">
        <div className="mx-auto max-w-prose text-center">
          <h2 className="font-serif text-3xl font-semibold text-ink-900 sm:text-4xl">
            {t('finalCtaTitle')}
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink-700">{t('finalCtaBody')}</p>
          <Link href="/contact" className="btn-primary mt-8">
            {t('heroCtaContact')}
          </Link>
        </div>
      </section>

      <ContactCTABanner />
    </>
  );
}
