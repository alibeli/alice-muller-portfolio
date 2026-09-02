import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { MoonIcon, SunIcon } from '@/components/ui/icons/ThemeIcons';

export function ThemeToggleChip() {
  const { colorScheme, toggleColorScheme, palette } = useTheme();

  return (
    <Button
      variant="chip"
      onPress={toggleColorScheme}
      accessibilityLabel={colorScheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      icon={
        colorScheme === 'light' ? (
          <MoonIcon size={14} color={palette.foreground} />
        ) : (
          <SunIcon size={14} color={palette.foreground} />
        )
      }
    />
  );
}
