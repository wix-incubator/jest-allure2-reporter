/* eslint-disable @typescript-eslint/no-explicit-any */

export function weakMemoize<F extends (argument: any) => any>(function_: F): F {
  const cache = new WeakMap<object, any>();

  const memoizedFunction = ((argument: any) => {
    if (argument == null) {
      return function_(argument);
    }

    if (!cache.has(argument)) {
      cache.set(argument, function_(argument));
    }

    return cache.get(argument)!;
  }) as F;

  return memoizedFunction;
}
