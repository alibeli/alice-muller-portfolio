import { Platform, StyleSheet, Text as RNText, TextProps } from 'react-native';
import { useMemo } from 'react';

import { useTheme } from '@/components/ThemeProvider';
import { createTextVariants, fontSans, type TextVariant } from '@/design-system/typography';

type Props = TextProps & {
  variant?: TextVariant;
  muted?: boolean;
};

export function Text({ variant = 'body', muted, style, ...props }: Props) {
  const { palette } = useTheme();
  const variantStyles = useMemo(() => createTextVariants(palette), [palette]);

  return (
    <RNText
      style={[
        variantStyles[variant],
        Platform.OS === 'web' && styles.webText,
        muted && { color: palette.mutedStrong },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  webText: {
    fontFamily: fontSans,
  },
});

export function useTextStyles() {
  const { palette } = useTheme();
  return useMemo(() => StyleSheet.create(createTextVariants(palette)), [palette]);
}
