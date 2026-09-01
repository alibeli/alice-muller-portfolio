import { TextStyle } from 'react-native';

import { fontSans, fonts, lineHeights, palette, typeScale } from '@/constants/tokens';

/**
 * Semantic typography tokens — use these names across the app.
 *
 * | Token     | Role                                      | Size |
 * |-----------|-------------------------------------------|------|
 * | display   | Hero project titles                       | 40   |
 * | h1        | Page / section titles                     | 24   |
 * | h2        | Profile name, modal titles, card headings | 20   |
 * | h3        | Subtitles, project taglines (large)       | 18   |
 * | body      | Default paragraphs                        | 15   |
 * | bodySmall | Secondary copy, tile taglines             | 14   |
 * | caption   | Meta, credentials, helper text            | 13   |
 * | label     | Uppercase labels, section markers         | 11   |
 * | tabActive | Selected filter tab label                 | 16   |
 * | mono      | Dates, periods, chips                     | 11   |
 */
export const typography = {
  display: {
    fontFamily: fontSans,
    fontSize: typeScale.hero,
    fontWeight: '400',
    color: palette.foreground,
    letterSpacing: -1,
    lineHeight: Math.round(typeScale.hero * lineHeights.tight),
  },
  h1: {
    fontFamily: fontSans,
    fontSize: typeScale.xxl,
    fontWeight: '500',
    color: palette.foreground,
    letterSpacing: -0.5,
    lineHeight: Math.round(typeScale.xxl * lineHeights.tight),
  },
  h2: {
    fontFamily: fontSans,
    fontSize: typeScale.xl,
    fontWeight: '600',
    color: palette.foreground,
    letterSpacing: -0.3,
    lineHeight: Math.round(typeScale.xl * lineHeights.tight),
  },
  h3: {
    fontFamily: fontSans,
    fontSize: typeScale.lg,
    fontWeight: '400',
    color: palette.foreground,
    lineHeight: Math.round(typeScale.lg * lineHeights.normal),
  },
  body: {
    fontFamily: fontSans,
    fontSize: typeScale.base,
    fontWeight: '400',
    color: palette.foreground,
    lineHeight: Math.round(typeScale.base * lineHeights.relaxed),
  },
  bodySmall: {
    fontFamily: fontSans,
    fontSize: typeScale.md,
    fontWeight: '400',
    color: palette.foreground,
    lineHeight: Math.round(typeScale.md * lineHeights.normal),
  },
  caption: {
    fontFamily: fontSans,
    fontSize: typeScale.sm,
    fontWeight: '400',
    color: palette.muted,
    lineHeight: Math.round(typeScale.sm * lineHeights.normal),
  },
  label: {
    fontFamily: fontSans,
    fontSize: typeScale.xs,
    fontWeight: '500',
    color: palette.subtle,
    letterSpacing: 0.4,
    lineHeight: Math.round(typeScale.xs * lineHeights.normal),
  },
  tabActive: {
    fontFamily: fontSans,
    fontSize: typeScale.tab,
    fontWeight: '600',
    color: palette.foreground,
    letterSpacing: -0.1,
    lineHeight: Math.round(typeScale.tab * lineHeights.tight),
  },
  mono: {
    fontFamily: fonts.mono,
    fontSize: typeScale.xs,
    fontWeight: '400',
    color: palette.muted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    lineHeight: Math.round(typeScale.xs * lineHeights.normal),
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyToken = keyof typeof typography;

/** Muted color override for secondary body copy. */
export const typographyMuted = {
  body: { color: palette.mutedStrong },
  bodySmall: { color: palette.mutedStrong },
  caption: { color: palette.mutedStrong },
  h3: { color: palette.mutedStrong },
} as const satisfies Partial<Record<TypographyToken, TextStyle>>;

/** Grid tile caption typography — references semantic tokens. */
export const tileTypography = {
  period: {
    ...typography.caption,
    fontWeight: '500',
    letterSpacing: 0.2,
    color: palette.muted,
  },
  title: {
    ...typography.h2,
    fontWeight: '600',
    lineHeight: 24,
  },
  tagline: {
    ...typography.bodySmall,
    lineHeight: 18,
    color: palette.mutedStrong,
  },
  traction: {
    ...typography.caption,
    fontWeight: '500',
    marginTop: 2,
    color: palette.subtle,
  },
} as const satisfies Record<'period' | 'title' | 'tagline' | 'traction', TextStyle>;
