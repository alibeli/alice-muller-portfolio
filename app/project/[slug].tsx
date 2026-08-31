import { Image, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, Stack as ExpoStack } from 'expo-router';

import { ProjectDetailContent } from '@/components/portfolio/ProjectDetailContent';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { Text } from '@/components/ui/Text';
import { spacing } from '@/constants/tokens';
import { getAllProjectSlugs, getProject } from '@/data/portfolio';

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export default function ProjectScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const project = getProject(slug ?? '');

  if (!project) {
    return (
      <Container scroll>
        <Text variant="title">Project not found</Text>
        <Link href="/" mono>
          ← Back
        </Link>
      </Container>
    );
  }

  return (
    <>
      <ExpoStack.Screen options={{ title: project.title }} />
      <Container scroll>
        <Link href="/" mono>
          ← Projects
        </Link>

        <View style={styles.content}>
          <ProjectDetailContent project={project} />
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: spacing.xl,
  },
});
