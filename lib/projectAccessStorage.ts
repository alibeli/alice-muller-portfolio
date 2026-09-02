import { Platform } from 'react-native';

/** Legacy key — email is session-only now; cleared on app load. */
const LEGACY_STORAGE_KEY = 'portfolio-visitor-email';

/** Remove persisted email from older builds so refresh always prompts again. */
export function clearLegacyVisitorEmail(): void {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  }
}
