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

export class HongTextBadgeOption implements HongWidgetCommonOption {
  type: HongWidgetTypeEntry = HongWidgetType.TEXT_BADGE;
  isValidComponent: boolean = true;

  width: number = HongLayoutParam.WRAP_CONTENT.value;
  height: number = HongLayoutParam.WRAP_CONTENT.value;
  margin = defaultHongSpacingInfo();
  padding = defaultHongSpacingInfo();
  click: ((option: HongWidgetCommonOption) => void) | null = null;
  useShapeCircle: boolean = false;

  radius = defaultHongRadiusInfo();
  shadow = defaultHongShadowInfo();
  border: HongBorderInfo = { width: 1, color: HongColor.WHITE_100.hex };

  backgroundColorHex: string = HongColor.WHITE_100.hex;

  text: string | null = null;
  textColorHex: string | null = null;
  textTypography: HongTypoProps = HongTypo.CONTENTS_12_B;
}
