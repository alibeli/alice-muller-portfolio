import { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/components/ThemeProvider';
import { ProjectLinkChip } from '@/components/portfolio/ProjectLinkChip';
import { ProjectPeriodMeta } from '@/components/portfolio/ProjectPeriodMeta';
import { Button } from '@/components/ui/Button';
import { ShareIcon } from '@/components/ui/icons/ShareIcon';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { Text } from '@/components/ui/Text';
import { spacing, type ColorPalette } from '@/design-system';
import { shareProject } from '@/lib/shareProject';
import type { Project } from '@/data/portfolio';

const META_TO_TITLE_GAP = spacing.sm;
const TITLE_TO_TAGLINE_GAP = spacing.sm;
const TAGLINE_TO_LINKS_GAP = spacing.sm + spacing.xs;

type Props = {
  project: Project;
  onClose: () => void;
};

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    header: {
      paddingBottom: spacing.md,
      marginHorizontal: -spacing.lg,
      paddingHorizontal: spacing.lg,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: p.border,
      borderRadius: 0,
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.sm,
    },
    metaGroup: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: spacing.sm,
      minWidth: 0,
    },
    title: {
      marginTop: META_TO_TITLE_GAP,
      flexShrink: 1,
    },
    closeIcon: {
      color: p.icon.muted,
    },
    linksRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: spacing.sm,
      marginTop: TAGLINE_TO_LINKS_GAP,
    },
    meta: {},
    metaDot: {
      color: p.subtle,
    },
    tagline: {
      marginTop: TITLE_TO_TAGLINE_GAP,
    },
  });
}

export function ProjectModalStickyHeader({ project, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);

  const handleShare = () => {
    shareProject(project).catch(() => {});
  };

  const showLocation = project.location.trim().length > 0;
  const showMetaSeparator =
    showLocation &&
    (project.badge === 'currently-building' || project.period.trim().length > 0);

  return (
    <GlassSurface
      intensity="transparent"
      rounded={0}
      style={[styles.header, { paddingTop: insets.top + spacing.md }]}
    >
      <View style={styles.metaRow}>
        <View style={styles.metaGroup}>
          <ProjectPeriodMeta project={project} />
          {showMetaSeparator ? (
            <Text variant="mono" style={styles.metaDot}>
              ·
            </Text>
          ) : null}
          {showLocation ? (
            <Text variant="mono" style={styles.meta}>
              {project.location}
            </Text>
          ) : null}
        </View>
        <Button
          variant="icon"
          onPress={onClose}
          accessibilityLabel="Close"
          icon={
            <Text variant="titleMedium" style={styles.closeIcon}>
              ✕
            </Text>
          }
        />
      </View>

      <Text variant="titleMd" style={styles.title} numberOfLines={3}>
        {project.title}
      </Text>

      <Text variant="subtitle" muted style={styles.tagline}>
        {project.tagline}
      </Text>

      <View style={styles.linksRow}>
        {project.links.map((link) => (
          <ProjectLinkChip
            key={link.url}
            label={link.label}
            url={link.url}
            projectTitle={project.title}
          />
        ))}
        <Button
          variant="secondary"
          size="sm"
          label="Share"
          onPress={handleShare}
          icon={<ShareIcon size={14} color={palette.icon.muted} />}
        />
      </View>
    </GlassSurface>
  );
}
