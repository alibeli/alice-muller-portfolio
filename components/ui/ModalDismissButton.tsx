import { Pressable, StyleSheet } from 'react-native';

import { Text } from '@/components/ui/Text';
import { palette, spacing } from '@/constants/tokens';
import { typography } from '@/constants/typography';

type Props = {
  /** Direction the panel dismisses toward (and chevron points). */
  direction: 'left' | 'right';
  onPress: () => void;
  accessibilityLabel?: string;
};

export function ModalDismissButton({
  direction,
  onPress,
  accessibilityLabel = 'Close',
}: Props) {
  const glyph = direction === 'left' ? '‹' : '›';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        direction === 'left' ? styles.btnLeft : styles.btnRight,
        pressed && styles.pressed,
      ]}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      hitSlop={8}
    >
      <Text style={styles.glyph} allowFontScaling={false}>
        {glyph}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
  },
  btnLeft: {
    marginLeft: -spacing.xs,
    marginRight: spacing.xs,
  },
  btnRight: {
    marginRight: -spacing.xs,
  },
  glyph: {
    ...typography.h2,
    fontSize: 28,
    lineHeight: 30,
    fontWeight: '300',
    color: palette.muted,
  },
  pressed: {
    opacity: 0.55,
  },
});
