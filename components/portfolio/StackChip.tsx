import { useMemo, useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { OpenInNewTabIcon } from '@/components/ui/icons/OpenInNewTabIcon';
import { Text } from '@/components/ui/Text';
import { spacing, type ColorPalette } from '@/design-system';
import type { StackItem } from '@/data/stack';
import { getStackIconUrl } from '@/lib/stackIcons';
import { openExternalUrl } from '@/lib/openExternalUrl';

const LOGO_SIZE = 16;

type Props = {
  item: StackItem;
};

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: 999,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: p.border,
      backgroundColor: p.glass.chip,
      maxWidth: '100%',
    },
    chipHovered: {
      backgroundColor: p.glass.clear,
      borderColor: p.glass.border,
    },
    chipPressed: {
      opacity: 0.78,
    },
    logo: {
      width: LOGO_SIZE,
      height: LOGO_SIZE,
      borderRadius: 4,
      flexShrink: 0,
    },
    logoFallback: {
      width: LOGO_SIZE,
      height: LOGO_SIZE,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: p.surface,
      flexShrink: 0,
    },
    logoFallbackLabel: {
      color: p.mutedStrong,
      fontSize: 10,
      fontWeight: '600',
    },
    label: {
      flexShrink: 1,
      color: p.foreground,
    },
    externalIcon: {
      flexShrink: 0,
      marginLeft: spacing.xxs,
    },
  });
}

export function StackChip({ item }: Props) {
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);
  const [logoFailed, setLogoFailed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const iconUrl = getStackIconUrl(item);

  const webHoverProps =
    Platform.OS === 'web'
      ? ({
          onMouseEnter: () => setHovered(true),
          onMouseLeave: () => setHovered(false),
        } as object)
      : {};

  return (
    <Pressable
      onPress={() => openExternalUrl(item.url)}
      accessibilityRole="link"
      accessibilityLabel={`Open ${item.name} in a new tab`}
      style={({ pressed }) => [
        styles.chip,
        hovered && styles.chipHovered,
        pressed && styles.chipPressed,
      ]}
      {...webHoverProps}
    >
      {!logoFailed && iconUrl ? (
        <Image
          source={{ uri: iconUrl }}
          style={styles.logo}
          resizeMode="contain"
          accessibilityIgnoresInvertColors
          onError={() => setLogoFailed(true)}
        />
      ) : (
        <View style={styles.logoFallback}>
          <Text style={styles.logoFallbackLabel}>{item.name.charAt(0).toUpperCase()}</Text>
        </View>
      )}
      <Text variant="label" style={styles.label} numberOfLines={1}>
        {item.name}
      </Text>
      <View style={styles.externalIcon}>
        <OpenInNewTabIcon size={11} color={palette.icon.muted} />
      </View>
    </Pressable>
  );
}
