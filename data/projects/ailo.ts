import { ailoGallery } from '../localProjectImages';
import type { ProjectBase } from './types';

export const ailo: ProjectBase = {
  slug: 'ailo',
  title: 'Ailo',
  period: 'Present',
  location: 'Zürich, Switzerland',
  tagline: 'Bringing people closer together and fostering more community.',
  roles: ['Founder', 'Building'],
  highlights: [],
  links: [],
  images: [],
  badge: 'currently-building',
  outcome:
    'Building a private map to help people find purpose, community, and richer real-world connection.',
  blocks: [
    {
      type: 'text',
      title: 'Summary',
      body: "I'm building Ailo to solve purpose and community — and to make social feel private again. A fully private map keeps people's location private while still helping them meet new people, discover real events, and feel like they're living a more enriching life. The goal is to keep friends close without the noise of feeds, ads, or performative sharing.",
    },
    {
      type: 'image-row',
      assets: ailoGallery,
      caption: 'Ailo — private map onboarding, global view, and real-world events.',
    },
  ],
};
