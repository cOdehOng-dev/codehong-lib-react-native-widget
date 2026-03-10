export interface HongRadiusInfo {
  all?: number;
  top?: number;
  bottom?: number;
  topLeft?: number;
  topRight?: number;
  bottomLeft?: number;
  bottomRight?: number;
}

export const defaultHongRadiusInfo = (): HongRadiusInfo => ({
  all: 0,
  top: 0,
  bottom: 0,
  topLeft: 0,
  topRight: 0,
  bottomLeft: 0,
  bottomRight: 0,
});

export interface HongBorderRadiusStyle {
  borderTopLeftRadius: number;
  borderTopRightRadius: number;
  borderBottomLeftRadius: number;
  borderBottomRightRadius: number;
}

export function hongRadiusToStyle(
  info: HongRadiusInfo | undefined,
  useShapeCircle?: boolean
): HongBorderRadiusStyle {
  if (useShapeCircle) {
    return {
      borderTopLeftRadius: 9999,
      borderTopRightRadius: 9999,
      borderBottomLeftRadius: 9999,
      borderBottomRightRadius: 9999,
    };
  }

  const resolve = (corner: number | undefined, side: number | undefined): number => {
    if ((info?.all ?? 0) > 0) return info!.all!;
    return corner ?? side ?? 0;
  };

  return {
    borderTopLeftRadius: resolve(info?.topLeft, info?.top),
    borderTopRightRadius: resolve(info?.topRight, info?.top),
    borderBottomLeftRadius: resolve(info?.bottomLeft, info?.bottom),
    borderBottomRightRadius: resolve(info?.bottomRight, info?.bottom),
  };
}
