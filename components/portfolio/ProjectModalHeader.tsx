import type { ReactNode } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProjectLinkChip } from '@/components/portfolio/ProjectLinkChip';
import { ProjectPeriodMeta } from '@/components/portfolio/ProjectPeriodMeta';
import { ShareIcon } from '@/components/ui/icons/ShareIcon';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { Text } from '@/components/ui/Text';
import { palette, spacing } from '@/constants/tokens';
import { shareProject } from '@/lib/shareProject';
import type { Project } from '@/data/portfolio';

const HEADER_ROW_GAP = 10;
const awardIcon = require('@/assets/icons/icon-awards.png');

type Props = {
  project: Project;
  onClose: () => void;
};

function HeaderChip({
  label,
  onPress,
  icon,
}: {
  label: string;
  onPress: () => void;
  icon?: ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.chip, pressed && styles.pressed]}
      accessibilityRole="button"
    >
      {icon}
      <Text variant="mono" style={styles.chipLabel}>
        {label}
      </Text>
    </Pressable>
  );
}

export function ProjectModalStickyHeader({ project, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const handleShare = () => {
    shareProject(project).catch(() => {});
  };

  const tractionLine =
    project.highlights.length > 0 ? project.highlights.join(' · ') : null;

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
        <Pressable
          onPress={onClose}
          style={({ pressed }) => [styles.closeBtn, pressed && styles.pressed]}
          accessibilityLabel="Close"
          accessibilityRole="button"
        >
          <Text variant="body" style={styles.closeIcon}>
            ✕
          </Text>
        </Pressable>
      </View>

      <View style={styles.titleRow}>
        <View style={styles.titleGroup}>
          <Text variant="title" style={styles.title} numberOfLines={3}>
            {project.title}
          </Text>
          <HeaderChip
            label="Share"
            onPress={handleShare}
            icon={<ShareIcon size={14} color={palette.muted} />}
          />
        </View>
      </View>

      <Text variant="subtitle" muted style={styles.tagline}>
        {project.tagline}
      </Text>

      {project.roles.length > 0 ? (
        <Text variant="caption" style={styles.roles}>
          {project.roles.join(', ')}
        </Text>
      ) : null}

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

const styles = StyleSheet.create({
  header: {
    paddingBottom: spacing.md,
    marginHorizontal: -spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.border,
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
    gap: 6,
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
    fontSize: 22,
    lineHeight: 28,
    flexShrink: 1,
  },
  closeBtn: {
    padding: spacing.xs,
    marginRight: -spacing.xs,
  },
  closeIcon: {
    fontSize: 18,
    color: palette.muted,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: spacing.sm,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.border,
    backgroundColor: palette.glass.chip,
  },
  chipLabel: {
    fontSize: 11,
  },
  linksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  meta: {
    fontSize: 11,
  },
  metaDot: {
    color: palette.subtle,
    fontSize: 11,
  },
  tagline: {
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  roles: {
    color: palette.subtle,
    lineHeight: 18,
  },
  traction: {
    flex: 1,
    color: palette.muted,
    lineHeight: 18,
    fontWeight: '500',
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
  pressed: {
    opacity: 0.65,
  },
});
