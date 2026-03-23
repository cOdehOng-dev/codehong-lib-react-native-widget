import { HongWidgetCommonBuilder } from '../../HongWidgetCommonBuilder';
import { HongTextUpDownOption } from './HongTextUpDownOption';
import type { HongColorEntry } from '../../rule/color/HongColor';
import type { HongTypoProps } from '../../rule/typo/HongTypo';

export class HongTextUpDownBuilder extends HongWidgetCommonBuilder<
  HongTextUpDownOption,
  HongTextUpDownBuilder
> {
  readonly option: HongTextUpDownOption = new HongTextUpDownOption();

  protected builder(): HongTextUpDownBuilder {
    return this;
  }

  amount(amount: number): HongTextUpDownBuilder {
    this.option.amount = amount;
    return this;
  }

  unit(unit: string | null | undefined): HongTextUpDownBuilder {
    this.option.unit = unit ?? null;
    return this;
  }

  displayTypo(typo: HongTypoProps): HongTextUpDownBuilder {
    this.option.displayTypo = typo;
    return this;
  }

  displayColor(
    color: HongColorEntry | string | null | undefined,
  ): HongTextUpDownBuilder {
    this.option.displayColorHex =
      typeof color === 'string' ? color : color?.hex ?? '';
    return this;
  }

  gap(gap: number): HongTextUpDownBuilder {
    this.option.gap = gap;
    return this;
  }

  useDecimal(useDecimal: boolean): HongTextUpDownBuilder {
    this.option.useDecimal = useDecimal;
    return this;
  }

  buttonSize(size: number): HongTextUpDownBuilder {
    this.option.buttonSize = size;
    return this;
  }

  spaceButtonAndDisplay(gap: number): HongTextUpDownBuilder {
    this.option.spaceButtonAndDisplay = gap;
    return this;
  }

  borderColor(
    color: HongColorEntry | string | null | undefined,
  ): HongTextUpDownBuilder {
    this.option.borderColorHex =
      typeof color === 'string' ? color : color?.hex ?? '';
    return this;
  }

  iconColor(
    color: HongColorEntry | string | null | undefined,
  ): HongTextUpDownBuilder {
    this.option.iconColorHex =
      typeof color === 'string' ? color : color?.hex ?? '';
    return this;
  }

  onResult(onResult: (amount: number) => void): HongTextUpDownBuilder {
    this.option.onResult = onResult;
    return this;
  }

  copy(inject: HongTextUpDownOption): HongTextUpDownBuilder {
    return new HongTextUpDownBuilder()
      .width(inject.width)
      .height(inject.height)
      .margin(inject.margin)
      .padding(inject.padding)
      .onClick(inject.click as any)
      .backgroundColor(inject.backgroundColorHex)
      .amount(inject.amount)
      .unit(inject.unit)
      .onResult(inject.onResult)
      .gap(inject.gap)
      .displayTypo(inject.displayTypo)
      .displayColor(inject.displayColorHex)
      .useDecimal(inject.useDecimal)
      .buttonSize(inject.buttonSize)
      .spaceButtonAndDisplay(inject.spaceButtonAndDisplay)
      .borderColor(inject.borderColorHex)
      .iconColor(inject.iconColorHex);
  }
}
