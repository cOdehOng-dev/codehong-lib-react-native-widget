import { HongWidgetCommonBuilder } from '../../HongWidgetCommonBuilder';
import { HongTabScrollOption } from './HongTabScrollOption';
import type { HongColorEntry } from '../../rule/color/HongColor';
import type { HongTypoProps } from '../../rule/typo/HongTypo';
import type { HongRadiusInfo } from '../../rule/radius/HongRadiusInfo';

export class HongTabScrollBuilder<D = any> extends HongWidgetCommonBuilder<
  HongTabScrollOption<D>,
  HongTabScrollBuilder<D>
> {
  readonly option: HongTabScrollOption<D> = new HongTabScrollOption<D>();

  protected builder(): HongTabScrollBuilder<D> {
    return this;
  }

  tabList(tabList: D[]): HongTabScrollBuilder<D> {
    this.option.tabList = tabList;
    return this;
  }

  tabTextList(tabTextList: string[]): HongTabScrollBuilder<D> {
    this.option.tabTextList = tabTextList;
    return this;
  }

  // ─── 선택 탭 스타일 ───────────────────────────────────────────────

  selectTabTextTypo(typo: HongTypoProps): HongTabScrollBuilder<D> {
    this.option.selectTabTextTypo = typo;
    return this;
  }

  selectTabTextColor(color: HongColorEntry): HongTabScrollBuilder<D>;
  selectTabTextColor(colorHex: string): HongTabScrollBuilder<D>;
  selectTabTextColor(colorOrHex: HongColorEntry | string): HongTabScrollBuilder<D> {
    this.option.selectTabTextColorHex =
      typeof colorOrHex === 'string' ? colorOrHex : colorOrHex.hex;
    return this;
  }

  selectBackgroundColor(color: HongColorEntry): HongTabScrollBuilder<D>;
  selectBackgroundColor(colorHex: string): HongTabScrollBuilder<D>;
  selectBackgroundColor(colorOrHex: HongColorEntry | string): HongTabScrollBuilder<D> {
    this.option.selectBackgroundColorHex =
      typeof colorOrHex === 'string' ? colorOrHex : colorOrHex.hex;
    return this;
  }

  selectBorderColor(color: HongColorEntry): HongTabScrollBuilder<D>;
  selectBorderColor(colorHex: string): HongTabScrollBuilder<D>;
  selectBorderColor(colorOrHex: HongColorEntry | string): HongTabScrollBuilder<D> {
    this.option.selectBorderColorHex =
      typeof colorOrHex === 'string' ? colorOrHex : colorOrHex.hex;
    return this;
  }

  selectBorderWidth(width: number): HongTabScrollBuilder<D> {
    this.option.selectBorderWidth = width;
    return this;
  }

  // ─── 미선택 탭 스타일 ─────────────────────────────────────────────

  unselectTabTextTypo(typo: HongTypoProps): HongTabScrollBuilder<D> {
    this.option.unselectTabTextTypo = typo;
    return this;
  }

  unselectTabTextColor(color: HongColorEntry): HongTabScrollBuilder<D>;
  unselectTabTextColor(colorHex: string): HongTabScrollBuilder<D>;
  unselectTabTextColor(colorOrHex: HongColorEntry | string): HongTabScrollBuilder<D> {
    this.option.unselectTabTextColorHex =
      typeof colorOrHex === 'string' ? colorOrHex : colorOrHex.hex;
    return this;
  }

  unselectBackgroundColor(color: HongColorEntry): HongTabScrollBuilder<D>;
  unselectBackgroundColor(colorHex: string): HongTabScrollBuilder<D>;
  unselectBackgroundColor(colorOrHex: HongColorEntry | string): HongTabScrollBuilder<D> {
    this.option.unselectBackgroundColorHex =
      typeof colorOrHex === 'string' ? colorOrHex : colorOrHex.hex;
    return this;
  }

  unselectBorderColor(color: HongColorEntry): HongTabScrollBuilder<D>;
  unselectBorderColor(colorHex: string): HongTabScrollBuilder<D>;
  unselectBorderColor(colorOrHex: HongColorEntry | string): HongTabScrollBuilder<D> {
    this.option.unselectBorderColorHex =
      typeof colorOrHex === 'string' ? colorOrHex : colorOrHex.hex;
    return this;
  }

  unselectBorderWidth(width: number): HongTabScrollBuilder<D> {
    this.option.unselectBorderWidth = width;
    return this;
  }

  // ─── 간격 설정 ────────────────────────────────────────────────────

  tabBetweenPadding(padding: number): HongTabScrollBuilder<D> {
    this.option.tabBetweenPadding = padding;
    return this;
  }

  tabTextHorizontalPadding(padding: number): HongTabScrollBuilder<D> {
    this.option.tabTextHorizontalPadding = padding;
    return this;
  }

  tabTextVerticalPadding(padding: number): HongTabScrollBuilder<D> {
    this.option.tabTextVerticalPadding = padding;
    return this;
  }

  tabRadius(radius: HongRadiusInfo): HongTabScrollBuilder<D> {
    this.option.radius = radius;
    return this;
  }

  // ─── 초기값 / 콜백 ───────────────────────────────────────────────

  initialSelectIndex(index: number): HongTabScrollBuilder<D> {
    this.option.initialSelectIndex = index;
    return this;
  }

  onTabClick(callback: ((index: number, item: D) => void) | null | undefined): HongTabScrollBuilder<D> {
    this.option.tabClick = callback ?? null;
    return this;
  }

  copy(inject: HongTabScrollOption<D> | null | undefined): HongTabScrollBuilder<D> {
    if (!inject) return new HongTabScrollBuilder<D>();
    return new HongTabScrollBuilder<D>()
      .width(inject.width)
      .height(inject.height)
      .margin(inject.margin)
      .padding(inject.padding)
      .backgroundColor(inject.backgroundColorHex)
      .tabList(inject.tabList)
      .tabTextList(inject.tabTextList)
      .selectTabTextTypo(inject.selectTabTextTypo)
      .selectTabTextColor(inject.selectTabTextColorHex)
      .selectBackgroundColor(inject.selectBackgroundColorHex)
      .selectBorderColor(inject.selectBorderColorHex)
      .selectBorderWidth(inject.selectBorderWidth)
      .unselectTabTextTypo(inject.unselectTabTextTypo)
      .unselectTabTextColor(inject.unselectTabTextColorHex)
      .unselectBackgroundColor(inject.unselectBackgroundColorHex)
      .unselectBorderColor(inject.unselectBorderColorHex)
      .unselectBorderWidth(inject.unselectBorderWidth)
      .tabBetweenPadding(inject.tabBetweenPadding)
      .tabTextHorizontalPadding(inject.tabTextHorizontalPadding)
      .tabTextVerticalPadding(inject.tabTextVerticalPadding)
      .tabRadius(inject.radius)
      .initialSelectIndex(inject.initialSelectIndex)
      .onTabClick(inject.tabClick);
  }
}
