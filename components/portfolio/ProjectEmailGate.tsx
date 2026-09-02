import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, useWindowDimensions, View } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { WHATSAPP_BAR_MIN_HEIGHT } from '@/components/portfolio/contact/whatsappBar';
import { Button } from '@/components/ui/Button';
import { AutoGrowInputBar, DEFAULT_AUTO_GROW_METRICS } from '@/components/ui/AutoGrowInputBar';
import { BottomSheetOverlay } from '@/components/ui/BottomSheetOverlay';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { Text } from '@/components/ui/Text';
import { lineHeights, radii, spacing, type ColorPalette, typeScale } from '@/design-system';
import { getProject } from '@/data/portfolio';
import { getStoredVisitorEmail } from '@/lib/projectAccessStorage';
import { isValidEmail } from '@/lib/validateEmail';

type Props = {
  projectSlug: string | null;
  onClose: () => void;
  onContinue: (email: string, projectSlug: string) => void;
  isSubmitting?: boolean;
  error?: string | null;
};

const INPUT_LINE_HEIGHT = lineHeights.bodyLarge;
const INPUT_FONT_SIZE = typeScale.bodyLarge;
const INPUT_FONT_SIZE_COMPACT = typeScale.bodyMedium;
const INVALID_EMAIL_MESSAGE = 'Enter a valid email address.';

/** Single-line email bar — same shell, no vertical growth. */
const EMAIL_BAR_METRICS = {
  ...DEFAULT_AUTO_GROW_METRICS,
  minInputHeight: INPUT_LINE_HEIGHT,
  maxInputHeight: INPUT_LINE_HEIGHT,
  minBarHeight: WHATSAPP_BAR_MIN_HEIGHT,
  maxBarHeight: WHATSAPP_BAR_MIN_HEIGHT,
};

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    panel: {
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
    closeIcon: {
      fontSize: typeScale.headlineSmall,
      lineHeight: lineHeights.headlineSmall,
      color: p.icon.muted,
    },
    error: {
      color: p.destructive,
      marginTop: -spacing.xs,
    },
    submitWrap: {
      height: WHATSAPP_BAR_MIN_HEIGHT,
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
  const styles = useMemo(() => createStyles(palette), [palette]);
  const [email, setEmail] = useState(() => getStoredVisitorEmail() ?? '');
  const [buttonHovered, setButtonHovered] = useState(false);
  const [touched, setTouched] = useState(false);

  const project = projectSlug ? getProject(projectSlug) : undefined;
  const visible = projectSlug !== null && !!project;
  const trimmedEmail = email.trim();
  const emailIsValid = isValidEmail(trimmedEmail);
  const showValidationError = touched && trimmedEmail.length > 0 && !emailIsValid;
  const canSubmit = emailIsValid && !isSubmitting;

  useEffect(() => {
    if (visible) {
      setEmail(getStoredVisitorEmail() ?? '');
      setTouched(false);
    }
  }, [projectSlug, visible]);

  const handleSubmit = () => {
    if (!projectSlug || !project) return;
    setTouched(true);
    if (!isValidEmail(email)) return;
    onContinue(email.trim(), projectSlug);
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
      <GlassSurface
        intensity="panel"
        rounded={isMobile ? radii.dockMobile : radii.dock}
        roundedCorners={isMobile ? 'top' : 'all'}
        style={styles.panel}
      >
        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <Text variant="title">View {project?.title}</Text>
            <Text variant="body" muted>
              Thanks for your interest!
            </Text>
          </View>
          <Button
            variant="icon"
            onPress={onClose}
            accessibilityLabel="Close"
            icon={<Text style={styles.closeIcon}>✕</Text>}
          />
        </View>

        <AutoGrowInputBar
          value={email}
          onChangeText={setEmail}
          metrics={EMAIL_BAR_METRICS}
          fontSize={compact ? INPUT_FONT_SIZE_COMPACT : INPUT_FONT_SIZE}
          lineHeight={INPUT_LINE_HEIGHT}
          placeholder="you@company.com"
          placeholderTextColor={palette.muted}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          textContentType="emailAddress"
          editable={!isSubmitting}
          returnKeyType="go"
          onSubmitEditing={handleSubmit}
          onBlur={() => setTouched(true)}
          accessibilityLabel="Email address"
          action={({ barHeight }) =>
            isSubmitting ? (
              <View style={styles.submitWrap}>
                <ActivityIndicator color={palette.foreground} />
              </View>
            ) : (
              <Button
                variant="primary"
                size="lg"
                dividerLeft
                label="Continue"
                onPress={handleSubmit}
                disabled={!canSubmit}
                hovered={buttonHovered}
                style={{ height: barHeight }}
                accessibilityLabel="Continue to project"
                {...webButtonHoverProps}
              />
            )
          }
        />

        {showValidationError ? (
          <Text variant="caption" style={styles.error}>
            {INVALID_EMAIL_MESSAGE}
          </Text>
        ) : null}

        {error ? (
          <Text variant="caption" style={styles.error}>
            {error}
          </Text>
        ) : null}
      </GlassSurface>
    </BottomSheetOverlay>
  );
}
