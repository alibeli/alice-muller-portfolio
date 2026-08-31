import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/constants/theme';

type Props = {
  spacing?: 'sm' | 'md' | 'lg';
};

export function Divider({ spacing: gap = 'lg' }: Props) {
  const margin = gap === 'sm' ? spacing.md : gap === 'md' ? spacing.lg : spacing.xl;

  return <View style={[styles.divider, { marginVertical: margin }]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    width: '100%',
  },
});
