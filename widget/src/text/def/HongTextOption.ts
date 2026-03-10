import type { HongWidgetCommonOption } from '../../HongWidgetCommonOption';
import { HongWidgetType, type HongWidgetTypeEntry } from '../../rule/HongWidgetType';
import { HongLayoutParam } from '../../rule/HongLayoutParam';
import { defaultHongSpacingInfo } from '../../rule/HongSpacingInfo';
import { defaultHongRadiusInfo } from '../../rule/radius/HongRadiusInfo';
import { defaultHongShadowInfo } from '../../rule/HongShadowInfo';
import { defaultHongBorderInfo } from '../../rule/HongBorderInfo';
import { HongColor } from '../../rule/color/HongColor';
import { HongTextAlign, type HongTextAlignEntry } from '../../rule/HongTextAlign';
import { HongTextOverflow, type HongTextOverflowEntry } from '../../rule/HongTextOverflow';
import { HongTextLineBreak, type HongTextLineBreakEntry } from '../../rule/HongTextLineBreak';
import { HongTypo, type HongTypoEntry, hongTypoSize, hongTypoLineHeight, isHongTypoBold } from '../../rule/typo/HongTypo';
import { HongFont, type HongFontEntry } from '../../rule/typo/HongFont';
import type { HongTextBuilder } from './HongTextBuilder';

export class HongTextOption implements HongWidgetCommonOption {
  static readonly DEFAULT_LABEL_COLOR = HongColor.BLACK_100;
  static readonly DEFAULT_TYPOGRAPHY = HongTypo.BODY_14;
  static readonly DEFAULT_OVERFLOW = HongTextOverflow.ELLIPSIS;

  type: HongWidgetTypeEntry = HongWidgetType.TEXT;
  isValidComponent: boolean = true;

  width: number = HongLayoutParam.WRAP_CONTENT.value;
  height: number = HongLayoutParam.WRAP_CONTENT.value;
  margin = defaultHongSpacingInfo();
  padding = defaultHongSpacingInfo();
  click: ((option: HongWidgetCommonOption) => void) | null = null;
  radius = defaultHongRadiusInfo();
  shadow = defaultHongShadowInfo();
  border = defaultHongBorderInfo();
  useShapeCircle: boolean = false;
  backgroundColorHex: string = HongColor.TRANSPARENT.hex;

  text: string | null = null;
  colorHex: string | null = null;
  typography: HongTypoEntry | null = null;
  textSize: number | null = null;
  fontType: HongFontEntry | null = null;

  align: HongTextAlignEntry = HongTextAlign.LEFT;
  maxLines: number = 0; // 0 = 제한 없음
  overflow: HongTextOverflowEntry = HongTextOption.DEFAULT_OVERFLOW;
  lineBreak: HongTextLineBreakEntry = HongTextLineBreak.DEFAULT;

  isEnableCancelLine: boolean = false;
  isEnableUnderLine: boolean = false;

  spanTextBuilderList: HongTextBuilder[] | null = null;

  isTextRequired: boolean = false;
  useNumberDecimal: boolean = false;

  get lineHeight(): number | null {
    return this.typography ? hongTypoLineHeight(this.typography) : null;
  }

  get fontWeight(): HongFontEntry {
    return this.fontType ?? HongTextOption.DEFAULT_TYPOGRAPHY.styleName.endsWith('b')
      ? HongFont.PRETENDARD_700
      : HongFont.PRETENDARD_400;
  }

  get size(): number | null {
    return this.typography ? hongTypoSize(this.typography) : this.textSize;
  }

  hasMargin(): boolean {
    return (
      this.margin.left > 0 ||
      this.margin.top > 0 ||
      this.margin.right > 0 ||
      this.margin.bottom > 0
    );
  }
}
