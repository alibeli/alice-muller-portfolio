export type PaperGradient = {
  colors: [string, string, string];
  angle?: number;
};

export const paperGradients: Record<string, PaperGradient> = {
  swarms: {
    colors: ['#DDE4F0', '#C8D4E8', '#B3C2DE'],
    angle: 135,
  },
  'shepherd-and-the-sheep': {
    colors: ['#E8DDF5', '#D9C8EE', '#CAB6E6'],
    angle: 145,
  },
  'biomimetic-hive-minds': {
    colors: ['#D5EEF2', '#BFE4EA', '#A8D9E1'],
    angle: 120,
  },
  'hegemonic-stability': {
    colors: ['#F0E4D8', '#E6D4C2', '#DCC4AD'],
    angle: 160,
  },
};

export const PLACEHOLDER_GRADIENT: PaperGradient = {
  colors: ['#ECECEC', '#E0E0E0', '#D4D4D4'],
  angle: 135,
};

export function getPaperGradient(slug: string): PaperGradient {
  return paperGradients[slug] ?? PLACEHOLDER_GRADIENT;
}

export function paperGradientCss(slug: string): string {
  const { colors, angle = 135 } = getPaperGradient(slug);
  return `linear-gradient(${angle}deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`;
}
