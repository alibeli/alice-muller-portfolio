import { Image, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, Stack as ExpoStack } from 'expo-router';

import { PaperDetailContent } from '@/components/portfolio/PaperDetailContent';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { Text } from '@/components/ui/Text';
import { spacing } from '@/constants/tokens';
import { getPaper } from '@/data/portfolio';

export default function PaperScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const paper = getPaper(slug ?? '');

  if (!paper) {
    return (
      <Container scroll>
        <Text variant="title">Paper not found</Text>
        <Link href="/" mono>
          ← Back
        </Link>
      </Container>
    );
  }

  return (
    <>
      <ExpoStack.Screen options={{ title: paper.title }} />
      <Container scroll>
        <Link href="/" mono>
          ← Papers
        </Link>

        <View style={styles.content}>
          <PaperDetailContent paper={paper} />
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
