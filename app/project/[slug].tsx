import { useLocalSearchParams } from 'expo-router';

import { HomeScreen } from '@/components/portfolio/HomeScreen';
import { getAllProjectSlugs } from '@/data/portfolio';

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export default function ProjectRoute() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const projectSlug = Array.isArray(slug) ? slug[0] : slug;

  return <HomeScreen initialProjectSlug={projectSlug} />;
}
