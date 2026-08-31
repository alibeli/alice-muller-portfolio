import { Platform, StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { colors, spacing, typography } from '@/constants/theme';

type Props = TextInputProps & {
  containerStyle?: object;
};

export function Input({ style, containerStyle, ...props }: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        placeholderTextColor={colors.muted}
        style={[styles.input, Platform.OS === 'web' && styles.inputWeb, style]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 0,
  },
  input: {
    height: 40,
    paddingHorizontal: spacing.md,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.35)',
    fontFamily: typography.sans,
    fontSize: typography.sizes.sm,
    color: colors.foreground,
  },
  inputWeb: {
    outlineStyle: 'none',
  } as object,
});
