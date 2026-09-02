import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, type TextInput } from 'react-native';

export type AutoGrowMetrics = {
  minInputHeight: number;
  maxInputHeight: number;
  minBarHeight: number;
  maxBarHeight: number;
  verticalInset: number;
};

type WebTextInput = TextInput & {
  getScrollableNode?: () => HTMLTextAreaElement | null;
};

function clampHeight(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.ceil(value)));
}

function barHeightForInput(inputHeight: number, metrics: AutoGrowMetrics): number {
  return clampHeight(
    inputHeight + metrics.verticalInset * 2,
    metrics.minBarHeight,
    metrics.maxBarHeight,
  );
}

/** Cursor-style auto-grow: measure content, clamp, propagate height to bar shell. */
export function useAutoGrowInput(value: string, metrics: AutoGrowMetrics) {
  const inputRef = useRef<TextInput>(null);
  const [inputHeight, setInputHeight] = useState(metrics.minInputHeight);

  const clampInputHeight = useCallback(
    (height: number) => clampHeight(height, metrics.minInputHeight, metrics.maxInputHeight),
    [metrics.maxInputHeight, metrics.minInputHeight],
  );

  const measureWebHeight = useCallback(() => {
    if (Platform.OS !== 'web') return;
    const node = inputRef.current as WebTextInput | null;
    const textarea = node?.getScrollableNode?.();
    if (!textarea) return;

    textarea.style.height = '0px';
    const nextHeight = clampInputHeight(textarea.scrollHeight);
    textarea.style.height = `${nextHeight}px`;
    setInputHeight((current) => (current === nextHeight ? current : nextHeight));
  }, [clampInputHeight]);

  const syncHeight = useCallback(
    (contentHeight?: number) => {
      if (Platform.OS === 'web') {
        requestAnimationFrame(() => measureWebHeight());
        return;
      }
      if (contentHeight != null) {
        const nextHeight = clampInputHeight(contentHeight);
        setInputHeight((current) => (current === nextHeight ? current : nextHeight));
      }
    },
    [clampInputHeight, measureWebHeight],
  );

  useEffect(() => {
    if (!value.trim()) {
      setInputHeight(metrics.minInputHeight);
      if (Platform.OS === 'web') {
        const node = inputRef.current as WebTextInput | null;
        const textarea = node?.getScrollableNode?.();
        if (textarea) textarea.style.height = `${metrics.minInputHeight}px`;
      }
      return;
    }
    syncHeight();
  }, [metrics.minInputHeight, syncHeight, value]);

  const barHeight = barHeightForInput(inputHeight, metrics);
  const isMultiline = barHeight > metrics.minBarHeight + 2;
  const isAtMaxHeight = inputHeight >= metrics.maxInputHeight;

  const onContentSizeChange = useCallback(
    (event: { nativeEvent: { contentSize: { height: number } } }) => {
      syncHeight(event.nativeEvent.contentSize.height);
    },
    [syncHeight],
  );

  const notifyTextChange = useCallback(() => {
    syncHeight();
  }, [syncHeight]);

  return {
    inputRef,
    inputHeight,
    barHeight,
    isMultiline,
    isAtMaxHeight,
    scrollEnabled: isAtMaxHeight,
    onContentSizeChange,
    notifyTextChange,
  };
}
