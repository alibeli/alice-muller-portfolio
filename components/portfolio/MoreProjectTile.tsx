import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { palette, radii, spacing } from '@/constants/tokens';
import { typography } from '@/constants/typography';
import type { OtherProject } from '@/data/portfolio';
import { formatProjectPeriod } from '@/lib/projectLinks';

type Props = {
  project: OtherProject;
  width: number;
};

export function MoreProjectTile({ project, width }: Props) {
  return (
    <View style={[styles.tile, { width }]}>
      <Text variant="mono" style={styles.period}>
        {formatProjectPeriod(project.period)}
      </Text>
      <Text variant="title" style={styles.title} numberOfLines={2}>
        {project.title}
      </Text>
      <Text variant="caption" muted style={styles.description} numberOfLines={3}>
        {project.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    padding: spacing.md,
    borderRadius: radii.tileInner,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.tileBorder,
    backgroundColor: 'rgba(255,255,255,0.55)',
    gap: 4,
    minHeight: 108,
  },
  period: typography.mono,
  title: {
    ...typography.h2,
    fontSize: 15,
    lineHeight: 19,
  },
  description: typography.bodySmall,
});
