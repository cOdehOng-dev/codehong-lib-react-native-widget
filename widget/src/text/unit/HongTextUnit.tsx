import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { HongTextUnitOption } from './HongTextUnitOption';
import { HongWidgetContainer } from '../../HongWidgetContainer';
import { HongText } from '../def/HongText';

interface HongTextUnitProps {
  option: HongTextUnitOption;
}

/**
 * HongTextUnitCompose의 React Native 대응 컴포넌트
 * 텍스트와 단위를 수평으로 나란히 표시하는 위젯
 */
export function HongTextUnit({ option }: HongTextUnitProps): React.ReactElement | null {
  if (!option.isValidComponent) return null;

  return (
    <HongWidgetContainer option={option}>
      <View style={styles.row}>
        <HongText option={option.textOption} />
        {option.useUnit && option.unitText != null && (
          <HongText option={option.unitTextOption} />
        )}
      </View>
    </HongWidgetContainer>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
