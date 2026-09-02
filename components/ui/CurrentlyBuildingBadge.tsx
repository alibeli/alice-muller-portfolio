import { useMemo } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '@/components/ThemeProvider';
import { Text } from '@/components/ui/Text';
import { radii } from '@/design-system/radii';
import { spacing } from '@/design-system/spacing';
import { typeScale } from '@/design-system/typography';
import type { ColorPalette } from '@/design-system/colors';

/** Soft pastel holographic wash — low saturation, gentle transitions. */
const HOLO = {
  light: {
    colors: ['#F4EEFF', '#EEF6FF', '#FFF2F6', '#F0FAF3', '#F4EEFF'] as const,
    css: 'linear-gradient(120deg, #F4EEFF 0%, #EEF6FF 30%, #FFF2F6 55%, #F0FAF3 80%, #F4EEFF 100%)',
  },
  dark: {
    colors: ['#2E2840', '#273038', '#382830', '#283830', '#2E2840'] as const,
    css: 'linear-gradient(120deg, #2E2840 0%, #273038 30%, #382830 55%, #283830 80%, #2E2840 100%)',
  },
} as const;

type Props = {
  compact?: boolean;
};

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    wrap: {
      alignSelf: 'flex-start',
      flexShrink: 0,
      flexGrow: 0,
    },
    badge: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: radii.pill,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: p.glass.border,
    },
    badgeCompact: {
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xs,
      borderRadius: radii.pill,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: p.glass.border,
    },
    label: {
      fontSize: typeScale.labelSmall,
      color: p.foreground,
      letterSpacing: 0.15,
    },
    labelCompact: {
      fontSize: typeScale.labelSmall,
      color: p.foreground,
      letterSpacing: 0.1,
    },
  });
}

export function CurrentlyBuildingBadge({ compact = false }: Props) {
  const { colorScheme, palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);
  const holo = HOLO[colorScheme];
  const labelStyle = compact ? styles.labelCompact : styles.label;
  const badgeStyle = compact ? styles.badgeCompact : styles.badge;

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.wrap, badgeStyle, { backgroundImage: holo.css } as object]}>
        <Text variant="label" style={labelStyle}>
          Currently building
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <LinearGradient
        colors={[...holo.colors]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={badgeStyle}
      >
        <Text variant="label" style={labelStyle}>
          Currently building
        </Text>
      </LinearGradient>
    </View>
  );
}
