export const HongLayoutParam = {
  MATCH_PARENT: { value: -1, paramName: 'MATCH_PARENT' },
  WRAP_CONTENT: { value: -2, paramName: 'WRAP_CONTENT' },
} as const;

export type HongLayoutParamKey = keyof typeof HongLayoutParam;

/**
 * Android LayoutParam 값(숫자)을 React Native dimension으로 변환합니다.
 * -1(MATCH_PARENT) → undefined ('100%' 대신 flex:1 을 사용해야 할 경우도 있으므로 호출처에서 처리)
 * -2(WRAP_CONTENT) → undefined
 * 그 외 양수 → 해당 dp 값
 */
export function layoutParamToStyle(
  value: number
): number | `${number}%` | undefined {
  if (value === HongLayoutParam.MATCH_PARENT.value) return '100%';
  if (value === HongLayoutParam.WRAP_CONTENT.value) return undefined;
  return value;
}

export function isMatchParent(value: number): boolean {
  return value === HongLayoutParam.MATCH_PARENT.value;
}

export function isWrapContent(value: number): boolean {
  return value === HongLayoutParam.WRAP_CONTENT.value;
}

export function paramNameToValue(name: string | null | undefined): number {
  if (name === HongLayoutParam.MATCH_PARENT.paramName) return HongLayoutParam.MATCH_PARENT.value;
  return HongLayoutParam.WRAP_CONTENT.value;
}
