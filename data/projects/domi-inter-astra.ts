import { images } from '../images';
import type { ProjectBase } from './types';

export const domi_inter_astra: ProjectBase = {
    slug: 'domi-inter-astra',
    title: 'Domi Inter Astra',
    period: 'Dec 2020 – March 2022',
    location: 'Remote, Global Team',
    tagline: '"Home Among the Stars", A modular short to long term lunar settlement system from 2030 onwards.',
    roles: ['Space Architecture Lead'],
    highlights: ['Winner Moon Base Competition'],
    links: [],
    images: [...images.dia],
    blocks: [
      {
        type: 'text',
        title: 'Summary',
        body: "Leading the architecture team, a group of students and young professionals, to design a near-term lunar settlement capable of sustaining long term crews of up to 30 people. The design achieved 1st place out of 18 teams internationally in the Moon Society's 2020 Moon Base Design Challenge, as well as producing papers for the 2021 International Astronautical Conference.",
      },
      { type: 'image', uri: images.dia[0] },
      {
        type: 'text',
        subtitle: 'Context',
        title: 'DIA 2030',
        body: "The oceans are the Earth's heart & lungs giving life to all its children including humanity. They play a major role in global CO2 and nutrient cycles. Our oceans absorb approximately a third of global human CO2 emissions, which has rendered their PH level increasingly acidic. Ocean acidification is drastically disrupting the marine life cycle rendering oceans increasingly hostile for diverse marine life.",
      },
      { type: 'image', uri: images.dia[1] },
      {
        type: 'text',
        subtitle: 'Context',
        title: 'DIA 2130',
        body: "The oceans are the Earth's heart & lungs giving life to all its children including humanity. They play a major role in global CO2 and nutrient cycles. Our oceans absorb approximately a third of global human CO2 emissions, which has rendered their PH level increasingly acidic. Ocean acidification is drastically disrupting the marine life cycle rendering oceans increasingly hostile for diverse marine life.",
      },
      { type: 'image', uri: images.dia[2] },
    ],
  };
