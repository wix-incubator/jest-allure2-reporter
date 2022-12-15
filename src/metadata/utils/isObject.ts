export default function isObject(item: unknown): item is object {
  return typeof item === 'object' && item !== null;
}
