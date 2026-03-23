import { HongTypo, HongTypoProps } from './../../rule/typo/HongTypo';
import { HongWidgetCommonOption } from '../../HongWidgetCommonOption';
import {
  HongWidgetTypeEntry,
  HongSpacingInfo,
  HongRadiusInfo,
  HongBorderInfo,
  HongShadowInfo,
  HongWidgetType,
  HongLayoutParam,
  defaultHongSpacingInfo,
  HongColor,
  defaultHongRadiusInfo,
  defaultHongBorderInfo,
  defaultHongShadowInfo,
} from '../../rule';
import { HongState } from '../../rule/HongState';

export class HongButtonTextOption implements HongWidgetCommonOption {
  static readonly DEFAULT_DISABLE_BACKGROUND_COLOR = HongColor.GRAY_70;

  type: HongWidgetTypeEntry = HongWidgetType.BUTTON_TEXT;
  isValidComponent: boolean = true;

  width: number = HongLayoutParam.WRAP_CONTENT.value;
  height: number = HongLayoutParam.WRAP_CONTENT.value;

  margin: HongSpacingInfo = defaultHongSpacingInfo();
  padding: HongSpacingInfo = defaultHongSpacingInfo();
  backgroundColorHex: string = HongColor.TRANSPARENT.hex;
  radius: HongRadiusInfo = defaultHongRadiusInfo();
  border: HongBorderInfo = defaultHongBorderInfo();
  shadow: HongShadowInfo = defaultHongShadowInfo();
  useShapeCircle: boolean = false;

  click: ((option: HongWidgetCommonOption) => void) | null = null;

  text: string = '';
  textTypo: HongTypoProps = HongTypo.BODY_16_B;
  textColorHex: string = HongColor.WHITE_100.hex;

  state: HongState = HongState.ENABLED;
}
