import type { Parameter, Primitive, PropertyExtractor } from 'jest-allure2-reporter';

import type { MaybePromise } from '../../types';
import { compactArray, isPromiseLike } from '../../../utils';

import type { AmbiguousParameterValue } from './types';
import { isParameter } from './isParameter';

export function createFlattener<Context>(
  name: string,
): PropertyExtractor<Parameter[], never, Context, MaybePromise<AmbiguousParameterValue>> {
  function repair(value: Primitive | Partial<Parameter>): Parameter | undefined {
    if (value == null) {
      return;
    }

    if (isParameter(value)) {
      return value.value == null ? undefined : ({ ...value, name } as Parameter);
    }

    return { name, value };
  }

  function repairMaybeArray(value: AmbiguousParameterValue): Parameter[] {
    return Array.isArray(value) ? compactArray(value.map(repair)) : compactArray([repair(value)]);
  }

  return ({ value }) =>
    isPromiseLike(value) ? value.then(repairMaybeArray) : repairMaybeArray(value);
}
