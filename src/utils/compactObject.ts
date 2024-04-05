export function compactObject<V>(object: Record<string, V | undefined>): Record<string, V> {
  return Object.entries(object).reduce((result: Record<string, V>, [key, value]) => {
    if (value !== undefined) {
      result[key] = value;
    }
    return result;
  }, {});
}
