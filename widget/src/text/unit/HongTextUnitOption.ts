import type { HongWidgetCommonOption } from '../../HongWidgetCommonOption';
import { HongWidgetType, type HongWidgetTypeEntry } from '../../rule/HongWidgetType';
import { HongLayoutParam } from '../../rule/HongLayoutParam';
import { defaultHongSpacingInfo } from '../../rule/HongSpacingInfo';
import { defaultHongRadiusInfo } from '../../rule/radius/HongRadiusInfo';
import { defaultHongShadowInfo } from '../../rule/HongShadowInfo';
import { defaultHongBorderInfo, type HongBorderInfo } from '../../rule/HongBorderInfo';
import { HongColor } from '../../rule/color/HongColor';
import { HongTextOption } from '../def/HongTextOption';
import { HongTextBuilder } from '../def/HongTextBuilder';
import { HongTypo } from '../../rule/typo/HongTypo';

export class HongTextUnitOption implements HongWidgetCommonOption {
  static readonly DEFAULT_TEXT_OPTION: HongTextOption = new HongTextBuilder()
    .typography(HongTypo.BODY_16)
    .color(HongColor.BLACK_100.hex)
    .applyOption();

  type: HongWidgetTypeEntry = HongWidgetType.TEXT_UNIT;
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

  text: string | null = null;
  textOption: HongTextOption = HongTextUnitOption.DEFAULT_TEXT_OPTION;

  unitText: string | null = null;
  unitTextOption: HongTextOption = HongTextUnitOption.DEFAULT_TEXT_OPTION;

  useNumberDecimal: boolean = false;
  useUnit: boolean = true;
}
