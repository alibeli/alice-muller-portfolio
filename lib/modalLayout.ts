const MOBILE_BREAKPOINT = 640;

export function getLeftPanelWidth(screenWidth: number): number {
  const isMobile = screenWidth < MOBILE_BREAKPOINT;
  return isMobile
    ? Math.round(screenWidth * 0.8)
    : Math.min(560, Math.round(screenWidth * 0.42));
}

export function getRightPanelWidth(screenWidth: number, ratio = 0.95): number {
  return Math.round(screenWidth * ratio);
}
