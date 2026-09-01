import { swapStudioImages } from '../localProjectImages';
import type { ProjectBase } from './types';

export const swap_studio: ProjectBase = {
    slug: 'swap-studio',
    title: 'Swap Studio',
    period: 'May 2024 – August 2025',
    location: 'Zürich, Switzerland',
    tagline: 'AI image studio for fashion businesses — before generative AI was mainstream.',
    roles: ['Founder', 'Part of Swap'],
    highlights: ['Built into Swap', 'Business image generation'],
    links: [{ label: 'swap-store.xyz/studio', url: 'https://swap-store.xyz/studio' }],
    images: [],
    outcome: 'Built a studio inside Swap so businesses generated campaign imagery at scale — pre-mainstream gen-AI.',
    blocks: [
      {
        type: 'text',
        title: 'Swap Studio',
        body: 'Swap Studio let fashion sellers produce on-brand model shots and lookbooks without a photo shoot — integrated into the Swap merchant workflow.',
      },
      {
        type: 'image-row',
        assets: swapStudioImages,
        caption: 'AI-generated campaign imagery for fashion businesses.',
      },
    ],
  };
