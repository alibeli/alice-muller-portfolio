import { useCallback, useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, useWindowDimensions, View } from 'react-native';

import { DiceIcon } from '@/components/ui/icons/DiceIcon';
import { WhatsAppIcon } from '@/components/ui/icons/WhatsAppIcon';
import { Text } from '@/components/ui/Text';
import { colors, spacing, typography } from '@/constants/theme';
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

const INPUT_VERTICAL_PAD = 14;
const INPUT_LINE_HEIGHT = 22;
const INPUT_MIN_HEIGHT = WHATSAPP_BAR_MIN_HEIGHT - INPUT_VERTICAL_PAD * 2;

export function WhatsAppTextMe({ phoneDigits }: Props) {
  const [message, setMessage] = useState('');
  const [inputHeight, setInputHeight] = useState(INPUT_MIN_HEIGHT);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [diceHovered, setDiceHovered] = useState(false);
  const [diceSpinToken, setDiceSpinToken] = useState(0);
  const { width } = useWindowDimensions();
  const compact = width < 380;
  const configured = phoneDigits.replace(/\D/g, '').length > 0;

  const barHeight = Math.min(
    WHATSAPP_BAR_MAX_HEIGHT,
    Math.max(WHATSAPP_BAR_MIN_HEIGHT, inputHeight + INPUT_VERTICAL_PAD * 2),
  );
  const isMultiline = barHeight > WHATSAPP_BAR_MIN_HEIGHT + 4;

  const handlePress = () => {
    if (!configured) return;
    openWhatsAppChat(phoneDigits, message).catch(() => {});
  };

  const handleDicePress = () => {
    if (!configured) return;
    setDiceSpinToken((token) => token + 1);
    setMessage(pickRandomIcebreaker());
  };

  const handleContentSizeChange = useCallback(
    (event: { nativeEvent: { contentSize: { height: number } } }) => {
      const nextHeight = Math.min(
        WHATSAPP_INPUT_MAX_HEIGHT,
        Math.max(INPUT_MIN_HEIGHT, Math.ceil(event.nativeEvent.contentSize.height)),
      );
      setInputHeight((current) => (current === nextHeight ? current : nextHeight));
    },
    [],
  );

  useEffect(() => {
    if (!message.trim()) {
      setInputHeight(INPUT_MIN_HEIGHT);
    }
  }, [message]);

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
        { minHeight: barHeight, borderRadius: isMultiline ? 28 : 999 },
        !configured && styles.barDisabled,
      ]}
    >
      <View style={[styles.inputWrap, { minHeight: barHeight }]}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder={compact ? 'Message Alice' : 'Write a message to Alice'}
          placeholderTextColor={colors.foreground}
          multiline
          blurOnSubmit={false}
          returnKeyType="default"
          editable={configured}
          scrollEnabled={inputHeight >= WHATSAPP_INPUT_MAX_HEIGHT}
          onContentSizeChange={handleContentSizeChange}
          style={[
            styles.input,
            compact && styles.inputCompact,
            {
              height: inputHeight,
              lineHeight: INPUT_LINE_HEIGHT,
              paddingTop: INPUT_VERTICAL_PAD,
              paddingBottom: INPUT_VERTICAL_PAD,
            },
            Platform.OS === 'web' && styles.inputWeb,
            Platform.OS === 'android' && styles.inputAndroid,
          ]}
          accessibilityLabel="Message to send on WhatsApp"
        />
        <Pressable
          onPress={handleDicePress}
          disabled={!configured}
          hitSlop={8}
          style={({ pressed }) => [
            styles.diceButton,
            configured && diceHovered && styles.diceButtonHovered,
            pressed && configured && styles.pressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Shuffle an icebreaker question"
          {...webDiceHoverProps}
        >
          <DiceIcon
            size={compact ? 20 : 24}
            color={configured ? colors.muted : colors.subtle}
            disabled={!configured}
            spinToken={diceSpinToken}
          />
        </Pressable>
      </View>
      <Pressable
        onPress={handlePress}
        disabled={!configured}
        style={({ pressed }) => [
          styles.button,
          { minHeight: barHeight },
          compact && styles.buttonCompact,
          configured && buttonHovered && styles.buttonHovered,
          pressed && configured && styles.pressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Open WhatsApp conversation"
        {...webButtonHoverProps}
      >
        <WhatsAppIcon
          size={18}
          color={configured ? colors.muted : colors.subtle}
          disabled={!configured}
          hovered={buttonHovered}
        />
        <Text variant="mono" style={[styles.buttonLabel, !configured && styles.buttonLabelDisabled]}>
          Text me
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
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
    alignItems: 'flex-end',
    paddingRight: spacing.xs,
  },
  input: {
    flex: 1,
    minWidth: 0,
    fontFamily: typography.sans,
    fontSize: 18,
    color: colors.foreground,
    backgroundColor: 'transparent',
    borderWidth: 0,
    textAlignVertical: 'top',
  },
  inputCompact: {
    fontSize: 15,
  },
  inputWeb: {
    outlineStyle: 'none',
    resize: 'none',
    overflowY: 'auto',
  } as object,
  inputAndroid: {
    includeFontPadding: false,
  },
  diceButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    flexShrink: 0,
    alignSelf: 'flex-end',
  },
  diceButtonHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.42)',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: spacing.lg,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: colors.border,
    backgroundColor: 'transparent',
    flexShrink: 0,
    alignSelf: 'stretch',
  },
  buttonCompact: {
    paddingHorizontal: spacing.md,
    gap: 4,
  },
  buttonHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.52)',
  },
  buttonLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.foreground,
  },
  buttonLabelDisabled: {
    color: colors.subtle,
  },
  pressed: {
    opacity: 0.72,
  },
});
