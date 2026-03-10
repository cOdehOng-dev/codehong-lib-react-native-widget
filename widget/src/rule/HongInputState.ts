export const HongInputState = {
  ENABLE: 'ENABLE',
  DISABLE: 'DISABLE',
} as const;

export type HongInputStateEntry = (typeof HongInputState)[keyof typeof HongInputState];
