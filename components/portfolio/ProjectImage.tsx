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

type Props = {
  source: ImageSourcePropType;
  maxWidth?: number;
  zoomable?: boolean;
  caption?: string;
  gallerySources?: ImageSourcePropType[];
  galleryIndex?: number;
  /** Fixed-height carousel slide: image fills slide and stays centered. */
  variant?: 'inline' | 'carousel';
  slideHeight?: number;
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
  zoomable = true,
  caption,
  gallerySources,
  galleryIndex = 0,
  variant = 'inline',
  slideHeight,
}: Props) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(galleryIndex);

  const handleLoad = (event: NativeSyntheticEvent<ImageLoadEventData>) => {
    if (variant === 'carousel') return;
    const ratio = getLoadedAspectRatio(event);
    if (ratio && ratio > 0) setAspectRatio(ratio);
  };

  const openLightbox = () => {
    if (!zoomable) return;
    setActiveGalleryIndex(galleryIndex);
    setLightboxOpen(true);
  };

  const isCarousel = variant === 'carousel';
  const frameHeight = slideHeight ?? 420;

  const imageContent = (
    <View
      style={[
        styles.wrap,
        { maxWidth },
        isCarousel && styles.carouselWrap,
        isCarousel ? { height: frameHeight, maxWidth } : null,
      ]}
    >
      <Image
        source={source}
        style={[
          styles.image,
          isCarousel
            ? styles.carouselImage
            : [{ maxWidth, width: '100%' }, aspectRatio ? { aspectRatio } : styles.imageFallback],
        ]}
        resizeMode="contain"
        onLoad={handleLoad}
      />
    </View>
  );

  if (!zoomable) {
    return imageContent;
  }

  const sources = gallerySources && gallerySources.length > 0 ? gallerySources : [source];

  return (
    <>
      <Pressable
        onPress={openLightbox}
        accessibilityRole="button"
        accessibilityLabel={caption ? `View image: ${caption}` : 'View image full size'}
        style={({ pressed }) => [
          styles.pressable,
          isCarousel && styles.carouselPressable,
          pressed && styles.pressablePressed,
        ]}
      >
        {imageContent}
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
    ...(Platform.OS === 'web'
      ? ({
          cursor: 'zoom-in',
        } as object)
      : {}),
  },
  carouselPressable: {
    width: '100%',
    height: '100%',
  },
  pressablePressed: {
    opacity: 0.92,
  },
  wrap: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: 16,
  },
  carouselWrap: {
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  imageFallback: {
    minHeight: 200,
  },
});
