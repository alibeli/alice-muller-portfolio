import { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AwardsModal } from '@/components/portfolio/AwardsModal';
import { MoreProjectTile } from '@/components/portfolio/MoreProjectTile';
import { PaperModal } from '@/components/portfolio/PaperModal';
import { PapersModal } from '@/components/portfolio/PapersModal';
import { ProjectModal } from '@/components/portfolio/ProjectModal';
import { StackModal } from '@/components/portfolio/StackModal';
import { FilterHeader } from '@/components/portfolio/FilterHeader';
import { ProfileDock } from '@/components/portfolio/ProfileDock';
import { ProjectGridTile } from '@/components/portfolio/ProjectGridTile';
import { Text } from '@/components/ui/Text';
import { colors, spacing } from '@/constants/theme';
import { getGridItems, getPaper, getProject, otherProjects } from '@/data/portfolio';
import { readPaperSlugFromPathname, readProjectSlugFromPathname } from '@/lib/modalRoutes';
import { getPaperPath, getProjectPath } from '@/lib/shareProject';
import { useModalDeepLink } from '@/lib/useModalDeepLink';

const TAB_BAR_HEIGHT = 52;
const MOBILE_GRID_INSET = spacing.sm;
const DESKTOP_GRID_INSET = spacing.lg;
const MOBILE_GRID_GAP = spacing.sm;
const DESKTOP_GRID_GAP = spacing.md;

function getTileSize(
  screenWidth: number,
  columns: number,
  horizontalPadding: number,
  gridGap: number,
): number {
  const contentWidth = screenWidth - horizontalPadding * 2;
  return Math.floor((contentWidth - gridGap * (columns - 1)) / columns);
}

function getColumns(screenWidth: number): number {
  if (screenWidth >= 900) return 3;
  return 2;
}

function getMoreColumns(screenWidth: number): number {
  if (screenWidth >= 900) return 4;
  if (screenWidth >= 640) return 3;
  return 2;
}

function resolveInitialProjectSlug(initialProjectSlug?: string): string | null {
  if (initialProjectSlug && getProject(initialProjectSlug)) return initialProjectSlug;
  return readProjectSlugFromPathname();
}

type Props = {
  initialProjectSlug?: string;
};

export function HomeScreen({ initialProjectSlug }: Props = {}) {
  const [awardsOpen, setAwardsOpen] = useState(false);
  const [papersOpen, setPapersOpen] = useState(false);
  const [stackOpen, setStackOpen] = useState(false);
  const [projectSlug, setProjectSlug] = useState<string | null>(() =>
    resolveInitialProjectSlug(initialProjectSlug),
  );
  const [paperSlug, setPaperSlug] = useState<string | null>(() => readPaperSlugFromPathname());
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isMobile = width < 640;
  const horizontalPadding = isMobile ? MOBILE_GRID_INSET : DESKTOP_GRID_INSET;
  const gridGap = isMobile ? MOBILE_GRID_GAP : DESKTOP_GRID_GAP;
  const columns = getColumns(width);
  const moreColumns = getMoreColumns(width);
  const tileSize = getTileSize(width, columns, horizontalPadding, gridGap);
  const moreTileSize = getTileSize(width, moreColumns, horizontalPadding, gridGap);
  const items = getGridItems();

  const headerTop = insets.top + spacing.sm;
  const scrollTopPad = headerTop + TAB_BAR_HEIGHT + spacing.md;

  const projectDeepLink = useModalDeepLink({
    slug: projectSlug,
    setSlug: setProjectSlug,
    getPath: getProjectPath,
    pathPrefix: '/project',
    isValidSlug: (slug) => !!getProject(slug),
    resetRouteOnClose: !!initialProjectSlug,
  });

  const paperDeepLink = useModalDeepLink({
    slug: paperSlug,
    setSlug: setPaperSlug,
    getPath: getPaperPath,
    pathPrefix: '/paper',
    isValidSlug: (slug) => !!getPaper(slug),
  });

  const rows = useMemo(() => {
    const result: (typeof items)[] = [];
    for (let i = 0; i < items.length; i += columns) {
      result.push(items.slice(i, i + columns));
    }
    return result;
  }, [items, columns]);

  const moreRows = useMemo(() => {
    const result: (typeof otherProjects)[] = [];
    for (let i = 0; i < otherProjects.length; i += moreColumns) {
      result.push(otherProjects.slice(i, i + moreColumns));
    }
    return result;
  }, [moreColumns]);

  useEffect(() => {
    const slug = resolveInitialProjectSlug(initialProjectSlug);
    if (slug) {
      setProjectSlug(slug);
      setPaperSlug(null);
    }
  }, [initialProjectSlug]);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;

    const onPopState = () => {
      const fromProject = projectDeepLink.readFromPathname();
      const fromPaper = paperDeepLink.readFromPathname();

      if (fromProject) {
        setProjectSlug(fromProject);
        setPaperSlug(null);
        return;
      }

      if (fromPaper) {
        setPaperSlug(fromPaper);
        setProjectSlug(null);
        return;
      }

      setProjectSlug(null);
      setPaperSlug(null);
    };

    onPopState();
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [paperDeepLink, projectDeepLink]);

  const handleProjectPress = useCallback(
    (slug: string) => {
      setPaperSlug(null);
      projectDeepLink.open(slug);
    },
    [projectDeepLink],
  );

  const handleProjectClose = useCallback(() => {
    projectDeepLink.close();
  }, [projectDeepLink]);

  const handleProjectsPress = () => {
    setAwardsOpen(false);
    setPapersOpen(false);
    setStackOpen(false);
  };

  const handlePapersPress = () => {
    setAwardsOpen(false);
    setStackOpen(false);
    setPapersOpen(true);
  };

  const handleAwardsPress = () => {
    setPapersOpen(false);
    setStackOpen(false);
    setAwardsOpen(true);
  };

  const handleStackPress = () => {
    setAwardsOpen(false);
    setPapersOpen(false);
    setStackOpen(true);
  };

  const handlePaperSelect = (slug: string) => {
    setPapersOpen(false);
    setProjectSlug(null);
    paperDeepLink.open(slug);
  };

  const handlePaperClose = () => {
    paperDeepLink.close();
  };

  return (
    <View style={styles.page}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: scrollTopPad,
            paddingBottom: isMobile ? 320 + insets.bottom : 220 + insets.bottom,
            paddingHorizontal: horizontalPadding,
          },
        ]}
        showsVerticalScrollIndicator
      >
        <View style={[styles.grid, { gap: gridGap }]}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={[styles.row, { gap: gridGap }]}>
              {row.map((item) => (
                <ProjectGridTile
                  key={`${item.kind}-${item.slug}`}
                  item={item}
                  size={tileSize}
                  onProjectPress={handleProjectPress}
                />
              ))}
              {row.length < columns &&
                Array.from({ length: columns - row.length }).map((_, i) => (
                  <View key={`spacer-${i}`} style={{ width: tileSize }} />
                ))}
            </View>
          ))}
        </View>

        <View style={styles.moreSection}>
          <Text variant="mono" style={styles.moreHeading}>
            More projects
          </Text>
          <View style={[styles.grid, { gap: gridGap }]}>
            {moreRows.map((row, rowIndex) => (
              <View key={`more-${rowIndex}`} style={[styles.row, { gap: gridGap }]}>
                {row.map((project) => (
                  <MoreProjectTile key={project.slug} project={project} width={moreTileSize} />
                ))}
                {row.length < moreColumns &&
                  Array.from({ length: moreColumns - row.length }).map((_, i) => (
                    <View key={`more-spacer-${i}`} style={{ width: moreTileSize }} />
                  ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.tabOverlay, { top: headerTop, pointerEvents: 'box-none' }]}>
        <FilterHeader
          projectsActive={!papersOpen && !awardsOpen && !stackOpen}
          onProjectsPress={handleProjectsPress}
          onPapersPress={handlePapersPress}
          onAwardsPress={handleAwardsPress}
          onStackPress={handleStackPress}
          papersOpen={papersOpen}
          awardsOpen={awardsOpen}
          stackOpen={stackOpen}
        />
      </View>

      <View
        style={[
          styles.dockHost,
          isMobile && styles.dockHostMobile,
          Platform.OS === 'web' && !isMobile && styles.dockHostWeb,
          { pointerEvents: 'box-none' },
        ]}
      >
        <ProfileDock compact={isMobile} bottomInset={insets.bottom} />
      </View>

      <AwardsModal visible={awardsOpen} onClose={() => setAwardsOpen(false)} />
      <StackModal visible={stackOpen} onClose={() => setStackOpen(false)} />
      <PapersModal
        visible={papersOpen}
        onClose={() => setPapersOpen(false)}
        onPaperPress={handlePaperSelect}
      />
      <PaperModal slug={paperSlug} onClose={handlePaperClose} />
      <ProjectModal slug={projectSlug} onClose={handleProjectClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
    ...(Platform.OS === 'web'
      ? ({
          height: '100dvh',
          maxHeight: '100dvh',
          overflow: 'hidden',
        } as object)
      : {}),
  },
  scroll: {
    flex: 1,
    ...(Platform.OS === 'web'
      ? ({
          minHeight: 0,
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y',
          overscrollBehaviorY: 'contain',
        } as object)
      : {}),
  },
  scrollContent: {},
  tabOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 20,
    backgroundColor: 'transparent',
  },
  grid: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  moreSection: {
    marginTop: spacing.xxl,
    marginBottom: spacing.xxxl,
    gap: spacing.md,
  },
  moreHeading: {
    fontSize: 11,
    color: colors.subtle,
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  dockHost: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  dockHostMobile: {
    paddingHorizontal: 0,
    marginBottom: 0,
  },
  dockHostWeb: {
    marginBottom: spacing.lg,
  },
});
