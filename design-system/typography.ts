import { Platform, TextStyle } from 'react-native';

import { lightPalette, type ColorPalette } from '@/design-system/colors';

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

/** Material Design 3 type scale (sp). */
export const typeScale = {
  displayLarge: 57,
  displayMedium: 45,
  displaySmall: 36,
  headlineLarge: 32,
  headlineMedium: 28,
  headlineSmall: 24,
  titleLarge: 22,
  titleMedium: 16,
  titleSmall: 14,
  bodyLarge: 16,
  bodyMedium: 14,
  bodySmall: 12,
  labelLarge: 14,
  labelMedium: 12,
  labelSmall: 11,
} as const;

export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
};

/** Material Design 3 default line heights (absolute px). */
export const lineHeights = {
  displayLarge: 64,
  displayMedium: 52,
  displaySmall: 44,
  headlineLarge: 40,
  headlineMedium: 36,
  headlineSmall: 32,
  titleLarge: 28,
  titleMedium: 24,
  titleSmall: 20,
  bodyLarge: 24,
  bodyMedium: 20,
  bodySmall: 16,
  labelLarge: 20,
  labelMedium: 16,
  labelSmall: 16,
} as const;

export type TextVariant =
  | 'display'
  | 'headline'
  | 'title'
  | 'titleMedium'
  | 'titleSmall'
  | 'body'
  | 'bodyMedium'
  | 'caption'
  | 'label'
  | 'overline'
  /** @deprecated Use `overline`. */
  | 'mono'
  /** Legacy aliases */
  | 'hero'
  | 'titleMd'
  | 'subtitle';

export function createTextVariants(p: ColorPalette): Record<TextVariant, TextStyle> {
  return {
    display: {
      fontFamily: fontSans,
      fontSize: typeScale.displaySmall,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.displaySmall,
      letterSpacing: -0.5,
      color: p.foreground,
    },
    headline: {
      fontFamily: fontSans,
      fontSize: typeScale.headlineSmall,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.headlineSmall,
      letterSpacing: -0.25,
      color: p.foreground,
    },
    title: {
      fontFamily: fontSans,
      fontSize: typeScale.headlineSmall,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.headlineSmall,
      letterSpacing: -0.25,
      color: p.foreground,
    },
    titleMedium: {
      fontFamily: fontSans,
      fontSize: typeScale.titleMedium,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.titleMedium,
      color: p.foreground,
    },
    titleSmall: {
      fontFamily: fontSans,
      fontSize: typeScale.titleSmall,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.titleSmall,
      color: p.foreground,
    },
    body: {
      fontFamily: fontSans,
      fontSize: typeScale.bodyLarge,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.bodyLarge,
      color: p.foreground,
    },
    bodyMedium: {
      fontFamily: fontSans,
      fontSize: typeScale.bodyMedium,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.bodyMedium,
      color: p.foreground,
    },
    caption: {
      fontFamily: fontSans,
      fontSize: typeScale.bodySmall,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.bodySmall,
      color: p.muted,
    },
    label: {
      fontFamily: fontSans,
      fontSize: typeScale.labelMedium,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.labelMedium,
      color: p.foreground,
    },
    overline: {
      fontFamily: fontSans,
      fontSize: typeScale.labelSmall,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.labelSmall,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      color: p.muted,
    },
    mono: {
      fontFamily: fonts.mono,
      fontSize: typeScale.labelSmall,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.labelSmall,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      color: p.muted,
    },
    // Legacy aliases
    hero: {
      fontFamily: fontSans,
      fontSize: typeScale.displaySmall,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.displaySmall,
      letterSpacing: -0.5,
      color: p.foreground,
    },
    titleMd: {
      fontFamily: fontSans,
      fontSize: typeScale.titleLarge,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.titleLarge,
      letterSpacing: -0.15,
      color: p.foreground,
    },
    subtitle: {
      fontFamily: fontSans,
      fontSize: typeScale.titleMedium,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.titleMedium,
      color: p.foreground,
    },
  };
}

/** Grid tile caption typography — frosted band on project tiles. */
export function getTileText(p: ColorPalette): Record<
  'period' | 'title' | 'tagline' | 'traction' | 'link',
  TextStyle
> {
  return {
    period: {
      fontFamily: fontSans,
      fontSize: typeScale.bodyMedium,
      fontWeight: fontWeights.medium,
      letterSpacing: 0.2,
      lineHeight: lineHeights.bodyMedium,
      color: p.muted,
    },
    title: {
      fontFamily: fontSans,
      fontSize: typeScale.titleLarge,
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.titleLarge,
      color: p.foreground,
    },
    tagline: {
      fontFamily: fontSans,
      fontSize: typeScale.bodyMedium,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.bodyMedium,
      color: p.mutedStrong,
    },
    traction: {
      fontFamily: fontSans,
      fontSize: typeScale.bodyMedium,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.bodyMedium,
      marginTop: 2,
      color: p.subtle,
    },
    link: {
      fontSize: typeScale.labelSmall,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.labelSmall,
      marginTop: 0,
      letterSpacing: 0.4,
      textTransform: 'none',
      color: p.foreground,
    },
  };
}

/** @deprecated Prefer `getTileText(useTheme().palette)`. */
export const tileText = getTileText(lightPalette);

export const typography = {
  sans: fonts.sans,
  sansStack: fonts.sansStack,
  mono: fonts.mono,
  sizes: typeScale,
  weights: fontWeights,
  lineHeights,
} as const;
