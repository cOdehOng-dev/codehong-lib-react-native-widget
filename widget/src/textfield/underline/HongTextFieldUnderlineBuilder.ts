import type { ImageSourcePropType } from 'react-native';
import { HongWidgetCommonBuilder } from '../../HongWidgetCommonBuilder';
import { HongTextFieldUnderlineOption } from './HongTextFieldUnderlineOption';
import type { HongColorEntry } from '../../rule/color/HongColor';
import type { HongTypoEntry } from '../../rule/typo/HongTypo';
import type { HongSpacingInfo } from '../../rule/HongSpacingInfo';
import type { HongKeyboardTypeEntry } from '../../rule/keyboard/HongKeyboardType';
import type { HongKeyboardActionTypeEntry } from '../../rule/keyboard/HongKeyboardActionType';

export class HongTextFieldUnderlineBuilder extends HongWidgetCommonBuilder<HongTextFieldUnderlineOption, HongTextFieldUnderlineBuilder> {
  readonly option: HongTextFieldUnderlineOption = new HongTextFieldUnderlineOption();

  protected self(): HongTextFieldUnderlineBuilder {
    return this;
  }

  input(input: string | null | undefined): HongTextFieldUnderlineBuilder {
    this.option.input = input ?? null;
    return this;
  }

  inputTypo(typo: HongTypoEntry): HongTextFieldUnderlineBuilder {
    this.option.inputTypo = typo;
    return this;
  }

  inputColor(color: HongColorEntry | string): HongTextFieldUnderlineBuilder {
    this.option.inputColorHex = typeof color === 'string' ? color : color.hex;
    return this;
  }

  placeholder(placeholder: string | null | undefined): HongTextFieldUnderlineBuilder {
    this.option.placeholder = placeholder ?? null;
    return this;
  }

  placeholderTypo(typo: HongTypoEntry): HongTextFieldUnderlineBuilder {
    this.option.placeholderTypo = typo;
    return this;
  }

  placeholderColor(color: HongColorEntry | string): HongTextFieldUnderlineBuilder {
    this.option.placeholderColorHex = typeof color === 'string' ? color : color.hex;
    return this;
  }

  clearIcon(icon: ImageSourcePropType | null | undefined): HongTextFieldUnderlineBuilder {
    this.option.clearIcon = icon ?? null;
    return this;
  }

  clearIconSize(size: number): HongTextFieldUnderlineBuilder {
    this.option.clearIconSize = size;
    return this;
  }

  clearIconMargin(margin: HongSpacingInfo): HongTextFieldUnderlineBuilder {
    this.option.clearIconMargin = margin;
    return this;
  }

  cursorColor(color: HongColorEntry | string): HongTextFieldUnderlineBuilder {
    this.option.cursorColorHex = typeof color === 'string' ? color : color.hex;
    return this;
  }

  useHideKeyboard(use: boolean): HongTextFieldUnderlineBuilder {
    this.option.useHideKeyboard = use;
    return this;
  }

  keyboardType(type: HongKeyboardTypeEntry): HongTextFieldUnderlineBuilder {
    this.option.keyboardType = type;
    return this;
  }

  keyboardActionType(action: HongKeyboardActionTypeEntry): HongTextFieldUnderlineBuilder {
    this.option.keyboardActionType = action;
    return this;
  }

  underlineFocusColor(color: HongColorEntry | string): HongTextFieldUnderlineBuilder {
    this.option.underlineFocusColorHex = typeof color === 'string' ? color : color.hex;
    return this;
  }

  underlineOutFocusColor(color: HongColorEntry | string): HongTextFieldUnderlineBuilder {
    this.option.underlineOutFocusColorHex = typeof color === 'string' ? color : color.hex;
    return this;
  }

  underlineHeight(height: number): HongTextFieldUnderlineBuilder {
    this.option.underlineHeight = height;
    return this;
  }

  onTextChanged(onChange: (text: string) => void): HongTextFieldUnderlineBuilder {
    this.option.onTextChanged = onChange;
    return this;
  }

  copy(inject: HongTextFieldUnderlineOption | null | undefined): HongTextFieldUnderlineBuilder {
    if (!inject) return new HongTextFieldUnderlineBuilder();
    return new HongTextFieldUnderlineBuilder()
      .width(inject.width)
      .height(inject.height)
      .margin(inject.margin)
      .padding(inject.padding)
      .onClick(inject.click as any)
      .backgroundColor(inject.backgroundColorHex)
      .input(inject.input)
      .inputTypo(inject.inputTypo)
      .inputColor(inject.inputColorHex)
      .placeholder(inject.placeholder)
      .placeholderTypo(inject.placeholderTypo)
      .placeholderColor(inject.placeholderColorHex)
      .clearIcon(inject.clearIcon)
      .clearIconSize(inject.clearIconSize)
      .clearIconMargin(inject.clearIconMargin)
      .cursorColor(inject.cursorColorHex)
      .useHideKeyboard(inject.useHideKeyboard)
      .keyboardType(inject.keyboardType)
      .keyboardActionType(inject.keyboardActionType)
      .underlineFocusColor(inject.underlineFocusColorHex)
      .underlineOutFocusColor(inject.underlineOutFocusColorHex)
      .underlineHeight(inject.underlineHeight)
      .onTextChanged(inject.onTextChanged);
  }
}
