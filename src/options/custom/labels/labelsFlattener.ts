// labels/labelsFlattener.ts
import type { Label, PropertyExtractor } from 'jest-allure2-reporter';

import { compactArray, isPromiseLike, type MaybePromise } from '../../../utils';

import type { AmbiguousLabelValue } from './types';

export function labelsFlattener<Context>(
  name: string,
): PropertyExtractor<Label[], never, Context, MaybePromise<AmbiguousLabelValue>> {
  function repair(value: string | Partial<Label>): Label | undefined {
    if (value == null) {
      return;
    }

    if (typeof value === 'string') {
      return { name, value };
    }

    return value.value == null ? undefined : ({ ...value, name } as Label);
  }

  function repairMaybeArray(value: AmbiguousLabelValue): Label[] {
    return Array.isArray(value) ? compactArray(value.map(repair)) : compactArray([repair(value)]);
  }

  return ({ value }) =>
    isPromiseLike(value) ? value.then(repairMaybeArray) : repairMaybeArray(value);
}
