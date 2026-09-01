import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Platform, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AwardsModal } from '@/components/portfolio/AwardsModal';
import { PaperModal } from '@/components/portfolio/PaperModal';
import { PapersModal } from '@/components/portfolio/PapersModal';
import { ProjectModal } from '@/components/portfolio/ProjectModal';
import { StackModal } from '@/components/portfolio/StackModal';
import { FilterHeader } from '@/components/portfolio/FilterHeader';
import { ProfileDock } from '@/components/portfolio/ProfileDock';
import { ProjectGridTile } from '@/components/portfolio/ProjectGridTile';
import { colors, layout, spacing } from '@/constants/theme';
import { getGridItems, getPaper, getProject } from '@/data/portfolio';
import { isMobileLayout } from '@/lib/pageLayout';
import { mobileWebPageStyle, mobileWebScrollStyle } from '@/lib/mobileWeb';

const TAB_BAR_HEIGHT = 52;
const MOBILE_GRID_INSET = layout.pagePaddingMobile;
const DESKTOP_GRID_INSET = layout.pagePaddingDesktop;
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

type HomeScreenProps = {
  initialProjectSlug?: string;
};

export default function HomeScreen({ initialProjectSlug }: HomeScreenProps = {}) {
  const router = useRouter();
  const [awardsOpen, setAwardsOpen] = useState(false);
  const [papersOpen, setPapersOpen] = useState(false);
  const [stackOpen, setStackOpen] = useState(false);
  const [projectSlug, setProjectSlug] = useState<string | null>(() => {
    if (initialProjectSlug && getProject(initialProjectSlug)) return initialProjectSlug;
    return null;
  });
  const [paperSlug, setPaperSlug] = useState<string | null>(null);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const safeWidth = Math.max(width, 1);
  const isMobile = isMobileLayout(safeWidth);
  const horizontalPadding = isMobile ? MOBILE_GRID_INSET : DESKTOP_GRID_INSET;
  const gridGap = isMobile ? MOBILE_GRID_GAP : DESKTOP_GRID_GAP;
  const columns = getColumns(safeWidth);
  const tileSize = getTileSize(safeWidth, columns, horizontalPadding, gridGap);
  const items = getGridItems();

  const headerTop = insets.top + spacing.sm;
  const scrollTopPad = headerTop + TAB_BAR_HEIGHT + spacing.md;

  const rows = useMemo(() => {
    const result: (typeof items)[] = [];
    for (let i = 0; i < items.length; i += columns) {
      result.push(items.slice(i, i + columns));
    }
    return result;
  }, [items, columns]);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    const projectMatch = window.location.pathname.match(/^\/project\/([^/]+)\/?$/);
    if (projectMatch) {
      const slug = decodeURIComponent(projectMatch[1]);
      if (getProject(slug)) setProjectSlug(slug);
      return;
    }
    const paperMatch = window.location.pathname.match(/^\/paper\/([^/]+)\/?$/);
    if (paperMatch) {
      const slug = decodeURIComponent(paperMatch[1]);
      if (getPaper(slug)) setPaperSlug(slug);
    }
  }, []);

  const handleProjectClose = () => {
    setProjectSlug(null);
    const onProjectRoute =
      !!initialProjectSlug ||
      (Platform.OS === 'web' &&
        typeof window !== 'undefined' &&
        window.location.pathname.startsWith('/project/'));
    if (onProjectRoute) {
      router.replace('/');
    }
  };

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
    setPaperSlug(slug);
  };

  const handlePaperClose = () => {
    setPaperSlug(null);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      if (window.location.pathname.startsWith('/paper/')) {
        window.history.replaceState({}, '', '/');
      }
    }
  };

  return (
    <View style={[styles.page, mobileWebPageStyle]}>
      <ScrollView
        style={[styles.scroll, mobileWebScrollStyle]}
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
                  onProjectPress={setProjectSlug}
                />
              ))}
              {row.length < columns &&
                Array.from({ length: columns - row.length }).map((_, i) => (
                  <View key={`spacer-${i}`} style={{ width: tileSize }} />
                ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating tab pill — absolute overlay, no full-width background */}
      <View
        style={[styles.tabOverlay, { top: headerTop }]}
        pointerEvents="box-none"
      >
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
        ]}
        pointerEvents="box-none"
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
  },
  scroll: {},
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
  dockHost: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    alignItems: 'stretch',
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
