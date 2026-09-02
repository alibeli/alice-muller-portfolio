import { ConvexReactClient } from 'convex/react';

/** Production Convex deployment — used when EXPO_PUBLIC_CONVEX_URL is unset at build time. */
export const CONVEX_PROD_URL = 'https://vibrant-grasshopper-113.convex.cloud';

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL?.trim() || CONVEX_PROD_URL;

export const convex = new ConvexReactClient(convexUrl, {
  unsavedChangesWarning: false,
});

export const isConvexConfigured = true;
