import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  HongColor,
  hongColorHexToRNColor,
  HongImage,
  HongImageBuilder,
  HongImages,
  HongScaleType,
} from 'widget';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HongFont, HongText, HongTextBuilder } from 'widget';
import { RootContainer } from 'app/navigation/types';

type Props = {
  title: string;
  onBack: () => void;
  content: React.ReactNode;
};

function CommonContainer({ title, onBack, content }: Props) {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'ios' ? insets.top : 0;
  const botPad = Platform.OS === 'ios' ? insets.bottom : 0;

  return (
    <RootContainer style={styles.root}>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'dark-content' : 'light-content'}
      />
      {/* Header */}
      <View
        style={[styles.header, { paddingTop: topPad, height: 50 + topPad }]}
      >
        <Pressable style={styles.backButton} onPress={onBack}>
          <HongImage
            option={new HongImageBuilder()
              .width(28)
              .height(28)
              .imageSource(HongImages.honglib_ic_34_arrow_left)
              .scaleType(HongScaleType.CENTER_CROP)
              .imageColor(HongColor.WHITE_100)
              .applyOption()}
          />
        </Pressable>
        <HongText
          option={new HongTextBuilder()
            .text(title)
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
      >
        {content}
      </ScrollView>
    </RootContainer>
  );
}

export default CommonContainer;

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
  valueRow: {
    paddingTop: 6,
    paddingLeft: 4,
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
