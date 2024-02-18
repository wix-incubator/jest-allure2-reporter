export function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(
    value != null && (typeof value === 'object' || typeof value === 'function'),
  );
}
