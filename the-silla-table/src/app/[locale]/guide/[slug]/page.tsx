import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getContentItem, getSlugs } from '@/lib/content';
import { buildDetailMetadata, buildArticleSchema } from '@/lib/seo';
import ContentDetailView from '@/components/ContentDetailView';
import JsonLd from '@/components/JsonLd';

export function generateStaticParams() {
  return getSlugs('guide').map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = getContentItem('guide', slug, locale);
  if (!item) return {};
  return buildDetailMetadata(item, locale);
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const item = getContentItem('guide', slug, locale);
  if (!item) notFound();
  return (
    <>
      <JsonLd data={buildArticleSchema(item, locale)} />
      <ContentDetailView item={item} locale={locale} />
    </>
  );
}
