import type { ImageSourcePropType } from 'react-native';
import type { HongWidgetCommonOption } from '../../HongWidgetCommonOption';
import { HongWidgetType, type HongWidgetTypeEntry } from '../../rule/HongWidgetType';
import { HongLayoutParam } from '../../rule/HongLayoutParam';
import { defaultHongSpacingInfo } from '../../rule/HongSpacingInfo';
import { defaultHongRadiusInfo } from '../../rule/radius/HongRadiusInfo';
import { defaultHongShadowInfo } from '../../rule/HongShadowInfo';
import { defaultHongBorderInfo, type HongBorderInfo } from '../../rule/HongBorderInfo';
import { HongColor } from '../../rule/color/HongColor';
import { HongTypo, type HongTypoEntry } from '../../rule/typo/HongTypo';
import { HongKeyboardType, type HongKeyboardTypeEntry } from '../../rule/keyboard/HongKeyboardType';
import { HongKeyboardActionType, type HongKeyboardActionTypeEntry } from '../../rule/keyboard/HongKeyboardActionType';

export class HongTextFieldOption implements HongWidgetCommonOption {
  static readonly DEFAULT_DELAY_INPUT_CALLBACK = 0;

  type: HongWidgetTypeEntry = HongWidgetType.TEXT_FIELD;
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
  backgroundColorHex: string = HongColor.BLACK_05.hex;

  placeholder: string | null = null;
  placeholderTypo: HongTypoEntry = HongTypo.BODY_16;
  placeholderColorHex: string = HongColor.BLACK_30.hex;
  placeholderPadding = defaultHongSpacingInfo();

  input: string | null = null;
  inputTypo: HongTypoEntry = HongTypo.BODY_16_B;
  inputColorHex: string = HongColor.BLACK_100.hex;

  /** 지우기 버튼 아이콘 (null이면 미표시) */
  clearIcon: ImageSourcePropType | null = null;
  clearIconSize: number = 20;
  clearIconMargin = { ...defaultHongSpacingInfo(), left: 8 };

  cursorColorHex: string = HongColor.MAIN_ORANGE_100.hex;
  useHideKeyboard: boolean = true;
  singleLine: boolean = true;
  maxLines: number = 999;
  minLines: number = 1;

  keyboardType: HongKeyboardTypeEntry = HongKeyboardType.TEXT;
  keyboardActionType: HongKeyboardActionTypeEntry = HongKeyboardActionType.DONE;

  /** 입력 콜백 디바운스 딜레이 (ms, 0이면 즉시) */
  delayInputCallback: number = HongTextFieldOption.DEFAULT_DELAY_INPUT_CALLBACK;

  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters' = 'none';

  onTextChanged: (text: string) => void = () => {};
}
