import type { KeyboardTypeOptions } from 'react-native';

export const HongKeyboardType = {
  TEXT:            { value: 'TEXT'            },
  NUMBER:          { value: 'NUMBER'          },
  PHONE:           { value: 'PHONE'           },
  EMAIL:           { value: 'EMAIL'           },
  PASSWORD:        { value: 'PASSWORD'        },
  NUMBER_PASSWORD: { value: 'NUMBER_PASSWORD' },
  URL:             { value: 'URL'             },
  DECIMAL:         { value: 'DECIMAL'         },
  ASCIITEXT:       { value: 'ASCIITEXT'       },
} as const;

export type HongKeyboardTypeEntry = (typeof HongKeyboardType)[keyof typeof HongKeyboardType];

export function hongKeyboardTypeToRN(type: HongKeyboardTypeEntry): KeyboardTypeOptions {
  switch (type.value) {
    case 'NUMBER':          return 'number-pad';
    case 'PHONE':           return 'phone-pad';
    case 'EMAIL':           return 'email-address';
    case 'PASSWORD':        return 'default';
    case 'NUMBER_PASSWORD': return 'number-pad';
    case 'URL':             return 'url';
    case 'DECIMAL':         return 'decimal-pad';
    case 'ASCIITEXT':       return 'ascii-capable';
    default:                return 'default';
  }
}

export function isPasswordType(type: HongKeyboardTypeEntry): boolean {
  return type.value === 'PASSWORD' || type.value === 'NUMBER_PASSWORD';
}
