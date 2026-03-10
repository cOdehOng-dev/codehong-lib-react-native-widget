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
  HongTextCheck,
  HongTextCheckBuilder,
  HongColor,
  HongTypo,
  HongFont,
  hongColorHexToRNColor,
} from '../../../widget';

type Props = NativeStackScreenProps<RootStackParamList, 'TextCheckSample'>;

// ─── 샘플 옵션 ─────────────────────────────────────────────────────────────

const check1 = new HongTextCheckBuilder()
  .text('휴대폰/카드 본인확인 서비스')
  .checkSize(30)
  .arrowSize(20)
  .applyOption();

const check2 = new HongTextCheckBuilder()
  .text('초기 체크 상태')
  .checkState(true)
  .checkSize(30)
  .arrowSize(20)
  .applyOption();

const check3 = new HongTextCheckBuilder()
  .text('커스텀 색상 체크')
  .checkColor(HongColor.MAIN_ORANGE_100)
  .uncheckColor(HongColor.GRAY_30)
  .textOption(
    new HongTextBuilder()
      .typography(HongTypo.BODY_15)
      .color(HongColor.BLACK_100.hex)
      .applyOption()
  )
  .checkSize(28)
  .arrowSize(20)
  .applyOption();

const check4 = new HongTextCheckBuilder()
  .text('큰 사이즈 체크')
  .checkSize(40)
  .arrowSize(28)
  .textOption(
    new HongTextBuilder()
      .typography(HongTypo.BODY_16_B)
      .color(HongColor.GRAY_70.hex)
      .applyOption()
  )
  .applyOption();

const checkList = [check1, check2, check3, check4];
const checkLabels = [
  '기본 체크 (미체크)',
  '초기 체크 상태',
  '커스텀 색상 + 텍스트 옵션',
  '큰 사이즈',
];

// ─── 컴포넌트 ──────────────────────────────────────────────────────────────

export function TextCheckSampleScreen({ navigation }: Props) {
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
            .text('TextCheck 샘플')
            .fontType(HongFont.PRETENDARD_700)
            .size(18)
            .color('#FFFFFF')
            .applyOption()}
        />
        <View style={styles.backButton} />
      </View>

      {/* 샘플 목록 */}
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 40 + botPad }]}>
        {checkList.map((option, index) => (
          <View key={index} style={styles.sampleBlock}>
            <View style={styles.labelRow}>
              <HongText
                option={new HongTextBuilder()
                  .text(checkLabels[index] ?? `Sample ${index + 1}`)
                  .typography(HongTypo.CONTENTS_12_B)
                  .colorEntry(HongColor.GRAY_50)
                  .applyOption()}
              />
            </View>
            <View style={styles.sampleContainer}>
              <HongTextCheck option={option} />
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
  },
  divider: {
    height: 1,
    backgroundColor: hongColorHexToRNColor(HongColor.LINE.hex),
    marginTop: 12,
  },
});
