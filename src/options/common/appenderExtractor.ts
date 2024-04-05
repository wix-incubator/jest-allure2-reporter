import type {
  MaybeNullish,
  MaybePromise,
  PropertyCustomizer,
  PropertyExtractor,
} from 'jest-allure2-reporter';

import { isPromiseLike } from '../../utils';

import { optionalExtractor } from './optionalExtractor';

export function appenderExtractor<Context, R>(
  maybeExtractor: PropertyCustomizer<Context, R[], MaybeNullish<R[]>>,
): PropertyExtractor<Context, MaybePromise<R[]>> | undefined {
  if (maybeExtractor != null && Array.isArray(maybeExtractor)) {
    const value = maybeExtractor;

    return (context): R[] | Promise<R[]> => {
      const base: R[] | Promise<R[]> = context.value;

      return isPromiseLike(base) ? base.then((v) => [...v, ...value]) : [...base, ...value];
    };
  }

  return optionalExtractor<Context, R[]>(maybeExtractor);
}
