import { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { WhatsAppIcon } from '@/components/ui/icons/WhatsAppIcon';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { Text } from '@/components/ui/Text';
import { colors, spacing } from '@/constants/theme';
import { radii } from '@/constants/tokens';
import { typography } from '@/constants/typography';
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
    <GlassSurface
      rounded={radii.pill}
      intensity="light"
      style={[styles.shell, !configured && styles.shellDisabled]}
    >
      <View style={styles.bar}>
        <Text variant="body" style={[styles.prompt, !configured && styles.promptDisabled]}>
          Questions, text me
        </Text>
        <Pressable
          onPress={handlePress}
          disabled={!configured}
          style={({ pressed }) => [
            styles.button,
            configured && buttonHovered && styles.buttonHovered,
            pressed && configured && styles.pressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Text me on WhatsApp"
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
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  shell: {
    width: '100%',
  },
  shellDisabled: {
    opacity: 0.55,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: WHATSAPP_BAR_HEIGHT,
    overflow: 'hidden',
    paddingLeft: spacing.md,
  },
  prompt: {
    ...typography.h3,
    flex: 1,
    minWidth: 0,
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
    backgroundColor: 'transparent',
  },
  buttonHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  buttonLabel: {
    ...typography.caption,
    fontWeight: '500',
  },
  buttonLabelDisabled: {
    color: colors.subtle,
  },
  pressed: {
    opacity: 0.72,
  },
});
