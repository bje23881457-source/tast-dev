import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static HTML export — deploys to Cloudflare Pages as plain static assets
  // (no server/edge functions). The contact endpoint is a Cloudflare Pages Function
  // (functions/api/contact.ts) and the "/" redirect is handled by public/_redirects.
  output: 'export',
  reactStrictMode: true,
  images: {
    // Required for `output: 'export'` (no on-demand image optimization). We only use inline SVG.
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
