// labels/simplifyLabelsMap.ts
import type { KeyedLabelCustomizer, Label, PropertyExtractor } from 'jest-allure2-reporter';

import { compactObject, mapValues } from '../../../utils';
import { compose2 } from '../../common';

import { resolveKeyedLabelCustomizer } from './resolveKeyedLabelCustomizer';
import { labelsFlattener } from './labelsFlattener';

export function simplifyLabelsMap<Context>(
  customizer: Record<string, KeyedLabelCustomizer<Context>>,
): Record<string, PropertyExtractor<Label[], never, Context>> {
  const result = mapValues(
    customizer,
    (
      value: KeyedLabelCustomizer<Context>,
      key: string,
    ): PropertyExtractor<Label[], never, Context> | undefined => {
      const ambiguousCustomizer = resolveKeyedLabelCustomizer<Context>(value, key);
      if (!ambiguousCustomizer) {
        return;
      }

      return compose2(labelsFlattener(key), ambiguousCustomizer);
    },
  );

  return compactObject(result) as Record<string, PropertyExtractor<Label[], never, Context>>;
}
