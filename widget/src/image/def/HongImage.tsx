import React, { useState } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import type { ImageSourcePropType, ImageStyle, ViewStyle } from 'react-native';
import type { HongImageOption } from './HongImageOption';
import { HongImages } from '../../assets/images/HongImages';
import { hongColorHexToRNColor } from '../../rule/color/HongColor';
import { hongScaleTypeToResizeMode } from '../../rule/HongScaleType';
import { hongRadiusToStyle } from '../../rule/radius/HongRadiusInfo';
import { layoutParamToStyle, isMatchParent } from '../../rule/HongLayoutParam';

type OptionProps = {
  option: HongImageOption;
};

function resolveSource(
  source: ImageSourcePropType | string | null | undefined,
): ImageSourcePropType | null {
  if (source == null) return null;
  if (typeof source === 'string') {
    if (source in HongImages) return HongImages[source];
    return { uri: source };
  }
  return source;
}

/**
 * HongImageCompose의 React Native 대응 컴포넌트
 * URL 또는 로컬 이미지를 표시하는 이미지 위젯
 *
 * HongWidgetContainer 대신 직접 레이아웃을 구성합니다.
 * (컨테이너의 alignItems/justifyContent가 이미지 100% 레이아웃과 충돌하기 때문)
 */
export function HongImage({ option }: OptionProps): React.ReactElement | null {
  const [hasError, setHasError] = useState(false);

  if (!option.isValidComponent) return null;

  const resizeMode = hongScaleTypeToResizeMode(option.scaleType);
  const radiusStyle = hongRadiusToStyle(option.radius, option.useShapeCircle);
  const tintColor = option.imageColorHex
    ? hongColorHexToRNColor(option.imageColorHex)
    : undefined;

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

  const imageStyle: ImageStyle = {
    width: '100%',
    height: '100%',
    ...(tintColor ? { tintColor } : {}),
  };

  const mainSource =
    hasError && option.error
      ? resolveSource(option.error)
      : resolveSource(option.imageSource);

  const placeholderSource = resolveSource(option.placeholder);
  const displaySource = mainSource ?? placeholderSource;

  if (displaySource == null) return null;

  const imageElement = (
    <View style={[outerStyle]}>
      <View style={innerStyle}>
        <Image
          source={displaySource}
          style={imageStyle}
          resizeMode={resizeMode}
          onLoadStart={() => option.onLoading?.()}
          onLoad={() => option.onSuccess?.()}
          onError={() => {
            setHasError(true);
            option.onError?.();
          }}
        />
      </View>
    </View>
  );

  if (option.click) {
    return (
      <TouchableOpacity
        onPress={() => option.click?.(option)}
        activeOpacity={0.7}
      >
        {imageElement}
      </TouchableOpacity>
    );
  }

  return imageElement;
}
