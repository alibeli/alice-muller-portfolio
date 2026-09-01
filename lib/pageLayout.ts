import { layout } from '@/constants/tokens';

export function isMobileLayout(screenWidth: number): boolean {
  return screenWidth < layout.mobileBreakpoint;
}

/** Notion-style page gutters: 8px mobile, 32px desktop. */
export function getPageHorizontalPadding(screenWidth: number): number {
  return isMobileLayout(screenWidth)
    ? layout.pagePaddingMobile
    : layout.pagePaddingDesktop;
}

/** Left slide-over panels (papers, awards, stack). Full width on mobile. */
export function getLeftSlidePanelWidth(screenWidth: number): number {
  if (isMobileLayout(screenWidth)) return screenWidth;
  return Math.min(560, Math.round(screenWidth * 0.42));
}

/** Right slide-over project panel. Full width on mobile. */
export function getRightSlidePanelWidth(screenWidth: number): number {
  if (isMobileLayout(screenWidth)) return screenWidth;
  return Math.round(screenWidth * 0.95);
}
