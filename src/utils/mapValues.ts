// mapValues.ts
export function mapValues<T extends object, R>(
  object: T,
  iteratee: (value: T[keyof T], key: keyof T) => R,
): Record<keyof T, R> {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [key, iteratee(value, key as keyof T)]),
  ) as Record<keyof T, R>;
}
