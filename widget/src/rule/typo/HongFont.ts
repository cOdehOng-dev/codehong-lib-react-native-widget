import type { TextStyle } from 'react-native';

export interface HongFontEntry {
  weight: NonNullable<TextStyle['fontWeight']>;
  fileName: string;
}

export const HongFont = {
  PRETENDARD_400: { weight: '400' as const, fileName: 'Pretendard-Regular' },
  PRETENDARD_500: { weight: '500' as const, fileName: 'Pretendard-Medium' },
  PRETENDARD_600: { weight: '600' as const, fileName: 'Pretendard-SemiBold' },
  PRETENDARD_700: { weight: '700' as const, fileName: 'Pretendard-Bold' },
  PRETENDARD_800: { weight: '800' as const, fileName: 'Pretendard-ExtraBold' },
} as const;

export type HongFontKey = keyof typeof HongFont;
