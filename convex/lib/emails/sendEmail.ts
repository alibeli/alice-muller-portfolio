/**
 * Transactional email via Resend (https://resend.com).
 *
 * Convex env (same keys as friendapp):
 *   RESEND_API_KEY       — re_...
 *   RESEND_FROM          — e.g. "Ailo <hello@ailo.life>"
 *   RESEND_FROM_OUTREACH — optional outreach from address
 *   AILO_SUPPORT_ADMINS  — +41799154475=alice@ailo.life (portfolio view alerts)
 */

import { Resend } from "resend";

const DEFAULT_FROM = "Ailo <hello@ailo.life>";

export type SendEmailArgs = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
};

export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn("Resend: RESEND_API_KEY not set — skipping email send");
    return null;
  }
  return new Resend(apiKey);
}

export async function sendTransactionalEmail(
  args: SendEmailArgs,
): Promise<{ id: string } | null> {
  const resend = getResendClient();
  if (!resend) return null;

  const from =
    args.from?.trim() || process.env.RESEND_FROM?.trim() || DEFAULT_FROM;

  const { data, error } = await resend.emails.send({
    from,
    to: args.to,
    subject: args.subject,
    html: args.html,
    text: args.text,
  });

  if (error) {
    console.error("Resend send failed:", error.message);
    throw new Error(error.message);
  }

  return data?.id ? { id: data.id } : null;
}
