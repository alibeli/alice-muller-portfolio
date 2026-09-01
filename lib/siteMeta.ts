import { profile } from '@/data/portfolio';

export const SITE_URL = 'https://alice-muller.com';

export const siteMeta = {
  title: profile.name,
  pageTitle: `${profile.name}, Portfolio`,
  description: `${profile.tagline}. ${profile.taglineAreas}.`,
  url: SITE_URL,
  imageUrl: `${SITE_URL}/assets/images/headshot.png`,
} as const;
