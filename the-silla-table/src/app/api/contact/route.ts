import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact-schema';
import { siteConfig } from '@/lib/site';

// Edge runtime so this deploys to Cloudflare Pages / edge hosts (no Node.js filesystem).
export const runtime = 'edge';

/**
 * Inquiry endpoint (spec §5.6).
 * Validates with Zod, blocks honeypot bots, and logs the inquiry. There is no email service
 * wired for the MVP, so submissions are acknowledged and written to the server log.
 * Deployment: set RESEND_API_KEY and send from the marked hook below (Resend's HTTP API works
 * on the edge via fetch).
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'validation', issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot triggered — a bot filled the hidden field. Accept silently, store nothing.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const record = {
    name: data.name,
    email: data.email,
    inquiryType: data.inquiryType || null,
    groupSize: data.groupSize || null,
    preferredDate: data.preferredDate || null,
    message: data.message,
    receivedAt: new Date().toISOString(),
  };

  console.log(`[contact] New inquiry for ${siteConfig.email}:`, record);

  // --- Email delivery hook (deployment only, edge-compatible) ---------------
  // if (process.env.RESEND_API_KEY) {
  //   await fetch('https://api.resend.com/emails', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       from: `The Silla Table <hello@thesillatable.com>`,
  //       to: siteConfig.email,
  //       reply_to: record.email,
  //       subject: `New inquiry from ${record.name}`,
  //       text: JSON.stringify(record, null, 2),
  //     }),
  //   });
  // }
  // -------------------------------------------------------------------------

  return NextResponse.json({ ok: true });
}
