import { Image, StyleSheet, View } from 'react-native';

import { Link } from '@/components/ui/Link';
import { Text } from '@/components/ui/Text';
import { palette, spacing } from '@/constants/tokens';
import type { Paper } from '@/data/portfolio';

type Props = {
  paper: Paper;
  showFooter?: boolean;
  showTitle?: boolean;
};

export function PaperDetailContent({ paper, showFooter = true, showTitle = true }: Props) {
  return (
    <>
      <View style={styles.hero}>
        <Text variant="mono">{paper.year}</Text>
        {showTitle ? (
          <Text variant="hero" style={styles.title}>
            {paper.title}
          </Text>
        ) : null}
        <Text variant="body" muted>
          {paper.institution}
        </Text>
        {paper.tagline ? (
          <Text variant="subtitle" muted style={styles.tagline}>
            {paper.tagline}
          </Text>
        ) : null}
      </View>

      {paper.images[0] ? (
        <View style={styles.coverWrap}>
          <Image source={{ uri: paper.images[0] }} style={styles.cover} resizeMode="cover" />
        </View>
      ) : null}

      {showFooter ? (
        <View style={styles.footer}>
          <Link href="/" mono>
            ← All papers
          </Link>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  hero: {
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  title: {
    marginTop: spacing.sm,
  },
  tagline: {
    lineHeight: 22,
  },
  coverWrap: {
    width: '100%',
    aspectRatio: 16 / 10,
    backgroundColor: palette.surface,
    overflow: 'hidden',
    borderRadius: 12,
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  footer: {
    marginTop: spacing.xxxl,
    marginBottom: spacing.xxxl,
  },
});
