import { useState, useMemo } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { WhatsAppIcon } from '@/components/ui/icons/WhatsAppIcon';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { Text } from '@/components/ui/Text';
import { spacing, type ColorPalette, typeScale } from '@/constants/tokens';
import { openWhatsAppChat } from '@/lib/whatsapp';

import { WHATSAPP_BAR_HEIGHT } from '@/components/portfolio/contact/whatsappBar';

type Props = {
  phoneDigits: string;
  projectTitle?: string;
};

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    outer: {
      borderRadius: 999,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: p.border,
      overflow: 'hidden',
    },
    bar: {
      flexDirection: 'row',
      alignItems: 'center',
      height: WHATSAPP_BAR_HEIGHT,
      paddingLeft: spacing.md,
      gap: spacing.md,
    },
    barDisabled: {
      opacity: 0.55,
    },
    prompt: {
      flex: 1,
      minWidth: 0,
      fontSize: typeScale.lg,
      color: p.foreground,
    },
    promptDisabled: {
      color: p.subtle,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
      height: WHATSAPP_BAR_HEIGHT,
      paddingHorizontal: spacing.lg,
      borderLeftWidth: StyleSheet.hairlineWidth,
      borderLeftColor: p.border,
    },
    buttonHovered: {
      backgroundColor: p.glass.clear,
    },
    buttonLabel: {
      fontSize: typeScale.sm,
      fontWeight: '500',
      color: p.foreground,
    },
    buttonLabelDisabled: {
      color: p.subtle,
    },
    pressed: {
      opacity: 0.72,
    },
  });
}

export function WhatsAppTextMeChip({ phoneDigits, projectTitle }: Props) {
  const [buttonHovered, setButtonHovered] = useState(false);
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);
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
    <View style={styles.outer}>
      <Pressable
        onPress={handlePress}
        disabled={!configured}
        style={({ pressed }) => [pressed && configured && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel="Questions? Text me on WhatsApp"
        {...webButtonHoverProps}
      >
        <GlassSurface rounded={999} intensity="medium" style={[styles.bar, !configured && styles.barDisabled]}>
          <Text variant="body" style={[styles.prompt, !configured && styles.promptDisabled]}>
            Questions? Text me
          </Text>
          <View style={[styles.button, configured && buttonHovered && styles.buttonHovered]}>
            <WhatsAppIcon
              size={18}
              color={configured ? palette.muted : palette.subtle}
              disabled={!configured}
              hovered={buttonHovered}
            />
            <Text
              variant="mono"
              style={[styles.buttonLabel, !configured && styles.buttonLabelDisabled]}
            >
              Text me
            </Text>
          </View>
        </GlassSurface>
      </Pressable>
    </View>
  );
}
