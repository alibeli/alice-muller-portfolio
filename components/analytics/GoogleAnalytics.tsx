import { usePathname } from 'expo-router';
import { useEffect, useRef } from 'react';

import { trackPageView } from '@/lib/analytics';

/** Sends GA4 page_view on Expo Router path changes (web only). */
export function GoogleAnalytics() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname === lastPath.current) return;
    lastPath.current = pathname;
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
