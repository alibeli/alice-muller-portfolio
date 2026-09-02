import { useMemo } from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { SnapCarousel } from '@/components/ui/SnapCarousel';
import { Text } from '@/components/ui/Text';
import { spacing, type ColorPalette } from '@/design-system';
import type { ProjectBlock } from '@/data/portfolio';

const MODAL_IMAGE_MAX_WIDTH = 700;

function blockImageSource(block: Extract<ProjectBlock, { type: 'image' }>): ImageSourcePropType {
  if (block.asset) return block.asset;
  return { uri: block.uri ?? '' };
}

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
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
      gap: spacing.md,
    },
    caption: {
      paddingTop: spacing.xs,
      color: p.muted,
    },
    sectionLabel: {
      marginBottom: spacing.sm,
    },
    sectionTitle: {
      marginBottom: spacing.sm,
    },
  });
}

/** Optional browse carousel — only rendered when a project sets `topGallery` explicitly. */
export function ProjectTopGallery({ sources }: { sources: ImageSourcePropType[] }) {
  if (sources.length === 0) return null;

  return (
    <View style={stylesStatic.galleryWrap}>
      <SnapCarousel
        items={sources}
        slideMaxWidth={MODAL_IMAGE_MAX_WIDTH}
        renderItem={(source, index, slide) => (
          <MediaFrame
            source={source}
            width={slide.width}
            maxWidth={slide.width}
            aspectRatio={slide.aspectRatio}
            compact
            gallerySources={sources}
            galleryIndex={index}
            onAspectRatioResolved={slide.onAspectRatioResolved}
          />
        )}
      />
    </View>
  );
}

export function ProjectBlockMedia({ block }: { block: ProjectBlock }) {
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);

  if (block.type === 'image-row') {
    return (
      <View style={styles.imageRowWrap}>
        {block.assets.map((asset, index) => (
          <MediaFrame
            key={index}
            source={asset}
            maxWidth={MODAL_IMAGE_MAX_WIDTH}
            compact
            caption={block.caption}
            gallerySources={block.assets}
            galleryIndex={index}
          />
        ))}
        {block.caption ? (
          <Text variant="caption" style={styles.caption}>
            {block.caption}
          </Text>
        ) : null}
      </View>
    );
  }

  if (block.type === 'image') {
    return (
      <View style={styles.imageBlock}>
        <MediaFrame
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

const stylesStatic = StyleSheet.create({
  galleryWrap: {
    marginBottom: spacing.lg,
    width: '100%',
    alignSelf: 'center',
  },
});
