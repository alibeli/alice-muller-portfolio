import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { palette, spacing } from '@/constants/tokens';
import type { TimelineEntry } from '@/data/portfolio';

type Props = {
  entries: TimelineEntry[];
};

export function ProjectTimeline({ entries }: Props) {
  return (
    <View style={styles.wrap}>
      <Text variant="mono" style={styles.heading}>
        Timeline
      </Text>
      {entries.map((entry, index) => (
        <View key={`${entry.date}-${entry.label}-${index}`} style={styles.row}>
          <Text variant="mono" style={styles.date}>
            {entry.date}
          </Text>
          <Text variant="body" muted style={styles.label}>
            {entry.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  heading: {
    marginBottom: spacing.xs,
    color: palette.subtle,
  },
  row: {
    gap: 2,
  },
  date: {
    color: palette.muted,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
  },
});
