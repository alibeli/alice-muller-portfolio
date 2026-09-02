import { useLocalSearchParams } from 'expo-router';

import { HomeScreen } from '@/components/portfolio/HomeScreen';
import { getAllProjectSlugs } from '@/data/portfolio';
import { getLegacyProjectSlugs, resolveProjectSlug } from '@/lib/projectSlugAliases';

export function generateStaticParams() {
  return [
    ...getAllProjectSlugs().map((slug) => ({ slug })),
    ...getLegacyProjectSlugs().map((slug) => ({ slug })),
  ];
}

export default function ProjectRoute() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const rawSlug = Array.isArray(slug) ? slug[0] : slug;
  const projectSlug = rawSlug ? resolveProjectSlug(rawSlug) : undefined;

  return <HomeScreen initialProjectSlug={projectSlug} />;
}
