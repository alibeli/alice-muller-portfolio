import { images } from './images';
import { getLocalThumbnail } from './localImages';
import { baseProjects } from './projects';
import { getProjectImpact } from './projectImpact';
import { getPrimaryProjectLink } from '@/lib/projectLinks';
import type { ProjectSummary } from './projectImpact';
import type { ImageSourcePropType } from 'react-native';

export type { ProjectBlock, ProjectBase } from './projects/types';
export type { ProjectSummary } from './projectImpact';

export type Project = import('./projects/types').ProjectBase & {
  traction: string;
  summary: ProjectSummary;
};

export type OtherProject = {
  slug: string;
  title: string;
  description: string;
  period: string;
};

export type Paper = {
  slug: string;
  title: string;
  year: string;
  institution: string;
  images: string[];
  tagline?: string;
};

export type GridItem = {
  kind: 'project' | 'paper';
  slug: string;
  title: string;
  period: string;
  tagline: string;
  traction?: string;
  images: string[];
  thumbnailLocal?: ImageSourcePropType;
  badge?: 'currently-building';
  link?: { label: string; url: string };
};

export const profile = {
  name: 'Alice Müller',
  tagline: 'Builder, Product Team Leader, Ops & Growth, Founder',
  taglineAreas: 'AI, SaaS, Marketplace, Web3, Privacy Tech',
  credentials: 'MSc Imperial, MA RCA, BFA/BA Parsons',
  bio: "I love working on cross disciplinary, collaborative and disruptive projects to foster innovation on the product, system and business level to improve the world for the better.",
  linkedin: 'https://linkedin.com/in/alicesuekomueller/',
  github: 'https://github.com/alibeli',
  whatsappPhone: '41799154475',
  headshot: images.headshot,
  headshotLocal: require('@/assets/images/headshot.png'),
};

export const profileDetails = [
  {
    title: "👒 Hats I've worn",
    lines: [
      'Founder, Co Founder, CEO, Chief of Staff, Head of Growth & Ops, VP of Product, Product Manager, Product Designer, UX/UI Designer',
    ],
  },
  {
    title: "🗺️ Areas I've led teams & built in",
    lines: ['AI, SaaS, Marketplace, Web3, Privacy Preserving Technologies'],
  },
  {
    title: '🎓 Education',
    lines: [
      'MSc Engineering @Imperial College London',
      'MA Design @Royal College of Art London',
      'BFA Fashion @Parsons New York',
      'BA Political Science @Eugene Lang New York',
    ],
  },
  {
    title: '🌍 Languages & places',
    lines: [
      "I speak 🇺🇸🇨🇭🇩🇪🇫🇷🇮🇹🇨🇳 I've lived in 🇨🇭🇺🇸🇫🇷🇬🇧",
    ],
  },
];


export const projects: Project[] = baseProjects.map((project) => {
  const impact = getProjectImpact(project.slug);
  return { ...project, ...impact };
});

export const papers: Paper[] = [
  {
    slug: 'swarms',
    title: 'Swarms: On Robotic Emergence and Human Robot Interaction',
    year: '2021',
    institution: 'MSc Thesis, Imperial College London',
    images: [images.starling[0]],
  },
  {
    slug: 'shepherd-and-the-sheep',
    title: 'Shepherd and the Sheep: Democratising AGI',
    year: '2019',
    institution: 'BA Political Science Thesis, Eugene Lang New York',
    images: [images.starling[11]],
  },
  {
    slug: 'biomimetic-hive-minds',
    title: 'Biomimetic Hive Minds for AGI: Creating Value & Reputation Systems',
    year: '2018',
    institution: 'BA Political Science Paper, Eugene Lang New York',
    images: [images.starling[6]],
  },
  {
    slug: 'hegemonic-stability',
    title: 'Hegemonic Stability Theory',
    year: '2017',
    institution: 'BA Political Science Paper, Eugene Lang New York',
    images: [images.oceanCloud[0]],
  },
];

export const otherProjects: OtherProject[] = [
  {
    slug: 'elephant',
    title: 'Elephant',
    description: 'A family standing table made of TV cardboard packaging for Samsung competition.',
    period: '2020',
  },
  {
    slug: 'coolbee',
    title: 'Coolbee',
    description: 'A sustainable, low cost air conditioner using solar energy.',
    period: '2020',
  },
  {
    slug: 'skillfleet',
    title: 'Skillfleet',
    description: 'A learning and upskilling platform for Ebbsfleet Development Cooperation.',
    period: '2020',
  },
  {
    slug: 'soma-triplets',
    title: 'Soma Triplets',
    description: 'Anthropomorphic robots communicating the weather.',
    period: '2019',
  },
  {
    slug: 'whale',
    title: 'Whale',
    description: 'A portable steamer with customised meals controllable via an app.',
    period: '2019',
  },
  {
    slug: 'lalique',
    title: 'Lalique',
    description: 'Consulted Lalique. Recipient of LEF scholarship.',
    period: '2017',
  },
  {
    slug: 'triforce',
    title: 'Triforce',
    description:
      'Worked with a paraplegic client for 6 months to create catheter accessible jeans.',
    period: '2017',
  },
  {
    slug: 'bulgari-luxottica',
    title: 'BVLGARI × Luxottica',
    description:
      '6 students selected. Designed eyewear produced by Luxottica for BVLGARI.',
    period: '2016',
  },
];

export const awards = [
  {
    year: '2024',
    title: 'Imperial College Design Engineering Hackathon',
    detail: '3rd Prize for real time saliva monitoring tooth implant',
  },
  {
    year: '2021',
    title: 'Innovation RCA Startup Program',
    detail: 'Participant, Tact Monster',
  },
  {
    year: '2021',
    title: 'No Waste Challenge by IKEA',
    detail: 'Nominated, 85 out of 1409',
  },
  {
    year: '2021',
    title: 'Moon Base Design Context',
    detail: 'Winner for Domi Inter Astra',
  },
  {
    year: '2021',
    title: 'WESLDE Trust Award',
    detail:
      'Recipient. Given to 12 students/year at Royal College of Art for outstanding MA thesis.',
  },
  {
    year: '2020',
    title: 'CERN SciComm Hackathon',
    detail: 'Audience Award',
  },
  {
    year: '2020',
    title: 'UX Design Award',
    detail: 'Nominated',
  },
  {
    year: '2020',
    title: 'Fast Company World Changing Ideas',
    detail: 'Finalist',
  },
  {
    year: '2020',
    title: 'CERN × Logitech × Royal College of Art',
    detail: '3rd Prize',
  },
  {
    year: '2018',
    title: 'Civic Liberal Arts Fellowship',
    detail: 'Eugene Lang College Recipient',
  },
  {
    year: '2017',
    title: 'Hugo Boss Stipend',
    detail:
      'Recipient. Given to 4 students/year at Parsons New York for outstanding BFA thesis.',
  },
  {
    year: '2017',
    title: 'Luxury Education Foundation Scholarship',
    detail:
      'Recipient. Given to 2 Parsons students & 2 Columbia Business School students.',
  },
  {
    year: '2017',
    title: 'Shoe Polytechnic Padua × Parsons',
    detail:
      'Scholarship Winner. Given to 10 Parsons students/year for outstanding BFA work.',
  },
  {
    year: '2017',
    title: 'Design for Disability, Cerebral Palsy Foundation',
    detail: 'Special Honors',
  },
  {
    year: '2017',
    title: 'Bulgari × Luxottica Parsons',
    detail:
      '6 students selected. Designed eyewear produced by Luxottica for BVLGARI.',
  },
  {
    year: '2015',
    title: "Dean's Scholarship Parsons New York",
    detail: 'Bi annual scholarship for outstanding GPA.',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getPaper(slug: string): Paper | undefined {
  return papers.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

export function getAllPaperSlugs(): string[] {
  return papers.map((paper) => paper.slug);
}

export function getGridItems(): GridItem[] {
  const projectItems: GridItem[] = projects.map((p) => ({
    kind: 'project',
    slug: p.slug,
    title: p.title,
    period: p.period,
    tagline: p.tagline,
    traction: p.traction || undefined,
    images: p.images,
    thumbnailLocal: getLocalThumbnail(p.slug),
    badge: p.badge,
    link: getPrimaryProjectLink(p.links),
  }));

  return projectItems;
}

export const selectedProjectCount = projects.length + otherProjects.length;
export const paperCount = papers.length;
export const awardCount = awards.length;
