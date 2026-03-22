import type { ImageSourcePropType } from 'react-native';
import { HongWidgetCommonBuilder } from '../../HongWidgetCommonBuilder';
import { HongImageBlurOption } from './HongImageBlurOption';
import type { HongScaleTypeEntry } from '../../rule/HongScaleType';
import type { HongRadiusInfo } from '../../rule/radius/HongRadiusInfo';

export class HongImageBlurBuilder extends HongWidgetCommonBuilder<
  HongImageBlurOption,
  HongImageBlurBuilder
> {
  readonly option: HongImageBlurOption = new HongImageBlurOption();

  protected builder(): HongImageBlurBuilder {
    return this;
  }

  imageSource(
    source: ImageSourcePropType | string | null | undefined,
  ): HongImageBlurBuilder {
    this.option.imageSource = source ?? null;
    return this;
  }

  scaleType(scaleType: HongScaleTypeEntry): HongImageBlurBuilder {
    this.option.scaleType = scaleType;
    return this;
  }

  imageRadius(radius: HongRadiusInfo): HongImageBlurBuilder {
    this.option.radius = radius;
    return this;
  }

  useShapeCircle(useShapeCircle: boolean): HongImageBlurBuilder {
    this.option.useShapeCircle = useShapeCircle;
    return this;
  }

  blur(blur: number): HongImageBlurBuilder {
    this.option.blur = blur;
    return this;
  }

  copy(inject: HongImageBlurOption | null | undefined): HongImageBlurBuilder {
    if (!inject) return new HongImageBlurBuilder();
    return new HongImageBlurBuilder()
      .width(inject.width)
      .height(inject.height)
      .margin(inject.margin)
      .padding(inject.padding)
      .onClick(inject.click as any)
      .imageSource(inject.imageSource)
      .scaleType(inject.scaleType)
      .imageRadius(inject.radius)
      .useShapeCircle(inject.useShapeCircle)
      .blur(inject.blur);
  }
}
