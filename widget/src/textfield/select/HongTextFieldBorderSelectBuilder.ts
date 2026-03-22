import { HongWidgetCommonBuilder } from '../../HongWidgetCommonBuilder';
import { HongTextFieldBorderSelectOption } from './HongTextFieldBorderSelectOption';
import type { HongColorEntry } from '../../rule/color/HongColor';
import type { HongTypoEntry } from '../../rule/typo/HongTypo';
import type { HongRadiusInfo } from '../../rule/radius/HongRadiusInfo';
import type { HongInputStateEntry } from '../../rule/HongInputState';

export class HongTextFieldBorderSelectBuilder extends HongWidgetCommonBuilder<
  HongTextFieldBorderSelectOption,
  HongTextFieldBorderSelectBuilder
> {
  readonly option: HongTextFieldBorderSelectOption =
    new HongTextFieldBorderSelectOption();

  protected builder(): HongTextFieldBorderSelectBuilder {
    return this;
  }

  inputRadius(radius: HongRadiusInfo): HongTextFieldBorderSelectBuilder {
    this.option.inputRadius = radius;
    return this;
  }

  enableBorderColor(
    color: HongColorEntry | string,
  ): HongTextFieldBorderSelectBuilder {
    this.option.enableBorderColorHex =
      typeof color === 'string' ? color : color.hex;
    return this;
  }

  focusedBorderColor(
    color: HongColorEntry | string,
  ): HongTextFieldBorderSelectBuilder {
    this.option.focusedBorderColorHex =
      typeof color === 'string' ? color : color.hex;
    return this;
  }

  inputBackgroundColor(
    color: HongColorEntry | string,
  ): HongTextFieldBorderSelectBuilder {
    this.option.inputBackgroundColorHex =
      typeof color === 'string' ? color : color.hex;
    return this;
  }

  label(label: string): HongTextFieldBorderSelectBuilder {
    this.option.label = label;
    return this;
  }

  labelColor(color: HongColorEntry | string): HongTextFieldBorderSelectBuilder {
    this.option.labelColorHex = typeof color === 'string' ? color : color.hex;
    return this;
  }

  labelTypo(typo: HongTypoEntry): HongTextFieldBorderSelectBuilder {
    this.option.labelTypo = typo;
    return this;
  }

  initialInput(input: string): HongTextFieldBorderSelectBuilder {
    this.option.initialInput = input;
    return this;
  }

  inputTextColor(
    color: HongColorEntry | string,
  ): HongTextFieldBorderSelectBuilder {
    this.option.inputTextColorHex =
      typeof color === 'string' ? color : color.hex;
    return this;
  }

  placeholder(placeholder: string): HongTextFieldBorderSelectBuilder {
    this.option.placeholder = placeholder;
    return this;
  }

  placeholderColor(
    color: HongColorEntry | string,
  ): HongTextFieldBorderSelectBuilder {
    this.option.placeholderColorHex =
      typeof color === 'string' ? color : color.hex;
    return this;
  }

  placeholderTypo(typo: HongTypoEntry): HongTextFieldBorderSelectBuilder {
    this.option.placeholderTypo = typo;
    return this;
  }

  helperText(helperText: string): HongTextFieldBorderSelectBuilder {
    this.option.helperText = helperText;
    return this;
  }

  helperTextTypo(typo: HongTypoEntry): HongTextFieldBorderSelectBuilder {
    this.option.helperTextTypo = typo;
    return this;
  }

  isRequired(isRequired: boolean): HongTextFieldBorderSelectBuilder {
    this.option.isRequired = isRequired;
    return this;
  }

  state(state: HongInputStateEntry): HongTextFieldBorderSelectBuilder {
    this.option.state = state;
    return this;
  }

  useDirectInput(use: boolean): HongTextFieldBorderSelectBuilder {
    this.option.useDirectInput = use;
    return this;
  }

  useNumberKeypad(use: boolean): HongTextFieldBorderSelectBuilder {
    this.option.useNumberKeypad = use;
    return this;
  }

  onSelectionClick(onClick: () => void): HongTextFieldBorderSelectBuilder {
    this.option.onSelectionClick = onClick;
    return this;
  }

  onChangeInput(
    onChange: (text: string) => void,
  ): HongTextFieldBorderSelectBuilder {
    this.option.onChangeInput = onChange;
    return this;
  }

  copy(
    inject: HongTextFieldBorderSelectOption | null | undefined,
  ): HongTextFieldBorderSelectBuilder {
    if (!inject) return new HongTextFieldBorderSelectBuilder();
    return new HongTextFieldBorderSelectBuilder()
      .width(inject.width)
      .height(inject.height)
      .margin(inject.margin)
      .padding(inject.padding)
      .inputRadius(inject.inputRadius)
      .enableBorderColor(inject.enableBorderColorHex)
      .focusedBorderColor(inject.focusedBorderColorHex)
      .inputBackgroundColor(inject.inputBackgroundColorHex)
      .label(inject.label)
      .labelColor(inject.labelColorHex)
      .labelTypo(inject.labelTypo)
      .initialInput(inject.initialInput)
      .inputTextColor(inject.inputTextColorHex)
      .placeholder(inject.placeholder)
      .placeholderColor(inject.placeholderColorHex)
      .placeholderTypo(inject.placeholderTypo)
      .helperText(inject.helperText)
      .helperTextTypo(inject.helperTextTypo)
      .isRequired(inject.isRequired)
      .state(inject.state)
      .useDirectInput(inject.useDirectInput)
      .useNumberKeypad(inject.useNumberKeypad)
      .onSelectionClick(inject.onSelectionClick)
      .onChangeInput(inject.onChangeInput);
  }
}
