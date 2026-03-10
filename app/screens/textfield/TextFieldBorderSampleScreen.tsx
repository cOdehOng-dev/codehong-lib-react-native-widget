import React, { useState } from 'react';
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
  HongTextFieldBorder,
  HongTextFieldBorderBuilder,
  HongInputState,
  HongColor,
  HongTypo,
  HongFont,
  hongColorHexToRNColor,
} from '../../../widget';

type Props = NativeStackScreenProps<RootStackParamList, 'TextFieldBorderSample'>;

const LABELS = [
  '기본 (라벨 + 입력)',
  '필수 항목 (isRequired)',
  '클리어 버튼',
  'Suffix 텍스트',
  '헬퍼 텍스트',
  'DISABLE 상태',
];

export function TextFieldBorderSampleScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'ios' ? insets.top : 0;
  const botPad = Platform.OS === 'ios' ? insets.bottom : 0;

  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('홍길동');
  const [text4, setText4] = useState('');
  const [text5, setText5] = useState('');

  const field1 = new HongTextFieldBorderBuilder()
    .width(300)
    .label('이름')
    .placeholder('이름을 입력하세요')
    .initialInput(text1)
    .onChangeInput(setText1)
    .applyOption();

  const field2 = new HongTextFieldBorderBuilder()
    .width(300)
    .label('이메일')
    .isRequired(true)
    .placeholder('이메일을 입력하세요')
    .initialInput(text2)
    .onChangeInput(setText2)
    .applyOption();

  const field3 = new HongTextFieldBorderBuilder()
    .width(300)
    .label('닉네임')
    .placeholder('닉네임을 입력하세요')
    .useClearButton(true)
    .initialInput(text3)
    .onChangeInput(setText3)
    .applyOption();

  const field4 = new HongTextFieldBorderBuilder()
    .width(300)
    .label('금액')
    .placeholder('금액을 입력하세요')
    .suffix('원')
    .useNumberKeypad(true)
    .initialInput(text4)
    .onChangeInput(setText4)
    .applyOption();

  const field5 = new HongTextFieldBorderBuilder()
    .width(300)
    .label('비밀번호')
    .placeholder('비밀번호를 입력하세요')
    .helperText('영문, 숫자 조합 8자 이상으로 입력해주세요.')
    .initialInput(text5)
    .onChangeInput(setText5)
    .applyOption();

  const field6 = new HongTextFieldBorderBuilder()
    .width(300)
    .label('비활성화')
    .placeholder('입력 불가')
    .state(HongInputState.DISABLE)
    .applyOption();

  const fields = [field1, field2, field3, field4, field5, field6];

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
            .text('TextFieldBorder 샘플')
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
        keyboardShouldPersistTaps="handled"
      >
        {fields.map((option, index) => (
          <View key={index} style={styles.sampleBlock}>
            <View style={styles.labelRow}>
              <HongText
                option={new HongTextBuilder()
                  .text(LABELS[index] ?? `Sample ${index + 1}`)
                  .typography(HongTypo.CONTENTS_12_B)
                  .colorEntry(HongColor.GRAY_50)
                  .applyOption()}
              />
            </View>
            <View style={styles.sampleContainer}>
              <HongTextFieldBorder option={option} />
            </View>
            <View style={styles.divider} />
          </View>
        ))}
      </ScrollView>
    </Container>
  );
}

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
