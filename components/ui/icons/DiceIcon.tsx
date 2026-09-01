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

/** Rest pose matches asset: 5 on top, 3 on the side, 1 on the bottom. */
const IDLE_ROTATE_Y = 0;
const IDLE_ROTATE_Z = 0;

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
  const rotateY = useSharedValue(IDLE_ROTATE_Y);
  const rotateZ = useSharedValue(IDLE_ROTATE_Z);

  useEffect(() => {
    if (spinToken === 0) return;

    cancelAnimation(rotateY);
    cancelAnimation(rotateZ);

    const extraTurns = 3 + Math.floor(Math.random() * 2);
    const totalRotation = extraTurns * 360;
    const fastRotation = totalRotation * 0.72;

    rotateY.value = withSequence(
      withTiming(fastRotation, {
        duration: SPIN_FAST_MS,
        easing: Easing.in(Easing.cubic),
      }),
      withTiming(totalRotation, {
        duration: SPIN_SLOW_MS,
        easing: Easing.out(Easing.cubic),
      }),
      withTiming(IDLE_ROTATE_Y, { duration: 0 }),
    );

    rotateZ.value = withSequence(
      withTiming(18, { duration: SPIN_FAST_MS, easing: Easing.inOut(Easing.quad) }),
      withTiming(-10, { duration: SPIN_SLOW_MS * 0.5, easing: Easing.inOut(Easing.quad) }),
      withTiming(IDLE_ROTATE_Z, { duration: SPIN_SLOW_MS * 0.5, easing: Easing.out(Easing.cubic) }),
    );
  }, [rotateY, rotateZ, spinToken]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }, { rotate: `${rotateZ.value}deg` }],
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
