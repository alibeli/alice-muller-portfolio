import { useEffect } from 'react';
import { Image, Platform, StyleSheet, Text } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/components/ThemeProvider';

const diceImage = require('@/assets/images/dice-skeuomorphic.png');

type Props = {
  size?: number;
  color?: string;
  disabled?: boolean;
  /** Increment to trigger a spin animation. */
  spinToken?: number;
};

const SPIN_FAST_MS = 160;
const SPIN_SLOW_MS = 520;
/** Resting orientation so the 3-face reads upright in the skeuomorphic asset. */
const IDLE_ROTATION_DEG = 45;

function DiceGlyph({ size }: { size: number }) {
  return (
    <Image
      source={diceImage}
      style={{ width: size, height: size }}
      resizeMode="contain"
      accessibilityIgnoresInvertColors
    />
  );
}

function DiceFallback({ size, color }: { size: number; color: string }) {
  return <Text style={{ fontSize: size * 0.9, color, lineHeight: size }}>🎲</Text>;
}

export function DiceIcon({ size = 18, color, disabled = false, spinToken = 0 }: Props) {
  const { palette } = useTheme();
  const resolved = disabled ? palette.icon.disabled : (color ?? palette.icon.muted);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (spinToken === 0) return;

    cancelAnimation(rotation);

    const extraTurns = 3 + Math.floor(Math.random() * 2);
    const totalRotation = extraTurns * 360;
    const fastRotation = totalRotation * 0.72;

    rotation.value = 0;
    rotation.value = withSequence(
      withTiming(fastRotation, {
        duration: SPIN_FAST_MS,
        easing: Easing.in(Easing.cubic),
      }),
      withTiming(totalRotation, {
        duration: SPIN_SLOW_MS,
        easing: Easing.out(Easing.cubic),
      }),
      withTiming(0, { duration: 0 }),
    );
  }, [rotation, spinToken]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${IDLE_ROTATION_DEG + rotation.value}deg` }],
    opacity: disabled ? 0.45 : 1,
  }));

  const glyph =
    Platform.OS === 'web' || Platform.OS === 'ios' || Platform.OS === 'android' ? (
      <DiceGlyph size={size} />
    ) : (
      <DiceFallback size={size} color={resolved} />
    );

  return (
    <Animated.View style={[styles.wrap, { width: size, height: size }, animatedStyle]}>
      {glyph}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
