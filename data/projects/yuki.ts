import { images } from '../images';
import type { ProjectBase } from './types';

export const yuki: ProjectBase = {
    slug: 'yuki',
    title: 'Yuki',
    period: 'December 2025 – Present',
    location: 'Zürich, Switzerland',
    tagline:
      'Privacy-first holistic health aggregator, connecting wearables, labs, cycles & habits into one AI-powered longevity dashboard.',
    roles: ['Entrepreneur in Residence @ Nillion', 'Defined & built end to end'],
    highlights: [
      '15+ health widgets',
      'Encrypted by design, health data never sold or shared',
      'Holistic health AI coach',
    ],
    links: [],
    images: [...images.yuki],
    outcome:
      'As EIR @ Nillion, commercializing blind-compute into a privacy-first health aggregator & AI longevity coach.',
    decisions: [
      'Aligned product with Nillion stack: encrypted-by-design, health data never sold or shared.',
      '15+ widgets unify wearables, labs, cycles & habits into one holistic dashboard.',
      'Focused on real commercial use cases for Nillion privacy-preserving infrastructure.',
    ],
    blocks: [
      {
        type: 'text',
        title: 'Summary',
        body: 'As Entrepreneur in Residence at Nillion, building a privacy-first holistic health aggregator and AI longevity coach — connecting wearables, labs, cycles, and habits into one encrypted dashboard.',
      },
    ],
  };
