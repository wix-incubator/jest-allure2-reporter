import type {
  MaybeArray,
  MaybeNullish,
  MaybePromise,
  PropertyExtractorContext,
} from 'jest-allure2-reporter';

import { thruMaybePromise } from '../../utils';

export const last = <T>(
  context: PropertyExtractorContext<{}, MaybePromise<MaybeNullish<MaybeArray<T>>>>,
): MaybePromise<T | undefined> => {
  return thruMaybePromise<MaybeNullish<MaybeArray<T>>, T | undefined>(context.value, (value) => {
    if (Array.isArray(value)) {
      return value.at(-1);
    }

    return value ?? undefined;
  });
};
