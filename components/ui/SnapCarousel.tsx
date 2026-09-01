import { useCallback, useRef, useState, type ReactNode } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { Text } from '@/components/ui/Text';
import { palette, spacing } from '@/constants/tokens';

export type CarouselSlideLayout = {
  width: number;
  height: number;
};

type Props<T> = {
  items: T[];
  renderItem: (item: T, index: number, slide: CarouselSlideLayout) => ReactNode;
  caption?: string;
  slideMaxWidth?: number;
  /** Height ratio relative to slide width (default 0.62). */
  slideHeightRatio?: number;
};

const DEFAULT_SLIDE_HEIGHT_RATIO = 0.62;

const hideScrollbarWeb = Platform.OS === 'web'
  ? ({
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      touchAction: 'pan-x',
    } as object)
  : {};

function slideHeightForWidth(width: number, ratio: number): number {
  return Math.max(Math.round(width * ratio), 240);
}

export function SnapCarousel<T>({
  items,
  renderItem,
  caption,
  slideMaxWidth,
  slideHeightRatio = DEFAULT_SLIDE_HEIGHT_RATIO,
}: Props<T>) {
  const scrollRef = useRef<ScrollView>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [index, setIndex] = useState(0);

  const slideWidth =
    containerWidth > 0
      ? slideMaxWidth
        ? Math.min(containerWidth, slideMaxWidth)
        : containerWidth
      : 0;

  const slideHeight = slideWidth > 0 ? slideHeightForWidth(slideWidth, slideHeightRatio) : 0;
  const slideLayout: CarouselSlideLayout = { width: slideWidth, height: slideHeight };

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

  if (items.length === 0) return null;

  if (items.length === 1) {
    return (
      <View style={styles.wrap}>
        <View style={[styles.singleSlide, slideWidth > 0 ? { width: slideWidth, height: slideHeight } : null]}>
          {renderItem(items[0], 0, slideLayout)}
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
      <View style={[styles.viewport, slideWidth > 0 ? { width: slideWidth } : styles.hiddenUntilLayout]}>
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
          style={[styles.scroll, slideHeight > 0 ? { height: slideHeight } : null, hideScrollbarWeb]}
          contentContainerStyle={
            slideWidth > 0
              ? { width: slideWidth * items.length, height: slideHeight }
              : styles.hiddenUntilLayout
          }
          {...(Platform.OS === 'web' ? ({ dataSet: { hideScrollbar: 'true' } } as object) : {})}
        >
          {items.map((item, i) => (
            <View
              key={i}
              style={[
                styles.slide,
                slideWidth > 0 ? { width: slideWidth, height: slideHeight } : styles.hiddenUntilLayout,
              ]}
            >
              {renderItem(item, i, slideLayout)}
            </View>
          ))}
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
      </View>

      <View style={styles.dots} pointerEvents="none">
        {items.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
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

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
    width: '100%',
    alignItems: 'center',
  },
  viewport: {
    position: 'relative',
    alignSelf: 'center',
    maxWidth: '100%',
  },
  scroll: {
    width: '100%',
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: -18,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    zIndex: 2,
  },
  navPrev: {
    left: spacing.sm,
  },
  navNext: {
    right: spacing.sm,
  },
  navLabel: {
    color: palette.white,
    fontSize: 24,
    lineHeight: 26,
    marginTop: -2,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    paddingTop: spacing.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.subtle,
    opacity: 0.45,
  },
  dotActive: {
    backgroundColor: palette.foreground,
    opacity: 1,
    width: 18,
  },
  caption: {
    color: palette.muted,
    textAlign: 'center',
  },
});
