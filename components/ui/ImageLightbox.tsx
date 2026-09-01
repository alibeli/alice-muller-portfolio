import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
  type GestureResponderEvent,
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

type Transform = {
  scale: number;
  x: number;
  y: number;
};

const MIN_SCALE = 1;
const MAX_SCALE = 5;

function clampScale(value: number): number {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
}

function getTouchDistance(touches: readonly { pageX: number; pageY: number }[]): number | null {
  if (touches.length < 2) return null;
  const dx = touches[0].pageX - touches[1].pageX;
  const dy = touches[0].pageY - touches[1].pageY;
  return Math.hypot(dx, dy);
}

function getTouchCenter(touches: readonly { pageX: number; pageY: number }[]): { x: number; y: number } | null {
  if (touches.length < 2) return null;
  return {
    x: (touches[0].pageX + touches[1].pageX) / 2,
    y: (touches[0].pageY + touches[1].pageY) / 2,
  };
}

function zoomTowardPoint(
  current: Transform,
  pointX: number,
  pointY: number,
  nextScale: number,
): Transform {
  const scale = clampScale(nextScale);
  if (scale === current.scale) return current;
  const ratio = scale / current.scale;
  return {
    scale,
    x: pointX - (pointX - current.x) * ratio,
    y: pointY - (pointY - current.y) * ratio,
  };
}

export function ImageLightbox({ visible, source, caption, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const viewportRef = useRef<View>(null);
  const [transform, setTransform] = useState<Transform>({ scale: 1, x: 0, y: 0 });
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);

  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startTransform: { scale: 1, x: 0, y: 0 } as Transform,
  });

  const pinchRef = useRef({
    distance: null as number | null,
    center: null as { x: number; y: number } | null,
    startTransform: { scale: 1, x: 0, y: 0 } as Transform,
  });

  const viewportWidth = screenWidth;
  const viewportHeight = screenHeight - insets.top - insets.bottom - 72;

  const resetTransform = useCallback(() => {
    setTransform({ scale: 1, x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (visible) resetTransform();
  }, [visible, resetTransform]);

  useEffect(() => {
    if (!visible || Platform.OS !== 'web' || typeof window === 'undefined') return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, onClose]);

  useEffect(() => {
    if (!visible || Platform.OS !== 'web') return;
    const node = viewportRef.current as unknown as HTMLElement | null;
    if (!node) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const rect = node.getBoundingClientRect();
      const pointX = event.clientX - rect.left - rect.width / 2;
      const pointY = event.clientY - rect.top - rect.height / 2;
      const delta = event.deltaY < 0 ? 1.12 : 0.88;
      setTransform((current) => zoomTowardPoint(current, pointX, pointY, current.scale * delta));
    };

    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [visible]);

  const fitSize = useCallback(() => {
    if (!imageSize) return { width: viewportWidth * 0.9, height: viewportHeight * 0.75 };
    const widthRatio = (viewportWidth * 0.9) / imageSize.width;
    const heightRatio = (viewportHeight * 0.85) / imageSize.height;
    const fit = Math.min(widthRatio, heightRatio, 1);
    return {
      width: imageSize.width * fit,
      height: imageSize.height * fit,
    };
  }, [imageSize, viewportHeight, viewportWidth]);

  const base = fitSize();

  const handleImageLoad = (
    event: NativeSyntheticEvent<{ source?: { width?: number; height?: number } }>,
  ) => {
    const { width, height } = event.nativeEvent.source ?? {};
    if (width && height) setImageSize({ width, height });
  };

  const beginPan = (pageX: number, pageY: number) => {
    if (transform.scale <= 1) return;
    dragRef.current = {
      active: true,
      startX: pageX,
      startY: pageY,
      startTransform: transform,
    };
  };

  const movePan = (pageX: number, pageY: number) => {
    if (!dragRef.current.active) return;
    const dx = pageX - dragRef.current.startX;
    const dy = pageY - dragRef.current.startY;
    setTransform({
      ...dragRef.current.startTransform,
      x: dragRef.current.startTransform.x + dx,
      y: dragRef.current.startTransform.y + dy,
    });
  };

  const endPan = () => {
    dragRef.current.active = false;
  };

  const handleTouchStart = (event: GestureResponderEvent) => {
    const { touches } = event.nativeEvent;
    if (touches.length >= 2) {
      const distance = getTouchDistance(touches);
      const center = getTouchCenter(touches);
      if (distance == null || center == null) return;
      const node = viewportRef.current as unknown as HTMLElement | null;
      const rect = node?.getBoundingClientRect();
      pinchRef.current = {
        distance,
        center: rect
          ? { x: center.x - rect.left - rect.width / 2, y: center.y - rect.top - rect.height / 2 }
          : center,
        startTransform: transform,
      };
      dragRef.current.active = false;
      return;
    }

    beginPan(touches[0].pageX, touches[0].pageY);
  };

  const handleTouchMove = (event: GestureResponderEvent) => {
    const { touches } = event.nativeEvent;
    if (touches.length >= 2 && pinchRef.current.distance != null && pinchRef.current.center) {
      const distance = getTouchDistance(touches);
      if (distance == null) return;
      const nextScale =
        pinchRef.current.startTransform.scale * (distance / pinchRef.current.distance);
      const { center } = pinchRef.current;
      setTransform(
        zoomTowardPoint(pinchRef.current.startTransform, center.x, center.y, nextScale),
      );
      return;
    }

    if (touches.length === 1) movePan(touches[0].pageX, touches[0].pageY);
  };

  const handleTouchEnd = () => {
    pinchRef.current.distance = null;
    pinchRef.current.center = null;
    endPan();
  };

  const handleMouseDown = Platform.OS === 'web'
    ? (event: GestureResponderEvent) => {
        beginPan(event.nativeEvent.pageX, event.nativeEvent.pageY);
      }
    : undefined;

  const handleMouseMove = Platform.OS === 'web'
    ? (event: GestureResponderEvent) => {
        movePan(event.nativeEvent.pageX, event.nativeEvent.pageY);
      }
    : undefined;

  const handleMouseUp = Platform.OS === 'web' ? endPan : undefined;

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
            <Pressable onPress={resetTransform} style={styles.controlBtn} accessibilityLabel="Reset zoom">
              <Text variant="mono" style={styles.resetLabel}>
                {Math.round(transform.scale * 100)}%
              </Text>
            </Pressable>
            <Pressable onPress={onClose} style={styles.controlBtn} accessibilityLabel="Close">
              <Text variant="body" style={styles.controlLabel}>
                ✕
              </Text>
            </Pressable>
          </View>
        </View>

        <View
          ref={viewportRef}
          style={styles.viewport}
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => true}
          onResponderGrant={handleTouchStart}
          onResponderMove={handleTouchMove}
          onResponderRelease={handleTouchEnd}
          onResponderTerminate={handleTouchEnd}
          {...(Platform.OS === 'web'
            ? ({
                onMouseDown: handleMouseDown,
                onMouseMove: handleMouseMove,
                onMouseUp: handleMouseUp,
                onMouseLeave: handleMouseUp,
                onDoubleClick: resetTransform,
              } as object)
            : {})}
        >
          <View
            style={[
              styles.imageStage,
              {
                transform: [
                  { translateX: transform.x },
                  { translateY: transform.y },
                  { scale: transform.scale },
                ],
              },
            ]}
          >
            <Image
              source={source}
              style={{ width: base.width, height: base.height }}
              resizeMode="contain"
              onLoad={handleImageLoad}
            />
          </View>
        </View>
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
  viewport: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    ...(Platform.OS === 'web'
      ? ({
          cursor: 'grab',
          touchAction: 'none',
        } as object)
      : {}),
  },
  imageStage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
