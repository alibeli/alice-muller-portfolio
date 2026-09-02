import type { ReactNode } from 'react';
import { useMemo } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { Text } from '@/components/ui/Text';
import {
  getButtonStyles,
  resolveButtonVariant,
  type ButtonSize,
  type ButtonVariant,
  type LegacyButtonVariant,
} from '@/design-system/buttons';
import type { ColorPalette } from '@/design-system/colors';

export type { ButtonSize, ButtonVariant, LegacyButtonVariant };

type Props = Omit<PressableProps, 'children'> & {
  /** Primary (filled), secondary (outlined), tertiary (text), or icon-only. */
  variant?: ButtonVariant | LegacyButtonVariant;
  size?: ButtonSize;
  label?: string;
  icon?: ReactNode;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  /** Tertiary/action split-bar: hairline divider on the left edge. */
  dividerLeft?: boolean;
  hovered?: boolean;
};

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dividerLeft: {
      borderLeftWidth: StyleSheet.hairlineWidth,
      borderLeftColor: p.border,
    },
    pressed: {
      opacity: 0.72,
    },
    disabled: {
      opacity: 0.55,
    },
  });
}

export function Button({
  variant = 'secondary',
  size = 'md',
  label,
  icon,
  children,
  style,
  contentStyle,
  dividerLeft = false,
  hovered = false,
  disabled,
  ...props
}: Props) {
  const { palette } = useTheme();
  const shared = useMemo(() => createStyles(palette), [palette]);
  const resolved = resolveButtonVariant(variant);
  const variantStyles = useMemo(
    () => getButtonStyles(palette, resolved, size, hovered),
    [palette, resolved, size, hovered],
  );

  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        shared.base,
        variantStyles.container,
        dividerLeft && shared.dividerLeft,
        disabled && shared.disabled,
        pressed && !disabled && shared.pressed,
        style,
      ]}
      accessibilityRole="button"
      {...props}
    >
      {children ?? (
        <View style={[shared.base, contentStyle]}>
          {icon}
          {label ? (
            <Text variant="label" style={[variantStyles.label, { color: variantStyles.labelColor }]}>
              {label}
            </Text>
          ) : null}
        </View>
      )}
    </Pressable>
  );
}
