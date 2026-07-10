import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { absoluteUrl } from '@/lib/site';
import { getAllContentPaths } from '@/lib/content';

const STATIC_PATHS = ['', 'stories', 'experiences', 'guide', 'about', 'contact', 'privacy', 'terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...STATIC_PATHS, ...getAllContentPaths().map((p) => `${p.type}/${p.slug}`)];

  // One entry per locale, each carrying hreflang alternates (spec §9.1).
  return paths.flatMap((pathname) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, pathname),
      lastModified: new Date('2026-07-10'),
      changeFrequency: 'monthly' as const,
      priority: pathname === '' ? 1 : 0.7,
      alternates: {
        languages: {
          en: absoluteUrl('en', pathname),
          ko: absoluteUrl('ko', pathname),
        },
      },
    })),
  );
}
