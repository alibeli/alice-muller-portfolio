import type { ReactNode } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProjectLinkChip } from '@/components/portfolio/ProjectLinkChip';
import { ModalDismissButton } from '@/components/ui/ModalDismissButton';
import { ShareIcon } from '@/components/ui/icons/ShareIcon';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { Text } from '@/components/ui/Text';
import { palette, spacing } from '@/constants/tokens';
import { shareProject } from '@/lib/shareProject';
import type { Project } from '@/data/portfolio';

const awardIcon = require('@/assets/icons/icon-awards.png');

type Props = {
  project: Project;
  onClose: () => void;
  contentPadding?: number;
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

export function ProjectModalStickyHeader({ project, onClose, contentPadding = spacing.lg }: Props) {
  const insets = useSafeAreaInsets();
  const handleShare = () => {
    shareProject(project).catch(() => {});
  };

  const tractionLine =
    project.highlights.length > 0 ? project.highlights.join(', ') : null;

  return (
    <GlassSurface
      intensity="transparent"
      rounded={0}
      style={[
        styles.header,
        {
          paddingTop: insets.top + spacing.sm,
          marginHorizontal: -contentPadding,
          paddingHorizontal: contentPadding,
        },
      ]}
    >
      <View style={styles.dismissRow}>
        <ModalDismissButton direction="right" onPress={onClose} />
      </View>

      <View style={styles.titleRow}>
        <Text variant="h2" style={styles.title} numberOfLines={3}>
          {project.title}
        </Text>
        <HeaderChip
          label="Share"
          onPress={handleShare}
          icon={<ShareIcon size={14} color={palette.muted} />}
        />
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
    paddingBottom: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.border,
    borderRadius: 0,
    gap: 4,
  },
  dismissRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  title: {
    flexShrink: 1,
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
    marginTop: 2,
  },
  tagline: {
    lineHeight: 22,
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
    marginTop: 2,
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
