import type { MaybeNullish, PropertyExtractor } from 'jest-allure2-reporter';

import { composeExtractors2 } from './composeExtractors2';

export function composeExtractors3<Context, V, R>(
  a: PropertyExtractor<Context, R, R>,
  b: undefined | null,
  c: PropertyExtractor<Context, V, R>,
): PropertyExtractor<Context, V, R>;
export function composeExtractors3<Context, V, R, Rb>(
  a: PropertyExtractor<Context, R | Rb, R>,
  b: PropertyExtractor<Context, R, R | Rb>,
  c: PropertyExtractor<Context, V, R>,
): PropertyExtractor<Context, V, R>;
export function composeExtractors3<Context, V, R, Rb>(
  a: PropertyExtractor<Context, R | Rb, R>,
  b: MaybeNullish<PropertyExtractor<Context, R, R | Rb>>,
  c: PropertyExtractor<Context, V, R>,
): PropertyExtractor<Context, V, R> {
  return b ? composeExtractors2(composeExtractors2(a, b), c) : composeExtractors2(a, c);
}
