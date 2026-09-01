import { useCallback, useEffect, useState } from 'react';
import {
  LayoutChangeEvent,
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { CountChip } from '@/components/ui/CountChip';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { TabIcon, type TabKey } from '@/components/ui/icons/TabIcons';
import { Text } from '@/components/ui/Text';
import { spacing } from '@/constants/theme';

const HEADER_TABS: { key: TabKey; label: string; countKey?: 'projects' | 'papers' | 'awards' }[] = [
  { key: 'projects', label: 'Projects', countKey: 'projects' },
  { key: 'papers', label: 'Papers', countKey: 'papers' },
  { key: 'awards', label: 'Awards', countKey: 'awards' },
  { key: 'stack', label: 'Stack' },
];

const TAB_WIDTH = 52;
const TAB_WIDTH_COMPACT = 44;
const TAB_PADDING = 4;
const TAB_HEIGHT = 44;

type TabLayout = { x: number; width: number };

type Props = {
  projectsActive?: boolean;
  onProjectsPress: () => void;
  onPapersPress: () => void;
  onAwardsPress: () => void;
  onStackPress: () => void;
  papersOpen?: boolean;
  awardsOpen?: boolean;
  stackOpen?: boolean;
  projectCount?: number;
  paperCount?: number;
  awardCount?: number;
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
  projectCount,
  paperCount,
  awardCount,
}: Props) {
  const { width: screenWidth } = useWindowDimensions();
  const compact = screenWidth < 360;
  const tabWidth = compact ? TAB_WIDTH_COMPACT : TAB_WIDTH;
  const [hoveredTab, setHoveredTab] = useState<TabKey | null>(null);
  const [tabLayouts, setTabLayouts] = useState<TabLayout[]>([]);
  const activeIndex = getActiveIndex(papersOpen, awardsOpen, stackOpen);

  const pillX = useSharedValue(0);
  const pillWidth = useSharedValue(tabWidth);

  const getTabCount = useCallback(
    (countKey?: 'projects' | 'papers' | 'awards') => {
      if (countKey === 'projects') return projectCount;
      if (countKey === 'papers') return paperCount;
      if (countKey === 'awards') return awardCount;
      return undefined;
    },
    [awardCount, paperCount, projectCount],
  );

  const syncPill = useCallback(
    (layouts: TabLayout[], index: number) => {
      const layout = layouts[index];
      if (!layout) return;
      pillX.value = withTiming(layout.x, {
        duration: 260,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      });
      pillWidth.value = withTiming(layout.width, {
        duration: 260,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      });
    },
    [pillWidth, pillX],
  );

  useEffect(() => {
    syncPill(tabLayouts, activeIndex);
  }, [activeIndex, syncPill, tabLayouts]);

  const handleTabLayout = (index: number) => (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    setTabLayouts((prev) => {
      const next = [...prev];
      next[index] = { x, width };
      if (index === activeIndex) {
        syncPill(next, activeIndex);
      }
      return next;
    });
  };

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
        {HEADER_TABS.map((option, index) => {
          const selected = isTabSelected(
            option.key,
            projectsActive,
            papersOpen,
            awardsOpen,
            stackOpen,
          );
          const count = getTabCount(option.countKey);

          return (
            <Pressable
              key={option.key}
              onPress={() => handleTabPress(option.key)}
              onLayout={handleTabLayout(index)}
              style={[
                styles.option,
                selected ? styles.optionActive : styles.optionIdle,
                selected ? null : { width: tabWidth },
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
                <>
                  <Text variant="body" style={styles.optionLabelActive}>
                    {option.label}
                  </Text>
                  {count != null ? <CountChip count={count} /> : null}
                </>
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
  },
  optionIdle: {
    paddingHorizontal: 4,
  },
  optionActive: {
    gap: 6,
    paddingHorizontal: 10,
  },
  optionLabelActive: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0A0A0A',
    flexShrink: 0,
  },
});
