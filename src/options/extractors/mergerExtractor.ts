import type { PropertyExtractor } from 'jest-allure2-reporter';

import { isPromiseLike } from '../../utils';

import { constantExtractor } from './constantExtractor';

export function mergerExtractor<R, Context>(
  maybeExtractor:
    | undefined
    | null
    | Partial<R>
    | PropertyExtractor<R, never, Context>,
): PropertyExtractor<R, never, Context> | undefined {
  if (maybeExtractor != null && typeof maybeExtractor === 'object') {
    const value = maybeExtractor as Partial<R>;
    return (context): R | Promise<R> => {
      const base: R | Promise<R> = context.value;
      return isPromiseLike(base)
        ? base.then((v) => ({ ...v, ...value }))
        : { ...base, ...value };
    };
  }

  return constantExtractor<R, never, Context>(maybeExtractor);
}
