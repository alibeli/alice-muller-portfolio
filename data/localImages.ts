import { ImageSourcePropType } from 'react-native';

export const localThumbnails: Record<string, ImageSourcePropType> = {
  ailo: require('@/assets/images/projects/ailo-1.png'),
  runtime: require('@/assets/images/projects/nimue-0.png'),
  yuki: require('@/assets/images/projects/yuki-0.png'),
  swap: require('@/assets/images/projects/swap-0.jpg'),
  'swap-studio': require('@/assets/images/projects/swap-studio-2.png'),
  superpower: require('@/assets/images/projects/superpower-hero.png'),
  'tact-monster': require('@/assets/images/projects/tact-monster-cover.png'),
  'domi-inter-astra': require('@/assets/images/projects/dia-gallery-2.png'),
  planet: require('@/assets/images/projects/planet-0.png'),
  metavogue: require('@/assets/images/projects/mv-0.png'),
  starling: require('@/assets/images/projects/st-0.jpg'),
  'ocean-cloud': require('@/assets/images/projects/oc-2.jpg'),
  poqy: require('@/assets/images/projects/poqy-0.jpg'),
  swarms: require('@/assets/images/projects/st-0.jpg'),
  'shepherd-and-the-sheep': require('@/assets/images/projects/st-0.jpg'),
  'biomimetic-hive-minds': require('@/assets/images/projects/st-0.jpg'),
  'hegemonic-stability': require('@/assets/images/projects/oc-0.jpg'),
};

export function getLocalThumbnail(slug: string): ImageSourcePropType | undefined {
  return localThumbnails[slug];
}

/** Crop anchor for square grid tiles (CSS object-position on web). */
export const thumbnailFocalPoints: Partial<Record<string, string>> = {
  'tact-monster': '58% 50%',
  'domi-inter-astra': '46% 40%',
};

export function getThumbnailFocalPoint(slug: string): string | undefined {
  return thumbnailFocalPoints[slug];
}
