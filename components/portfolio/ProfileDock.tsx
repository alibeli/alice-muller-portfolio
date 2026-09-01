import { useEffect, useRef, useState } from 'react';
import {
  Image,
  LayoutChangeEvent,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { WhatsAppTextMe } from '@/components/portfolio/contact/WhatsAppTextMe';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { GithubIcon, LinkedInIcon } from '@/components/ui/icons/SocialIcons';
import { Text } from '@/components/ui/Text';
import { colors, radii, spacing } from '@/constants/theme';
import { profile, profileDetails } from '@/data/portfolio';
import { isCoarsePointerDevice } from '@/lib/mobileWeb';

type Props = {
  compact?: boolean;
  bottomInset?: number;
};

const MOBILE_RADIUS = radii.dockMobile;
const ANIM_MS = 240;

function CollapsibleSection({
  title,
  lines,
  isLast = false,
}: {
  title: string;
  lines: string[];
  isLast?: boolean;
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
      <Pressable
        onPress={() => setOpen((v) => !v)}
        style={({ pressed }) => [styles.sectionHeader, pressed && styles.pressed]}
      >
        <Text variant="caption" style={styles.detailTitle}>
          {title}
        </Text>
        <Text variant="caption" style={styles.chevron}>
          {open ? '↑' : '↓'}
        </Text>
      </Pressable>

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
  const [identityHeight, setIdentityHeight] = useState(88);
  const { width } = useWindowDimensions();
  const narrow = compact && width < 380;
  const touchGlass = isCoarsePointerDevice();

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
      rounded={compact ? MOBILE_RADIUS : radii.dock}
      corners={compact ? 'top' : 'all'}
      intensity="medium"
      style={[
        styles.card,
        compact ? styles.cardMobile : styles.cardDesktop,
        touchGlass && styles.cardTouchFallback,
        { paddingBottom: spacing.lg + bottomInset },
      ]}
    >
      <View style={[styles.topRow, narrow && styles.topRowNarrow]}>
        <Image
          source={profile.headshotLocal}
          style={[
            styles.headshot,
            narrow && styles.headshotNarrow,
            { width: narrow ? 72 : identityHeight, height: narrow ? 72 : identityHeight },
          ]}
          resizeMode="cover"
        />
        <View
          style={styles.identityText}
          onLayout={(e) => {
            if (!narrow) setIdentityHeight(e.nativeEvent.layout.height);
          }}
        >
          <Text variant="title" style={styles.name} numberOfLines={2}>
            {profile.name}
          </Text>
          <Text variant="caption" muted style={styles.credentials}>
            {profile.credentials}
          </Text>
          <Text variant="caption" muted style={styles.tagline}>
            {profile.tagline}
          </Text>
          <Text variant="caption" muted style={styles.taglineAreas}>
            {profile.taglineAreas}
          </Text>

          <View style={[styles.actionsRow, narrow && styles.actionsRowNarrow]}>
            <View style={[styles.socialRow, narrow && styles.socialRowNarrow]}>
              <SocialChip label="LinkedIn" url={profile.linkedin} icon="linkedin" />
              <SocialChip label="Github" url={profile.github} icon="github" />
            </View>
            <Pressable
              onPress={() => setExpanded((v) => !v)}
              style={({ pressed }) => [styles.expandBtn, pressed && styles.pressed]}
            >
              <Text variant="caption" style={styles.expandLabel}>
                {expanded ? 'Show less ↑' : 'More about me ↓'}
              </Text>
            </Pressable>
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
    <Pressable
      onPress={() => Linking.openURL(url)}
      style={({ pressed }) => [styles.socialChip, pressed && styles.pressed]}
    >
      {icon === 'linkedin' ? <LinkedInIcon size={13} /> : <GithubIcon size={13} />}
      <Text variant="mono" style={styles.socialLabel}>
        {label}
      </Text>
    </Pressable>
  );
}

const shadow = Platform.select({
  web: {
    boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
  },
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
  },
  android: {
    elevation: 8,
  },
  default: {},
});

const styles = StyleSheet.create({
  card: {
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    ...shadow,
  },
  cardDesktop: {
    maxWidth: 560,
    width: '100%',
  },
  cardMobile: {
    width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardTouchFallback: {
    borderColor: colors.border,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: spacing.md,
  },
  topRowNarrow: {
    alignItems: 'flex-start',
  },
  identityText: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  name: {
    fontSize: 18,
    lineHeight: 22,
  },
  credentials: {
    lineHeight: 16,
    fontSize: 11,
    marginTop: 1,
  },
  tagline: {
    lineHeight: 18,
    marginTop: 1,
  },
  taglineAreas: {
    lineHeight: 18,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.xs,
    minHeight: 32,
    width: '100%',
  },
  actionsRowNarrow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  expandBtn: {
    height: 32,
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  headshot: {
    borderRadius: radii.headshot,
    backgroundColor: colors.surface,
    flexShrink: 0,
  },
  headshotNarrow: {
    borderRadius: 20,
  },
  expandLabel: {
    color: colors.foreground,
    fontWeight: '500',
    fontSize: 12,
  },
  details: {
    marginTop: spacing.sm,
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  detailBlock: {
    gap: 2,
  },
  detailBlockLast: {
    paddingBottom: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    paddingVertical: 2,
  },
  detailTitle: {
    fontWeight: '600',
    color: colors.foreground,
    lineHeight: 18,
    flex: 1,
  },
  chevron: {
    color: colors.muted,
    fontSize: 12,
  },
  sectionBody: {
    gap: 2,
    paddingTop: 2,
    paddingBottom: spacing.xs,
  },
  detailLine: {
    lineHeight: 18,
    fontSize: 12,
  },
  socialRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    alignItems: 'center',
    flexShrink: 0,
    flexWrap: 'wrap',
  },
  socialRowNarrow: {
    width: '100%',
  },
  textMeRow: {
    marginTop: spacing.md,
  },
  socialChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: 32,
    paddingHorizontal: spacing.sm,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  socialLabel: {
    fontSize: 10,
  },
  pressed: {
    opacity: 0.65,
  },
});
