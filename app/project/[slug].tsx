import { useLocalSearchParams } from 'expo-router';

import { getAllProjectSlugs } from '@/data/portfolio';

import HomeScreen from '../index';

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export default function ProjectRoute() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const projectSlug = Array.isArray(slug) ? slug[0] : slug;

  return <HomeScreen initialProjectSlug={projectSlug} />;
}
