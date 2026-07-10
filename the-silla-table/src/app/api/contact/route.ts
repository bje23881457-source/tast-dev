import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { contactSchema } from '@/lib/contact-schema';
import { siteConfig } from '@/lib/site';

export const runtime = 'nodejs';

/**
 * Inquiry endpoint (spec §5.6).
 * Local MVP: validates with Zod, blocks honeypot bots, logs to the console and saves each
 * inquiry to ./.inquiries/*.json so you can inspect submissions without any email service.
 * Deployment: set RESEND_API_KEY to send to CONTACT_TO_EMAIL from the marked hook below.
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

  // Persist locally for inspection.
  try {
    const dir = path.join(process.cwd(), '.inquiries');
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${Date.now()}-${data.email.replace(/[^a-z0-9]/gi, '_')}.json`);
    fs.writeFileSync(file, JSON.stringify(record, null, 2), 'utf8');
  } catch (err) {
    console.error('[contact] failed to persist inquiry locally', err);
  }

  console.log(`[contact] New inquiry for ${siteConfig.email}:`, record);

  // --- Email delivery hook (deployment only) -------------------------------
  // if (process.env.RESEND_API_KEY) {
  //   await sendWithResend(record, siteConfig.email);   // to operator
  //   await sendAutoReply(record.email);                 // acknowledgement to sender
  // }
  // -------------------------------------------------------------------------

  return NextResponse.json({ ok: true });
}
