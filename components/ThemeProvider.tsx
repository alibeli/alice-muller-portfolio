import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Platform } from 'react-native';

import {
  type ColorPalette,
  type ColorScheme,
  darkPalette,
  lightPalette,
  palettes,
  THEME_STORAGE_KEY,
} from '@/design-system';

type ThemeContextValue = {
  colorScheme: ColorScheme;
  palette: ColorPalette;
  toggleColorScheme: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredScheme(): ColorScheme | null {
  if (Platform.OS !== 'web') return null;
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* ignore */
  }
  return null;
}

function persistScheme(scheme: ColorScheme) {
  if (Platform.OS !== 'web') return;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, scheme);
    document.documentElement.setAttribute('data-theme', scheme);
  } catch {
    /* ignore */
  }
}

function applyDocumentTheme(scheme: ColorScheme, palette: ColorPalette) {
  if (Platform.OS !== 'web') return;
  document.documentElement.setAttribute('data-theme', scheme);
  document.body.style.backgroundColor = palette.background;
  document.body.style.color = palette.foreground;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(() => readStoredScheme() ?? 'light');

  const palette = colorScheme === 'dark' ? darkPalette : lightPalette;

  const setColorScheme = useCallback((scheme: ColorScheme) => {
    setColorSchemeState(scheme);
    persistScheme(scheme);
  }, []);

  const toggleColorScheme = useCallback(() => {
    setColorSchemeState((current) => {
      const next = current === 'light' ? 'dark' : 'light';
      persistScheme(next);
      return next;
    });
  }, []);

  useEffect(() => {
    applyDocumentTheme(colorScheme, palette);
  }, [colorScheme, palette]);

  const value = useMemo(
    () => ({
      colorScheme,
      palette,
      toggleColorScheme,
      setColorScheme,
    }),
    [colorScheme, palette, toggleColorScheme, setColorScheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      colorScheme: 'light',
      palette: lightPalette,
      toggleColorScheme: () => {},
      setColorScheme: () => {},
    };
  }
  return context;
}

export { palettes, type ColorScheme, type ColorPalette };
