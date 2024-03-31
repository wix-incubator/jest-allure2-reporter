import type { KeyedParameterCustomizer } from 'jest-allure2-reporter';

import { compactObject, mapValues } from '../../../utils';
import * as extractors from '../../common';

import type { SimplifiedParameterCustomizer } from './types';
import { parametersFlattener } from './parametersFlattener';
import { resolveKeyedParameterCustomizer } from './resolveKeyedParameterCustomizer';

export function simplifyParametersMap<Context>(
  customizer: Record<string, KeyedParameterCustomizer<Context>>,
): Record<string, SimplifiedParameterCustomizer<Context>> {
  const result = mapValues(
    customizer,
    (
      value: KeyedParameterCustomizer<Context>,
      key: string,
    ): SimplifiedParameterCustomizer<Context> | undefined => {
      const ambiguousCustomizer = resolveKeyedParameterCustomizer<Context>(value, key);
      if (!ambiguousCustomizer) {
        return;
      }

      return extractors.compose2(parametersFlattener(key), ambiguousCustomizer);
    },
  );

  return compactObject(result) as Record<string, SimplifiedParameterCustomizer<Context>>;
}
