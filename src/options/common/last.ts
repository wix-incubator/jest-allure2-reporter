import type { PropertyExtractorContext } from 'jest-allure2-reporter';

import { isPromiseLike } from '../../utils';

export const last = async <T>(
  context: PropertyExtractorContext<any, T[] | undefined>,
): Promise<T | undefined> => {
  const value = isPromiseLike(context.value)
    ? await context.value
    : context.value;
  return value?.at(-1);
};
