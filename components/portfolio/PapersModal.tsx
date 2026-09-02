import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import { ModalPanelHeader } from '@/components/portfolio/ModalPanelHeader';
import { SlideOverModal } from '@/components/ui/SlideOverModal';
import { ModalTabIcon } from '@/components/ui/icons/TabIcons';
import { Text } from '@/components/ui/Text';
import { spacing } from '@/design-system';
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
            <Text variant="overline">{paper.year}</Text>
            <Text variant="titleMedium">{paper.title}</Text>
            <Text variant="body" muted>
              {paper.institution}
            </Text>
            {paper.tagline ? (
              <Text variant="caption" muted>
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
    gap: spacing.xs,
    paddingVertical: spacing.xs,
  },
  pressed: {
    opacity: 0.65,
  },
});
