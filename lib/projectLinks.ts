import { Linking } from 'react-native';

import { profile } from '@/data/portfolio';
import { openWhatsAppChat } from '@/lib/whatsapp';

export const WHATSAPP_PITCH_URL = 'whatsapp-pitch';

export function isWhatsAppPitchLink(url: string): boolean {
  return url === WHATSAPP_PITCH_URL;
}

export function openWhatsAppPitchDeck(projectTitle: string): Promise<void> {
  const message = `Hi Alice, I'm interested in ${projectTitle} and would like to request the pitch deck.`;
  return openWhatsAppChat(profile.whatsappPhone, message);
}

export function openProjectLink(url: string, projectTitle: string): Promise<void> {
  if (isWhatsAppPitchLink(url)) {
    return openWhatsAppPitchDeck(projectTitle);
  }
  return Linking.openURL(url);
}

/** Strip labels like "Project," and normalize date ranges for display. */
export function formatProjectPeriod(period: string): string {
  return period
    .replace(/^Project,\s*/i, '')
    .replace(/\s+to\s+/gi, ' – ')
    .replace(/\s+–\s+Present/i, ' – Present')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** @deprecated Use formatProjectPeriod */
export function formatTilePeriod(period: string): string {
  return formatProjectPeriod(period);
}
