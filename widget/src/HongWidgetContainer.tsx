import React from 'react';
import { View, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import type { HongWidgetCommonOption } from './HongWidgetCommonOption';
import { hongColorHexToRNColor } from './rule/color/HongColor';
import { hongRadiusToStyle } from './rule/radius/HongRadiusInfo';
import { layoutParamToStyle, isMatchParent } from './rule/HongLayoutParam';

interface HongWidgetContainerProps {
  option: HongWidgetCommonOption;
  children: React.ReactNode;
}

/**
 * Android HongWidgetContainer / HongWidgetNoneClickContainer 대응
 * margin → background(border/radius/shadow) → padding 순으로 적용
 */
export function HongWidgetContainer({ option, children }: HongWidgetContainerProps) {
  const marginStyle = buildMarginStyle(option);
  const sizeStyle = buildSizeStyle(option);
  const backgroundStyle = buildBackgroundStyle(option);
  const paddingStyle = buildPaddingStyle(option);
  const shadowStyle = buildShadowStyle(option);

  const innerStyle: ViewStyle = {
    ...sizeStyle,
    ...backgroundStyle,
    ...paddingStyle,
    ...shadowStyle,
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (option.click) {
    return (
      <View style={marginStyle}>
        <TouchableOpacity
          style={innerStyle}
          onPress={() => option.click?.(option)}
          activeOpacity={0.7}
        >
          {children}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={marginStyle}>
      <View style={innerStyle}>
        {children}
      </View>
    </View>
  );
}

// ─── 스타일 빌더 ────────────────────────────────────────────────────────────

function buildMarginStyle(option: HongWidgetCommonOption): ViewStyle {
  return {
    marginTop: option.margin.top,
    marginBottom: option.margin.bottom,
    marginLeft: option.margin.left,
    marginRight: option.margin.right,
  };
}

function buildSizeStyle(option: HongWidgetCommonOption): ViewStyle {
  const width = layoutParamToStyle(option.width);
  const height = layoutParamToStyle(option.height);
  return {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
    ...(isMatchParent(option.width) ? { alignSelf: 'stretch' } : {}),
  };
}

function buildBackgroundStyle(option: HongWidgetCommonOption): ViewStyle {
  const radiusStyle = hongRadiusToStyle(option.radius, option.useShapeCircle);
  const bgColor = hongColorHexToRNColor(option.backgroundColorHex);

  return {
    backgroundColor: bgColor,
    ...radiusStyle,
    ...(option.border.width > 0
      ? {
          borderWidth: option.border.width,
          borderColor: hongColorHexToRNColor(option.border.color),
        }
      : {}),
  };
}

function buildPaddingStyle(option: HongWidgetCommonOption): ViewStyle {
  return {
    paddingTop: option.padding.top,
    paddingBottom: option.padding.bottom,
    paddingLeft: option.padding.left,
    paddingRight: option.padding.right,
  };
}

function buildShadowStyle(option: HongWidgetCommonOption): ViewStyle {
  const { blur, offsetX, offsetY, color } = option.shadow;
  if (blur === 0 && offsetX === 0 && offsetY === 0) return {};

  if (Platform.OS === 'ios') {
    return {
      shadowColor: hongColorHexToRNColor(color),
      shadowOffset: { width: offsetX, height: offsetY },
      shadowOpacity: 1,
      shadowRadius: blur,
    };
  }
  // Android: elevation으로 근사
  return { elevation: Math.round(blur / 2) };
}
