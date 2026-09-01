import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import { ModalPanelHeader } from '@/components/portfolio/ModalPanelHeader';
import { SlideOverModal } from '@/components/ui/SlideOverModal';
import { ModalTabIcon } from '@/components/ui/icons/TabIcons';
import { Text } from '@/components/ui/Text';
import { spacing } from '@/constants/theme';
import { awards, awardCount } from '@/data/portfolio';
import { getLeftPanelWidth } from '@/lib/modalLayout';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function AwardsModal({ visible, onClose }: Props) {
  const { width: screenWidth } = useWindowDimensions();
  const panelWidth = getLeftPanelWidth(screenWidth);

  return (
    <SlideOverModal
      visible={visible}
      onClose={onClose}
      side="left"
      width={panelWidth}
      closeLabel="Close awards"
    >
      <ModalPanelHeader
        title="Awards"
        count={awardCount}
        onClose={onClose}
        icon={<ModalTabIcon tab="awards" />}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {awards.map((award) => (
          <View key={`${award.year}-${award.title}`} style={styles.item}>
            <Text variant="mono" style={styles.year}>
              {award.year}
            </Text>
            <Text variant="subtitle" style={styles.awardTitle}>
              {award.title}
            </Text>
            <Text variant="body" muted style={styles.detail}>
              {award.detail}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SlideOverModal>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.lg,
  },
  item: {
    marginBottom: spacing.lg,
    gap: 4,
  },
  year: {
    fontSize: 11,
  },
  awardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  detail: {
    lineHeight: 20,
  },
});
