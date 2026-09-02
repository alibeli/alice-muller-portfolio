import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { MoonIcon, SunIcon } from '@/components/ui/icons/ThemeIcons';
import { spacing } from '@/design-system';

const TOGGLE_SIZE = 32;

export function ThemeToggleChip() {
  const { colorScheme, toggleColorScheme, palette } = useTheme();
  const iconColor = colorScheme === 'light' ? palette.foreground : palette.icon.default;
  const iconSize = 18;

  return (
    <Button
      variant="secondary"
      size="sm"
      onPress={toggleColorScheme}
      accessibilityLabel={colorScheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      style={{
        width: TOGGLE_SIZE,
        minWidth: TOGGLE_SIZE,
        height: TOGGLE_SIZE,
        paddingHorizontal: 0,
      }}
      contentStyle={{ gap: 0, paddingHorizontal: spacing.xs }}
      icon={
        colorScheme === 'light' ? (
          <MoonIcon size={iconSize} color={iconColor} />
        ) : (
          <SunIcon size={iconSize} color={iconColor} />
        )
      }
    />
  );
}
