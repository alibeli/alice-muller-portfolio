import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { CountChip } from '@/components/ui/CountChip';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { spacing, type ColorPalette } from '@/design-system';

type Props = {
  title: ReactNode;
  count?: number;
  onClose: () => void;
  icon?: ReactNode;
  intro?: string;
};

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
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
      gap: spacing.sm,
      flexShrink: 1,
    },
    closeIcon: {
      color: p.icon.muted,
    },
    heading: {
      marginBottom: 0,
      flexShrink: 1,
    },
    intro: {
      marginBottom: spacing.md,
    },
  });
}

export function ModalPanelHeader({ title, count, onClose, icon, intro }: Props) {
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);

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
        <Button
          variant="icon"
          onPress={onClose}
          accessibilityLabel="Close"
          icon={
            <Text variant="titleMedium" style={styles.closeIcon}>
              ✕
            </Text>
          }
        />
      </View>
      {intro ? (
        <Text variant="body" muted style={styles.intro}>
          {intro}
        </Text>
      ) : null}
    </>
  );
}
