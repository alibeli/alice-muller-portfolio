import { nimueHeroImage } from '../localProjectImages';
import type { ProjectBase } from './types';

export const nimue: ProjectBase = {
  slug: 'nimue',
  title: 'Nimue',
  period: 'April 2026 – Present',
  location: 'Zürich, Switzerland',
  tagline:
    'Private, auditable and interactive multi-agent orchestration for individuals & teams, with platform & SDK.',
  roles: ['Defined & built end to end'],
  highlights: [
    'TEEs, MPC, Decentralized Compute',
    'RAG, Agent Identity, Auditability, Immutable Chain Hashing',
    '500+ tools',
    '10+ modular SDK components',
  ],
  links: [{ label: 'Expo App', url: 'https://nimue.expo.app' }],
  images: [],
  outcome:
    'Built a privacy-first multi-agent orchestration platform & SDK on Nillion blind-compute research.',
  decisions: [
    'TEEs + MPC: agent runs stay private yet provably auditable via immutable chain hashes.',
    'Modular SDK (10+ components) so teams embed agents without rebuilding orchestration.',
    'RAG, agent identity & 500+ tools for traceable, interactive workflows.',
  ],
  blocks: [
    {
      type: 'text',
      title: 'Summary',
      body: 'Built a privacy-first multi-agent orchestration platform and SDK on Nillion blind-compute research — private, auditable, interactive agent workflows for individuals and teams.',
    },
    {
      type: 'image',
      asset: nimueHeroImage,
      caption: 'Nimue — multi-agent orchestration platform.',
    },
  ],
};
