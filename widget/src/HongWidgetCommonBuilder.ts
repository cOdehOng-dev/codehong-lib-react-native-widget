import type { HongWidgetCommonOption } from './HongWidgetCommonOption';
import type { HongSpacingInfo } from './rule/HongSpacingInfo';
import type { HongColorEntry } from './rule/color/HongColor';

export abstract class HongWidgetCommonBuilder<
  T extends HongWidgetCommonOption,
  S extends HongWidgetCommonBuilder<T, S>
> {
  abstract readonly option: T;

  protected abstract self(): S;

  width(width: number | null | undefined): S {
    if (width != null) this.option.width = width;
    return this.self();
  }

  height(height: number | null | undefined): S {
    if (height != null) this.option.height = height;
    return this.self();
  }

  margin(margin: HongSpacingInfo): S {
    this.option.margin = margin;
    return this.self();
  }

  padding(padding: HongSpacingInfo): S {
    this.option.padding = padding;
    return this.self();
  }

  backgroundColor(color: HongColorEntry): S;
  backgroundColor(colorHex: string): S;
  backgroundColor(colorOrHex: HongColorEntry | string): S {
    this.option.backgroundColorHex =
      typeof colorOrHex === 'string' ? colorOrHex : colorOrHex.hex;
    return this.self();
  }

  onClick(onClick: ((option: T) => void) | null | undefined): S {
    this.option.click = onClick
      ? (opt) => onClick(opt as T)
      : null;
    return this.self();
  }

  applyOption(): T {
    return this.option;
  }
}
