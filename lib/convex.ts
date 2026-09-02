import { ConvexReactClient } from 'convex/react';

const rawConvexUrl = process.env.EXPO_PUBLIC_CONVEX_URL?.trim();
const convexUrl = rawConvexUrl || 'https://placeholder.convex.cloud';

if (!rawConvexUrl) {
  console.warn(
    'EXPO_PUBLIC_CONVEX_URL is not set. Run `npx convex dev` and add the URL to .env.local',
  );
}

export const convex = new ConvexReactClient(convexUrl, {
  unsavedChangesWarning: false,
});

export const isConvexConfigured = Boolean(rawConvexUrl);
