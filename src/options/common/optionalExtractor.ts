import type { PropertyExtractor } from 'jest-allure2-reporter';

import { isPromiseLike } from '../../utils';

import { isExtractor } from './isExtractor';

export function optionalExtractor<R, Context>(
  maybeExtractor:
    | undefined
    | null
    | R
    | PropertyExtractor<R, undefined, Context>,
): PropertyExtractor<R, never, Context> | undefined {
  if (maybeExtractor == null) {
    return;
  }

  if (isExtractor<R, undefined, unknown>(maybeExtractor)) {
    return (context): R | Promise<R> => {
      const value = maybeExtractor(context);

      return isPromiseLike(value)
        ? value.then<R>((v) => v ?? context.value)
        : value ?? context.value;
    };
  }

  const value = maybeExtractor as R;
  return (context) => {
    return value ?? context.value;
  };
}
