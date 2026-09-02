import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { Text } from '@/components/ui/Text';
import { radii, spacing, type ColorPalette } from '@/design-system';
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
      borderRadius: radii.tileCompact,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: p.tileBorder,
      backgroundColor: p.card,
      gap: spacing.xs,
      minHeight: 108,
    },
  });
}

export function MoreProjectTile({ project, width }: Props) {
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);

  return (
    <View style={[styles.tile, { width }]}>
      <Text variant="overline">{formatProjectPeriod(project.period)}</Text>
      <Text variant="titleSmall" numberOfLines={2}>
        {project.title}
      </Text>
      <Text variant="caption" muted numberOfLines={3}>
        {project.description}
      </Text>
    </View>
  );
}
