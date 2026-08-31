import { ScrollView, StyleSheet, View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, layout, spacing } from '@/constants/theme';

type Props = ViewProps & {
  scroll?: boolean;
  children: React.ReactNode;
  noPadding?: boolean;
};

export function Container({ scroll, children, noPadding, style, ...props }: Props) {
  const insets = useSafeAreaInsets();

  const content = (
    <View
      style={[
        styles.inner,
        !noPadding && { paddingHorizontal: layout.contentPadding },
        style,
      ]}
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

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    alignItems: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: layout.maxWidth,
  },
});
