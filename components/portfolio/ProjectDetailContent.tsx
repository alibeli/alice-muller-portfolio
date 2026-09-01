import { ImageSourcePropType, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { ProjectImage } from '@/components/portfolio/ProjectImage';
import { ProjectLinkChip } from '@/components/portfolio/ProjectLinkChip';
import { ProjectSummaryCard } from '@/components/portfolio/ProjectSummaryCard';
import { Link } from '@/components/ui/Link';
import { Text } from '@/components/ui/Text';
import { isWhatsAppPitchLink } from '@/lib/projectLinks';
import { palette, spacing } from '@/constants/tokens';
import type { Project, ProjectBlock } from '@/data/portfolio';

const MODAL_IMAGE_MAX_WIDTH = 700;

function blockImageSource(block: Extract<ProjectBlock, { type: 'image' }>): ImageSourcePropType {
  if (block.asset) return block.asset;
  return { uri: block.uri ?? '' };
}

function BlockRenderer({ block }: { block: ProjectBlock }) {
  if (block.type === 'image') {
    return (
      <View style={styles.imageBlock}>
        <ProjectImage source={blockImageSource(block)} maxWidth={MODAL_IMAGE_MAX_WIDTH} />
        {block.caption ? (
          <Text variant="caption" style={styles.caption}>
            {block.caption}
          </Text>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.textBlock}>
      {block.subtitle ? (
        <Text variant="mono" style={styles.sectionLabel}>
          {block.subtitle}
        </Text>
      ) : null}
      {block.title ? (
        <Text variant="title" style={styles.sectionTitle}>
          {block.title}
        </Text>
      ) : null}
      {block.body ? (
        <Text variant="body" muted>
          {block.body}
        </Text>
      ) : null}
    </View>
  );
}

type Props = {
  project: Project;
  showFooter?: boolean;
  showHero?: boolean;
  showLinks?: boolean;
  showSummaryCard?: boolean;
};

export function ProjectDetailContent({
  project,
  showFooter = true,
  showHero = true,
  showLinks = true,
  showSummaryCard = false,
}: Props) {
  const showCover = showHero && project.images[0];

  return (
    <>
      {showHero ? (
        <View style={styles.hero}>
          <Text variant="hero" style={styles.title}>
            {project.title}
          </Text>
          <Text variant="subtitle" muted>
            {project.tagline}
          </Text>
          {project.roles.length > 0 ? (
            <Text variant="caption" style={styles.roles}>
              {project.roles.join(', ')}
            </Text>
          ) : null}
          {project.highlights.length > 0 ? (
            <Text variant="caption" style={styles.highlights}>
              {project.highlights.join(', ')}
            </Text>
          ) : null}
          {project.links.length > 0 ? (
            <View style={styles.links}>
              {project.links.map((link) =>
                isWhatsAppPitchLink(link.url) ? (
                  <ProjectLinkChip
                    key={link.url}
                    label={link.label}
                    url={link.url}
                    projectTitle={project.title}
                  />
                ) : (
                  <Link key={link.url} href={link.url} external mono>
                    {link.label}
                  </Link>
                ),
              )}
            </View>
          ) : null}
        </View>
      ) : null}

      {showSummaryCard ? <ProjectSummaryCard project={project} /> : null}

      {project.links.length > 0 && !showHero && showLinks ? (
        <View style={styles.linksCompact}>
          {project.links.map((link) =>
            isWhatsAppPitchLink(link.url) ? (
              <ProjectLinkChip
                key={link.url}
                label={link.label}
                url={link.url}
                projectTitle={project.title}
              />
            ) : (
              <Link key={link.url} href={link.url} external mono>
                {link.label}
              </Link>
            ),
          )}
        </View>
      ) : null}

      {showCover ? (
        <View style={styles.coverWrap}>
          <ProjectImage source={{ uri: project.images[0] }} maxWidth={MODAL_IMAGE_MAX_WIDTH} />
        </View>
      ) : null}

      {project.blocks?.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}

      {showFooter ? (
        <View style={styles.footer}>
          <Link href="/" mono>
            ← All projects
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
  roles: {
    marginTop: spacing.sm,
    color: palette.subtle,
  },
  highlights: {
    color: palette.muted,
  },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
    marginTop: spacing.md,
  },
  linksCompact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  coverWrap: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  textBlock: {
    marginBottom: spacing.lg,
  },
  imageBlock: {
    marginBottom: spacing.lg,
    alignSelf: 'center',
    width: '100%',
  },
  caption: {
    paddingTop: spacing.xs,
    color: palette.muted,
  },
  sectionLabel: {
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
  footer: {
    marginTop: spacing.xxxl,
    marginBottom: spacing.xxxl,
  },
});
