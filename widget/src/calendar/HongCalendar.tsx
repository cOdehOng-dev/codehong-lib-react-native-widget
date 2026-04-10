import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { hongColorHexToRNColor } from '../rule/color/HongColor';
import { Utils } from '../rule/utils';
import DayOfWeekHeader from './component/DayOfWeekHeader';
import MonthBlock from './component/MonthBlock';
import type { HongCalendarOption } from './hongCalendarOption';
import { CalendarUtils } from './util/calendarUtils';

type Props = { option: HongCalendarOption };

export function HongCalendar({ option }: Props): React.ReactElement {
  const todayDate = useMemo(() => Utils.getToday(), []);

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
    option.initialStartDate
      ? CalendarUtils.parseCalendarDate(option.initialStartDate)
      : null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    option.initialEndDate
      ? CalendarUtils.parseCalendarDate(option.initialEndDate)
      : null,
  );

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
    } else if (CalendarUtils.isDateBefore(day, curStart)) {
      newStart = day;
      newEnd = null;
    } else {
      newStart = curStart;
      newEnd = day;
    }

    setStartDate(newStart);
    setEndDate(newEnd);
    onSelectedRef.current?.(newStart, newEnd);
  }, []);

  const startYMD = useMemo(
    () => (startDate ? CalendarUtils.dateToYMD(startDate) : null),
    [startDate],
  );
  const endYMD = useMemo(
    () => (endDate ? CalendarUtils.dateToYMD(endDate) : null),
    [endDate],
  );

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
    <View
      style={[
        styles.root,
        { backgroundColor: hongColorHexToRNColor(option.backgroundColorHex) },
      ]}
    >
      <DayOfWeekHeader option={option} />
      <FlatList
        data={months}
        keyExtractor={keyExtractor}
        renderItem={renderMonth}
        showsVerticalScrollIndicator={false}
        windowSize={3}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        removeClippedSubviews
      />
    </View>
  );
}

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
});
