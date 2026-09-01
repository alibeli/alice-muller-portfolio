import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  type GestureResponderEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/Text';
import { palette, spacing } from '@/constants/tokens';

type Props = {
  visible: boolean;
  source: ImageSourcePropType;
  caption?: string;
  onClose: () => void;
};

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.35;

function clampScale(value: number): number {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
}

function getTouchDistance(touches: readonly { pageX: number; pageY: number }[]): number | null {
  if (touches.length < 2) return null;
  const dx = touches[0].pageX - touches[1].pageX;
  const dy = touches[0].pageY - touches[1].pageY;
  return Math.hypot(dx, dy);
}

export function ImageLightbox({ visible, source, caption, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [scale, setScale] = useState(1);
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const pinchStartDistance = useRef<number | null>(null);
  const pinchStartScale = useRef(1);

  const viewportWidth = screenWidth - spacing.lg * 2;
  const viewportHeight = screenHeight - insets.top - insets.bottom - 96;

  useEffect(() => {
    if (visible) setScale(1);
  }, [visible]);

  useEffect(() => {
    if (!visible || Platform.OS !== 'web' || typeof window === 'undefined') return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, onClose]);

  const fitSize = useCallback(() => {
    if (!imageSize) return { width: viewportWidth, height: viewportHeight * 0.75 };
    const widthRatio = viewportWidth / imageSize.width;
    const heightRatio = viewportHeight / imageSize.height;
    const fit = Math.min(widthRatio, heightRatio, 1);
    return {
      width: imageSize.width * fit,
      height: imageSize.height * fit,
    };
  }, [imageSize, viewportHeight, viewportWidth]);

  const base = fitSize();
  const displayWidth = base.width * scale;
  const displayHeight = base.height * scale;

  const zoomIn = () => setScale((current) => clampScale(current + ZOOM_STEP));
  const zoomOut = () => setScale((current) => clampScale(current - ZOOM_STEP));
  const resetZoom = () => setScale(1);

  const handleImageLoad = (event: NativeSyntheticEvent<{ source?: { width?: number; height?: number } }>) => {
    const { width, height } = event.nativeEvent.source ?? {};
    if (width && height) setImageSize({ width, height });
  };

  const handleTouchStart = (event: GestureResponderEvent) => {
    const distance = getTouchDistance(event.nativeEvent.touches);
    if (distance == null) return;
    pinchStartDistance.current = distance;
    pinchStartScale.current = scale;
  };

  const handleTouchMove = (event: GestureResponderEvent) => {
    const distance = getTouchDistance(event.nativeEvent.touches);
    if (distance == null || pinchStartDistance.current == null) return;
    const next = pinchStartScale.current * (distance / pinchStartDistance.current);
    setScale(clampScale(next));
  };

  const handleTouchEnd = () => {
    pinchStartDistance.current = null;
  };

  const handleWheel = Platform.OS === 'web'
    ? (event: NativeSyntheticEvent<NativeScrollEvent> & { ctrlKey?: boolean; deltaY?: number; preventDefault?: () => void }) => {
        const native = event.nativeEvent as unknown as WheelEvent;
        if (!native.ctrlKey && !native.metaKey) return;
        native.preventDefault?.();
        const delta = native.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
        setScale((current) => clampScale(current + delta));
      }
    : undefined;

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={[styles.overlay, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close image viewer" />

        <View style={styles.toolbar} pointerEvents="box-none">
          {caption ? (
            <Text variant="caption" style={styles.caption} numberOfLines={2}>
              {caption}
            </Text>
          ) : (
            <View style={styles.captionSpacer} />
          )}
          <View style={styles.controls} pointerEvents="auto">
            <Pressable onPress={zoomOut} style={styles.controlBtn} accessibilityLabel="Zoom out">
              <Text variant="body" style={styles.controlLabel}>
                −
              </Text>
            </Pressable>
            <Pressable onPress={resetZoom} style={styles.controlBtn} accessibilityLabel="Reset zoom">
              <Text variant="mono" style={styles.resetLabel}>
                {Math.round(scale * 100)}%
              </Text>
            </Pressable>
            <Pressable onPress={zoomIn} style={styles.controlBtn} accessibilityLabel="Zoom in">
              <Text variant="body" style={styles.controlLabel}>
                +
              </Text>
            </Pressable>
            <Pressable onPress={onClose} style={styles.controlBtn} accessibilityLabel="Close">
              <Text variant="body" style={styles.controlLabel}>
                ✕
              </Text>
            </Pressable>
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          maximumZoomScale={Platform.OS === 'ios' ? MAX_SCALE : undefined}
          minimumZoomScale={Platform.OS === 'ios' ? MIN_SCALE : undefined}
          centerContent={Platform.OS === 'ios'}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bouncesZoom={Platform.OS === 'ios'}
          {...(Platform.OS === 'web' ? ({ onWheel: handleWheel } as object) : {})}
        >
          <View
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            style={styles.imageStage}
          >
            <Pressable onPress={Platform.OS === 'web' ? undefined : undefined} accessibilityRole="image">
              <Image
                source={source}
                style={{ width: displayWidth, height: displayHeight }}
                resizeMode="contain"
                onLoad={handleImageLoad}
              />
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const frostedToolbarWeb = {
  backdropFilter: 'blur(16px) saturate(160%)',
  WebkitBackdropFilter: 'blur(16px) saturate(160%)',
} as object;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.88)',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    zIndex: 2,
    backgroundColor: 'rgba(20, 20, 20, 0.55)',
    ...(Platform.OS === 'web' ? frostedToolbarWeb : {}),
  },
  caption: {
    flex: 1,
    color: palette.white,
  },
  captionSpacer: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  controlBtn: {
    minWidth: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: spacing.sm,
  },
  controlLabel: {
    color: palette.white,
    fontSize: 18,
    lineHeight: 20,
  },
  resetLabel: {
    color: palette.white,
    fontSize: 11,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  imageStage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
