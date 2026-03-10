import { HongColor } from './color/HongColor';

export interface HongShadowInfo {
  color: string;
  blur: number;
  offsetY: number;
  offsetX: number;
  spread: number;
}

export const defaultHongShadowInfo = (): HongShadowInfo => ({
  color: HongColor.TRANSPARENT.hex,
  blur: 0,
  offsetY: 0,
  offsetX: 0,
  spread: 0,
});
