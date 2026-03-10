import React, { useState } from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import type { HongTextCountOption } from './HongTextCountOption';
import { HongCountType } from './HongTextCountOption';
import { HongWidgetContainer } from '../../HongWidgetContainer';
import { HongText } from '../def/HongText';
import { HongTextBuilder } from '../def/HongTextBuilder';
import { HongImages } from '../../assets/images/HongImages';
import { HongColor, hongColorHexToRNColor } from '../../rule/color/HongColor';
import { hongTypoSize, hongTypoFontType } from '../../rule/typo/HongTypo';

interface HongTextCountProps {
  option: HongTextCountOption;
}

function formatValue(value: number, countType: string): string {
  if (countType === HongCountType.DOUBLE) {
    return value.toFixed(1);
  }
  return Math.round(value).toString();
}

/**
 * HongTextCountCompose의 React Native 대응 컴포넌트
 * ➖/➕ 버튼과 직접 입력으로 숫자를 조절하는 카운터 위젯
 */
export function HongTextCount({ option }: HongTextCountProps): React.ReactElement | null {
  if (!option.isValidComponent) return null;

  const initialText = formatValue(option.startCount, option.countType);
  const [inputText, setInputText] = useState(initialText);

  const currentValue = parseFloat(inputText) || 0;
  const isUnderMin = currentValue <= option.minCount;
  const isOverMax = option.maxCount !== null && currentValue >= option.maxCount;

  const countFontSize = hongTypoSize(option.countTypo);
  const countFontFamily = hongTypoFontType(option.countTypo).fileName;
  const countColor = hongColorHexToRNColor(option.countColorHex);
  const disabledIconColor = hongColorHexToRNColor(HongColor.GRAY_30.hex);
  const activeIconColor = hongColorHexToRNColor(HongColor.BLACK_100.hex);

  const { buttonSize } = option;

  const handleMinus = () => {
    const next = Math.max(currentValue - option.amount, option.minCount);
    const formatted = formatValue(next, option.countType);
    setInputText(formatted);
    option.onCountChange(formatted);
  };

  const handlePlus = () => {
    let next = currentValue + option.amount;
    if (option.maxCount !== null) {
      next = Math.min(next, option.maxCount);
    }
    const formatted = formatValue(next, option.countType);
    setInputText(formatted);
    option.onCountChange(formatted);
  };

  const handleChangeText = (text: string) => {
    setInputText(text);
    option.onCountChange(text);
  };

  const handleEndEditing = () => {
    const parsed = parseFloat(inputText);
    if (isNaN(parsed)) {
      const clamped = formatValue(option.minCount, option.countType);
      setInputText(clamped);
      option.onCountChange(clamped);
      return;
    }
    let clamped = Math.max(parsed, option.minCount);
    if (option.maxCount !== null) {
      clamped = Math.min(clamped, option.maxCount);
    }
    const formatted = formatValue(clamped, option.countType);
    setInputText(formatted);
    option.onCountChange(formatted);
  };

  const unitOption = new HongTextBuilder()
    .text(option.unitText)
    .typography(option.unitTypo)
    .color(option.unitColorHex)
    .padding({ left: 0, top: 4, right: 0, bottom: 0 })
    .applyOption();

  const circleStyle = {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
  };

  return (
    <HongWidgetContainer option={option}>
      <View style={styles.row}>
        {/* ➖ 버튼 */}
        <TouchableOpacity
          style={[styles.circleButton, circleStyle, isUnderMin && styles.buttonDisabled]}
          onPress={handleMinus}
          activeOpacity={isUnderMin ? 1 : 0.7}
          disabled={isUnderMin}
        >
          <Image
            source={HongImages.honglib_ic_16_minus}
            style={[styles.icon, { tintColor: isUnderMin ? disabledIconColor : activeIconColor }]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* 숫자 입력 + 단위 텍스트 */}
        <View style={styles.centerArea}>
          <TextInput
            style={[
              styles.input,
              {
                fontSize: countFontSize,
                fontFamily: countFontFamily,
                color: countColor,
                minWidth: 60,
                maxWidth: 200,
              },
            ]}
            value={inputText}
            onChangeText={handleChangeText}
            onEndEditing={handleEndEditing}
            keyboardType="numeric"
            returnKeyType="done"
            textAlign="center"
            selectTextOnFocus
          />
          {option.unitText.length > 0 && (
            <HongText option={unitOption} />
          )}
        </View>

        {/* ➕ 버튼 */}
        <TouchableOpacity
          style={[styles.circleButton, circleStyle, isOverMax && styles.buttonDisabled]}
          onPress={handlePlus}
          activeOpacity={isOverMax ? 1 : 0.7}
          disabled={isOverMax}
        >
          <Image
            source={HongImages.honglib_ic_24_plus}
            style={[styles.icon, { tintColor: isOverMax ? disabledIconColor : activeIconColor }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </HongWidgetContainer>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
  },
  buttonDisabled: {
    backgroundColor: '#F9F9F9',
  },
  icon: {
    width: '50%',
    height: '50%',
  },
  centerArea: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    padding: 0,
  },
});
