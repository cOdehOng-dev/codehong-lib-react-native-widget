import { HongWidgetCommonBuilder } from '../../HongWidgetCommonBuilder';
import { HongTextBadgeOption } from './HongTextBadgeOption';
import type { HongColorEntry } from '../../rule/color/HongColor';
import type { HongBorderInfo } from '../../rule/HongBorderInfo';
import type { HongShadowInfo } from '../../rule/HongShadowInfo';
import type { HongRadiusInfo } from '../../rule/radius/HongRadiusInfo';
import type { HongTypoEntry } from '../../rule/typo/HongTypo';

export class HongTextBadgeBuilder extends HongWidgetCommonBuilder<HongTextBadgeOption, HongTextBadgeBuilder> {
  readonly option: HongTextBadgeOption = new HongTextBadgeOption();

  protected self(): HongTextBadgeBuilder {
    return this;
  }

  border(borderInfo: HongBorderInfo): HongTextBadgeBuilder {
    this.option.border = borderInfo;
    return this;
  }

  radius(radiusInfo: HongRadiusInfo): HongTextBadgeBuilder {
    this.option.radius = radiusInfo;
    return this;
  }

  shadow(shadow: HongShadowInfo): HongTextBadgeBuilder {
    this.option.shadow = shadow;
    return this;
  }

  text(text: string | null | undefined): HongTextBadgeBuilder {
    this.option.text = text ?? null;
    return this;
  }

  textColor(color: HongColorEntry | string | null | undefined): HongTextBadgeBuilder {
    this.option.textColorHex = typeof color === 'string' ? color : (color?.hex ?? null);
    return this;
  }

  textTypo(typo: HongTypoEntry): HongTextBadgeBuilder {
    this.option.textTypography = typo;
    return this;
  }

  copy(inject: HongTextBadgeOption): HongTextBadgeBuilder {
    return new HongTextBadgeBuilder()
      .width(inject.width)
      .height(inject.height)
      .margin(inject.margin)
      .padding(inject.padding)
      .onClick(inject.click as any)
      .backgroundColor(inject.backgroundColorHex)
      .border(inject.border)
      .radius(inject.radius)
      .shadow(inject.shadow)
      .text(inject.text)
      .textColor(inject.textColorHex)
      .textTypo(inject.textTypography);
  }
}
