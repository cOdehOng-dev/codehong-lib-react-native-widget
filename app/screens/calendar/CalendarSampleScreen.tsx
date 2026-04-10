import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'app/navigation/types';
import React, { useMemo, useState } from 'react';
import { Platform, Pressable, StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  HongCalendar,
  HongCalendarBuilder,
  HongCalendarDayOfWeekLangType,
  HongColor,
  HongFont,
  HongImage,
  HongImageBuilder,
  HongImages,
  HongLayoutParam,
  HongScaleType,
  HongText,
  HongTextBuilder,
  HongTypo,
  hongColorHexToRNColor,
  KOREAN_HOLIDAY_LIST_2026,
} from 'widget';
import { RootContainer } from 'app/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'CalendarSample'>;

export function CalendarSampleScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'ios' ? insets.top : 0;
  const [result, setResult] = useState('');

  const calendarOption = useMemo(
    () =>
      new HongCalendarBuilder()
        .width(HongLayoutParam.MATCH_PARENT.value)
        .backgroundColor(HongColor.WHITE_100.hex)
        .dayOfWeekLangType(HongCalendarDayOfWeekLangType.KOR)
        .yearMonthPattern('yyyy.MM')
        .initialStartDate('20260909')
        .initialEndDate('20260930')
        .holidayList(KOREAN_HOLIDAY_LIST_2026)
        .spacingHorizontal(16)
        .bottomSpacingWeek(20)
        .maxYears(1)
        .onSelected((start, end) => {
          if (start && end) {
            const fmt = (d: Date) =>
              `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(
                2,
                '0',
              )}.${String(d.getDate()).padStart(2, '0')}`;
            setResult(`${fmt(start)} ~ ${fmt(end)}`);
          } else if (start) {
            const fmt = (d: Date) =>
              `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(
                2,
                '0',
              )}.${String(d.getDate()).padStart(2, '0')}`;
            setResult(`${fmt(start)} 선택됨`);
          } else {
            setResult('');
          }
        })
        .applyOption(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const textOption = useMemo(
    () =>
      new HongTextBuilder()
        .text(result || '날짜를 선택해주세요')
        .typography(HongTypo.BODY_14_B)
        .color(result ? HongColor.MAIN_ORANGE_100.hex : HongColor.GRAY_50.hex)
        .applyOption(),
    [result],
  );

  return (
    <RootContainer style={styles.root}>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'dark-content' : 'light-content'}
      />
      <View
        style={[styles.header, { paddingTop: topPad, height: 50 + topPad }]}
      >
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <HongImage
            option={new HongImageBuilder()
              .width(28)
              .height(28)
              .imageSource(HongImages.honglib_ic_34_arrow_left)
              .scaleType(HongScaleType.CENTER_CROP)
              .imageColor(HongColor.WHITE_100)
              .applyOption()}
          />
        </Pressable>
        <HongText
          option={new HongTextBuilder()
            .text('HongCalendar 샘플')
            .fontType(HongFont.PRETENDARD_700)
            .size(18)
            .color('#FFFFFF')
            .applyOption()}
        />
        <View style={styles.backButton} />
      </View>

      <View style={styles.resultBox}>
        <HongText option={textOption} />
      </View>

      <View style={styles.calendarContainer}>
        <HongCalendar option={calendarOption} />
      </View>
    </RootContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: hongColorHexToRNColor(HongColor.MAIN_ORANGE_100.hex),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    alignItems: 'center',
  },
  resultBox: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  calendarContainer: {
    flex: 1,
  },
});
