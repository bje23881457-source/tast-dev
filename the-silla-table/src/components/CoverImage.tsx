import type { Category } from '@/lib/content';

// Branded placeholder covers (no photography yet for the MVP). Each category gets its own
// palette + motif so cards read as one system. Swap this for <Image> once real photos exist.
const PALETTES: Record<Category, [string, string, string]> = {
  history: ['#1b2432', '#2c3a52', '#c8a45c'],
  experience: ['#233240', '#355a5a', '#d7bd82'],
  food: ['#3a2418', '#7a3b22', '#e0b878'],
  seasonal: ['#243027', '#3c5a3a', '#c8a45c'],
  catering: ['#2a1f2e', '#5a3a52', '#d7bd82'],
};

function Motif({ category, accent }: { category: Category; accent: string }) {
  // A simple, recognisable line motif per category — evokes Silla without needing assets.
  switch (category) {
    case 'food':
    case 'catering':
      // Bowl / table setting
      return (
        <g stroke={accent} strokeWidth="2.5" fill="none" opacity="0.9">
          <path d="M60 118 q40 34 80 0" />
          <ellipse cx="100" cy="112" rx="42" ry="9" />
          <line x1="100" y1="70" x2="100" y2="103" />
          <circle cx="100" cy="64" r="6" fill={accent} stroke="none" />
        </g>
      );
    case 'seasonal':
      // Moon jar / full moon over water
      return (
        <g stroke={accent} strokeWidth="2.5" fill="none" opacity="0.9">
          <circle cx="100" cy="80" r="30" />
          <path d="M50 122 q25 -14 50 0 t50 0" />
        </g>
      );
    case 'history':
    default:
      // Pagoda silhouette (Silla stone pagoda)
      return (
        <g stroke={accent} strokeWidth="2.5" fill="none" opacity="0.9">
          <path d="M78 118 h44 M82 118 v-14 h36 v14 M86 104 v-16 h28 v16 M90 88 v-18 h20 v18" />
          <path d="M100 70 l-8 -10 h16 z" fill={accent} stroke="none" />
        </g>
      );
  }
}

export default function CoverImage({
  category,
  alt,
  className = '',
}: {
  category: Category;
  alt: string;
  className?: string;
}) {
  const [from, via, accent] = PALETTES[category] ?? PALETTES.experience;
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative h-full w-full overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 200 150"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`g-${category}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={via} />
          </linearGradient>
        </defs>
        <rect width="200" height="150" fill={`url(#g-${category})`} />
        <Motif category={category} accent={accent} />
      </svg>
    </div>
  );
}
