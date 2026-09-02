import { Platform, TextStyle } from 'react-native';

export type ColorPalette = {
  white: string;
  background: string;
  foreground: string;
  muted: string;
  mutedStrong: string;
  subtle: string;
  border: string;
  surface: string;
  accent: string;
  overlay: {
    light: string;
    dark: string;
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

/** Light mode palette. */
export const lightPalette: ColorPalette = {
  white: '#FFFFFF',
  background: '#FFFFFF',
  foreground: '#0A0A0A',
  muted: '#737373',
  mutedStrong: '#3D3D3D',
  subtle: '#A3A3A3',
  border: '#E5E5E5',
  surface: '#FAFAFA',
  accent: '#171717',
  overlay: {
    light: 'rgba(0, 0, 0, 0.08)',
    dark: 'rgba(0, 0, 0, 0.14)',
  },
  glass: {
    border: 'rgba(255, 255, 255, 0.4)',
    light: 'rgba(255, 255, 255, 0.45)',
    medium: 'rgba(255, 255, 255, 0.62)',
    clear: 'rgba(255, 255, 255, 0.12)',
    chip: 'rgba(255, 255, 255, 0.35)',
    frost: 'rgba(255, 255, 255, 0.62)',
  },
  shadow: {
    tile: '0 4px 24px rgba(0,0,0,0.06)',
    tileHover: '0 12px 40px rgba(0,0,0,0.12)',
    dock: '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
  },
  tileBorder: 'rgba(0, 0, 0, 0.08)',
  tabPill: 'rgba(0, 0, 0, 0.06)',
  selection: {
    background: '#0A0A0A',
    foreground: '#FFFFFF',
  },
};

/** Dark mode palette. */
export const darkPalette: ColorPalette = {
  white: '#FFFFFF',
  background: '#0A0A0A',
  foreground: '#FAFAFA',
  muted: '#A3A3A3',
  mutedStrong: '#D4D4D4',
  subtle: '#737373',
  border: '#262626',
  surface: '#171717',
  accent: '#E5E5E5',
  overlay: {
    light: 'rgba(255, 255, 255, 0.06)',
    dark: 'rgba(255, 255, 255, 0.12)',
  },
  glass: {
    border: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(30, 30, 30, 0.72)',
    medium: 'rgba(24, 24, 24, 0.82)',
    clear: 'rgba(255, 255, 255, 0.04)',
    chip: 'rgba(255, 255, 255, 0.08)',
    frost: 'rgba(24, 24, 24, 0.78)',
  },
  shadow: {
    tile: '0 4px 24px rgba(0,0,0,0.32)',
    tileHover: '0 12px 40px rgba(0,0,0,0.48)',
    dock: '0 8px 32px rgba(0,0,0,0.36), 0 2px 8px rgba(0,0,0,0.24)',
  },
  tileBorder: 'rgba(255, 255, 255, 0.08)',
  tabPill: 'rgba(255, 255, 255, 0.08)',
  selection: {
    background: '#FAFAFA',
    foreground: '#0A0A0A',
  },
};

export const palettes = {
  light: lightPalette,
  dark: darkPalette,
} as const;

export type ColorScheme = keyof typeof palettes;

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

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const radii = {
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
  contentPadding: 24,
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
