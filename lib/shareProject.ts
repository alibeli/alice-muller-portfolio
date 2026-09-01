import { Platform, Share } from 'react-native';
import * as Linking from 'expo-linking';

import type { Project } from '@/data/portfolio';

export function getProjectPath(slug: string): string {
  return `/project/${slug}`;
}

export function getPaperPath(slug: string): string {
  return `/paper/${slug}`;
}

export function getProjectUrl(slug: string): string {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    return `${window.location.origin}${getProjectPath(slug)}`;
  }
  return Linking.createURL(getProjectPath(slug));
}

export async function shareProject(project: Project): Promise<void> {
  const url = getProjectUrl(project.slug);

  if (Platform.OS === 'web' && typeof navigator !== 'undefined') {
    if (navigator.share) {
      await navigator.share({ title: project.title, text: project.tagline, url });
      return;
    }
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      return;
    }
  }

  await Share.share({
    title: project.title,
    message: Platform.OS === 'ios' ? project.tagline : `${project.title}\n${url}`,
    url: Platform.OS === 'ios' ? url : undefined,
  });
}
