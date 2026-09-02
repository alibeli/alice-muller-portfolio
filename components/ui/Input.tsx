import { useMemo } from 'react';
import { Platform, StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { buttonSizes } from '@/design-system/buttons';
import { radii } from '@/design-system/radii';
import { spacing } from '@/design-system/spacing';
import { fontSans, typeScale } from '@/design-system/typography';
import type { ColorPalette } from '@/design-system/colors';

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
      height: buttonSizes.md.height,
      paddingHorizontal: spacing.md,
      borderRadius: radii.pill,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: p.border,
      backgroundColor: p.glass.chip,
      fontFamily: fontSans,
      fontSize: typeScale.bodyMedium,
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
