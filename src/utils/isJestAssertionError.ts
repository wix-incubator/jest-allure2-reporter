import type { JestAssertionError } from 'expect';
import _ from 'lodash';

export function isJestAssertionError(
  error: unknown,
): error is JestAssertionError {
  return (
    _.isObject(error) &&
    'matcherResult' in (error as unknown as JestAssertionError)
  );
}
