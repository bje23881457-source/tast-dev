import { getTranslations } from 'next-intl/server';
import { getContentList, getCategories, type ContentType } from '@/lib/content';
import type { Locale } from '@/i18n/routing';
import CategoryFilter from './CategoryFilter';
import ContactCTABanner from './ContactCTABanner';

// Namespace per content type for the page title/lead.
const NS: Record<ContentType, 'Stories' | 'Experiences' | 'Guide'> = {
  stories: 'Stories',
  experiences: 'Experiences',
  guide: 'Guide',
};

export default async function ContentListView({
  type,
  locale,
}: {
  type: ContentType;
  locale: Locale;
}) {
  const t = await getTranslations(NS[type]);
  const items = getContentList(type, locale);
  const categories = getCategories(type, locale);

  return (
    <>
      <section className="border-b border-sand-200 bg-sand-50">
        <div className="container-page py-16 sm:py-20">
          <h1 className="font-serif text-4xl font-semibold text-ink-900 sm:text-5xl">{t('title')}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-700">{t('lead')}</p>
        </div>
      </section>

      <section className="section container-page">
        <CategoryFilter items={items} categories={categories} />
      </section>

      <ContactCTABanner />
    </>
  );
}
