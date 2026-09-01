import { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { GlassSurface } from '@/components/ui/GlassSurface';
import { TabIcon, type TabKey } from '@/components/ui/icons/TabIcons';
import { Text } from '@/components/ui/Text';
import { spacing } from '@/constants/theme';

const HEADER_TABS: { key: TabKey; label: string }[] = [
  { key: 'projects', label: 'Projects' },
  { key: 'papers', label: 'Papers' },
  { key: 'awards', label: 'Awards' },
  { key: 'stack', label: 'Stack' },
];

const TAB_WIDTH = 52;
const TAB_WIDTH_ACTIVE = 108;
const TAB_WIDTH_COMPACT = 44;
const TAB_PADDING = 4;
const TAB_HEIGHT = 44;

type Props = {
  projectsActive?: boolean;
  onProjectsPress: () => void;
  onPapersPress: () => void;
  onAwardsPress: () => void;
  onStackPress: () => void;
  papersOpen?: boolean;
  awardsOpen?: boolean;
  stackOpen?: boolean;
};

function isTabSelected(
  key: TabKey,
  projectsActive: boolean,
  papersOpen: boolean,
  awardsOpen: boolean,
  stackOpen: boolean,
): boolean {
  if (key === 'stack') return stackOpen;
  if (key === 'papers') return papersOpen;
  if (key === 'awards') return awardsOpen;
  return projectsActive;
}

function getPillOffset(activeIndex: number, tabWidth: number): number {
  return activeIndex * tabWidth;
}

function getActiveIndex(papersOpen: boolean, awardsOpen: boolean, stackOpen: boolean): number {
  if (stackOpen) return 3;
  if (awardsOpen) return 2;
  if (papersOpen) return 1;
  return 0;
}

/** Tab pill with skeuomorphic icons — large when idle, shrink on select to reveal label. */
export function FilterHeader({
  projectsActive = true,
  onProjectsPress,
  onPapersPress,
  onAwardsPress,
  onStackPress,
  papersOpen = false,
  awardsOpen = false,
  stackOpen = false,
}: Props) {
  const { width: screenWidth } = useWindowDimensions();
  const compact = screenWidth < 360;
  const tabWidth = compact ? TAB_WIDTH_COMPACT : TAB_WIDTH;
  const tabWidthActive = compact ? TAB_WIDTH_COMPACT : TAB_WIDTH_ACTIVE;
  const [hoveredTab, setHoveredTab] = useState<TabKey | null>(null);
  const activeIndex = getActiveIndex(papersOpen, awardsOpen, stackOpen);

  const pillX = useSharedValue(getPillOffset(activeIndex, tabWidth));
  const pillWidth = useSharedValue(tabWidthActive);

  useEffect(() => {
    pillX.value = withTiming(getPillOffset(activeIndex, tabWidth), {
      duration: 260,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
    pillWidth.value = withTiming(tabWidthActive, {
      duration: 260,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
  }, [activeIndex, pillWidth, pillX, tabWidth, tabWidthActive]);

  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: pillX.value }],
    width: pillWidth.value,
  }));

  const handleTabPress = (key: TabKey) => {
    if (key === 'stack') {
      onStackPress();
      return;
    }
    if (key === 'awards') {
      onAwardsPress();
      return;
    }
    if (key === 'papers') {
      onPapersPress();
      return;
    }
    onProjectsPress();
  };

  const webHoverHandlers = (key: TabKey) =>
    Platform.OS === 'web'
      ? ({
          onMouseEnter: () => setHoveredTab(key),
          onMouseLeave: () => setHoveredTab(null),
        } as object)
      : {};

  return (
    <GlassSurface rounded={999} intensity="medium" style={styles.glassCard}>
      <View style={styles.toggle}>
        <Animated.View style={[styles.pill, pillStyle]} />
        {HEADER_TABS.map((option) => {
          const selected = isTabSelected(
            option.key,
            projectsActive,
            papersOpen,
            awardsOpen,
            stackOpen,
          );
          return (
            <Pressable
              key={option.key}
              onPress={() => handleTabPress(option.key)}
              style={[
                styles.option,
                selected ? styles.optionActive : styles.optionIdle,
                selected ? { width: tabWidthActive } : { width: tabWidth },
              ]}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              accessibilityLabel={option.label}
              {...webHoverHandlers(option.key)}
            >
              <TabIcon
                tab={option.key}
                selected={selected}
                hovered={hoveredTab === option.key}
              />
              {selected && !compact ? (
                <Text variant="body" style={styles.optionLabelActive} numberOfLines={1}>
                  {option.label}
                </Text>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  glassCard: {
    padding: TAB_PADDING,
    ...(Platform.OS === 'web'
      ? ({
          boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
        } as object)
      : {}),
  },
  toggle: {
    flexDirection: 'row',
    position: 'relative',
    height: TAB_HEIGHT,
  },
  pill: {
    position: 'absolute',
    top: 0,
    left: TAB_PADDING,
    height: TAB_HEIGHT,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  option: {
    height: TAB_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    paddingHorizontal: 4,
  },
  optionIdle: {},
  optionActive: {
    gap: spacing.xs,
    paddingHorizontal: 8,
  },
  optionLabelActive: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0A0A0A',
    flexShrink: 1,
  },
});
