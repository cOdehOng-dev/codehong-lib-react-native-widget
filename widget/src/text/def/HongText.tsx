import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import type { TextStyle, ViewStyle } from 'react-native';
import { HongTextOption } from './HongTextOption';
import { HongTextOverflow } from '../../rule/HongTextOverflow';
import { HongTextLineBreak } from '../../rule/HongTextLineBreak';
import { HongColor, hongColorHexToRNColor } from '../../rule/color/HongColor';
import { HongLayoutParam, layoutParamToStyle, isMatchParent } from '../../rule/HongLayoutParam';
import { hongRadiusToStyle } from '../../rule/radius/HongRadiusInfo';
import { hongTypoSize, hongTypoLineHeight } from '../../rule/typo/HongTypo';

interface HongTextProps {
  option: HongTextOption;
}

/**
 * HongTextCompose의 React Native 대응 컴포넌트
 */
export function HongText({ option }: HongTextProps): React.ReactElement | null {
  if (!option.isValidComponent) return null;

  const isSyllableBreak = option.lineBreak.alias === HongTextLineBreak.SYLLABLE.alias;
  const displayText = formatText(option, isSyllableBreak);

  const textStyle = buildTextStyle(option);
  const containerStyle = buildContainerStyle(option);

  const ellipsizeMode =
    option.overflow.ellipsizeMode ?? undefined;
  const numberOfLines =
    option.maxLines > 0 ? option.maxLines : undefined;

  const textElement = (
    <Text
      style={textStyle}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
    >
      {renderTextWithSpan(displayText, option, isSyllableBreak)}
    </Text>
  );

  if (option.hasMargin()) {
    return (
      <View style={containerStyle}>
        {textElement}
      </View>
    );
  }

  return textElement;
}

// ─── 내부 헬퍼 ─────────────────────────────────────────────────────────────

function formatText(option: HongTextOption, isSyllableBreak: boolean): string {
  let result = option.text ?? '';

  if (option.useNumberDecimal) {
    const clean = result.replace(/,/g, '').trim();
    const asLong = parseInt(clean, 10);
    const asFloat = parseFloat(clean);
    if (!isNaN(asLong) && String(asLong) === clean) {
      result = asLong.toLocaleString();
    } else if (!isNaN(asFloat)) {
      result = asFloat.toLocaleString(undefined, { maximumFractionDigits: 2 });
    }
  }

  if (isSyllableBreak) {
    result = insertSyllableBreaks(result);
  }

  return result;
}

/**
 * 한글 음절 단위 줄바꿈: 각 글자 사이에 zero-width space 삽입
 * Android의 lineBreakSyllable() 확장함수와 동일한 역할
 */
function insertSyllableBreaks(text: string): string {
  return text.split('').join('\u200B');
}

function buildTextStyle(option: HongTextOption): TextStyle {
  const defaultTypo = HongTextOption.DEFAULT_TYPOGRAPHY;
  const fontSize = option.size ?? hongTypoSize(defaultTypo);
  const lineHeight = option.lineHeight ?? hongTypoLineHeight(defaultTypo);
  const color = hongColorHexToRNColor(
    option.colorHex ?? HongTextOption.DEFAULT_LABEL_COLOR.hex
  );

  const textDecorationLine = resolveTextDecoration(
    option.isEnableUnderLine,
    option.isEnableCancelLine
  );

  return {
    color,
    fontSize,
    lineHeight,
    fontWeight: option.fontWeight.weight,
    fontFamily: option.fontType?.fileName ?? undefined,
    textAlign: option.align.value,
    letterSpacing: -0.3,
    paddingTop: option.padding.top,
    paddingBottom: option.padding.bottom,
    paddingLeft: option.padding.left,
    paddingRight: option.padding.right,
    ...(isMatchParent(option.width) ? { width: '100%' } : option.width > 0 ? { width: option.width } : {}),
    ...(isMatchParent(option.height) ? { height: '100%' } : option.height > 0 ? { height: option.height } : {}),
    ...(textDecorationLine ? { textDecorationLine } : {}),
  };
}

function buildContainerStyle(option: HongTextOption): ViewStyle {
  return {
    marginTop: option.margin.top,
    marginBottom: option.margin.bottom,
    marginLeft: option.margin.left,
    marginRight: option.margin.right,
    ...(isMatchParent(option.width) ? { width: '100%' } : option.width > 0 ? { width: option.width } : {}),
    ...(isMatchParent(option.height) ? { height: '100%' } : option.height > 0 ? { height: option.height } : {}),
  };
}

type TextDecoration = 'none' | 'underline' | 'line-through' | 'underline line-through';

function resolveTextDecoration(
  underline: boolean,
  cancelLine: boolean
): TextDecoration | undefined {
  if (underline && cancelLine) return 'underline line-through';
  if (underline) return 'underline';
  if (cancelLine) return 'line-through';
  return undefined;
}

function renderTextWithSpan(
  fullText: string,
  option: HongTextOption,
  isSyllableBreak: boolean
): React.ReactNode {
  if (!option.spanTextBuilderList || option.spanTextBuilderList.length === 0) {
    return fullText;
  }

  // span이 있는 경우 전체 텍스트를 파싱하여 부분 스타일 적용
  const segments: { text: string; style?: TextStyle }[] = [];
  let remaining = fullText;

  option.spanTextBuilderList.forEach(builder => {
    builder.injectOption(option);
    const spanOption = builder.option;

    const rawTarget = isSyllableBreak
      ? insertSyllableBreaks(spanOption.text ?? '')
      : (spanOption.text ?? '');

    if (!rawTarget) return;

    const idx = remaining.indexOf(rawTarget);
    if (idx === -1) return;

    if (idx > 0) {
      segments.push({ text: remaining.slice(0, idx) });
    }

    const spanColor = hongColorHexToRNColor(
      spanOption.colorHex ?? HongTextOption.DEFAULT_LABEL_COLOR.hex
    );
    const defaultTypo = HongTextOption.DEFAULT_TYPOGRAPHY;
    const spanDecoration = resolveTextDecoration(
      spanOption.isEnableUnderLine,
      spanOption.isEnableCancelLine
    );

    segments.push({
      text: rawTarget,
      style: {
        color: spanColor,
        fontWeight: spanOption.fontWeight.weight,
        fontSize: spanOption.size ?? hongTypoSize(defaultTypo),
        fontFamily: spanOption.fontType?.fileName ?? undefined,
        ...(spanDecoration ? { textDecorationLine: spanDecoration } : {}),
      },
    });

    remaining = remaining.slice(idx + rawTarget.length);
  });

  if (remaining.length > 0) {
    segments.push({ text: remaining });
  }

  return segments.map((seg, i) => (
    <Text key={i} style={seg.style}>
      {seg.text}
    </Text>
  ));
}
