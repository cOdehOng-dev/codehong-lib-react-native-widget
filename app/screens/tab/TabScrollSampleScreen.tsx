import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import {
  HongTabScroll,
  HongTabScrollBuilder,
  HongText,
  HongTextBuilder,
  HongColor,
  HongTypo,
  HongFont,
  hongColorHexToRNColor,
} from '../../../widget';

type Props = NativeStackScreenProps<RootStackParamList, 'TabScrollSample'>;

const Container = Platform.OS === 'android' ? SafeAreaView : View;

// ─── 탭 데이터 ─────────────────────────────────────────────────────────────

interface CategoryItem {
  id: number;
  name: string;
}

const CATEGORY_TABS: CategoryItem[] = [
  { id: 1, name: '전체' },
  { id: 2, name: '인기' },
  { id: 3, name: '최신' },
  { id: 4, name: '추천' },
  { id: 5, name: '이벤트' },
  { id: 6, name: '할인' },
  { id: 7, name: '신상품' },
];

const CATEGORY_TEXT = CATEGORY_TABS.map(c => c.name);

const SHORT_TABS = ['홈', '검색', '저장', '프로필'];

// ─── 샘플 1: 기본 (주황 선택, 테두리 미선택) ────────────────────────────────

const tab1 = new HongTabScrollBuilder<CategoryItem>()
  .tabList(CATEGORY_TABS)
  .tabTextList(CATEGORY_TEXT)
  .tabBetweenPadding(8)
  .tabRadius({ all: 20 })
  .applyOption();

// ─── 샘플 2: 아웃라인 스타일 ─────────────────────────────────────────────────

const tab2 = new HongTabScrollBuilder()
  .tabList(SHORT_TABS)
  .tabTextList(SHORT_TABS)
  .selectBackgroundColor(HongColor.BLUE_100)
  .selectTabTextColor(HongColor.WHITE_100)
  .selectBorderWidth(0)
  .unselectBackgroundColor(HongColor.TRANSPARENT)
  .unselectTabTextColor(HongColor.BLUE_100)
  .unselectBorderColor(HongColor.BLUE_100)
  .unselectBorderWidth(1)
  .tabBetweenPadding(8)
  .tabRadius({ all: 8 })
  .applyOption();

// ─── 샘플 3: 텍스트 전용 (배경 없음) ────────────────────────────────────────

const tab3 = new HongTabScrollBuilder()
  .tabList(CATEGORY_TEXT)
  .tabTextList(CATEGORY_TEXT)
  .selectBackgroundColor(HongColor.TRANSPARENT)
  .selectTabTextColor(HongColor.MAIN_ORANGE_100)
  .selectTabTextTypo(HongTypo.BODY_14_B)
  .selectBorderWidth(0)
  .unselectBackgroundColor(HongColor.TRANSPARENT)
  .unselectTabTextColor(HongColor.GRAY_60)
  .unselectBorderWidth(0)
  .tabBetweenPadding(16)
  .tabTextHorizontalPadding(4)
  .applyOption();

// ─── 샘플 4: 콜백 연동 (상태 표시) ──────────────────────────────────────────

const MONTH_TABS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

// ─── 컴포넌트 ──────────────────────────────────────────────────────────────

export function TabScrollSampleScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'ios' ? insets.top : 0;
  const botPad = Platform.OS === 'ios' ? insets.bottom : 0;

  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const tab4 = new HongTabScrollBuilder()
    .tabList(MONTH_TABS)
    .tabTextList(MONTH_TABS)
    .selectBackgroundColor(HongColor.MAIN_ORANGE_100)
    .selectBorderWidth(0)
    .unselectBorderWidth(1)
    .tabBetweenPadding(6)
    .tabRadius({ all: 6 })
    .onTabClick((index, item) => {
      setSelectedCategory(item as string);
    })
    .applyOption();

  const sampleList = [
    {
      label: '기본 (주황 배경 선택, 테두리 미선택)',
      component: <HongTabScroll option={tab1} />,
    },
    {
      label: '아웃라인 스타일 (블루)',
      component: <HongTabScroll option={tab2} />,
    },
    {
      label: '텍스트 전용 (배경 없음)',
      component: <HongTabScroll option={tab3} />,
    },
    {
      label: `콜백 연동 — 선택: ${selectedCategory}`,
      component: <HongTabScroll option={tab4} />,
    },
  ];

  return (
    <Container style={styles.root}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad, height: 50 + topPad }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <HongText
            option={new HongTextBuilder()
              .text('←')
              .fontType(HongFont.PRETENDARD_700)
              .size(20)
              .color('#FFFFFF')
              .applyOption()}
          />
        </TouchableOpacity>
        <HongText
          option={new HongTextBuilder()
            .text('TabScroll 샘플')
            .fontType(HongFont.PRETENDARD_700)
            .size(18)
            .color('#FFFFFF')
            .applyOption()}
        />
        <View style={styles.backButton} />
      </View>

      {/* 샘플 목록 */}
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 40 + botPad }]}>
        {sampleList.map((sample, index) => (
          <View key={index} style={styles.sampleBlock}>
            <View style={styles.labelRow}>
              <HongText
                option={new HongTextBuilder()
                  .text(sample.label)
                  .typography(HongTypo.CONTENTS_12_B)
                  .colorEntry(HongColor.GRAY_50)
                  .applyOption()}
              />
            </View>
            <View style={styles.sampleContainer}>
              {sample.component}
            </View>
            <View style={styles.divider} />
          </View>
        ))}
      </ScrollView>
    </Container>
  );
}

// ─── 스타일 ────────────────────────────────────────────────────────────────

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
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  sampleBlock: {
    marginBottom: 4,
  },
  labelRow: {
    paddingTop: 16,
    paddingBottom: 6,
  },
  sampleContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'stretch',
  },
  divider: {
    height: 1,
    backgroundColor: hongColorHexToRNColor(HongColor.LINE.hex),
    marginTop: 12,
  },
});
