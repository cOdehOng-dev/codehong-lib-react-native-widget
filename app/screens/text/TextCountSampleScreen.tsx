import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = Platform.OS === 'android' ? SafeAreaView : View;
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import {
  HongText,
  HongTextBuilder,
  HongTextCount,
  HongTextCountBuilder,
  HongCountType,
  HongColor,
  HongTypo,
  HongFont,
  hongColorHexToRNColor,
} from '../../../widget';

type Props = NativeStackScreenProps<RootStackParamList, 'TextCountSample'>;

// ─── 샘플 옵션 ─────────────────────────────────────────────────────────────

const count1 = new HongTextCountBuilder()
  .countType(HongCountType.LONG)
  .startCount(1)
  .minCount(0)
  .maxCount(10)
  .amount(1)
  .applyOption();

const count2 = new HongTextCountBuilder()
  .countType(HongCountType.LONG)
  .startCount(3)
  .unitText('개')
  .minCount(0)
  .maxCount(99)
  .amount(1)
  .applyOption();

const count3 = new HongTextCountBuilder()
  .countType(HongCountType.DOUBLE)
  .startCount(0.0)
  .unitText('kg')
  .minCount(0.0)
  .maxCount(100.0)
  .amount(0.5)
  .countTypo(HongTypo.TITLE_28_B)
  .countColor(HongColor.MAIN_ORANGE_100)
  .applyOption();

const count4 = new HongTextCountBuilder()
  .countType(HongCountType.DOUBLE)
  .startCount(0.0)
  .unitText('km')
  .minCount(0.0)
  .maxCount(999.9)
  .amount(0.1)
  .countTypo(HongTypo.TITLE_28_B)
  .countColor(HongColor.MAIN_ORANGE_100)
  .buttonSize(48)
  .applyOption();

const countList = [count1, count2, count3, count4];
const countLabels = [
  '기본 (LONG, 0~10, amount=1)',
  '단위 표시 (unit=개, 0~99)',
  'Double 타입 (unit=kg, amount=0.5)',
  '커스텀 버튼 크기 + 색상 (unit=km, amount=0.1)',
];

// ─── 컴포넌트 ──────────────────────────────────────────────────────────────

export function TextCountSampleScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'ios' ? insets.top : 0;
  const botPad = Platform.OS === 'ios' ? insets.bottom : 0;

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
            .text('TextCount 샘플')
            .fontType(HongFont.PRETENDARD_700)
            .size(18)
            .color('#FFFFFF')
            .applyOption()}
        />
        <View style={styles.backButton} />
      </View>

      {/* 샘플 목록 */}
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 40 + botPad }]}>
        {countList.map((option, index) => (
          <View key={index} style={styles.sampleBlock}>
            <View style={styles.labelRow}>
              <HongText
                option={new HongTextBuilder()
                  .text(countLabels[index] ?? `Sample ${index + 1}`)
                  .typography(HongTypo.CONTENTS_12_B)
                  .colorEntry(HongColor.GRAY_50)
                  .applyOption()}
              />
            </View>
            <View style={styles.sampleContainer}>
              <HongTextCount option={option} />
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
