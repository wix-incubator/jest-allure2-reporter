import type { Extractor, ExtractorContext } from 'jest-allure2-reporter';

import { once } from '../../utils';

export function composeExtractors<T, C extends ExtractorContext<T>>(
  a: Extractor<T, C> | undefined,
  b: Extractor<T, C>,
): Extractor<T, C> {
  if (!a) {
    return b;
  }

  return (context: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { value, ...newContext } = context;
    Object.defineProperty(newContext, 'value', {
      get: once(() => b(context)),
      enumerable: true,
    });

    return a(newContext as typeof context);
  };
}
