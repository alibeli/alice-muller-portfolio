import { useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, Href } from 'expo-router';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { CurrentlyBuildingBadge } from '@/components/ui/CurrentlyBuildingBadge';
import { TileTextGlass } from '@/components/ui/HeroGlassMask';
import { Text } from '@/components/ui/Text';
import { getPaperGradient, paperGradientCss, PLACEHOLDER_GRADIENT } from '@/data/paperGradients';
import type { GridItem } from '@/data/portfolio';
import { formatProjectPeriod } from '@/lib/projectLinks';
import { motion, palette, radii, spacing, tileText } from '@/constants/tokens';

type Props = {
  item: GridItem;
  size: number;
  /** Opens project in slide-over modal instead of navigating. */
  onProjectPress?: (slug: string) => void;
  /** Opens paper in left slide-over modal instead of navigating. */
  onPaperPress?: (slug: string) => void;
};

function gradientPoints(angle = 135) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    start: { x: 0.5 - Math.cos(rad) * 0.5, y: 0.5 - Math.sin(rad) * 0.5 },
    end: { x: 0.5 + Math.cos(rad) * 0.5, y: 0.5 + Math.sin(rad) * 0.5 },
  };
}

function preloadImages(uris: string[]) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  uris.forEach((uri) => {
    const img = new window.Image();
    img.src = uri;
  });
}

function PaperGradientBackground({ slug }: { slug: string }) {
  const gradient = getPaperGradient(slug);

  if (Platform.OS === 'web') {
    return (
      <View
        style={[
          styles.mediaFill,
          { backgroundImage: paperGradientCss(slug) } as object,
        ]}
      />
    );
  }

  const { start, end } = gradientPoints(gradient.angle);
  return (
    <LinearGradient colors={gradient.colors} start={start} end={end} style={styles.mediaFill} />
  );
}

function PlaceholderBackground() {
  if (Platform.OS === 'web') {
    return (
      <View
        style={[
          styles.mediaFill,
          { backgroundImage: paperGradientCss('placeholder') } as object,
        ]}
      />
    );
  }

  const { start, end } = gradientPoints(PLACEHOLDER_GRADIENT.angle);
  return (
    <LinearGradient
      colors={PLACEHOLDER_GRADIENT.colors}
      start={start}
      end={end}
      style={styles.mediaFill}
    />
  );
}

function CarouselDots({ count, index }: { count: number; index: number }) {
  if (count <= 1) return null;

  return (
    <View style={[styles.dots, { pointerEvents: 'none' }]}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
      ))}
    </View>
  );
}

export function ProjectGridTile({ item, size, onProjectPress, onPaperPress }: Props) {
  const isPaper = item.kind === 'paper';
  const images = !isPaper && item.images.length > 0 ? item.images : [];
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoverProgress = useSharedValue(0);

  const href: Href =
    item.kind === 'project' ? `/project/${item.slug}` : `/paper/${item.slug}`;

  const cycleImage = () => {
    if (images.length <= 1) return;
    setIndex((prev) => (prev + 1) % images.length);
  };

  const startCycle = () => {
    if (Platform.OS !== 'web' || images.length <= 1) return;
    preloadImages(images);
    cycleImage();
    intervalRef.current = setInterval(cycleImage, motion.carousel.intervalMs);
  };

  const stopCycle = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIndex(0);
  };

  const setHover = (active: boolean) => {
    setIsHovering(active);
    hoverProgress.value = withTiming(active ? 1 : 0, {
      duration: active ? motion.tileHover.durationMs : 320,
      easing: Easing.out(Easing.cubic),
    });
    if (active) startCycle();
    else stopCycle();
  };

  useEffect(() => () => stopCycle(), []);

  const webHoverProps =
    Platform.OS === 'web'
      ? ({
          onMouseEnter: () => setHover(true),
          onMouseLeave: () => setHover(false),
        } as object)
      : {};

  const imageSource: ImageSourcePropType | null =
    images[index] ? { uri: images[index] } : (item.thumbnailLocal ?? null);

  const taglineFullHeight = useSharedValue(0);
  const taglineLineHeight = (tileText.tagline.lineHeight as number) ?? 18;
  const taglineCollapsedHeight = taglineLineHeight * 2;

  const imageAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + hoverProgress.value * (motion.tileHover.imageScale - 1) }],
  }));

  const taglineClipStyle = useAnimatedStyle(() => {
    const full = taglineFullHeight.value || taglineCollapsedHeight;
    const extra = Math.max(0, full - taglineCollapsedHeight);
    return {
      maxHeight: taglineCollapsedHeight + hoverProgress.value * extra,
    };
  });

  const openInModal =
    (item.kind === 'project' && onProjectPress) || (item.kind === 'paper' && onPaperPress);

  const handlePress = () => {
    if (item.kind === 'project' && onProjectPress) onProjectPress(item.slug);
    if (item.kind === 'paper' && onPaperPress) onPaperPress(item.slug);
  };

  const tileContent = (
    <View style={[styles.tile, { width: size, height: size }]}>
      <View style={styles.mediaStage}>
        {isPaper ? (
          <PaperGradientBackground slug={item.slug} />
        ) : imageSource ? (
          <Animated.View style={[styles.imageStage, imageAnimStyle]}>
            <Image source={imageSource} style={styles.coverImage} resizeMode="cover" />
          </Animated.View>
        ) : (
          <PlaceholderBackground />
        )}
      </View>

      {isHovering && images.length > 1 ? (
        <CarouselDots count={images.length} index={index} />
      ) : null}

      {item.badge === 'currently-building' ? (
        <View style={styles.badgeWrap} pointerEvents="none">
          <CurrentlyBuildingBadge compact />
        </View>
      ) : null}

      <View style={styles.textBlock} pointerEvents="none">
        <View style={styles.textInner}>
          <TileTextGlass roundedTop={radii.tile} />
          <Text style={tileText.period} numberOfLines={1}>
            {formatProjectPeriod(item.period)}
          </Text>
          <Text style={tileText.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Animated.View style={[styles.taglineClip, taglineClipStyle]}>
            <Text
              style={tileText.tagline}
              onLayout={(e) => {
                taglineFullHeight.value = e.nativeEvent.layout.height;
              }}
            >
              {item.tagline}
            </Text>
          </Animated.View>
          {item.traction ? (
            <Text style={tileText.traction} numberOfLines={2}>
              {item.traction}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );

  return (
    <View
      {...webHoverProps}
      style={[styles.tileWrap, { width: size }]}
    >
      {openInModal ? (
        <Pressable
          style={({ pressed }) => [pressed && styles.pressed]}
          onPress={handlePress}
        >
          {tileContent}
        </Pressable>
      ) : (
        <Link href={href} asChild>
          <Pressable style={({ pressed }) => [pressed && styles.pressed]}>{tileContent}</Pressable>
        </Link>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: radii.tile,
    overflow: 'hidden',
    backgroundColor: palette.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.tileBorder,
  },
  tileWrap: {
    borderRadius: radii.tile,
  },
  pressed: {
    opacity: 0.94,
  },
  mediaStage: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  mediaFill: {
    ...StyleSheet.absoluteFill,
  },
  imageStage: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  textBlock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    backgroundColor: 'transparent',
  },
  textInner: {
    padding: spacing.md,
    gap: 3,
    position: 'relative',
    backgroundColor: 'transparent',
    borderTopLeftRadius: radii.tile,
    borderTopRightRadius: radii.tile,
    overflow: 'hidden',
  },
  taglineClip: {
    overflow: 'hidden',
  },
  badgeWrap: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    zIndex: 3,
  },
  dots: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    gap: 4,
    zIndex: 3,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
  },
  dotActive: {
    backgroundColor: palette.foreground,
    width: 12,
  },
});
