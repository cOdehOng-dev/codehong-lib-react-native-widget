import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'app/navigation/types';
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  HongButtonText,
  HongButtonTextBuilder,
  HongColor,
  HongLayoutParam,
  HongPicker,
  HongPickerBuilder,
  HongText,
  HongTextBuilder,
  HongTypo,
} from 'widget';
import CommonContainer from '../common/CommonContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'PickerSample'>;

export function PickerSampleScreen({ navigation }: Props) {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);

  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const [result3, setResult3] = useState('');

  // ── 샘플 1: onConfirm (확인 버튼) ─────────────────────────────────────────
  const option1 = new HongPickerBuilder()
    .title('과일 선택')
    .firstOptionList(['사과', '바나나', '포도', '딸기', '수박', '망고', '복숭아', '자두'])
    .initialFirstOption(0)
    .buttonText('확인')
    .useDimClickClose(true)
    .onDismiss(() => setVisible1(false))
    .onConfirm((first) => setResult1(`${first[0]}번째: ${first[1]}`))
    .applyOption();

  // ── 샘플 2: onDirectSelect (실시간 선택) ──────────────────────────────────
  const option2 = new HongPickerBuilder()
    .title('연도 / 월')
    .firstOptionList(['2022', '2023', '2024', '2025', '2026'])
    .initialFirstOption(2)
    .secondOptionList(['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'])
    .initialSecondOption(0)
    .useDimClickClose(true)
    .onDismiss(() => setVisible2(false))
    .onDirectSelect((first, second) =>
      setResult2(`${first[1]} ${second[1] ?? ''}`),
    )
    .applyOption();

  // ── 샘플 3: 닫기 버튼만 있는 단순 선택 ────────────────────────────────────
  const option3 = new HongPickerBuilder()
    .title('숫자 선택')
    .firstOptionList(
      Array.from({ length: 20 }, (_, i) => `${i + 1}`),
    )
    .initialFirstOption(4)
    .onDismiss(() => setVisible3(false))
    .onDirectSelect((first) => setResult3(`선택: ${first[1]}`))
    .applyOption();

  const openButton = (label: string, onPress: () => void) =>
    new HongButtonTextBuilder()
      .width(HongLayoutParam.MATCH_PARENT.value)
      .height(48)
      .margin({ left: 0, top: 8, right: 0, bottom: 4 })
      .text(label)
      .textTypo(HongTypo.BODY_15_B)
      .textColor(HongColor.WHITE_100)
      .backgroundColor(HongColor.MAIN_ORANGE_100.hex)
      .radius({ all: 12 })
      .onClick(onPress)
      .applyOption();

  const resultText = (value: string) =>
    new HongTextBuilder()
      .text(value || '아직 선택 없음')
      .typography(HongTypo.BODY_14)
      .color(value ? HongColor.BLACK_100.hex : HongColor.GRAY_50.hex)
      .margin({ top: 4, bottom: 12 })
      .applyOption();

  return (
    <>
      <CommonContainer
        title="HongPicker 샘플"
        onBack={() => navigation.goBack()}
        content={
          <View>
            {/* 샘플 1 */}
            <HongText
              option={new HongTextBuilder()
                .text('① 확인 버튼 (단일 컬럼)')
                .typography(HongTypo.BODY_14_B)
                .color(HongColor.GRAY_100.hex)
                .margin({ bottom: 4 })
                .applyOption()}
            />
            <HongButtonText
              option={openButton('Picker 열기 (확인 버튼)', () =>
                setVisible1(true),
              )}
            />
            <HongText option={resultText(result1)} />

            {/* 샘플 2 */}
            <HongText
              option={new HongTextBuilder()
                .text('② 실시간 선택 (이중 컬럼)')
                .typography(HongTypo.BODY_14_B)
                .color(HongColor.GRAY_100.hex)
                .margin({ top: 8, bottom: 4 })
                .applyOption()}
            />
            <HongButtonText
              option={openButton('Picker 열기 (연도/월)', () =>
                setVisible2(true),
              )}
            />
            <HongText option={resultText(result2)} />

            {/* 샘플 3 */}
            <HongText
              option={new HongTextBuilder()
                .text('③ 닫기 버튼 (단일 컬럼, 실시간)')
                .typography(HongTypo.BODY_14_B)
                .color(HongColor.GRAY_100.hex)
                .margin({ top: 8, bottom: 4 })
                .applyOption()}
            />
            <HongButtonText
              option={openButton('Picker 열기 (숫자)', () =>
                setVisible3(true),
              )}
            />
            <HongText option={resultText(result3)} />
          </View>
        }
      />

      <HongPicker visible={visible1} option={option1} />
      <HongPicker visible={visible2} option={option2} />
      <HongPicker visible={visible3} option={option3} />
    </>
  );
}
