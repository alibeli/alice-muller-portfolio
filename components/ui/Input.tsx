import { useMemo } from 'react';
import { Platform, StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { spacing, typography, type ColorPalette } from '@/constants/theme';

type Props = TextInputProps & {
  containerStyle?: object;
};

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    container: {
      flex: 1,
      minWidth: 0,
    },
    input: {
      height: 40,
      paddingHorizontal: spacing.md,
      borderRadius: 999,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: p.border,
      backgroundColor: p.glass.chip,
      fontFamily: typography.sans,
      fontSize: typography.sizes.sm,
      color: p.foreground,
    },
    inputWeb: {
      outlineStyle: 'none',
    } as object,
  });
}

export function Input({ style, containerStyle, ...props }: Props) {
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        placeholderTextColor={palette.muted}
        style={[styles.input, Platform.OS === 'web' && styles.inputWeb, style]}
        {...props}
      />
    </View>
  );
}
