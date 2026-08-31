import { createElement } from 'react';
import { Platform, Text } from 'react-native';

type IconProps = {
  size?: number;
  color?: string;
};

/** Open in new tab / external link glyph. */
export function OpenInNewTabIcon({ size = 14, color = '#737373' }: IconProps) {
  if (Platform.OS === 'web') {
    return createElement(
      'svg',
      {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: color,
        strokeWidth: 1.75,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      createElement('path', { d: 'M15 3h6v6' }),
      createElement('path', { d: 'M10 14 21 3' }),
      createElement('path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' }),
    );
  }

  return <Text style={{ fontSize: size * 0.95, color, lineHeight: size }}>↗</Text>;
}
