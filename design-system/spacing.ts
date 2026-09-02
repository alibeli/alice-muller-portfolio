/** Base grid unit — all spacing and gutters are multiples of 8px (Material 8dp grid). */
export const GRID_UNIT = 8;

/** Raw 8dp-grid steps. Prefer `spacing` / `gutter` semantic aliases in components. */
export const space = {
  /** 2dp — micro gaps only (documented exception). */
  micro: GRID_UNIT / 4,
  half: GRID_UNIT / 2,
  unit: GRID_UNIT,
  double: GRID_UNIT * 2,
  triple: GRID_UNIT * 3,
  quad: GRID_UNIT * 4,
  sextuple: GRID_UNIT * 6,
  octuple: GRID_UNIT * 8,
} as const;

/** Internal padding and vertical rhythm. */
export const spacing = {
  xxs: space.micro,
  xs: space.half,
  sm: space.unit,
  md: space.double,
  lg: space.triple,
  xl: space.quad,
  xxl: space.sextuple,
  xxxl: space.octuple,
} as const;

/** Layout gutters — column gaps and page insets. */
export const gutter = {
  columnMobile: space.unit,
  columnDesktop: space.double,
  insetMobile: space.unit,
  insetDesktop: space.triple,
  content: space.triple,
} as const;

export const layout = {
  maxWidth: 720,
  contentPadding: gutter.content,
} as const;

/** Minimum interactive touch target (Material / iOS HIG). */
export const TOUCH_TARGET_MIN = 48;
