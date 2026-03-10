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
import type { HongTextFieldNumberOption } from './HongTextFieldNumberOption';
import { hongColorHexToRNColor } from '../../rule/color/HongColor';
import { hongRadiusToStyle } from '../../rule/radius/HongRadiusInfo';
import { layoutParamToStyle, isMatchParent } from '../../rule/HongLayoutParam';
import { hongTypoSize, hongTypoFontType } from '../../rule/typo/HongTypo';
import { hongKeyboardActionTypeToRN } from '../../rule/keyboard/HongKeyboardActionType';

interface HongTextFieldNumberProps {
  option: HongTextFieldNumberOption;
}

function formatWithCommas(raw: string): string {
  const digits = raw.replace(/,/g, '').replace(/\D/g, '');
  if (!digits) return '';
  const num = parseInt(digits, 10);
  if (isNaN(num)) return '';
  return num.toLocaleString('ko-KR');
}

function toInitialFormatted(input: string | null, useDecimal: boolean): string {
  if (!input) return '';
  if (!useDecimal) return input;
  return formatWithCommas(input);
}

export function HongTextFieldNumber({ option }: HongTextFieldNumberProps): React.ReactElement | null {
  if (!option.isValidComponent) return null;

  const [displayText, setDisplayText] = useState(
    toInitialFormatted(option.input, option.useDecimal)
  );

  useEffect(() => {
    setDisplayText(toInitialFormatted(option.input, option.useDecimal));
  }, [option.input, option.useDecimal]);

  const handleChangeText = (text: string) => {
    if (option.useDecimal) {
      const formatted = formatWithCommas(text);
      setDisplayText(formatted);
      option.onTextChanged(formatted);
    } else {
      const digits = text.replace(/\D/g, '');
      setDisplayText(digits);
      option.onTextChanged(digits);
    }
  };

  const handleClear = () => {
    setDisplayText('');
    option.onTextChanged('');
  };

  const handleSubmitEditing = () => {
    if (option.useHideKeyboard) {
      Keyboard.dismiss();
    }
  };

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

  const showClear = option.clearIcon != null && displayText.length > 0;

  return (
    <View style={outerStyle}>
      <View style={containerStyle}>
        <TextInput
          style={inputStyle}
          value={displayText}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitEditing}
          placeholder={option.placeholder ?? undefined}
          placeholderTextColor={hongColorHexToRNColor(option.placeholderColorHex)}
          keyboardType="numeric"
          returnKeyType={hongKeyboardActionTypeToRN(option.keyboardActionType)}
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
              style={styles.clearIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  clearIcon: {
    width: 20,
    height: 20,
  },
});
