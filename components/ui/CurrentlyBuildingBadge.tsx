import { useEffect, useMemo } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/components/ThemeProvider';
import { Text } from '@/components/ui/Text';
import { radii } from '@/design-system/radii';
import { spacing } from '@/design-system/spacing';
import { typeScale } from '@/design-system/typography';
import type { ColorPalette } from '@/design-system/colors';

/** Soft pastel holographic wash — stronger saturation so the badge reads on tiles. */
const HOLO = {
  light: {
    colors: ['#E8DAFF', '#D6EBFF', '#FFD6E8', '#D4F5E4', '#E8DAFF'] as const,
    css: 'linear-gradient(120deg, #E8DAFF 0%, #D6EBFF 30%, #FFD6E8 55%, #D4F5E4 80%, #E8DAFF 100%)',
  },
  dark: {
    colors: ['#4A3D6B', '#355A72', '#6B3D52', '#356B58', '#4A3D6B'] as const,
    css: 'linear-gradient(120deg, #4A3D6B 0%, #355A72 30%, #6B3D52 55%, #356B58 80%, #4A3D6B 100%)',
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
      overflow: 'hidden',
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

function NativeShimmer({ colorScheme }: { colorScheme: 'light' | 'dark' }) {
  const translateX = useSharedValue(-120);
  const shimmerColors =
    colorScheme === 'light'
      ? (['rgba(255,255,255,0)', 'rgba(255,255,255,0.55)', 'rgba(255,255,255,0)'] as const)
      : (['rgba(255,255,255,0)', 'rgba(255,255,255,0.38)', 'rgba(255,255,255,0)'] as const);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(220, { duration: 3200, easing: Easing.inOut(Easing.ease) }),
      -1,
      false,
    );
  }, [translateX]);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: `${translateX.value}%` }],
  }));

  return (
    <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, shimmerStyle]}>
      <LinearGradient
        colors={[...shimmerColors]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
}

export function CurrentlyBuildingBadge({ compact = false }: Props) {
  const { colorScheme, palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);
  const holo = HOLO[colorScheme];
  const labelStyle = compact ? styles.labelCompact : styles.label;
  const badgeStyle = compact ? styles.badgeCompact : styles.badge;

  if (Platform.OS === 'web') {
    return (
      <View
        style={[
          styles.wrap,
          badgeStyle,
          {
            backgroundImage: holo.css,
            backgroundSize: '220% 100%',
            animation: 'currentlyBuildingShimmer 4.8s ease-in-out infinite',
          } as object,
        ]}
      >
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
        <NativeShimmer colorScheme={colorScheme} />
        <Text variant="label" style={labelStyle}>
          Currently building
        </Text>
      </LinearGradient>
    </View>
  );
}
