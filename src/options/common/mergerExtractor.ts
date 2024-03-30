import type { PropertyExtractor } from 'jest-allure2-reporter';

import { isPromiseLike } from '../../utils';

import { constantExtractor } from './constantExtractor';

export function mergerExtractor<R, Context>(
  maybeExtractor:
    | undefined
    | null
    | Partial<R>
    | PropertyExtractor<R | undefined, undefined, Context>,
): PropertyExtractor<R | undefined, never, Context> | undefined {
  if (maybeExtractor != null && typeof maybeExtractor === 'object') {
    return mergerExtractorStrict(maybeExtractor) as PropertyExtractor<
      R | undefined,
      never,
      Context
    >;
  }

  return constantExtractor(maybeExtractor);
}

export function mergerExtractorStrict<R, Context>(
  maybeExtractor: undefined | null | Partial<R> | PropertyExtractor<R | undefined, never, Context>,
): PropertyExtractor<R, never, Context> | undefined {
  if (maybeExtractor != null && typeof maybeExtractor === 'object') {
    const value = maybeExtractor as Partial<R>;
    return (context): R | Promise<R> => {
      const base: R | Promise<R> = context.value;
      return isPromiseLike(base) ? base.then((v) => ({ ...v, ...value })) : { ...base, ...value };
    };
  }

  const extractor = maybeExtractor as PropertyExtractor<R, undefined, Context>;
  return (context) => ({ ...context.value, ...extractor(context) });
}
