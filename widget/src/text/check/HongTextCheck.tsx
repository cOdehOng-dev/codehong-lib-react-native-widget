import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import type { HongTextCheckOption } from './HongTextCheckOption';
import { HongWidgetContainer } from '../../HongWidgetContainer';
import { HongText } from '../def/HongText';
import { hongColorHexToRNColor } from '../../rule/color/HongColor';

interface HongTextCheckProps {
  option: HongTextCheckOption;
}

function CheckIcon({ size, color }: { size: number; color: string }) {
  const strokeWidth = Math.max(1.5, size * 0.08);
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.55,
          height: size * 0.28,
          borderLeftWidth: strokeWidth,
          borderBottomWidth: strokeWidth,
          borderColor: color,
          transform: [{ rotate: '-45deg' }],
          marginTop: -(size * 0.06),
        }}
      />
    </View>
  );
}

function ArrowRightIcon({ size, color }: { size: number; color: string }) {
  const strokeWidth = Math.max(1.5, size * 0.08);
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.3,
          height: size * 0.3,
          borderRightWidth: strokeWidth,
          borderTopWidth: strokeWidth,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  );
}

/**
 * HongTextCheckCompose의 React Native 대응 컴포넌트
 * 체크 아이콘 + 텍스트 + 우측 화살표로 구성된 체크 위젯
 */
export function HongTextCheck({
  option,
}: HongTextCheckProps): React.ReactElement | null {
  const [isChecked, setIsChecked] = useState(option.checkState);

  if (!option.isValidComponent) return null;

  const checkColor = hongColorHexToRNColor(
    isChecked ? option.checkColor : option.uncheckColor,
  );
  const arrowColor = hongColorHexToRNColor(
    option.textOption.colorHex ?? option.uncheckColor,
  );

  const handleCheckPress = () => {
    const next = !isChecked;
    setIsChecked(next);
    option.onCheck?.(next);
  };

  return (
    <HongWidgetContainer option={option}>
      <View style={styles.row}>
        {/* Check icon */}
        <TouchableOpacity
          onPress={handleCheckPress}
          activeOpacity={0.7}
          style={{ marginRight: 8 }}
        >
          <CheckIcon size={option.checkSize} color={checkColor} />
        </TouchableOpacity>

        {/* Text */}
        <View style={styles.textFlex}>
          <HongText option={option.textOption} />
        </View>

        {/* Arrow right icon */}
        <ArrowRightIcon size={option.arrowSize} color={arrowColor} />
      </View>
    </HongWidgetContainer>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textFlex: {
    flex: 1,
  },
});
