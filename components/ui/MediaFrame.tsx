import { useEffect, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  NativeSyntheticEvent,
  ImageLoadEventData,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { ImageLightbox } from '@/components/ui/ImageLightbox';
import { getMediaAspectRatio } from '@/lib/mediaAsset';
import { radii, spacing } from '@/constants/tokens';

const DEFAULT_MAX_WIDTH = 700;
const FALLBACK_ASPECT_RATIO = 4 / 5;

type Props = {
  source: ImageSourcePropType;
  maxWidth?: number;
  /** Explicit width — used by carousel slides where width is known before layout. */
  width?: number;
  /** Pre-known aspect ratio; skips layout jump when dimensions are registered. */
  aspectRatio?: number;
  zoomable?: boolean;
  caption?: string;
  gallerySources?: ImageSourcePropType[];
  galleryIndex?: number;
  /** Suppress bottom margin — for carousel slides and stacked rows. */
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
  onAspectRatioResolved?: (aspectRatio: number) => void;
};

function getLoadedAspectRatio(event: NativeSyntheticEvent<ImageLoadEventData>): number | null {
  const { source: loadedSource } = event.nativeEvent;
  if (loadedSource?.width && loadedSource?.height) {
    return loadedSource.width / loadedSource.height;
  }

  const target = (event.nativeEvent as { target?: HTMLImageElement }).target;
  if (target?.naturalWidth && target?.naturalHeight) {
    return target.naturalWidth / target.naturalHeight;
  }

  return null;
}

export function MediaFrame({
  source,
  maxWidth = DEFAULT_MAX_WIDTH,
  width,
  aspectRatio: aspectRatioProp,
  zoomable = true,
  caption,
  gallerySources,
  galleryIndex = 0,
  compact = false,
  style,
  onAspectRatioResolved,
}: Props) {
  const knownAspectRatio = aspectRatioProp ?? getMediaAspectRatio(source);
  const [loadedAspectRatio, setLoadedAspectRatio] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(galleryIndex);

  const aspectRatio = knownAspectRatio ?? loadedAspectRatio ?? FALLBACK_ASPECT_RATIO;

  useEffect(() => {
    if (knownAspectRatio && knownAspectRatio > 0) {
      onAspectRatioResolved?.(knownAspectRatio);
    }
  }, [knownAspectRatio, onAspectRatioResolved]);

  const handleLoad = (event: NativeSyntheticEvent<ImageLoadEventData>) => {
    if (knownAspectRatio) return;
    const ratio = getLoadedAspectRatio(event);
    if (ratio && ratio > 0) {
      setLoadedAspectRatio(ratio);
      onAspectRatioResolved?.(ratio);
    }
  };

  const openLightbox = () => {
    if (!zoomable) return;
    setActiveGalleryIndex(galleryIndex);
    setLightboxOpen(true);
  };

  const frameWidth = width ?? '100%';

  const frame = (
    <View
      style={[
        styles.frame,
        compact && styles.frameCompact,
        { maxWidth, width: frameWidth, aspectRatio },
        style,
      ]}
    >
      <Image source={source} style={styles.image} resizeMode="contain" onLoad={handleLoad} />
    </View>
  );

  if (!zoomable) {
    return frame;
  }

  const sources = gallerySources && gallerySources.length > 0 ? gallerySources : [source];

  return (
    <>
      <Pressable
        onPress={openLightbox}
        accessibilityRole="button"
        accessibilityLabel={caption ? `View image: ${caption}` : 'View image full size'}
        style={({ pressed }) => [styles.pressable, compact && styles.pressableCompact, pressed && styles.pressablePressed]}
      >
        {frame}
      </Pressable>

      <ImageLightbox
        visible={lightboxOpen}
        source={source}
        caption={caption}
        gallerySources={sources}
        galleryIndex={activeGalleryIndex}
        onGalleryIndexChange={setActiveGalleryIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  pressable: {
    alignSelf: 'stretch',
    marginBottom: spacing.md,
    ...(Platform.OS === 'web'
      ? ({
          cursor: 'zoom-in',
        } as object)
      : {}),
  },
  pressableCompact: {
    marginBottom: 0,
  },
  pressablePressed: {
    opacity: 0.92,
  },
  frame: {
    alignSelf: 'center',
    width: '100%',
    borderRadius: radii.media,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  frameCompact: {
    alignSelf: 'stretch',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
