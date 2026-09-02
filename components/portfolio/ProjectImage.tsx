import type { ImageSourcePropType } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

import { MediaFrame } from '@/components/ui/MediaFrame';

const DEFAULT_MAX_WIDTH = 700;

type Props = {
  source: ImageSourcePropType;
  maxWidth?: number;
  zoomable?: boolean;
  caption?: string;
  gallerySources?: ImageSourcePropType[];
  galleryIndex?: number;
  style?: StyleProp<ViewStyle>;
};

/** Portfolio wrapper around {@link MediaFrame} — keeps existing import sites stable. */
export function ProjectImage({
  source,
  maxWidth = DEFAULT_MAX_WIDTH,
  zoomable = true,
  caption,
  gallerySources,
  galleryIndex = 0,
  style,
}: Props) {
  return (
    <MediaFrame
      source={source}
      maxWidth={maxWidth}
      zoomable={zoomable}
      caption={caption}
      gallerySources={gallerySources}
      galleryIndex={galleryIndex}
      style={style}
    />
  );
}
