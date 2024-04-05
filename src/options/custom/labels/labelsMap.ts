// labels/labelsMap.ts
import type { KeyedLabelCustomizer, Label, PropertyExtractor } from 'jest-allure2-reporter';

import { groupBy, uniq } from '../../../utils';

import { simplifyLabelsMap } from './simplifyLabelsMap';

export function labelsMap<Context>(
  customizer: Record<string, KeyedLabelCustomizer<Context>>,
): PropertyExtractor<Label[], Context> {
  const simplifiedCustomizer = simplifyLabelsMap(customizer);
  const customizerKeys = Object.keys(simplifiedCustomizer);

  return async (context) => {
    const labels = groupBy(await context.value, 'name');
    const keys = uniq([...customizerKeys, ...Object.keys(labels)]);
    const batches: Label[][] = await Promise.all(
      keys.map((key) => {
        const keyedContext = { ...context, value: labels[key] ?? [] };
        const keyedCustomizer = simplifiedCustomizer[key];
        return keyedCustomizer ? keyedCustomizer(keyedContext) : keyedContext.value;
      }),
    );

    return batches.flat();
  };
}
