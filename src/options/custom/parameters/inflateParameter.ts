import type { Parameter } from 'jest-allure2-reporter';

import { processMaybePromise } from '../../../utils';

import type { ParameterOrPrimitive, ParameterOrPrimitiveInflator } from './types';
import { isParameter } from './isParameter';

export function inflateParameter<Context>(name: string): ParameterOrPrimitiveInflator<Context> {
  function repair(value: ParameterOrPrimitive): Parameter | undefined {
    if (value == null) {
      return;
    }

    if (isParameter(value)) {
      return value.value == null ? undefined : ({ ...value, name } as Parameter);
    }

    return { name, value };
  }

  return ({ value }) =>
    processMaybePromise<ParameterOrPrimitive, Parameter | undefined>(value, repair);
}
