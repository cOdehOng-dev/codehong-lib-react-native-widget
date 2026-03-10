import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = Platform.OS === 'android' ? SafeAreaView : View;
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import {
  HongText,
  HongTextBuilder,
  HongTextFieldBorderSelect,
  HongTextFieldBorderSelectBuilder,
  HongInputState,
  HongColor,
  HongTypo,
  HongFont,
  hongColorHexToRNColor,
} from '../../../widget';

type Props = NativeStackScreenProps<RootStackParamList, 'TextFieldBorderSelectSample'>;

const LABELS = [
  '기본 (선택 전)',
  '값 선택 후',
  '직접 입력 가능 (useDirectInput)',
  '필수 항목 (isRequired)',
  '헬퍼 텍스트',
  'DISABLE 상태',
];

const FRUITS = ['사과', '바나나', '딸기', '포도', '수박'];

export function TextFieldBorderSelectSampleScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'ios' ? insets.top : 0;
  const botPad = Platform.OS === 'ios' ? insets.bottom : 0;

  const [selected1, setSelected1] = useState('');
  const [selected2, setSelected2] = useState('바나나');
  const [input3, setInput3] = useState('');
  const [selected4, setSelected4] = useState('');
  const [selected5, setSelected5] = useState('');

  const openPicker = (onSelect: (val: string) => void) => {
    Alert.alert('과일 선택', '', [
      ...FRUITS.map(f => ({ text: f, onPress: () => onSelect(f) })),
      { text: '취소', style: 'cancel' },
    ]);
  };

  const field1 = new HongTextFieldBorderSelectBuilder()
    .width(300)
    .label('과일')
    .placeholder('선택하세요')
    .initialInput(selected1)
    .onSelectionClick(() => openPicker(setSelected1))
    .applyOption();

  const field2 = new HongTextFieldBorderSelectBuilder()
    .width(300)
    .label('과일')
    .placeholder('선택하세요')
    .initialInput(selected2)
    .onSelectionClick(() => openPicker(setSelected2))
    .applyOption();

  const field3 = new HongTextFieldBorderSelectBuilder()
    .width(300)
    .label('검색 또는 직접 입력')
    .placeholder('입력하거나 선택하세요')
    .initialInput(input3)
    .useDirectInput(true)
    .onSelectionClick(() => openPicker(v => { setInput3(v); }))
    .onChangeInput(setInput3)
    .applyOption();

  const field4 = new HongTextFieldBorderSelectBuilder()
    .width(300)
    .label('필수 과일')
    .placeholder('선택하세요')
    .isRequired(true)
    .initialInput(selected4)
    .onSelectionClick(() => openPicker(setSelected4))
    .applyOption();

  const field5 = new HongTextFieldBorderSelectBuilder()
    .width(300)
    .label('배송지')
    .placeholder('선택하세요')
    .initialInput(selected5)
    .helperText('등록된 주소지 중에서 선택해주세요.')
    .onSelectionClick(() => openPicker(setSelected5))
    .applyOption();

  const field6 = new HongTextFieldBorderSelectBuilder()
    .width(300)
    .label('비활성화')
    .placeholder('선택 불가')
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
            .text('TextFieldBorderSelect 샘플')
            .fontType(HongFont.PRETENDARD_700)
            .size(16)
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
              <HongTextFieldBorderSelect option={option} />
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
