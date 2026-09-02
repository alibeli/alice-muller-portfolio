import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/components/ThemeProvider';
import { spacing, type ColorPalette } from '@/constants/tokens';

type Props = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnBackdrop?: boolean;
};

const SLIDE_MS = 320;

function createStyles(p: ColorPalette) {
  const frostedBackdropWeb = {
    backdropFilter: 'blur(16px) saturate(140%)',
    WebkitBackdropFilter: 'blur(16px) saturate(140%)',
    backgroundColor: p.overlay.backdrop,
  } as object;

  return StyleSheet.create({
    root: {
      ...StyleSheet.absoluteFill,
      zIndex: 200,
      elevation: 200,
    },
    backdrop: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    frostedBackdrop: {
      ...StyleSheet.absoluteFill,
      backgroundColor: p.overlay.backdrop,
      ...(Platform.OS === 'web' ? frostedBackdropWeb : {}),
    },
    sheetWrap: {
      width: '100%',
      maxWidth: 520,
      alignSelf: 'center',
    },
    sheet: {
      width: '100%',
    },
  });
}

/** Bottom sheet with frosted backdrop and slide-up entrance. */
export function BottomSheetOverlay({ visible, onClose, children, closeOnBackdrop = true }: Props) {
  const insets = useSafeAreaInsets();
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);
  const [rendered, setRendered] = useState(false);

  const sheetY = useSharedValue(400);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      setRendered(true);
      sheetY.value = 400;
      sheetY.value = withTiming(0, { duration: SLIDE_MS, easing: Easing.out(Easing.cubic) });
      backdropOpacity.value = withTiming(1, { duration: SLIDE_MS });
      return;
    }

    if (!rendered) return;

    sheetY.value = withTiming(400, { duration: SLIDE_MS, easing: Easing.in(Easing.cubic) }, (finished) => {
      if (finished) runOnJS(setRendered)(false);
    });
    backdropOpacity.value = withTiming(0, { duration: SLIDE_MS });
  }, [visible, rendered, sheetY, backdropOpacity]);

  useEffect(() => {
    if (!rendered || Platform.OS !== 'web' || typeof window === 'undefined') return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [rendered, onClose]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!rendered) return null;

  return (
    <View style={styles.root} pointerEvents="auto">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.backdrop}
      >
        <Animated.View style={[styles.frostedBackdrop, backdropStyle]}>
          {closeOnBackdrop ? (
            <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close" />
          ) : null}
        </Animated.View>

        <Animated.View
          style={[
            styles.sheetWrap,
            sheetStyle,
            { paddingBottom: Math.max(insets.bottom, spacing.md) },
          ]}
        >
          <View style={styles.sheet}>{children}</View>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}
