// Decorative illustration of Cheomseongdae — the 7th-century Silla stone observatory in Gyeongju.
// Self-contained SVG (no assets), used as the home hero backdrop. Purely decorative (aria-hidden).
export default function CheomseongdaeArt({ className = '' }: { className?: string }) {
  // ~27 stone courses of the bottle-shaped tower.
  const courses = Array.from({ length: 22 }, (_, i) => 96 + i * 6.4);

  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f1622" />
          <stop offset="55%" stopColor="#1b2432" />
          <stop offset="100%" stopColor="#3a2f24" />
        </linearGradient>
        <radialGradient id="glow" cx="72%" cy="30%" r="45%">
          <stop offset="0%" stopColor="#c8a45c" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#c8a45c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="stone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c8a45c" />
          <stop offset="18%" stopColor="#8a7648" />
          <stop offset="55%" stopColor="#3d4453" />
          <stop offset="100%" stopColor="#232a37" />
        </linearGradient>
      </defs>

      {/* Dusk sky + warm glow */}
      <rect width="400" height="300" fill="url(#sky)" />
      <rect width="400" height="300" fill="url(#glow)" />

      {/* Moon */}
      <circle cx="292" cy="86" r="30" fill="#e7d6a8" opacity="0.9" />
      <circle cx="282" cy="80" r="30" fill="url(#sky)" opacity="0.55" />

      {/* Stars */}
      <g fill="#e7d6a8">
        <circle cx="70" cy="60" r="1.4" opacity="0.8" />
        <circle cx="120" cy="40" r="1" opacity="0.6" />
        <circle cx="180" cy="70" r="1.2" opacity="0.7" />
        <circle cx="340" cy="120" r="1.3" opacity="0.7" />
        <circle cx="360" cy="55" r="1" opacity="0.5" />
        <circle cx="235" cy="45" r="1.1" opacity="0.6" />
      </g>

      {/* Cheomseongdae — positioned right-of-centre */}
      <g transform="translate(238 0)">
        {/* Bottle-shaped body: wide base curving inward to a narrower top */}
        <path
          d="M8 236
             C-2 210 -1 150 14 118
             C20 105 26 100 33 96
             L79 96
             C86 100 92 105 98 118
             C113 150 114 210 104 236 Z"
          fill="url(#stone)"
          stroke="#1b2432"
          strokeWidth="1"
        />

        {/* Stone courses */}
        <g stroke="#1b2432" strokeWidth="0.8" opacity="0.55">
          {courses.map((y) => (
            <line key={y} x1="4" y1={y} x2="108" y2={y} />
          ))}
        </g>

        {/* Square window opening (mid-body) */}
        <rect x="46" y="150" width="20" height="20" rx="1" fill="#12181f" />

        {/* Jeongjaseok — the well-frame (井) stones crowning the top */}
        <g stroke="#c8a45c" strokeWidth="3.4" strokeLinecap="square">
          <line x1="30" y1="90" x2="82" y2="90" />
          <line x1="30" y1="98" x2="82" y2="98" />
          <line x1="40" y1="82" x2="40" y2="104" />
          <line x1="72" y1="82" x2="72" y2="104" />
        </g>

        {/* Stepped base platform */}
        <rect x="-6" y="236" width="124" height="10" fill="#2a3140" />
        <rect x="-14" y="246" width="140" height="10" fill="#1f2632" />
      </g>

      {/* Ground line */}
      <rect x="0" y="256" width="400" height="44" fill="#161d28" />
    </svg>
  );
}
