import { useState } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, useWindowDimensions, View } from 'react-native';

import { DiceIcon } from '@/components/ui/icons/DiceIcon';
import { WhatsAppIcon } from '@/components/ui/icons/WhatsAppIcon';
import { Text } from '@/components/ui/Text';
import { colors, spacing, typography } from '@/constants/theme';
import { pickRandomIcebreaker } from '@/data/icebreakerPrompts';
import { openWhatsAppChat } from '@/lib/whatsapp';

import { WHATSAPP_BAR_HEIGHT } from '@/components/portfolio/contact/whatsappBar';

type Props = {
  phoneDigits: string;
};

export function WhatsAppTextMe({ phoneDigits }: Props) {
  const [message, setMessage] = useState('');
  const [buttonHovered, setButtonHovered] = useState(false);
  const [diceHovered, setDiceHovered] = useState(false);
  const [diceSpinToken, setDiceSpinToken] = useState(0);
  const { width } = useWindowDimensions();
  const compact = width < 380;
  const configured = phoneDigits.replace(/\D/g, '').length > 0;

  const handlePress = () => {
    if (!configured) return;
    openWhatsAppChat(phoneDigits, message).catch(() => {});
  };

  const handleDicePress = () => {
    if (!configured) return;
    setDiceSpinToken((token) => token + 1);
    setMessage(pickRandomIcebreaker());
  };

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
    <View style={[styles.bar, !configured && styles.barDisabled]}>
      <View style={styles.inputWrap}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder={compact ? 'Message Alice' : 'Write a message to Alice'}
          placeholderTextColor={colors.foreground}
          returnKeyType="send"
          onSubmitEditing={handlePress}
          editable={configured}
          style={[
            styles.input,
            compact && styles.inputCompact,
            Platform.OS === 'web' && styles.inputWeb,
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
            size={compact ? 16 : 18}
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
    alignItems: 'center',
    height: WHATSAPP_BAR_HEIGHT,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.35)',
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
    alignItems: 'center',
    height: WHATSAPP_BAR_HEIGHT,
    paddingRight: spacing.xs,
  },
  input: {
    flex: 1,
    minWidth: 0,
    height: WHATSAPP_BAR_HEIGHT,
    paddingRight: spacing.xs,
    fontFamily: typography.sans,
    fontSize: 18,
    color: colors.foreground,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  inputCompact: {
    fontSize: 15,
    paddingRight: spacing.xs,
  },
  inputWeb: {
    outlineStyle: 'none',
  } as object,
  diceButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    flexShrink: 0,
  },
  diceButtonHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.42)',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: WHATSAPP_BAR_HEIGHT,
    paddingHorizontal: spacing.lg,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: colors.border,
    backgroundColor: 'transparent',
    flexShrink: 0,
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
