import { StyleSheet, View } from 'react-native';

import { Container } from '@/components/ui/Container';
import { Divider } from '@/components/ui/Divider';
import { Link } from '@/components/ui/Link';
import { Text } from '@/components/ui/Text';
import { spacing } from '@/design-system';
import { papers } from '@/data/portfolio';

export default function PapersScreen() {
  return (
    <Container scroll>
      <Link href="/" mono>
        ← Home
      </Link>

      <Text variant="hero">Papers</Text>
      <Text variant="body" muted style={styles.intro}>
        Academic research and thesis work.
      </Text>

      <Divider />

      {papers.map((paper) => (
        <View key={paper.title} style={styles.item}>
          <Text variant="subtitle">{paper.title}</Text>
          <Text variant="caption">{paper.year}</Text>
          <Text variant="body" muted>
            {paper.institution}
          </Text>
        </View>
      ))}

      <View style={styles.footer}>
        <Link href="/" mono>
          ← Back
        </Link>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  intro: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  item: {
    marginBottom: spacing.xxl,
    gap: spacing.xs,
  },
  footer: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxxl,
  },
});
