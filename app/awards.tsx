import { StyleSheet, View } from 'react-native';

import { Container } from '@/components/ui/Container';
import { Divider } from '@/components/ui/Divider';
import { Link } from '@/components/ui/Link';
import { Text } from '@/components/ui/Text';
import { spacing } from '@/constants/theme';
import { awards } from '@/data/portfolio';

export default function AwardsScreen() {
  return (
    <Container scroll>
      <Link href="/" mono>
        ← Home
      </Link>

      <Text variant="hero">Awards</Text>
      <Text variant="body" muted style={styles.intro}>
        16 awards across design, engineering, and entrepreneurship.
      </Text>

      <Divider />

      {awards.map((award) => (
        <View key={award.title + award.year} style={styles.item}>
          <Text variant="mono">{award.year}</Text>
          <Text variant="subtitle" style={styles.title}>
            {award.title}
          </Text>
          <Text variant="body" muted>
            {award.detail}
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
  title: {
    marginTop: spacing.xs,
  },
  footer: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxxl,
  },
});
