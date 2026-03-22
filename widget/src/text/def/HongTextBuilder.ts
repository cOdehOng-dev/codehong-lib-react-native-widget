import { HongWidgetCommonBuilder } from '../../HongWidgetCommonBuilder';
import { type HongColorEntry } from '../../rule/color/HongColor';
import { type HongTextAlignEntry } from '../../rule/HongTextAlign';
import { type HongTextLineBreakEntry } from '../../rule/HongTextLineBreak';
import { type HongTextOverflowEntry } from '../../rule/HongTextOverflow';
import { HongFont, type HongFontEntry } from '../../rule/typo/HongFont';
import {
  type HongTypoEntry,
  hongTypoSize,
  isHongTypoBold,
} from '../../rule/typo/HongTypo';
import { HongTextOption } from './HongTextOption';

export class HongTextBuilder extends HongWidgetCommonBuilder<
  HongTextOption,
  HongTextBuilder
> {
  readonly option: HongTextOption = new HongTextOption();

  protected builder(): HongTextBuilder {
    return this;
  }

  injectOption(inject: HongTextOption | null | undefined): void {
    if (!inject) return;

    if (!this.option.colorHex) {
      this.option.colorHex =
        inject.colorHex ?? HongTextOption.DEFAULT_LABEL_COLOR.hex;
    }

    if (!this.option.typography && inject.typography) {
      this.option.typography = inject.typography;
    } else {
      if (this.option.textSize == null && inject.textSize != null) {
        this.option.textSize = inject.textSize;
      }
      if (!this.option.fontType && inject.fontType) {
        this.option.fontType = inject.fontType;
      }
    }
  }

  text(text: string | null | undefined): HongTextBuilder {
    this.option.text = text ?? null;
    return this;
  }

  color(hex: string | null | undefined): HongTextBuilder {
    if (hex) this.option.colorHex = hex;
    return this;
  }

  colorEntry(hongColor: HongColorEntry): HongTextBuilder {
    this.option.colorHex = hongColor.hex;
    return this;
  }

  typography(typography: HongTypoEntry | null | undefined): HongTextBuilder {
    this.option.typography = typography ?? null;
    if (typography) {
      this.option.textSize = hongTypoSize(typography);
      this.option.fontType = isHongTypoBold(typography)
        ? HongFont.PRETENDARD_700
        : HongFont.PRETENDARD_400;
    }
    return this;
  }

  size(dp: number | null | undefined): HongTextBuilder {
    this.option.textSize = dp ?? null;
    return this;
  }

  fontType(fontType: HongFontEntry | null | undefined): HongTextBuilder {
    this.option.fontType = fontType ?? null;
    return this;
  }

  textAlign(textAlign: HongTextAlignEntry): HongTextBuilder {
    this.option.align = textAlign;
    return this;
  }

  maxLines(maxLines: number): HongTextBuilder {
    this.option.maxLines = maxLines;
    return this;
  }

  overflow(
    overflow: HongTextOverflowEntry | null | undefined,
  ): HongTextBuilder {
    this.option.overflow = overflow ?? HongTextOption.DEFAULT_OVERFLOW;
    return this;
  }

  lineBreak(lineBreak: HongTextLineBreakEntry): HongTextBuilder {
    this.option.lineBreak = lineBreak;
    return this;
  }

  isEnableCancelLine(isEnable: boolean): HongTextBuilder {
    this.option.isEnableCancelLine = isEnable;
    return this;
  }

  isEnableUnderLine(isEnable: boolean): HongTextBuilder {
    this.option.isEnableUnderLine = isEnable;
    return this;
  }

  spanTextBuilderList(
    list: HongTextBuilder[] | null | undefined,
  ): HongTextBuilder {
    this.option.spanTextBuilderList = list ?? null;
    return this;
  }

  isTextRequired(isRequired: boolean): HongTextBuilder {
    this.option.isTextRequired = isRequired;
    return this;
  }

  useNumberDecimal(useDecimal: boolean): HongTextBuilder {
    this.option.useNumberDecimal = useDecimal;
    return this;
  }

  copy(inject: HongTextOption | null | undefined): HongTextBuilder {
    if (!inject) return new HongTextBuilder();
    return new HongTextBuilder()
      .width(inject.width)
      .height(inject.height)
      .margin(inject.margin)
      .padding(inject.padding)
      .onClick(inject.click as any)
      .text(inject.text)
      .color(inject.colorHex)
      .typography(inject.typography)
      .size(inject.textSize)
      .fontType(inject.fontType)
      .textAlign(inject.align)
      .maxLines(inject.maxLines)
      .overflow(inject.overflow)
      .lineBreak(inject.lineBreak)
      .isEnableCancelLine(inject.isEnableCancelLine)
      .isEnableUnderLine(inject.isEnableUnderLine)
      .spanTextBuilderList(inject.spanTextBuilderList)
      .isTextRequired(inject.isTextRequired)
      .useNumberDecimal(inject.useNumberDecimal);
  }
}
