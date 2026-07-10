import { Link } from '@/i18n/navigation';

/** "The Silla Table" wordmark logo. Links to the home page. */
export default function Wordmark({
  variant = 'dark',
  className = '',
}: {
  variant?: 'dark' | 'light';
  className?: string;
}) {
  const color = variant === 'light' ? 'text-white' : 'text-ink-900';
  return (
    <Link
      href="/"
      aria-label="The Silla Table — home"
      className={`group inline-flex flex-col leading-none ${color} ${className}`}
    >
      <span className="font-serif text-lg font-semibold tracking-tight sm:text-xl">
        The Silla Table
      </span>
      <span
        className={`mt-1 text-[0.6rem] font-medium uppercase tracking-[0.28em] ${
          variant === 'light' ? 'text-white/60' : 'text-gold-600'
        }`}
      >
        Gyeongju · Silla
      </span>
    </Link>
  );
}
