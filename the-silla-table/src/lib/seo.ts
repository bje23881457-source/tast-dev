import type { Metadata } from 'next';
import type { ContentItem } from '@/lib/content';
import type { Locale } from '@/i18n/routing';
import { siteConfig, absoluteUrl, buildAlternates } from '@/lib/site';

/** Per-article page metadata (title/description/canonical/hreflang/OG). */
export function buildDetailMetadata(item: ContentItem, locale: Locale): Metadata {
  const path = `${item.type}/${item.slug}`;
  const title = item.seoTitle ?? item.title;
  const description = item.seoDescription ?? item.excerpt;
  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      type: 'article',
      title,
      description,
      url: absoluteUrl(locale, path),
      publishedTime: item.publishedAt || undefined,
      modifiedTime: item.updatedAt || undefined,
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      siteName: siteConfig.name,
    },
  };
}

/** Schema.org structured data. Experiences use TouristAttraction; stories/guides use Article. */
export function buildArticleSchema(item: ContentItem, locale: Locale): Record<string, unknown> {
  const url = absoluteUrl(locale, `${item.type}/${item.slug}`);
  const base = {
    '@context': 'https://schema.org',
    name: item.title,
    headline: item.title,
    description: item.excerpt,
    inLanguage: locale,
    url,
    datePublished: item.publishedAt || undefined,
    dateModified: item.updatedAt || item.publishedAt || undefined,
    author: { '@type': 'Organization', name: siteConfig.name },
    publisher: { '@type': 'Organization', name: siteConfig.name },
  };

  if (item.type === 'experiences') {
    return {
      ...base,
      '@type': 'TouristAttraction',
      touristType: 'Cultural',
      address: {
        '@type': 'PostalAddress',
        addressLocality: item.location ?? 'Gyeongju',
        addressCountry: 'KR',
      },
    };
  }

  return { ...base, '@type': 'Article', articleSection: item.category };
}
