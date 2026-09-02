import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { CenterOverlay } from '@/components/ui/CenterOverlay';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { getProject } from '@/data/portfolio';
import { getStoredVisitorEmail } from '@/lib/projectAccessStorage';
import { radii, spacing, type ColorPalette } from '@/constants/tokens';

type Props = {
  projectSlug: string | null;
  onClose: () => void;
  onContinue: (email: string, projectSlug: string) => void;
  isSubmitting?: boolean;
  error?: string | null;
};

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    card: {
      width: '100%',
      maxWidth: 420,
      borderRadius: radii.dock,
      padding: spacing.lg,
      gap: spacing.md,
      zIndex: 1,
    },
    title: {
      marginBottom: spacing.xs,
    },
    body: {
      lineHeight: 22,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: spacing.sm,
      marginTop: spacing.sm,
    },
    submitWrap: {
      minWidth: 120,
      alignItems: 'center',
      justifyContent: 'center',
    },
    error: {
      color: '#B42318',
    },
    closeHit: {
      position: 'absolute',
      top: spacing.sm,
      right: spacing.sm,
      zIndex: 2,
      padding: spacing.xs,
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
  const styles = useMemo(() => createStyles(palette), [palette]);
  const [email, setEmail] = useState(() => getStoredVisitorEmail() ?? '');

  const project = projectSlug ? getProject(projectSlug) : undefined;
  const visible = projectSlug !== null && !!project;

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

  return (
    <CenterOverlay visible={visible} onClose={onClose}>
      <GlassSurface intensity="panel" style={styles.card}>
        <Pressable style={styles.closeHit} onPress={onClose} accessibilityLabel="Close email form">
          <Text variant="body" muted>
            ✕
          </Text>
        </Pressable>

        <Text variant="title" style={styles.title}>
          View {project?.title}
        </Text>
        <Text variant="body" muted style={styles.body}>
          Enter your email to open this project. I use it to know who is exploring my work and may
          follow up about opportunities.
        </Text>

        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="you@company.com"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          textContentType="emailAddress"
          editable={!isSubmitting}
          onSubmitEditing={handleSubmit}
        />

        {error ? (
          <Text variant="caption" style={styles.error}>
            {error}
          </Text>
        ) : null}

        <View style={styles.actions}>
          <Button variant="ghost" label="Cancel" onPress={onClose} disabled={isSubmitting} />
          <View style={styles.submitWrap}>
            {isSubmitting ? (
              <ActivityIndicator color={palette.foreground} />
            ) : (
              <Button
                variant="chip"
                label="Continue"
                onPress={handleSubmit}
                disabled={!email.trim() || isSubmitting}
              />
            )}
          </View>
        </View>
      </GlassSurface>
    </CenterOverlay>
  );
}
