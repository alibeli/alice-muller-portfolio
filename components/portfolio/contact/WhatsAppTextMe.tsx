import { useMemo, useState } from 'react';
import { Platform, Pressable, StyleSheet, useWindowDimensions } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { AutoGrowInputBar } from '@/components/ui/AutoGrowInputBar';
import { DiceIcon } from '@/components/ui/icons/DiceIcon';
import { WhatsAppIcon } from '@/components/ui/icons/WhatsAppIcon';
import { Text } from '@/components/ui/Text';
import { lineHeights, spacing, type ColorPalette, typeScale } from '@/design-system';
import { pickRandomIcebreaker } from '@/data/icebreakerPrompts';
import { openWhatsAppChat } from '@/lib/whatsapp';

type Props = {
  phoneDigits: string;
};

const INPUT_LINE_HEIGHT = lineHeights.bodyLarge;
const INPUT_FONT_SIZE = typeScale.bodyLarge;
const INPUT_FONT_SIZE_COMPACT = typeScale.bodyMedium;

export function WhatsAppTextMe({ phoneDigits }: Props) {
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);
  const [message, setMessage] = useState('');
  const [buttonHovered, setButtonHovered] = useState(false);
  const [diceHovered, setDiceHovered] = useState(false);
  const [diceSpinToken, setDiceSpinToken] = useState(0);
  const { width } = useWindowDimensions();
  const compact = width < 380;
  const fontSize = compact ? INPUT_FONT_SIZE_COMPACT : INPUT_FONT_SIZE;
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
    <AutoGrowInputBar
      value={message}
      onChangeText={setMessage}
      disabled={!configured}
      editable={configured}
      fontSize={fontSize}
      lineHeight={INPUT_LINE_HEIGHT}
      placeholder={compact ? 'Message Alice' : 'Write a message to Alice'}
      placeholderTextColor={palette.foreground}
      returnKeyType="default"
      accessibilityLabel="Message to send on WhatsApp"
      barStyle={styles.barInset}
      leading={({ isMultiline }) => (
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
              hovered={diceHovered}
              idleWink={configured}
            />
          }
        />
      )}
      action={({ barHeight }) => (
        <Pressable
          onPress={handlePress}
          disabled={!configured}
          accessibilityRole="button"
          accessibilityLabel="Open WhatsApp conversation"
          style={({ pressed }) => [
            styles.textMeButton,
            { height: barHeight },
            configured && buttonHovered && styles.textMeButtonHovered,
            pressed && configured && styles.pressed,
            compact && styles.textMeButtonCompact,
          ]}
          {...webButtonHoverProps}
        >
          <WhatsAppIcon
            size={18}
            color={configured ? palette.muted : palette.subtle}
            disabled={!configured}
            hovered={buttonHovered}
          />
          <Text
            variant="label"
            style={[styles.textMeLabel, !configured && styles.textMeLabelDisabled]}
          >
            Text me
          </Text>
        </Pressable>
      )}
    />
  );
}

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    barInset: {
      paddingLeft: spacing.sm,
    },
    diceButton: {
      width: 36,
      height: 36,
      borderRadius: 999,
      flexShrink: 0,
      marginRight: spacing.xs,
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
    textMeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
      paddingHorizontal: spacing.lg,
      borderLeftWidth: StyleSheet.hairlineWidth,
      borderLeftColor: p.border,
    },
    textMeButtonCompact: {
      paddingHorizontal: spacing.md,
    },
    textMeButtonHovered: {
      backgroundColor: p.glass.clear,
    },
    textMeLabel: {
      color: p.foreground,
    },
    textMeLabelDisabled: {
      color: p.subtle,
    },
    pressed: {
      opacity: 0.72,
    },
  });
}
