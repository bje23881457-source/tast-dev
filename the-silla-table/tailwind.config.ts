import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep navy / ink base, gold accent, warm neutral — Korean traditional palette, modernised.
        ink: {
          DEFAULT: '#1b2432',
          900: '#131a24',
          800: '#1b2432',
          700: '#283446',
        },
        navy: '#1b2432',
        gold: {
          DEFAULT: '#c8a45c',
          600: '#b48f45',
          400: '#d7bd82',
        },
        sand: {
          50: '#faf7f1',
          100: '#f3ede1',
          200: '#e7dcc7',
        },
        clay: '#a8563a',
      },
      fontFamily: {
        // Latin glyphs resolve to Inter first; Hangul (absent in Inter) falls through to Pretendard.
        sans: ['var(--font-inter)', 'var(--font-pretendard)', 'system-ui', 'sans-serif'],
        // Serif headings keep Source Serif for Latin; Korean headings render in Pretendard, not a system serif.
        serif: ['var(--font-serif)', 'var(--font-pretendard)', 'Georgia', 'serif'],
      },
      maxWidth: {
        content: '72rem',
        prose: '46rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
