import React from 'react';
import {
  Platform,
  SectionList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  HongColor,
  HongFont,
  HongText,
  HongTextBuilder,
  HongTypo,
  hongColorHexToRNColor,
} from '../../widget';
import type { MainScreenProps } from '../navigation/types';

const Container = Platform.OS === 'android' ? SafeAreaView : View;

// ─── 데이터 ────────────────────────────────────────────────────────────────

interface WidgetItem {
  title: string;
  /** 현재 샘플이 구현된 항목인지 여부 */
  isImplemented: boolean;
  screen?: keyof import('../navigation/types').RootStackParamList;
}

interface WidgetCategory {
  title: string;
  data: WidgetItem[];
}

const WIDGET_CATEGORIES: WidgetCategory[] = [
  {
    title: 'Text',
    data: [
      { title: 'Text', isImplemented: true, screen: 'TextSample' },
      { title: 'TextCheck', isImplemented: true, screen: 'TextCheckSample' },
      { title: 'TextUpDown', isImplemented: true, screen: 'TextUpDownSample' },
      { title: 'TextUnit', isImplemented: true, screen: 'TextUnitSample' },
      { title: 'TextBadge', isImplemented: true, screen: 'TextBadgeSample' },
      { title: 'TextCount', isImplemented: true, screen: 'TextCountSample' },
    ],
  },
  {
    title: 'TextField',
    data: [
      { title: 'TextField', isImplemented: true, screen: 'TextFieldSample' },
      {
        title: 'TextFieldUnderline',
        isImplemented: true,
        screen: 'TextFieldUnderlineSample',
      },
      {
        title: 'TextFieldTimer',
        isImplemented: true,
        screen: 'TextFieldTimerSample',
      },
      {
        title: 'TextFieldNumber',
        isImplemented: true,
        screen: 'TextFieldNumberSample',
      },
      {
        title: 'TextFieldBorder',
        isImplemented: true,
        screen: 'TextFieldBorderSample',
      },
      {
        title: 'TextFieldBorderSelect',
        isImplemented: true,
        screen: 'TextFieldBorderSelectSample',
      },
    ],
  },
  {
    title: 'Button',
    data: [
      { title: 'ButtonText', isImplemented: true, screen: 'ButtonTextSample' },
      { title: 'ButtonSelect', isImplemented: false },
      { title: 'ButtonIcon', isImplemented: false },
    ],
  },
  {
    title: 'Tab',
    data: [
      { title: 'TabScroll', isImplemented: true, screen: 'TabScrollSample' },
      { title: 'TabSegment', isImplemented: false },
      { title: 'TabFlow', isImplemented: false },
    ],
  },
  {
    title: 'Label',
    data: [
      { title: 'Label', isImplemented: false },
      { title: 'LabelInput', isImplemented: false },
      { title: 'LabelSelectInput', isImplemented: false },
      { title: 'LabelSwitch', isImplemented: false },
      { title: 'LabelCheckbox', isImplemented: false },
    ],
  },
  {
    title: 'Graph',
    data: [
      { title: 'GraphLine', isImplemented: false },
      { title: 'GraphBar', isImplemented: false },
    ],
  },
  {
    title: 'Bottom Sheet',
    data: [
      { title: 'BottomSheetSelect', isImplemented: false },
      { title: 'BottomSheetSwipe', isImplemented: false },
      { title: 'BottomSheetBank', isImplemented: false },
    ],
  },
  {
    title: 'Image',
    data: [
      { title: 'Image', isImplemented: true, screen: 'ImageSample' },
      { title: 'ImageBlur', isImplemented: true, screen: 'ImageBlurSample' },
    ],
  },
  {
    title: 'Video',
    data: [
      { title: 'VideoPopup', isImplemented: false },
      { title: 'VideoPlayer', isImplemented: false },
    ],
  },
  {
    title: 'Input',
    data: [
      { title: 'Checkbox', isImplemented: false },
      { title: 'Switch', isImplemented: false },
    ],
  },
  {
    title: 'Header',
    data: [
      { title: 'HeaderClose', isImplemented: false },
      { title: 'HeaderIcon', isImplemented: false },
    ],
  },
  {
    title: 'Etc',
    data: [
      { title: 'Icon', isImplemented: false },
      { title: 'Calendar', isImplemented: false },
      { title: 'HorizontalViewPager', isImplemented: false },
      { title: 'Picker', isImplemented: false },
      { title: 'CaptureShare', isImplemented: false },
      { title: 'DynamicIsland', isImplemented: false },
      { title: 'GridDragAndDrop', isImplemented: false },
      { title: 'ScrollFadeAnimLayout', isImplemented: false },
      { title: 'LiquidGlassHeader', isImplemented: false },
      { title: 'LiquidGlassTabBar', isImplemented: false },
      { title: 'Progress', isImplemented: false },
      { title: 'SwipeContainer', isImplemented: false },
    ],
  },
];

// ─── 컴포넌트 ──────────────────────────────────────────────────────────────

export function MainScreen({ navigation }: MainScreenProps) {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'ios' ? insets.top : 0;
  const botPad = Platform.OS === 'ios' ? insets.bottom : 0;

  const titleOption = new HongTextBuilder()
    .text('라이브러리')
    .fontType(HongFont.PRETENDARD_700)
    .size(22)
    .color('#FFFFFF')
    .applyOption();

  return (
    <Container style={styles.root}>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'dark-content' : 'light-content'}
      />
      {/* Top Bar */}
      <View
        style={[styles.topBar, { paddingTop: topPad, height: 50 + topPad }]}
      >
        <HongText option={titleOption} />
      </View>

      {/* 카테고리 + 아이템 목록 */}
      <SectionList
        sections={WIDGET_CATEGORIES}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderSectionHeader={({ section }) => (
          <CategoryHeader title={section.title} />
        )}
        renderItem={({ item }) => (
          <SampleListItem
            item={item}
            onPress={() => {
              if (item.isImplemented && item.screen) {
                navigation.navigate(item.screen as any);
              }
            }}
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: 40 + botPad },
        ]}
        stickySectionHeadersEnabled={false}
      />
    </Container>
  );
}

// ─── 서브 컴포넌트 ─────────────────────────────────────────────────────────

function CategoryHeader({ title }: { title: string }) {
  const option = new HongTextBuilder()
    .text(title)
    .typography(HongTypo.BODY_16_B)
    .colorEntry(HongColor.MAIN_ORANGE_100)
    .applyOption();

  return (
    <View style={styles.categoryHeader}>
      <HongText option={option} />
    </View>
  );
}

function SampleListItem({
  item,
  onPress,
}: {
  item: WidgetItem;
  onPress: () => void;
}) {
  const titleOption = new HongTextBuilder()
    .text(item.title)
    .typography(HongTypo.BODY_14_B)
    .colorEntry(HongColor.BLACK_100)
    .applyOption();

  return (
    <View style={styles.listItem}>
      {/* 아이템 타이틀 */}
      <View style={styles.itemTitleBox}>
        <HongText option={titleOption} />
      </View>

      {/* 샘플 버튼 */}
      <TouchableOpacity
        style={[
          styles.sampleButton,
          !item.isImplemented && styles.sampleButtonDisabled,
        ]}
        onPress={onPress}
        activeOpacity={item.isImplemented ? 0.7 : 1}
        disabled={!item.isImplemented}
      >
        <HongText
          option={new HongTextBuilder()
            .text('샘플')
            .typography(HongTypo.BODY_14_B)
            .colorEntry(
              item.isImplemented
                ? HongColor.MAIN_ORANGE_100
                : HongColor.GRAY_40,
            )
            .applyOption()}
        />
      </TouchableOpacity>
    </View>
  );
}

// ─── 스타일 ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    height: 50,
    backgroundColor: hongColorHexToRNColor(HongColor.MAIN_ORANGE_100.hex),
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  categoryHeader: {
    paddingTop: 24,
    paddingBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  itemTitleBox: {
    flex: 1,
  },
  sampleButton: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: hongColorHexToRNColor(HongColor.MAIN_ORANGE_100.hex),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sampleButtonDisabled: {
    borderColor: hongColorHexToRNColor(HongColor.GRAY_40.hex),
  },
});
