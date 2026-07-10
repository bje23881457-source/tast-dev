import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Locale } from '@/i18n/routing';

export type ContentType = 'stories' | 'experiences' | 'guide';
export type Category = 'history' | 'experience' | 'food' | 'seasonal' | 'catering';

export interface ContentMeta {
  slug: string;
  type: ContentType;
  locale: Locale;
  /** True when the requested locale was missing and we fell back to English. */
  isFallback: boolean;
  title: string;
  category: Category;
  tags: string[];
  coverImage: string;
  coverImageAlt: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  seoTitle?: string;
  seoDescription?: string;
  featured: boolean;
  status: 'draft' | 'published';
  // Experience-only fields.
  duration?: string;
  groupSize?: string;
  priceRange?: string;
  includes?: string[];
  mealIncluded?: boolean;
  location?: string;
  /** Slugs of related experiences (used on story/guide detail pages). */
  related?: string[];
}

export interface ContentItem extends ContentMeta {
  body: string;
}

const CONTENT_ROOT = path.join(process.cwd(), 'content');
const DEFAULT_LOCALE: Locale = 'en';

/** Required fields checked before a `published` item is surfaced (spec §6). */
const REQUIRED_FIELDS: (keyof ContentMeta)[] = [
  'title',
  'excerpt',
  'coverImage',
  'coverImageAlt',
];

function readRaw(type: ContentType, slug: string, locale: Locale): { data: Record<string, unknown>; content: string } | null {
  const file = path.join(CONTENT_ROOT, type, `${slug}.${locale}.mdx`);
  if (!fs.existsSync(file)) return null;
  const source = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(source);
  return { data, content };
}

function toItem(
  type: ContentType,
  slug: string,
  locale: Locale,
  raw: { data: Record<string, unknown>; content: string },
  isFallback: boolean,
): ContentItem | null {
  const d = raw.data;
  const item: ContentItem = {
    slug,
    type,
    locale,
    isFallback,
    title: String(d.title ?? ''),
    category: (d.category as Category) ?? 'experience',
    tags: (d.tags as string[]) ?? [],
    coverImage: String(d.coverImage ?? ''),
    coverImageAlt: String(d.coverImageAlt ?? ''),
    excerpt: String(d.excerpt ?? ''),
    publishedAt: String(d.publishedAt ?? ''),
    updatedAt: d.updatedAt ? String(d.updatedAt) : undefined,
    author: d.author ? String(d.author) : undefined,
    seoTitle: d.seoTitle ? String(d.seoTitle) : undefined,
    seoDescription: d.seoDescription ? String(d.seoDescription) : undefined,
    featured: Boolean(d.featured ?? false),
    status: (d.status as 'draft' | 'published') ?? 'published',
    duration: d.duration ? String(d.duration) : undefined,
    groupSize: d.groupSize ? String(d.groupSize) : undefined,
    priceRange: d.priceRange ? String(d.priceRange) : undefined,
    includes: (d.includes as string[]) ?? undefined,
    mealIncluded: typeof d.mealIncluded === 'boolean' ? d.mealIncluded : undefined,
    location: d.location ? String(d.location) : undefined,
    related: (d.related as string[]) ?? undefined,
    body: raw.content,
  };

  // Content validation: drop published items missing required fields.
  if (item.status === 'published') {
    const missing = REQUIRED_FIELDS.filter((f) => !item[f]);
    if (missing.length > 0) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          `[content] Skipping ${type}/${slug}.${locale}: missing required field(s): ${missing.join(', ')}`,
        );
      }
      return null;
    }
  }

  return item;
}

/** All slugs available for a content type (locale-agnostic). */
function listSlugs(type: ContentType): string[] {
  const dir = path.join(CONTENT_ROOT, type);
  if (!fs.existsSync(dir)) return [];
  const slugs = new Set<string>();
  for (const file of fs.readdirSync(dir)) {
    const match = file.match(/^(.+)\.(en|ko)\.mdx$/);
    if (match) slugs.add(match[1]);
  }
  return [...slugs];
}

/** Load one item, falling back to the default locale when a translation is missing (spec §9.1). */
export function getContentItem(type: ContentType, slug: string, locale: Locale): ContentItem | null {
  const direct = readRaw(type, slug, locale);
  if (direct) return toItem(type, slug, locale, direct, false);

  if (locale !== DEFAULT_LOCALE) {
    const fallback = readRaw(type, slug, DEFAULT_LOCALE);
    if (fallback) return toItem(type, slug, DEFAULT_LOCALE, fallback, true);
  }
  return null;
}

/** Load every published item of a type for a locale, newest first. */
export function getContentList(type: ContentType, locale: Locale): ContentItem[] {
  return listSlugs(type)
    .map((slug) => getContentItem(type, slug, locale))
    .filter((item): item is ContentItem => item !== null && item.status === 'published')
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

/** Featured items across a type, for the home page curation. */
export function getFeatured(type: ContentType, locale: Locale, limit = 3): ContentItem[] {
  const list = getContentList(type, locale);
  const featured = list.filter((i) => i.featured);
  return (featured.length > 0 ? featured : list).slice(0, limit);
}

/** Distinct categories present in a content type (for filter chips). */
export function getCategories(type: ContentType, locale: Locale): Category[] {
  const set = new Set<Category>();
  for (const item of getContentList(type, locale)) set.add(item.category);
  return [...set];
}

/** Resolve related experiences by slug for a detail page. */
export function getRelatedExperiences(slugs: string[] | undefined, locale: Locale): ContentItem[] {
  if (!slugs?.length) return [];
  return slugs
    .map((slug) => getContentItem('experiences', slug, locale))
    .filter((item): item is ContentItem => item !== null && item.status === 'published');
}

/** Slugs for one content type (used by generateStaticParams). */
export function getSlugs(type: ContentType): string[] {
  return listSlugs(type);
}

/** Every (type, slug) pair, used to generate static params & the sitemap. */
export function getAllContentPaths(): { type: ContentType; slug: string }[] {
  const types: ContentType[] = ['stories', 'experiences', 'guide'];
  return types.flatMap((type) => listSlugs(type).map((slug) => ({ type, slug })));
}
