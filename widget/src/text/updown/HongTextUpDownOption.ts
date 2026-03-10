import type { HongWidgetCommonOption } from '../../HongWidgetCommonOption';
import { HongWidgetType, type HongWidgetTypeEntry } from '../../rule/HongWidgetType';
import { HongLayoutParam } from '../../rule/HongLayoutParam';
import { defaultHongSpacingInfo } from '../../rule/HongSpacingInfo';
import { defaultHongRadiusInfo } from '../../rule/radius/HongRadiusInfo';
import { defaultHongShadowInfo } from '../../rule/HongShadowInfo';
import { defaultHongBorderInfo, type HongBorderInfo } from '../../rule/HongBorderInfo';
import { HongColor } from '../../rule/color/HongColor';
import { HongTypo, type HongTypoEntry } from '../../rule/typo/HongTypo';

export class HongTextUpDownOption implements HongWidgetCommonOption {
  type: HongWidgetTypeEntry = HongWidgetType.TEXT_UP_DOWN;
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

  amount: number = 0;
  unit: string | null = null;

  useDecimal: boolean = false;

  displayTypo: HongTypoEntry = HongTypo.BODY_16;
  displayColorHex: string = HongColor.BLACK_100.hex;

  borderColorHex: string = HongColor.GRAY_30.hex;
  iconColorHex: string = HongColor.GRAY_50.hex;

  buttonSize: number = 25;
  spaceButtonAndDisplay: number = 5;

  onResult: (amount: number) => void = () => {};
  gap: number = 1;
}
