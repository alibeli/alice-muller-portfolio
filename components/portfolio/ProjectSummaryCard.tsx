import { StyleSheet, View } from 'react-native';

import { GlassSurface } from '@/components/ui/GlassSurface';
import { Text } from '@/components/ui/Text';
import { palette, radii, spacing } from '@/constants/tokens';
import type { Project, ProjectSummary } from '@/data/portfolio';

type Props = {
  project: Project;
};

const BICM_LABELS: { key: keyof ProjectSummary; label: string }[] = [
  { key: 'background', label: 'Background' },
  { key: 'insight', label: 'Insight' },
  { key: 'change', label: 'Change' },
  { key: 'metric', label: 'Metric' },
];

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text variant="mono" style={styles.rowLabel}>
        {label}
      </Text>
      <Text variant="body" muted style={styles.rowValue}>
        {value}
      </Text>
    </View>
  );
}

export function ProjectSummaryCard({ project }: Props) {
  return (
    <GlassSurface intensity="light" rounded={radii.tile} style={styles.card}>
      <View style={styles.bicm}>
        {BICM_LABELS.map(({ key, label }) => (
          <SummaryRow key={key} label={label} value={project.summary[key]} />
        ))}
      </View>
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  bicm: {
    gap: spacing.sm,
  },
  row: {
    gap: 2,
  },
  rowLabel: {
    fontSize: 10,
    color: palette.subtle,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  rowValue: {
    lineHeight: 20,
    fontSize: 14,
  },
});
