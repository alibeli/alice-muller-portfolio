import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { radii, type ColorPalette } from '@/design-system';

type Props = {
  columns: number;
  rows?: number;
  tileHeight: number;
  gridGap: number;
};

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    grid: {
      width: '100%',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    tile: {
      flex: 1,
      borderRadius: radii.tile,
      backgroundColor: p.surface,
      opacity: 0.55,
    },
  });
}

/** Placeholder grid shown until the real layout width is measured. */
export function GridSkeleton({ columns, rows = 3, tileHeight, gridGap }: Props) {
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);

  return (
    <View style={[styles.grid, { gap: gridGap }]}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <View key={rowIndex} style={[styles.row, { gap: gridGap }]}>
          {Array.from({ length: columns }).map((__, colIndex) => (
            <View key={colIndex} style={[styles.tile, { height: tileHeight }]} />
          ))}
        </View>
      ))}
    </View>
  );
}
