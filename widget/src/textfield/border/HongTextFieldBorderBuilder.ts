import { HongWidgetCommonBuilder } from '../../HongWidgetCommonBuilder';
import { HongTextFieldBorderOption } from './HongTextFieldBorderOption';
import type { HongColorEntry } from '../../rule/color/HongColor';
import type { HongTypoEntry } from '../../rule/typo/HongTypo';
import type { HongRadiusInfo } from '../../rule/radius/HongRadiusInfo';
import type { HongInputStateEntry } from '../../rule/HongInputState';

export class HongTextFieldBorderBuilder extends HongWidgetCommonBuilder<HongTextFieldBorderOption, HongTextFieldBorderBuilder> {
  readonly option: HongTextFieldBorderOption = new HongTextFieldBorderOption();

  protected self(): HongTextFieldBorderBuilder {
    return this;
  }

  inputRadius(radius: HongRadiusInfo): HongTextFieldBorderBuilder {
    this.option.inputRadius = radius;
    return this;
  }

  enableBorderColor(color: HongColorEntry | string): HongTextFieldBorderBuilder {
    this.option.enableBorderColorHex = typeof color === 'string' ? color : color.hex;
    return this;
  }

  focusedBorderColor(color: HongColorEntry | string): HongTextFieldBorderBuilder {
    this.option.focusedBorderColorHex = typeof color === 'string' ? color : color.hex;
    return this;
  }

  inputBackgroundColor(color: HongColorEntry | string): HongTextFieldBorderBuilder {
    this.option.inputBackgroundColorHex = typeof color === 'string' ? color : color.hex;
    return this;
  }

  label(label: string): HongTextFieldBorderBuilder {
    this.option.label = label;
    return this;
  }

  labelColor(color: HongColorEntry | string): HongTextFieldBorderBuilder {
    this.option.labelColorHex = typeof color === 'string' ? color : color.hex;
    return this;
  }

  labelTypo(typo: HongTypoEntry): HongTextFieldBorderBuilder {
    this.option.labelTypo = typo;
    return this;
  }

  initialInput(input: string): HongTextFieldBorderBuilder {
    this.option.initialInput = input;
    return this;
  }

  inputTextColor(color: HongColorEntry | string): HongTextFieldBorderBuilder {
    this.option.inputTextColorHex = typeof color === 'string' ? color : color.hex;
    return this;
  }

  placeholder(placeholder: string): HongTextFieldBorderBuilder {
    this.option.placeholder = placeholder;
    return this;
  }

  placeholderColor(color: HongColorEntry | string): HongTextFieldBorderBuilder {
    this.option.placeholderColorHex = typeof color === 'string' ? color : color.hex;
    return this;
  }

  placeholderTypo(typo: HongTypoEntry): HongTextFieldBorderBuilder {
    this.option.placeholderTypo = typo;
    return this;
  }

  helperText(helperText: string): HongTextFieldBorderBuilder {
    this.option.helperText = helperText;
    return this;
  }

  helperTextTypo(typo: HongTypoEntry): HongTextFieldBorderBuilder {
    this.option.helperTextTypo = typo;
    return this;
  }

  isRequired(isRequired: boolean): HongTextFieldBorderBuilder {
    this.option.isRequired = isRequired;
    return this;
  }

  state(state: HongInputStateEntry): HongTextFieldBorderBuilder {
    this.option.state = state;
    return this;
  }

  suffix(suffix: string): HongTextFieldBorderBuilder {
    this.option.suffix = suffix;
    return this;
  }

  suffixTypo(typo: HongTypoEntry): HongTextFieldBorderBuilder {
    this.option.suffixTypo = typo;
    return this;
  }

  useClearButton(use: boolean): HongTextFieldBorderBuilder {
    this.option.useClearButton = use;
    return this;
  }

  useNumberKeypad(use: boolean): HongTextFieldBorderBuilder {
    this.option.useNumberKeypad = use;
    return this;
  }

  autoCapitalize(autoCapitalize: 'none' | 'sentences' | 'words' | 'characters'): HongTextFieldBorderBuilder {
    this.option.autoCapitalize = autoCapitalize;
    return this;
  }

  onChangeInput(onChange: (text: string) => void): HongTextFieldBorderBuilder {
    this.option.onChangeInput = onChange;
    return this;
  }

  copy(inject: HongTextFieldBorderOption | null | undefined): HongTextFieldBorderBuilder {
    if (!inject) return new HongTextFieldBorderBuilder();
    return new HongTextFieldBorderBuilder()
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
      .suffix(inject.suffix)
      .suffixTypo(inject.suffixTypo)
      .useClearButton(inject.useClearButton)
      .useNumberKeypad(inject.useNumberKeypad)
      .autoCapitalize(inject.autoCapitalize)
      .onChangeInput(inject.onChangeInput);
  }
}
