import type { PropertyExtractor } from 'jest-allure2-reporter';

import { composeExtractors2 } from './composeExtractors2';

export function composeExtractors3<R, Ra, Context, V>(
  a: PropertyExtractor<R, never, Context, R | Ra>,
  b: PropertyExtractor<R, Ra, Context, R> | undefined,
  c: PropertyExtractor<R, never, Context, V>,
): PropertyExtractor<R, never, Context, V> {
  if (!b) {
    return composeExtractors2(a, c);
  }

  const bc = composeExtractors2<R, Ra, never, Context, V>(b, c);
  const abc = composeExtractors2<R, never, Ra, Context, V>(a, bc);

  return abc;
}
