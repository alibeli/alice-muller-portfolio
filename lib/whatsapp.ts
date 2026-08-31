import { Linking } from 'react-native';

/** Build a WhatsApp deep link with optional pre-filled message. Phone: E.164 digits only (no +). */
export function getWhatsAppUrl(phoneDigits: string, message = ''): string {
  const digits = phoneDigits.replace(/\D/g, '');
  const trimmed = message.trim();
  if (!trimmed) return `https://wa.me/${digits}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(trimmed)}`;
}

export async function openWhatsAppChat(phoneDigits: string, message = ''): Promise<void> {
  const digits = phoneDigits.replace(/\D/g, '');
  if (!digits) return;

  const url = getWhatsAppUrl(digits, message);
  await Linking.openURL(url);
}
