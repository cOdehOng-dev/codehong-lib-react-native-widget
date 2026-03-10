import type { TextProps } from 'react-native';

export interface HongTextOverflowEntry {
  alias: string;
  ellipsizeMode: NonNullable<TextProps['ellipsizeMode']> | null;
}

export const HongTextOverflow = {
  CLIP:     { alias: 'clip',     ellipsizeMode: 'clip'   as const },
  ELLIPSIS: { alias: 'ellipsis', ellipsizeMode: 'tail'   as const },
  VISIBLE:  { alias: 'visible',  ellipsizeMode: null },
} as const;

export type HongTextOverflowKey = keyof typeof HongTextOverflow;

export function stringToHongTextOverflow(alias: string | null | undefined): HongTextOverflowEntry {
  return Object.values(HongTextOverflow).find(
    o => o.alias.toLowerCase() === (alias ?? '').toLowerCase()
  ) ?? HongTextOverflow.ELLIPSIS;
}

export function hongTextOverflowToAlias(overflow: HongTextOverflowEntry | null | undefined): string {
  return overflow?.alias ?? HongTextOverflow.ELLIPSIS.alias;
}
