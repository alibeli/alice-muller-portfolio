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

export function DiceIcon({ size = 18, color = '#737373', disabled = false, spinToken = 0 }: Props) {
  const rotation = useSharedValue(0);
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (spinToken === 0) return;

    cancelAnimation(rotation);
    cancelAnimation(rotateX);
    cancelAnimation(rotateY);
    cancelAnimation(scale);

    const extraTurns = 3 + Math.floor(Math.random() * 2);
    const landing = (Math.floor(Math.random() * 4) * 90) % 360;
    const totalRotation = extraTurns * 360 + landing;
    const fastRotation = totalRotation * 0.72;
    const tumbleX = 360 + Math.floor(Math.random() * 2) * 180;
    const tumbleY = 270 + Math.floor(Math.random() * 2) * 180;

    rotation.value = 0;
    rotateX.value = 0;
    rotateY.value = 0;

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

    rotateX.value = withSequence(
      withTiming(tumbleX * 0.7, { duration: SPIN_FAST_MS, easing: Easing.in(Easing.quad) }),
      withTiming(tumbleX, { duration: SPIN_SLOW_MS, easing: Easing.out(Easing.cubic) }),
      withTiming(0, { duration: 0 }),
    );

    rotateY.value = withSequence(
      withTiming(tumbleY * 0.65, { duration: SPIN_FAST_MS, easing: Easing.in(Easing.quad) }),
      withTiming(tumbleY, { duration: SPIN_SLOW_MS, easing: Easing.out(Easing.cubic) }),
      withTiming(0, { duration: 0 }),
    );

    scale.value = withSequence(
      withTiming(0.88, { duration: SPIN_FAST_MS, easing: Easing.in(Easing.quad) }),
      withTiming(1.08, { duration: SPIN_SLOW_MS * 0.55, easing: Easing.out(Easing.cubic) }),
      withTiming(1, { duration: SPIN_SLOW_MS * 0.45, easing: Easing.out(Easing.back(1.35)) }),
    );
  }, [rotateX, rotateY, rotation, scale, spinToken]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 500 },
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
    opacity: disabled ? 0.45 : 1,
  }));

  const glyph =
    Platform.OS === 'web' || Platform.OS === 'ios' || Platform.OS === 'android' ? (
      <DiceGlyph size={size} />
    ) : (
      <DiceFallback size={size} color={disabled ? '#A3A3A3' : color} />
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
