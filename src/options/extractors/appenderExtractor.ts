import type { PropertyExtractor } from 'jest-allure2-reporter';

import { isPromiseLike } from '../../utils';

import { optionalExtractor } from './optionalExtractor';

export function appenderExtractor<R, Context>(
  maybeExtractor:
    | undefined
    | null
    | R[]
    | PropertyExtractor<R[], never, Context>,
): PropertyExtractor<R[], never, Context> | undefined {
  if (maybeExtractor != null && Array.isArray(maybeExtractor)) {
    const value = maybeExtractor;

    return (context): R[] | Promise<R[]> => {
      const base: R[] | Promise<R[]> = context.value;

      return isPromiseLike(base)
        ? base.then((v) => [...v, ...value])
        : [...base, ...value];
    };
  }

  return optionalExtractor<R[], Context>(maybeExtractor);
}
