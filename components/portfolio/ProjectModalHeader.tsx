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
import { tractionHasAward } from '@/lib/tractionHasAward';
import type { Project } from '@/data/portfolio';

const HEADER_GAP = spacing.sm;
const awardIcon = require('@/assets/icons/icon-awards.png');

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
      marginTop: HEADER_GAP,
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
      marginTop: spacing.md,
    },
    meta: {},
    metaDot: {
      color: p.subtle,
    },
    tagline: {
      marginTop: HEADER_GAP,
    },
    tractionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      marginTop: HEADER_GAP,
      flexWrap: 'wrap',
    },
    traction: {
      flexShrink: 1,
      color: p.muted,
    },
    awardIconInline: {
      width: 16,
      height: 16,
      opacity: 0.88,
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

  const tractionLine = project.traction || null;
  const showLocation = project.location.trim().length > 0;
  const showMetaSeparator =
    showLocation &&
    (project.badge === 'currently-building' || project.period.trim().length > 0);
  const showAwardInTraction = tractionLine ? tractionHasAward(tractionLine) : false;

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

      {tractionLine ? (
        <View style={styles.tractionRow}>
          {showAwardInTraction ? (
            <Image source={awardIcon} style={styles.awardIconInline} resizeMode="contain" />
          ) : null}
          <Text variant="caption" style={styles.traction}>
            {tractionLine}
          </Text>
        </View>
      ) : null}

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
