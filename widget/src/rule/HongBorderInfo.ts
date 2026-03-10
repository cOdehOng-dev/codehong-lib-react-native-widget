import { HongColor } from './color/HongColor';

export interface HongBorderInfo {
  width: number;
  color: string;
}

export const defaultHongBorderInfo = (): HongBorderInfo => ({
  width: 0,
  color: HongColor.TRANSPARENT.hex,
});
