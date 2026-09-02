import { useMemo, type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/components/ThemeProvider';
import { spacing, type ColorPalette } from '@/constants/tokens';

type Props = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnBackdrop?: boolean;
};

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    root: {
      ...StyleSheet.absoluteFill,
      zIndex: 200,
      elevation: 200,
    },
    backdrop: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.lg,
      backgroundColor: p.overlay.dark,
    },
  });
}

/** Simple full-screen centered overlay — boolean visible, no Modal portal. */
export function CenterOverlay({ visible, onClose, children, closeOnBackdrop = true }: Props) {
  const insets = useSafeAreaInsets();
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);

  if (!visible) return null;

  return (
    <View style={styles.root} pointerEvents="auto">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[
          styles.backdrop,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        {closeOnBackdrop ? (
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close" />
        ) : null}
        {children}
      </KeyboardAvoidingView>
    </View>
  );
}
