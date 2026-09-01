import { domiInterAstraGallery } from '../localProjectImages';
import type { ProjectBase } from './types';

export const domi_inter_astra: ProjectBase = {
    slug: 'domi-inter-astra',
    title: 'Domi Inter Astra (UN Space Generation Advisory Council)',
    period: 'Dec 2020 – March 2022',
    location: 'Remote, Global Team',
    tagline: '"Home Among the Stars", A modular short to long term lunar settlement system from 2030 onwards.',
    roles: ['Space Architecture Lead'],
    highlights: ['Winner Moon Base Competition'],
    links: [
      {
        label: 'Moon Society',
        url: 'https://www.moonsociety.org/announcement-of-winners-for-the-moon-societys-first-moon-base-design-contest/',
      },
    ],
    images: [],
    blocks: [
      {
        type: 'image-row',
        assets: domiInterAstraGallery,
        caption: 'Domi Inter Astra — lunar settlement master plan, 2130 warehouse, guest experience, and social habitat.',
      },
      {
        type: 'text',
        title: 'Summary',
        body: "Leading the architecture team, a group of students and young professionals, to design a near-term lunar settlement capable of sustaining long term crews of up to 30 people. The design achieved 1st place out of 18 teams internationally in the Moon Society's 2020 Moon Base Design Challenge, as well as producing papers for the 2021 International Astronautical Conference.",
      },
    ],
  };
