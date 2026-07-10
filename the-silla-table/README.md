# The Silla Table

Marketing & content website for **The Silla Table** — Gyeongju/Silla cultural stories, experiences
and catering for international travellers. Built from the v1.0 development plan (MVP / Phase 1).

> This is a **local MVP**. It runs fully offline — no email service, analytics, or maps API keys
> are required. Placeholders and env hooks are in place for later Vercel deployment.

## Stack

- **Next.js 15** (App Router) + **TypeScript** (strict)
- **Tailwind CSS** design tokens (deep navy / gold / warm neutral)
- **next-intl** — English-first i18n with `/en` and `/ko` routes + hreflang
- **MDX** content pipeline (`content/`), read with `gray-matter`
- **React Hook Form** + **Zod** contact form → `/api/contact`

## Run locally

```bash
npm install
npm run dev
```

Then open **http://localhost:3000** (redirects to `/en`). Try `/ko` for Korean.

## What's included (Phase 1 / MVP)

- Home, About, Contact, Stories, Experiences, Guide, Privacy, Terms, 404 & error pages
- Category filtering, related experiences, English↔Korean switch (path preserved)
- Contact form: Zod validation, honeypot spam trap, consent checkbox, success/error states
- SEO: per-page metadata, canonical + hreflang, `sitemap.xml`, `robots.txt`, JSON-LD (Organization,
  Article, TouristAttraction)
- Cookie consent banner gating analytics (WCAG-minded, keyboard accessible)

## Contact form (local behaviour)

With no `RESEND_API_KEY` set, submissions are **logged to the server console** and saved as JSON
under `./.inquiries/`. Inspect them there. To send real email later, set the env vars in
`.env.local` (see `.env.local.example`) and wire the marked hook in `src/app/api/contact/route.ts`.

## Content

Add/edit MDX in `content/{stories,experiences,guide}/<slug>.<locale>.mdx`. Front-matter schema
follows §6 of the plan. Missing `ko` translations fall back to `en` automatically.

## Notes / not yet done (later phases)

- Cover images are branded SVG placeholders (no photography yet) — swap `CoverImage` for `next/image`.
- Legal copy is sample text — replace with reviewed PIPA/GDPR wording before launch.
- Headless CMS, search, favourites, newsletter, analytics = Phase 2.
