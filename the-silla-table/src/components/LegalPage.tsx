import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import type { LegalSection } from '@/lib/legal';

export default async function LegalPage({
  title,
  sections,
  lastUpdated,
}: {
  title: string;
  sections: LegalSection[];
  lastUpdated: string;
  locale?: Locale;
}) {
  const t = await getTranslations('Legal');

  return (
    <div className="container-page py-16 sm:py-20">
      <div className="mx-auto max-w-prose">
        <h1 className="font-serif text-4xl font-semibold text-ink-900">{title}</h1>
        <p className="mt-3 text-sm text-ink-700/70">
          {t('lastUpdated')}: {lastUpdated}
        </p>
        <p className="mt-6 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-ink-800">
          {t('placeholderNotice')}
        </p>

        <div className="prose-silla mt-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
