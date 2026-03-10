import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { MainScreen } from '../screens/MainScreen';
import { TextSampleScreen } from '../screens/text/TextSampleScreen';
import { TextBadgeSampleScreen } from '../screens/text/TextBadgeSampleScreen';
import { TextUpDownSampleScreen } from '../screens/text/TextUpDownSampleScreen';
import { TextCheckSampleScreen } from '../screens/text/TextCheckSampleScreen';
import { TextCountSampleScreen } from '../screens/text/TextCountSampleScreen';
import { TextUnitSampleScreen } from '../screens/text/TextUnitSampleScreen';
import { ImageSampleScreen } from '../screens/image/ImageSampleScreen';
import { ImageBlurSampleScreen } from '../screens/image/ImageBlurSampleScreen';
import { TextFieldSampleScreen } from '../screens/textfield/TextFieldSampleScreen';
import { TextFieldBorderSampleScreen } from '../screens/textfield/TextFieldBorderSampleScreen';
import { TextFieldNumberSampleScreen } from '../screens/textfield/TextFieldNumberSampleScreen';
import { TextFieldTimerSampleScreen } from '../screens/textfield/TextFieldTimerSampleScreen';
import { TextFieldUnderlineSampleScreen } from '../screens/textfield/TextFieldUnderlineSampleScreen';
import { TextFieldBorderSelectSampleScreen } from '../screens/textfield/TextFieldBorderSelectSampleScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="TextSample" component={TextSampleScreen} />
        <Stack.Screen name="TextBadgeSample" component={TextBadgeSampleScreen} />
        <Stack.Screen name="TextUpDownSample" component={TextUpDownSampleScreen} />
        <Stack.Screen name="TextCheckSample" component={TextCheckSampleScreen} />
        <Stack.Screen name="TextCountSample" component={TextCountSampleScreen} />
        <Stack.Screen name="TextUnitSample" component={TextUnitSampleScreen} />
        <Stack.Screen name="ImageSample" component={ImageSampleScreen} />
        <Stack.Screen name="ImageBlurSample" component={ImageBlurSampleScreen} />
        <Stack.Screen name="TextFieldSample" component={TextFieldSampleScreen} />
        <Stack.Screen name="TextFieldBorderSample" component={TextFieldBorderSampleScreen} />
        <Stack.Screen name="TextFieldNumberSample" component={TextFieldNumberSampleScreen} />
        <Stack.Screen name="TextFieldTimerSample" component={TextFieldTimerSampleScreen} />
        <Stack.Screen name="TextFieldUnderlineSample" component={TextFieldUnderlineSampleScreen} />
        <Stack.Screen name="TextFieldBorderSelectSample" component={TextFieldBorderSelectSampleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
