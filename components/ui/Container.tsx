import { useMemo } from 'react';
import { ScrollView, StyleSheet, View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/components/ThemeProvider';
import { layout, spacing } from '@/design-system/spacing';
import type { ColorPalette } from '@/design-system/colors';

type Props = ViewProps & {
  scroll?: boolean;
  children: React.ReactNode;
  noPadding?: boolean;
};

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: p.background,
      alignItems: 'center',
    },
    scroll: {
      flex: 1,
      backgroundColor: p.background,
    },
    scrollContent: {
      alignItems: 'center',
    },
    inner: {
      width: '100%',
      maxWidth: layout.maxWidth,
    },
  });
}

export function Container({ scroll, children, noPadding, style, ...props }: Props) {
  const insets = useSafeAreaInsets();
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);

  const content = (
    <View
      style={[styles.inner, !noPadding && { paddingHorizontal: layout.contentPadding }, style]}
      {...props}
    >
      {children}
    </View>
  );

  if (scroll) {
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.xxxl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {content}
      </ScrollView>
    );
  }

  return <View style={[styles.root, { paddingTop: insets.top }]}>{content}</View>;
}
