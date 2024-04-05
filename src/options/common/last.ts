import type { MaybeNullish, MaybePromise, PropertyExtractorContext } from 'jest-allure2-reporter';

import { isPromiseLike } from '../../utils';

export const last = async <T>(
  context: PropertyExtractorContext<{}, MaybePromise<MaybeNullish<T[]>>>,
): Promise<T | undefined> => {
  const value = isPromiseLike(context.value) ? await context.value : context.value;
  return value?.at(-1);
};
