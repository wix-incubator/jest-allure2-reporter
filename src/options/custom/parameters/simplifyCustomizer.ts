import type { KeyedParameterCustomizer } from 'jest-allure2-reporter';

import { compactObject, mapValues } from '../../../utils';
import * as extractors from '../../common';

import type { SimplifiedParameterCustomizer } from './types';
import { createFlattener } from './createFlattener';
import { resolveAmbiguousCustomizer } from './resolveAmbiguousCustomizer';

export function simplifyCustomizer<Context>(
  customizer: Record<string, KeyedParameterCustomizer<Context>>,
): Record<string, SimplifiedParameterCustomizer<Context>> {
  const result = mapValues(
    customizer,
    (
      value: KeyedParameterCustomizer<Context>,
      key: string,
    ): SimplifiedParameterCustomizer<Context> | undefined => {
      const ambiguousCustomizer = resolveAmbiguousCustomizer<Context>(value, key);
      if (!ambiguousCustomizer) {
        return;
      }

      return extractors.compose2(createFlattener(key), ambiguousCustomizer);
    },
  );

  return compactObject(result) as Record<string, SimplifiedParameterCustomizer<Context>>;
}
