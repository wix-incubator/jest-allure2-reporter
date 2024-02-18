import type { JestAssertionError } from 'expect';

import { isObject } from './isObject';

export function isJestAssertionError(
  error: unknown,
): error is JestAssertionError {
  return (
    isObject(error) &&
    'matcherResult' in (error as unknown as JestAssertionError)
  );
}
