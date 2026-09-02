/** Motion presets for hover / carousel interactions. */
export const motion = {
  tileHover: {
    scale: 1.012,
    imageScale: 1.06,
    durationMs: 520,
  },
  carousel: {
    intervalMs: 1400,
  },
  spring: {
    damping: 22,
    stiffness: 280,
  },
} as const;
