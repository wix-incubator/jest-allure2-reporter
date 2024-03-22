/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Extractor } from 'jest-allure2-reporter';

import { isPromiseLike } from '../../utils';

import { isExtractor } from './isExtractor';

/**
 * Resolves the unknown value either as an extractor or it
 * builds a fallback extractor that returns the given value.
 *
 * Since Allure 2 has a quirky convention that the first value
 * in an array takes precedence, we on purpose put the custom
 * value first and the default value second.
 *
 * The fallback extractor is capable both of merging arrays and
 * defaulting the values. The former is useful for tags, the latter
 * for the rest of the labels which don't support multiple occurrences.
 */
export function asExtractor<T, Ta = never>(
  maybeExtractor: T | Ta | Extractor<T, Ta>,
): Extractor<T, Ta> {
  if (isExtractor<T, Ta>(maybeExtractor)) {
    return maybeExtractor;
  }

  const value = maybeExtractor;
  const extractor = (async ({ value: maybePromise }) => {
    const baseValue = isPromiseLike(maybePromise)
      ? await maybePromise
      : maybePromise;

    if (Array.isArray(baseValue)) {
      return Array.isArray(value)
        ? [...baseValue, ...value]
        : [...baseValue, value];
    }

    return value ?? baseValue;
  }) as Extractor<T, Ta>;

  return extractor;
}
