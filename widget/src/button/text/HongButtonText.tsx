import React from 'react';
import {
  HongColor,
  HongLayoutParam,
  HongTextAlign,
  HongTypo,
} from '../..';
import {
  HongWidgetContainer,
  HongWidgetNoneClickContainer,
} from '../../HongWidgetContainer';
import { HongState } from '../../rule/HongState';
import { HongText, HongTextBuilder } from '../../text';
import { HongButtonTextOption } from './HongButtonTextOption';

type Props = {
  option: HongButtonTextOption;
};

export function HongButtonText({ option }: Props): React.ReactElement | null {
  return option.state === HongState.DISABLED ? (
    <HongWidgetNoneClickContainer option={option}>
      <HongText
        option={new HongTextBuilder()
          .width(HongLayoutParam.MATCH_PARENT.value)
          .text(option.text)
          .typography(HongTypo.BODY_15_B)
          .color(HongColor.WHITE_60.hex)
          .textAlign(HongTextAlign.CENTER)
          .applyOption()}
      />
    </HongWidgetNoneClickContainer>
  ) : (
    <HongWidgetContainer option={option}>
      <HongText
        option={new HongTextBuilder()
          .width(HongLayoutParam.MATCH_PARENT.value)
          .text(option.text)
          .typography(option.textTypo)
          .color(option.textColorHex)
          .textAlign(HongTextAlign.CENTER)
          .applyOption()}
      />
    </HongWidgetContainer>
  );
}
