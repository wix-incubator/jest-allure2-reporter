export function once<T, F extends (...arguments_: unknown[]) => T>(
  function_: F,
): F {
  let result: T;
  let called = false;

  return function (this: unknown, ...arguments_: unknown[]) {
    if (!called) {
      called = true;
      result = function_.apply(this, arguments_);
    }

    return result;
  } as F;
}
