import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { Text } from '@/components/ui/Text';
import { radii, spacing, type ColorPalette } from '@/design-system';
import type { Project, ProjectSummary } from '@/data/portfolio';

type Props = {
  project: Project;
};

const BICM_LABELS: { key: keyof ProjectSummary; label: string }[] = [
  { key: 'background', label: 'Problem' },
  { key: 'insight', label: 'Insight' },
  { key: 'change', label: 'Impact' },
  { key: 'metric', label: 'Metric' },
];

function getRoleLabel(project: Project): string {
  if (project.roleTitle?.trim()) return project.roleTitle.trim();
  return project.roles.filter(Boolean).join(' · ');
}

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    card: {
      padding: spacing.md,
      gap: spacing.sm,
      marginBottom: spacing.lg,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: p.tileBorder,
    },
    bicm: {
      gap: spacing.sm,
    },
    row: {
      gap: spacing.xxs,
    },
    rowLabel: {
      color: p.subtle,
    },
    rowValue: {
      color: p.mutedStrong,
    },
  });
}

function SummaryRow({
  label,
  value,
  styles,
}: {
  label: string;
  value: string;
  styles: ReturnType<typeof createStyles>;
}) {
  return (
    <View style={styles.row}>
      <Text variant="overline" style={styles.rowLabel}>
        {label}
      </Text>
      <Text variant="bodyMedium" style={styles.rowValue}>
        {value}
      </Text>
    </View>
  );
}

export function ProjectSummaryCard({ project }: Props) {
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);
  const roleLabel = getRoleLabel(project);

  return (
    <GlassSurface intensity="light" rounded={radii.tile} style={styles.card}>
      <View style={styles.bicm}>
        {roleLabel ? <SummaryRow label="Role" value={roleLabel} styles={styles} /> : null}
        {BICM_LABELS.map(({ key, label }) => (
          <SummaryRow key={key} label={label} value={project.summary[key]} styles={styles} />
        ))}
      </View>
    </GlassSurface>
  );
}
