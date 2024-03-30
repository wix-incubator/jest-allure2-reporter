import type { PropertyCustomizer, PropertyExtractor } from 'jest-allure2-reporter';

import { isExtractor } from './isExtractor';

export function constantExtractor<R, Ra = never, Context = {}, V = R | Promise<R>>(
  maybeExtractor: undefined | null | R | Ra | PropertyCustomizer<R, Ra, Context, V>,
): PropertyExtractor<R, Ra, Context, V> | undefined {
  if (maybeExtractor == null) {
    return undefined;
  }

  return isExtractor<R, Ra, Context, V>(maybeExtractor)
    ? maybeExtractor
    : () => maybeExtractor as R | Ra | Promise<R | Ra>;
}
