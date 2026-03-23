import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  commonStyles,
  RootContainer,
  RootStackParamList,
} from 'app/navigation/types';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  HongButtonText,
  HongButtonTextBuilder,
  HongColor,
  HongLayoutParam,
  HongText,
  HongTextBuilder,
  HongTypo,
  HongState,
} from 'widget';
import CommonContainer from '../common/CommonContainer';

// ─── 샘플 옵션 ─────────────────────────────────────────────────────────────
const option1 = new HongButtonTextBuilder()
  .width(HongLayoutParam.MATCH_PARENT.value)
  .height(48)
  .margin({ left: 10, top: 10, right: 10, bottom: 10 })
  .text('검색하기')
  .textTypo(HongTypo.BODY_15_B)
  .textColor(HongColor.WHITE_100)
  .backgroundColor(HongColor.MAIN_ORANGE_100.hex)
  .radius({ all: 12 })
  .applyOption();

const option2 = new HongButtonTextBuilder()
  .width(HongLayoutParam.MATCH_PARENT.value)
  .height(48)
  .margin({
    left: 20,
    right: 20,
    bottom: 10,
  })
  .text('이동하기')
  .textTypo(HongTypo.BODY_15_B)
  .textColor(HongColor.WHITE_100.hex)
  .backgroundColor(HongColor.MAIN_ORANGE_100.hex)
  .radius({
    all: 12,
  })
  .shadow({
    color: HongColor.BLACK_25.hex,
    blur: 24,
    offsetY: 0,
    offsetX: 2,
    spread: 0,
  })
  .applyOption();
const option3 = new HongButtonTextBuilder()
  .width(HongLayoutParam.MATCH_PARENT.value)
  .height(48)
  .margin({
    left: 20,
    right: 20,
    bottom: 10,
  })
  .radius({
    topLeft: 10,
    topRight: 10,
    bottomLeft: 10,
    bottomRight: 10,
  })
  .border({
    width: 1,
    color: HongColor.MAIN_ORANGE_100.hex,
  })
  .text('취소')
  .textTypo(HongTypo.BODY_15_B)
  .textColor(HongColor.MAIN_ORANGE_100.hex)
  .backgroundColor(HongColor.WHITE_100.hex)
  .applyOption();
const option4 = new HongButtonTextBuilder()
  .width(HongLayoutParam.MATCH_PARENT.value)
  .height(48)
  .state(HongState.DISABLED)
  .margin({
    left: 20,
    right: 20,
    bottom: 10,
  })
  .text('이동하기')
  .textTypo(HongTypo.BODY_15_B)
  .textColor(HongColor.WHITE_100.hex)
  .backgroundColor(HongColor.MAIN_ORANGE_100.hex)
  .radius({
    all: 12,
  })
  .shadow({
    color: HongColor.BLACK_25.hex,
    blur: 24,
    offsetY: 0,
    offsetX: 2,
    spread: 0,
  })
  .applyOption();

const optionList = [option1, option2, option3, option4];

// ─── 컴포넌트 ──────────────────────────────────────────────────────────────

type Props = NativeStackScreenProps<RootStackParamList, 'ButtonTextSample'>;

export function ButtonTextSampleScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'ios' ? insets.top : 0;
  const botPad = Platform.OS === 'ios' ? insets.bottom : 0;
  return (
    <CommonContainer
      title="HongButtonText 샘플"
      onBack={() => navigation.goBack()}
      content={optionList.map((option, index) => (
        <View key={index} style={commonStyles.sampleBlock}>
          {/* 섹션 라벨 */}
          {/* <View style={commonStyles.labelRow}>
            <HongText
              option={new HongTextBuilder()
                .text(sampleLabels[index] ?? `Sample ${index + 1}`)
                .typography(HongTypo.CONTENTS_12_B)
                .colorEntry(HongColor.GRAY_50)
                .applyOption()}
            />
          </View> */}
          {/* 실제 샘플 */}
          <View style={commonStyles.sampleContainer}>
            <HongButtonText option={option} />
          </View>
          {/* 구분선 */}
          <View style={commonStyles.divider} />
        </View>
      ))}
    />
  );
}
