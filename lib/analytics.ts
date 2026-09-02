import { Platform } from 'react-native';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_MEASUREMENT_ID = process.env.EXPO_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? '';

export function isAnalyticsEnabled(): boolean {
  return Platform.OS === 'web' && GA_MEASUREMENT_ID.length > 0;
}

export function trackPageView(path: string, title?: string): void {
  if (!isAnalyticsEnabled() || typeof window === 'undefined') return;
  window.gtag?.('config', GA_MEASUREMENT_ID, {
    page_path: path,
    ...(title ? { page_title: title } : {}),
  });
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (!isAnalyticsEnabled() || typeof window === 'undefined') return;
  const cleaned = params
    ? Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined))
    : undefined;
  window.gtag?.('event', name, cleaned);
}
