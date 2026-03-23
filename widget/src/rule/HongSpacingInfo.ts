export type HongSpacingInfo = {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
};

export const defaultHongSpacingInfo = (): HongSpacingInfo => ({
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
});
