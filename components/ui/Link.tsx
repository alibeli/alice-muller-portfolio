import { Link as ExpoLink, Href } from 'expo-router';
import { useMemo } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { Text } from '@/components/ui/Text';
import { OpenInNewTabIcon } from '@/components/ui/icons/OpenInNewTabIcon';
import type { ColorPalette } from '@/design-system/colors';
import { spacing } from '@/design-system/spacing';
import { typeScale } from '@/design-system/typography';

type Props = {
  href: Href | string;
  children: React.ReactNode;
  external?: boolean;
  mono?: boolean;
};

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    link: {
      paddingVertical: spacing.xxs,
    },
    linkActive: {
      opacity: 0.5,
    },
    text: {
      fontSize: typeScale.bodyMedium,
      color: p.foreground,
    },
    mono: {
      fontSize: typeScale.labelSmall,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      color: p.muted,
    },
    externalRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
  });
}

export function Link({ href, children, external, mono }: Props) {
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);
  const hrefString = typeof href === 'string' ? href : String(href);

  const content = (
    <View style={external || hrefString.startsWith('http') ? styles.externalRow : undefined}>
      <Text variant={mono ? 'overline' : 'bodyMedium'} style={mono ? undefined : styles.text}>
        {children}
      </Text>
      {external || hrefString.startsWith('http') ? (
        <OpenInNewTabIcon size={12} color={palette.icon.muted} />
      ) : null}
    </View>
  );

  if (external || hrefString.startsWith('http')) {
    return (
      <Pressable
        onPress={() => Linking.openURL(hrefString)}
        style={({ pressed }) => [styles.link, pressed && styles.linkActive]}
        accessibilityRole="link"
      >
        {content}
      </Pressable>
    );
  }

  return (
    <ExpoLink href={href as Href} asChild>
      <Pressable style={({ pressed }) => [styles.link, pressed && styles.linkActive]}>
        {content}
      </Pressable>
    </ExpoLink>
  );
}
