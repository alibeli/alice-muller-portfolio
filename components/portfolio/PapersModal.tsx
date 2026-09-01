import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import { ModalPanelHeader } from '@/components/portfolio/ModalPanelHeader';
import { SlideOverModal } from '@/components/ui/SlideOverModal';
import { ModalTabIcon } from '@/components/ui/icons/TabIcons';
import { Text } from '@/components/ui/Text';
import { spacing } from '@/constants/theme';
import { papers, paperCount } from '@/data/portfolio';
import { getLeftPanelWidth } from '@/lib/modalLayout';

type Props = {
  visible: boolean;
  onClose: () => void;
  onPaperPress: (slug: string) => void;
};

export function PapersModal({ visible, onClose, onPaperPress }: Props) {
  const { width: screenWidth } = useWindowDimensions();
  const panelWidth = getLeftPanelWidth(screenWidth);

  return (
    <SlideOverModal
      visible={visible}
      onClose={onClose}
      side="left"
      width={panelWidth}
      closeLabel="Close papers"
    >
      <ModalPanelHeader
        title="Papers"
        count={paperCount}
        onClose={onClose}
        icon={<ModalTabIcon tab="papers" />}
        intro="Academic research and thesis work."
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {papers.map((paper) => (
          <Pressable
            key={paper.slug}
            onPress={() => onPaperPress(paper.slug)}
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}
            accessibilityRole="button"
          >
            <Text variant="mono" style={styles.year}>
              {paper.year}
            </Text>
            <Text variant="subtitle" style={styles.paperTitle}>
              {paper.title}
            </Text>
            <Text variant="body" muted style={styles.institution}>
              {paper.institution}
            </Text>
            {paper.tagline ? (
              <Text variant="caption" muted style={styles.tagline}>
                {paper.tagline}
              </Text>
            ) : null}
          </Pressable>
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
    paddingVertical: spacing.xs,
  },
  year: {
    fontSize: 11,
  },
  paperTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  institution: {
    lineHeight: 20,
  },
  tagline: {
    lineHeight: 18,
  },
  pressed: {
    opacity: 0.65,
  },
});
