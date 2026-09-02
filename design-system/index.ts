export {
  type ColorPalette,
  type ColorScheme,
  darkPalette,
  lightPalette,
  palette,
  palettes,
} from '@/design-system/colors';

export {
  createTextVariants,
  fontSans,
  fonts,
  fontWeights,
  getTileText,
  lineHeights,
  tileText,
  typography,
  type TextVariant,
  typeScale,
} from '@/design-system/typography';

export {
  GRID_UNIT,
  gutter,
  layout,
  space,
  spacing,
  TOUCH_TARGET_MIN,
} from '@/design-system/spacing';

export { radii, tileRadius } from '@/design-system/radii';

export { glassEffect } from '@/design-system/effects';

export { motion } from '@/design-system/motion';

export { htmlThemeCss, THEME_STORAGE_KEY } from '@/design-system/theme';

export {
  buttonSizes,
  getButtonStyles,
  legacyButtonVariants,
  resolveButtonVariant,
  type ButtonSize,
  type ButtonVariant,
  type LegacyButtonVariant,
} from '@/design-system/buttons';

/** @deprecated Prefer `useTheme().palette`. */
export { palette as colors } from '@/design-system/colors';
