import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { siteConfig, buildAlternates } from '@/lib/site';
import ContactForm from '@/components/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: buildAlternates(locale, 'contact'),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Contact');
  const mapsEmbed = process.env.NEXT_PUBLIC_MAPS_EMBED;

  return (
    <div className="container-page py-16 sm:py-20">
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl font-semibold text-ink-900 sm:text-5xl">{t('title')}</h1>
        <p className="mt-4 text-lg leading-8 text-ink-700">{t('lead')}</p>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_22rem]">
        {/* Form */}
        <div className="order-2 lg:order-1">
          <ContactForm />
        </div>

        {/* Details + map */}
        <aside className="order-1 space-y-8 lg:order-2">
          <div className="rounded-2xl border border-sand-200 bg-sand-50 p-6">
            <h2 className="font-serif text-xl font-semibold text-ink-900">{t('detailsTitle')}</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-medium text-ink-700/70">{t('emailLabel')}</dt>
                <dd>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-clay underline underline-offset-4"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-ink-700/70">{t('hoursLabel')}</dt>
                <dd className="text-ink-900">{t('hoursValue')}</dd>
              </div>
              <div>
                <dt className="font-medium text-ink-700/70">{t('locationLabel')}</dt>
                <dd className="text-ink-900">{t('locationValue')}</dd>
              </div>
              <div>
                <dt className="font-medium text-ink-700/70">{t('followLabel')}</dt>
                <dd>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-clay underline underline-offset-4"
                  >
                    Instagram
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-ink-900">{t('mapTitle')}</h2>
            <div className="mt-4 aspect-[4/3] overflow-hidden rounded-2xl border border-sand-200">
              {mapsEmbed ? (
                <iframe
                  title={t('mapTitle')}
                  src={mapsEmbed}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center bg-ink-900 p-6 text-center text-white/70">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z"
                      stroke="#c8a45c"
                      strokeWidth="1.5"
                    />
                    <circle cx="12" cy="10" r="2.5" stroke="#c8a45c" strokeWidth="1.5" />
                  </svg>
                  <p className="mt-3 text-sm">{siteConfig.location.label}</p>
                  <p className="mt-2 text-xs text-white/40">{t('mapPlaceholder')}</p>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
