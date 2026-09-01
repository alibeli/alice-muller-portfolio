import { StyleSheet, View } from 'react-native';

import { ProjectPeriodMeta } from '@/components/portfolio/ProjectPeriodMeta';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { Text } from '@/components/ui/Text';
import { palette, radii, spacing } from '@/constants/tokens';
import { formatProjectMetaLine } from '@/lib/projectLinks';
import type { Project } from '@/data/portfolio';

type Props = {
  project: Project;
};

export function ProjectSummaryCard({ project }: Props) {
  const metaLine = formatProjectMetaLine(project.period, project.location);
  const showMeta = project.badge === 'currently-building' || metaLine.length > 0;

  return (
    <GlassSurface intensity="light" rounded={radii.image} style={styles.card}>
      {showMeta ? (
        <View style={styles.metaRow}>
          {project.badge === 'currently-building' ? (
            <>
              <ProjectPeriodMeta project={project} />
              {project.location ? (
                <Text variant="mono" style={styles.meta}>
                  {`, ${project.location}`}
                </Text>
              ) : null}
            </>
          ) : (
            <Text variant="mono" style={styles.meta}>
              {metaLine}
            </Text>
          )}
        </View>
      ) : null}

      {project.outcome ? (
        <Text variant="body" muted style={styles.outcome}>
          {project.outcome}
        </Text>
      ) : null}
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  meta: {
    fontSize: 11,
    color: palette.muted,
  },
  outcome: {
    lineHeight: 22,
  },
});
