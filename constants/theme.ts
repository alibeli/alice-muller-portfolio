/**
 * Back-compat barrel — prefer `@/constants/tokens` for new code.
 */
import { fonts, lineHeights, radii, typeScale } from '@/constants/tokens';

export {
  fontSans,
  fonts,
  layout,
  lineHeights,
  motion,
  palette,
  palette as colors,
  radii,
  spacing,
  tileText,
  typeScale,
} from '@/constants/tokens';

export const tileRadius = radii.tile;

export const typography = {
  sans: fonts.sans,
  sansStack: fonts.sansStack,
  mono: fonts.mono,
  sizes: {
    xs: typeScale.xs,
    sm: typeScale.sm,
    base: typeScale.base,
    lg: typeScale.lg,
    xl: typeScale.xxl,
    xxl: typeScale.xxl,
    hero: typeScale.hero,
  },
  lineHeights,
} as const;
