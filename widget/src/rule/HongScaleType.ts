import type { ImageResizeMode } from 'react-native';

export const HongScaleType = {
  FIT_START:     { value: 'fit_start'     },
  FIT_CENTER:    { value: 'fit_center'    },
  FIT_END:       { value: 'fit_end'       },
  CENTER_CROP:   { value: 'center_crop'   },
  CENTER_INSIDE: { value: 'center_inside' },
} as const;

export type HongScaleTypeEntry = (typeof HongScaleType)[keyof typeof HongScaleType];

export function hongScaleTypeToResizeMode(scaleType: HongScaleTypeEntry): ImageResizeMode {
  switch (scaleType.value) {
    case 'center_crop':   return 'cover';
    case 'fit_center':    return 'contain';
    case 'fit_start':     return 'contain';
    case 'fit_end':       return 'contain';
    case 'center_inside': return 'contain';
    default:              return 'contain';
  }
}
