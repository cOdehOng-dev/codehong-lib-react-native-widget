import { HongWidgetCommonBuilder } from '../../HongWidgetCommonBuilder';
import { HongTextUnitOption } from './HongTextUnitOption';
import { HongTextOption } from '../def/HongTextOption';
import { HongTextBuilder } from '../def/HongTextBuilder';

export class HongTextUnitBuilder extends HongWidgetCommonBuilder<
  HongTextUnitOption,
  HongTextUnitBuilder
> {
  readonly option: HongTextUnitOption = new HongTextUnitOption();

  protected builder(): HongTextUnitBuilder {
    return this;
  }

  text(text: string | null | undefined): HongTextUnitBuilder {
    this.option.text = text ?? null;
    this.option.textOption = new HongTextBuilder()
      .copy(this.option.textOption)
      .text(text ?? this.option.textOption.text)
      .applyOption();
    return this;
  }

  textOption(textOption: HongTextOption): HongTextUnitBuilder {
    this.option.textOption = new HongTextBuilder()
      .copy(textOption)
      .text(this.option.text ?? textOption.text)
      .applyOption();
    return this;
  }

  unitText(unitText: string | null | undefined): HongTextUnitBuilder {
    this.option.unitText = unitText ?? null;
    this.option.unitTextOption = new HongTextBuilder()
      .copy(this.option.textOption)
      .text(unitText ?? this.option.unitTextOption.text)
      .applyOption();
    return this;
  }

  unitTextOption(unitTextOption: HongTextOption): HongTextUnitBuilder {
    this.option.unitTextOption = new HongTextBuilder()
      .copy(unitTextOption)
      .text(this.option.unitText ?? unitTextOption.text)
      .applyOption();
    return this;
  }

  useNumberDecimal(use: boolean): HongTextUnitBuilder {
    this.option.useNumberDecimal = use;
    this.option.textOption = new HongTextBuilder()
      .copy(this.option.textOption)
      .useNumberDecimal(use)
      .applyOption();
    return this;
  }

  useUnit(use: boolean): HongTextUnitBuilder {
    this.option.useUnit = use;
    return this;
  }

  copy(inject: HongTextUnitOption | null | undefined): HongTextUnitBuilder {
    if (!inject) return new HongTextUnitBuilder();
    return new HongTextUnitBuilder()
      .width(inject.width)
      .height(inject.height)
      .margin(inject.margin)
      .padding(inject.padding)
      .onClick(inject.click as any)
      .backgroundColor(inject.backgroundColorHex)
      .text(inject.text)
      .textOption(inject.textOption)
      .unitText(inject.unitText)
      .unitTextOption(inject.unitTextOption)
      .useUnit(inject.useUnit);
  }
}
