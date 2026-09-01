import { images } from '../images';
import type { ProjectBase } from './types';

export const planet: ProjectBase = {
    slug: 'planet',
    title: 'Planet',
    period: 'Aug 2020 – Jun 2021',
    location: 'Remote',
    tagline: 'B2B2C mobile game where real world sustainable actions drive in-game progress.',
    roles: ['Co Founder'],
    highlights: ['Launched iOS & Android App in 3 weeks'],
    links: [],
    images: [...images.planet],
    blocks: [
      {
        type: 'text',
        title: 'Summary',
        body: 'Planet is a B2B2C social marketplace game where your real life sustainable actions are verified as currency within the game to allow you to unlock worlds, awards and rewards while teaching you sustainable behaviour skills to help you cut your carbon footprint while having fun. App launched in iOS & Android App Store in 3 weeks, 500 users in first month. We built the game using Bubble.io.',
      },
      { type: 'image', uri: images.planet[0] },
    ],
  };
