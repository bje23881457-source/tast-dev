import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildAlternates } from '@/lib/site';
import { getPrivacy } from '@/lib/legal';
import LegalPage from '@/components/LegalPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Legal' });
  return {
    title: t('privacyTitle'),
    alternates: buildAlternates(locale, 'privacy'),
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Legal');
  return <LegalPage title={t('privacyTitle')} sections={getPrivacy(locale)} lastUpdated="2026-07-10" />;
}
