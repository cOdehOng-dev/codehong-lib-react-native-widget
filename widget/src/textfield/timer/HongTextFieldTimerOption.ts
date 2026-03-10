import type { HongWidgetCommonOption } from '../../HongWidgetCommonOption';
import { HongWidgetType, type HongWidgetTypeEntry } from '../../rule/HongWidgetType';
import { HongLayoutParam } from '../../rule/HongLayoutParam';
import { defaultHongSpacingInfo } from '../../rule/HongSpacingInfo';
import { defaultHongRadiusInfo } from '../../rule/radius/HongRadiusInfo';
import { defaultHongShadowInfo } from '../../rule/HongShadowInfo';
import { defaultHongBorderInfo, type HongBorderInfo } from '../../rule/HongBorderInfo';
import { HongColor } from '../../rule/color/HongColor';
import { HongTypo, type HongTypoEntry } from '../../rule/typo/HongTypo';

export class HongTextFieldTimerOption implements HongWidgetCommonOption {
  type: HongWidgetTypeEntry = HongWidgetType.TEXT_FIELD_TIMER;
  isValidComponent: boolean = true;

  width: number = HongLayoutParam.WRAP_CONTENT.value;
  height: number = HongLayoutParam.WRAP_CONTENT.value;
  margin = defaultHongSpacingInfo();
  padding = defaultHongSpacingInfo();
  click: ((option: HongWidgetCommonOption) => void) | null = null;
  useShapeCircle: boolean = false;
  shadow = defaultHongShadowInfo();
  radius = defaultHongRadiusInfo();
  border: HongBorderInfo = defaultHongBorderInfo();
  backgroundColorHex: string = HongColor.TRANSPARENT.hex;

  input: string = '';
  inputTypo: HongTypoEntry = HongTypo.BODY_16_B;
  inputColorHex: string = HongColor.BLACK_100.hex;

  placeholder: string = '';
  placeholderTypo: HongTypoEntry = HongTypo.BODY_16;
  placeholderColorHex: string = HongColor.BLACK_30.hex;

  cursorColorHex: string = HongColor.MAIN_ORANGE_100.hex;

  useHideKeyboard: boolean = true;
  useNumberKeypad: boolean = true;
  useClearButton: boolean = true;

  underlineFocusColorHex: string = HongColor.MAIN_ORANGE_100.hex;
  underlineOutFocusColorHex: string = HongColor.GRAY_20.hex;
  underlineFinishColorHex: string | null = null;
  underlineHeight: number = 2;

  min: number = 0;
  sec: number = 0;

  countDownTypo: HongTypoEntry = HongTypo.BODY_14;
  countDownColorHex: string = HongColor.GRAY_50.hex;

  onTextChanged: (text: string) => void = () => {};
  onFinish: (() => void) | null = null;
}
