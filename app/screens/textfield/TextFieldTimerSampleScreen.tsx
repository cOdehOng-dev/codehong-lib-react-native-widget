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
  HongTextFieldTimer,
  HongTextFieldTimerBuilder,
  HongColor,
  HongTypo,
  HongFont,
  hongColorHexToRNColor,
} from '../../../widget';

type Props = NativeStackScreenProps<RootStackParamList, 'TextFieldTimerSample'>;

const LABELS = [
  '기본 (3분 타이머)',
  '클리어 버튼 + 30초 타이머',
  '타이머 완료 색상 변경',
  '숫자 키패드',
];

export function TextFieldTimerSampleScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'ios' ? insets.top : 0;
  const botPad = Platform.OS === 'ios' ? insets.bottom : 0;

  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [text4, setText4] = useState('');
  const [finished3, setFinished3] = useState(false);

  const field1 = new HongTextFieldTimerBuilder()
    .width(300)
    .placeholder('인증번호를 입력하세요')
    .input(text1)
    .min(3)
    .sec(0)
    .useClearButton(false)
    .onTextChanged(setText1)
    .applyOption();

  const field2 = new HongTextFieldTimerBuilder()
    .width(300)
    .placeholder('인증번호를 입력하세요')
    .input(text2)
    .min(0)
    .sec(30)
    .useClearButton(true)
    .onTextChanged(setText2)
    .applyOption();

  const field3 = new HongTextFieldTimerBuilder()
    .width(300)
    .placeholder('인증번호를 입력하세요')
    .input(text3)
    .min(0)
    .sec(10)
    .useClearButton(true)
    .underlineFinishColor(HongColor.RED_100.hex)
    .onTextChanged(setText3)
    .onFinish(() => setFinished3(true))
    .applyOption();

  const field4 = new HongTextFieldTimerBuilder()
    .width(300)
    .placeholder('숫자만 입력')
    .input(text4)
    .min(0)
    .sec(60)
    .useNumberKeypad(true)
    .useClearButton(true)
    .underlineHeight(0)
    .onTextChanged(setText4)
    .applyOption();

  const fields = [field1, field2, field3, field4];

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
            .color(HongColor.WHITE_100.hex)
              .applyOption()}
          />
        </TouchableOpacity>
        <HongText
          option={new HongTextBuilder()
            .text('TextFieldTimer 샘플')
            .fontType(HongFont.PRETENDARD_700)
            .size(18)
            .color(HongColor.WHITE_100.hex)
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
              <HongTextFieldTimer option={option} />
            </View>
            {index === 2 && finished3 && (
              <View style={styles.valueRow}>
                <HongText
                  option={new HongTextBuilder()
                    .text('타이머 완료!')
                    .typography(HongTypo.CONTENTS_12_B)
                    .colorEntry(HongColor.RED_100)
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
