import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { hongColorHexToRNColor } from '../rule/color/HongColor';
import type { HongCalendarDayStyle, HongCalendarOption } from './hongCalendarOption';

// ─── Date utilities ───────────────────────────────────────────────────────────

function getToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function parseCalendarDate(str: string): Date {
  const y = parseInt(str.slice(0, 4), 10);
  const m = parseInt(str.slice(4, 6), 10) - 1;
  const d = parseInt(str.slice(6, 8), 10);
  const date = new Date(y, m, d);
  date.setHours(0, 0, 0, 0);
  return date;
}

function dateToYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isDateBefore(a: Date, b: Date): boolean {
  return (
    a.getFullYear() < b.getFullYear() ||
    (a.getFullYear() === b.getFullYear() &&
      (a.getMonth() < b.getMonth() ||
        (a.getMonth() === b.getMonth() && a.getDate() < b.getDate())))
  );
}


function formatYearMonth(date: Date, pattern: string): string {
  const y = date.getFullYear().toString();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return pattern.replace('yyyy', y).replace('MM', m);
}

function generateMonthDays(month: Date): (Date | null)[] {
  const y = month.getFullYear();
  const mo = month.getMonth();
  const daysInMonth = new Date(y, mo + 1, 0).getDate();
  const firstDow = new Date(y, mo, 1).getDay();
  const days: (Date | null)[] = Array(firstDow).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(y, mo, d);
    date.setHours(0, 0, 0, 0);
    days.push(date);
  }
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

function toPastColorHex(colorHex: string): string {
  const hex = colorHex.replace('#', '');
  if (hex.length === 8) return `#75${hex.slice(2)}`;
  if (hex.length === 6) return `#75${hex}`;
  return '#75FF322E';
}

type SelectionState = 'past' | 'start' | 'end' | 'inRange' | 'default';

function getDayTextStyle(
  state: SelectionState,
  isHoliday: boolean,
  option: HongCalendarOption,
): HongCalendarDayStyle {
  switch (state) {
    case 'past':
      return isHoliday
        ? { ...option.holidaysStyle, color: toPastColorHex(option.holidaysStyle.color) }
        : option.pastDaysStyle;
    case 'start':
      return option.startDayStyle;
    case 'end':
      return option.endDayStyle;
    case 'inRange':
      return option.rangeDaysStyle;
    case 'default':
      return isHoliday ? option.holidaysStyle : option.defaultDayStyle;
  }
}

// ─── HongCalendar ─────────────────────────────────────────────────────────────

type Props = { option: HongCalendarOption };

export function HongCalendar({ option }: Props): React.ReactElement {
  const todayDate = useMemo(() => getToday(), []);

  const months = useMemo(() => {
    const result: Date[] = [];
    for (let i = 0; i <= option.maxYears * 12; i++) {
      result.push(
        new Date(todayDate.getFullYear(), todayDate.getMonth() + i, 1),
      );
    }
    return result;
  }, [todayDate, option.maxYears]);

  const [startDate, setStartDate] = useState<Date | null>(
    option.initialStartDate ? parseCalendarDate(option.initialStartDate) : null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    option.initialEndDate ? parseCalendarDate(option.initialEndDate) : null,
  );

  // ref로 최신값 유지 → handleDatePress 참조를 안정적으로 만들어 MonthBlock memo 유지
  const startDateRef = useRef(startDate);
  const endDateRef = useRef(endDate);
  const onSelectedRef = useRef(option.onSelected);
  startDateRef.current = startDate;
  endDateRef.current = endDate;
  onSelectedRef.current = option.onSelected;

  const handleDatePress = useCallback((day: Date) => {
    const curStart = startDateRef.current;
    const curEnd = endDateRef.current;
    let newStart: Date | null;
    let newEnd: Date | null;

    if (curStart === null || curEnd !== null) {
      newStart = day;
      newEnd = null;
    } else if (isDateBefore(day, curStart)) {
      newStart = day;
      newEnd = null;
    } else {
      newStart = curStart;
      newEnd = day;
    }

    setStartDate(newStart);
    setEndDate(newEnd);
    onSelectedRef.current?.(newStart, newEnd);
  }, []); // 의존성 없음 → 참조 불변

  const startYMD = useMemo(() => (startDate ? dateToYMD(startDate) : null), [startDate]);
  const endYMD = useMemo(() => (endDate ? dateToYMD(endDate) : null), [endDate]);

  const renderMonth = useCallback(
    ({ item, index }: { item: Date; index: number }) => (
      <MonthBlock
        month={item}
        todayDate={todayDate}
        isFirstMonth={index === 0}
        startYMD={startYMD}
        endYMD={endYMD}
        option={option}
        onDatePress={handleDatePress}
      />
    ),
    [todayDate, startYMD, endYMD, option, handleDatePress],
  );

  const keyExtractor = useCallback(
    (item: Date) => `${item.getFullYear()}-${item.getMonth()}`,
    [],
  );

  return (
    <FlatList
      style={[
        styles.root,
        { backgroundColor: hongColorHexToRNColor(option.backgroundColorHex) },
      ]}
      data={months}
      keyExtractor={keyExtractor}
      renderItem={renderMonth}
      ListHeaderComponent={<DayOfWeekHeader option={option} />}
      showsVerticalScrollIndicator={false}
      windowSize={3}
      initialNumToRender={2}
      maxToRenderPerBatch={2}
      removeClippedSubviews
    />
  );
}

// ─── DayOfWeekHeader ──────────────────────────────────────────────────────────

function DayOfWeekHeader({ option }: { option: HongCalendarOption }) {
  const s = option.dayOfWeekStyle;
  return (
    <>
      <View style={styles.dowRow}>
        {option.dayOfWeekLangType.dayOfWeekList.map((day, i) => (
          <View key={i} style={styles.dowCell}>
            <Text
              style={[
                styles.dowText,
                {
                  fontSize: s.fontSize,
                  fontWeight: s.fontWeight,
                  color: hongColorHexToRNColor(s.color),
                },
              ]}
            >
              {day}
            </Text>
          </View>
        ))}
      </View>
      <View
        style={[
          styles.dowDivider,
          {
            backgroundColor: hongColorHexToRNColor(
              option.dayOfWeekBottomLineColorHex,
            ),
          },
        ]}
      />
    </>
  );
}

// ─── MonthBlock ───────────────────────────────────────────────────────────────

type MonthBlockProps = {
  month: Date;
  todayDate: Date;
  isFirstMonth: boolean;
  startYMD: string | null;
  endYMD: string | null;
  option: HongCalendarOption;
  onDatePress: (day: Date) => void;
};

const MonthBlock = memo(function MonthBlock({
  month,
  todayDate,
  isFirstMonth,
  startYMD,
  endYMD,
  option,
  onDatePress,
}: MonthBlockProps) {
  const weeks = useMemo(() => chunkArray(generateMonthDays(month), 7), [month]);
  const header = formatYearMonth(month, option.yearMonthPattern);
  const ym = option.yearMonthStyle;
  const containerStyle = useMemo(
    () => ({
      marginTop: isFirstMonth ? option.bottomSpacingDayOfWeek : 0,
      marginBottom: option.bottomSpacingMonth,
      paddingHorizontal: option.spacingHorizontal,
    }),
    [isFirstMonth, option.bottomSpacingDayOfWeek, option.bottomSpacingMonth, option.spacingHorizontal],
  );

  return (
    <View style={[styles.monthBlock, containerStyle]}>
      <Text
        style={[
          styles.yearMonthText,
          {
            fontSize: ym.fontSize,
            fontWeight: ym.fontWeight,
            color: hongColorHexToRNColor(ym.color),
          },
        ]}
      >
        {header}
      </Text>
      {weeks.map((week, wi) => (
        <WeekRow
          key={wi}
          week={week}
          todayDate={todayDate}
          startYMD={startYMD}
          endYMD={endYMD}
          option={option}
          onDatePress={onDatePress}
        />
      ))}
    </View>
  );
});

// ─── WeekRow ──────────────────────────────────────────────────────────────────

type WeekRowProps = {
  week: (Date | null)[];
  todayDate: Date;
  startYMD: string | null;
  endYMD: string | null;
  option: HongCalendarOption;
  onDatePress: (day: Date) => void;
};

const WeekRow = memo(function WeekRow({
  week,
  todayDate,
  startYMD,
  endYMD,
  option,
  onDatePress,
}: WeekRowProps) {
  const hasRange = startYMD !== null && endYMD !== null && startYMD !== endYMD;

  return (
    <View style={[styles.weekRow, { marginBottom: option.bottomSpacingWeek }]}>
      {week.map((day, i) => {
        if (!day) {
          return <View key={i} style={styles.dayCellWrapper} />;
        }
        const ymd = dateToYMD(day);
        const isPast = isDateBefore(day, todayDate);
        const isStart = startYMD === ymd;
        const isEnd = endYMD === ymd;
        const inRange =
          !isPast &&
          !isStart &&
          !isEnd &&
          startYMD !== null &&
          endYMD !== null &&
          ymd > startYMD &&
          ymd < endYMD;
        const isHoliday =
          day.getDay() === 0 || (option.holidayList?.includes(ymd) ?? false);
        const isToday = isSameDay(day, todayDate);

        const state: SelectionState = isPast
          ? 'past'
          : isStart
          ? 'start'
          : isEnd
          ? 'end'
          : inRange
          ? 'inRange'
          : 'default';

        return (
          <View key={i} style={styles.dayCellWrapper}>
            <DayCell
              day={day}
              state={state}
              showStartHalf={isStart && hasRange}
              showEndHalf={isEnd && hasRange}
              isToday={isToday}
              isHoliday={isHoliday}
              option={option}
              onPress={onDatePress}
            />
          </View>
        );
      })}
    </View>
  );
});

// ─── DayCell ──────────────────────────────────────────────────────────────────

const DAY_CELL_HEIGHT = 48;
const CIRCLE_SIZE = 44;

type DayCellProps = {
  day: Date;
  state: SelectionState;
  showStartHalf: boolean;
  showEndHalf: boolean;
  isToday: boolean;
  isHoliday: boolean;
  option: HongCalendarOption;
  onPress: (day: Date) => void;
};

const DayCell = memo(function DayCell({
  day,
  state,
  showStartHalf,
  showEndHalf,
  isToday,
  isHoliday,
  option,
  onPress,
}: DayCellProps) {
  const handlePress = useCallback(() => onPress(day), [onPress, day]);
  const isPast = state === 'past';

  const rangeColor = hongColorHexToRNColor(option.rangeDaysStyle.backgroundColorHex);
  const dayStyle = getDayTextStyle(state, isHoliday, option);
  const todayLabelStyle =
    state === 'start' || state === 'end'
      ? option.todaySelectedStyle
      : option.todayUnselectedStyle;

  return (
    <TouchableOpacity
      style={styles.dayCell}
      onPress={isPast ? undefined : handlePress}
      disabled={isPast}
      activeOpacity={isPast ? 1 : 0.7}
    >
      {showStartHalf && (
        <View style={[styles.halfRight, { backgroundColor: rangeColor }]} />
      )}
      {showEndHalf && (
        <View style={[styles.halfLeft, { backgroundColor: rangeColor }]} />
      )}

      {state === 'inRange' && (
        <View style={[styles.fullBg, { backgroundColor: rangeColor }]} />
      )}

      {(state === 'start' || state === 'end') && (
        <View
          style={[
            styles.circle,
            {
              backgroundColor: hongColorHexToRNColor(
                state === 'start'
                  ? option.startDayStyle.backgroundColorHex
                  : option.endDayStyle.backgroundColorHex,
              ),
            },
          ]}
        />
      )}

      <View style={styles.dayCellContent}>
        <Text
          style={[
            styles.dayText,
            {
              fontSize: dayStyle.fontSize,
              fontWeight: dayStyle.fontWeight,
              color: hongColorHexToRNColor(dayStyle.color),
              lineHeight: dayStyle.fontSize * 1.3,
            },
          ]}
        >
          {day.getDate()}
        </Text>
        {isToday && (
          <Text
            style={[
              styles.todayText,
              {
                fontSize: todayLabelStyle.fontSize,
                color: hongColorHexToRNColor(todayLabelStyle.color),
                lineHeight: todayLabelStyle.fontSize * 1.4,
              },
            ]}
          >
            Today
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
});

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  dowRow: {
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
  },
  dowCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dowText: {
    textAlign: 'center',
  },
  dowDivider: {
    height: 1,
  },
  monthBlock: {},
  yearMonthText: {
    marginBottom: 8,
    paddingHorizontal: 11,
  },
  weekRow: {
    flexDirection: 'row',
  },
  dayCellWrapper: {
    flex: 1,
  },
  dayCell: {
    height: DAY_CELL_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halfLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '50%',
  },
  halfRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '50%',
  },
  fullBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  circle: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  dayCellContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  dayText: {
    textAlign: 'center',
  },
  todayText: {
    textAlign: 'center',
    fontWeight: '700',
  },
});
