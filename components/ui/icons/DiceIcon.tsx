import { useCallback, useEffect, useRef } from 'react';
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
  /** Play a quick twitch when the pointer enters the dice. */
  hovered?: boolean;
  /** Occasional idle twitch so the dice feels alive. */
  idleWink?: boolean;
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

export function DiceIcon({
  size = 18,
  color,
  disabled = false,
  spinToken = 0,
  hovered = false,
  idleWink = false,
}: Props) {
  const { palette } = useTheme();
  const resolved = disabled ? palette.icon.disabled : (color ?? palette.icon.muted);
  const rotation = useSharedValue(0);
  const winkRotate = useSharedValue(0);
  const winkScaleY = useSharedValue(1);
  const wasHovered = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerWink = useCallback(() => {
    if (disabled) return;

    cancelAnimation(winkRotate);
    cancelAnimation(winkScaleY);

    winkRotate.value = withSequence(
      withTiming(-11, { duration: 90, easing: Easing.out(Easing.quad) }),
      withTiming(8, { duration: 100, easing: Easing.inOut(Easing.quad) }),
      withTiming(-3, { duration: 80, easing: Easing.inOut(Easing.quad) }),
      withTiming(0, { duration: 120, easing: Easing.out(Easing.cubic) }),
    );
    winkScaleY.value = withSequence(
      withTiming(0.86, { duration: 90, easing: Easing.out(Easing.quad) }),
      withTiming(1.05, { duration: 110, easing: Easing.out(Easing.back(1.4)) }),
      withTiming(1, { duration: 160, easing: Easing.out(Easing.cubic) }),
    );
  }, [disabled, winkRotate, winkScaleY]);

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

  useEffect(() => {
    if (disabled) return;
    if (hovered && !wasHovered.current) {
      triggerWink();
    }
    wasHovered.current = hovered;
  }, [disabled, hovered, triggerWink]);

  useEffect(() => {
    if (disabled || !idleWink) return;

    const scheduleIdleWink = () => {
      const delay = 9000 + Math.floor(Math.random() * 5000);
      idleTimerRef.current = setTimeout(() => {
        triggerWink();
        scheduleIdleWink();
      }, delay);
    };

    idleTimerRef.current = setTimeout(() => {
      triggerWink();
      scheduleIdleWink();
    }, 2800);

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };
  }, [disabled, idleWink, triggerWink]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${IDLE_ROTATION_DEG + rotation.value + winkRotate.value}deg` },
      { scaleY: winkScaleY.value },
    ],
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
