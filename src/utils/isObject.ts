export function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object');
}
