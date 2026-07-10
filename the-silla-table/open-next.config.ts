import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// OpenNext Cloudflare adapter config. Defaults are fine for this app (SSG + one edge API route).
// Incremental cache / R2 etc. can be added here later if needed.
export default defineCloudflareConfig({});
