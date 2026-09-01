import { ImageSourcePropType, StyleSheet, View } from 'react-native';

import { ProjectImage } from '@/components/portfolio/ProjectImage';
import { SnapCarousel } from '@/components/ui/SnapCarousel';
import { Text } from '@/components/ui/Text';
import { palette, spacing } from '@/constants/tokens';
import type { ProjectBlock } from '@/data/portfolio';

const MODAL_IMAGE_MAX_WIDTH = 700;

function blockImageSource(block: Extract<ProjectBlock, { type: 'image' }>): ImageSourcePropType {
  if (block.asset) return block.asset;
  return { uri: block.uri ?? '' };
}

/** Optional browse carousel — only rendered when a project sets `topGallery` explicitly. */
export function ProjectTopGallery({ sources }: { sources: ImageSourcePropType[] }) {
  if (sources.length === 0) return null;

  return (
    <View style={styles.galleryWrap}>
      <SnapCarousel
        items={sources}
        slideMaxWidth={MODAL_IMAGE_MAX_WIDTH}
        renderItem={(source, index, slide) => (
          <ProjectImage
            source={source}
            maxWidth={slide.width}
            slideHeight={slide.height}
            variant="carousel"
            gallerySources={sources}
            galleryIndex={index}
          />
        )}
      />
    </View>
  );
}

export function ProjectBlockMedia({ block }: { block: ProjectBlock }) {
  if (block.type === 'image-row') {
    return (
      <View style={styles.imageRowWrap}>
        <SnapCarousel
          items={block.assets}
          slideMaxWidth={MODAL_IMAGE_MAX_WIDTH}
          caption={block.caption}
          renderItem={(asset, index, slide) => (
            <ProjectImage
              source={asset}
              maxWidth={slide.width}
              slideHeight={slide.height}
              variant="carousel"
              caption={block.caption}
              gallerySources={block.assets}
              galleryIndex={index}
            />
          )}
        />
      </View>
    );
  }

  if (block.type === 'image') {
    return (
      <View style={styles.imageBlock}>
        <ProjectImage
          source={blockImageSource(block)}
          maxWidth={MODAL_IMAGE_MAX_WIDTH}
          caption={block.caption}
        />
        {block.caption ? (
          <Text variant="caption" style={styles.caption}>
            {block.caption}
          </Text>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.textBlock}>
      {block.subtitle ? (
        <Text variant="mono" style={styles.sectionLabel}>
          {block.subtitle}
        </Text>
      ) : null}
      {block.title ? (
        <Text variant="title" style={styles.sectionTitle}>
          {block.title}
        </Text>
      ) : null}
      {block.body ? (
        <Text variant="body" muted>
          {block.body}
        </Text>
      ) : null}
    </View>
  );
}

export function ProjectBlockList({ blocks }: { blocks: ProjectBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <ProjectBlockMedia key={i} block={block} />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  galleryWrap: {
    marginBottom: spacing.lg,
    width: '100%',
    alignSelf: 'center',
  },
  textBlock: {
    marginBottom: spacing.md,
  },
  imageBlock: {
    marginBottom: spacing.lg,
    alignSelf: 'stretch',
    width: '100%',
  },
  imageRowWrap: {
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  caption: {
    paddingTop: spacing.xs,
    color: palette.muted,
  },
  sectionLabel: {
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
});
