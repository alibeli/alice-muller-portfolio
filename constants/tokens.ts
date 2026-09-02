import { Platform, TextStyle } from 'react-native';

export type ColorPalette = {
  /** Soft white — never pure #FFFFFF in UI surfaces. */
  white: string;
  background: string;
  foreground: string;
  /** Primary interactive / emphasis color. */
  primary: string;
  primaryForeground: string;
  muted: string;
  mutedStrong: string;
  subtle: string;
  border: string;
  surface: string;
  /** Secondary card / tile fill. */
  card: string;
  accent: string;
  overlay: {
    light: string;
    dark: string;
    /** Modal / slide-over scrim. */
    backdrop: string;
  };
  glass: {
    border: string;
    light: string;
    medium: string;
    clear: string;
    chip: string;
    frost: string;
  };
  shadow: {
    tile: string;
    tileHover: string;
    dock: string;
  };
  tileBorder: string;
  tabPill: string;
  selection: {
    background: string;
    foreground: string;
  };
};

/** Light mode — warm off-white background, soft charcoal text (Cursor-inspired). */
export const lightPalette: ColorPalette = {
  white: '#FEFEFE',
  background: '#F7F7F5',
  foreground: '#1F1F1F',
  primary: '#1F1F1F',
  primaryForeground: '#F7F7F5',
  muted: '#6B6B6B',
  mutedStrong: '#404040',
  subtle: '#949494',
  border: '#DDDDD8',
  surface: '#EFEFED',
  card: 'rgba(255, 255, 255, 0.62)',
  accent: '#1F1F1F',
  overlay: {
    light: 'rgba(0, 0, 0, 0.06)',
    dark: 'rgba(0, 0, 0, 0.12)',
    backdrop: 'rgba(247, 247, 245, 0.55)',
  },
  glass: {
    border: 'rgba(255, 255, 255, 0.5)',
    light: 'rgba(255, 255, 255, 0.52)',
    medium: 'rgba(255, 255, 255, 0.68)',
    clear: 'rgba(255, 255, 255, 0.14)',
    chip: 'rgba(255, 255, 255, 0.42)',
    frost: 'rgba(255, 255, 255, 0.68)',
  },
  shadow: {
    tile: '0 4px 24px rgba(0,0,0,0.06)',
    tileHover: '0 12px 40px rgba(0,0,0,0.12)',
    dock: '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
  },
  tileBorder: 'rgba(0, 0, 0, 0.08)',
  tabPill: 'rgba(0, 0, 0, 0.06)',
  selection: {
    background: '#1F1F1F',
    foreground: '#F7F7F5',
  },
};

/** Dark mode — charcoal background, soft gray text (Cursor-inspired). */
export const darkPalette: ColorPalette = {
  white: '#E8E8E8',
  background: '#1E1E1E',
  foreground: '#D4D4D4',
  primary: '#D4D4D4',
  primaryForeground: '#1E1E1E',
  muted: '#A0A0A0',
  mutedStrong: '#C8C8C8',
  subtle: '#707070',
  border: '#3C3C3C',
  surface: '#252526',
  card: 'rgba(255, 255, 255, 0.06)',
  accent: '#E8E8E8',
  overlay: {
    light: 'rgba(255, 255, 255, 0.05)',
    dark: 'rgba(255, 255, 255, 0.10)',
    backdrop: 'rgba(30, 30, 30, 0.62)',
  },
  glass: {
    border: 'rgba(255, 255, 255, 0.10)',
    light: 'rgba(37, 37, 38, 0.78)',
    medium: 'rgba(30, 30, 30, 0.86)',
    clear: 'rgba(255, 255, 255, 0.05)',
    chip: 'rgba(255, 255, 255, 0.08)',
    frost: 'rgba(30, 30, 30, 0.82)',
  },
  shadow: {
    tile: '0 4px 24px rgba(0,0,0,0.32)',
    tileHover: '0 12px 40px rgba(0,0,0,0.48)',
    dock: '0 8px 32px rgba(0,0,0,0.36), 0 2px 8px rgba(0,0,0,0.24)',
  },
  tileBorder: 'rgba(255, 255, 255, 0.08)',
  tabPill: 'rgba(255, 255, 255, 0.08)',
  selection: {
    background: '#D4D4D4',
    foreground: '#1E1E1E',
  },
};

export const palettes = {
  light: lightPalette,
  dark: darkPalette,
} as const;

export type ColorScheme = keyof typeof palettes;

/** Inline CSS theme values for `app/+html.tsx` — keep in sync with palettes. */
export const htmlThemeCss = {
  light: {
    background: lightPalette.background,
    foreground: lightPalette.foreground,
    selectionBackground: lightPalette.selection.background,
    selectionForeground: lightPalette.selection.foreground,
  },
  dark: {
    background: darkPalette.background,
    foreground: darkPalette.foreground,
    selectionBackground: darkPalette.selection.background,
    selectionForeground: darkPalette.selection.foreground,
  },
} as const;

/** @deprecated Prefer `useTheme().palette` for theme-aware colors. */
export const palette = lightPalette;

/** Font families — RN Web needs quoted stacks for multi-word names. */
export const fonts = {
  sans: 'Google Sans Flex',
  sansStack: 'Google Sans Flex, system-ui, sans-serif',
  mono: 'SpaceMono',
} as const;

export const fontSans = Platform.select({
  web: fonts.sansStack,
  default: fonts.sans,
}) as string;

/** Type scale. */
export const typeScale = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 14,
  lg: 18,
  xl: 20,
  titleMd: 22,
  xxl: 24,
  hero: 40,
  /** Compact UI labels (tabs, chips). */
  compact: 12,
  /** Micro labels (social chips, count badges). */
  micro: 10,
} as const;

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.7,
} as const;

/** Grid tile caption typography — dark text on frosted band, all tile kinds. */
export function getTileText(p: ColorPalette): Record<
  'period' | 'title' | 'tagline' | 'traction' | 'link',
  TextStyle
> {
  return {
    period: {
      fontFamily: fontSans,
      fontSize: typeScale.sm,
      fontWeight: '500',
      letterSpacing: 0.2,
      lineHeight: 17,
      color: p.muted,
    },
    title: {
      fontFamily: fontSans,
      fontSize: typeScale.xl,
      fontWeight: '600',
      lineHeight: 24,
      color: p.foreground,
    },
    tagline: {
      fontFamily: fontSans,
      fontSize: typeScale.md,
      fontWeight: '400',
      lineHeight: 18,
      color: p.mutedStrong,
    },
    traction: {
      fontFamily: fontSans,
      fontSize: typeScale.sm,
      fontWeight: '500',
      lineHeight: 17,
      marginTop: 2,
      color: p.subtle,
    },
    link: {
      fontSize: typeScale.xs,
      fontWeight: '500',
      lineHeight: 14,
      marginTop: 0,
      letterSpacing: 0.4,
      textTransform: 'none',
      color: p.foreground,
    },
  };
}

/** @deprecated Prefer `getTileText(useTheme().palette)` for theme-aware tile text. */
export const tileText = getTileText(lightPalette);

/** Base grid unit — all spacing and gutters are multiples of 8px. */
export const GRID_UNIT = 8;

/** Raw 8px-grid steps. Prefer `spacing` / `gutter` semantic aliases in components. */
export const space = {
  half: GRID_UNIT / 2,
  unit: GRID_UNIT,
  double: GRID_UNIT * 2,
  triple: GRID_UNIT * 3,
  quad: GRID_UNIT * 4,
  sextuple: GRID_UNIT * 6,
  octuple: GRID_UNIT * 8,
} as const;

/** Internal padding and vertical rhythm. */
export const spacing = {
  xs: space.half,
  sm: space.unit,
  md: space.double,
  lg: space.triple,
  xl: space.quad,
  xxl: space.sextuple,
  xxxl: space.octuple,
} as const;

/** Layout gutters — column gaps and page insets. */
export const gutter = {
  columnMobile: space.unit,
  columnDesktop: space.double,
  insetMobile: space.unit,
  insetDesktop: space.triple,
  content: space.triple,
} as const;

export const radii = {
  /** Inline and carousel media in project detail views. */
  media: 12,
  /** Inner frosted caption band on grid tiles. */
  tile: 22,
  /** Outer grid project card — slightly larger than `tile`. */
  tileOuter: 28,
  dock: 28,
  dockMobile: 24,
  pill: 999,
  headshot: 24,
} as const;

export const layout = {
  maxWidth: 720,
  contentPadding: gutter.content,
} as const;

/** Shared backdrop blur — ProfileDock, tile captions, and other glass surfaces. */
export const glassEffect = {
  blurPx: 20,
  saturate: 180,
} as const;

/** Motion presets for hover / carousel interactions. */
export const motion = {
  tileHover: {
    scale: 1.012,
    imageScale: 1.06,
    durationMs: 520,
  },
  carousel: {
    intervalMs: 1400,
  },
  spring: {
    damping: 22,
    stiffness: 280,
  },
} as const;

export const THEME_STORAGE_KEY = 'alice-portfolio-color-scheme';
