import { useCallback, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { WhatsAppTextMeChip } from '@/components/portfolio/contact/WhatsAppTextMeChip';
import { ProjectDetailContent } from '@/components/portfolio/ProjectDetailContent';
import { ProjectModalStickyHeader } from '@/components/portfolio/ProjectModalHeader';
import { SlideOverModal } from '@/components/ui/SlideOverModal';
import { Text } from '@/components/ui/Text';
import { spacing } from '@/constants/tokens';
import { getProject, profile } from '@/data/portfolio';
import { getRightPanelWidth } from '@/lib/modalLayout';

type Props = {
  slug: string | null;
  onClose: () => void;
};

const SCROLL_BOTTOM_EXTRA = 100;
const SCROLL_CHIP_THRESHOLD = 80;

export function ProjectModal({ slug, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const panelWidth = getRightPanelWidth(screenWidth);
  const project = slug ? getProject(slug) : undefined;
  const [chipVisible, setChipVisible] = useState(false);

  const chipOpacity = useSharedValue(0);
  const chipTranslateY = useSharedValue(12);

  const setChipShown = useCallback(
    (show: boolean) => {
      setChipVisible(show);
      chipOpacity.value = withTiming(show ? 1 : 0, { duration: 220, easing: Easing.out(Easing.cubic) });
      chipTranslateY.value = withTiming(show ? 0 : 12, { duration: 220, easing: Easing.out(Easing.cubic) });
    },
    [chipOpacity, chipTranslateY],
  );

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = event.nativeEvent.contentOffset.y;
      const show = y > SCROLL_CHIP_THRESHOLD;
      if (show !== chipVisible) setChipShown(show);
    },
    [chipVisible, setChipShown],
  );

  const chipStyle = useAnimatedStyle(() => ({
    opacity: chipOpacity.value,
    transform: [{ translateY: chipTranslateY.value }],
  }));

  const footer = project ? (
    <Animated.View
      pointerEvents={chipVisible ? 'auto' : 'none'}
      style={[
        styles.chipHost,
        chipStyle,
        {
          bottom: Math.max(insets.bottom, spacing.md),
        },
      ]}
    >
      <WhatsAppTextMeChip phoneDigits={profile.whatsappPhone} projectTitle={project.title} />
    </Animated.View>
  ) : null;

  return (
    <SlideOverModal
      visible={slug !== null}
      onClose={onClose}
      side="right"
      width={panelWidth}
      closeLabel="Close project"
      intensity="panel"
      panelStyle={styles.panel}
      contentStyle={styles.content}
      footer={footer}
    >
      {project ? <ProjectModalStickyHeader project={project} onClose={onClose} /> : null}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {project ? (
          <ProjectDetailContent
            project={project}
            showFooter={false}
            showHero={false}
            showLinks={false}
            inModal
          />
        ) : (
          <View style={styles.notFoundHeader}>
            <Text variant="body" muted>
              Project not found.
            </Text>
          </View>
        )}
      </ScrollView>
    </SlideOverModal>
  );
}

const styles = StyleSheet.create({
  panel: {
    paddingTop: 0,
    paddingHorizontal: spacing.lg,
  },
  content: {
    position: 'relative',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing.md,
    paddingBottom: SCROLL_BOTTOM_EXTRA + 80,
  },
  chipHost: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    zIndex: 2,
  },
  notFoundHeader: {
    paddingVertical: spacing.lg,
  },
});
