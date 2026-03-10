import type { HongWidgetTypeEntry } from './rule/HongWidgetType';
import type { HongSpacingInfo } from './rule/HongSpacingInfo';
import type { HongRadiusInfo } from './rule/radius/HongRadiusInfo';
import type { HongShadowInfo } from './rule/HongShadowInfo';
import type { HongBorderInfo } from './rule/HongBorderInfo';

export interface HongWidgetCommonOption {
  type: HongWidgetTypeEntry;
  isValidComponent: boolean;
  width: number;
  height: number;
  margin: HongSpacingInfo;
  padding: HongSpacingInfo;
  click?: ((option: HongWidgetCommonOption) => void) | null;
  backgroundColorHex: string;
  radius: HongRadiusInfo;
  border: HongBorderInfo;
  shadow: HongShadowInfo;
  useShapeCircle: boolean;
}
