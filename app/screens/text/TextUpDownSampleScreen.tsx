import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  HongColor,
  HongFont,
  HongText,
  HongTextBuilder,
  HongTextUpDown,
  HongTextUpDownBuilder,
  HongTypo,
  hongColorHexToRNColor,
} from '../../../widget';
import { RootContainer, type RootStackParamList } from '../../navigation/types';

// ─── 샘플 옵션 ─────────────────────────────────────────────────────────────

const updown1 = new HongTextUpDownBuilder()
  .amount(7)
  .gap(1)
  .spaceButtonAndDisplay(8)
  .applyOption();

const updown2 = new HongTextUpDownBuilder()
  .amount(0)
  .unit('장')
  .gap(1)
  .spaceButtonAndDisplay(8)
  .applyOption();

const updown3 = new HongTextUpDownBuilder()
  .amount(14342)
  .gap(100)
  .useDecimal(true)
  .spaceButtonAndDisplay(8)
  .displayTypo(HongTypo.BODY_16_B)
  .displayColor(HongColor.MAIN_ORANGE_100)
  .applyOption();

const updown4 = new HongTextUpDownBuilder()
  .amount(5)
  .gap(1)
  .buttonSize(36)
  .spaceButtonAndDisplay(12)
  .borderColor(HongColor.MAIN_ORANGE_100)
  .iconColor(HongColor.MAIN_ORANGE_100)
  .displayTypo(HongTypo.BODY_16_B)
  .displayColor(HongColor.MAIN_ORANGE_100)
  .applyOption();

const updownList = [updown1, updown2, updown3, updown4];
const updownLabels = [
  '기본 (amount=7, gap=1)',
  '단위 표시 (unit=장)',
  '천 단위 포맷 + gap=100',
  '커스텀 색상 + 버튼 크기',
];

// ─── 컴포넌트 ──────────────────────────────────────────────────────────────
type Props = NativeStackScreenProps<RootStackParamList, 'TextUpDownSample'>;

export function TextUpDownSampleScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'ios' ? insets.top : 0;
  const botPad = Platform.OS === 'ios' ? insets.bottom : 0;

  return (
    <RootContainer style={styles.root}>
      {/* Header */}
      <View
        style={[styles.header, { paddingTop: topPad, height: 50 + topPad }]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
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
            .text('TextUpDown 샘플')
            .fontType(HongFont.PRETENDARD_700)
            .size(18)
            .color('#FFFFFF')
            .applyOption()}
        />
        <View style={styles.backButton} />
      </View>

      {/* 샘플 목록 */}
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: 40 + botPad }]}
      >
        {updownList.map((option, index) => (
          <View key={index} style={styles.sampleBlock}>
            <View style={styles.labelRow}>
              <HongText
                option={new HongTextBuilder()
                  .text(updownLabels[index] ?? `Sample ${index + 1}`)
                  .typography(HongTypo.CONTENTS_12_B)
                  .colorEntry(HongColor.GRAY_50)
                  .applyOption()}
              />
            </View>
            <View style={styles.sampleContainer}>
              <HongTextUpDown option={option} />
            </View>
            <View style={styles.divider} />
          </View>
        ))}
      </ScrollView>
    </RootContainer>
  );
}

// ─── 스타일 ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 50,
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
    padding: 12,
    alignItems: 'flex-start',
  },
  divider: {
    height: 1,
    backgroundColor: hongColorHexToRNColor(HongColor.LINE.hex),
    marginTop: 12,
  },
});
