import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { type ContentItem, type ContentType, getRelatedExperiences } from '@/lib/content';
import type { Locale } from '@/i18n/routing';
import CoverImage from './CoverImage';
import ContentCard from './ContentCard';
import Mdx from './Mdx';
import ContactCTABanner from './ContactCTABanner';

const BACK_KEY: Record<ContentType, 'backToStories' | 'backToExperiences' | 'backToGuide'> = {
  stories: 'backToStories',
  experiences: 'backToExperiences',
  guide: 'backToGuide',
};

function ExperienceFacts({ item, tExp }: { item: ContentItem; tExp: (k: string) => string }) {
  const facts: { label: string; value: string }[] = [];
  if (item.duration) facts.push({ label: tExp('duration'), value: item.duration });
  if (item.groupSize) facts.push({ label: tExp('groupSize'), value: item.groupSize });
  if (item.location) facts.push({ label: tExp('location'), value: item.location });
  if (item.priceRange) facts.push({ label: tExp('priceRange'), value: item.priceRange });
  if (facts.length === 0 && !item.includes?.length) return null;

  return (
    <aside className="rounded-2xl border border-sand-200 bg-sand-50 p-6">
      <dl className="space-y-4">
        {facts.map((f) => (
          <div key={f.label} className="flex justify-between gap-4 border-b border-sand-200 pb-3 last:border-0 last:pb-0">
            <dt className="text-sm font-medium text-ink-700/70">{f.label}</dt>
            <dd className="text-right text-sm font-semibold text-ink-900">{f.value}</dd>
          </div>
        ))}
        {item.mealIncluded && (
          <div className="flex items-center gap-2 text-sm font-medium text-clay">
            <span aria-hidden="true">●</span> {tExp('mealIncluded')}
          </div>
        )}
      </dl>
      {item.includes?.length ? (
        <div className="mt-5">
          <p className="text-sm font-medium text-ink-700/70">{tExp('includes')}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {item.includes.map((inc) => (
              <li key={inc} className="chip">
                {inc}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <Link href="/contact" className="btn-primary mt-6 w-full">
        {tExp('inquire')}
      </Link>
    </aside>
  );
}

export default async function ContentDetailView({
  item,
  locale,
}: {
  item: ContentItem;
  locale: Locale;
}) {
  const t = await getTranslations('Content');
  const tExp = await getTranslations('Experience');
  const cat = await getTranslations('Categories');

  const related = getRelatedExperiences(item.related, locale);
  const isExperience = item.type === 'experiences';

  return (
    <article>
      {/* Header */}
      <header className="border-b border-sand-200 bg-sand-50">
        <div className="container-page py-12 sm:py-16">
          <Link
            href={`/${item.type}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-clay hover:underline"
          >
            ← {t(BACK_KEY[item.type])}
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="chip chip-active">{cat(item.category)}</span>
            <span className="text-sm text-ink-700/70">
              {t('publishedOn')} {item.publishedAt}
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight text-ink-900 sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-700">{item.excerpt}</p>
          {item.author && (
            <p className="mt-4 text-sm text-ink-700/70">{t('byAuthor', { author: item.author })}</p>
          )}
        </div>
      </header>

      {/* Cover */}
      <div className="container-page -mt-0">
        <div className="relative aspect-[16/7] overflow-hidden rounded-b-2xl">
          <CoverImage category={item.category} alt={item.coverImageAlt || item.title} />
        </div>
      </div>

      {/* Fallback notice */}
      {item.isFallback && (
        <div className="container-page mt-6">
          <p className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-ink-800">
            {t('translationFallback')}
          </p>
        </div>
      )}

      {/* Body + facts */}
      <div className="container-page py-12 sm:py-16">
        <div className={isExperience ? 'grid gap-10 lg:grid-cols-[1fr_20rem]' : ''}>
          <div className={isExperience ? '' : 'mx-auto max-w-prose'}>
            <Mdx source={item.body} />
          </div>
          {isExperience && (
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ExperienceFacts item={item} tExp={tExp} />
            </div>
          )}
        </div>
      </div>

      {/* Related experiences */}
      {related.length > 0 && (
        <section className="bg-sand-50">
          <div className="section container-page">
            <h2 className="mb-8 font-serif text-2xl font-semibold text-ink-900 sm:text-3xl">
              {t('relatedTitle')}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <ContentCard key={rel.slug} item={rel} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCTABanner />
    </article>
  );
}
