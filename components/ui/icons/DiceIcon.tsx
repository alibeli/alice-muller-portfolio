import { createElement, useEffect } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  size?: number;
  color?: string;
  disabled?: boolean;
  /** Increment to trigger a spin animation. */
  spinToken?: number;
};

function DiceGlyph({ size, color }: { size: number; color: string }) {
  if (Platform.OS === 'web') {
    return createElement(
      'svg',
      {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      createElement('rect', {
        x: 3,
        y: 3,
        width: 18,
        height: 18,
        rx: 4,
        stroke: color,
        strokeWidth: 1.6,
        fill: 'transparent',
      }),
      createElement('circle', { cx: 8, cy: 8, r: 1.35, fill: color }),
      createElement('circle', { cx: 16, cy: 8, r: 1.35, fill: color }),
      createElement('circle', { cx: 12, cy: 12, r: 1.35, fill: color }),
      createElement('circle', { cx: 8, cy: 16, r: 1.35, fill: color }),
      createElement('circle', { cx: 16, cy: 16, r: 1.35, fill: color }),
    );
  }

  return <Text style={{ fontSize: size * 0.9, color, lineHeight: size }}>🎲</Text>;
}

const SPIN_FAST_MS = 160;
const SPIN_SLOW_MS = 520;

export function DiceIcon({ size = 18, color = '#737373', disabled = false, spinToken = 0 }: Props) {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const iconColor = disabled ? '#A3A3A3' : color;

  useEffect(() => {
    if (spinToken === 0) return;

    cancelAnimation(rotation);
    cancelAnimation(scale);

    const extraTurns = 3 + Math.floor(Math.random() * 2);
    const landing = (Math.floor(Math.random() * 4) * 90) % 360;
    const totalRotation = extraTurns * 360 + landing;
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
      withTiming(landing, { duration: 0 }),
    );

    scale.value = withSequence(
      withTiming(0.88, { duration: SPIN_FAST_MS, easing: Easing.in(Easing.quad) }),
      withTiming(1.06, { duration: SPIN_SLOW_MS * 0.55, easing: Easing.out(Easing.cubic) }),
      withTiming(1, { duration: SPIN_SLOW_MS * 0.45, easing: Easing.out(Easing.back(1.35)) }),
    );
  }, [rotation, scale, spinToken]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
    opacity: disabled ? 0.45 : 1,
  }));

  return (
    <Animated.View style={[styles.wrap, { width: size, height: size }, animatedStyle]}>
      <DiceGlyph size={size} color={iconColor} />
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
