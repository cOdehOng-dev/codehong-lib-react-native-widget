import { HongWidgetCommonBuilder } from '../../HongWidgetCommonBuilder';
import { HongTextFieldTimerOption } from './HongTextFieldTimerOption';
import type { HongColorEntry } from '../../rule/color/HongColor';
import type { HongTypoProps } from '../../rule/typo/HongTypo';

export class HongTextFieldTimerBuilder extends HongWidgetCommonBuilder<
  HongTextFieldTimerOption,
  HongTextFieldTimerBuilder
> {
  readonly option: HongTextFieldTimerOption = new HongTextFieldTimerOption();

  protected builder(): HongTextFieldTimerBuilder {
    return this;
  }

  input(input: string): HongTextFieldTimerBuilder {
    this.option.input = input;
    return this;
  }

  inputTypo(typo: HongTypoProps): HongTextFieldTimerBuilder {
    this.option.inputTypo = typo;
    return this;
  }

  inputColor(color: HongColorEntry | string): HongTextFieldTimerBuilder {
    this.option.inputColorHex = typeof color === 'string' ? color : color.hex;
    return this;
  }

  placeholder(placeholder: string): HongTextFieldTimerBuilder {
    this.option.placeholder = placeholder;
    return this;
  }

  placeholderTypo(typo: HongTypoProps): HongTextFieldTimerBuilder {
    this.option.placeholderTypo = typo;
    return this;
  }

  placeholderColor(color: HongColorEntry | string): HongTextFieldTimerBuilder {
    this.option.placeholderColorHex =
      typeof color === 'string' ? color : color.hex;
    return this;
  }

  cursorColor(color: HongColorEntry | string): HongTextFieldTimerBuilder {
    this.option.cursorColorHex = typeof color === 'string' ? color : color.hex;
    return this;
  }

  useHideKeyboard(use: boolean): HongTextFieldTimerBuilder {
    this.option.useHideKeyboard = use;
    return this;
  }

  useNumberKeypad(use: boolean): HongTextFieldTimerBuilder {
    this.option.useNumberKeypad = use;
    return this;
  }

  useClearButton(use: boolean): HongTextFieldTimerBuilder {
    this.option.useClearButton = use;
    return this;
  }

  underlineFocusColor(
    color: HongColorEntry | string,
  ): HongTextFieldTimerBuilder {
    this.option.underlineFocusColorHex =
      typeof color === 'string' ? color : color.hex;
    return this;
  }

  underlineOutFocusColor(
    color: HongColorEntry | string,
  ): HongTextFieldTimerBuilder {
    this.option.underlineOutFocusColorHex =
      typeof color === 'string' ? color : color.hex;
    return this;
  }

  underlineFinishColor(
    color: HongColorEntry | string | null,
  ): HongTextFieldTimerBuilder {
    this.option.underlineFinishColorHex =
      color === null ? null : typeof color === 'string' ? color : color.hex;
    return this;
  }

  underlineHeight(height: number): HongTextFieldTimerBuilder {
    this.option.underlineHeight = height;
    return this;
  }

  min(min: number): HongTextFieldTimerBuilder {
    this.option.min = min;
    return this;
  }

  sec(sec: number): HongTextFieldTimerBuilder {
    this.option.sec = sec;
    return this;
  }

  countDownTypo(typo: HongTypoProps): HongTextFieldTimerBuilder {
    this.option.countDownTypo = typo;
    return this;
  }

  countDownColor(color: HongColorEntry | string): HongTextFieldTimerBuilder {
    this.option.countDownColorHex =
      typeof color === 'string' ? color : color.hex;
    return this;
  }

  onTextChanged(onChange: (text: string) => void): HongTextFieldTimerBuilder {
    this.option.onTextChanged = onChange;
    return this;
  }

  onFinish(onFinish: (() => void) | null): HongTextFieldTimerBuilder {
    this.option.onFinish = onFinish;
    return this;
  }

  copy(
    inject: HongTextFieldTimerOption | null | undefined,
  ): HongTextFieldTimerBuilder {
    if (!inject) return new HongTextFieldTimerBuilder();
    return new HongTextFieldTimerBuilder()
      .width(inject.width)
      .height(inject.height)
      .margin(inject.margin)
      .padding(inject.padding)
      .input(inject.input)
      .inputTypo(inject.inputTypo)
      .inputColor(inject.inputColorHex)
      .placeholder(inject.placeholder)
      .placeholderTypo(inject.placeholderTypo)
      .placeholderColor(inject.placeholderColorHex)
      .cursorColor(inject.cursorColorHex)
      .useHideKeyboard(inject.useHideKeyboard)
      .useNumberKeypad(inject.useNumberKeypad)
      .useClearButton(inject.useClearButton)
      .underlineFocusColor(inject.underlineFocusColorHex)
      .underlineOutFocusColor(inject.underlineOutFocusColorHex)
      .underlineFinishColor(inject.underlineFinishColorHex)
      .underlineHeight(inject.underlineHeight)
      .min(inject.min)
      .sec(inject.sec)
      .countDownTypo(inject.countDownTypo)
      .countDownColor(inject.countDownColorHex)
      .onTextChanged(inject.onTextChanged)
      .onFinish(inject.onFinish);
  }
}
