import type { MaybeNullish, MaybePromise, PropertyExtractorContext } from 'jest-allure2-reporter';

import { thruMaybePromise } from '../../utils';

export const last = <T>(
  context: PropertyExtractorContext<{}, MaybePromise<MaybeNullish<T[]>>>,
): MaybePromise<T | undefined> => {
  return thruMaybePromise<MaybeNullish<T[]>, T | undefined>(context.value, (value) =>
    value?.at(-1),
  );
};
