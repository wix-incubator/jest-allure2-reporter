import type { Extractor, ExtractorContext } from './ReporterOptions';

export function composeExtractors<T, C extends ExtractorContext<T>>(
  a: Extractor<T, C> | undefined,
  b: Extractor<T, C>,
): Extractor<T, C> {
  return a ? (context) => a({ ...context, value: b(context) }) : b;
}
