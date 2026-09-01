import { StyleSheet, View } from 'react-native';

import {
  ProjectBlockList,
  ProjectTopGallery,
} from '@/components/portfolio/ProjectMedia';
import { ProjectImage } from '@/components/portfolio/ProjectImage';
import { ProjectLinkChip } from '@/components/portfolio/ProjectLinkChip';
import { ProjectPeriodMeta } from '@/components/portfolio/ProjectPeriodMeta';
import { ProjectSummaryCard } from '@/components/portfolio/ProjectSummaryCard';
import { Link } from '@/components/ui/Link';
import { Text } from '@/components/ui/Text';
import { isWhatsAppPitchLink } from '@/lib/projectLinks';
import { palette, spacing } from '@/constants/tokens';
import type { Project } from '@/data/portfolio';

const MODAL_IMAGE_MAX_WIDTH = 700;

type Props = {
  project: Project;
  showFooter?: boolean;
  showHero?: boolean;
  showLinks?: boolean;
  inModal?: boolean;
};

export function ProjectDetailContent({
  project,
  showFooter = true,
  showHero = true,
  showLinks = true,
  inModal = false,
}: Props) {
  const coverUri = !inModal && project.images[0] ? project.images[0] : null;
  const topGallery = inModal ? (project.topGallery ?? []) : [];

  return (
    <>
      {showHero ? (
        <View style={styles.hero}>
          <View style={styles.meta}>
            <ProjectPeriodMeta project={project} />
            <Text variant="mono">{project.location}</Text>
          </View>
          <Text variant="hero" style={styles.title}>
            {project.title}
          </Text>
          <Text variant="subtitle" muted style={styles.tagline}>
            {project.tagline}
          </Text>
          {project.roles.length > 0 ? (
            <Text variant="caption" style={styles.roles}>
              {project.roles.join(', ')}
            </Text>
          ) : null}
          {project.traction ? (
            <Text variant="caption" style={styles.highlights}>
              {project.traction}
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

      {inModal ? <ProjectSummaryCard project={project} /> : null}

      <ProjectTopGallery sources={topGallery} />

      {project.outcome && !inModal ? (
        <View style={styles.outcomeWrap}>
          <Text variant="body" style={styles.outcome}>
            {project.outcome}
          </Text>
        </View>
      ) : null}

      {project.decisions && project.decisions.length > 0 ? (
        <View style={styles.decisionsWrap}>
          <Text variant="mono" style={styles.decisionsHeading}>
            Key decisions
          </Text>
          {project.decisions.map((decision) => (
            <Text key={decision} variant="caption" muted style={styles.decisionLine}>
              · {decision}
            </Text>
          ))}
        </View>
      ) : null}

      {coverUri ? (
        <View style={styles.coverWrap}>
          <ProjectImage source={{ uri: coverUri }} maxWidth={MODAL_IMAGE_MAX_WIDTH} />
        </View>
      ) : null}

      {project.blocks && project.blocks.length > 0 ? (
        <ProjectBlockList blocks={project.blocks} />
      ) : null}

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
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: spacing.sm,
    alignItems: 'center',
  },
  title: {
    marginTop: spacing.sm,
  },
  tagline: {
    lineHeight: 22,
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
  outcomeWrap: {
    marginBottom: spacing.md,
  },
  outcome: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    color: palette.foreground,
  },
  decisionsWrap: {
    marginBottom: spacing.lg,
    gap: spacing.xs,
  },
  decisionsHeading: {
    fontSize: 11,
    color: palette.subtle,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  decisionLine: {
    lineHeight: 18,
    fontSize: 12,
  },
  coverWrap: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  footer: {
    marginTop: spacing.xxxl,
    marginBottom: spacing.xxxl,
  },
});
