import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { WhatsAppTextMeChip } from '@/components/portfolio/contact/WhatsAppTextMeChip';
import { ProjectDetailContent } from '@/components/portfolio/ProjectDetailContent';
import { ProjectModalStickyHeader } from '@/components/portfolio/ProjectModalHeader';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { Text } from '@/components/ui/Text';
import { getProjectPath } from '@/lib/shareProject';
import { palette, spacing } from '@/constants/tokens';
import { getProject, profile } from '@/data/portfolio';

type Props = {
  slug: string | null;
  onClose: () => void;
};

const SLIDE_MS = 280;
const PANEL_RATIO = 0.95;
const SCROLL_BOTTOM_EXTRA = 100;
const SCROLL_CHIP_THRESHOLD = 80;

export function ProjectModal({ slug, onClose }: Props) {
  const visible = slug !== null;
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const panelWidth = Math.round(screenWidth * PANEL_RATIO);
  const project = slug ? getProject(slug) : undefined;
  const [rendered, setRendered] = useState(false);
  const [chipVisible, setChipVisible] = useState(false);
  const pushedHistory = useRef(false);

  const slideX = useSharedValue(panelWidth);
  const backdropOpacity = useSharedValue(0);
  const chipOpacity = useSharedValue(0);
  const chipTranslateY = useSharedValue(12);

  const handleClose = useCallback(() => {
    if (Platform.OS === 'web' && pushedHistory.current && typeof window !== 'undefined') {
      pushedHistory.current = false;
      window.history.back();
      return;
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!visible || !slug || Platform.OS !== 'web' || typeof window === 'undefined') return;

    const path = getProjectPath(slug);
    if (window.location.pathname !== path) {
      window.history.pushState({ projectModal: slug }, '', path);
      pushedHistory.current = true;
    }

    const onPopState = () => {
      pushedHistory.current = false;
      onClose();
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [visible, slug, onClose]);

  useEffect(() => {
    if (visible) {
      setRendered(true);
      setChipVisible(false);
      chipOpacity.value = 0;
      chipTranslateY.value = 12;
      slideX.value = panelWidth;
      slideX.value = withTiming(0, { duration: SLIDE_MS, easing: Easing.out(Easing.cubic) });
      backdropOpacity.value = withTiming(1, { duration: SLIDE_MS });
      return;
    }

    if (!rendered) return;

    slideX.value = withTiming(panelWidth, { duration: SLIDE_MS, easing: Easing.in(Easing.cubic) }, (finished) => {
      if (finished) runOnJS(setRendered)(false);
    });
    backdropOpacity.value = withTiming(0, { duration: SLIDE_MS });
  }, [visible, panelWidth, rendered, slideX, backdropOpacity, chipOpacity, chipTranslateY]);

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

  useEffect(() => {
    if (!rendered || Platform.OS !== 'web' || typeof window === 'undefined') return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [rendered, handleClose]);

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const chipStyle = useAnimatedStyle(() => ({
    opacity: chipOpacity.value,
    transform: [{ translateY: chipTranslateY.value }],
  }));

  if (!rendered) return null;

  return (
    <Modal visible={rendered} transparent animationType="none" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.frostedBackdrop, backdropStyle]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={handleClose}
            accessibilityLabel="Close project"
          />
        </Animated.View>

        <Animated.View style={[styles.panelWrap, { width: panelWidth }, panelStyle]}>
          <GlassSurface
            rounded={0}
            intensity="panel"
            style={[
              styles.panel,
              {
                paddingBottom: Math.max(insets.bottom, spacing.lg),
              },
            ]}
          >
            {project ? (
              <ProjectModalStickyHeader project={project} onClose={handleClose} />
            ) : null}

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

            {project ? (
              <Animated.View
                pointerEvents={chipVisible ? 'auto' : 'none'}
                style={[
                  styles.chipHost,
                  chipStyle,
                  { bottom: Math.max(insets.bottom, spacing.md) },
                ]}
              >
                <WhatsAppTextMeChip
                  phoneDigits={profile.whatsappPhone}
                  projectTitle={project.title}
                />
              </Animated.View>
            ) : null}
          </GlassSurface>
        </Animated.View>
      </View>
    </Modal>
  );
}

const frostedBackdropWeb = {
  backdropFilter: 'blur(12px) saturate(140%)',
  WebkitBackdropFilter: 'blur(12px) saturate(140%)',
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
} as object;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  frostedBackdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    ...(Platform.OS === 'web' ? frostedBackdropWeb : {}),
  },
  panelWrap: {
    height: '100%',
    zIndex: 1,
    ...(Platform.OS === 'web'
      ? ({
          boxShadow: '-8px 0 40px rgba(0,0,0,0.1)',
        } as object)
      : {}),
  },
  panel: {
    flex: 1,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: palette.border,
    paddingHorizontal: spacing.lg,
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
    ...(Platform.OS === 'web'
      ? ({
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        } as object)
      : {}),
  },
  notFoundHeader: {
    paddingVertical: spacing.lg,
  },
});
