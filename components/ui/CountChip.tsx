import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';

type Props = {
  count: number;
};

export function CountChip({ count }: Props) {
  return (
    <View style={styles.chip}>
      <Text variant="mono" style={styles.text}>
        {count}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 10,
    fontWeight: '600',
    color: '#0A0A0A',
    lineHeight: 12,
  },
});
