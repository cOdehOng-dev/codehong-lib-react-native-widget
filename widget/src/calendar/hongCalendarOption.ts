import { HongWidgetCommonOption } from '../HongWidgetCommonOption';
import {
  HongWidgetTypeEntry,
  HongSpacingInfo,
  HongRadiusInfo,
  HongBorderInfo,
  HongShadowInfo,
  HongWidgetType,
  HongLayoutParam,
  defaultHongSpacingInfo,
  HongColor,
  defaultHongRadiusInfo,
  defaultHongBorderInfo,
  defaultHongShadowInfo,
} from '../rule';

// ─── Day of Week Lang Type ────────────────────────────────────────────────────

export type HongCalendarDayOfWeekLangTypeEntry = {
  dayOfWeekList: readonly string[];
};

export const HongCalendarDayOfWeekLangType = {
  KOR: { dayOfWeekList: ['일', '월', '화', '수', '목', '금', '토'] },
  ENG: { dayOfWeekList: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
} as const;

// ─── Day Style ───────────────────────────────────────────────────────────────

export interface HongCalendarDayStyle {
  fontSize: number;
  color: string;
  fontWeight: '400' | '700';
  backgroundColorHex: string;
}

// ─── Defaults ────────────────────────────────────────────────────────────────

export const DEFAULT_CALENDAR_DAY_OF_WEEK_STYLE: HongCalendarDayStyle = {
  fontSize: 13,
  color: '#666666',
  fontWeight: '400',
  backgroundColorHex: HongColor.TRANSPARENT.hex,
};

export const DEFAULT_CALENDAR_YEAR_MONTH_STYLE: HongCalendarDayStyle = {
  fontSize: 19,
  color: HongColor.BLACK_100.hex,
  fontWeight: '700',
  backgroundColorHex: HongColor.TRANSPARENT.hex,
};

export const DEFAULT_CALENDAR_START_DAY_STYLE: HongCalendarDayStyle = {
  fontSize: 17,
  color: HongColor.WHITE_100.hex,
  fontWeight: '700',
  backgroundColorHex: HongColor.MAIN_ORANGE_100.hex,
};

export const DEFAULT_CALENDAR_END_DAY_STYLE: HongCalendarDayStyle = {
  fontSize: 17,
  color: HongColor.WHITE_100.hex,
  fontWeight: '700',
  backgroundColorHex: HongColor.MAIN_ORANGE_100.hex,
};

export const DEFAULT_CALENDAR_RANGE_DAYS_STYLE: HongCalendarDayStyle = {
  fontSize: 17,
  color: HongColor.MAIN_ORANGE_100.hex,
  fontWeight: '700',
  backgroundColorHex: HongColor.MAIN_ORANGE_15.hex,
};

export const DEFAULT_CALENDAR_HOLIDAY_STYLE: HongCalendarDayStyle = {
  fontSize: 17,
  color: '#FFFF322E',
  fontWeight: '700',
  backgroundColorHex: HongColor.TRANSPARENT.hex,
};

export const DEFAULT_CALENDAR_PAST_DAYS_STYLE: HongCalendarDayStyle = {
  fontSize: 17,
  color: '#FFcccccc',
  fontWeight: '700',
  backgroundColorHex: HongColor.TRANSPARENT.hex,
};

export const DEFAULT_CALENDAR_DEFAULT_DAY_STYLE: HongCalendarDayStyle = {
  fontSize: 17,
  color: HongColor.BLACK_100.hex,
  fontWeight: '700',
  backgroundColorHex: HongColor.TRANSPARENT.hex,
};

export const DEFAULT_CALENDAR_SELECT_TODAY_STYLE: HongCalendarDayStyle = {
  fontSize: 8,
  color: HongColor.WHITE_100.hex,
  fontWeight: '700',
  backgroundColorHex: HongColor.TRANSPARENT.hex,
};

export const DEFAULT_CALENDAR_UNSELECT_TODAY_STYLE: HongCalendarDayStyle = {
  fontSize: 8,
  color: '#FF545457',
  fontWeight: '700',
  backgroundColorHex: HongColor.TRANSPARENT.hex,
};

// ─── Option ───────────────────────────────────────────────────────────────────

export class HongCalendarOption implements HongWidgetCommonOption {
  type: HongWidgetTypeEntry = HongWidgetType.CALENDAR;
  isValidComponent: boolean = true;

  width: number = HongLayoutParam.MATCH_PARENT.value;
  height: number = HongLayoutParam.MATCH_PARENT.value;

  margin: HongSpacingInfo = defaultHongSpacingInfo();
  padding: HongSpacingInfo = { left: 16, top: 0, right: 16, bottom: 0 };
  backgroundColorHex: string = HongColor.WHITE_100.hex;
  radius: HongRadiusInfo = defaultHongRadiusInfo();
  border: HongBorderInfo = defaultHongBorderInfo();
  shadow: HongShadowInfo = defaultHongShadowInfo();
  useShapeCircle: boolean = false;
  click: ((option: HongWidgetCommonOption) => void) | null = null;

  // 요일 헤더
  dayOfWeekLangType: HongCalendarDayOfWeekLangTypeEntry =
    HongCalendarDayOfWeekLangType.KOR;
  dayOfWeekStyle: HongCalendarDayStyle = DEFAULT_CALENDAR_DAY_OF_WEEK_STYLE;
  dayOfWeekBottomLineColorHex: string = '#eeeeee';

  // 연/월 헤더
  yearMonthPattern: string = 'yyyy.MM';
  yearMonthStyle: HongCalendarDayStyle = DEFAULT_CALENDAR_YEAR_MONTH_STYLE;

  // 날짜 스타일
  startDayStyle: HongCalendarDayStyle = DEFAULT_CALENDAR_START_DAY_STYLE;
  endDayStyle: HongCalendarDayStyle = DEFAULT_CALENDAR_END_DAY_STYLE;
  rangeDaysStyle: HongCalendarDayStyle = DEFAULT_CALENDAR_RANGE_DAYS_STYLE;
  holidaysStyle: HongCalendarDayStyle = DEFAULT_CALENDAR_HOLIDAY_STYLE;
  pastDaysStyle: HongCalendarDayStyle = DEFAULT_CALENDAR_PAST_DAYS_STYLE;
  defaultDayStyle: HongCalendarDayStyle = DEFAULT_CALENDAR_DEFAULT_DAY_STYLE;
  todaySelectedStyle: HongCalendarDayStyle =
    DEFAULT_CALENDAR_SELECT_TODAY_STYLE;
  todayUnselectedStyle: HongCalendarDayStyle =
    DEFAULT_CALENDAR_UNSELECT_TODAY_STYLE;

  // 간격
  spacingHorizontal: number = 16;
  bottomSpacingDayOfWeek: number = 20;
  bottomSpacingMonth: number = 40;
  bottomSpacingWeek: number = 20;

  // 공휴일 목록 (yyyyMMdd 문자열)
  holidayList: string[] | null = null;

  // 최대 표시 년도 범위
  maxYears: number = 1;

  // 초기 선택 날짜 (yyyyMMdd 문자열)
  initialStartDate: string | null = null;
  initialEndDate: string | null = null;

  // 날짜 선택 콜백
  onSelected: ((startDate: Date | null, endDate: Date | null) => void) | null =
    null;
}
