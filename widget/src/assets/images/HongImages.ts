import type { ImageSourcePropType } from 'react-native';

// Metro 번들러는 require() 내에서 @2x/@3x를 직접 참조할 수 없습니다.
// 베이스 파일명(1x)으로 require하면 Metro가 기기 DPI에 맞게 자동으로
// @2x / @3x 파일을 선택합니다.
export const HongImages: Record<string, ImageSourcePropType> = {
  bg_indicator: require('./bg_indicator.png'),
  honglib_ic_alarm: require('./honglib_ic_alarm.png'),
  honglib_ic_16_minus: require('./honglib_ic_16_minus.png'),
  honglib_ic_20_arrow_down: require('./honglib_ic_20_arrow_down.png'),
  honglib_ic_20_circle_close_fill: require('./honglib_ic_20_circle_close_fill.png'),
  honglib_ic_20_close: require('./honglib_ic_20_close.png'),
  honglib_ic_24_close: require('./honglib_ic_24_close.png'),
  honglib_ic_24_plus: require('./honglib_ic_24_plus.png'),
  honglib_ic_close: require('./honglib_ic_close.png'),
  honglib_ic_indicator: require('./honglib_ic_indicator.png'),
  honglib_ic_minus: require('./honglib_ic_minus.png'),
  honglib_ic_plus: require('./honglib_ic_plus.png'),
  honglib_ic_34_arrow_left: require('./honglib_ic_34_arrow_left.png'),
} as const;

export type HongImageKey = keyof typeof HongImages;
