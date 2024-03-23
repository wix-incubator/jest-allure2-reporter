export function compactObject<T extends object>(object: T): Partial<T> {
  return Object.entries(object).reduce((result, [key, value]) => {
    if (value !== undefined) {
      result[key as keyof T] = value;
    }
    return result;
  }, {} as Partial<T>);
}
