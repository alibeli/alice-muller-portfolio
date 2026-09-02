import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { MoonIcon, SunIcon } from '@/components/ui/icons/ThemeIcons';

export function ThemeToggleChip() {
  const { colorScheme, toggleColorScheme, palette } = useTheme();
  const iconColor = palette.icon.muted;

  return (
    <Button
      variant="secondary"
      size="sm"
      onPress={toggleColorScheme}
      accessibilityLabel={colorScheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      icon={
        colorScheme === 'light' ? (
          <MoonIcon size={16} color={iconColor} />
        ) : (
          <SunIcon size={16} color={iconColor} />
        )
      }
    />
  );
}
