import { useMemo } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { ModalPanelHeader } from '@/components/portfolio/ModalPanelHeader';
import { SlideOverModal } from '@/components/ui/SlideOverModal';
import { ModalTabIcon } from '@/components/ui/icons/TabIcons';
import { Text } from '@/components/ui/Text';
import { spacing, type ColorPalette } from '@/constants/theme';
import { stackSections } from '@/data/stack';
import { getLeftPanelWidth } from '@/lib/modalLayout';

type Props = {
  visible: boolean;
  onClose: () => void;
};

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: spacing.lg,
    },
    section: {
      marginBottom: spacing.lg,
      gap: spacing.sm,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '600',
    },
    chips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.xs,
    },
    chip: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: 999,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: p.border,
      backgroundColor: p.glass.chip,
    },
    chipText: {
      fontSize: 11,
      lineHeight: 14,
    },
  });
}

export function StackModal({ visible, onClose }: Props) {
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);
  const { width: screenWidth } = useWindowDimensions();
  const panelWidth = getLeftPanelWidth(screenWidth);

  return (
    <SlideOverModal
      visible={visible}
      onClose={onClose}
      side="left"
      width={panelWidth}
      closeLabel="Close stack"
    >
      <ModalPanelHeader title="Stack" onClose={onClose} icon={<ModalTabIcon tab="stack" />} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {stackSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text variant="subtitle" style={styles.sectionTitle}>
              {section.title}
            </Text>
            <View style={styles.chips}>
              {section.items.map((item) => (
                <View key={item} style={styles.chip}>
                  <Text variant="caption" style={styles.chipText}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SlideOverModal>
  );
}
