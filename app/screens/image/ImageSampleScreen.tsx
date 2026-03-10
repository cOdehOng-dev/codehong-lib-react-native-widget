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
  HongImage,
  HongImageBuilder,
  HongScaleType,
  HongColor,
  HongTypo,
  HongFont,
  hongColorHexToRNColor,
} from '../../../widget';

type Props = NativeStackScreenProps<RootStackParamList, 'ImageSample'>;

const SAMPLE_URL = 'https://picsum.photos/400/300';
const SAMPLE_URL_2 = 'https://picsum.photos/300/300';

// ─── 샘플 옵션 ─────────────────────────────────────────────────────────────

const image1 = new HongImageBuilder()
  .width(200)
  .height(150)
  .imageSource(SAMPLE_URL)
  .scaleType(HongScaleType.CENTER_CROP)
  .applyOption();

const image2 = new HongImageBuilder()
  .width(100)
  .height(100)
  .imageSource(SAMPLE_URL_2)
  .scaleType(HongScaleType.CENTER_CROP)
  .useShapeCircle(true)
  .applyOption();

const image3 = new HongImageBuilder()
  .width(200)
  .height(150)
  .imageSource(SAMPLE_URL)
  .scaleType(HongScaleType.CENTER_CROP)
  .imageRadius({ all: 16 })
  .imageBorder({ width: 2, color: HongColor.MAIN_ORANGE_100.hex })
  .applyOption();

const image4 = new HongImageBuilder()
  .width(200)
  .height(150)
  .imageSource(SAMPLE_URL)
  .scaleType(HongScaleType.FIT_CENTER)
  .backgroundColor(HongColor.GRAY_10.hex)
  .applyOption();

const imageList = [image1, image2, image3, image4];
const imageLabels = [
  '기본 (CENTER_CROP)',
  '원형 이미지 (useShapeCircle)',
  '둥근 모서리 + 테두리 (radius=16, border)',
  'FIT_CENTER + 배경색',
];

// ─── 컴포넌트 ──────────────────────────────────────────────────────────────

export function ImageSampleScreen({ navigation }: Props) {
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
            .text('Image 샘플')
            .fontType(HongFont.PRETENDARD_700)
            .size(18)
            .color('#FFFFFF')
            .applyOption()}
        />
        <View style={styles.backButton} />
      </View>

      {/* 샘플 목록 */}
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 40 + botPad }]}>
        {imageList.map((option, index) => (
          <View key={index} style={styles.sampleBlock}>
            <View style={styles.labelRow}>
              <HongText
                option={new HongTextBuilder()
                  .text(imageLabels[index] ?? `Sample ${index + 1}`)
                  .typography(HongTypo.CONTENTS_12_B)
                  .colorEntry(HongColor.GRAY_50)
                  .applyOption()}
              />
            </View>
            <View style={styles.sampleContainer}>
              <HongImage option={option} />
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
