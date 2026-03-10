import type { ReturnKeyTypeOptions } from 'react-native';

export const HongKeyboardActionType = {
  GO:       { value: 'GO'       },
  SEARCH:   { value: 'SEARCH'   },
  SEND:     { value: 'SEND'     },
  NEXT:     { value: 'NEXT'     },
  DONE:     { value: 'DONE'     },
  PREVIOUS: { value: 'PREVIOUS' },
} as const;

export type HongKeyboardActionTypeEntry = (typeof HongKeyboardActionType)[keyof typeof HongKeyboardActionType];

export function hongKeyboardActionTypeToRN(action: HongKeyboardActionTypeEntry): ReturnKeyTypeOptions {
  switch (action.value) {
    case 'GO':       return 'go';
    case 'SEARCH':   return 'search';
    case 'SEND':     return 'send';
    case 'NEXT':     return 'next';
    case 'PREVIOUS': return 'default';
    default:         return 'done';
  }
}
