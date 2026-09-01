import { useState } from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

import { palette, radii } from '@/constants/tokens';

const DEFAULT_MAX_WIDTH = 700;
const CAROUSEL_HEIGHT = 360;

type Props = {
  source: ImageSourcePropType;
  maxWidth?: number;
  carousel?: boolean;
};

export function ProjectImage({ source, maxWidth = DEFAULT_MAX_WIDTH, carousel = false }: Props) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  if (carousel) {
    const width = aspectRatio ? CAROUSEL_HEIGHT * aspectRatio : 200;

    return (
      <View style={[styles.carouselWrap, { width, height: CAROUSEL_HEIGHT }]}>
        <Image
          source={source}
          style={[styles.carouselImage, { width, height: CAROUSEL_HEIGHT }]}
          resizeMode="contain"
          onLoad={(event) => {
            const { width: w, height: h } = event.nativeEvent.source;
            if (w > 0 && h > 0) setAspectRatio(w / h);
          }}
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
        onLoad={(event) => {
          const { width, height } = event.nativeEvent.source;
          if (width > 0 && height > 0) setAspectRatio(width / height);
        }}
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
    borderRadius: radii.image,
    backgroundColor: 'transparent',
  },
  imageFallback: {
    minHeight: 200,
  },
  carouselWrap: {
    flexShrink: 0,
    borderRadius: radii.image,
    overflow: 'hidden',
    backgroundColor: palette.surface,
  },
  carouselImage: {
    borderRadius: radii.image,
    backgroundColor: 'transparent',
  },
});
