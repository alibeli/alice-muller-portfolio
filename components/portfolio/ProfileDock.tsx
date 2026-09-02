import { useEffect, useRef, useState, useMemo } from 'react';
import {
  Image,
  LayoutChangeEvent,
  Linking,
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/components/ThemeProvider';
import { WhatsAppTextMe } from '@/components/portfolio/contact/WhatsAppTextMe';
import { Button } from '@/components/ui/Button';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { GithubIcon, LinkedInIcon } from '@/components/ui/icons/SocialIcons';
import { ThemeToggleChip } from '@/components/ui/ThemeToggleChip';
import { Text } from '@/components/ui/Text';
import { fontWeights, lineHeights, radii, spacing, buttonSizes, type ColorPalette, typeScale } from '@/design-system';
import { profile, profileDetails } from '@/data/portfolio';

type Props = {
  compact?: boolean;
  bottomInset?: number;
};

const ANIM_MS = 240;
const HEADSHOT_SIZE_DESKTOP = 80;
const HEADSHOT_SIZE_MOBILE = 68;

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    card: {
      paddingTop: spacing.lg,
      paddingHorizontal: spacing.lg,
      ...(Platform.OS === 'web'
        ? ({ boxShadow: p.shadow.dock } as object)
        : {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.08,
            shadowRadius: 24,
            elevation: 8,
          }),
    },
    cardDesktop: {
      maxWidth: 560,
      width: '100%',
    },
    cardMobile: {
      width: '100%',
    },
    cardNarrow: {
      paddingTop: spacing.md,
      paddingHorizontal: spacing.md,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing.md,
    },
    identityText: {
      flex: 1,
      gap: spacing.xxs,
      minWidth: 0,
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      flexWrap: 'wrap',
    },
    name: {
      fontSize: typeScale.titleMedium,
      lineHeight: lineHeights.titleMedium,
    },
    credentials: {
      marginTop: spacing.xxs,
    },
    tagline: {
      marginTop: spacing.xxs,
    },
    taglineAreas: {},
    actionsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginTop: spacing.xs,
      minHeight: 32,
    },
    expandBtn: {
      height: buttonSizes.sm.height,
      justifyContent: 'center',
    },
    headshot: {
      borderRadius: radii.headshot,
      backgroundColor: p.surface,
      flexShrink: 0,
    },
    headshotNarrow: {
      borderRadius: 18,
    },
    expandLabel: {
      color: p.foreground,
      fontWeight: fontWeights.medium,
    },
    details: {
      marginTop: spacing.sm,
      gap: spacing.sm,
      paddingBottom: spacing.sm,
    },
    detailBlock: {
      gap: spacing.xxs,
    },
    detailBlockLast: {
      paddingBottom: spacing.sm,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.sm,
      paddingVertical: spacing.xxs,
      width: '100%',
    },
    sectionButton: {
      width: '100%',
      minWidth: 0,
      paddingHorizontal: 0,
    },
    detailTitle: {
      fontWeight: fontWeights.semibold,
      color: p.foreground,
      flex: 1,
    },
    chevron: {
      color: p.muted,
    },
    sectionBody: {
      gap: spacing.xxs,
      paddingTop: spacing.xxs,
      paddingBottom: spacing.xs,
    },
    detailLine: {},
    socialRow: {
      flexDirection: 'row',
      gap: spacing.xs,
      alignItems: 'center',
      flexShrink: 0,
    },
    textMeRow: {
      marginTop: spacing.md,
    },
  });
}

function CollapsibleSection({
  title,
  lines,
  isLast = false,
  styles,
}: {
  title: string;
  lines: string[];
  isLast?: boolean;
  styles: ReturnType<typeof createStyles>;
}) {
  const [open, setOpen] = useState(false);
  const contentHeight = useSharedValue(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(open ? 1 : 0, { duration: ANIM_MS });
  }, [open, progress]);

  const onContentLayout = (e: LayoutChangeEvent) => {
    contentHeight.value = e.nativeEvent.layout.height;
  };

  const bodyStyle = useAnimatedStyle(() => ({
    height: contentHeight.value * progress.value,
    opacity: progress.value,
    overflow: 'hidden',
  }));

  return (
    <View style={[styles.detailBlock, isLast && styles.detailBlockLast]}>
      <Button
        variant="tertiary"
        onPress={() => setOpen((v) => !v)}
        style={styles.sectionButton}
        contentStyle={styles.sectionHeader}
      >
        <Text variant="caption" style={styles.detailTitle}>
          {title}
        </Text>
        <Text variant="caption" style={styles.chevron}>
          {open ? '↑' : '↓'}
        </Text>
      </Button>

      <Animated.View style={bodyStyle}>
        <View onLayout={onContentLayout} style={styles.sectionBody}>
          {lines.map((line) => (
            <Text key={line} variant="caption" muted style={styles.detailLine}>
              {line}
            </Text>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

export function ProfileDock({ compact = false, bottomInset = 0 }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { width } = useWindowDimensions();
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);
  const narrow = compact && width < 380;
  const headshotSize = compact ? HEADSHOT_SIZE_MOBILE : HEADSHOT_SIZE_DESKTOP;

  const detailsHeight = useSharedValue(0);
  const detailsProgress = useSharedValue(0);
  const measuredRef = useRef(false);

  useEffect(() => {
    detailsProgress.value = withTiming(expanded ? 1 : 0, { duration: ANIM_MS });
  }, [expanded, detailsProgress]);

  const onDetailsLayout = (e: LayoutChangeEvent) => {
    detailsHeight.value = e.nativeEvent.layout.height;
    measuredRef.current = true;
  };

  const detailsStyle = useAnimatedStyle(() => ({
    height: detailsHeight.value * detailsProgress.value,
    opacity: detailsProgress.value,
    overflow: 'hidden',
  }));

  return (
    <GlassSurface
      rounded={compact ? radii.dockMobile : radii.dock}
      roundedCorners={compact ? 'top' : 'all'}
      intensity="medium"
      style={[
        styles.card,
        compact ? styles.cardMobile : styles.cardDesktop,
        narrow && styles.cardNarrow,
        { paddingBottom: spacing.lg + bottomInset },
      ]}
    >
      <View style={styles.topRow}>
        <Image
          source={profile.headshotLocal}
          style={[
            styles.headshot,
            narrow && styles.headshotNarrow,
            { width: headshotSize, height: headshotSize },
          ]}
          resizeMode="cover"
        />
        <View style={styles.identityText}>
          <View style={styles.nameRow}>
            <Text variant="title" style={styles.name} numberOfLines={2}>
              {profile.name}
            </Text>
            <ThemeToggleChip />
          </View>
          <Text variant="caption" muted style={styles.tagline}>
            {profile.tagline}
          </Text>
          {!narrow ? (
            <Text variant="caption" muted style={styles.taglineAreas}>
              {profile.taglineAreas}
            </Text>
          ) : null}
          <Text variant="caption" muted style={styles.credentials}>
            {profile.credentials}
          </Text>

          <View style={styles.actionsRow}>
            <View style={styles.socialRow}>
              <SocialChip label="LinkedIn" url={profile.linkedin} icon="linkedin" />
              <SocialChip label="Github" url={profile.github} icon="github" />
            </View>
            <Button
              variant="tertiary"
              onPress={() => setExpanded((v) => !v)}
              style={[styles.expandBtn, { paddingHorizontal: 0, minWidth: 0 }]}
            >
              <Text variant="label" style={styles.expandLabel}>
                {expanded ? 'Show less ↑' : 'About Alice ↓'}
              </Text>
            </Button>
          </View>
        </View>
      </View>

      <Animated.View style={detailsStyle}>
        <View onLayout={onDetailsLayout} style={styles.details}>
          {profileDetails.map((block, index) => (
            <CollapsibleSection
              key={block.title}
              title={block.title}
              lines={block.lines}
              isLast={index === profileDetails.length - 1}
              styles={styles}
            />
          ))}
        </View>
      </Animated.View>

      <View style={styles.textMeRow}>
        <WhatsAppTextMe phoneDigits={profile.whatsappPhone} />
      </View>
    </GlassSurface>
  );
}

function SocialChip({
  label,
  url,
  icon,
}: {
  label: string;
  url: string;
  icon: 'linkedin' | 'github';
}) {
  return (
    <Button
      variant="secondary"
      size="sm"
      label={label}
      onPress={() => Linking.openURL(url)}
      icon={icon === 'linkedin' ? <LinkedInIcon size={13} /> : <GithubIcon size={13} />}
      contentStyle={{ gap: spacing.xxs }}
    />
  );
}
