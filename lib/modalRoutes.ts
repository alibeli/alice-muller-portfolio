import { Platform } from 'react-native';

import { getPaper, getProject } from '@/data/portfolio';
import {
  isLegacyProjectSlug,
  resolveProjectSlug,
} from '@/lib/projectSlugAliases';
import { getProjectPath } from '@/lib/shareProject';

export function readSlugFromPathname(prefix: string, isValid: (slug: string) => boolean): string | null {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const match = window.location.pathname.match(new RegExp(`^${prefix}/([^/]+)/?$`));
  if (!match) return null;
  const slug = decodeURIComponent(match[1]);
  return isValid(slug) ? slug : null;
}

export function readProjectSlugFromPathname(): string | null {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/project\/([^/]+)\/?$/);
  if (!match) return null;
  const rawSlug = decodeURIComponent(match[1]);
  const slug = resolveProjectSlug(rawSlug);
  if (!getProject(slug)) return null;
  if (isLegacyProjectSlug(rawSlug)) {
    replaceWebPath(getProjectPath(slug));
  }
  return slug;
}

export function readPaperSlugFromPathname(): string | null {
  return readSlugFromPathname('/paper', (slug) => !!getPaper(slug));
}

export function pushWebPath(path: string) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  window.history.pushState({}, '', path);
}

export function replaceWebPath(path: string) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  window.history.replaceState({}, '', path);
}

export function isWebPathPrefix(prefix: string): boolean {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  return window.location.pathname.startsWith(prefix);
}
