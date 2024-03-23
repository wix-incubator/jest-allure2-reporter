import type {
  PropertyExtractor,
  PropertyExtractorContext,
} from 'jest-allure2-reporter';

import { once } from '../../utils';

export function composeExtractors2<
  R,
  Ra = never,
  Rb = never,
  Context = {},
  V = R,
>(
  a: PropertyExtractor<R, Ra, Context, R | Rb> | undefined,
  b: PropertyExtractor<R, Rb, Context, V>,
): PropertyExtractor<R, Ra, Context, V> {
  if (!a) {
    return b as PropertyExtractor<R, Ra, Context, V>;
  }

  return (context) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { value, ...newContext } = context;
    Object.defineProperty(newContext, 'value', {
      get: once(() => b(context)),
      enumerable: true,
    });

    return a(newContext as PropertyExtractorContext<Context, R>);
  };
}
