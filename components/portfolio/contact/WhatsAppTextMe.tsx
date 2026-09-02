import { useMemo, useState } from 'react';
import { Platform, StyleSheet, useWindowDimensions } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { AutoGrowInputBar } from '@/components/ui/AutoGrowInputBar';
import { DiceIcon } from '@/components/ui/icons/DiceIcon';
import { WhatsAppIcon } from '@/components/ui/icons/WhatsAppIcon';
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
      middle={({ isMultiline }) => (
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
      )}
      action={({ barHeight }) => (
        <Button
          variant="primary"
          size="lg"
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
      )}
    />
  );
}

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    diceButton: {
      width: 36,
      height: 36,
      borderRadius: 999,
      flexShrink: 0,
      marginRight: spacing.sm,
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
