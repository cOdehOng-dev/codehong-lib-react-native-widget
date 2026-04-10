import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { HongCalendarOption } from '../hongCalendarOption';
import { hongColorHexToRNColor } from '../../rule/color/HongColor';

type Props = {
  option: HongCalendarOption;
};

const DayOfWeekHeader = ({ option }: Props) => {
  const style = option.dayOfWeekStyle;
  return (
    <>
      <View
        style={[styles.dowRow, { paddingHorizontal: option.spacingHorizontal }]}
      >
        {option.dayOfWeekLangType.dayOfWeekList.map((day, i) => (
          <View key={i} style={styles.dowCell}>
            <Text
              style={[
                styles.dowText,
                {
                  fontSize: style.fontSize,
                  fontWeight: style.fontWeight,
                  color: hongColorHexToRNColor(style.color),
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
};

export default DayOfWeekHeader;

const styles = StyleSheet.create({
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
});
