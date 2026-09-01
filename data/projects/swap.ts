import { images } from '../images';
import { swapAppImages } from '../localProjectImages';
import type { ProjectBase } from './types';

export const swap: ProjectBase = {
    slug: 'swap',
    title: 'Swap',
    period: 'May 2024 – August 2025',
    location: 'Zürich, Switzerland',
    tagline:
      '"Airbnb for Fashion", multi-agent infra orchestrating rental & resale B2C & P2P fashion marketplace.',
    roles: ['Founder', 'Head of Product & Engineering'],
    highlights: ['2k items, 200 businesses served, iOS app, scaled to 8-person team'],
    links: [
      { label: 'swap-store.xyz', url: 'https://swap-store.xyz' },
      { label: 'Contact for pitch deck', url: 'whatsapp-pitch' },
    ],
    images: [...images.swap],
    outcome: 'Founded & built Swap end to end — live at swap-store.xyz.',
    blocks: [
      {
        type: 'image-row',
        assets: swapAppImages,
        caption: 'App Store marketing screens — AI styling, store onboarding, community & sustainability.',
      },
      {
        type: 'text',
        title: 'Platform',
        body: 'Built the full marketplace end to end: consumer app, store dashboards, multi-agent listing infra, community & sustainability tracking. Visit swap-store.xyz.',
      },
      {
        type: 'text',
        subtitle: 'Growth',
        title: 'Bootstrapped to a team of eight',
        body: 'Scaled through outbound sales and social media — mostly salespeople and content, not engineering headcount. 2k items listed, 200 businesses served.',
      },
      {
        type: 'text',
        subtitle: 'Why I stopped',
        title: 'Mission fit',
        body: 'The mission stopped fulfilling me. I wanted problems that help people more deeply — privacy technology and AI’s impact on society. That led directly to Nillion and what I build now.',
      },
    ],
  };
