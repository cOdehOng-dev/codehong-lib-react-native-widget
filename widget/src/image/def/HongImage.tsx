import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import FastImage, {
  type Source as FastImageSource,
} from 'react-native-fast-image';
import type { ImageSourcePropType, ViewStyle } from 'react-native';
import type { HongImageOption } from './HongImageOption';
import { HongImages } from '../../assets/images/HongImages';
import { hongColorHexToRNColor } from '../../rule/color/HongColor';
import { hongScaleTypeToResizeMode } from '../../rule/HongScaleType';
import { hongRadiusToStyle } from '../../rule/radius/HongRadiusInfo';
import {
  layoutParamToStyle,
  isMatchParent,
  isWrapContent,
} from '../../rule/HongLayoutParam';

type OptionProps = {
  option: HongImageOption;
};

function resolveForFastImage(
  source: ImageSourcePropType | string | null | undefined,
): FastImageSource | number | null {
  if (source == null) return null;
  if (typeof source === 'string') {
    if (source in HongImages) return HongImages[source] as number;
    return { uri: source, priority: FastImage.priority.normal };
  }
  if (typeof source === 'number') return source;
  if (typeof source === 'object' && 'uri' in source && source.uri) {
    return { uri: source.uri, priority: FastImage.priority.normal };
  }
  return null;
}

function resolveUri(
  source: ImageSourcePropType | string | null | undefined,
): string | null {
  if (source == null) return null;
  if (typeof source === 'string') return source;
  if (typeof source === 'object' && 'uri' in source)
    return (source as { uri?: string }).uri ?? null;
  return null;
}

/**
 * HongImageCompose의 React Native 대응 컴포넌트
 * URL 또는 로컬 이미지를 표시하는 이미지 위젯
 *
 * - width=MATCH_PARENT + height=WRAP_CONTENT 조합일 때 auto-size 모드로 동작:
 *   컨테이너 너비를 측정한 뒤 Image.getSize로 이미지 비율을 계산해 높이를 자동 결정합니다.
 * - 그 외에는 기존 고정 크기 레이아웃으로 동작합니다.
 * - 이미지 렌더링은 FastImage를 사용합니다.
 */
export function HongImage({ option }: OptionProps): React.ReactElement | null {
  const [hasError, setHasError] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [autoHeight, setAutoHeight] = useState(0);

  const isAutoSize =
    isMatchParent(option.width) && isWrapContent(option.height);

  const rawSource =
    hasError && option.error ? option.error : option.imageSource;
  const uri = resolveUri(rawSource);

  useEffect(() => {
    if (!isAutoSize || containerWidth === 0 || !uri) return;
    Image.getSize(uri, (w, h) => {
      setAutoHeight((h / w) * containerWidth);
    });
  }, [isAutoSize, uri, containerWidth]);

  if (!option.isValidComponent) return null;

  const rnResizeMode = hongScaleTypeToResizeMode(option.scaleType);
  const fastResizeMode =
    rnResizeMode === 'cover'
      ? FastImage.resizeMode.cover
      : rnResizeMode === 'stretch'
      ? FastImage.resizeMode.stretch
      : rnResizeMode === 'center'
      ? FastImage.resizeMode.center
      : FastImage.resizeMode.contain;

  const radiusStyle = hongRadiusToStyle(option.radius, option.useShapeCircle);
  const tintColor = option.imageColorHex
    ? hongColorHexToRNColor(option.imageColorHex)
    : undefined;

  const outerStyle: ViewStyle = {
    marginTop: option.margin.top,
    marginBottom: option.margin.bottom,
    marginLeft: option.margin.left,
    marginRight: option.margin.right,
    ...(isAutoSize || isMatchParent(option.width)
      ? { alignSelf: 'stretch' }
      : {}),
  };

  const displaySource =
    hasError && option.error
      ? resolveForFastImage(option.error)
      : resolveForFastImage(option.imageSource) ??
        resolveForFastImage(option.placeholder);

  if (!isAutoSize) {
    const width = layoutParamToStyle(option.width);
    const height = layoutParamToStyle(option.height);

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

    if (displaySource == null) return null;

    const imageElement = (
      <View style={outerStyle}>
        <View style={innerStyle}>
          <FastImage
            source={displaySource}
            style={{
              width: '100%',
              height: '100%',
              ...(tintColor ? { tintColor } : {}),
            }}
            resizeMode={fastResizeMode}
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

  // Auto-size mode: width=MATCH_PARENT, height=WRAP_CONTENT
  const autoSizeInnerStyle: ViewStyle = {
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
    width: '100%',
  };

  const autoSizeElement = (
    <View
      style={outerStyle}
      onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <View style={autoSizeInnerStyle}>
        {autoHeight > 0 && displaySource != null && (
          <FastImage
            source={displaySource}
            style={{
              width: containerWidth,
              height: autoHeight,
              ...(tintColor ? { tintColor } : {}),
            }}
            resizeMode={fastResizeMode}
            onLoadStart={() => option.onLoading?.()}
            onLoad={() => option.onSuccess?.()}
            onError={() => {
              setHasError(true);
              option.onError?.();
            }}
          />
        )}
      </View>
    </View>
  );

  if (option.click) {
    return (
      <TouchableOpacity
        onPress={() => option.click?.(option)}
        activeOpacity={0.7}
      >
        {autoSizeElement}
      </TouchableOpacity>
    );
  }

  return autoSizeElement;
}
