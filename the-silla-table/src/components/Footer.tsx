import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/lib/site';
import Wordmark from './Wordmark';

const EXPLORE = [
  { href: '/stories', key: 'stories' },
  { href: '/experiences', key: 'experiences' },
  { href: '/guide', key: 'guide' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
] as const;

export default function Footer() {
  const t = useTranslations('Footer');
  const nav = useTranslations('Nav');
  const year = 2026; // Static build-time year; avoids hydration mismatch on the MVP.

  return (
    <footer className="mt-auto border-t border-ink-700/40 bg-ink-900 text-white/80">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Wordmark variant="light" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">{t('tagline')}</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-4 inline-block text-sm text-gold-400 underline underline-offset-4 hover:text-gold"
          >
            {siteConfig.email}
          </a>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            {t('explore')}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {EXPLORE.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/70 transition-colors hover:text-white">
                  {nav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            {t('legal')}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/privacy" className="text-white/70 transition-colors hover:text-white">
                {t('privacy')}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-white/70 transition-colors hover:text-white">
                {t('terms')}
              </Link>
            </li>
            <li>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition-colors hover:text-white"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {t('company')}. {t('rights')}
          </p>
          <p className="text-white/35">{t('localNote')}</p>
        </div>
      </div>
    </footer>
  );
}
