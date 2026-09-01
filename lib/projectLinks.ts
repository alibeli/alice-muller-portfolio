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

export function getPrimaryProjectLink(
  links: { label: string; url: string }[],
): { label: string; url: string } | undefined {
  if (links.length === 0) return undefined;
  return links.find((link) => !isWhatsAppPitchLink(link.url)) ?? links[0];
}

/** @deprecated Use formatProjectPeriod */
export function formatTilePeriod(period: string): string {
  return formatProjectPeriod(period);
}
