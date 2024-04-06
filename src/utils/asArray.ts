import type { MaybeArray, MaybeNullish } from 'jest-allure2-reporter';

export function asArray<T>(value: MaybeNullish<MaybeArray<T>>): T[] {
  if (Array.isArray(value)) {
    return value;
  }

  return value == null ? [] : [value];
}
