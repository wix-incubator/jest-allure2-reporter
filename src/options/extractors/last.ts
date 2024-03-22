import type { ExtractorContext } from 'jest-allure2-reporter';

import { isPromiseLike } from '../../utils';

export const last = async <T>(context: ExtractorContext<T[]>) => {
  const value = isPromiseLike(context.value)
    ? await context.value
    : context.value;
  return value?.at(-1);
};
