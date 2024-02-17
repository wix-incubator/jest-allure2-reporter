import type { JestAssertionError } from 'expect';

import { isError } from './isError';

export function isJestAssertionError(
  error: unknown,
): error is JestAssertionError {
  return isError(error) && 'matcherResult' in (error as JestAssertionError);
}
