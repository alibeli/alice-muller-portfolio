import { useCallback, useRef, useState, type ReactNode } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

import { Text } from '@/components/ui/Text';
import { palette, spacing } from '@/constants/tokens';

type Props<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  caption?: string;
  slideMaxWidth?: number;
};

const hideScrollbarWeb = Platform.OS === 'web'
  ? ({
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    } as object)
  : {};

export function SnapCarousel<T>({ items, renderItem, caption, slideMaxWidth }: Props<T>) {
  const { width: screenWidth } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const [index, setIndex] = useState(0);

  const contentWidth = slideMaxWidth
    ? Math.min(slideWidth || screenWidth, slideMaxWidth)
    : slideWidth;

  const onLayout = useCallback((width: number) => {
    if (width > 0) setSlideWidth(width);
  }, []);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (contentWidth <= 0) return;
    const next = Math.round(event.nativeEvent.contentOffset.x / contentWidth);
    if (next !== index && next >= 0 && next < items.length) {
      setIndex(next);
    }
  };

  if (items.length === 0) return null;

  if (items.length === 1) {
    return (
      <View style={styles.wrap}>
        <View style={styles.singleSlide}>{renderItem(items[0], 0)}</View>
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
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={contentWidth > 0 ? contentWidth : undefined}
        snapToAlignment="center"
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={[styles.scroll, hideScrollbarWeb]}
        {...(Platform.OS === 'web' ? ({ dataSet: { hideScrollbar: 'true' } } as object) : {})}
        contentContainerStyle={contentWidth > 0 ? undefined : styles.hiddenUntilLayout}
      >
        {items.map((item, i) => (
          <View
            key={i}
            style={[
              styles.slide,
              contentWidth > 0 ? { width: contentWidth } : styles.hiddenUntilLayout,
            ]}
          >
            {renderItem(item, i)}
          </View>
        ))}
      </ScrollView>

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
    width: '100%',
  },
  hiddenUntilLayout: {
    opacity: 0,
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
