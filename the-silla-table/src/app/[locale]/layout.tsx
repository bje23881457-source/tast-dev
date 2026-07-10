import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations, getMessages } from 'next-intl/server';
import { Inter, Source_Serif_4 } from 'next/font/google';
import localFont from 'next/font/local';
import { routing, type Locale } from '@/i18n/routing';
import { siteConfig, absoluteUrl } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import JsonLd from '@/components/JsonLd';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const serif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

// Pretendard (variable) — Korean typeface. Self-hosted, so no runtime network request.
const pretendard = localFont({
  src: '../../fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Fully prerender every locale route (no on-demand fallback function). This keeps the whole
// app static so it deploys to edge hosts (Cloudflare Pages) where the filesystem-based content
// loader can't run at request time — content is read only at build. Unknown params -> 404.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t('metaTitle'),
      template: `%s · ${siteConfig.name}`,
    },
    description: t('metaDescription'),
    applicationName: siteConfig.name,
    alternates: {
      canonical: absoluteUrl(locale),
      languages: {
        en: absoluteUrl('en'),
        ko: absoluteUrl('ko'),
        'x-default': absoluteUrl('en'),
      },
    },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      url: absoluteUrl(locale),
      title: t('metaTitle'),
      description: t('metaDescription'),
    },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Nav' });
  const messages = await getMessages();

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    description:
      'Gyeongju & Silla cultural stories, experiences and catering for international travellers.',
    email: siteConfig.email,
    url: absoluteUrl(locale),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gyeongju',
      addressCountry: 'KR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.location.lat,
      longitude: siteConfig.location.lng,
    },
    sameAs: [siteConfig.social.instagram],
  };

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${serif.variable} ${pretendard.variable}`}
    >
      <body className="flex min-h-screen flex-col font-sans">
        <JsonLd data={orgSchema} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-white"
          >
            {t('skipToContent')}
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
