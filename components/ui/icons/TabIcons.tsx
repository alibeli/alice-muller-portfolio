import { useEffect } from 'react';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export type TabKey = 'projects' | 'papers' | 'awards' | 'stack';

export const ICON_SIZE_LARGE = 38;
export const ICON_SIZE_SMALL = 26;
const HOVER_SCALE = 1.14;

const tabIconSources: Record<TabKey, ImageSourcePropType> = {
  projects: require('@/assets/icons/icon-projects.png'),
  papers: require('@/assets/icons/icon-papers.png'),
  awards: require('@/assets/icons/icon-awards.png'),
  stack: require('@/assets/icons/icon-stack.png'),
};

type Props = {
  tab: TabKey;
  selected?: boolean;
  hovered?: boolean;
};

export function TabIcon({ tab, selected = false, hovered = false }: Props) {
  const size = useSharedValue(selected ? ICON_SIZE_SMALL : ICON_SIZE_LARGE);
  const hoverScale = useSharedValue(1);

  useEffect(() => {
    size.value = withTiming(selected ? ICON_SIZE_SMALL : ICON_SIZE_LARGE, {
      duration: 220,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
  }, [selected, size]);

  useEffect(() => {
    hoverScale.value = withTiming(hovered ? HOVER_SCALE : 1, {
      duration: 180,
      easing: Easing.out(Easing.cubic),
    });
  }, [hovered, hoverScale]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: size.value,
    height: size.value,
    transform: [{ scale: hoverScale.value }],
  }));

  return (
    <Animated.Image
      source={tabIconSources[tab]}
      style={[styles.icon, animatedStyle]}
      resizeMode="contain"
    />
  );
}

export function ModalTabIcon({ tab }: { tab: TabKey }) {
  return (
    <Animated.Image
      source={tabIconSources[tab]}
      style={[styles.icon, { width: ICON_SIZE_SMALL, height: ICON_SIZE_SMALL }]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'transparent',
  },
});
