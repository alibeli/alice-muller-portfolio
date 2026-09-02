import { useEffect, useMemo, useRef, useState } from 'react';
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

import { ProjectLinkChip } from '@/components/portfolio/ProjectLinkChip';
import { ProjectPeriodMeta } from '@/components/portfolio/ProjectPeriodMeta';
import { useTheme } from '@/components/ThemeProvider';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { Text } from '@/components/ui/Text';
import { getPaperGradient, paperGradientCss, PLACEHOLDER_GRADIENT } from '@/data/paperGradients';
import type { GridItem } from '@/data/portfolio';
import { getThumbnailFocalPoint } from '@/data/localImages';
import { formatProjectPeriod } from '@/lib/projectLinks';
import { getTileText, motion, radii, spacing, type ColorPalette } from '@/design-system';

type Props = {
  item: GridItem;
  size: number;
  /** Defaults to square (`size`). Use on mobile for taller portrait tiles. */
  height?: number;
  /** Frosted caption band on thumbnail — top on mobile for scroll-snap readability. */
  captionPlacement?: 'top' | 'bottom';
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

export function ProjectGridTile({
  item,
  size,
  height,
  captionPlacement = 'bottom',
  onProjectPress,
  onPaperPress,
}: Props) {
  const { palette } = useTheme();
  const tileText = useMemo(() => getTileText(palette), [palette]);
  const styles = useMemo(() => createTileStyles(palette), [palette]);

  const tileHeight = height ?? size;
  const captionOnTop = captionPlacement === 'top';
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

  const focalPoint = getThumbnailFocalPoint(item.slug);

  const imageAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + hoverProgress.value * (motion.tileHover.imageScale - 1) }],
  }));

  const openInModal =
    (item.kind === 'project' && onProjectPress) || (item.kind === 'paper' && onPaperPress);

  const handlePress = () => {
    if (item.kind === 'project' && onProjectPress) onProjectPress(item.slug);
    if (item.kind === 'paper' && onPaperPress) onPaperPress(item.slug);
  };

  const tileContent = (
    <View style={[styles.tile, { width: size, height: tileHeight }]}>
      <View style={styles.mediaStage}>
        {isPaper ? (
          <PaperGradientBackground slug={item.slug} />
        ) : imageSource ? (
          <Animated.View style={[styles.imageStage, imageAnimStyle]}>
            <Image
              source={imageSource}
              style={[
                styles.coverImage,
                focalPoint && Platform.OS === 'web'
                  ? ({ objectFit: 'cover', objectPosition: focalPoint } as object)
                  : null,
              ]}
              resizeMode="cover"
            />
          </Animated.View>
        ) : (
          <PlaceholderBackground />
        )}
      </View>

      <GlassSurface
        intensity="medium"
        borderless
        rounded={radii.tile}
        roundedCorners={captionOnTop ? 'bottom' : 'top'}
        pointerEvents="box-none"
        style={[styles.textBlock, captionOnTop ? styles.textBlockTop : styles.textBlockBottom]}
      >
        <View style={styles.textInner}>
          {item.badge === 'currently-building' ? (
            <ProjectPeriodMeta project={item} />
          ) : (
            <Text style={tileText.period} numberOfLines={1}>
              {formatProjectPeriod(item.period)}
            </Text>
          )}
          <Text style={tileText.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={tileText.tagline} numberOfLines={2}>
            {item.tagline}
          </Text>
          {item.traction ? (
            <Text style={tileText.traction} numberOfLines={2}>
              {item.traction}
            </Text>
          ) : null}
          {item.link ? (
            <ProjectLinkChip
              label={item.link.label}
              url={item.link.url}
              projectTitle={item.title}
              style={styles.linkPill}
            />
          ) : null}
        </View>
      </GlassSurface>
    </View>
  );

  return (
    <View
      {...webHoverProps}
      style={[
        styles.tileWrap,
        { width: size },
        isHovering && Platform.OS === 'web' && styles.tileWrapHovered,
      ]}
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

function createTileStyles(p: ColorPalette) {
  return StyleSheet.create({
    tile: {
      borderRadius: radii.tileOuter,
      overflow: 'hidden',
      backgroundColor: p.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: p.tileBorder,
    },
    tileWrap: {
      borderRadius: radii.tileOuter,
      overflow: 'hidden',
    },
    tileWrapHovered: {
      zIndex: 20,
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
      overflow: 'hidden',
    },
    coverImage: {
      width: '100%',
      height: '100%',
    },
    textBlock: {
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: 2,
    },
    textBlockTop: {
      top: 0,
    },
    textBlockBottom: {
      bottom: 0,
    },
    textInner: {
      padding: spacing.md,
      gap: spacing.xxs,
      pointerEvents: 'box-none',
    },
    linkPill: {
      alignSelf: 'flex-start',
      marginTop: spacing.xxs,
    },
  });
}

const styles = StyleSheet.create({
  mediaFill: {
    ...StyleSheet.absoluteFill,
  },
});
