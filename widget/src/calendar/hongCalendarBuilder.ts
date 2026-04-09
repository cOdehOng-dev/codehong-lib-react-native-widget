import { HongWidgetCommonBuilder } from '../HongWidgetCommonBuilder';
import { HongColorEntry } from '../rule';
import {
  HongCalendarOption,
  HongCalendarDayStyle,
  HongCalendarDayOfWeekLangTypeEntry,
} from './hongCalendarOption';

export class HongCalendarBuilder extends HongWidgetCommonBuilder<
  HongCalendarOption,
  HongCalendarBuilder
> {
  readonly option: HongCalendarOption = new HongCalendarOption();

  protected builder(): HongCalendarBuilder {
    return this;
  }

  spacingHorizontal(value: number): HongCalendarBuilder {
    this.option.spacingHorizontal = value;
    this.option.padding = { left: value, top: 0, right: value, bottom: 0 };
    return this;
  }

  dayOfWeekLangType(
    type: HongCalendarDayOfWeekLangTypeEntry,
  ): HongCalendarBuilder {
    this.option.dayOfWeekLangType = type;
    return this;
  }

  dayOfWeekStyle(style: HongCalendarDayStyle): HongCalendarBuilder {
    this.option.dayOfWeekStyle = style;
    return this;
  }

  dayOfWeekBottomLineColor(color: HongColorEntry): HongCalendarBuilder;
  dayOfWeekBottomLineColor(colorHex: string): HongCalendarBuilder;
  dayOfWeekBottomLineColor(
    color: HongColorEntry | string,
  ): HongCalendarBuilder {
    this.option.dayOfWeekBottomLineColorHex =
      typeof color === 'string' ? color : color.hex;
    return this;
  }

  yearMonthPattern(pattern: string): HongCalendarBuilder {
    this.option.yearMonthPattern = pattern;
    return this;
  }

  yearMonthStyle(style: HongCalendarDayStyle): HongCalendarBuilder {
    this.option.yearMonthStyle = style;
    return this;
  }

  startDayStyle(style: HongCalendarDayStyle): HongCalendarBuilder {
    this.option.startDayStyle = style;
    return this;
  }

  endDayStyle(style: HongCalendarDayStyle): HongCalendarBuilder {
    this.option.endDayStyle = style;
    return this;
  }

  rangeDaysStyle(style: HongCalendarDayStyle): HongCalendarBuilder {
    this.option.rangeDaysStyle = style;
    return this;
  }

  holidaysStyle(style: HongCalendarDayStyle): HongCalendarBuilder {
    this.option.holidaysStyle = style;
    return this;
  }

  pastDaysStyle(style: HongCalendarDayStyle): HongCalendarBuilder {
    this.option.pastDaysStyle = style;
    return this;
  }

  defaultDayStyle(style: HongCalendarDayStyle): HongCalendarBuilder {
    this.option.defaultDayStyle = style;
    return this;
  }

  todaySelectedStyle(style: HongCalendarDayStyle): HongCalendarBuilder {
    this.option.todaySelectedStyle = style;
    return this;
  }

  todayUnselectedStyle(style: HongCalendarDayStyle): HongCalendarBuilder {
    this.option.todayUnselectedStyle = style;
    return this;
  }

  bottomSpacingDayOfWeek(value: number): HongCalendarBuilder {
    this.option.bottomSpacingDayOfWeek = value;
    return this;
  }

  bottomSpacingMonth(value: number): HongCalendarBuilder {
    this.option.bottomSpacingMonth = value;
    return this;
  }

  bottomSpacingWeek(value: number): HongCalendarBuilder {
    this.option.bottomSpacingWeek = value;
    return this;
  }

  holidayList(list: string[] | null): HongCalendarBuilder {
    this.option.holidayList = list;
    return this;
  }

  maxYears(value: number): HongCalendarBuilder {
    this.option.maxYears = value;
    return this;
  }

  initialStartDate(date: string | null): HongCalendarBuilder {
    this.option.initialStartDate = date;
    return this;
  }

  initialEndDate(date: string | null): HongCalendarBuilder {
    this.option.initialEndDate = date;
    return this;
  }

  onSelected(
    fn: ((startDate: Date | null, endDate: Date | null) => void) | null,
  ): HongCalendarBuilder {
    this.option.onSelected = fn;
    return this;
  }

  copy(inject: HongCalendarOption | null | undefined): HongCalendarBuilder {
    if (!inject) return new HongCalendarBuilder();
    return new HongCalendarBuilder()
      .width(inject.width)
      .height(inject.height)
      .margin(inject.margin)
      .backgroundColor(inject.backgroundColorHex)
      .spacingHorizontal(inject.spacingHorizontal)
      .dayOfWeekLangType(inject.dayOfWeekLangType)
      .dayOfWeekStyle(inject.dayOfWeekStyle)
      .dayOfWeekBottomLineColor(inject.dayOfWeekBottomLineColorHex)
      .yearMonthPattern(inject.yearMonthPattern)
      .yearMonthStyle(inject.yearMonthStyle)
      .startDayStyle(inject.startDayStyle)
      .endDayStyle(inject.endDayStyle)
      .rangeDaysStyle(inject.rangeDaysStyle)
      .holidaysStyle(inject.holidaysStyle)
      .pastDaysStyle(inject.pastDaysStyle)
      .defaultDayStyle(inject.defaultDayStyle)
      .todaySelectedStyle(inject.todaySelectedStyle)
      .todayUnselectedStyle(inject.todayUnselectedStyle)
      .bottomSpacingDayOfWeek(inject.bottomSpacingDayOfWeek)
      .bottomSpacingMonth(inject.bottomSpacingMonth)
      .bottomSpacingWeek(inject.bottomSpacingWeek)
      .holidayList(inject.holidayList)
      .maxYears(inject.maxYears)
      .initialStartDate(inject.initialStartDate)
      .initialEndDate(inject.initialEndDate)
      .onSelected(inject.onSelected);
  }
}
