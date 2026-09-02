import { Platform } from 'react-native';

const STORAGE_KEY = 'portfolio-visitor-email';

export function getStoredVisitorEmail(): string | null {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    return window.localStorage.getItem(STORAGE_KEY);
  }
  return null;
}

export function setStoredVisitorEmail(email: string): void {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, email.trim());
  }
}

export function clearStoredVisitorEmail(): void {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}
