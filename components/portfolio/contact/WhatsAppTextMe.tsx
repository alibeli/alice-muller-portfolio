import { useState } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, useWindowDimensions, View } from 'react-native';

import { WhatsAppIcon } from '@/components/ui/icons/WhatsAppIcon';
import { Text } from '@/components/ui/Text';
import { colors, spacing, typography } from '@/constants/theme';
import { openWhatsAppChat } from '@/lib/whatsapp';

import { WHATSAPP_BAR_HEIGHT } from '@/components/portfolio/contact/whatsappBar';

type Props = {
  phoneDigits: string;
};

export function WhatsAppTextMe({ phoneDigits }: Props) {
  const [message, setMessage] = useState('');
  const [buttonHovered, setButtonHovered] = useState(false);
  const { width } = useWindowDimensions();
  const compact = width < 420;
  const configured = phoneDigits.replace(/\D/g, '').length > 0;

  const handlePress = () => {
    if (!configured) return;
    openWhatsAppChat(phoneDigits, message).catch(() => {});
  };

  const webButtonHoverProps =
    Platform.OS === 'web'
      ? ({
          onMouseEnter: () => setButtonHovered(true),
          onMouseLeave: () => setButtonHovered(false),
        } as object)
      : {};

  return (
    <View style={[styles.bar, !configured && styles.barDisabled]}>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Write a message to Alice"
        placeholderTextColor={colors.muted}
        returnKeyType="send"
        onSubmitEditing={handlePress}
        editable={configured}
        style={[styles.input, Platform.OS === 'web' && styles.inputWeb, compact && styles.inputCompact]}
        accessibilityLabel="Message to send on WhatsApp"
      />
      <Pressable
        onPress={handlePress}
        disabled={!configured}
        style={({ pressed }) => [
          styles.button,
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
  input: {
    flex: 1,
    minWidth: 0,
    height: WHATSAPP_BAR_HEIGHT,
    paddingRight: spacing.sm,
    fontFamily: typography.sans,
    fontSize: 18,
    color: colors.foreground,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  inputWeb: {
    outlineStyle: 'none',
  } as object,
  inputCompact: {
    fontSize: 15,
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
  },
  buttonHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.52)',
  },
  buttonLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  buttonLabelDisabled: {
    color: colors.subtle,
  },
  pressed: {
    opacity: 0.72,
  },
});
