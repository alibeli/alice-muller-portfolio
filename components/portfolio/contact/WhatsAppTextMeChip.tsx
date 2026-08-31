import { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { WhatsAppIcon } from '@/components/ui/icons/WhatsAppIcon';
import { Text } from '@/components/ui/Text';
import { colors, spacing, typography } from '@/constants/theme';
import { openWhatsAppChat } from '@/lib/whatsapp';

import { WHATSAPP_BAR_HEIGHT } from '@/components/portfolio/contact/whatsappBar';

type Props = {
  phoneDigits: string;
  projectTitle?: string;
};

export function WhatsAppTextMeChip({ phoneDigits, projectTitle }: Props) {
  const [buttonHovered, setButtonHovered] = useState(false);
  const configured = phoneDigits.replace(/\D/g, '').length > 0;

  const handlePress = () => {
    if (!configured) return;
    const message = projectTitle
      ? `Hi Alice, I have a question about ${projectTitle}.`
      : 'Hi Alice, I have a question.';
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
    <Pressable
      onPress={handlePress}
      disabled={!configured}
      style={({ pressed }) => [
        styles.bar,
        !configured && styles.barDisabled,
        configured && buttonHovered && styles.barHovered,
        pressed && configured && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel="Questions, text me on WhatsApp"
      {...webButtonHoverProps}
    >
      <Text variant="body" style={[styles.prompt, !configured && styles.promptDisabled]}>
        Questions, text me
      </Text>
      <View style={styles.button}>
        <WhatsAppIcon
          size={18}
          color={configured ? colors.muted : colors.subtle}
          disabled={!configured}
          hovered={buttonHovered}
        />
        <Text variant="mono" style={[styles.buttonLabel, !configured && styles.buttonLabelDisabled]}>
          Text me
        </Text>
      </View>
    </Pressable>
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
  barHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.52)',
  },
  prompt: {
    flex: 1,
    minWidth: 0,
    fontFamily: typography.sans,
    fontSize: 18,
    color: colors.foreground,
  },
  promptDisabled: {
    color: colors.subtle,
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
