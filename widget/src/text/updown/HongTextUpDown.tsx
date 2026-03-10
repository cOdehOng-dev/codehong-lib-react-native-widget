import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import type { HongTextUpDownOption } from './HongTextUpDownOption';
import { HongWidgetContainer } from '../../HongWidgetContainer';
import { HongText } from '../def/HongText';
import { HongTextBuilder } from '../def/HongTextBuilder';
import { HongImages } from '../../assets/images/HongImages';
import { hongColorHexToRNColor } from '../../rule/color/HongColor';

interface HongTextUpDownProps {
  option: HongTextUpDownOption;
}

function formatAmount(value: number, useDecimal: boolean): string {
  if (useDecimal) {
    return value.toLocaleString('ko-KR');
  }
  return String(value);
}

/**
 * HongTextUpDownCompose의 React Native 대응 컴포넌트
 * -/+ 버튼으로 숫자를 증감하는 위젯
 */
export function HongTextUpDown({ option }: HongTextUpDownProps): React.ReactElement | null {
  if (!option.isValidComponent) return null;

  const [amount, setAmount] = useState(option.amount);

  const borderColor = hongColorHexToRNColor(option.borderColorHex);
  const iconColor = hongColorHexToRNColor(option.iconColorHex);
  const { buttonSize, spaceButtonAndDisplay } = option;

  const displayText = option.unit
    ? `${formatAmount(amount, option.useDecimal)} ${option.unit}`
    : formatAmount(amount, option.useDecimal);

  const displayOption = new HongTextBuilder()
    .text(displayText)
    .typography(option.displayTypo)
    .color(option.displayColorHex)
    .applyOption();

  const handleMinus = () => {
    const next = amount - option.gap;
    setAmount(next);
    option.onResult(next);
  };

  const handlePlus = () => {
    const next = amount + option.gap;
    setAmount(next);
    option.onResult(next);
  };

  const circleStyle = {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    borderWidth: 1,
    borderColor,
  };

  return (
    <HongWidgetContainer option={option}>
      <View style={styles.row}>
        {/* Minus button */}
        <TouchableOpacity
          style={[styles.circleButton, circleStyle]}
          onPress={handleMinus}
          activeOpacity={0.7}
        >
          <Image
            source={HongImages.honglib_ic_minus}
            style={[styles.icon, { tintColor: iconColor }]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={{ width: spaceButtonAndDisplay }} />

        {/* Amount + Unit display */}
        <HongText option={displayOption} />

        <View style={{ width: spaceButtonAndDisplay }} />

        {/* Plus button */}
        <TouchableOpacity
          style={[styles.circleButton, circleStyle]}
          onPress={handlePlus}
          activeOpacity={0.7}
        >
          <Image
            source={HongImages.honglib_ic_plus}
            style={[styles.icon, { tintColor: iconColor }]}
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
  },
  icon: {
    width: '60%',
    height: '60%',
  },
});
