import type { ImageSourcePropType } from 'react-native';
import { HongWidgetCommonBuilder } from '../../HongWidgetCommonBuilder';
import { HongImageOption } from './HongImageOption';
import type { HongColorEntry } from '../../rule/color/HongColor';
import type { HongScaleTypeEntry } from '../../rule/HongScaleType';
import type { HongRadiusInfo } from '../../rule/radius/HongRadiusInfo';
import type { HongBorderInfo } from '../../rule/HongBorderInfo';
import type { HongShadowInfo } from '../../rule/HongShadowInfo';

export class HongImageBuilder extends HongWidgetCommonBuilder<
  HongImageOption,
  HongImageBuilder
> {
  readonly option: HongImageOption = new HongImageOption();

  protected builder(): HongImageBuilder {
    return this;
  }

  imageSource(
    source: ImageSourcePropType | string | null | undefined,
  ): HongImageBuilder {
    this.option.imageSource = source ?? null;
    return this;
  }

  placeholder(
    placeholder: ImageSourcePropType | null | undefined,
  ): HongImageBuilder {
    this.option.placeholder = placeholder ?? null;
    return this;
  }

  error(error: ImageSourcePropType | null | undefined): HongImageBuilder {
    this.option.error = error ?? null;
    return this;
  }

  scaleType(scaleType: HongScaleTypeEntry): HongImageBuilder {
    this.option.scaleType = scaleType;
    return this;
  }

  imageRadius(radius: HongRadiusInfo): HongImageBuilder {
    this.option.radius = radius;
    return this;
  }

  imageBorder(border: HongBorderInfo): HongImageBuilder {
    this.option.border = border;
    return this;
  }

  imageShadow(shadow: HongShadowInfo): HongImageBuilder {
    this.option.shadow = shadow;
    return this;
  }

  useShapeCircle(useShapeCircle: boolean): HongImageBuilder {
    this.option.useShapeCircle = useShapeCircle;
    return this;
  }

  imageColor(
    color: HongColorEntry | string | null | undefined,
  ): HongImageBuilder {
    this.option.imageColorHex =
      typeof color === 'string' ? color : color?.hex ?? null;
    return this;
  }

  onLoading(onLoading: (() => void) | null | undefined): HongImageBuilder {
    this.option.onLoading = onLoading ?? null;
    return this;
  }

  onSuccess(onSuccess: (() => void) | null | undefined): HongImageBuilder {
    this.option.onSuccess = onSuccess ?? null;
    return this;
  }

  onError(onError: (() => void) | null | undefined): HongImageBuilder {
    this.option.onError = onError ?? null;
    return this;
  }

  copy(inject: HongImageOption | null | undefined): HongImageBuilder {
    if (!inject) return new HongImageBuilder();
    return new HongImageBuilder()
      .width(inject.width)
      .height(inject.height)
      .margin(inject.margin)
      .padding(inject.padding)
      .onClick(inject.click as any)
      .backgroundColor(inject.backgroundColorHex)
      .imageSource(inject.imageSource)
      .placeholder(inject.placeholder)
      .error(inject.error)
      .scaleType(inject.scaleType)
      .imageRadius(inject.radius)
      .imageBorder(inject.border)
      .imageShadow(inject.shadow)
      .useShapeCircle(inject.useShapeCircle)
      .imageColor(inject.imageColorHex)
      .onLoading(inject.onLoading)
      .onSuccess(inject.onSuccess)
      .onError(inject.onError);
  }
}
