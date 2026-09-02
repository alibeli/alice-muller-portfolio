import { useMemo } from 'react';
import { Platform, StyleSheet, View, ViewProps } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import type { ColorPalette } from '@/design-system';
import { glassEffect } from '@/design-system';

type Props = ViewProps & {
  rounded?: number;
  /** Which corners receive `rounded` — default all. */
  roundedCorners?: 'all' | 'top' | 'bottom';
  /** Hide the hairline border (e.g. tile caption flush to edge). */
  borderless?: boolean;
  intensity?: 'light' | 'medium' | 'clear' | 'panel' | 'transparent';
};

function cornerRadius(rounded: number, corners: NonNullable<Props['roundedCorners']>) {
  if (corners === 'all' || rounded === 0) {
    return { borderRadius: rounded };
  }
  if (corners === 'top') {
    return {
      borderTopLeftRadius: rounded,
      borderTopRightRadius: rounded,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    };
  }
  return {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: rounded,
    borderBottomRightRadius: rounded,
  };
}

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    base: {
      overflow: 'hidden',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: p.glass.border,
    },
    borderless: {
      borderWidth: 0,
    },
    light: {
      backgroundColor: p.glass.light,
    },
    medium: {
      backgroundColor: p.glass.medium,
    },
    clear: {
      backgroundColor: p.glass.clear,
    },
    panel: {
      backgroundColor: p.glass.medium,
    },
    transparent: {
      backgroundColor: 'transparent',
      borderColor: p.tileBorder,
    },
    webBlur: {
      backdropFilter: `blur(${glassEffect.blurPx}px) saturate(${glassEffect.saturate}%)`,
      WebkitBackdropFilter: `blur(${glassEffect.blurPx}px) saturate(${glassEffect.saturate}%)`,
    } as object,
  });
}

export function GlassSurface({
  style,
  rounded = 999,
  roundedCorners = 'all',
  borderless = false,
  intensity = 'medium',
  children,
  ...props
}: Props) {
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);

  const bgStyle =
    intensity === 'light'
      ? styles.light
      : intensity === 'clear'
        ? styles.clear
        : intensity === 'panel'
          ? styles.panel
          : intensity === 'transparent'
            ? styles.transparent
            : styles.medium;

  return (
    <View
      style={[
        styles.base,
        borderless && styles.borderless,
        bgStyle,
        cornerRadius(rounded, roundedCorners),
        intensity !== 'transparent' && Platform.OS === 'web' && styles.webBlur,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
