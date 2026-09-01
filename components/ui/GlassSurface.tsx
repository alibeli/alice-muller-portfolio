import { Platform, StyleSheet, View, ViewProps } from 'react-native';

import { getGlassBackground, isCoarsePointerDevice } from '@/lib/mobileWeb';

type CornerMode = 'all' | 'top' | 'none';

type Props = ViewProps & {
  rounded?: number;
  intensity?: 'light' | 'medium' | 'clear' | 'panel' | 'transparent';
  corners?: CornerMode;
};

function getCornerStyle(rounded: number, corners: CornerMode) {
  if (corners === 'none' || rounded <= 0) return {};
  if (corners === 'top') {
    return {
      borderTopLeftRadius: rounded,
      borderTopRightRadius: rounded,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    };
  }
  return { borderRadius: rounded };
}

export function GlassSurface({
  style,
  rounded = 999,
  intensity = 'medium',
  corners = 'all',
  children,
  ...props
}: Props) {
  const useBlur = intensity !== 'transparent' && Platform.OS === 'web' && !isCoarsePointerDevice();
  const bgColor =
    intensity === 'transparent'
      ? 'transparent'
      : getGlassBackground(intensity === 'panel' ? 'panel' : intensity);

  return (
    <View
      style={[
        styles.base,
        intensity === 'transparent' ? styles.transparentBorder : null,
        { backgroundColor: bgColor },
        getCornerStyle(rounded, corners),
        useBlur ? styles.webBlur : null,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  transparentBorder: {
    borderColor: 'rgba(0,0,0,0.06)',
  },
  webBlur: {
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  } as object,
});
