import { HongWidgetCommonOption } from '../HongWidgetCommonOption';
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
  defaultHongBorderInfo,
  defaultHongShadowInfo,
} from '../rule';

export class HongPickerOption implements HongWidgetCommonOption {
  type: HongWidgetTypeEntry = HongWidgetType.PICKER;
  isValidComponent: boolean = true;

  width: number = HongLayoutParam.MATCH_PARENT.value;
  height: number = HongLayoutParam.WRAP_CONTENT.value;

  margin: HongSpacingInfo = defaultHongSpacingInfo();
  padding: HongSpacingInfo = defaultHongSpacingInfo();
  backgroundColorHex: string = HongColor.WHITE_100.hex;
  radius: HongRadiusInfo = { topLeft: 16, topRight: 16, bottomLeft: 0, bottomRight: 0 };
  border: HongBorderInfo = defaultHongBorderInfo();
  shadow: HongShadowInfo = defaultHongShadowInfo();
  useShapeCircle: boolean = false;

  click: ((option: HongWidgetCommonOption) => void) | null = null;

  title: string = '';
  titleColorHex: string = HongColor.BLACK_100.hex;
  buttonText: string = '';
  buttonColorHex: string = HongColor.MAIN_ORANGE_100.hex;
  buttonTextColorHex: string = HongColor.WHITE_100.hex;

  initialFirstOption: number = 0;
  firstOptionList: string[] = [];

  initialSecondOption: number = 0;
  secondOptionList: string[] | null = null;

  useDimClickClose: boolean = false;
  selectorColorHex: string = HongColor.GRAY_10.hex;

  onDismiss: () => void = () => {};
  onConfirm:
    | ((
        firstOption: [number, string],
        secondOption: [number, string | null],
      ) => void)
    | null = null;
  onDirectSelect:
    | ((
        firstOption: [number, string],
        secondOption: [number, string | null],
      ) => void)
    | null = null;
}
