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
import type { HongTextFieldBorderOption } from './HongTextFieldBorderOption';
import { HongInputState } from '../../rule/HongInputState';
import { hongColorHexToRNColor, HongColor } from '../../rule/color/HongColor';
import { hongRadiusToStyle } from '../../rule/radius/HongRadiusInfo';
import { layoutParamToStyle, isMatchParent } from '../../rule/HongLayoutParam';
import { hongTypoSize, hongTypoFontType } from '../../rule/typo/HongTypo';
import { HongImages } from '../../assets/images/HongImages';
import { HongText } from '../../text/def/HongText';
import { HongTextBuilder } from '../../text/def/HongTextBuilder';
import { HongTypo } from '../../rule/typo/HongTypo';

interface HongTextFieldBorderProps {
  option: HongTextFieldBorderOption;
}

export function HongTextFieldBorder({ option }: HongTextFieldBorderProps): React.ReactElement | null {
  if (!option.isValidComponent) return null;

  const isEnabled = option.state === HongInputState.ENABLE;
  const [inputText, setInputText] = useState(option.initialInput);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInputText(option.initialInput);
  }, [option.initialInput]);

  const handleChangeText = (text: string) => {
    if (!isEnabled) return;
    setInputText(text);
    option.onChangeInput(text);
  };

  const handleClear = () => {
    setInputText('');
    option.onChangeInput('');
  };

  const handleSubmitEditing = () => {
    Keyboard.dismiss();
  };

  // 상태별 색상
  const borderColor = !isEnabled
    ? hongColorHexToRNColor(HongColor.GRAY_10.hex)
    : isFocused
    ? hongColorHexToRNColor(option.focusedBorderColorHex)
    : hongColorHexToRNColor(option.enableBorderColorHex);

  const backgroundColor = isEnabled
    ? hongColorHexToRNColor(option.inputBackgroundColorHex)
    : hongColorHexToRNColor(HongColor.GRAY_10.hex);

  const labelColor = isEnabled
    ? hongColorHexToRNColor(option.labelColorHex)
    : hongColorHexToRNColor(HongColor.GRAY_30.hex);

  const inputColor = isEnabled
    ? hongColorHexToRNColor(option.inputTextColorHex)
    : hongColorHexToRNColor(HongColor.GRAY_30.hex);

  const placeholderColor = isEnabled
    ? hongColorHexToRNColor(option.placeholderColorHex)
    : hongColorHexToRNColor(HongColor.GRAY_30.hex);

  const radiusStyle = hongRadiusToStyle(option.inputRadius);
  const width = layoutParamToStyle(option.width);

  const outerStyle: ViewStyle = {
    marginTop: option.margin.top,
    marginBottom: option.margin.bottom,
    marginLeft: option.margin.left,
    marginRight: option.margin.right,
    ...(isMatchParent(option.width) ? { alignSelf: 'stretch' } : {}),
  };

  const inputFontSize = hongTypoSize(HongTypo.BODY_16);
  const inputFontFamily = hongTypoFontType(HongTypo.BODY_16).fileName;

  const inputStyle: TextStyle = {
    flex: 1,
    fontSize: inputFontSize,
    fontFamily: inputFontFamily,
    color: inputColor,
    padding: 0,
    margin: 0,
    textAlignVertical: 'top',
  };

  const showClear = isEnabled && option.useClearButton && inputText.length > 0;
  const showSuffix = option.suffix.length > 0;

  return (
    <View style={outerStyle}>
      {/* 입력 박스 */}
      <View
        style={[
          styles.inputBox,
          radiusStyle,
          {
            ...(width !== undefined ? { width } : {}),
            backgroundColor,
            borderColor,
          },
        ]}
      >
        {/* 왼쪽: 라벨 + 입력 */}
        <View style={styles.inputColumn}>
          {/* 라벨 행 */}
          {option.label.length > 0 && (
            <View style={styles.labelRow}>
              <HongText
                option={new HongTextBuilder()
                  .text(option.label)
                  .typography(option.labelTypo)
                  .color(option.labelColorHex)
                  .applyOption()}
              />
              {option.isRequired && isEnabled && (
                <HongText
                  option={new HongTextBuilder()
                    .text(' *')
                    .typography(option.labelTypo)
                    .colorEntry(HongColor.MAIN_ORANGE_100)
                    .applyOption()}
                />
              )}
            </View>
          )}

          {/* 텍스트 입력 */}
          <TextInput
            style={inputStyle}
            value={inputText}
            onChangeText={handleChangeText}
            onSubmitEditing={handleSubmitEditing}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={option.placeholder || undefined}
            placeholderTextColor={placeholderColor}
            keyboardType={option.useNumberKeypad ? 'numeric' : 'default'}
            returnKeyType="done"
            editable={isEnabled}
            cursorColor={hongColorHexToRNColor(HongColor.MAIN_ORANGE_100.hex)}
            selectionColor={hongColorHexToRNColor(HongColor.MAIN_ORANGE_100.hex)}
            multiline={false}
            autoCapitalize={option.autoCapitalize}
          />
        </View>

        {/* 오른쪽: suffix + clear */}
        {(showSuffix || showClear) && (
          <View style={styles.rightColumn}>
            {showSuffix && (
              <HongText
                option={new HongTextBuilder()
                  .text(option.suffix)
                  .typography(option.suffixTypo)
                  .color(option.inputTextColorHex)
                  .applyOption()}
              />
            )}
            {showClear && (
              <TouchableOpacity
                onPress={handleClear}
                activeOpacity={0.7}
                style={styles.clearButton}
              >
                <Image
                  source={HongImages.honglib_ic_20_circle_close_fill}
                  style={styles.clearIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* 헬퍼 텍스트 */}
      {option.helperText.length > 0 && (
        <HongText
          option={new HongTextBuilder()
            .text(option.helperText)
            .typography(option.helperTextTypo)
            .color(option.inputTextColorHex)
            .padding({ left: 0, top: 9, right: 0, bottom: 0 })
            .applyOption()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingTop: 18,
    paddingHorizontal: 19,
    paddingBottom: 10,
  },
  inputColumn: {
    flex: 1,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rightColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  clearButton: {
    padding: 4,
  },
  clearIcon: {
    width: 20,
    height: 20,
  },
});
