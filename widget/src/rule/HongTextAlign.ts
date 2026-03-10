import type { TextStyle } from 'react-native';

export interface HongTextAlignEntry {
  alias: string;
  value: NonNullable<TextStyle['textAlign']>;
}

export const HongTextAlign = {
  LEFT:   { alias: 'left',   value: 'left'   as const },
  RIGHT:  { alias: 'right',  value: 'right'  as const },
  CENTER: { alias: 'center', value: 'center' as const },
} as const;

export type HongTextAlignKey = keyof typeof HongTextAlign;

export function stringToHongTextAlign(alias: string | null | undefined): HongTextAlignEntry {
  return Object.values(HongTextAlign).find(
    a => a.alias.toLowerCase() === (alias ?? '').toLowerCase()
  ) ?? HongTextAlign.LEFT;
}

export function hongTextAlignToAlias(align: HongTextAlignEntry | null | undefined): string {
  return align?.alias ?? HongTextAlign.LEFT.alias;
}
