import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { Text } from '@/components/ui/Text';
import { radii, spacing, type ColorPalette, typeScale } from '@/constants/tokens';
import type { OtherProject } from '@/data/portfolio';
import { formatProjectPeriod } from '@/lib/projectLinks';

type Props = {
  project: OtherProject;
  width: number;
};

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    tile: {
      padding: spacing.md,
      borderRadius: radii.tile - 6,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: p.tileBorder,
      backgroundColor: p.card,
      gap: spacing.xs,
      minHeight: 108,
    },
    period: {
      fontSize: typeScale.micro,
    },
    title: {
      fontSize: typeScale.base,
      lineHeight: 19,
      fontWeight: '600',
    },
    description: {
      fontSize: typeScale.compact,
      lineHeight: 17,
    },
  });
}

export function MoreProjectTile({ project, width }: Props) {
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);

  return (
    <View style={[styles.tile, { width }]}>
      <Text variant="mono" style={styles.period}>
        {formatProjectPeriod(project.period)}
      </Text>
      <Text variant="subtitle" style={styles.title} numberOfLines={2}>
        {project.title}
      </Text>
      <Text variant="body" muted style={styles.description} numberOfLines={3}>
        {project.description}
      </Text>
    </View>
  );
}
