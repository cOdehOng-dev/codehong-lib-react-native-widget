import { HongWidgetCommonBuilder } from '../../HongWidgetCommonBuilder';
import { HongBottomSheetModalOption } from './hongBottomSheetModalOption';

export class HongBottomSheetModalBuilder extends HongWidgetCommonBuilder<
  HongBottomSheetModalOption,
  HongBottomSheetModalBuilder
> {
  readonly option: HongBottomSheetModalOption =
    new HongBottomSheetModalOption();

  protected builder(): HongBottomSheetModalBuilder {
    return this;
  }

  topRadius(topRadius: number): HongBottomSheetModalBuilder {
    this.option.topRadius = topRadius;
    return this;
  }

  isVisible(isVisible: boolean): HongBottomSheetModalBuilder {
    this.option.isVisible = isVisible;
    return this;
  }

  onDismiss(onDismiss: () => void): HongBottomSheetModalBuilder {
    this.option.onDismiss = onDismiss;
    return this;
  }

  isClickDimDismiss(isClickDimDismiss: boolean): HongBottomSheetModalBuilder {
    this.option.isClickDimDismiss = isClickDimDismiss;
    return this;
  }

  children(children: React.ReactNode): HongBottomSheetModalBuilder {
    this.option.children = children;
    return this;
  }

  copy(
    inject: HongBottomSheetModalOption | null | undefined,
  ): HongBottomSheetModalBuilder {
    if (!inject) return new HongBottomSheetModalBuilder();
    return new HongBottomSheetModalBuilder()
      .width(inject.width)
      .height(inject.height)
      .margin(inject.margin)
      .padding(inject.padding)
      .backgroundColor(inject.backgroundColorHex)
      .topRadius(inject.topRadius)
      .isVisible(inject.isVisible)
      .onDismiss(inject.onDismiss)
      .isClickDimDismiss(inject.isClickDimDismiss)
      .children(inject.children);
  }
}
