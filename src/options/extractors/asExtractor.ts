/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  PropertyCustomizer,
  PropertyExtractor,
} from 'jest-allure2-reporter';

import { isExtractor } from './isExtractor';

export function asExtractor<R, Ra = never, Context = {}, V = R>(
  maybeExtractor: PropertyCustomizer<R, Ra, Context, V>,
): PropertyExtractor<R, Ra, Context, V> {
  return isExtractor<R, Ra, Context, V>(maybeExtractor)
    ? maybeExtractor
    : () => maybeExtractor as R;
}

// export function asOptionalExtractor<R, Ra = never, Context = {}>(
//   maybeExtractor: PropertyCustomizer<R, Ra, Context, R>,
// ): PropertyExtractor<R, Ra, Context, R> {
//   return isExtractor<R, Ra, Context, R>(maybeExtractor)
//     ? maybeExtractor
//     : ({ value }) => (maybeExtractor as R) ?? value;
// }
