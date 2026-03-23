import { HongWidgetCommonBuilder } from '../../HongWidgetCommonBuilder';
import { HongButtonTextOption } from './HongButtonTextOption';
import {
  defaultHongShadowInfo,
  defaultHongSpacingInfo,
  HongBorderInfo,
  HongColorEntry,
  HongRadiusInfo,
  HongShadowInfo,
  HongSpacingInfo,
  HongTypoProps,
} from '../../rule';
import { HongState } from '../../rule/HongState';

export class HongButtonTextBuilder extends HongWidgetCommonBuilder<
  HongButtonTextOption,
  HongButtonTextBuilder
> {
  readonly option: HongButtonTextOption = new HongButtonTextOption();

  protected builder(): HongButtonTextBuilder {
    return this;
  }

  padding(padding: HongSpacingInfo): HongButtonTextBuilder {
    this.option.padding = defaultHongSpacingInfo();
    return this;
  }

  radius(radius: HongRadiusInfo): HongButtonTextBuilder {
    this.option.radius = radius;
    return this;
  }

  border(border: HongBorderInfo): HongButtonTextBuilder {
    this.option.border = border;
    return this;
  }

  shadow(shadow: HongShadowInfo | null): HongButtonTextBuilder {
    this.option.shadow = shadow ?? defaultHongShadowInfo();
    return this;
  }

  state(state: HongState): HongButtonTextBuilder {
    this.option.state = state;
    return this;
  }

  text(text: string | null): HongButtonTextBuilder {
    this.option.text = text ?? '';
    return this;
  }

  textTypo(typo: HongTypoProps): HongButtonTextBuilder {
    this.option.textTypo = typo;
    return this;
  }

  textColor(color: HongColorEntry): HongButtonTextBuilder;
  textColor(colorHex: string): HongButtonTextBuilder;
  textColor(color: HongColorEntry | string): HongButtonTextBuilder {
    this.option.textColorHex = typeof color === 'string' ? color : color.hex;
    return this;
  }

  copy(inject: HongButtonTextOption): HongButtonTextBuilder {
    return new HongButtonTextBuilder()
      .width(inject.width)
      .height(inject.height)
      .margin(inject.margin)
      .onClick(inject.click as any)
      .radius(inject.radius)
      .shadow(inject.shadow)
      .backgroundColor(inject.backgroundColorHex)
      .border(inject.border)
      .text(inject.text)
      .textTypo(inject.textTypo)
      .textColor(inject.textColorHex)
      .state(inject.state);
  }
}
