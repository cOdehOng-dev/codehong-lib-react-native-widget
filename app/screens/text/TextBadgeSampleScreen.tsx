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
  HongTextBadge,
  HongTextBadgeBuilder,
  HongColor,
  HongTypo,
  HongFont,
  hongColorHexToRNColor,
} from '../../../widget';

type Props = NativeStackScreenProps<RootStackParamList, 'TextBadgeSample'>;

// ─── 샘플 옵션 ─────────────────────────────────────────────────────────────

const badge1 = new HongTextBadgeBuilder()
  .text('기본 뱃지')
  .textColor(HongColor.WHITE_100)
  .textTypo(HongTypo.CONTENTS_12_B)
  .backgroundColor(HongColor.MAIN_ORANGE_100.hex)
  .padding({ left: 12, top: 4, right: 12, bottom: 4 })
  .radius({ topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 })
  .applyOption();

const badge2 = new HongTextBadgeBuilder()
  .text('테두리 뱃지')
  .textColor(HongColor.MAIN_ORANGE_100)
  .textTypo(HongTypo.CONTENTS_12_B)
  .backgroundColor(HongColor.WHITE_100.hex)
  .border({ width: 1, color: HongColor.MAIN_ORANGE_100.hex })
  .padding({ left: 12, top: 4, right: 12, bottom: 4 })
  .radius({ topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 })
  .applyOption();

const badge3 = new HongTextBadgeBuilder()
  .text('둥근 뱃지')
  .textColor(HongColor.WHITE_100)
  .textTypo(HongTypo.CONTENTS_12_B)
  .backgroundColor(HongColor.MAIN_ORANGE_100.hex)
  .padding({ left: 14, top: 6, right: 14, bottom: 6 })
  .radius({ topLeft: 20, topRight: 20, bottomLeft: 20, bottomRight: 20 })
  .applyOption();

const badge4 = new HongTextBadgeBuilder()
  .text('회색 뱃지')
  .textColor(HongColor.GRAY_60)
  .textTypo(HongTypo.CONTENTS_12_B)
  .backgroundColor(HongColor.GRAY_10.hex)
  .padding({ left: 12, top: 4, right: 12, bottom: 4 })
  .radius({ topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 })
  .applyOption();

const badge5 = new HongTextBadgeBuilder()
  .text('클릭 가능한 뱃지')
  .textColor(HongColor.WHITE_100)
  .textTypo(HongTypo.BODY_14_B)
  .backgroundColor(HongColor.MAIN_ORANGE_100.hex)
  .padding({ left: 16, top: 8, right: 16, bottom: 8 })
  .radius({ topLeft: 8, topRight: 8, bottomLeft: 8, bottomRight: 8 })
  .onClick(() => {})
  .applyOption();

const badgeList = [badge1, badge2, badge3, badge4, badge5];
const badgeLabels = [
  '기본 뱃지 (배경색)',
  '테두리 뱃지 (border)',
  '둥근 뱃지 (pill)',
  '회색 뱃지',
  '클릭 가능한 뱃지 (onClick)',
];

// ─── 컴포넌트 ──────────────────────────────────────────────────────────────

export function TextBadgeSampleScreen({ navigation }: Props) {
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
            .text('TextBadge 샘플')
            .fontType(HongFont.PRETENDARD_700)
            .size(18)
            .color('#FFFFFF')
            .applyOption()}
        />
        <View style={styles.backButton} />
      </View>

      {/* 샘플 목록 */}
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 40 + botPad }]}>
        {badgeList.map((option, index) => (
          <View key={index} style={styles.sampleBlock}>
            <View style={styles.labelRow}>
              <HongText
                option={new HongTextBuilder()
                  .text(badgeLabels[index] ?? `Sample ${index + 1}`)
                  .typography(HongTypo.CONTENTS_12_B)
                  .colorEntry(HongColor.GRAY_50)
                  .applyOption()}
              />
            </View>
            <View style={styles.sampleContainer}>
              <HongTextBadge option={option} />
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
