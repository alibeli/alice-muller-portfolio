import { Link as ExpoLink, Href } from 'expo-router';
import { Pressable, StyleSheet, Text, Linking, View } from 'react-native';

import { OpenInNewTabIcon } from '@/components/ui/icons/OpenInNewTabIcon';
import { colors, typography } from '@/constants/theme';

type Props = {
  href: Href | string;
  children: React.ReactNode;
  external?: boolean;
  mono?: boolean;
};

export function Link({ href, children, external, mono }: Props) {
  const hrefString = typeof href === 'string' ? href : String(href);

  if (external || hrefString.startsWith('http')) {
    return (
      <Pressable
        onPress={() => Linking.openURL(hrefString)}
        style={({ pressed }) => [
          styles.link,
          pressed && styles.linkActive,
        ]}
        accessibilityRole="link"
      >
        <View style={styles.externalRow}>
          <Text style={[styles.text, mono && styles.mono]}>{children}</Text>
          <OpenInNewTabIcon size={12} color={colors.muted} />
        </View>
      </Pressable>
    );
  }

  return (
    <ExpoLink href={href as Href} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.link,
          pressed && styles.linkActive,
        ]}
      >
        <Text style={[styles.text, mono && styles.mono]}>{children}</Text>
      </Pressable>
    </ExpoLink>
  );
}

const styles = StyleSheet.create({
  link: {
    paddingVertical: 2,
  },
  linkActive: {
    opacity: 0.5,
  },
  text: {
    fontSize: typography.sizes.sm,
    color: colors.foreground,
  },
  mono: {
    fontFamily: typography.mono,
    fontSize: typography.sizes.xs,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  externalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
