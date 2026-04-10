import { StyleSheet, Text, View } from 'react-native';
import React, { memo, useMemo } from 'react';
import { HongCalendarOption } from '../hongCalendarOption';
import { hongColorHexToRNColor } from '../../rule';
import Week from './Week';
import { Utils } from '../../rule/utils';
import { CalendarUtils } from '../util/calendarUtils';

type Props = {
  month: Date;
  todayDate: Date;
  isFirstMonth: boolean;
  startYMD: string | null;
  endYMD: string | null;
  option: HongCalendarOption;
  onDatePress: (day: Date) => void;
};

function MonthBlockComponent({
  month,
  todayDate,
  isFirstMonth,
  startYMD,
  endYMD,
  option,
  onDatePress,
}: Props) {
  const weeks = useMemo(
    () => Utils.chunkArray(CalendarUtils.generateMonthDays(month), 7),
    [month],
  );
  const header = CalendarUtils.formatYearMonth(month, option.yearMonthPattern);
  const ym = option.yearMonthStyle;
  const containerStyle = useMemo(
    () => ({
      marginTop: isFirstMonth ? option.bottomSpacingDayOfWeek : 0,
      marginBottom: option.bottomSpacingMonth,
      paddingHorizontal: option.spacingHorizontal,
    }),
    [
      isFirstMonth,
      option.bottomSpacingDayOfWeek,
      option.bottomSpacingMonth,
      option.spacingHorizontal,
    ],
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
        <Week
          key={wi}
          week={week}
          todayDate={todayDate}
          startYYYYmmDD={startYMD}
          endYYYYmmDD={endYMD}
          option={option}
          onDatePress={onDatePress}
        />
      ))}
    </View>
  );
}

const MonthBlock = memo(MonthBlockComponent);
export default MonthBlock;

const styles = StyleSheet.create({
  monthBlock: {},
  yearMonthText: {
    marginBottom: 8,
    paddingHorizontal: 11,
  },
});
