import { Platform, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Text } from '@/components/ui/Text';
import { palette } from '@/constants/tokens';

/** Soft pastel holographic wash — low saturation, gentle transitions. */
const HOLO_COLORS = ['#F4EEFF', '#EEF6FF', '#FFF2F6', '#F0FAF3', '#F4EEFF'] as const;
const HOLO_CSS =
  'linear-gradient(120deg, #F4EEFF 0%, #EEF6FF 30%, #FFF2F6 55%, #F0FAF3 80%, #F4EEFF 100%)';

type Props = {
  compact?: boolean;
};

export function CurrentlyBuildingBadge({ compact = false }: Props) {
  const labelStyle = compact ? styles.labelCompact : styles.label;
  const badgeStyle = compact ? styles.badgeCompact : styles.badge;

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.wrap, badgeStyle, { backgroundImage: HOLO_CSS } as object]}>
        <Text variant="caption" style={labelStyle}>
          Currently building
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <LinearGradient
        colors={[...HOLO_COLORS]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={badgeStyle}
      >
        <Text variant="caption" style={labelStyle}>
          Currently building
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'flex-start',
    flexShrink: 0,
    flexGrow: 0,
  },
  badge: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.55)',
  },
  badgeCompact: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.55)',
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: palette.foreground,
    letterSpacing: 0.15,
    textTransform: 'none',
  },
  labelCompact: {
    fontSize: 9,
    fontWeight: '600',
    color: palette.foreground,
    letterSpacing: 0.1,
    textTransform: 'none',
  },
});
