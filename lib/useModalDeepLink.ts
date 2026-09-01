import { useRouter } from 'expo-router';
import { useCallback } from 'react';

import {
  isWebPathPrefix,
  pushWebPath,
  readSlugFromPathname,
  replaceWebPath,
} from '@/lib/modalRoutes';

type Options = {
  slug: string | null;
  setSlug: (slug: string | null) => void;
  getPath: (slug: string) => string;
  pathPrefix: string;
  isValidSlug: (slug: string) => boolean;
  /** When true, router.replace('/') runs after clearing a deep-linked route. */
  resetRouteOnClose?: boolean;
};

export function useModalDeepLink({
  slug,
  setSlug,
  getPath,
  pathPrefix,
  isValidSlug,
  resetRouteOnClose = false,
}: Options) {
  const router = useRouter();

  const open = useCallback(
    (nextSlug: string) => {
      setSlug(nextSlug);
      pushWebPath(getPath(nextSlug));
    },
    [getPath, setSlug],
  );

  const close = useCallback(() => {
    setSlug(null);
    if (isWebPathPrefix(`${pathPrefix}/`)) {
      replaceWebPath('/');
      if (resetRouteOnClose) {
        router.replace('/');
      }
    }
  }, [pathPrefix, resetRouteOnClose, router, setSlug]);

  const readFromPathname = useCallback(
    () => readSlugFromPathname(pathPrefix, isValidSlug),
    [pathPrefix, isValidSlug],
  );

  return {
    slug,
    visible: slug !== null,
    open,
    close,
    readFromPathname,
  };
}
