export default function isEmptyObject(value: unknown) {
  return value && typeof value === 'object' && Object.keys(value).length === 0;
}
