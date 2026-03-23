import type { ImageSourcePropType } from 'react-native';
import { HongWidgetCommonBuilder } from '../../HongWidgetCommonBuilder';
import { HongTextFieldOption } from './HongTextFieldOption';
import type { HongColorEntry } from '../../rule/color/HongColor';
import type { HongTypoProps } from '../../rule/typo/HongTypo';
import type { HongRadiusInfo } from '../../rule/radius/HongRadiusInfo';
import type { HongBorderInfo } from '../../rule/HongBorderInfo';
import type { HongSpacingInfo } from '../../rule/HongSpacingInfo';
import type { HongKeyboardTypeEntry } from '../../rule/keyboard/HongKeyboardType';
import type { HongKeyboardActionTypeEntry } from '../../rule/keyboard/HongKeyboardActionType';

export class HongTextFieldBuilder extends HongWidgetCommonBuilder<
  HongTextFieldOption,
  HongTextFieldBuilder
> {
  readonly option: HongTextFieldOption = new HongTextFieldOption();

  protected builder(): HongTextFieldBuilder {
    return this;
  }

  fieldRadius(radius: HongRadiusInfo): HongTextFieldBuilder {
    this.option.radius = radius;
    return this;
  }

  fieldBorder(border: HongBorderInfo): HongTextFieldBuilder {
    this.option.border = border;
    return this;
  }

  placeholder(placeholder: string | null | undefined): HongTextFieldBuilder {
    this.option.placeholder = placeholder ?? null;
    return this;
  }

  placeholderColor(
    color: HongColorEntry | string | null | undefined,
  ): HongTextFieldBuilder {
    this.option.placeholderColorHex =
      typeof color === 'string' ? color : color?.hex ?? '';
    return this;
  }

  placeholderTypo(typo: HongTypoProps): HongTextFieldBuilder {
    this.option.placeholderTypo = typo;
    return this;
  }

  placeholderPadding(padding: HongSpacingInfo): HongTextFieldBuilder {
    this.option.placeholderPadding = padding;
    return this;
  }

  input(input: string | null | undefined): HongTextFieldBuilder {
    this.option.input = input ?? null;
    return this;
  }

  inputTypo(typo: HongTypoProps): HongTextFieldBuilder {
    this.option.inputTypo = typo;
    return this;
  }

  inputColor(
    color: HongColorEntry | string | null | undefined,
  ): HongTextFieldBuilder {
    this.option.inputColorHex =
      typeof color === 'string' ? color : color?.hex ?? '';
    return this;
  }

  clearIcon(
    icon: ImageSourcePropType | null | undefined,
  ): HongTextFieldBuilder {
    this.option.clearIcon = icon ?? null;
    return this;
  }

  clearIconSize(size: number): HongTextFieldBuilder {
    this.option.clearIconSize = size;
    return this;
  }

  clearIconMargin(margin: HongSpacingInfo): HongTextFieldBuilder {
    this.option.clearIconMargin = margin;
    return this;
  }

  cursorColor(
    color: HongColorEntry | string | null | undefined,
  ): HongTextFieldBuilder {
    this.option.cursorColorHex =
      typeof color === 'string' ? color : color?.hex ?? '';
    return this;
  }

  useHideKeyboard(use: boolean): HongTextFieldBuilder {
    this.option.useHideKeyboard = use;
    return this;
  }

  singleLine(singleLine: boolean): HongTextFieldBuilder {
    this.option.singleLine = singleLine;
    return this;
  }

  maxLines(maxLines: number): HongTextFieldBuilder {
    this.option.maxLines = maxLines;
    return this;
  }

  minLines(minLines: number): HongTextFieldBuilder {
    this.option.minLines = minLines;
    return this;
  }

  keyboardType(type: HongKeyboardTypeEntry): HongTextFieldBuilder {
    this.option.keyboardType = type;
    return this;
  }

  keyboardActionType(
    action: HongKeyboardActionTypeEntry,
  ): HongTextFieldBuilder {
    this.option.keyboardActionType = action;
    return this;
  }

  autoCapitalize(
    autoCapitalize: 'none' | 'sentences' | 'words' | 'characters',
  ): HongTextFieldBuilder {
    this.option.autoCapitalize = autoCapitalize;
    return this;
  }

  delayInputCallback(delay: number): HongTextFieldBuilder {
    this.option.delayInputCallback = delay;
    return this;
  }

  onTextChanged(onTextChanged: (text: string) => void): HongTextFieldBuilder {
    this.option.onTextChanged = onTextChanged;
    return this;
  }

  copy(inject: HongTextFieldOption | null | undefined): HongTextFieldBuilder {
    if (!inject) return new HongTextFieldBuilder();
    return new HongTextFieldBuilder()
      .width(inject.width)
      .height(inject.height)
      .margin(inject.margin)
      .padding(inject.padding)
      .onClick(inject.click as any)
      .backgroundColor(inject.backgroundColorHex)
      .fieldRadius(inject.radius)
      .fieldBorder(inject.border)
      .placeholder(inject.placeholder)
      .placeholderColor(inject.placeholderColorHex)
      .placeholderTypo(inject.placeholderTypo)
      .placeholderPadding(inject.placeholderPadding)
      .input(inject.input)
      .inputTypo(inject.inputTypo)
      .inputColor(inject.inputColorHex)
      .clearIcon(inject.clearIcon)
      .clearIconSize(inject.clearIconSize)
      .clearIconMargin(inject.clearIconMargin)
      .cursorColor(inject.cursorColorHex)
      .useHideKeyboard(inject.useHideKeyboard)
      .singleLine(inject.singleLine)
      .maxLines(inject.maxLines)
      .minLines(inject.minLines)
      .keyboardType(inject.keyboardType)
      .keyboardActionType(inject.keyboardActionType)
      .delayInputCallback(inject.delayInputCallback)
      .onTextChanged(inject.onTextChanged)
      .autoCapitalize(inject.autoCapitalize);
  }
}
