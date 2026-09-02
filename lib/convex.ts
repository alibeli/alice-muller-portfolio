import { ConvexReactClient } from 'convex/react';

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  console.warn(
    'EXPO_PUBLIC_CONVEX_URL is not set. Run `npx convex dev` and add the URL to .env.local',
  );
}

export const convex = new ConvexReactClient(convexUrl ?? 'https://placeholder.convex.cloud', {
  unsavedChangesWarning: false,
});

export const isConvexConfigured = Boolean(convexUrl);
