import { useMemo, type ReactNode } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import {
  WHATSAPP_BAR_MAX_HEIGHT,
  WHATSAPP_BAR_MIN_HEIGHT,
  WHATSAPP_INPUT_MAX_HEIGHT,
} from '@/components/portfolio/contact/whatsappBar';
import { lineHeights, spacing, typography, type ColorPalette } from '@/design-system';
import { useAutoGrowInput, type AutoGrowMetrics } from '@/lib/useAutoGrowInput';

export type AutoGrowBarContext = {
  barHeight: number;
  isMultiline: boolean;
};

export const DEFAULT_AUTO_GROW_METRICS: AutoGrowMetrics = {
  minInputHeight: lineHeights.bodyLarge,
  maxInputHeight: WHATSAPP_INPUT_MAX_HEIGHT,
  minBarHeight: WHATSAPP_BAR_MIN_HEIGHT,
  maxBarHeight: WHATSAPP_BAR_MAX_HEIGHT,
  verticalInset: spacing.sm,
};

type Props = Omit<TextInputProps, 'multiline' | 'onChangeText' | 'style'> & {
  value: string;
  onChangeText: (text: string) => void;
  /** Slot before the input (e.g. dice button). */
  leading?: ReactNode | ((ctx: AutoGrowBarContext) => ReactNode);
  /** Slot between input and trailing action (e.g. dice button). */
  middle?: ReactNode | ((ctx: AutoGrowBarContext) => ReactNode);
  /** Trailing action — receives barHeight so the button stretches with the shell. */
  action: ReactNode | ((ctx: AutoGrowBarContext) => ReactNode);
  metrics?: AutoGrowMetrics;
  barStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  fontSize?: number;
  lineHeight?: number;
};

function createStyles(p: ColorPalette, verticalInset: number) {
  return StyleSheet.create({
    bar: {
      flexDirection: 'row',
      alignItems: 'stretch',
      borderRadius: 999,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: p.border,
      backgroundColor: p.glass.chip,
      overflow: 'hidden',
      paddingLeft: spacing.md,
    },
    barDisabled: {
      opacity: 0.55,
    },
    inputWrap: {
      flex: 1,
      minWidth: 0,
      flexDirection: 'row',
      gap: spacing.xs,
      paddingRight: spacing.sm,
      paddingVertical: verticalInset,
    },
    inputWrapSingle: {
      alignItems: 'center',
    },
    inputWrapMultiline: {
      alignItems: 'flex-end',
    },
    input: {
      flex: 1,
      minWidth: 0,
      fontFamily: typography.sans,
      color: p.foreground,
      backgroundColor: 'transparent',
      borderWidth: 0,
      paddingTop: 0,
      paddingBottom: 0,
      paddingVertical: 0,
      margin: 0,
      textAlignVertical: 'top',
    },
    inputWeb: {
      outlineStyle: 'none',
      resize: 'none',
      overflow: 'hidden',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      boxSizing: 'border-box',
    } as object,
    inputAtMax: {
      overflow: 'scroll',
    } as object,
    inputAndroid: {
      includeFontPadding: false,
    },
  });
}

function renderSlot(
  slot: ReactNode | ((ctx: AutoGrowBarContext) => ReactNode) | undefined,
  ctx: AutoGrowBarContext,
): ReactNode {
  if (slot == null) return null;
  return typeof slot === 'function' ? slot(ctx) : slot;
}

export function AutoGrowInputBar({
  value,
  onChangeText,
  leading,
  middle,
  action,
  metrics = DEFAULT_AUTO_GROW_METRICS,
  barStyle,
  disabled = false,
  fontSize = 18,
  lineHeight = 22,
  editable = true,
  ...inputProps
}: Props) {
  const { palette } = useTheme();
  const styles = useMemo(
    () => createStyles(palette, metrics.verticalInset),
    [metrics.verticalInset, palette],
  );

  const {
    inputRef,
    inputHeight,
    barHeight,
    isMultiline,
    scrollEnabled,
    onContentSizeChange,
    notifyTextChange,
  } = useAutoGrowInput(value, metrics);

  const ctx: AutoGrowBarContext = { barHeight, isMultiline };

  const handleChangeText = (text: string) => {
    onChangeText(text);
    notifyTextChange();
  };

  return (
    <View
      style={[
        styles.bar,
        {
          height: barHeight,
          borderRadius: isMultiline ? 28 : 999,
        },
        disabled && styles.barDisabled,
        barStyle,
      ]}
    >
      <View
        style={[
          styles.inputWrap,
          { height: barHeight },
          isMultiline ? styles.inputWrapMultiline : styles.inputWrapSingle,
        ]}
      >
        {renderSlot(leading, ctx)}
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={handleChangeText}
          multiline
          blurOnSubmit={false}
          scrollEnabled={scrollEnabled}
          editable={editable && !disabled}
          onContentSizeChange={onContentSizeChange}
          style={[
            styles.input,
            {
              fontSize,
              lineHeight,
              height: inputHeight,
              minHeight: metrics.minInputHeight,
              maxHeight: metrics.maxInputHeight,
            },
            Platform.OS === 'web' && styles.inputWeb,
            Platform.OS === 'web' && scrollEnabled && styles.inputAtMax,
            Platform.OS === 'android' && styles.inputAndroid,
          ]}
          {...inputProps}
        />
        {renderSlot(middle, ctx)}
      </View>
      {renderSlot(action, ctx)}
    </View>
  );
}
