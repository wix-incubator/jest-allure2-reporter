import type {
  MaybeNullish,
  MaybePromise,
  PropertyCustomizer,
  PropertyExtractor,
} from 'jest-allure2-reporter';

import { isPromiseLike } from '../../utils';

import { optionalExtractor } from './optionalExtractor';

export function mergerExtractor<Context, Value>(
  maybeExtractor: PropertyCustomizer<Context, Value, MaybeNullish<Value>>,
  fallbackValue?: Value,
): PropertyExtractor<Context, MaybePromise<Value>> | undefined {
  if (maybeExtractor == null) {
    return;
  }

  if (typeof maybeExtractor === 'object') {
    const value = maybeExtractor;
    return (context): MaybePromise<Value> => {
      const base = context.value;
      return isPromiseLike(base) ? base.then((v) => ({ ...v, ...value })) : { ...base, ...value };
    };
  }

  return optionalExtractor(maybeExtractor, fallbackValue);
}
