import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { Text } from '@/components/ui/Text';
import { radii } from '@/design-system/radii';
import type { ColorPalette } from '@/design-system/colors';
import { typeScale } from '@/design-system/typography';

type Props = {
  count: number;
};

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    chip: {
      minWidth: 20,
      height: 20,
      paddingHorizontal: 6,
      borderRadius: radii.pill,
      backgroundColor: p.tabPill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    chipText: {
      fontSize: typeScale.labelSmall,
      lineHeight: typeScale.labelSmall + 1,
    },
  });
}

export function CountChip({ count }: Props) {
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);

  return (
    <View style={styles.chip}>
      <Text variant="label" style={styles.chipText}>
        {count}
      </Text>
    </View>
  );
}
