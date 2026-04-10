import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { CalendarUtils } from '../util/calendarUtils';
import { HongCalendarOption } from '../hongCalendarOption';
import { SelectionState } from '../model/selectionState';
import Day from './Day';

type Props = {
  week: (Date | null)[];
  todayDate: Date;
  startYYYYmmDD: string | null;
  endYYYYmmDD: string | null;
  option: HongCalendarOption;
  onDatePress: (day: Date) => void;
};

function WeekComponent({
  week,
  todayDate,
  startYYYYmmDD,
  endYYYYmmDD,
  option,
  onDatePress,
}: Props) {
  const hasRange =
    startYYYYmmDD !== null &&
    endYYYYmmDD !== null &&
    startYYYYmmDD !== endYYYYmmDD;

  return (
    <View style={[styles.weekRow, { marginBottom: option.bottomSpacingWeek }]}>
      {week.map((day, i) => {
        if (!day) {
          return <View key={i} style={styles.dayWrapper} />;
        }
        const yyyyMMdd = CalendarUtils.dateToYMD(day);
        const isPast = CalendarUtils.isPast(day, todayDate);
        const isStart = startYYYYmmDD === yyyyMMdd;
        const isEnd = endYYYYmmDD === yyyyMMdd;
        const inRange =
          !isPast &&
          !isStart &&
          !isEnd &&
          startYYYYmmDD !== null &&
          endYYYYmmDD !== null &&
          yyyyMMdd > startYYYYmmDD &&
          yyyyMMdd < endYYYYmmDD;
        const isHoliday =
          day.getDay() === 0 ||
          (option.holidayList?.includes(yyyyMMdd) ?? false);
        const isToday = CalendarUtils.isSameDay(day, todayDate);

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
          <View key={i} style={styles.dayWrapper}>
            <Day
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
}

const Week = memo(WeekComponent);
export default Week;

const styles = StyleSheet.create({
  weekRow: {
    flexDirection: 'row',
  },
  dayWrapper: {
    flex: 1,
  },
});
