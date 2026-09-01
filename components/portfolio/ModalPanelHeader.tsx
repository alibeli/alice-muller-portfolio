import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { CountChip } from '@/components/ui/CountChip';
import { Text } from '@/components/ui/Text';
import { colors, spacing } from '@/constants/theme';

type Props = {
  title: ReactNode;
  count?: number;
  onClose: () => void;
  icon?: ReactNode;
  intro?: string;
};

export function ModalPanelHeader({ title, count, onClose, icon, intro }: Props) {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.headingGroup}>
          {icon}
          {typeof title === 'string' ? (
            <View style={styles.titleRow}>
              <Text variant="title" style={styles.heading} numberOfLines={2}>
                {title}
              </Text>
              {count != null ? <CountChip count={count} /> : null}
            </View>
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
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
