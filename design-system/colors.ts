export type ColorPalette = {
  /** Soft white — never pure #FFFFFF in UI surfaces. */
  white: string;
  background: string;
  foreground: string;
  /** Primary interactive / emphasis color. */
  primary: string;
  primaryForeground: string;
  muted: string;
  mutedStrong: string;
  subtle: string;
  border: string;
  surface: string;
  /** Secondary card / tile fill. */
  card: string;
  accent: string;
  destructive: string;
  icon: {
    default: string;
    muted: string;
    disabled: string;
  };
  overlay: {
    light: string;
    dark: string;
    /** Modal / slide-over scrim. */
    backdrop: string;
    /** Bottom sheet scrim — lighter so content stays visible. */
    sheet: string;
  };
  glass: {
    border: string;
    light: string;
    medium: string;
    clear: string;
    chip: string;
    frost: string;
  };
  shadow: {
    tile: string;
    tileHover: string;
    dock: string;
  };
  tileBorder: string;
  tabPill: string;
  selection: {
    background: string;
    foreground: string;
  };
  /** Fixed light tones for dark overlays (lightbox, carousel nav, etc.). */
  onOverlay: string;
  onOverlayMuted: string;
  /** Semi-transparent scrims for media viewers. */
  media: {
    scrim: string;
    toolbar: string;
    control: string;
    nav: string;
  };
};

/** Light mode — warm off-white background, soft charcoal text. */
export const lightPalette: ColorPalette = {
  white: '#FEFEFE',
  background: '#F7F7F5',
  foreground: '#1F1F1F',
  primary: '#1F1F1F',
  primaryForeground: '#F7F7F5',
  muted: '#6B6B6B',
  mutedStrong: '#404040',
  subtle: '#949494',
  border: '#DDDDD8',
  surface: '#EFEFED',
  card: 'rgba(255, 255, 255, 0.62)',
  accent: '#1F1F1F',
  destructive: '#B42318',
  icon: {
    default: '#404040',
    muted: '#6B6B6B',
    disabled: '#A3A3A3',
  },
  overlay: {
    light: 'rgba(0, 0, 0, 0.06)',
    dark: 'rgba(0, 0, 0, 0.12)',
    backdrop: 'rgba(247, 247, 245, 0.55)',
    sheet: 'rgba(31, 31, 31, 0.2)',
  },
  glass: {
    border: 'rgba(255, 255, 255, 0.5)',
    light: 'rgba(255, 255, 255, 0.52)',
    medium: 'rgba(255, 255, 255, 0.68)',
    clear: 'rgba(255, 255, 255, 0.14)',
    chip: 'rgba(255, 255, 255, 0.42)',
    frost: 'rgba(255, 255, 255, 0.68)',
  },
  shadow: {
    tile: '0 4px 24px rgba(0,0,0,0.06)',
    tileHover: '0 12px 40px rgba(0,0,0,0.12)',
    dock: '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
  },
  tileBorder: 'rgba(0, 0, 0, 0.08)',
  tabPill: 'rgba(0, 0, 0, 0.06)',
  selection: {
    background: '#1F1F1F',
    foreground: '#F7F7F5',
  },
  onOverlay: '#F7F7F5',
  onOverlayMuted: 'rgba(247, 247, 245, 0.72)',
  media: {
    scrim: 'rgba(0, 0, 0, 0.88)',
    toolbar: 'rgba(20, 20, 20, 0.55)',
    control: 'rgba(255, 255, 255, 0.12)',
    nav: 'rgba(0, 0, 0, 0.45)',
  },
};

/** Dark mode — charcoal background, soft gray text. */
export const darkPalette: ColorPalette = {
  white: '#E8E8E8',
  background: '#1E1E1E',
  foreground: '#D4D4D4',
  primary: '#D4D4D4',
  primaryForeground: '#1E1E1E',
  muted: '#A0A0A0',
  mutedStrong: '#C8C8C8',
  subtle: '#707070',
  border: '#3C3C3C',
  surface: '#252526',
  card: 'rgba(255, 255, 255, 0.06)',
  accent: '#E8E8E8',
  destructive: '#F97066',
  icon: {
    default: '#C8C8C8',
    muted: '#A0A0A0',
    disabled: '#707070',
  },
  overlay: {
    light: 'rgba(255, 255, 255, 0.05)',
    dark: 'rgba(255, 255, 255, 0.10)',
    backdrop: 'rgba(30, 30, 30, 0.62)',
    sheet: 'rgba(0, 0, 0, 0.2)',
  },
  glass: {
    border: 'rgba(255, 255, 255, 0.10)',
    light: 'rgba(37, 37, 38, 0.78)',
    medium: 'rgba(30, 30, 30, 0.86)',
    clear: 'rgba(255, 255, 255, 0.05)',
    chip: 'rgba(255, 255, 255, 0.08)',
    frost: 'rgba(30, 30, 30, 0.82)',
  },
  shadow: {
    tile: '0 4px 24px rgba(0,0,0,0.32)',
    tileHover: '0 12px 40px rgba(0,0,0,0.48)',
    dock: '0 8px 32px rgba(0,0,0,0.36), 0 2px 8px rgba(0,0,0,0.24)',
  },
  tileBorder: 'rgba(255, 255, 255, 0.08)',
  tabPill: 'rgba(255, 255, 255, 0.08)',
  selection: {
    background: '#D4D4D4',
    foreground: '#1E1E1E',
  },
  onOverlay: '#E8E8E8',
  onOverlayMuted: 'rgba(232, 232, 232, 0.72)',
  media: {
    scrim: 'rgba(0, 0, 0, 0.88)',
    toolbar: 'rgba(20, 20, 20, 0.55)',
    control: 'rgba(255, 255, 255, 0.12)',
    nav: 'rgba(0, 0, 0, 0.45)',
  },
};

export const palettes = {
  light: lightPalette,
  dark: darkPalette,
} as const;

export type ColorScheme = keyof typeof palettes;

/** @deprecated Prefer `useTheme().palette`. */
export const palette = lightPalette;
