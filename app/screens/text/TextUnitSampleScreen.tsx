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
  HongTextUnit,
  HongTextUnitBuilder,
  HongColor,
  HongTypo,
  HongFont,
  hongColorHexToRNColor,
} from '../../../widget';

type Props = NativeStackScreenProps<RootStackParamList, 'TextUnitSample'>;

// ─── 샘플 옵션 ─────────────────────────────────────────────────────────────

const unit1 = new HongTextUnitBuilder()
  .text('1000')
  .unitText('장')
  .useUnit(true)
  .useNumberDecimal(true)
  .applyOption();

const unit2 = new HongTextUnitBuilder()
  .text('500')
  .unitText('개')
  .useUnit(true)
  .useNumberDecimal(false)
  .applyOption();

const unit3 = new HongTextUnitBuilder()
  .text('2500')
  .textOption(
    new HongTextBuilder()
      .typography(HongTypo.TITLE_24_B)
      .color(HongColor.MAIN_ORANGE_100.hex)
      .applyOption()
  )
  .unitText('원')
  .useUnit(true)
  .useNumberDecimal(true)
  .applyOption();

const unit4 = new HongTextUnitBuilder()
  .text('9999')
  .unitText('장')
  .useUnit(false)
  .useNumberDecimal(true)
  .applyOption();

const unitList = [unit1, unit2, unit3, unit4];
const unitLabels = [
  '기본 (천 단위 콤마, unit=장)',
  '단위 표시 (콤마 없음, unit=개)',
  '커스텀 스타일 (TITLE_24_B, 오렌지색, unit=원)',
  '단위 숨기기 (useUnit=false)',
];

// ─── 컴포넌트 ──────────────────────────────────────────────────────────────

export function TextUnitSampleScreen({ navigation }: Props) {
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
            .text('TextUnit 샘플')
            .fontType(HongFont.PRETENDARD_700)
            .size(18)
            .color('#FFFFFF')
            .applyOption()}
        />
        <View style={styles.backButton} />
      </View>

      {/* 샘플 목록 */}
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 40 + botPad }]}>
        {unitList.map((option, index) => (
          <View key={index} style={styles.sampleBlock}>
            <View style={styles.labelRow}>
              <HongText
                option={new HongTextBuilder()
                  .text(unitLabels[index] ?? `Sample ${index + 1}`)
                  .typography(HongTypo.CONTENTS_12_B)
                  .colorEntry(HongColor.GRAY_50)
                  .applyOption()}
              />
            </View>
            <View style={styles.sampleContainer}>
              <HongTextUnit option={option} />
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
