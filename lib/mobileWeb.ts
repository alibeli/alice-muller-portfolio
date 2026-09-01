import { Platform } from 'react-native';

/** True on phones/tablets in the mobile browser (coarse pointer, no hover). */
export function isCoarsePointerDevice(): boolean {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

/** Frosted glass is unreliable on iOS Safari — use a denser fallback. */
export function getGlassBackground(intensity: 'light' | 'medium' | 'clear' | 'panel'): string {
  if (!isCoarsePointerDevice()) {
    switch (intensity) {
      case 'light':
        return 'rgba(255, 255, 255, 0.45)';
      case 'clear':
        return 'rgba(255, 255, 255, 0.12)';
      case 'panel':
        return 'rgba(255, 255, 255, 0.8)';
      default:
        return 'rgba(255, 255, 255, 0.62)';
    }
  }

  switch (intensity) {
    case 'light':
      return 'rgba(255, 255, 255, 0.78)';
    case 'clear':
      return 'rgba(255, 255, 255, 0.72)';
    case 'panel':
      return 'rgba(255, 255, 255, 0.92)';
    default:
      return 'rgba(255, 255, 255, 0.88)';
  }
}

export const mobileWebPageStyle = Platform.OS === 'web'
  ? ({
      display: 'flex',
      flexDirection: 'column',
      height: '100dvh',
      minHeight: '100dvh',
      overflow: 'hidden',
    } as object)
  : {};

export const mobileWebScrollStyle = Platform.OS === 'web'
  ? ({
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch',
    } as object)
  : { flex: 1, minHeight: 0 };

export function getFrostedBackdropStyle(): object {
  if (Platform.OS !== 'web') {
    return { backgroundColor: 'rgba(255, 255, 255, 0.72)' };
  }

  if (isCoarsePointerDevice()) {
    return {
      backgroundColor: 'rgba(255, 255, 255, 0.82)',
    };
  }

  return {
    backdropFilter: 'blur(12px) saturate(140%)',
    WebkitBackdropFilter: 'blur(12px) saturate(140%)',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  };
}
