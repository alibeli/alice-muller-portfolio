import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { BottomSheetOverlay } from '@/components/ui/BottomSheetOverlay';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { Text } from '@/components/ui/Text';
import { lineHeights, radii, spacing, TOUCH_TARGET_MIN, type ColorPalette, typeScale } from '@/design-system';
import { getProject } from '@/data/portfolio';
import { isMobileLayout, isNarrowLayout } from '@/lib/modalLayout';
import { isValidEmail, normalizeEmail } from '@/lib/validateEmail';

type Props = {
  projectSlug: string | null;
  onClose: () => void;
  onContinue: (email: string, projectSlug: string) => void;
  isSubmitting?: boolean;
  error?: string | null;
};

const INVALID_EMAIL_MESSAGE = 'Enter a valid email address.';

function createStyles(p: ColorPalette, narrow: boolean) {
  return StyleSheet.create({
    panel: {
      paddingTop: narrow ? spacing.md : spacing.lg,
      paddingHorizontal: narrow ? spacing.md : spacing.lg,
      paddingBottom: spacing.lg,
      gap: spacing.md,
    },
    panelMobile: {
      width: '100%',
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
      color: p.icon.muted,
      fontSize: typeScale.headlineSmall,
      lineHeight: lineHeights.headlineSmall,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: TOUCH_TARGET_MIN,
      borderRadius: radii.pill,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: p.border,
      backgroundColor: p.glass.chip,
      overflow: 'hidden',
    },
    input: {
      flex: 1,
      minWidth: 0,
      height: TOUCH_TARGET_MIN,
      paddingHorizontal: spacing.lg,
      fontSize: narrow ? typeScale.bodyMedium : typeScale.bodyLarge,
      lineHeight: lineHeights.bodyLarge,
      color: p.foreground,
      ...(Platform.OS === 'web'
        ? ({
            outlineStyle: 'none',
            overflow: 'hidden',
          } as object)
        : {}),
    },
    submitWrap: {
      height: TOUCH_TARGET_MIN,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 88,
      paddingHorizontal: spacing.lg,
    },
    error: {
      color: p.destructive,
      marginTop: -spacing.xs,
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
  const insets = useSafeAreaInsets();
  const isMobile = isMobileLayout(width);
  const narrow = isNarrowLayout(width);
  const styles = useMemo(() => createStyles(palette, narrow), [palette, narrow]);
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const project = projectSlug ? getProject(projectSlug) : undefined;
  const visible = projectSlug !== null && !!project;
  const trimmedEmail = email.trim();
  const emailIsValid = isValidEmail(trimmedEmail);
  const showValidationError = touched && trimmedEmail.length > 0 && !emailIsValid;
  const canSubmit = emailIsValid && !isSubmitting;

  useEffect(() => {
    if (visible) {
      setEmail('');
      setTouched(false);
    }
  }, [projectSlug, visible]);

  const handleSubmit = () => {
    if (!projectSlug || !project) return;
    setTouched(true);
    const normalized = normalizeEmail(email);
    if (!normalized) return;
    onContinue(normalized, projectSlug);
  };

  return (
    <BottomSheetOverlay visible={visible} onClose={onClose} compact={isMobile}>
      <GlassSurface
        intensity="panel"
        rounded={isMobile ? radii.dockMobile : radii.dock}
        roundedCorners={isMobile ? 'top' : 'all'}
        style={[
          styles.panel,
          isMobile && styles.panelMobile,
          isMobile && { paddingBottom: spacing.lg + insets.bottom },
        ]}
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
            icon={
              <Text style={styles.closeIcon} accessibilityElementsHidden importantForAccessibility="no">
                ✕
              </Text>
            }
          />
        </View>

        <View style={styles.inputRow}>
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
            onBlur={() => setTouched(true)}
            accessibilityLabel="Email address"
            multiline={false}
            scrollEnabled={false}
            style={styles.input}
          />
          {isSubmitting ? (
            <View style={styles.submitWrap}>
              <ActivityIndicator color={palette.foreground} />
            </View>
          ) : (
            <Button
              variant="primary"
              size="lg"
              dividerLeft
              label="View"
              onPress={handleSubmit}
              disabled={!canSubmit}
              accessibilityLabel="View project"
              style={{ height: TOUCH_TARGET_MIN, borderRadius: 0 }}
            />
          )}
        </View>

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
