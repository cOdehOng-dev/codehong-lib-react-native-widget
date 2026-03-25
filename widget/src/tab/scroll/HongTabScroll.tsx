import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  type LayoutChangeEvent,
  type ViewStyle,
  type TextStyle,
  StyleSheet,
} from 'react-native';
import type { HongTabScrollOption } from './HongTabScrollOption';
import { hongColorHexToRNColor } from '../../rule/color/HongColor';
import { hongRadiusToStyle } from '../../rule/radius/HongRadiusInfo';
import {
  hongTypoSize,
  hongTypoLineHeight,
  isHongTypoBold,
} from '../../rule/typo/HongTypo';
import { layoutParamToStyle, isMatchParent } from '../../rule/HongLayoutParam';

type Props = {
  option: HongTabScrollOption;
};

export function HongTabScroll({ option }: Props): React.ReactElement | null {
  const [selectedIndex, setSelectedIndex] = useState(option.initialSelectIndex);
  const scrollViewRef = useRef<ScrollView>(null);
  const containerWidth = useRef(0);
  const itemLayouts = useRef<{ x: number; width: number }[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToCenter(selectedIndex);
    }, 200);
    return () => clearTimeout(timer);
  }, [selectedIndex]);
  if (!option.isValidComponent) return null;

  const scrollToCenter = (index: number) => {
    const layout = itemLayouts.current[index];
    if (!layout || !scrollViewRef.current) return;
    const scrollX = layout.x - (containerWidth.current - layout.width) / 2;
    scrollViewRef.current.scrollTo({ x: Math.max(0, scrollX), animated: true });
  };

  const handleTabPress = (index: number) => {
    setSelectedIndex(index);
    option.tabClick?.(index, option.tabList[index]);
  };

  const handleItemLayout = (index: number, e: LayoutChangeEvent) => {
    itemLayouts.current[index] = {
      x: e.nativeEvent.layout.x,
      width: e.nativeEvent.layout.width,
    };
  };

  const radiusStyle = hongRadiusToStyle(option.radius, option.useShapeCircle);

  const width = layoutParamToStyle(option.width);

  const outerStyle: ViewStyle = {
    marginTop: option.margin.top,
    marginBottom: option.margin.bottom,
    marginLeft: option.margin.left,
    marginRight: option.margin.right,
    ...(isMatchParent(option.width) ? { alignSelf: 'stretch' } : {}),
    ...(width !== undefined && !isMatchParent(option.width) ? { width } : {}),
  };

  return (
    <View
      style={outerStyle}
      onLayout={e => {
        containerWidth.current = e.nativeEvent.layout.width;
      }}
    >
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: option.padding.top,
          paddingBottom: option.padding.bottom,
          paddingLeft: option.padding.left,
          paddingRight: option.padding.right,
        }}
      >
        {option.tabTextList.map((text, index) => {
          const isSelected = index === selectedIndex;
          const isLast = index === option.tabTextList.length - 1;

          const bgColor = isSelected
            ? option.selectBackgroundColorHex
            : option.unselectBackgroundColorHex;

          const borderWidth = isSelected
            ? option.selectBorderWidth
            : option.unselectBorderWidth;

          const borderColor = isSelected
            ? option.selectBorderColorHex
            : option.unselectBorderColorHex;

          const typo = isSelected
            ? option.selectTabTextTypo
            : option.unselectTabTextTypo;

          const textColorHex = isSelected
            ? option.selectTabTextColorHex
            : option.unselectTabTextColorHex;

          const itemStyle: ViewStyle = {
            backgroundColor: hongColorHexToRNColor(bgColor),
            paddingHorizontal: option.tabTextHorizontalPadding,
            paddingVertical: option.tabTextVerticalPadding,
            marginRight: isLast ? 0 : option.tabBetweenPadding,
            ...radiusStyle,
            ...(borderWidth > 0
              ? {
                  borderWidth,
                  borderColor: hongColorHexToRNColor(borderColor),
                }
              : {}),
          };

          const textStyle: TextStyle = {
            fontSize: hongTypoSize(typo),
            lineHeight: hongTypoLineHeight(typo),
            fontWeight: isHongTypoBold(typo) ? '700' : '400',
            color: hongColorHexToRNColor(textColorHex),
          };

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => handleTabPress(index)}
              onLayout={e => handleItemLayout(index, e)}
            >
              <View style={itemStyle}>
                <Text style={textStyle} numberOfLines={1}>
                  {text}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
