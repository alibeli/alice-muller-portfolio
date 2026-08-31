import { Platform, StyleSheet, Text as RNText, TextProps, TextStyle } from 'react-native';

import { fontSans, palette, typeScale, lineHeights, fonts } from '@/constants/tokens';

type Variant = 'hero' | 'title' | 'subtitle' | 'body' | 'caption' | 'mono';

const variantStyles: Record<Variant, TextStyle> = {
  hero: {
    fontFamily: fontSans,
    fontSize: typeScale.hero,
    fontWeight: '400',
    color: palette.foreground,
    letterSpacing: -1,
    lineHeight: typeScale.hero * lineHeights.tight,
  },
  title: {
    fontFamily: fontSans,
    fontSize: typeScale.xxl,
    fontWeight: '500',
    color: palette.foreground,
    letterSpacing: -0.5,
    lineHeight: typeScale.xxl * lineHeights.tight,
  },
  subtitle: {
    fontFamily: fontSans,
    fontSize: typeScale.lg,
    fontWeight: '400',
    color: palette.foreground,
    lineHeight: typeScale.lg * lineHeights.normal,
  },
  body: {
    fontFamily: fontSans,
    fontSize: typeScale.base,
    fontWeight: '400',
    color: palette.foreground,
    lineHeight: typeScale.base * lineHeights.relaxed,
  },
  caption: {
    fontFamily: fontSans,
    fontSize: typeScale.sm,
    fontWeight: '400',
    color: palette.muted,
    lineHeight: typeScale.sm * lineHeights.normal,
  },
  mono: {
    fontFamily: fonts.mono,
    fontSize: typeScale.xs,
    fontWeight: '400',
    color: palette.muted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
};

type Props = TextProps & {
  variant?: Variant;
  muted?: boolean;
};

export function Text({ variant = 'body', muted, style, ...props }: Props) {
  return (
    <RNText
      style={[
        variantStyles[variant],
        Platform.OS === 'web' && styles.webText,
        muted && { color: palette.mutedStrong },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  webText: {
    fontFamily: fontSans,
  },
});

export const textStyles = StyleSheet.create(variantStyles);
