import type { TextStyle, ViewStyle } from 'react-native';

import type { ColorPalette } from '@/design-system/colors';
import { fontWeights, lineHeights, typeScale } from '@/design-system/typography';
import { radii } from '@/design-system/radii';
import { spacing, TOUCH_TARGET_MIN } from '@/design-system/spacing';

/** Material Design 3 button sizes (height in dp). */
export const buttonSizes = {
  sm: {
    height: 32,
    paddingHorizontal: spacing.md,
    minWidth: 64,
  },
  md: {
    height: 40,
    paddingHorizontal: spacing.lg,
    minWidth: 72,
  },
  lg: {
    height: TOUCH_TARGET_MIN,
    paddingHorizontal: spacing.xl,
    minWidth: 88,
  },
} as const;

export type ButtonSize = keyof typeof buttonSizes;
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'icon';

/** @deprecated Map legacy variant names to the new system. */
export const legacyButtonVariants = {
  chip: 'secondary',
  ghost: 'tertiary',
  action: 'tertiary',
  icon: 'icon',
} as const satisfies Record<string, ButtonVariant>;

export type LegacyButtonVariant = keyof typeof legacyButtonVariants;

export function resolveButtonVariant(
  variant: ButtonVariant | LegacyButtonVariant,
): ButtonVariant {
  if (variant in legacyButtonVariants) {
    return legacyButtonVariants[variant as LegacyButtonVariant];
  }
  return variant as ButtonVariant;
}

type ButtonStyleSet = {
  container: ViewStyle;
  label: TextStyle;
  labelColor: string;
};

export function getButtonStyles(
  p: ColorPalette,
  variant: ButtonVariant,
  size: ButtonSize,
  hovered: boolean,
): ButtonStyleSet {
  const sizeTokens = buttonSizes[size];
  const base: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    height: sizeTokens.height,
    paddingHorizontal: sizeTokens.paddingHorizontal,
    minWidth: sizeTokens.minWidth,
    borderRadius: radii.pill,
  };

  const labelBase: TextStyle = {
    fontSize: size === 'sm' ? typeScale.labelSmall : typeScale.labelLarge,
    fontWeight: fontWeights.medium,
    lineHeight: size === 'sm' ? lineHeights.labelSmall : lineHeights.labelLarge,
  };

  switch (variant) {
    case 'primary':
      return {
        container: {
          ...base,
          backgroundColor: p.primary,
          borderWidth: 0,
        },
        label: labelBase,
        labelColor: p.primaryForeground,
      };
    case 'secondary':
      return {
        container: {
          ...base,
          backgroundColor: p.glass.chip,
          borderWidth: 1,
          borderColor: p.border,
        },
        label: labelBase,
        labelColor: p.foreground,
      };
    case 'tertiary':
      return {
        container: {
          ...base,
          height: sizeTokens.height,
          paddingHorizontal: size === 'sm' ? spacing.sm : spacing.md,
          minWidth: 0,
          backgroundColor: hovered ? p.glass.clear : 'transparent',
          borderWidth: 0,
        },
        label: labelBase,
        labelColor: p.foreground,
      };
    case 'icon':
      return {
        container: {
          ...base,
          width: TOUCH_TARGET_MIN,
          height: TOUCH_TARGET_MIN,
          minWidth: TOUCH_TARGET_MIN,
          paddingHorizontal: 0,
          backgroundColor: hovered ? p.glass.clear : 'transparent',
          borderWidth: 0,
        },
        label: labelBase,
        labelColor: p.foreground,
      };
  }
}
