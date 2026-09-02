import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { WHATSAPP_BAR_MIN_HEIGHT } from '@/components/portfolio/contact/whatsappBar';
import { Button } from '@/components/ui/Button';
import { BottomSheetOverlay } from '@/components/ui/BottomSheetOverlay';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { Text } from '@/components/ui/Text';
import { getProject } from '@/data/portfolio';
import { getStoredVisitorEmail } from '@/lib/projectAccessStorage';
import { radii, spacing, type ColorPalette, typeScale } from '@/constants/tokens';
import { typography } from '@/constants/theme';

type Props = {
  projectSlug: string | null;
  onClose: () => void;
  onContinue: (email: string, projectSlug: string) => void;
  isSubmitting?: boolean;
  error?: string | null;
};

const BAR_HEIGHT = WHATSAPP_BAR_MIN_HEIGHT;
const INPUT_LINE_HEIGHT = 22;
const INPUT_FONT_SIZE = typeScale.lg;
const INPUT_FONT_SIZE_COMPACT = typeScale.base;
const MOBILE_RADIUS = 24;

function createStyles(p: ColorPalette, isMobile: boolean) {
  return StyleSheet.create({
    panel: {
      borderTopLeftRadius: isMobile ? MOBILE_RADIUS : radii.dock,
      borderTopRightRadius: isMobile ? MOBILE_RADIUS : radii.dock,
      borderBottomLeftRadius: isMobile ? 0 : radii.dock,
      borderBottomRightRadius: isMobile ? 0 : radii.dock,
      paddingTop: spacing.lg,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.lg,
      gap: spacing.md,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: spacing.md,
    },
    headerText: {
      flex: 1,
      gap: spacing.xs,
      minWidth: 0,
      paddingRight: spacing.sm,
    },
    title: {
      lineHeight: 26,
    },
    projectName: {
      lineHeight: 24,
    },
    body: {
      lineHeight: 22,
    },
    closeHit: {
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -spacing.xs,
      marginRight: -spacing.sm,
      flexShrink: 0,
    },
    closeIcon: {
      fontSize: 28,
      lineHeight: 30,
      color: p.muted,
    },
    bar: {
      flexDirection: 'row',
      alignItems: 'stretch',
      height: BAR_HEIGHT,
      borderRadius: 999,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: p.border,
      backgroundColor: p.glass.chip,
      overflow: 'hidden',
      paddingLeft: spacing.md,
    },
    inputWrap: {
      flex: 1,
      minWidth: 0,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingRight: spacing.sm,
    },
    input: {
      flex: 1,
      minWidth: 0,
      height: INPUT_LINE_HEIGHT,
      fontFamily: typography.sans,
      fontSize: INPUT_FONT_SIZE,
      lineHeight: INPUT_LINE_HEIGHT,
      color: p.foreground,
      backgroundColor: 'transparent',
      borderWidth: 0,
      padding: 0,
      margin: 0,
    },
    inputWeb: {
      outlineStyle: 'none',
    } as object,
    inputAndroid: {
      includeFontPadding: false,
    },
    error: {
      color: '#B42318',
      marginTop: -spacing.xs,
    },
    submitWrap: {
      height: BAR_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 108,
      paddingHorizontal: spacing.lg,
    },
  });
}

export function ProjectEmailGate({
  projectSlug,
  onClose,
  onContinue,
  isSubmitting = false,
  error = null,
}: Props) {
  const { palette } = useTheme();
  const { width } = useWindowDimensions();
  const isMobile = width < 640;
  const compact = width < 380;
  const styles = useMemo(() => createStyles(palette, isMobile), [isMobile, palette]);
  const [email, setEmail] = useState(() => getStoredVisitorEmail() ?? '');
  const [buttonHovered, setButtonHovered] = useState(false);

  const project = projectSlug ? getProject(projectSlug) : undefined;
  const visible = projectSlug !== null && !!project;
  const canSubmit = email.trim().length > 0 && !isSubmitting;

  useEffect(() => {
    if (visible) {
      setEmail(getStoredVisitorEmail() ?? '');
    }
  }, [projectSlug, visible]);

  const handleSubmit = () => {
    if (!projectSlug || !project) return;
    const trimmed = email.trim();
    if (!trimmed) return;
    onContinue(trimmed, projectSlug);
  };

  const webButtonHoverProps =
    Platform.OS === 'web'
      ? ({
          onMouseEnter: () => setButtonHovered(true),
          onMouseLeave: () => setButtonHovered(false),
        } as object)
      : {};

  return (
    <BottomSheetOverlay visible={visible} onClose={onClose}>
      <GlassSurface intensity="panel" rounded={0} style={styles.panel}>
        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <Text variant="title" style={styles.title}>
              View project
            </Text>
            <Text variant="subtitle" style={styles.projectName}>
              {project?.title}
            </Text>
            <Text variant="body" muted style={styles.body}>
              Thanks for your interest. Please add your email to explore my work.
            </Text>
          </View>
          <Pressable
            style={styles.closeHit}
            onPress={onClose}
            accessibilityLabel="Close"
            hitSlop={8}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </Pressable>
        </View>

        <View style={styles.bar}>
          <View style={styles.inputWrap}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@company.com"
              placeholderTextColor={palette.muted}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              editable={!isSubmitting}
              returnKeyType="go"
              onSubmitEditing={handleSubmit}
              style={[
                styles.input,
                {
                  fontSize: compact ? INPUT_FONT_SIZE_COMPACT : INPUT_FONT_SIZE,
                },
                Platform.OS === 'web' && styles.inputWeb,
                Platform.OS === 'android' && styles.inputAndroid,
              ]}
              accessibilityLabel="Email address"
            />
          </View>
          {isSubmitting ? (
            <View style={styles.submitWrap}>
              <ActivityIndicator color={palette.foreground} />
            </View>
          ) : (
            <Button
              variant="action"
              dividerLeft
              label="Continue"
              onPress={handleSubmit}
              disabled={!canSubmit}
              hovered={buttonHovered}
              style={{ height: BAR_HEIGHT }}
              accessibilityLabel="Continue to project"
              {...webButtonHoverProps}
            />
          )}
        </View>

        {error ? (
          <Text variant="caption" style={styles.error}>
            {error}
          </Text>
        ) : null}
      </GlassSurface>
    </BottomSheetOverlay>
  );
}
