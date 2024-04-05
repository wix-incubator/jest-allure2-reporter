import type {
  MaybeNullish,
  MaybePromise,
  PropertyCustomizer,
  PropertyExtractor,
} from 'jest-allure2-reporter';

import { isPromiseLike } from '../../utils';

import { isExtractor } from './isExtractor';

export function optionalExtractor<Context, Value>(
  maybeExtractor: PropertyCustomizer<Context, Value, MaybeNullish<Value>>,
  fallback?: Value,
): PropertyExtractor<Context, MaybePromise<Value>> | undefined {
  if (maybeExtractor == null) {
    return;
  }

  if (
    isExtractor<Context, MaybePromise<Value>, MaybePromise<MaybeNullish<Value>>>(maybeExtractor)
  ) {
    return (context): Value | Promise<Value> => {
      const value = maybeExtractor(context);

      return isPromiseLike(value)
        ? value.then<Value>((v) => v ?? fallback ?? context.value)
        : value ?? fallback ?? context.value;
    };
  }

  const value = maybeExtractor as Value;
  return (context) => {
    return value ?? context.value;
  };
}
