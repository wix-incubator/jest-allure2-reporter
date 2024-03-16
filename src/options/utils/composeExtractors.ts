import type { Extractor, ExtractorContext } from 'jest-allure2-reporter';

export function composeExtractors<T, C extends ExtractorContext<T>>(
  a: Extractor<T, C> | undefined,
  b: Extractor<T, C>,
): Extractor<T, C> {
  return a ? async (context) => a({ ...context, value: await b(context) }) : b;
}
