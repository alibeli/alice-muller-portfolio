import { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  NativeSyntheticEvent,
  ImageLoadEventData,
  StyleSheet,
  View,
} from 'react-native';

import { palette } from '@/constants/tokens';

const DEFAULT_MAX_WIDTH = 700;
const CAROUSEL_HEIGHT = 360;

type Props = {
  source: ImageSourcePropType;
  maxWidth?: number;
  carousel?: boolean;
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

export function ProjectImage({ source, maxWidth = DEFAULT_MAX_WIDTH, carousel = false }: Props) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  const handleLoad = (event: NativeSyntheticEvent<ImageLoadEventData>) => {
    const ratio = getLoadedAspectRatio(event);
    if (ratio && ratio > 0) setAspectRatio(ratio);
  };

  if (carousel) {
    const width = aspectRatio ? CAROUSEL_HEIGHT * aspectRatio : 200;

    return (
      <View style={[styles.carouselWrap, { width, height: CAROUSEL_HEIGHT }]}>
        <Image
          source={source}
          style={[styles.carouselImage, { width, height: CAROUSEL_HEIGHT }]}
          resizeMode="contain"
          onLoad={handleLoad}
        />
      </View>
    );
  }

  return (
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
}

const styles = StyleSheet.create({
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
