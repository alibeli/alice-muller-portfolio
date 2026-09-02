export const radii = {
  /** Inline and carousel media in project detail views. */
  media: 12,
  /** Inner frosted caption band on grid tiles. */
  tile: 22,
  /** Outer grid project card — slightly larger than `tile`. */
  tileOuter: 28,
  /** More-project list tile. */
  tileCompact: 16,
  dock: 28,
  dockMobile: 24,
  pill: 999,
  headshot: 24,
} as const;

export const tileRadius = radii.tile;
