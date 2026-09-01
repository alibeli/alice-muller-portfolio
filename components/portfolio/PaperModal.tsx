import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';

import { PaperDetailContent } from '@/components/portfolio/PaperDetailContent';
import { ModalPanelHeader } from '@/components/portfolio/ModalPanelHeader';
import { SlideOverModal } from '@/components/ui/SlideOverModal';
import { Text } from '@/components/ui/Text';
import { spacing } from '@/constants/tokens';
import { getPaper } from '@/data/portfolio';
import { getLeftPanelWidth } from '@/lib/modalLayout';

type Props = {
  slug: string | null;
  onClose: () => void;
};

export function PaperModal({ slug, onClose }: Props) {
  const { width: screenWidth } = useWindowDimensions();
  const panelWidth = getLeftPanelWidth(screenWidth);
  const paper = slug ? getPaper(slug) : undefined;

  return (
    <SlideOverModal
      visible={slug !== null}
      onClose={onClose}
      side="left"
      width={panelWidth}
      closeLabel="Close paper"
    >
      <ModalPanelHeader title={paper?.title ?? 'Paper'} onClose={onClose} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {paper ? (
          <PaperDetailContent paper={paper} showFooter={false} showTitle={false} />
        ) : (
          <Text variant="body" muted>
            Paper not found.
          </Text>
        )}
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
});
