import { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  NativeSyntheticEvent,
  ImageLoadEventData,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { ImageLightbox } from '@/components/ui/ImageLightbox';
import { palette } from '@/constants/tokens';

const DEFAULT_MAX_WIDTH = 700;
const CAROUSEL_HEIGHT = 360;

type Props = {
  source: ImageSourcePropType;
  maxWidth?: number;
  carousel?: boolean;
  zoomable?: boolean;
  caption?: string;
};

function getLoadedAspectRatio(event: NativeSyntheticEvent<ImageLoadEventData>): number | null {
  const { source } = event.nativeEvent;
  if (source?.width && source?.height) {
    return source.width / source.height;
  }

  const target = (event.nativeEvent as { target?: HTMLImageElement }).target;
  if (target?.naturalWidth && target?.naturalHeight) {
    return target.naturalWidth / target.naturalHeight;
  }

  return null;
}

export function ProjectImage({
  source,
  maxWidth = DEFAULT_MAX_WIDTH,
  carousel = false,
  zoomable = true,
  caption,
}: Props) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleLoad = (event: NativeSyntheticEvent<ImageLoadEventData>) => {
    const ratio = getLoadedAspectRatio(event);
    if (ratio && ratio > 0) setAspectRatio(ratio);
  };

  const openLightbox = () => {
    if (zoomable) setLightboxOpen(true);
  };

  const imageContent = carousel ? (
    <View style={[styles.carouselWrap, { width: aspectRatio ? CAROUSEL_HEIGHT * aspectRatio : 200, height: CAROUSEL_HEIGHT }]}>
      <Image
        source={source}
        style={[
          styles.carouselImage,
          { width: aspectRatio ? CAROUSEL_HEIGHT * aspectRatio : 200, height: CAROUSEL_HEIGHT },
        ]}
        resizeMode="contain"
        onLoad={handleLoad}
      />
    </View>
  ) : (
    <View style={[styles.wrap, { maxWidth }]}>
      <Image
        source={source}
        style={[
          styles.image,
          { maxWidth, width: '100%' },
          aspectRatio ? { aspectRatio } : styles.imageFallback,
        ]}
        resizeMode="contain"
        onLoad={handleLoad}
      />
    </View>
  );

  if (!zoomable) {
    return imageContent;
  }

  return (
    <>
      <Pressable
        onPress={openLightbox}
        accessibilityRole="button"
        accessibilityLabel={caption ? `View image: ${caption}` : 'View image full size'}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressablePressed]}
      >
        {imageContent}
      </Pressable>

      <ImageLightbox
        visible={lightboxOpen}
        source={source}
        caption={caption}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  pressable: {
    alignSelf: 'stretch',
    ...(Platform.OS === 'web'
      ? ({
          cursor: 'zoom-in',
        } as object)
      : {}),
  },
  pressablePressed: {
    opacity: 0.92,
  },
  wrap: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: 16,
  },
  image: {
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  imageFallback: {
    minHeight: 200,
  },
  carouselWrap: {
    flexShrink: 0,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: palette.surface,
  },
  carouselImage: {
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
});
