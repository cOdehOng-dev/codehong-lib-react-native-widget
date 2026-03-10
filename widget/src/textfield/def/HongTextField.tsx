import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import type { HongTextFieldOption } from './HongTextFieldOption';
import { hongColorHexToRNColor } from '../../rule/color/HongColor';
import { hongRadiusToStyle } from '../../rule/radius/HongRadiusInfo';
import { layoutParamToStyle, isMatchParent } from '../../rule/HongLayoutParam';
import { hongTypoSize, hongTypoFontType } from '../../rule/typo/HongTypo';
import { hongKeyboardTypeToRN, isPasswordType } from '../../rule/keyboard/HongKeyboardType';
import { hongKeyboardActionTypeToRN } from '../../rule/keyboard/HongKeyboardActionType';

interface HongTextFieldProps {
  option: HongTextFieldOption;
}

/**
 * HongTextFieldCompose의 React Native 대응 컴포넌트
 * 텍스트 입력, 지우기 버튼, 디바운스 콜백, 키보드 타입 지원
 */
export function HongTextField({ option }: HongTextFieldProps): React.ReactElement | null {
  if (!option.isValidComponent) return null;

  const [inputText, setInputText] = useState(option.input ?? '');
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // option.input 외부 변경 반영
  useEffect(() => {
    setInputText(option.input ?? '');
  }, [option.input]);

  const handleChangeText = (text: string) => {
    setInputText(text);

    if (option.delayInputCallback > 0) {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        option.onTextChanged(text);
      }, option.delayInputCallback);
    } else {
      option.onTextChanged(text);
    }
  };

  const handleClear = () => {
    setInputText('');
    option.onTextChanged('');
  };

  const handleSubmitEditing = () => {
    if (option.useHideKeyboard) {
      Keyboard.dismiss();
    }
  };

  // 스타일 계산
  const radiusStyle = hongRadiusToStyle(option.radius, option.useShapeCircle);
  const width = layoutParamToStyle(option.width);
  const height = layoutParamToStyle(option.height);

  const outerStyle: ViewStyle = {
    marginTop: option.margin.top,
    marginBottom: option.margin.bottom,
    marginLeft: option.margin.left,
    marginRight: option.margin.right,
    ...(isMatchParent(option.width) ? { alignSelf: 'stretch' } : {}),
  };

  const containerStyle: ViewStyle = {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: hongColorHexToRNColor(option.backgroundColorHex),
    ...radiusStyle,
    ...(option.border.width > 0
      ? {
          borderWidth: option.border.width,
          borderColor: hongColorHexToRNColor(option.border.color),
        }
      : {}),
    paddingTop: option.padding.top,
    paddingBottom: option.padding.bottom,
    paddingLeft: option.padding.left,
    paddingRight: option.padding.right,
  };

  const inputFontSize = hongTypoSize(option.inputTypo);
  const inputFontFamily = hongTypoFontType(option.inputTypo).fileName;

  const inputStyle: TextStyle = {
    flex: 1,
    fontSize: inputFontSize,
    fontFamily: inputFontFamily,
    color: hongColorHexToRNColor(option.inputColorHex),
    padding: 0,
    margin: 0,
    textAlignVertical: 'center',
  };

  const placeholderFontSize = hongTypoSize(option.placeholderTypo);

  const showClear = option.clearIcon != null && inputText.length > 0;

  return (
    <View style={outerStyle}>
      <View style={containerStyle}>
        <TextInput
          style={inputStyle}
          value={inputText}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitEditing}
          placeholder={option.placeholder ?? undefined}
          placeholderTextColor={hongColorHexToRNColor(option.placeholderColorHex)}
          keyboardType={hongKeyboardTypeToRN(option.keyboardType)}
          returnKeyType={hongKeyboardActionTypeToRN(option.keyboardActionType)}
          secureTextEntry={isPasswordType(option.keyboardType)}
          multiline={!option.singleLine}
          numberOfLines={option.singleLine ? 1 : option.minLines}
          maxLength={undefined}
          cursorColor={hongColorHexToRNColor(option.cursorColorHex)}
          selectionColor={hongColorHexToRNColor(option.cursorColorHex)}
          autoCapitalize={option.autoCapitalize}
        />

        {showClear && (
          <TouchableOpacity
            onPress={handleClear}
            activeOpacity={0.7}
            style={{
              marginLeft: option.clearIconMargin.left,
              marginRight: option.clearIconMargin.right,
              marginTop: option.clearIconMargin.top,
              marginBottom: option.clearIconMargin.bottom,
            }}
          >
            <Image
              source={option.clearIcon!}
              style={{ width: option.clearIconSize, height: option.clearIconSize }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
