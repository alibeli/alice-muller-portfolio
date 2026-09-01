import type { ProjectSummary } from '../projectImpact';
import type { ImageSourcePropType } from 'react-native';

export type ProjectBlock =
  | { type: 'text'; subtitle?: string; title?: string; body: string }
  | {
      type: 'image';
      uri?: string;
      asset?: ImageSourcePropType;
      caption?: string;
    }
  | {
      type: 'image-row';
      assets: ImageSourcePropType[];
      caption?: string;
    };

export type ProjectBase = {
  slug: string;
  title: string;
  period: string;
  location: string;
  tagline: string;
  roles: string[];
  highlights: string[];
  links: { label: string; url: string }[];
  images: string[];
  outcome?: string;
  decisions?: string[];
  badge?: 'currently-building';
  blocks?: ProjectBlock[];
};

export type Project = ProjectBase & {
  traction: string;
  summary: ProjectSummary;
};
