import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import type { HongTextFieldUnderlineOption } from './HongTextFieldUnderlineOption';
import { hongColorHexToRNColor } from '../../rule/color/HongColor';
import { isMatchParent } from '../../rule/HongLayoutParam';
import { hongTypoSize, hongTypoFontType } from '../../rule/typo/HongTypo';
import {
  hongKeyboardTypeToRN,
  isPasswordType,
} from '../../rule/keyboard/HongKeyboardType';
import { hongKeyboardActionTypeToRN } from '../../rule/keyboard/HongKeyboardActionType';

interface HongTextFieldUnderlineProps {
  option: HongTextFieldUnderlineOption;
}

export function HongTextFieldUnderline({
  option,
}: HongTextFieldUnderlineProps): React.ReactElement | null {
  const [inputText, setInputText] = useState<string>(option.input ?? '');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    setInputText(option.input ?? '');
  }, [option.input]);

  if (!option.isValidComponent) return null;

  const handleChangeText = (text: string) => {
    setInputText(text);
    option.onTextChanged(text);
  };

  const handleClear = () => {
    setInputText('');
    option.onTextChanged('');
  };

  const underlineColor = isFocused
    ? hongColorHexToRNColor(option.underlineFocusColorHex)
    : hongColorHexToRNColor(option.underlineOutFocusColorHex);

  const outerStyle: ViewStyle = {
    marginTop: option.margin.top,
    marginBottom: option.margin.bottom,
    marginLeft: option.margin.left,
    marginRight: option.margin.right,
    backgroundColor: hongColorHexToRNColor(option.backgroundColorHex),
    paddingTop: option.padding.top,
    paddingBottom: option.padding.bottom,
    paddingLeft: option.padding.left,
    paddingRight: option.padding.right,
    ...(isMatchParent(option.width) ? { alignSelf: 'stretch' } : {}),
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
  };

  const showClear = option.clearIcon != null && inputText.length > 0;

  return (
    <View style={outerStyle}>
      <View style={styles.row}>
        <TextInput
          style={inputStyle}
          value={inputText}
          onChangeText={handleChangeText}
          onSubmitEditing={() => {
            if (option.useHideKeyboard) Keyboard.dismiss();
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={option.placeholder ?? undefined}
          placeholderTextColor={hongColorHexToRNColor(
            option.placeholderColorHex,
          )}
          keyboardType={hongKeyboardTypeToRN(option.keyboardType)}
          returnKeyType={hongKeyboardActionTypeToRN(option.keyboardActionType)}
          secureTextEntry={isPasswordType(option.keyboardType)}
          cursorColor={hongColorHexToRNColor(option.cursorColorHex)}
          selectionColor={hongColorHexToRNColor(option.cursorColorHex)}
          multiline={false}
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
              style={{
                width: option.clearIconSize,
                height: option.clearIconSize,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* 언더라인 */}
      <View
        style={[
          styles.underline,
          { height: option.underlineHeight, backgroundColor: underlineColor },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  underline: {
    width: '100%',
  },
});
