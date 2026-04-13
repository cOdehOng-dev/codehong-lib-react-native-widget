import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HongColor, hongColorHexToRNColor } from 'widget';

export type RootStackParamList = {
  Main: undefined;
  TextSample: undefined;
  TextBadgeSample: undefined;
  TextUpDownSample: undefined;
  TextCheckSample: undefined;
  TextCountSample: undefined;
  TextUnitSample: undefined;
  ImageSample: undefined;
  ImageBlurSample: undefined;
  TextFieldSample: undefined;
  TextFieldBorderSample: undefined;
  TextFieldNumberSample: undefined;
  TextFieldTimerSample: undefined;
  TextFieldUnderlineSample: undefined;
  TextFieldBorderSelectSample: undefined;
  ButtonTextSample: undefined;
  TabScrollSample: undefined;
  PickerSample: undefined;
  CalendarSample: undefined;
  BottomSheetModalSample: undefined;
};

export type MainScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Main'
>;

export const RootContainer = Platform.OS === 'android' ? SafeAreaView : View;

export const commonStyles = StyleSheet.create({
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
    backgroundColor: 'white',
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  divider: {
    height: 1,
    backgroundColor: hongColorHexToRNColor(HongColor.LINE.hex),
    marginTop: 12,
  },
});
