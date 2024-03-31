import type { KeyedParameterCustomizer } from 'jest-allure2-reporter';

import * as extractors from '../../common';

import type { AmbiguousParameterCustomizer } from './types';
import { isParameter } from './isParameter';

export function resolveKeyedParameterCustomizer<Context>(
  value: KeyedParameterCustomizer<Context>,
  key: string,
): AmbiguousParameterCustomizer<Context> | undefined {
  if (value == null) {
    return;
  }

  if (typeof value === 'function') {
    return value as AmbiguousParameterCustomizer<Context>;
  }

  return extractors.constant([
    isParameter(value)
      ? {
          ...value,
          name: key,
        }
      : { name: key, value },
  ]);
}
