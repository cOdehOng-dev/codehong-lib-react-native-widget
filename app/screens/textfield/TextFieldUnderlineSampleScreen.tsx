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
  HongTextFieldUnderline,
  HongTextFieldUnderlineBuilder,
  HongKeyboardType,
  HongImages,
  HongColor,
  HongTypo,
  HongFont,
  hongColorHexToRNColor,
} from '../../../widget';

type Props = NativeStackScreenProps<RootStackParamList, 'TextFieldUnderlineSample'>;

const LABELS = [
  '기본',
  '클리어 버튼',
  '포커스 색상 커스텀',
  '숫자 키보드',
  '비밀번호 입력',
];

export function TextFieldUnderlineSampleScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'ios' ? insets.top : 0;
  const botPad = Platform.OS === 'ios' ? insets.bottom : 0;

  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [text4, setText4] = useState('');
  const [text5, setText5] = useState('');

  const field1 = new HongTextFieldUnderlineBuilder()
    .width(300)
    .placeholder('입력하세요')
    .input(text1)
    .onTextChanged(setText1)
    .applyOption();

  const field2 = new HongTextFieldUnderlineBuilder()
    .width(300)
    .placeholder('입력하세요')
    .input(text2)
    .clearIcon(HongImages.honglib_ic_20_circle_close_fill)
    .onTextChanged(setText2)
    .applyOption();

  const field3 = new HongTextFieldUnderlineBuilder()
    .width(300)
    .placeholder('입력하세요')
    .input(text3)
    .underlineFocusColor(HongColor.MAIN_ORANGE_100)
    .underlineOutFocusColor(HongColor.GRAY_20)
    .underlineHeight(3)
    .clearIcon(HongImages.honglib_ic_20_circle_close_fill)
    .onTextChanged(setText3)
    .applyOption();

  const field4 = new HongTextFieldUnderlineBuilder()
    .width(300)
    .placeholder('숫자를 입력하세요')
    .input(text4)
    .keyboardType(HongKeyboardType.NUMBER)
    .clearIcon(HongImages.honglib_ic_20_circle_close_fill)
    .onTextChanged(setText4)
    .applyOption();

  const field5 = new HongTextFieldUnderlineBuilder()
    .width(300)
    .placeholder('비밀번호를 입력하세요')
    .input(text5)
    .keyboardType(HongKeyboardType.PASSWORD)
    .onTextChanged(setText5)
    .applyOption();

  const fields = [field1, field2, field3, field4, field5];
  const texts = [text1, text2, text3, text4, text5];

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
            .text('TextFieldUnderline 샘플')
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
              <HongTextFieldUnderline option={option} />
            </View>
            {texts[index] !== '' && (
              <View style={styles.valueRow}>
                <HongText
                  option={new HongTextBuilder()
                    .text(`입력값: ${texts[index]}`)
                    .typography(HongTypo.CONTENTS_12)
                    .colorEntry(HongColor.BLACK_60)
                    .applyOption()}
                />
              </View>
            )}
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
  },
  valueRow: {
    paddingTop: 6,
    paddingLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: hongColorHexToRNColor(HongColor.LINE.hex),
    marginTop: 12,
  },
});
