import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'app/navigation/types';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  HongBottomSheetModal,
  HongBottomSheetModalBuilder,
  HongButtonText,
  HongButtonTextBuilder,
  HongColor,
  HongLayoutParam,
  HongText,
  HongTextBuilder,
  HongTypo,
} from 'widget';
import CommonContainer from '../common/CommonContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'BottomSheetModalSample'>;

export function BottomSheetModalSampleScreen({ navigation }: Props) {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);

  const dismiss = () => setVisibleIndex(null);

  const sheetContents: { label: string; topRadius: number; description: string }[] = [
    { label: '기본 (radius 20)', topRadius: 20, description: '기본 radius 20 바텀시트입니다.' },
    { label: '각진 (radius 0)', topRadius: 0, description: 'radius 0 바텀시트입니다.' },
    { label: '둥근 (radius 40)', topRadius: 40, description: 'radius 40 바텀시트입니다.' },
  ];

  return (
    <>
      <CommonContainer
        title="HongBottomSheetModal 샘플"
        onBack={() => navigation.goBack()}
        content={sheetContents.map((item, index) => (
          <View key={index} style={styles.block}>
            <TouchableOpacity
              style={styles.triggerButton}
              activeOpacity={0.7}
              onPress={() => setVisibleIndex(index)}
            >
              <HongText
                option={new HongTextBuilder()
                  .text(item.label)
                  .typography(HongTypo.BODY_14_B)
                  .colorEntry(HongColor.MAIN_ORANGE_100)
                  .applyOption()}
              />
            </TouchableOpacity>
            <View style={styles.divider} />
          </View>
        ))}
      />

      {sheetContents.map((item, index) => (
        <HongBottomSheetModal
          key={index}
          option={new HongBottomSheetModalBuilder()
            .isVisible(visibleIndex === index)
            .topRadius(item.topRadius)
            .onDismiss(dismiss)
            .children(
              <View style={styles.sheetContent}>
                <HongText
                  option={new HongTextBuilder()
                    .text('바텀시트')
                    .typography(HongTypo.BODY_16_B)
                    .colorEntry(HongColor.BLACK_100)
                    .applyOption()}
                />
                <View style={styles.sheetDesc}>
                  <HongText
                    option={new HongTextBuilder()
                      .text(item.description)
                      .typography(HongTypo.BODY_14_R)
                      .colorEntry(HongColor.GRAY_50)
                      .applyOption()}
                  />
                </View>
                <HongButtonText
                  option={new HongButtonTextBuilder()
                    .width(HongLayoutParam.MATCH_PARENT.value)
                    .height(48)
                    .text('닫기')
                    .textTypo(HongTypo.BODY_15_B)
                    .textColor(HongColor.WHITE_100)
                    .backgroundColor(HongColor.MAIN_ORANGE_100.hex)
                    .radius({ all: 12 })
                    .onClick(dismiss)
                    .applyOption()}
                />
              </View>,
            )
            .applyOption()}
        />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    marginBottom: 4,
  },
  triggerButton: {
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  sheetContent: {
    padding: 24,
  },
  sheetDesc: {
    marginTop: 8,
    marginBottom: 24,
  },
});
