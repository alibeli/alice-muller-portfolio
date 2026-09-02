import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/components/ThemeProvider';
import { Text } from '@/components/ui/Text';
import { getMediaAspectRatio, slideHeightForWidth } from '@/lib/mediaAsset';
import { spacing, TOUCH_TARGET_MIN, type ColorPalette, typeScale } from '@/design-system';

export type CarouselSlideLayout = {
  width: number;
  height: number;
  aspectRatio: number;
  onAspectRatioResolved?: (aspectRatio: number) => void;
};

type Props<T> = {
  items: T[];
  renderItem: (item: T, index: number, slide: CarouselSlideLayout) => ReactNode;
  caption?: string;
  slideMaxWidth?: number;
  /** Resolve intrinsic aspect ratio per slide. Falls back to registered metadata or 4:5. */
  getAspectRatio?: (item: T, index: number) => number | null | undefined;
};

const DEFAULT_ASPECT_RATIO = 4 / 5;
const HEIGHT_TRANSITION_MS = 220;

const hideScrollbarWeb = Platform.OS === 'web'
  ? ({
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      touchAction: 'pan-x',
    } as object)
  : {};

function resolveItemAspectRatio<T>(
  item: T,
  index: number,
  getAspectRatio?: (item: T, index: number) => number | null | undefined,
): number {
  const explicit = getAspectRatio?.(item, index);
  if (explicit && explicit > 0) return explicit;

  if (typeof item === 'object' && item !== null && ('uri' in item || !Array.isArray(item))) {
    const fromSource = getMediaAspectRatio(item as never);
    if (fromSource && fromSource > 0) return fromSource;
  }

  return DEFAULT_ASPECT_RATIO;
}

export function SnapCarousel<T>({
  items,
  renderItem,
  caption,
  slideMaxWidth,
  getAspectRatio,
}: Props<T>) {
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);
  const scrollRef = useRef<ScrollView>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const [resolvedAspectRatios, setResolvedAspectRatios] = useState<Record<number, number>>({});

  const slideWidth =
    containerWidth > 0
      ? slideMaxWidth
        ? Math.min(containerWidth, slideMaxWidth)
        : containerWidth
      : 0;

  const aspectRatioForIndex = useCallback(
    (itemIndex: number) => {
      const item = items[itemIndex];
      if (!item) return DEFAULT_ASPECT_RATIO;
      return (
        resolvedAspectRatios[itemIndex] ??
        resolveItemAspectRatio(item, itemIndex, getAspectRatio)
      );
    },
    [getAspectRatio, items, resolvedAspectRatios],
  );

  const slideHeightForIndex = useCallback(
    (itemIndex: number) => {
      if (slideWidth <= 0) return 0;
      return slideHeightForWidth(slideWidth, aspectRatioForIndex(itemIndex));
    },
    [aspectRatioForIndex, slideWidth],
  );

  const activeHeight = slideHeightForIndex(index);
  const maxSlideHeight =
    slideWidth > 0
      ? Math.max(...items.map((_, itemIndex) => slideHeightForIndex(itemIndex)))
      : 0;

  const animatedHeight = useSharedValue(0);

  useEffect(() => {
    if (activeHeight <= 0) return;
    animatedHeight.value = withTiming(activeHeight, {
      duration: HEIGHT_TRANSITION_MS,
      easing: Easing.out(Easing.cubic),
    });
  }, [activeHeight, animatedHeight]);

  useEffect(() => {
    if (activeHeight > 0 && animatedHeight.value === 0) {
      animatedHeight.value = activeHeight;
    }
  }, [activeHeight, animatedHeight]);

  const viewportAnimatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value > 0 ? animatedHeight.value : activeHeight,
  }));

  const onLayout = useCallback((width: number) => {
    if (width > 0) setContainerWidth(width);
  }, []);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (slideWidth <= 0) return;
    const next = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
    if (next !== index && next >= 0 && next < items.length) {
      setIndex(next);
    }
  };

  const goTo = (next: number) => {
    if (slideWidth <= 0 || next < 0 || next >= items.length) return;
    scrollRef.current?.scrollTo({ x: next * slideWidth, animated: true });
    setIndex(next);
  };

  const reportAspectRatio = useCallback((itemIndex: number, aspectRatio: number) => {
    if (!aspectRatio || aspectRatio <= 0) return;
    setResolvedAspectRatios((current) => {
      if (current[itemIndex] === aspectRatio) return current;
      return { ...current, [itemIndex]: aspectRatio };
    });
  }, []);

  const buildSlideLayout = (itemIndex: number): CarouselSlideLayout => {
    const aspectRatio = aspectRatioForIndex(itemIndex);
    const height = slideHeightForWidth(slideWidth, aspectRatio);
    return { width: slideWidth, height, aspectRatio };
  };

  if (items.length === 0) return null;

  if (items.length === 1) {
    const slide = buildSlideLayout(0);
    return (
      <View style={styles.wrap}>
        <View style={[styles.singleSlide, slide.width > 0 ? { width: slide.width } : null]}>
          {renderItem(items[0], 0, slide)}
        </View>
        {caption ? (
          <Text variant="caption" style={styles.caption}>
            {caption}
          </Text>
        ) : null}
      </View>
    );
  }

  return (
    <View
      style={styles.wrap}
      onLayout={(event) => onLayout(event.nativeEvent.layout.width)}
    >
      <Animated.View
        style={[
          styles.viewport,
          slideWidth > 0 ? { width: slideWidth } : styles.hiddenUntilLayout,
          slideWidth > 0 ? viewportAnimatedStyle : null,
        ]}
      >
        {index > 0 ? (
          <Pressable
            style={[styles.navBtn, styles.navPrev]}
            onPress={() => goTo(index - 1)}
            accessibilityLabel="Previous image"
          >
            <Text variant="body" style={styles.navLabel}>
              ‹
            </Text>
          </Pressable>
        ) : null}

        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          decelerationRate="fast"
          snapToInterval={slideWidth > 0 ? slideWidth : undefined}
          snapToAlignment="start"
          disableIntervalMomentum
          nestedScrollEnabled
          directionalLockEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          style={[styles.scroll, hideScrollbarWeb]}
          contentContainerStyle={
            slideWidth > 0
              ? { width: slideWidth * items.length, height: maxSlideHeight }
              : styles.hiddenUntilLayout
          }
          {...(Platform.OS === 'web' ? ({ dataSet: { hideScrollbar: 'true' } } as object) : {})}
        >
          {items.map((item, itemIndex) => {
            const slide = buildSlideLayout(itemIndex);
            return (
              <View
                key={itemIndex}
                style={[
                  styles.slide,
                  slideWidth > 0
                    ? {
                        width: slideWidth,
                        height: maxSlideHeight,
                        paddingTop: Math.max(0, (maxSlideHeight - slide.height) / 2),
                      }
                    : styles.hiddenUntilLayout,
                ]}
              >
                {renderItem(item, itemIndex, {
                  ...slide,
                  onAspectRatioResolved: (aspectRatio: number) =>
                    reportAspectRatio(itemIndex, aspectRatio),
                })}
              </View>
            );
          })}
        </ScrollView>

        {index < items.length - 1 ? (
          <Pressable
            style={[styles.navBtn, styles.navNext]}
            onPress={() => goTo(index + 1)}
            accessibilityLabel="Next image"
          >
            <Text variant="body" style={styles.navLabel}>
              ›
            </Text>
          </Pressable>
        ) : null}
      </Animated.View>

      <View style={styles.dots} pointerEvents="none">
        {items.map((_, dotIndex) => (
          <View key={dotIndex} style={[styles.dot, dotIndex === index && styles.dotActive]} />
        ))}
      </View>

      {caption ? (
        <Text variant="caption" style={styles.caption}>
          {caption}
        </Text>
      ) : null}
    </View>
  );
}

const createStyles = (p: ColorPalette) =>
  StyleSheet.create({
    wrap: {
      gap: spacing.sm,
      width: '100%',
      alignItems: 'center',
    },
    viewport: {
      position: 'relative',
      alignSelf: 'center',
      maxWidth: '100%',
      overflow: 'hidden',
    },
    scroll: {
      width: '100%',
      flex: 1,
    },
    slide: {
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    singleSlide: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    hiddenUntilLayout: {
      opacity: 0,
    },
    navBtn: {
      position: 'absolute',
      top: '50%',
      marginTop: -(TOUCH_TARGET_MIN - 12) / 2,
      width: TOUCH_TARGET_MIN - 12,
      height: TOUCH_TARGET_MIN - 12,
      borderRadius: (TOUCH_TARGET_MIN - 12) / 2,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: p.media.nav,
      zIndex: 2,
    },
    navPrev: {
      left: spacing.sm,
    },
    navNext: {
      right: spacing.sm,
    },
    navLabel: {
      color: p.onOverlay,
      fontSize: typeScale.headlineSmall,
      lineHeight: typeScale.headlineSmall + 2,
      marginTop: -2,
    },
    dots: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: spacing.sm,
      paddingTop: spacing.xs,
    },
    dot: {
      width: spacing.sm,
      height: spacing.sm,
      borderRadius: spacing.xs,
      backgroundColor: p.subtle,
      opacity: 0.45,
    },
    dotActive: {
      backgroundColor: p.foreground,
      opacity: 1,
      width: spacing.md + spacing.xs,
    },
    caption: {
      color: p.muted,
      textAlign: 'center',
    },
  });
