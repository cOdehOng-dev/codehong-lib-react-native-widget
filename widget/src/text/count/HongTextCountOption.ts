import type { HongWidgetCommonOption } from '../../HongWidgetCommonOption';
import {
  HongWidgetType,
  type HongWidgetTypeEntry,
} from '../../rule/HongWidgetType';
import { HongLayoutParam } from '../../rule/HongLayoutParam';
import { defaultHongSpacingInfo } from '../../rule/HongSpacingInfo';
import { defaultHongRadiusInfo } from '../../rule/radius/HongRadiusInfo';
import { defaultHongShadowInfo } from '../../rule/HongShadowInfo';
import {
  defaultHongBorderInfo,
  type HongBorderInfo,
} from '../../rule/HongBorderInfo';
import { HongColor } from '../../rule/color/HongColor';
import { HongTypo, type HongTypoProps } from '../../rule/typo/HongTypo';

export const HongCountType = {
  LONG: 'LONG',
  DOUBLE: 'DOUBLE',
} as const;

export type HongCountTypeEntry =
  (typeof HongCountType)[keyof typeof HongCountType];

export class HongTextCountOption implements HongWidgetCommonOption {
  type: HongWidgetTypeEntry = HongWidgetType.TEXT_COUNT;
  isValidComponent: boolean = true;

  width: number = HongLayoutParam.WRAP_CONTENT.value;
  height: number = HongLayoutParam.WRAP_CONTENT.value;
  margin = defaultHongSpacingInfo();
  padding = defaultHongSpacingInfo();
  click: ((option: HongWidgetCommonOption) => void) | null = null;
  useShapeCircle: boolean = false;

  radius = defaultHongRadiusInfo();
  shadow = defaultHongShadowInfo();
  border: HongBorderInfo = defaultHongBorderInfo();
  backgroundColorHex: string = HongColor.TRANSPARENT.hex;

  countType: HongCountTypeEntry = HongCountType.LONG;

  startCount: number = 1;
  countTypo: HongTypoProps = HongTypo.TITLE_36_B;
  countColorHex: string = HongColor.BLACK_100.hex;

  unitText: string = '';
  unitTypo: HongTypoProps = HongTypo.CONTENTS_12;
  unitColorHex: string = HongColor.BLACK_50.hex;

  minCount: number = 0;
  maxCount: number | null = null;

  amount: number = 1;
  buttonSize: number = 40;

  onCountChange: (value: string) => void = () => {};
}
