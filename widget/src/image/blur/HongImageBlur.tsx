import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import type { ImageSourcePropType, ViewStyle } from 'react-native';
import type { HongImageBlurOption } from './HongImageBlurOption';
import { hongColorHexToRNColor } from '../../rule/color/HongColor';
import { hongScaleTypeToResizeMode } from '../../rule/HongScaleType';
import { hongRadiusToStyle } from '../../rule/radius/HongRadiusInfo';
import { layoutParamToStyle, isMatchParent } from '../../rule/HongLayoutParam';

interface HongImageBlurProps {
  option: HongImageBlurOption;
}

function resolveSource(
  source: ImageSourcePropType | string | null | undefined
): ImageSourcePropType | null {
  if (source == null) return null;
  if (typeof source === 'string') return { uri: source };
  return source;
}

/**
 * HongImageBlur의 React Native 대응 컴포넌트
 * 블러 효과가 적용된 이미지 위젯 (Image의 blurRadius prop 활용)
 */
export function HongImageBlur({ option }: HongImageBlurProps): React.ReactElement | null {
  if (!option.isValidComponent) return null;

  const source = resolveSource(option.imageSource);
  if (source == null) return null;

  const resizeMode = hongScaleTypeToResizeMode(option.scaleType);
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

  const innerStyle: ViewStyle = {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
    overflow: 'hidden',
    ...radiusStyle,
    backgroundColor: hongColorHexToRNColor(option.backgroundColorHex),
  };

  const imageElement = (
    <View style={outerStyle}>
      <View style={innerStyle}>
        <Image
          source={source}
          style={{ width: '100%', height: '100%' }}
          resizeMode={resizeMode}
          blurRadius={option.blur}
        />
      </View>
    </View>
  );

  if (option.click) {
    return (
      <TouchableOpacity onPress={() => option.click?.(option)} activeOpacity={0.7}>
        {imageElement}
      </TouchableOpacity>
    );
  }

  return imageElement;
}
