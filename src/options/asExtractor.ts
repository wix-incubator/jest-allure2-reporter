import type { Extractor } from './ReporterOptions';

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
export function asExtractor<R, E extends Extractor<any, any, R>>(
  value: R | E | undefined,
): E | undefined {
  if (value === undefined) {
    return undefined;
  }

  return (
    typeof value === 'function'
      ? value
      : ({ value: customValue }) => {
          if (Array.isArray(customValue)) {
            return Array.isArray(value)
              ? [...customValue, ...value]
              : [...customValue, value];
          } else {
            return customValue ?? value;
          }
        }
  ) as E;
}
