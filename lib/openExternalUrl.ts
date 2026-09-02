import { Linking, Platform } from 'react-native';

/** Opens a URL in a new browser tab on web; system handler elsewhere. */
export function openExternalUrl(url: string): void {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
    return;
  }

  void Linking.openURL(url);
}
