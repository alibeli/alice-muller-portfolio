import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import type { ColorPalette } from '@/design-system/colors';
import { spacing } from '@/design-system/spacing';

type Props = {
  spacing?: 'sm' | 'md' | 'lg';
};

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: p.border,
      width: '100%',
    },
  });
}

export function Divider({ spacing: gap = 'lg' }: Props) {
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);
  const margin = gap === 'sm' ? spacing.md : gap === 'md' ? spacing.lg : spacing.xl;

  return <View style={[styles.divider, { marginVertical: margin }]} />;
}
