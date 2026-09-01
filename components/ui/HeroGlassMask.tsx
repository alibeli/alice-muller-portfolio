import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

import { palette } from '@/constants/tokens';
import type { PaperGradient } from '@/data/paperGradients';

/** Shorter bottom frosted band for grid tiles. */
export const TILE_MASK_LOCATIONS: [number, number, number, number] = [0, 0.52, 0.82, 1];

type Props = {
  heroSource?: ImageSourcePropType;
  gradient?: PaperGradient;
  intensity?: number;
  maskLocations?: [number, number, number, number];
};

function gradientPoints(angle = 135): { start: { x: number; y: number }; end: { x: number; y: number } } {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    start: { x: 0.5 - Math.cos(rad) * 0.5, y: 0.5 - Math.sin(rad) * 0.5 },
    end: { x: 0.5 + Math.cos(rad) * 0.5, y: 0.5 + Math.sin(rad) * 0.5 },
  };
}

function BackgroundLayer({
  heroSource,
  gradient,
}: Pick<Props, 'heroSource' | 'gradient'>) {
  if (heroSource) {
    return <Image source={heroSource} style={StyleSheet.absoluteFill} resizeMode="cover" />;
  }

  if (gradient) {
    const { start, end } = gradientPoints(gradient.angle);
    return (
      <LinearGradient
        colors={gradient.colors}
        start={start}
        end={end}
        style={StyleSheet.absoluteFill}
      />
    );
  }

  return null;
}

/** Solid frosted band sized to its parent — use behind tile caption text. */
export function TileTextGlass({
  intensity = 72,
  roundedTop = 0,
  roundedBottom = 0,
}: {
  intensity?: number;
  roundedTop?: number;
  roundedBottom?: number;
}) {
  const blurPx = Math.round(intensity * 0.55);
  const radiusStyle =
    roundedTop > 0 || roundedBottom > 0
      ? {
          ...(roundedTop > 0
            ? {
                borderTopLeftRadius: roundedTop,
                borderTopRightRadius: roundedTop,
              }
            : {}),
          ...(roundedBottom > 0
            ? {
                borderBottomLeftRadius: roundedBottom,
                borderBottomRightRadius: roundedBottom,
              }
            : {}),
          overflow: 'hidden' as const,
        }
      : {};

  if (Platform.OS === 'web') {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          radiusStyle,
          {
            backdropFilter: `blur(${blurPx}px) saturate(160%)`,
            WebkitBackdropFilter: `blur(${blurPx}px) saturate(160%)`,
            backgroundColor: palette.glass.frost,
          } as object,
        ]}
      />
    );
  }

  return (
    <View style={[StyleSheet.absoluteFill, radiusStyle]}>
      <BlurView intensity={intensity} tint="light" style={StyleSheet.absoluteFill} />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: palette.glass.frost }]} />
    </View>
  );
}

export function HeroGlassMask({
  heroSource,
  gradient,
  intensity = 64,
  maskLocations = TILE_MASK_LOCATIONS,
}: Props) {
  const overlayColor = palette.glass.frost;

  if (Platform.OS === 'web') {
    const [a, b, c, d] = maskLocations;
    const maskImage = `linear-gradient(to bottom, transparent ${a * 100}%, transparent ${b * 100}%, black ${c * 100}%, black ${d * 100}%)`;

    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { pointerEvents: 'none' },
          {
            backdropFilter: `blur(${Math.round(intensity * 0.55)}px) saturate(160%)`,
            WebkitBackdropFilter: `blur(${Math.round(intensity * 0.55)}px) saturate(160%)`,
            backgroundColor: overlayColor,
            maskImage,
            WebkitMaskImage: maskImage,
          } as object,
        ]}
      />
    );
  }

  return (
    <View style={[StyleSheet.absoluteFill, { pointerEvents: 'none' }]}>
      <MaskedView
        style={StyleSheet.absoluteFill}
        maskElement={
          <LinearGradient
            colors={['transparent', 'transparent', '#000', '#000']}
            locations={maskLocations}
            style={StyleSheet.absoluteFill}
          />
        }
      >
        <BackgroundLayer heroSource={heroSource} gradient={gradient} />
        <BlurView intensity={intensity} tint="light" style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: overlayColor }]} />
      </MaskedView>
    </View>
  );
}
