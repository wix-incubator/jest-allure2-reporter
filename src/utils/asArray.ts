export function asArray<T extends string>(value: T | T[] | undefined): T[] {
  if (Array.isArray(value)) {
    return value.length > 0 ? value : [];
  } else {
    return value ? [value] : [];
  }
}
