import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { type ColorPalette, typeScale } from '@/constants/tokens';

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    icon: {
      fontSize: typeScale.sm,
      lineHeight: 16,
      color: p.foreground,
    },
  });
}

export function ThemeToggleChip() {
  const { colorScheme, toggleColorScheme, palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);
  const icon = colorScheme === 'light' ? '🌙' : '☀️';

  return (
    <Button
      variant="chip"
      onPress={toggleColorScheme}
      accessibilityLabel={colorScheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      icon={<Text style={styles.icon}>{icon}</Text>}
    />
  );
}
