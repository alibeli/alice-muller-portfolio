import type { ReactNode } from 'react';
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

const HEADER_ROW_GAP = spacing.sm;
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
    titleRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing.sm,
      marginTop: HEADER_ROW_GAP,
    },
    titleGroup: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: spacing.sm,
      minWidth: 0,
    },
    title: {
      flexShrink: 1,
    },
    roleLine: {
      marginTop: HEADER_ROW_GAP,
      color: p.mutedStrong,
    },
    closeIcon: {
      color: p.icon.muted,
    },
    linksRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginTop: spacing.xs,
    },
    meta: {},
    metaDot: {
      color: p.subtle,
    },
    tagline: {
      marginTop: spacing.sm,
    },
    traction: {
      flex: 1,
      color: p.muted,
    },
    tractionRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing.sm,
      marginTop: spacing.xs,
    },
    awardIcon: {
      width: 18,
      height: 18,
      opacity: 0.88,
      marginTop: 1,
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
  const roleLine = project.roles.filter(Boolean).join(' · ');

  const showPeriodComma =
    project.badge !== 'currently-building' && project.period.trim().length > 0;

  return (
    <GlassSurface
      intensity="transparent"
      rounded={0}
      style={[styles.header, { paddingTop: insets.top + spacing.md }]}
    >
      <View style={styles.metaRow}>
        <View style={styles.metaGroup}>
          <ProjectPeriodMeta project={project} />
          {showPeriodComma ? (
            <Text variant="mono" style={styles.metaDot}>
              ,
            </Text>
          ) : null}
          <Text variant="mono" style={styles.meta}>
            {project.location}
          </Text>
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

      {roleLine ? (
        <Text variant="overline" style={styles.roleLine}>
          {roleLine}
        </Text>
      ) : null}

      <View style={styles.titleRow}>
        <View style={styles.titleGroup}>
          <Text variant="titleMd" style={styles.title} numberOfLines={3}>
            {project.title}
          </Text>
          <Button
            variant="secondary"
            size="sm"
            label="Share"
            onPress={handleShare}
            icon={<ShareIcon size={14} color={palette.icon.muted} />}
          />
        </View>
      </View>

      <Text variant="subtitle" muted style={styles.tagline}>
        {project.tagline}
      </Text>

      {tractionLine ? (
        <View style={styles.tractionRow}>
          <Image source={awardIcon} style={styles.awardIcon} resizeMode="contain" />
          <Text variant="caption" style={styles.traction}>
            {tractionLine}
          </Text>
        </View>
      ) : null}

      {project.links.length > 0 ? (
        <View style={styles.linksRow}>
          {project.links.map((link) => (
            <ProjectLinkChip
              key={link.url}
              label={link.label}
              url={link.url}
              projectTitle={project.title}
            />
          ))}
        </View>
      ) : null}
    </GlassSurface>
  );
}
