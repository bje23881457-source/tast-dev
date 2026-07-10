'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { ContentItem, Category } from '@/lib/content';
import ContentCard from './ContentCard';

/** Client-side category filter + grid (spec §3.1 category/tag filter). */
export default function CategoryFilter({
  items,
  categories,
}: {
  items: ContentItem[];
  categories: Category[];
}) {
  const t = useTranslations('Content');
  const cat = useTranslations('Categories');
  const [active, setActive] = useState<Category | 'all'>('all');

  const filtered = useMemo(
    () => (active === 'all' ? items : items.filter((i) => i.category === active)),
    [items, active],
  );

  return (
    <div>
      {categories.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label={t('filterLabel')}>
          <button
            type="button"
            onClick={() => setActive('all')}
            aria-pressed={active === 'all'}
            className={`chip ${active === 'all' ? 'chip-active' : 'hover:border-gold/60'}`}
          >
            {t('filterAll')}
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={`chip ${active === c ? 'chip-active' : 'hover:border-gold/60'}`}
            >
              {cat(c)}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-ink-700/70">{t('empty')}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <ContentCard key={`${item.type}-${item.slug}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
