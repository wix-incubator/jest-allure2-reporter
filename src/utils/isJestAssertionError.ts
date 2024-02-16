import type { JestAssertionError } from 'expect';

export function isJestAssertionError(
  error: unknown,
): error is JestAssertionError {
  return error ? 'matcherResult' in (error as JestAssertionError) : false;
}
