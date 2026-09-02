import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useProjectAccess } from '@/components/providers/ProjectAccessProvider';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { getProject } from '@/data/portfolio';
import { radii, spacing, type ColorPalette } from '@/constants/tokens';

type Props = {
  visible: boolean;
  projectSlug: string | null;
  onClose: () => void;
  onGranted: (slug: string) => void;
};

function createStyles(p: ColorPalette) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.lg,
      backgroundColor: p.overlay.dark,
    },
    card: {
      width: '100%',
      maxWidth: 420,
      borderRadius: radii.dock,
      padding: spacing.lg,
      gap: spacing.md,
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

export function ProjectEmailGateModal({ visible, projectSlug, onClose, onGranted }: Props) {
  const insets = useSafeAreaInsets();
  const { palette } = useTheme();
  const styles = useMemo(() => createStyles(palette), [palette]);
  const { storedEmail, requestAccess, isSubmitting, error, clearError } = useProjectAccess();
  const [email, setEmail] = useState(storedEmail ?? '');

  const project = projectSlug ? getProject(projectSlug) : undefined;

  useEffect(() => {
    if (visible) {
      setEmail(storedEmail ?? '');
      clearError();
    }
  }, [clearError, storedEmail, visible]);

  const handleSubmit = async () => {
    if (!projectSlug || !project) return;
    clearError();
    try {
      await requestAccess({
        email,
        projectSlug,
        projectTitle: project.title,
      });
      onGranted(projectSlug);
    } catch {
      // error state handled in provider
    }
  };

  if (!visible || !project) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[styles.overlay, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close" />
        <GlassSurface intensity="panel" style={styles.card}>
          <Pressable style={styles.closeHit} onPress={onClose} accessibilityLabel="Close email form">
            <Text variant="body" muted>
              ✕
            </Text>
          </Pressable>

          <Text variant="title" style={styles.title}>
            View {project.title}
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
            onSubmitEditing={() => void handleSubmit()}
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
                  onPress={() => void handleSubmit()}
                  disabled={!email.trim() || isSubmitting}
                />
              )}
            </View>
          </View>
        </GlassSurface>
      </KeyboardAvoidingView>
    </Modal>
  );
}
