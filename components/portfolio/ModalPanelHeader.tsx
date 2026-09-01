import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, spacing } from '@/constants/theme';

type Props = {
  title: ReactNode;
  onClose: () => void;
  icon?: ReactNode;
  intro?: string;
};

export function ModalPanelHeader({ title, onClose, icon, intro }: Props) {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.headingGroup}>
          {icon}
          {typeof title === 'string' ? (
            <Text variant="title" style={styles.heading} numberOfLines={2}>
              {title}
            </Text>
          ) : (
            title
          )}
        </View>
        <Pressable
          onPress={onClose}
          style={({ pressed }) => [styles.closeBtn, pressed && styles.pressed]}
          accessibilityLabel="Close"
        >
          <Text variant="body" style={styles.closeIcon}>
            ✕
          </Text>
        </Pressable>
      </View>
      {intro ? (
        <Text variant="body" muted style={styles.intro}>
          {intro}
        </Text>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  headingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexShrink: 1,
    flex: 1,
  },
  closeBtn: {
    padding: spacing.sm,
  },
  closeIcon: {
    fontSize: 18,
    color: colors.muted,
  },
  heading: {
    marginBottom: 0,
    flexShrink: 1,
  },
  intro: {
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.65,
  },
});
