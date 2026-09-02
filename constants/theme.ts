/**
 * Back-compat barrel — prefer `@/constants/tokens` for new code.
 */
import { fonts, lineHeights, radii, typeScale } from '@/constants/tokens';

export {
  darkPalette,
  fontSans,
  fonts,
  getTileText,
  layout,
  lightPalette,
  lineHeights,
  motion,
  palette,
  palettes,
  radii,
  spacing,
  tileText,
  type ColorPalette,
  type ColorScheme,
  typeScale,
  THEME_STORAGE_KEY,
} from '@/constants/tokens';

export { palette as colors } from '@/constants/tokens';

export const tileRadius = radii.tile;

export const typography = {
  sans: fonts.sans,
  sansStack: fonts.sansStack,
  mono: fonts.mono,
  sizes: {
    xs: typeScale.xs,
    sm: typeScale.sm,
    base: typeScale.base,
    md: typeScale.md,
    lg: typeScale.lg,
    xl: typeScale.xl,
    titleMd: typeScale.titleMd,
    xxl: typeScale.xxl,
    hero: typeScale.hero,
    compact: typeScale.compact,
    micro: typeScale.micro,
  },
  lineHeights,
} as const;
