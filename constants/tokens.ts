import { Platform, TextStyle } from 'react-native';

/** Core palette — single source of truth for color. */
export const palette = {
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
    /** White wash over tile blur band */
    frost: 'rgba(255, 255, 255, 0.62)',
  },
  shadow: {
    tile: '0 4px 24px rgba(0,0,0,0.06)',
    tileHover: '0 12px 40px rgba(0,0,0,0.12)',
    dock: '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
  },
  tileBorder: 'rgba(0, 0, 0, 0.08)',
  tabPill: 'rgba(0, 0, 0, 0.06)',
} as const;

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
  xxl: 24,
  hero: 40,
} as const;

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.7,
} as const;

/** Grid tile caption typography — dark text on frosted band, all tile kinds. */
export const tileText: Record<'period' | 'title' | 'tagline' | 'traction' | 'link', TextStyle> = {
  period: {
    fontFamily: fontSans,
    fontSize: typeScale.sm,
    fontWeight: '500',
    letterSpacing: 0.2,
    lineHeight: 17,
    color: palette.muted,
  },
  title: {
    fontFamily: fontSans,
    fontSize: typeScale.xl,
    fontWeight: '600',
    lineHeight: 24,
    color: palette.foreground,
  },
  tagline: {
    fontFamily: fontSans,
    fontSize: typeScale.md,
    fontWeight: '400',
    lineHeight: 18,
    color: palette.mutedStrong,
  },
  traction: {
    fontFamily: fontSans,
    fontSize: typeScale.sm,
    fontWeight: '500',
    lineHeight: 17,
    marginTop: 2,
    color: palette.subtle,
  },
  link: {
    fontFamily: fontSans,
    fontSize: typeScale.sm,
    fontWeight: '500',
    lineHeight: 17,
    marginTop: 2,
    color: palette.muted,
  },
};

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
