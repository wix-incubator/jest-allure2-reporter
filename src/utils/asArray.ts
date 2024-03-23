export function asArray<T extends string>(value: T | T[] | undefined): T[] {
  if (Array.isArray(value)) {
    return value;
  }

  return value == null ? [] : [value];
}
