import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { MoonIcon, SunIcon } from '@/components/ui/icons/ThemeIcons';

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
