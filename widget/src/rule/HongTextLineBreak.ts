export interface HongTextLineBreakEntry {
  alias: string;
}

export const HongTextLineBreak = {
  DEFAULT:  { alias: 'default'  },
  SYLLABLE: { alias: 'syllable' },
  SPACE:    { alias: 'space'    },
} as const;

export type HongTextLineBreakKey = keyof typeof HongTextLineBreak;

export function stringToHongTextLineBreak(alias: string | null | undefined): HongTextLineBreakEntry {
  return Object.values(HongTextLineBreak).find(
    l => l.alias.toLowerCase() === (alias ?? '').toLowerCase()
  ) ?? HongTextLineBreak.DEFAULT;
}

export function hongTextLineBreakToAlias(lineBreak: HongTextLineBreakEntry | null | undefined): string {
  return lineBreak?.alias ?? HongTextLineBreak.DEFAULT.alias;
}
