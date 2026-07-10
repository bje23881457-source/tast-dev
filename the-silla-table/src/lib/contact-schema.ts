import { z } from 'zod';

export const INQUIRY_TYPES = ['experience', 'catering', 'group', 'other'] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

// Authoritative validation for the inquiry payload (used server-side; mirrored on the client).
export const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  inquiryType: z.enum(INQUIRY_TYPES).optional().or(z.literal('')),
  groupSize: z.string().trim().max(60).optional().or(z.literal('')),
  preferredDate: z.string().trim().max(40).optional().or(z.literal('')),
  message: z.string().trim().min(10).max(4000),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Consent is required.' }),
  }),
  // Honeypot: bots fill this; humans never see it. Accepted by the schema, then handled
  // in the route (silently drop) so bots don't learn they were blocked.
  company: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
