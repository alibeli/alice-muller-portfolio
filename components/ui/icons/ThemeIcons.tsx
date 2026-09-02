import { createElement } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

type IconProps = {
  size?: number;
  color?: string;
};

function SunGlyph({ size, color }: { size: number; color: string }) {
  if (Platform.OS === 'web') {
    return createElement(
      'svg',
      {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      createElement('circle', { cx: 12, cy: 12, r: 4, fill: color }),
      createElement('path', {
        d: 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41',
        stroke: color,
        strokeWidth: 1.75,
        strokeLinecap: 'round',
      }),
    );
  }

  return <Text style={{ fontSize: size * 0.85, color, lineHeight: size }}>☀</Text>;
}

function MoonGlyph({ size, color }: { size: number; color: string }) {
  if (Platform.OS === 'web') {
    return createElement(
      'svg',
      {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: color,
        xmlns: 'http://www.w3.org/2000/svg',
      },
      createElement('path', {
        d: 'M21 14.5A7.5 7.5 0 1 1 9.5 3.2a6.5 6.5 0 1 0 11.5 11.3Z',
      }),
    );
  }

  return <Text style={{ fontSize: size * 0.85, color, lineHeight: size }}>☾</Text>;
}

export function SunIcon({ size = 14, color = 'currentColor' }: IconProps) {
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <SunGlyph size={size} color={color} />
    </View>
  );
}

export function MoonIcon({ size = 14, color = 'currentColor' }: IconProps) {
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <MoonGlyph size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
