import { Pressable, StyleSheet } from 'react-native';

import { OpenInNewTabIcon } from '@/components/ui/icons/OpenInNewTabIcon';
import { Text } from '@/components/ui/Text';
import { palette, spacing } from '@/constants/tokens';
import { openProjectLink } from '@/lib/projectLinks';

type Props = {
  label: string;
  url: string;
  projectTitle: string;
};

export function ProjectLinkChip({ label, url, projectTitle }: Props) {
  const isHttpLink = url.startsWith('http');

  return (
    <Pressable
      onPress={() => openProjectLink(url, projectTitle).catch(() => {})}
      style={({ pressed }) => [styles.chip, pressed && styles.pressed]}
      accessibilityRole="button"
    >
      <Text variant="mono" style={styles.chipLabel}>
        {label}
      </Text>
      {isHttpLink ? <OpenInNewTabIcon size={12} color={palette.muted} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
  pressed: {
    opacity: 0.65,
  },
});
