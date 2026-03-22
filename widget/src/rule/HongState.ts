export enum HongState {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}

export function toHongState(value?: string | null): HongState {
  if (!value) return HongState.ENABLED;
  return Object.values(HongState).find(v => v === value) ?? HongState.ENABLED;
}

export function isEnabled(state?: HongState | null): boolean {
  if (state == null) return true;
  return state === HongState.ENABLED;
}
