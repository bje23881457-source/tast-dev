// Cloudflare Pages Function — POST /api/contact
// Replaces the Next.js API route (static export can't ship server routes). Runs on the
// Cloudflare edge alongside the static site. Self-contained (no imports from ../src) so it
// bundles cleanly. Kept in sync with src/lib/contact-schema.ts.
import { z } from 'zod';

const INQUIRY_TYPES = ['experience', 'catering', 'group', 'other'] as const;

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  inquiryType: z.enum(INQUIRY_TYPES).optional().or(z.literal('')),
  groupSize: z.string().trim().max(60).optional().or(z.literal('')),
  preferredDate: z.string().trim().max(40).optional().or(z.literal('')),
  message: z.string().trim().min(10).max(4000),
  consent: z.literal(true, { errorMap: () => ({ message: 'Consent is required.' }) }),
  company: z.string().max(200).optional(), // honeypot
});

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
}

export const onRequestPost: (context: {
  request: Request;
  env: Env;
}) => Promise<Response> = async ({ request, env }) => {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: 'validation', issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot triggered — accept silently, store nothing.
  if (data.company) {
    return Response.json({ ok: true });
  }

  const to = env.CONTACT_TO_EMAIL ?? 'hello@thesillatable.com';
  const record = {
    name: data.name,
    email: data.email,
    inquiryType: data.inquiryType || null,
    groupSize: data.groupSize || null,
    preferredDate: data.preferredDate || null,
    message: data.message,
    receivedAt: new Date().toISOString(),
  };

  console.log(`[contact] New inquiry for ${to}:`, record);

  // Email delivery (edge-compatible via fetch). Configure RESEND_API_KEY in the Pages project.
  if (env.RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'The Silla Table <hello@thesillatable.com>',
          to,
          reply_to: record.email,
          subject: `New inquiry from ${record.name}`,
          text: Object.entries(record)
            .map(([k, v]) => `${k}: ${v ?? ''}`)
            .join('\n'),
        }),
      });
    } catch (err) {
      console.error('[contact] email send failed', err);
      // Still acknowledge — the inquiry was received/logged.
    }
  }

  return Response.json({ ok: true });
};
