import { HongShadowInfo } from '../../rule/HongShadowInfo';
import { HongSpacingInfo } from '../../rule/HongSpacingInfo';
import { HongWidgetCommonOption } from '../../HongWidgetCommonOption';
import { defaultHongSpacingInfo } from '../../rule/HongSpacingInfo';
import {
  defaultHongBorderInfo,
  defaultHongRadiusInfo,
  defaultHongShadowInfo,
  HongBorderInfo,
  HongColor,
  HongLayoutParam,
  HongRadiusInfo,
  HongWidgetType,
  HongWidgetTypeEntry,
} from '../../rule';

export class HongBottomSheetModalOption implements HongWidgetCommonOption {
  type: HongWidgetTypeEntry = HongWidgetType.BOTTOM_SHEET_MODAL;
  isValidComponent: boolean = true;

  width: number = HongLayoutParam.MATCH_PARENT.value;
  height: number = HongLayoutParam.WRAP_CONTENT.value;
  margin = defaultHongSpacingInfo();
  padding = defaultHongSpacingInfo();
  click: ((option: HongWidgetCommonOption) => void) | null = null;
  useShapeCircle: boolean = false;

  radius: HongRadiusInfo = defaultHongRadiusInfo();
  shadow: HongShadowInfo = defaultHongShadowInfo();
  border: HongBorderInfo = defaultHongBorderInfo();
  backgroundColorHex: string = HongColor.TRANSPARENT.hex;

  children: React.ReactNode | null = null;
  topRadius: number = 20;
  isVisible: boolean = false;
  isClickDimDismiss: boolean = true;
  onDismiss: () => void = () => {};
}
