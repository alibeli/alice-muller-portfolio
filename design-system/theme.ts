import { darkPalette, lightPalette } from '@/design-system/colors';

export const THEME_STORAGE_KEY = 'alice-portfolio-color-scheme';

/** Inline CSS theme values for `app/+html.tsx` — keep in sync with palettes. */
export const htmlThemeCss = {
  light: {
    background: lightPalette.background,
    foreground: lightPalette.foreground,
    selectionBackground: lightPalette.selection.background,
    selectionForeground: lightPalette.selection.foreground,
  },
  dark: {
    background: darkPalette.background,
    foreground: darkPalette.foreground,
    selectionBackground: darkPalette.selection.background,
    selectionForeground: darkPalette.selection.foreground,
  },
} as const;
