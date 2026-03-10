import type { NativeStackScreenProps } from '@react-navigation/native-stack';

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
};

export type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;
export type TextSampleScreenProps = NativeStackScreenProps<RootStackParamList, 'TextSample'>;
