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
      : (['rgba(255,255,255,0)', 'rgba(255,255,255,0.18)', 'rgba(255,255,255,0)'] as const);

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
