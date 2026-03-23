import type { HongWidgetCommonOption } from '../../HongWidgetCommonOption';
import {
  HongWidgetType,
  type HongWidgetTypeEntry,
} from '../../rule/HongWidgetType';
import { HongLayoutParam } from '../../rule/HongLayoutParam';
import { defaultHongSpacingInfo } from '../../rule/HongSpacingInfo';
import { defaultHongRadiusInfo } from '../../rule/radius/HongRadiusInfo';
import type { HongRadiusInfo } from '../../rule/radius/HongRadiusInfo';
import { defaultHongShadowInfo } from '../../rule/HongShadowInfo';
import {
  defaultHongBorderInfo,
  type HongBorderInfo,
} from '../../rule/HongBorderInfo';
import { HongColor } from '../../rule/color/HongColor';
import { HongTypo, type HongTypoProps } from '../../rule/typo/HongTypo';
import {
  HongInputState,
  type HongInputStateEntry,
} from '../../rule/HongInputState';

export class HongTextFieldBorderSelectOption implements HongWidgetCommonOption {
  type: HongWidgetTypeEntry = HongWidgetType.TEXT_FIELD_BORDER_SELECT;
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

  inputRadius: HongRadiusInfo = {
    topLeft: 12,
    topRight: 12,
    bottomLeft: 12,
    bottomRight: 12,
  };

  enableBorderColorHex: string = HongColor.GRAY_20.hex;
  focusedBorderColorHex: string = HongColor.BLACK_80.hex;

  inputBackgroundColorHex: string = HongColor.WHITE_100.hex;

  label: string = '';
  labelColorHex: string = HongColor.BLACK_100.hex;
  labelTypo: HongTypoProps = HongTypo.CONTENTS_12;

  initialInput: string = '';
  inputTextColorHex: string = HongColor.BLACK_100.hex;

  placeholder: string = '';
  placeholderColorHex: string = HongColor.GRAY_50.hex;
  placeholderTypo: HongTypoProps = HongTypo.BODY_16;

  helperText: string = '';
  helperTextTypo: HongTypoProps = HongTypo.CONTENTS_10;

  isRequired: boolean = false;

  state: HongInputStateEntry = HongInputState.ENABLE;

  useDirectInput: boolean = false;
  useNumberKeypad: boolean = false;

  onSelectionClick: () => void = () => {};
  onChangeInput: (text: string) => void = () => {};
}
