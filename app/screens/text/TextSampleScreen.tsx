import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import type { RootStackParamList } from '../../navigation/types';
import {
  HongText,
  HongTextBuilder,
  HongColor,
  HongTypo,
  HongFont,
  HongTextLineBreak,
  HongSpacingInfo,
  HongLayoutParam,
  hongColorHexToRNColor,
} from '../../../widget';
import { NativeStackScreenProps } from 'node_modules/@react-navigation/native-stack/lib/typescript/src/types';
import CommonContainer from '../common/CommonContainer';

const Container = Platform.OS === 'android' ? SafeAreaView : View;
type Props = NativeStackScreenProps<RootStackParamList, 'TextSample'>;

// ─── 샘플 옵션 (SampleTextActivity.kt 동일 구성) ──────────────────────────

const margin10: HongSpacingInfo = { left: 10, top: 10, right: 10, bottom: 10 };

const option1 = new HongTextBuilder()
  .text('테스트입니다요')
  .typography(HongTypo.BODY_16_B)
  .lineBreak(HongTextLineBreak.DEFAULT)
  .margin(margin10)
  .applyOption();

const option2 = new HongTextBuilder()
  .width(HongLayoutParam.MATCH_PARENT.value)
  .text(
    '김민재의 부상 투혼은 이어졌다. 목이 아프고, 기침이 심한 상태에서 경기에 출전했다. 허리 통증까지 겪고 있는 것으로 알려졌다. 고 휴식이 필요한 상황인 것으로 알려졌다.',
  )
  .typography(HongTypo.BODY_16_B)
  .isEnableCancelLine(true)
  .lineBreak(HongTextLineBreak.DEFAULT)
  .margin(margin10)
  .applyOption();

const option3 = new HongTextBuilder()
  .text('14342')
  .typography(HongTypo.BODY_16_B)
  .lineBreak(HongTextLineBreak.DEFAULT)
  .colorEntry(HongColor.MAIN_ORANGE_100)
  .margin(margin10)
  .useNumberDecimal(true)
  .applyOption();

const option4 = new HongTextBuilder()
  .text('14342')
  .typography(HongTypo.BODY_16_B)
  .lineBreak(HongTextLineBreak.DEFAULT)
  .margin(margin10)
  .useNumberDecimal(false)
  .applyOption();

const option5 = new HongTextBuilder()
  .text('숫자가 아닌 텍스트 입니다')
  .typography(HongTypo.BODY_16_B)
  .lineBreak(HongTextLineBreak.DEFAULT)
  .margin(margin10)
  .useNumberDecimal(true)
  .applyOption();

// ─── 추가 샘플 ─────────────────────────────────────────────────────────────

const option6 = new HongTextBuilder()
  .text('밑줄 텍스트 샘플')
  .typography(HongTypo.BODY_16)
  .isEnableUnderLine(true)
  .margin(margin10)
  .applyOption();

const option7 = (() => {
  const spanBuilder = new HongTextBuilder()
    .text('투혼')
    .colorEntry(HongColor.MAIN_ORANGE_100)
    .typography(HongTypo.BODY_16_B);

  return new HongTextBuilder()
    .width(HongLayoutParam.MATCH_PARENT.value)
    .text('김민재의 부상 투혼은 이어졌다.')
    .typography(HongTypo.BODY_16)
    .colorEntry(HongColor.BLACK_100)
    .spanTextBuilderList([spanBuilder])
    .margin(margin10)
    .applyOption();
})();

const option8 = new HongTextBuilder()
  .text(
    '최대 2줄까지만 표시되는 긴 텍스트입니다. 이 텍스트는 두 줄을 초과하는 경우 말줄임표(...)로 잘립니다. 계속해서 내용이 이어집니다.',
  )
  .typography(HongTypo.BODY_16)
  .maxLines(2)
  .margin(margin10)
  .applyOption();

const optionList = [
  option1,
  option2,
  option3,
  option4,
  option5,
  option6,
  option7,
  option8,
];

// ─── 라벨 ─────────────────────────────────────────────────────────────────

const sampleLabels = [
  '기본 텍스트',
  '취소선 (긴 텍스트)',
  '숫자 천 단위 포맷 (colorHex)',
  '숫자 포맷 미적용',
  '비숫자 + useNumberDecimal',
  '밑줄',
  'Span (부분 색상/Bold)',
  'maxLines=2',
];

// ─── 컴포넌트 ──────────────────────────────────────────────────────────────

export function TextSampleScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'ios' ? insets.top : 0;
  const botPad = Platform.OS === 'ios' ? insets.bottom : 0;

  return (
    <CommonContainer
      title="Text 샘플"
      onBack={() => navigation.goBack()}
      content={optionList.map((option, index) => (
        <View key={index} style={styles.sampleBlock}>
          {/* 섹션 라벨 */}
          <View style={styles.labelRow}>
            <HongText
              option={new HongTextBuilder()
                .text(sampleLabels[index] ?? `Sample ${index + 1}`)
                .typography(HongTypo.CONTENTS_12_B)
                .colorEntry(HongColor.GRAY_50)
                .applyOption()}
            />
          </View>
          {/* 실제 샘플 */}
          <View style={styles.sampleContainer}>
            <HongText option={option} />
          </View>
          {/* 구분선 */}
          <View style={styles.divider} />
        </View>
      ))}
    />
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
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: hongColorHexToRNColor(HongColor.LINE.hex),
    marginTop: 12,
  },
});
