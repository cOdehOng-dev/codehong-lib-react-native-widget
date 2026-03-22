import { HongWidgetCommonBuilder } from '../../HongWidgetCommonBuilder';
import { HongTextCheckOption } from './HongTextCheckOption';
import type { HongColorEntry } from '../../rule/color/HongColor';
import type { HongSpacingInfo } from '../../rule/HongSpacingInfo';
import type { HongTextOption } from '../def/HongTextOption';
import { HongTextBuilder } from '../def/HongTextBuilder';

export class HongTextCheckBuilder extends HongWidgetCommonBuilder<
  HongTextCheckOption,
  HongTextCheckBuilder
> {
  readonly option: HongTextCheckOption = new HongTextCheckOption();

  protected builder(): HongTextCheckBuilder {
    return this;
  }

  // padding은 Android와 동일하게 항상 빈값으로 고정
  padding(_padding: HongSpacingInfo): HongTextCheckBuilder {
    return this;
  }

  checkSize(size: number): HongTextCheckBuilder {
    this.option.checkSize = size;
    return this;
  }

  text(text: string | null | undefined): HongTextCheckBuilder {
    this.option.text = text ?? null;
    this.option.textOption = new HongTextBuilder()
      .copy(this.option.textOption)
      .text(text ?? this.option.textOption.text ?? '')
      .applyOption();
    return this;
  }

  textOption(textOption: HongTextOption): HongTextCheckBuilder {
    this.option.textOption = new HongTextBuilder()
      .copy(textOption)
      .text(this.option.text ?? textOption.text ?? '')
      .applyOption();
    return this;
  }

  checkColor(
    color: HongColorEntry | string | null | undefined,
  ): HongTextCheckBuilder {
    this.option.checkColor =
      typeof color === 'string' ? color : color?.hex ?? '';
    return this;
  }

  uncheckColor(
    color: HongColorEntry | string | null | undefined,
  ): HongTextCheckBuilder {
    this.option.uncheckColor =
      typeof color === 'string' ? color : color?.hex ?? '';
    return this;
  }

  checkState(checkState: boolean): HongTextCheckBuilder {
    this.option.checkState = checkState;
    return this;
  }

  onCheck(onCheck: ((checked: boolean) => void) | null): HongTextCheckBuilder {
    this.option.onCheck = onCheck;
    return this;
  }

  arrowSize(size: number): HongTextCheckBuilder {
    this.option.arrowSize = size;
    return this;
  }

  copy(inject: HongTextCheckOption | null): HongTextCheckBuilder {
    if (inject == null) return new HongTextCheckBuilder();
    return new HongTextCheckBuilder()
      .width(inject.width)
      .height(inject.height)
      .margin(inject.margin)
      .onClick(inject.click as any)
      .backgroundColor(inject.backgroundColorHex)
      .text(inject.text)
      .textOption(inject.textOption)
      .checkColor(inject.checkColor)
      .uncheckColor(inject.uncheckColor)
      .checkState(inject.checkState)
      .checkSize(inject.checkSize)
      .onCheck(inject.onCheck)
      .arrowSize(inject.arrowSize);
  }
}
