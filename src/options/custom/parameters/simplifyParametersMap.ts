import type { KeyedParameterCustomizer } from 'jest-allure2-reporter';

import { compactObject, mapValues } from '../../../utils';
import * as extractors from '../../common';

import type { ParameterExtractor } from './types';
import { inflateParameter } from './inflateParameter';
import { resolveKeyedParameterCustomizer } from './resolveKeyedParameterCustomizer';

export function simplifyParametersMap<Context>(
  customizer: Record<string, KeyedParameterCustomizer<Context>>,
): Record<string, ParameterExtractor<Context>> {
  const result = mapValues(
    customizer,
    (
      value: KeyedParameterCustomizer<Context>,
      key: string,
    ): ParameterExtractor<Context> | undefined => {
      const ambiguousCustomizer = resolveKeyedParameterCustomizer<Context>(value, key);
      return ambiguousCustomizer
        ? extractors.compose2(inflateParameter(key), ambiguousCustomizer)
        : undefined;
    },
  );

  return compactObject(result) as Record<string, ParameterExtractor<Context>>;
}
