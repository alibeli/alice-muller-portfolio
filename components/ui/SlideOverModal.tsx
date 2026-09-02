import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/components/ThemeProvider';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { spacing, type ColorPalette } from '@/constants/tokens';

type GlassIntensity = 'light' | 'medium' | 'clear' | 'panel' | 'transparent';

type Props = {
  visible: boolean;
  onClose: () => void;
  side: 'left' | 'right';
  width: number;
  children: ReactNode;
  footer?: ReactNode;
  closeLabel?: string;
  intensity?: GlassIntensity;
  panelStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

const SLIDE_MS = 280;

function createStyles(p: ColorPalette) {
  const frostedBackdropWeb = {
    backdropFilter: 'blur(12px) saturate(140%)',
    WebkitBackdropFilter: 'blur(12px) saturate(140%)',
    backgroundColor: p.overlay.backdrop,
  } as object;

  return StyleSheet.create({
    overlay: {
      flex: 1,
      flexDirection: 'row',
    },
    overlayRight: {
      justifyContent: 'flex-end',
    },
    frostedBackdrop: {
      ...StyleSheet.absoluteFill,
      backgroundColor: p.overlay.backdrop,
      ...(Platform.OS === 'web' ? frostedBackdropWeb : {}),
    },
    panelWrap: {
      height: '100%',
      zIndex: 1,
    },
    panelWrapLeft: {
      ...(Platform.OS === 'web'
        ? ({
            boxShadow: p.shadow.dock,
          } as object)
        : {}),
    },
    panelWrapRight: {
      ...(Platform.OS === 'web'
        ? ({
            boxShadow: p.shadow.dock,
          } as object)
        : {}),
    },
    panel: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      position: 'relative',
    },
    panelLeft: {
      borderRightWidth: StyleSheet.hairlineWidth,
      borderRightColor: p.border,
    },
    panelRight: {
      borderLeftWidth: StyleSheet.hairlineWidth,
      borderLeftColor: p.border,
    },
    content: {
      flex: 1,
    },
  });
}

export function SlideOverModal({
  visible,
  onClose,
  side,
  width,
  children,
  footer,
  closeLabel = 'Close',
  intensity = 'medium',
  panelStyle,
  contentStyle,
}: Props) {
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);
  const insets = useSafeAreaInsets();
  const [rendered, setRendered] = useState(false);
  const hiddenOffset = side === 'left' ? -width : width;

  const slideX = useSharedValue(hiddenOffset);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      setRendered(true);
      slideX.value = hiddenOffset;
      slideX.value = withTiming(0, { duration: SLIDE_MS, easing: Easing.out(Easing.cubic) });
      backdropOpacity.value = withTiming(1, { duration: SLIDE_MS });
      return;
    }

    if (!rendered) return;

    slideX.value = withTiming(hiddenOffset, { duration: SLIDE_MS, easing: Easing.in(Easing.cubic) }, (finished) => {
      if (finished) runOnJS(setRendered)(false);
    });
    backdropOpacity.value = withTiming(0, { duration: SLIDE_MS });
  }, [visible, hiddenOffset, rendered, slideX, backdropOpacity]);

  useEffect(() => {
    if (!rendered || Platform.OS !== 'web' || typeof window === 'undefined') return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [rendered, onClose]);

  const panelAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!rendered) return null;

  const borderSide = side === 'left' ? styles.panelLeft : styles.panelRight;
  const shadowSide = side === 'left' ? styles.panelWrapLeft : styles.panelWrapRight;

  return (
    <Modal visible={rendered} transparent animationType="none" onRequestClose={onClose}>
      <View style={[styles.overlay, side === 'right' && styles.overlayRight]}>
        <Animated.View style={[styles.frostedBackdrop, backdropStyle]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={onClose}
            accessibilityLabel={closeLabel}
          />
        </Animated.View>

        <Animated.View style={[styles.panelWrap, shadowSide, { width }, panelAnimStyle]}>
          <GlassSurface
            rounded={0}
            intensity={intensity}
            style={[
              styles.panel,
              borderSide,
              {
                paddingTop: insets.top + spacing.lg,
                paddingBottom: Math.max(insets.bottom, spacing.lg),
              },
              panelStyle,
            ]}
          >
            <View style={[styles.content, contentStyle]}>{children}</View>
            {footer}
          </GlassSurface>
        </Animated.View>
      </View>
    </Modal>
  );
}
