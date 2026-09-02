import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { Platform, Pressable, StyleSheet, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { Text } from '@/components/ui/Text';
import { radii, spacing, type ColorPalette, typeScale } from '@/constants/tokens';

export type ButtonVariant = 'chip' | 'ghost' | 'icon' | 'action';

type Props = Omit<PressableProps, 'children'> & {
  variant?: ButtonVariant;
  label?: string;
  icon?: ReactNode;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
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
    chip: {
      gap: 6,
      height: 32,
      paddingHorizontal: spacing.sm,
      borderRadius: radii.pill,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: p.border,
      backgroundColor: p.glass.chip,
    },
    ghost: {
      paddingHorizontal: spacing.xs,
    },
    icon: {
      padding: spacing.xs,
      marginRight: -spacing.xs,
    },
    action: {
      gap: 6,
      paddingHorizontal: spacing.lg,
      backgroundColor: 'transparent',
    },
    actionDivider: {
      borderLeftWidth: StyleSheet.hairlineWidth,
      borderLeftColor: p.border,
    },
    actionHovered: {
      backgroundColor: p.glass.clear,
    },
    pressed: {
      opacity: 0.65,
    },
    chipLabel: {
      fontSize: typeScale.xs,
    },
    actionLabel: {
      fontSize: typeScale.sm,
      fontWeight: '500',
      color: p.foreground,
    },
    disabled: {
      opacity: 0.55,
    },
  });
}

export function Button({
  variant = 'chip',
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
  const styles = useMemo(() => createStyles(palette), [palette]);

  const variantStyle =
    variant === 'chip'
      ? styles.chip
      : variant === 'ghost'
        ? styles.ghost
        : variant === 'icon'
          ? styles.icon
          : styles.action;

  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variantStyle,
        dividerLeft && styles.actionDivider,
        variant === 'action' && hovered && styles.actionHovered,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
      accessibilityRole="button"
      {...props}
    >
      {children ?? (
        <View style={[styles.base, contentStyle]}>
          {icon}
          {label ? (
            <Text variant="mono" style={variant === 'action' ? styles.actionLabel : styles.chipLabel}>
              {label}
            </Text>
          ) : null}
        </View>
      )}
    </Pressable>
  );
}
