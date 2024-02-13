export function last<T>(array: T[]): T | undefined {
  // eslint-disable-next-line unicorn/prefer-at
  return array[array.length - 1];
}
