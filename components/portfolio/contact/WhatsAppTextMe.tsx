import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
  type TextInput as TextInputType,
} from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { DiceIcon } from '@/components/ui/icons/DiceIcon';
import { WhatsAppIcon } from '@/components/ui/icons/WhatsAppIcon';
import { spacing, typography, type ColorPalette, typeScale } from '@/constants/theme';
import { pickRandomIcebreaker } from '@/data/icebreakerPrompts';
import { openWhatsAppChat } from '@/lib/whatsapp';

import {
  WHATSAPP_BAR_MAX_HEIGHT,
  WHATSAPP_BAR_MIN_HEIGHT,
  WHATSAPP_INPUT_MAX_HEIGHT,
} from '@/components/portfolio/contact/whatsappBar';

type Props = {
  phoneDigits: string;
};

const INPUT_LINE_HEIGHT = 22;
const INPUT_FONT_SIZE = typeScale.lg;
const INPUT_FONT_SIZE_COMPACT = typeScale.base;
const INPUT_VERTICAL_INSET = 10;
const INPUT_MIN_HEIGHT = INPUT_LINE_HEIGHT;
const SINGLE_LINE_BAR_HEIGHT = WHATSAPP_BAR_MIN_HEIGHT;

type WebTextInput = TextInputType & {
  getScrollableNode?: () => HTMLTextAreaElement | null;
};

function clampInputHeight(height: number): number {
  return Math.min(WHATSAPP_INPUT_MAX_HEIGHT, Math.max(INPUT_MIN_HEIGHT, Math.ceil(height)));
}

function barHeightForInput(inputHeight: number): number {
  return Math.min(
    WHATSAPP_BAR_MAX_HEIGHT,
    Math.max(SINGLE_LINE_BAR_HEIGHT, inputHeight + INPUT_VERTICAL_INSET * 2),
  );
}

export function WhatsAppTextMe({ phoneDigits }: Props) {
  const inputRef = useRef<TextInputType>(null);
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);
  const [message, setMessage] = useState('');
  const [inputHeight, setInputHeight] = useState(INPUT_MIN_HEIGHT);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [diceHovered, setDiceHovered] = useState(false);
  const [diceSpinToken, setDiceSpinToken] = useState(0);
  const { width } = useWindowDimensions();
  const compact = width < 380;
  const fontSize = compact ? INPUT_FONT_SIZE_COMPACT : INPUT_FONT_SIZE;
  const configured = phoneDigits.replace(/\D/g, '').length > 0;

  const barHeight = barHeightForInput(inputHeight);
  const isMultiline = barHeight > SINGLE_LINE_BAR_HEIGHT + 2;

  const measureWebInputHeight = useCallback(() => {
    if (Platform.OS !== 'web') return;
    const node = inputRef.current as WebTextInput | null;
    const textarea = node?.getScrollableNode?.();
    if (!textarea) return;

    textarea.style.height = '0px';
    const nextHeight = clampInputHeight(textarea.scrollHeight);
    textarea.style.height = `${nextHeight}px`;
    setInputHeight((current) => (current === nextHeight ? current : nextHeight));
  }, []);

  const syncInputHeight = useCallback(
    (contentHeight?: number) => {
      if (Platform.OS === 'web') {
        requestAnimationFrame(() => measureWebInputHeight());
        return;
      }
      if (contentHeight != null) {
        const nextHeight = clampInputHeight(contentHeight);
        setInputHeight((current) => (current === nextHeight ? current : nextHeight));
      }
    },
    [measureWebInputHeight],
  );

  const handlePress = () => {
    if (!configured) return;
    openWhatsAppChat(phoneDigits, message).catch(() => {});
  };

  const handleDicePress = () => {
    if (!configured) return;
    setDiceSpinToken((token) => token + 1);
    setMessage(pickRandomIcebreaker());
  };

  const handleChangeText = (text: string) => {
    setMessage(text);
    syncInputHeight();
  };

  const handleContentSizeChange = useCallback(
    (event: { nativeEvent: { contentSize: { height: number } } }) => {
      syncInputHeight(event.nativeEvent.contentSize.height);
    },
    [syncInputHeight],
  );

  useEffect(() => {
    if (!message.trim()) {
      setInputHeight(INPUT_MIN_HEIGHT);
      if (Platform.OS === 'web') {
        const node = inputRef.current as WebTextInput | null;
        const textarea = node?.getScrollableNode?.();
        if (textarea) textarea.style.height = `${INPUT_MIN_HEIGHT}px`;
      }
      return;
    }
    syncInputHeight();
  }, [message, syncInputHeight]);

  const webButtonHoverProps =
    Platform.OS === 'web'
      ? ({
          onMouseEnter: () => setButtonHovered(true),
          onMouseLeave: () => setButtonHovered(false),
        } as object)
      : {};

  const webDiceHoverProps =
    Platform.OS === 'web'
      ? ({
          onMouseEnter: () => setDiceHovered(true),
          onMouseLeave: () => setDiceHovered(false),
        } as object)
      : {};

  return (
    <View
      style={[
        styles.bar,
        {
          height: barHeight,
          borderRadius: isMultiline ? 28 : 999,
        },
        !configured && styles.barDisabled,
      ]}
    >
      <View
        style={[
          styles.inputWrap,
          { height: barHeight },
          isMultiline ? styles.inputWrapMultiline : styles.inputWrapSingle,
        ]}
      >
        <TextInput
          ref={inputRef}
          value={message}
          onChangeText={handleChangeText}
          placeholder={compact ? 'Message Alice' : 'Write a message to Alice'}
          placeholderTextColor={palette.foreground}
          multiline
          blurOnSubmit={false}
          returnKeyType="default"
          editable={configured}
          scrollEnabled={false}
          onContentSizeChange={handleContentSizeChange}
          style={[
            styles.input,
            {
              fontSize,
              lineHeight: INPUT_LINE_HEIGHT,
              height: Platform.OS === 'web' ? inputHeight : inputHeight,
              minHeight: INPUT_MIN_HEIGHT,
              maxHeight: WHATSAPP_INPUT_MAX_HEIGHT,
            },
            Platform.OS === 'web' && styles.inputWeb,
            Platform.OS === 'android' && styles.inputAndroid,
          ]}
          accessibilityLabel="Message to send on WhatsApp"
        />
        <Button
          variant="icon"
          onPress={handleDicePress}
          disabled={!configured}
          hovered={diceHovered}
          style={[
            styles.diceButton,
            isMultiline ? styles.diceButtonMultiline : styles.diceButtonSingle,
            configured && diceHovered && styles.diceButtonHovered,
          ]}
          accessibilityLabel="Shuffle an icebreaker question"
          {...webDiceHoverProps}
          icon={
            <DiceIcon
              size={compact ? 20 : 24}
              color={configured ? palette.muted : palette.subtle}
              disabled={!configured}
              spinToken={diceSpinToken}
            />
          }
        />
      </View>
      <Button
        variant="action"
        dividerLeft
        onPress={handlePress}
        disabled={!configured}
        hovered={buttonHovered}
        style={[{ height: barHeight }, compact && styles.buttonCompact]}
        accessibilityLabel="Open WhatsApp conversation"
        {...webButtonHoverProps}
        icon={
          <WhatsAppIcon
            size={18}
            color={configured ? palette.muted : palette.subtle}
            disabled={!configured}
            hovered={buttonHovered}
          />
        }
        label="Text me"
      />
    </View>
  );
}

function createStyles(p: ColorPalette) {
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
      paddingRight: spacing.xs,
      paddingVertical: INPUT_VERTICAL_INSET,
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
    inputAndroid: {
      includeFontPadding: false,
    },
    diceButton: {
      width: 36,
      height: 36,
      borderRadius: 999,
      flexShrink: 0,
    },
    diceButtonSingle: {
      alignSelf: 'center',
    },
    diceButtonMultiline: {
      alignSelf: 'flex-end',
    },
    diceButtonHovered: {
      backgroundColor: p.glass.chip,
    },
    buttonCompact: {
      paddingHorizontal: spacing.md,
      gap: spacing.sm,
    },
  });
}
