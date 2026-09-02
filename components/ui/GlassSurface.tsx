import { useMemo } from 'react';
import { Platform, StyleSheet, View, ViewProps } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import type { ColorPalette } from '@/constants/tokens';

type Props = ViewProps & {
  rounded?: number;
  intensity?: 'light' | 'medium' | 'clear' | 'panel' | 'transparent';
};

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    base: {
      overflow: 'hidden',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: p.glass.border,
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
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    } as object,
  });
}

export function GlassSurface({
  style,
  rounded = 999,
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
        bgStyle,
        { borderRadius: rounded },
        intensity !== 'transparent' && Platform.OS === 'web' && styles.webBlur,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
