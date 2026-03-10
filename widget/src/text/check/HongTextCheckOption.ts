import type { HongWidgetCommonOption } from '../../HongWidgetCommonOption';
import { HongWidgetType, type HongWidgetTypeEntry } from '../../rule/HongWidgetType';
import { HongLayoutParam } from '../../rule/HongLayoutParam';
import { defaultHongSpacingInfo } from '../../rule/HongSpacingInfo';
import { defaultHongRadiusInfo } from '../../rule/radius/HongRadiusInfo';
import { defaultHongShadowInfo } from '../../rule/HongShadowInfo';
import { defaultHongBorderInfo, type HongBorderInfo } from '../../rule/HongBorderInfo';
import { HongColor } from '../../rule/color/HongColor';
import { HongTypo } from '../../rule/typo/HongTypo';
import type { HongTextOption } from '../def/HongTextOption';
import { HongTextBuilder } from '../def/HongTextBuilder';

function defaultTextOption(): HongTextOption {
  return new HongTextBuilder()
    .width(HongLayoutParam.WRAP_CONTENT.value)
    .height(HongLayoutParam.WRAP_CONTENT.value)
    .typography(HongTypo.BODY_13)
    .color(HongColor.GRAY_70.hex)
    .applyOption();
}

export class HongTextCheckOption implements HongWidgetCommonOption {
  type: HongWidgetTypeEntry = HongWidgetType.TEXT_CHECK;
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
  textOption: HongTextOption = defaultTextOption();

  checkSize: number = 30;
  checkColor: string = HongColor.MAIN_ORANGE_100.hex;
  uncheckColor: string = HongColor.GRAY_60.hex;
  checkState: boolean = false;

  arrowSize: number = 24;
  onCheck: ((checked: boolean) => void) | null = null;
}
