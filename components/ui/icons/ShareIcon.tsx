import { createElement } from 'react';
import { Platform, Text } from 'react-native';

import { useTheme } from '@/components/ThemeProvider';

type IconProps = {
  size?: number;
  color?: string;
};

/** iOS-style share/export glyph. */
export function ShareIcon({ size = 18, color }: IconProps) {
  const { palette } = useTheme();
  const resolved = color ?? palette.icon.muted;

  if (Platform.OS === 'web') {
    return createElement(
      'svg',
      {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: resolved,
        strokeWidth: 1.75,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      createElement('path', {
        d: 'M12 3v10M12 3l4 4M12 3L8 7M5 10v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9',
      }),
    );
  }

  return <Text style={{ fontSize: size * 0.95, color: resolved, lineHeight: size }}>↗</Text>;
}
