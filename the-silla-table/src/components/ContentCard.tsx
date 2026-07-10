import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { ContentItem } from '@/lib/content';
import CoverImage from './CoverImage';

/** Thumbnail card used across list pages and the home curation. */
export default function ContentCard({ item }: { item: ContentItem }) {
  const cat = useTranslations('Categories');
  const href = `/${item.type}/${item.slug}`;

  return (
    <Link href={href} className="card group focus-visible:ring-2 focus-visible:ring-gold">
      <div className="relative aspect-[3/2] overflow-hidden">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          <CoverImage category={item.category} alt={item.coverImageAlt || item.title} />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-800 backdrop-blur">
          {cat(item.category)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-semibold leading-snug text-ink-900 group-hover:text-clay">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-700">{item.excerpt}</p>
        {item.type === 'experiences' && (item.duration || item.groupSize) && (
          <p className="mt-3 text-xs font-medium text-ink-700/70">
            {[item.duration, item.groupSize].filter(Boolean).join(' · ')}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-clay">
          →
        </span>
      </div>
    </Link>
  );
}
