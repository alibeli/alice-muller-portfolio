import { Platform } from 'react-native';

const MOBILE_BREAKPOINT = 640;
const NARROW_BREAKPOINT = 380;

export { MOBILE_BREAKPOINT, NARROW_BREAKPOINT };

export function isMobileLayout(screenWidth: number): boolean {
  return screenWidth < MOBILE_BREAKPOINT;
}

export function isNarrowLayout(screenWidth: number): boolean {
  return screenWidth < NARROW_BREAKPOINT;
}

export function getLeftPanelWidth(screenWidth: number): number {
  const isMobile = isMobileLayout(screenWidth);
  return isMobile
    ? Math.round(screenWidth * 0.8)
    : Math.min(560, Math.round(screenWidth * 0.42));
}

function getWebViewportWidth(fallback: number): number {
  if (typeof window === 'undefined') return fallback;
  return window.innerWidth || fallback;
}

export function getRightPanelWidth(screenWidth: number, ratio = 0.95): number {
  const width = Platform.OS === 'web' ? getWebViewportWidth(screenWidth) : screenWidth;
  return Math.round(width * ratio);
}
