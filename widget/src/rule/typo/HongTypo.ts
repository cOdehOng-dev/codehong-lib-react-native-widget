import { HongFont, type HongFontEntry } from './HongFont';

export type HongTypoProps = {
  styleName: string;
  code: number;
};

export const HongTypo = {
  TITLE_36_B: { styleName: 'title_36_b', code: 10 },
  TITLE_28_B: { styleName: 'title_28_b', code: 11 },
  TITLE_26_B: { styleName: 'title_26_b', code: 12 },
  TITLE_24_B: { styleName: 'title_24_b', code: 13 },
  TITLE_22_B: { styleName: 'title_22_b', code: 14 },

  TITLE_36: { styleName: 'title_36', code: 20 },
  TITLE_28: { styleName: 'title_28', code: 21 },
  TITLE_26: { styleName: 'title_26', code: 22 },
  TITLE_24: { styleName: 'title_24', code: 23 },
  TITLE_22: { styleName: 'title_22', code: 24 },

  BODY_20_B: { styleName: 'body_20_b', code: 30 },
  BODY_18_B: { styleName: 'body_18_b', code: 31 },
  BODY_17_B: { styleName: 'body_17_b', code: 32 },
  BODY_16_B: { styleName: 'body_16_b', code: 33 },
  BODY_15_B: { styleName: 'body_15_b', code: 34 },
  BODY_14_B: { styleName: 'body_14_b', code: 35 },
  BODY_13_B: { styleName: 'body_13_b', code: 36 },

  BODY_20: { styleName: 'body_20', code: 40 },
  BODY_18: { styleName: 'body_18', code: 41 },
  BODY_17: { styleName: 'body_17', code: 42 },
  BODY_16: { styleName: 'body_16', code: 43 },
  BODY_15: { styleName: 'body_15', code: 44 },
  BODY_14: { styleName: 'body_14', code: 45 },
  BODY_13: { styleName: 'body_13', code: 46 },

  CONTENTS_22_B: { styleName: 'contents_22_b', code: 50 },
  CONTENTS_20_B: { styleName: 'contents_20_b', code: 51 },
  CONTENTS_16_B: { styleName: 'contents_16_b', code: 52 },
  CONTENTS_12_B: { styleName: 'contents_12_b', code: 53 },
  CONTENTS_10_B: { styleName: 'contents_10_b', code: 54 },

  CONTENTS_20: { styleName: 'contents_20', code: 60 },
  CONTENTS_16: { styleName: 'contents_16', code: 61 },
  CONTENTS_14: { styleName: 'contents_14', code: 62 },
  CONTENTS_12: { styleName: 'contents_12', code: 63 },
  CONTENTS_10: { styleName: 'contents_10', code: 64 },
} as const;

export type HongTypoKey = keyof typeof HongTypo;

export function hongTypoSize(typo: HongTypoProps): number {
  switch (typo.styleName) {
    case 'title_36_b':
    case 'title_36':
      return 36;
    case 'title_28_b':
    case 'title_28':
      return 28;
    case 'title_26_b':
    case 'title_26':
      return 26;
    case 'title_24_b':
    case 'title_24':
      return 24;
    case 'title_22_b':
    case 'title_22':
      return 22;
    case 'body_20_b':
    case 'body_20':
      return 20;
    case 'body_18_b':
    case 'body_18':
      return 18;
    case 'body_17_b':
    case 'body_17':
      return 17;
    case 'body_16_b':
    case 'body_16':
      return 16;
    case 'body_15_b':
    case 'body_15':
      return 15;
    case 'body_14_b':
    case 'body_14':
      return 14;
    case 'body_13_b':
    case 'body_13':
      return 13;
    case 'contents_22_b':
      return 22;
    case 'contents_20_b':
    case 'contents_20':
      return 20;
    case 'contents_16_b':
    case 'contents_16':
      return 16;
    case 'contents_14':
      return 14;
    case 'contents_12_b':
    case 'contents_12':
      return 12;
    case 'contents_10_b':
    case 'contents_10':
      return 10;
    default:
      return 14;
  }
}

export function hongTypoLineHeight(typo: HongTypoProps): number {
  switch (typo.styleName) {
    case 'title_36_b':
    case 'title_36':
      return 44;
    case 'title_28_b':
    case 'title_28':
      return 36;
    case 'title_26_b':
    case 'title_26':
      return 34;
    case 'title_24_b':
    case 'title_24':
      return 32;
    case 'title_22_b':
    case 'title_22':
      return 28;
    case 'body_20_b':
    case 'body_20':
      return 28;
    case 'body_18_b':
    case 'body_18':
      return 24;
    case 'body_17_b':
    case 'body_17':
      return 23;
    case 'body_16_b':
    case 'body_16':
      return 22;
    case 'body_15_b':
    case 'body_15':
      return 20;
    case 'body_14_b':
    case 'body_14':
      return 19;
    case 'body_13_b':
    case 'body_13':
      return 18;
    case 'contents_22_b':
      return 32;
    case 'contents_20_b':
      return 26;
    case 'contents_16_b':
      return 24;
    case 'contents_12_b':
    case 'contents_12':
      return 20;
    case 'contents_20':
      return 30;
    case 'contents_16':
      return 26;
    case 'contents_14':
      return 24;
    case 'contents_10_b':
    case 'contents_10':
      return 18;
    default:
      return 19;
  }
}

export function isHongTypoBold(typo: HongTypoProps): boolean {
  return typo.styleName.endsWith('b');
}

export function hongTypoFontType(
  typo: HongTypoProps | null | undefined,
): HongFontEntry {
  return isHongTypoBold(typo as HongTypoProps)
    ? HongFont.PRETENDARD_700
    : HongFont.PRETENDARD_400;
}
