import { HongWidgetCommonBuilder } from '../../HongWidgetCommonBuilder';
import {
  HongTextCountOption,
  type HongCountTypeEntry,
} from './HongTextCountOption';
import type { HongColorEntry } from '../../rule/color/HongColor';
import type { HongTypoProps } from '../../rule/typo/HongTypo';

export class HongTextCountBuilder extends HongWidgetCommonBuilder<
  HongTextCountOption,
  HongTextCountBuilder
> {
  readonly option: HongTextCountOption = new HongTextCountOption();

  protected builder(): HongTextCountBuilder {
    return this;
  }

  countType(countType: HongCountTypeEntry): HongTextCountBuilder {
    this.option.countType = countType;
    return this;
  }

  startCount(count: number): HongTextCountBuilder {
    this.option.startCount = count;
    return this;
  }

  countTypo(typo: HongTypoProps): HongTextCountBuilder {
    this.option.countTypo = typo;
    return this;
  }

  countColor(
    color: HongColorEntry | string | null | undefined,
  ): HongTextCountBuilder {
    this.option.countColorHex =
      typeof color === 'string' ? color : color?.hex ?? '';
    return this;
  }

  unitText(unitText: string): HongTextCountBuilder {
    this.option.unitText = unitText;
    return this;
  }

  unitTypo(typo: HongTypoProps): HongTextCountBuilder {
    this.option.unitTypo = typo;
    return this;
  }

  unitColor(
    color: HongColorEntry | string | null | undefined,
  ): HongTextCountBuilder {
    this.option.unitColorHex =
      typeof color === 'string' ? color : color?.hex ?? '';
    return this;
  }

  minCount(minCount: number): HongTextCountBuilder {
    this.option.minCount = minCount;
    return this;
  }

  maxCount(maxCount: number | null): HongTextCountBuilder {
    this.option.maxCount = maxCount;
    return this;
  }

  amount(amount: number): HongTextCountBuilder {
    this.option.amount = amount;
    return this;
  }

  buttonSize(size: number): HongTextCountBuilder {
    this.option.buttonSize = size;
    return this;
  }

  onCountChange(onCountChange: (value: string) => void): HongTextCountBuilder {
    this.option.onCountChange = onCountChange;
    return this;
  }

  copy(inject: HongTextCountOption): HongTextCountBuilder {
    return new HongTextCountBuilder()
      .width(inject.width)
      .height(inject.height)
      .margin(inject.margin)
      .padding(inject.padding)
      .onClick(inject.click as any)
      .backgroundColor(inject.backgroundColorHex)
      .countType(inject.countType)
      .startCount(inject.startCount)
      .countTypo(inject.countTypo)
      .countColor(inject.countColorHex)
      .unitText(inject.unitText)
      .unitTypo(inject.unitTypo)
      .unitColor(inject.unitColorHex)
      .minCount(inject.minCount)
      .maxCount(inject.maxCount)
      .amount(inject.amount)
      .buttonSize(inject.buttonSize)
      .onCountChange(inject.onCountChange);
  }
}
