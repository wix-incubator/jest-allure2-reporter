/* eslint-disable unicorn/no-null */

type Maybe<T> = T | null | undefined;

export default function shallowEqualArrays(a: Maybe<unknown[]>, b: Maybe<unknown[]>) {
  if (a === b) {
    return true;
  }

  if (a == null || b == null) {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  // eslint-disable-next-line unicorn/no-array-callback-reference,unicorn/no-array-method-this-argument
  return a.every(isItemEqual, b);
}

function isItemEqual(this: unknown[], value: unknown, index: number) {
  return value === this[index];
}
