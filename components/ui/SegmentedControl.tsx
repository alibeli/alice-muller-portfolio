import React, { createContext, useCallback, useContext, useState } from 'react';
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  Pressable,
  PressableProps,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Animated, {
  AnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated';

type ItemMeasurements = {
  width: number;
  height: number;
  x: number;
};

type SegmentedControlContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  measurements: Record<string, ItemMeasurements>;
  setMeasurements: (key: string, measurements: ItemMeasurements) => void;
};

const SegmentedControlContext = createContext<SegmentedControlContextValue>({
  value: '',
  onValueChange: () => {},
  measurements: {},
  setMeasurements: () => {},
});

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type SegmentedControlProps = ViewProps & {
  value: string;
  onValueChange: (value: string) => void;
};

function SegmentedControlRoot({ value, onValueChange, style, children, ...props }: SegmentedControlProps) {
  const [measurements, setMeasurementsState] = useState<Record<string, ItemMeasurements>>({});

  const setMeasurements = useCallback((key: string, newMeasurements: ItemMeasurements) => {
    setMeasurementsState((prev) => ({
      ...prev,
      [key]: newMeasurements,
    }));
  }, []);

  return (
    <SegmentedControlContext.Provider
      value={{ value, onValueChange, measurements, setMeasurements }}
    >
      <View style={[styles.root, style]} {...props}>
        {children}
      </View>
    </SegmentedControlContext.Provider>
  );
}

type SegmentedControlItemProps = AnimatedProps<PressableProps> & {
  value: string;
};

function SegmentedControlItem({ value, style, onPress, ...props }: SegmentedControlItemProps) {
  const { onValueChange, setMeasurements, value: activeValue } = useContext(SegmentedControlContext);
  const isActive = activeValue === value;

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height, x } = event.nativeEvent.layout;
      setMeasurements(value, { width, height, x });
    },
    [value, setMeasurements],
  );

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onValueChange(value);
      const userPress = onPress as ((e: GestureResponderEvent) => void) | null | undefined;
      userPress?.(event);
    },
    [value, onValueChange, onPress],
  );

  return (
    <AnimatedPressable
      style={style}
      onLayout={handleLayout}
      onPress={handlePress}
      accessibilityState={{ selected: isActive }}
      {...props}
    />
  );
}

type SegmentedControlIndicatorProps = AnimatedProps<ViewProps> & {
  animationConfig?:
    | { type: 'timing'; config?: WithTimingConfig }
    | { type: 'spring'; config?: WithSpringConfig };
  indicatorStyle?: ViewStyle;
};

function SegmentedControlIndicator({
  style,
  indicatorStyle,
  animationConfig = { type: 'spring', config: { damping: 20, stiffness: 260 } },
  ...props
}: SegmentedControlIndicatorProps) {
  const { value, measurements } = useContext(SegmentedControlContext);
  const activeMeasurements = measurements[value];
  const hasMeasured = useSharedValue(false);
  const reanimatedConfig = animationConfig?.config;

  const animatedStyle = useAnimatedStyle(() => {
    if (!activeMeasurements) {
      return { width: 0, height: 0, left: 0, opacity: 0 };
    }

    if (!hasMeasured.value) {
      hasMeasured.set(true);
      return {
        width: activeMeasurements.width,
        height: activeMeasurements.height,
        left: activeMeasurements.x,
        opacity: 1,
      };
    }

    const animate = (to: number) =>
      animationConfig.type === 'timing'
        ? withTiming(to, reanimatedConfig)
        : withSpring(to, reanimatedConfig);

    return {
      width: animate(activeMeasurements.width),
      height: animate(activeMeasurements.height),
      left: animate(activeMeasurements.x),
      opacity: 1,
    };
  }, [activeMeasurements]);

  return (
    <Animated.View
      style={[styles.indicator, indicatorStyle, animatedStyle, style]}
      {...props}
    />
  );
}

export const SegmentedControl = Object.assign(SegmentedControlRoot, {
  Item: SegmentedControlItem,
  Indicator: SegmentedControlIndicator,
});

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    borderRadius: 999,
  },
});
