import React from 'react';
import type { HongTextBadgeOption } from './HongTextBadgeOption';
import { HongWidgetContainer } from '../../HongWidgetContainer';
import { HongText } from '../def/HongText';
import { HongTextBuilder } from '../def/HongTextBuilder';

interface HongTextBadgeProps {
  option: HongTextBadgeOption;
}

/**
 * HongTextBadgeCompose의 React Native 대응 컴포넌트
 * 배경색, 테두리, 모서리 둥글기 커스터마이징 가능한 단일 줄 텍스트 배지
 */
export function HongTextBadge({ option }: HongTextBadgeProps): React.ReactElement | null {
  if (!option.isValidComponent) return null;

  const textOption = new HongTextBuilder()
    .width(option.width)
    .height(option.height)
    .text(option.text)
    .color(option.textColorHex)
    .typography(option.textTypography)
    .maxLines(1)
    .applyOption();

  return (
    <HongWidgetContainer option={option}>
      <HongText option={textOption} />
    </HongWidgetContainer>
  );
}
