import type { ImageSourcePropType } from 'react-native';

export type MediaDimensions = {
  width: number;
  height: number;
};

const objectDimensions = new WeakMap<object, MediaDimensions>();
const moduleDimensions = new Map<number, MediaDimensions>();

/** Local asset filenames → intrinsic pixel size (from project image exports). */
const filenameDimensions: Record<string, MediaDimensions> = {
  'ailo-0.png': { width: 472, height: 1024 },
  'ailo-1.png': { width: 472, height: 1024 },
  'ailo-2.png': { width: 472, height: 1024 },
  'dia-gallery-0.png': { width: 1024, height: 1024 },
  'dia-gallery-1.png': { width: 1024, height: 639 },
  'dia-gallery-2.png': { width: 1024, height: 576 },
  'dia-gallery-3.png': { width: 1024, height: 576 },
  'mv-0.png': { width: 2880, height: 1620 },
  'mv-1.png': { width: 2880, height: 1618 },
  'mv-2.png': { width: 2880, height: 1618 },
  'mv-3.png': { width: 1928, height: 1362 },
  'mv-4.png': { width: 1934, height: 1370 },
  'nimue-0.png': { width: 762, height: 811 },
  'planet-0.png': { width: 1426, height: 1398 },
  'superpower-hero.png': { width: 1024, height: 1024 },
  'swap-app-0.png': { width: 472, height: 1024 },
  'swap-app-1.png': { width: 472, height: 1024 },
  'swap-app-2.png': { width: 472, height: 1024 },
  'swap-app-3.png': { width: 472, height: 1024 },
  'swap-app-4.png': { width: 472, height: 1024 },
  'swap-app-5.png': { width: 472, height: 1024 },
  'swap-studio-0.png': { width: 722, height: 1024 },
  'swap-studio-1.png': { width: 680, height: 1024 },
  'swap-studio-2.png': { width: 753, height: 1021 },
  'swap-studio-3.png': { width: 828, height: 1024 },
  'swap-studio-4.png': { width: 1024, height: 1024 },
  'swap-studio-5.png': { width: 832, height: 1024 },
  'tact-monster-cover.png': { width: 2362, height: 1234 },
};

function registerDimensions(source: ImageSourcePropType, dimensions: MediaDimensions) {
  if (typeof source === 'number') {
    moduleDimensions.set(source, dimensions);
    return;
  }

  if (typeof source === 'object' && source !== null) {
    objectDimensions.set(source, dimensions);
  }
}

/** Attach intrinsic dimensions to a bundled or remote image source. */
export function defineMedia(
  source: ImageSourcePropType,
  width: number,
  height: number,
): ImageSourcePropType {
  registerDimensions(source, { width, height });
  return source;
}

function filenameFromUri(uri: string): string | null {
  const clean = uri.split('?')[0]?.split('#')[0] ?? uri;
  const parts = clean.split('/');
  const last = parts[parts.length - 1];
  return last && last.includes('.') ? decodeURIComponent(last) : null;
}

function dimensionsFromUri(uri: string): MediaDimensions | null {
  const filename = filenameFromUri(uri);
  if (!filename) return null;
  return filenameDimensions[filename] ?? null;
}

export function getMediaDimensions(source: ImageSourcePropType): MediaDimensions | null {
  if (typeof source === 'number') {
    return moduleDimensions.get(source) ?? null;
  }

  if (typeof source === 'object' && source !== null) {
    const registered = objectDimensions.get(source);
    if (registered) return registered;

    if ('uri' in source && typeof source.uri === 'string') {
      return dimensionsFromUri(source.uri);
    }
  }

  return null;
}

export function getMediaAspectRatio(source: ImageSourcePropType): number | null {
  const dimensions = getMediaDimensions(source);
  if (!dimensions || dimensions.height <= 0) return null;
  return dimensions.width / dimensions.height;
}

export function slideHeightForWidth(width: number, aspectRatio: number): number {
  if (width <= 0 || aspectRatio <= 0) return 0;
  return Math.round(width / aspectRatio);
}
