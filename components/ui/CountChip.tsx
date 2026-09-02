import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { Text } from '@/components/ui/Text';
import { type ColorPalette, typeScale } from '@/constants/tokens';

type Props = {
  count: number;
};

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    chip: {
      minWidth: 20,
      height: 20,
      paddingHorizontal: 6,
      borderRadius: 999,
      backgroundColor: p.tabPill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: typeScale.micro,
      fontWeight: '600',
      color: p.foreground,
      lineHeight: 12,
    },
  });
}

export function CountChip({ count }: Props) {
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);

  return (
    <View style={styles.chip}>
      <Text variant="mono" style={styles.text}>
        {count}
      </Text>
    </View>
  );
}
