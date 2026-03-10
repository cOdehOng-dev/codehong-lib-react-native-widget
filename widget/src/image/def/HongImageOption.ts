import type { ImageSourcePropType } from 'react-native';
import type { HongWidgetCommonOption } from '../../HongWidgetCommonOption';
import { HongWidgetType, type HongWidgetTypeEntry } from '../../rule/HongWidgetType';
import { HongLayoutParam } from '../../rule/HongLayoutParam';
import { defaultHongSpacingInfo } from '../../rule/HongSpacingInfo';
import { defaultHongRadiusInfo } from '../../rule/radius/HongRadiusInfo';
import { defaultHongShadowInfo } from '../../rule/HongShadowInfo';
import { defaultHongBorderInfo, type HongBorderInfo } from '../../rule/HongBorderInfo';
import { HongColor } from '../../rule/color/HongColor';
import { HongScaleType, type HongScaleTypeEntry } from '../../rule/HongScaleType';

export class HongImageOption implements HongWidgetCommonOption {
  type: HongWidgetTypeEntry = HongWidgetType.IMAGE;
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

  /** URL 문자열 또는 require() 로컬 이미지 */
  imageSource: ImageSourcePropType | string | null = null;

  placeholder: ImageSourcePropType | null = null;
  error: ImageSourcePropType | null = null;

  onLoading: (() => void) | null = null;
  onSuccess: (() => void) | null = null;
  onError: (() => void) | null = null;

  scaleType: HongScaleTypeEntry = HongScaleType.FIT_CENTER;

  /** tintColor - 아이콘 등에 단색 색상 적용 */
  imageColorHex: string | null = null;
}
