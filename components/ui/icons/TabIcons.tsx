import { useEffect } from 'react';
import { Image, StyleSheet, Text as RNText } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export type TabKey = 'projects' | 'papers' | 'awards' | 'stack';

export const ICON_SIZE_LARGE = 38;
export const ICON_SIZE_SMALL = 26;
export const MODAL_ICON_SIZE = 22;
const HOVER_SCALE = 1.14;

const tabIconSources = {
  projects: require('@/assets/icons/icon-projects.png'),
  papers: require('@/assets/icons/icon-papers.png'),
  awards: require('@/assets/icons/icon-awards.png'),
} as const;

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

  if (tab === 'stack') {
    return (
      <Animated.View style={[styles.emojiWrap, animatedStyle]}>
        <RNText style={[styles.emoji, selected && styles.emojiSelected]} allowFontScaling={false}>
          🛠️
        </RNText>
      </Animated.View>
    );
  }

  return (
    <Animated.Image
      source={tabIconSources[tab]}
      style={[styles.icon, animatedStyle]}
      resizeMode="contain"
    />
  );
}

/** Static tab icon for slide-over modal headers. */
export function ModalTabIcon({ tab }: { tab: TabKey }) {
  if (tab === 'stack') {
    return (
      <RNText style={styles.modalEmoji} allowFontScaling={false}>
        🛠️
      </RNText>
    );
  }

  return (
    <Image
      source={tabIconSources[tab]}
      style={styles.modalIcon}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'transparent',
  },
  emojiWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  emoji: {
    fontSize: ICON_SIZE_LARGE,
    lineHeight: ICON_SIZE_LARGE + 4,
    backgroundColor: 'transparent',
  },
  emojiSelected: {
    fontSize: ICON_SIZE_SMALL,
    lineHeight: ICON_SIZE_SMALL + 4,
  },
  modalIcon: {
    width: MODAL_ICON_SIZE,
    height: MODAL_ICON_SIZE,
    backgroundColor: 'transparent',
  },
  modalEmoji: {
    fontSize: MODAL_ICON_SIZE,
    lineHeight: MODAL_ICON_SIZE + 2,
    backgroundColor: 'transparent',
  },
});
