import type { ImageSourcePropType } from 'react-native';
import type { HongWidgetCommonOption } from '../../HongWidgetCommonOption';
import {
  HongWidgetType,
  type HongWidgetTypeEntry,
} from '../../rule/HongWidgetType';
import { HongLayoutParam } from '../../rule/HongLayoutParam';
import {
  defaultHongSpacingInfo,
  type HongSpacingInfo,
} from '../../rule/HongSpacingInfo';
import { defaultHongRadiusInfo } from '../../rule/radius/HongRadiusInfo';
import { defaultHongShadowInfo } from '../../rule/HongShadowInfo';
import {
  defaultHongBorderInfo,
  type HongBorderInfo,
} from '../../rule/HongBorderInfo';
import { HongColor } from '../../rule/color/HongColor';
import { HongTypo, type HongTypoProps } from '../../rule/typo/HongTypo';
import {
  HongKeyboardActionType,
  type HongKeyboardActionTypeEntry,
} from '../../rule/keyboard/HongKeyboardActionType';

export class HongTextFieldNumberOption implements HongWidgetCommonOption {
  type: HongWidgetTypeEntry = HongWidgetType.TEXT_FIELD_NUMBER;
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
  backgroundColorHex: string = HongColor.WHITE_100.hex;

  placeholder: string | null = null;
  placeholderTypo: HongTypoProps = HongTypo.BODY_16;
  placeholderColorHex: string = HongColor.BLACK_30.hex;

  input: string | null = null;
  inputTypo: HongTypoProps = HongTypo.BODY_16_B;
  inputColorHex: string = HongColor.BLACK_100.hex;

  clearIcon: ImageSourcePropType | null = null;
  clearIconSize: number = 20;
  clearIconMargin: HongSpacingInfo = { ...defaultHongSpacingInfo(), left: 8 };

  cursorColorHex: string = HongColor.MAIN_ORANGE_100.hex;
  useHideKeyboard: boolean = true;

  keyboardActionType: HongKeyboardActionTypeEntry = HongKeyboardActionType.DONE;

  /** 천 단위 콤마 포맷 여부 */
  useDecimal: boolean = true;

  onTextChanged: (text: string) => void = () => {};
}
