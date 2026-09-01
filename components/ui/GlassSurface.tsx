import { Platform, StyleSheet, View, ViewProps } from 'react-native';

type Props = ViewProps & {
  rounded?: number;
  intensity?: 'light' | 'medium' | 'clear' | 'panel' | 'transparent';
};

export function GlassSurface({
  style,
  rounded = 999,
  intensity = 'medium',
  children,
  ...props
}: Props) {
  const bgStyle =
    intensity === 'light'
      ? styles.light
      : intensity === 'clear'
        ? styles.clear
        : intensity === 'panel'
          ? styles.panel
          : intensity === 'transparent'
            ? styles.transparent
            : styles.medium;

  return (
    <View
      style={[
        styles.base,
        bgStyle,
        { borderRadius: rounded },
        intensity !== 'transparent' && Platform.OS === 'web' && styles.webBlur,
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
  light: {
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
  medium: {
    backgroundColor: 'rgba(255, 255, 255, 0.62)',
  },
  clear: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  panel: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  transparent: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(0,0,0,0.06)',
  },
  webBlur: {
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  } as object,
});
