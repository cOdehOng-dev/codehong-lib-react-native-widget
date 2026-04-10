import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo, useCallback } from 'react';
import {
  HongCalendarDayStyle,
  HongCalendarOption,
} from '../hongCalendarOption';
import { CalendarUtils } from '../util/calendarUtils';
import { hongColorHexToRNColor } from '../../rule/color/HongColor';
import { SelectionState } from '../model/selectionState';

const DAY_CELL_HEIGHT = 48;
const CIRCLE_SIZE = 44;

const getDayTextStyle = (
  state: SelectionState,
  isHoliday: boolean,
  option: HongCalendarOption,
): HongCalendarDayStyle => {
  switch (state) {
    case 'past':
      return isHoliday
        ? {
            ...option.holidaysStyle,
            color: CalendarUtils.toPastColorHex(option.holidaysStyle.color),
          }
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
};

type Props = {
  day: Date;
  state: SelectionState;
  showStartHalf: boolean;
  showEndHalf: boolean;
  isToday: boolean;
  isHoliday: boolean;
  option: HongCalendarOption;
  onPress: (day: Date) => void;
};

function DayComponent({
  day,
  state,
  showStartHalf,
  showEndHalf,
  isToday,
  isHoliday,
  option,
  onPress,
}: Props) {
  const handlePress = useCallback(() => onPress(day), [onPress, day]);
  const isPast = state === 'past';

  const rangeColor = hongColorHexToRNColor(
    option.rangeDaysStyle.backgroundColorHex,
  );
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
        <View style={[styles.halfRightBg, { backgroundColor: rangeColor }]} />
      )}
      {showEndHalf && (
        <View style={[styles.halfLeftBg, { backgroundColor: rangeColor }]} />
      )}

      {state === 'inRange' && (
        <View style={[styles.fullBg, { backgroundColor: rangeColor }]} />
      )}

      {(state === 'start' || state === 'end') && (
        <View
          style={[
            styles.circleBg,
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

      <View style={styles.dayTextContent}>
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
}

const Day = memo(DayComponent);

export default Day;

const styles = StyleSheet.create({
  dayCell: {
    height: DAY_CELL_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCellWrapper: {
    flex: 1,
  },
  halfLeftBg: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '50%',
  },
  halfRightBg: {
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
  circleBg: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  dayTextContent: {
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
