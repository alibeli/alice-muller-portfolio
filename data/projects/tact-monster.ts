import { images } from '../images';
import type { ProjectBase } from './types';

export const tact_monster: ProjectBase = {
    slug: 'tact-monster',
    title: 'Tact Monster',
    period: 'June 2021 – July 2022',
    location: 'London, UK',
    tagline: 'B2B2C autonomous basketball robot democratizing sports education.',
    roles: ['Co Founder'],
    highlights: ['InnovationRCA Incubator'],
    links: [],
    images: [...images.tactMonster],
    blocks: [
      {
        type: 'text',
        subtitle: 'Problem',
        title: '450M players, inaccessible pro training',
        body: '450 million people play basketball globally, but pro-level training is expensive and inaccessible. We set out to democratize it.',
      },
      {
        type: 'text',
        subtitle: 'My role',
        title: 'Ops, business model & app',
        body: 'Co-founded with an incredible roboticist. I led ops, business model, app development & university outreach — a Peloton-like experience for basketball practice.',
      },
      {
        type: 'text',
        subtitle: 'Outcome',
        title: 'Autonomous robot + university interest',
        body: 'Built a fully autonomous portable robot. Letters of interest from Imperial, Cambridge, Oxford & Edinburgh basketball teams. InnovationRCA incubator.',
      },
      { type: 'image', uri: images.tactMonster[0], caption: 'Tact Monster autonomous training robot' },
    ],
  };
