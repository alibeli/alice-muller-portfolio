import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { Text } from '@/components/ui/Text';
import { spacing } from '@/constants/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <Container scroll>
        <View style={styles.content}>
          <Text variant="title">Page not found</Text>
          <Link href="/" mono>
            ← Home
          </Link>
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: spacing.xxxl,
    gap: spacing.lg,
  },
});
