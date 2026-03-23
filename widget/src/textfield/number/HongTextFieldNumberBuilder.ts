import type { ImageSourcePropType } from 'react-native';
import { HongWidgetCommonBuilder } from '../../HongWidgetCommonBuilder';
import { HongTextFieldNumberOption } from './HongTextFieldNumberOption';
import type { HongColorEntry } from '../../rule/color/HongColor';
import type { HongTypoProps } from '../../rule/typo/HongTypo';
import type { HongSpacingInfo } from '../../rule/HongSpacingInfo';
import type { HongKeyboardActionTypeEntry } from '../../rule/keyboard/HongKeyboardActionType';

export class HongTextFieldNumberBuilder extends HongWidgetCommonBuilder<
  HongTextFieldNumberOption,
  HongTextFieldNumberBuilder
> {
  readonly option: HongTextFieldNumberOption = new HongTextFieldNumberOption();

  protected builder(): HongTextFieldNumberBuilder {
    return this;
  }

  placeholder(
    placeholder: string | null | undefined,
  ): HongTextFieldNumberBuilder {
    this.option.placeholder = placeholder ?? null;
    return this;
  }

  placeholderColor(color: HongColorEntry | string): HongTextFieldNumberBuilder {
    this.option.placeholderColorHex =
      typeof color === 'string' ? color : color.hex;
    return this;
  }

  placeholderTypo(typo: HongTypoProps): HongTextFieldNumberBuilder {
    this.option.placeholderTypo = typo;
    return this;
  }

  input(input: string | null | undefined): HongTextFieldNumberBuilder {
    this.option.input = input ?? null;
    return this;
  }

  inputTypo(typo: HongTypoProps): HongTextFieldNumberBuilder {
    this.option.inputTypo = typo;
    return this;
  }

  inputColor(color: HongColorEntry | string): HongTextFieldNumberBuilder {
    this.option.inputColorHex = typeof color === 'string' ? color : color.hex;
    return this;
  }

  clearIcon(
    icon: ImageSourcePropType | null | undefined,
  ): HongTextFieldNumberBuilder {
    this.option.clearIcon = icon ?? null;
    return this;
  }

  clearIconSize(size: number): HongTextFieldNumberBuilder {
    this.option.clearIconSize = size;
    return this;
  }

  clearIconMargin(margin: HongSpacingInfo): HongTextFieldNumberBuilder {
    this.option.clearIconMargin = margin;
    return this;
  }

  cursorColor(color: HongColorEntry | string): HongTextFieldNumberBuilder {
    this.option.cursorColorHex = typeof color === 'string' ? color : color.hex;
    return this;
  }

  useHideKeyboard(use: boolean): HongTextFieldNumberBuilder {
    this.option.useHideKeyboard = use;
    return this;
  }

  keyboardActionType(
    action: HongKeyboardActionTypeEntry,
  ): HongTextFieldNumberBuilder {
    this.option.keyboardActionType = action;
    return this;
  }

  useDecimal(use: boolean): HongTextFieldNumberBuilder {
    this.option.useDecimal = use;
    return this;
  }

  onTextChanged(
    onTextChanged: (text: string) => void,
  ): HongTextFieldNumberBuilder {
    this.option.onTextChanged = onTextChanged;
    return this;
  }

  copy(
    inject: HongTextFieldNumberOption | null | undefined,
  ): HongTextFieldNumberBuilder {
    if (!inject) return new HongTextFieldNumberBuilder();
    return new HongTextFieldNumberBuilder()
      .width(inject.width)
      .height(inject.height)
      .margin(inject.margin)
      .padding(inject.padding)
      .onClick(inject.click as any)
      .backgroundColor(inject.backgroundColorHex)
      .placeholder(inject.placeholder)
      .placeholderColor(inject.placeholderColorHex)
      .placeholderTypo(inject.placeholderTypo)
      .input(inject.input)
      .inputTypo(inject.inputTypo)
      .inputColor(inject.inputColorHex)
      .clearIcon(inject.clearIcon)
      .clearIconSize(inject.clearIconSize)
      .clearIconMargin(inject.clearIconMargin)
      .cursorColor(inject.cursorColorHex)
      .useHideKeyboard(inject.useHideKeyboard)
      .keyboardActionType(inject.keyboardActionType)
      .useDecimal(inject.useDecimal)
      .onTextChanged(inject.onTextChanged);
  }
}
