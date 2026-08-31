import { useEffect, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlassSurface } from '@/components/ui/GlassSurface';
import { ModalTabIcon } from '@/components/ui/icons/TabIcons';
import { Text } from '@/components/ui/Text';
import { colors, spacing } from '@/constants/theme';
import { stackSections } from '@/data/stack';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const SLIDE_MS = 280;

export function StackModal({ visible, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const isMobile = screenWidth < 640;
  const panelWidth = isMobile
    ? Math.round(screenWidth * 0.8)
    : Math.min(560, Math.round(screenWidth * 0.42));
  const [rendered, setRendered] = useState(false);

  const slideX = useSharedValue(-panelWidth);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      setRendered(true);
      slideX.value = -panelWidth;
      slideX.value = withTiming(0, { duration: SLIDE_MS, easing: Easing.out(Easing.cubic) });
      backdropOpacity.value = withTiming(1, { duration: SLIDE_MS });
      return;
    }

    if (!rendered) return;

    slideX.value = withTiming(-panelWidth, { duration: SLIDE_MS, easing: Easing.in(Easing.cubic) }, (finished) => {
      if (finished) runOnJS(setRendered)(false);
    });
    backdropOpacity.value = withTiming(0, { duration: SLIDE_MS });
  }, [visible, panelWidth, rendered, slideX, backdropOpacity]);

  useEffect(() => {
    if (!rendered || Platform.OS !== 'web' || typeof window === 'undefined') return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [rendered, onClose]);

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!rendered) return null;

  return (
    <Modal visible={rendered} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.frostedBackdrop, backdropStyle]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={onClose}
            accessibilityLabel="Close stack"
          />
        </Animated.View>

        <Animated.View style={[styles.panelWrap, { width: panelWidth }, panelStyle]}>
          <GlassSurface
            rounded={0}
            intensity="medium"
            style={[
              styles.panel,
              {
                paddingTop: insets.top + spacing.lg,
                paddingBottom: Math.max(insets.bottom, spacing.lg),
              },
            ]}
          >
            <View style={styles.panelHeader}>
              <View style={styles.headingGroup}>
                <ModalTabIcon tab="stack" />
                <Text variant="title" style={styles.heading}>
                  Stack
                </Text>
              </View>
              <Pressable
                onPress={onClose}
                style={({ pressed }) => [styles.closeIconBtn, pressed && styles.pressed]}
                accessibilityLabel="Close"
              >
                <Text variant="body" style={styles.closeIcon}>
                  ✕
                </Text>
              </Pressable>
            </View>

            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {stackSections.map((section) => (
                <View key={section.title} style={styles.section}>
                  <Text variant="subtitle" style={styles.sectionTitle}>
                    {section.title}
                  </Text>
                  <View style={styles.chips}>
                    {section.items.map((item) => (
                      <View key={item} style={styles.chip}>
                        <Text variant="caption" style={styles.chipText}>
                          {item}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>
          </GlassSurface>
        </Animated.View>
      </View>
    </Modal>
  );
}

const frostedBackdropWeb = {
  backdropFilter: 'blur(12px) saturate(140%)',
  WebkitBackdropFilter: 'blur(12px) saturate(140%)',
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
} as object;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },
  frostedBackdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    ...(Platform.OS === 'web' ? frostedBackdropWeb : {}),
  },
  panelWrap: {
    height: '100%',
    zIndex: 1,
    ...(Platform.OS === 'web'
      ? ({
          boxShadow: '8px 0 40px rgba(0,0,0,0.1)',
        } as object)
      : {}),
  },
  panel: {
    flex: 1,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: colors.border,
    paddingHorizontal: spacing.lg,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  headingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexShrink: 1,
  },
  closeIconBtn: {
    padding: spacing.sm,
  },
  closeIcon: {
    fontSize: 18,
    color: colors.muted,
  },
  heading: {
    marginBottom: 0,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: spacing.sm,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  chipText: {
    fontSize: 11,
    lineHeight: 14,
  },
  pressed: {
    opacity: 0.65,
  },
});
