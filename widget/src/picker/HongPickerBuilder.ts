import { HongWidgetCommonBuilder } from '../HongWidgetCommonBuilder';
import { HongPickerOption } from './HongPickerOption';
import { HongColorEntry, HongRadiusInfo } from '../rule';

export class HongPickerBuilder extends HongWidgetCommonBuilder<
  HongPickerOption,
  HongPickerBuilder
> {
  readonly option: HongPickerOption = new HongPickerOption();

  protected builder(): HongPickerBuilder {
    return this;
  }

  title(title: string): HongPickerBuilder {
    this.option.title = title;
    return this;
  }

  titleColor(color: HongColorEntry): HongPickerBuilder;
  titleColor(colorHex: string): HongPickerBuilder;
  titleColor(color: HongColorEntry | string): HongPickerBuilder {
    this.option.titleColorHex = typeof color === 'string' ? color : color.hex;
    return this;
  }

  buttonText(text: string): HongPickerBuilder {
    this.option.buttonText = text;
    return this;
  }

  buttonColor(color: HongColorEntry): HongPickerBuilder;
  buttonColor(colorHex: string): HongPickerBuilder;
  buttonColor(color: HongColorEntry | string): HongPickerBuilder {
    this.option.buttonColorHex = typeof color === 'string' ? color : color.hex;
    return this;
  }

  buttonTextColor(color: HongColorEntry): HongPickerBuilder;
  buttonTextColor(colorHex: string): HongPickerBuilder;
  buttonTextColor(color: HongColorEntry | string): HongPickerBuilder {
    this.option.buttonTextColorHex =
      typeof color === 'string' ? color : color.hex;
    return this;
  }

  initialFirstOption(index: number): HongPickerBuilder {
    this.option.initialFirstOption = index;
    return this;
  }

  firstOptionList(list: string[]): HongPickerBuilder {
    this.option.firstOptionList = list;
    return this;
  }

  initialSecondOption(index: number): HongPickerBuilder {
    this.option.initialSecondOption = index;
    return this;
  }

  secondOptionList(list: string[] | null): HongPickerBuilder {
    this.option.secondOptionList = list;
    return this;
  }

  useDimClickClose(use: boolean): HongPickerBuilder {
    this.option.useDimClickClose = use;
    return this;
  }

  selectorColor(color: HongColorEntry): HongPickerBuilder;
  selectorColor(colorHex: string): HongPickerBuilder;
  selectorColor(color: HongColorEntry | string): HongPickerBuilder {
    this.option.selectorColorHex =
      typeof color === 'string' ? color : color.hex;
    return this;
  }

  radius(radius: HongRadiusInfo): HongPickerBuilder {
    this.option.radius = radius;
    return this;
  }

  onDismiss(fn: () => void): HongPickerBuilder {
    this.option.onDismiss = fn;
    return this;
  }

  onConfirm(
    fn:
      | ((
          firstOption: [number, string],
          secondOption: [number, string | null],
        ) => void)
      | null,
  ): HongPickerBuilder {
    this.option.onConfirm = fn;
    return this;
  }

  onDirectSelect(
    fn:
      | ((
          firstOption: [number, string],
          secondOption: [number, string | null],
        ) => void)
      | null,
  ): HongPickerBuilder {
    this.option.onDirectSelect = fn;
    return this;
  }

  copy(inject: HongPickerOption | null | undefined): HongPickerBuilder {
    if (!inject) return new HongPickerBuilder();
    return new HongPickerBuilder()
      .width(inject.width)
      .height(inject.height)
      .margin(inject.margin)
      .backgroundColor(inject.backgroundColorHex)
      .radius(inject.radius)
      .title(inject.title)
      .titleColor(inject.titleColorHex)
      .buttonText(inject.buttonText)
      .buttonColor(inject.buttonColorHex)
      .buttonTextColor(inject.buttonTextColorHex)
      .initialFirstOption(inject.initialFirstOption)
      .firstOptionList(inject.firstOptionList)
      .initialSecondOption(inject.initialSecondOption)
      .secondOptionList(inject.secondOptionList)
      .useDimClickClose(inject.useDimClickClose)
      .selectorColor(inject.selectorColorHex)
      .onDismiss(inject.onDismiss)
      .onConfirm(inject.onConfirm)
      .onDirectSelect(inject.onDirectSelect);
  }
}
