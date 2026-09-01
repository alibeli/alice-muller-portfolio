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
}: Props) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(galleryIndex);

  const handleLoad = (event: NativeSyntheticEvent<ImageLoadEventData>) => {
    const ratio = getLoadedAspectRatio(event);
    if (ratio && ratio > 0) setAspectRatio(ratio);
  };

  const openLightbox = () => {
    if (!zoomable) return;
    setActiveGalleryIndex(galleryIndex);
    setLightboxOpen(true);
  };

  const imageContent = (
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

  const sources = gallerySources && gallerySources.length > 0 ? gallerySources : [source];

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
});
