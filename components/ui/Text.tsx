import { Platform, StyleSheet, Text as RNText, TextProps, TextStyle } from 'react-native';
import { useMemo } from 'react';

import { useTheme } from '@/components/ThemeProvider';
import { fontSans, lineHeights, type ColorPalette, typeScale, fonts } from '@/constants/tokens';

type Variant = 'hero' | 'title' | 'titleMd' | 'subtitle' | 'body' | 'caption' | 'mono';

function createVariantStyles(p: ColorPalette): Record<Variant, TextStyle> {
  return {
    hero: {
      fontFamily: fontSans,
      fontSize: typeScale.hero,
      fontWeight: '400',
      color: p.foreground,
      letterSpacing: -1,
      lineHeight: typeScale.hero * lineHeights.tight,
    },
    title: {
      fontFamily: fontSans,
      fontSize: typeScale.xxl,
      fontWeight: '500',
      color: p.foreground,
      letterSpacing: -0.5,
      lineHeight: typeScale.xxl * lineHeights.tight,
    },
    titleMd: {
      fontFamily: fontSans,
      fontSize: typeScale.titleMd,
      fontWeight: '500',
      color: p.foreground,
      letterSpacing: -0.3,
      lineHeight: 28,
    },
    subtitle: {
      fontFamily: fontSans,
      fontSize: typeScale.lg,
      fontWeight: '400',
      color: p.foreground,
      lineHeight: typeScale.lg * lineHeights.normal,
    },
    body: {
      fontFamily: fontSans,
      fontSize: typeScale.base,
      fontWeight: '400',
      color: p.foreground,
      lineHeight: typeScale.base * lineHeights.relaxed,
    },
    caption: {
      fontFamily: fontSans,
      fontSize: typeScale.sm,
      fontWeight: '400',
      color: p.muted,
      lineHeight: typeScale.sm * lineHeights.normal,
    },
    mono: {
      fontFamily: fonts.mono,
      fontSize: typeScale.xs,
      fontWeight: '400',
      color: p.muted,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },
  };
}

type Props = TextProps & {
  variant?: Variant;
  muted?: boolean;
};

export function Text({ variant = 'body', muted, style, ...props }: Props) {
  const { palette } = useTheme();
  const variantStyles = useMemo(() => createVariantStyles(palette), [palette]);

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

export function useTextStyles() {
  const { palette } = useTheme();
  return useMemo(() => StyleSheet.create(createVariantStyles(palette)), [palette]);
}
