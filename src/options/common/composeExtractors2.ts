import type {
  PropertyExtractor,
  PropertyExtractorContext,
} from 'jest-allure2-reporter';

import { once } from '../../utils';
import type { MaybePromise } from '../types';

export function composeExtractors2<
  R,
  Ra = never,
  Rb = never,
  Context = {},
  V = MaybePromise<R>,
>(
  a: PropertyExtractor<R, Ra, Context, MaybePromise<R | Rb>> | undefined,
  b: PropertyExtractor<R, Rb, Context, V>,
): PropertyExtractor<R, Ra, Context, V> {
  if (!a) {
    return b as PropertyExtractor<R, Ra, Context, V>;
  }

  return (context) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { value, ...restContext } = context;
    const newContext = Object.defineProperty(restContext, 'value', {
      get: once(() => b(context)),
      enumerable: false,
    }) as unknown as PropertyExtractorContext<Context, MaybePromise<R | Rb>>;

    return a(newContext);
  };
}
