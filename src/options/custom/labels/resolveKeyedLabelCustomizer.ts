// labels/resolveKeyedLabelCustomizer.ts
import type { KeyedLabelCustomizer, PropertyExtractor } from 'jest-allure2-reporter';

import { constant } from '../../common';

export function resolveKeyedLabelCustomizer<Context>(
  value: KeyedLabelCustomizer<Context>,
  key: string,
): PropertyExtractor<unknown, never, Context> | undefined {
  if (value == null) {
    return;
  }

  if (typeof value === 'function') {
    return value as PropertyExtractor<unknown, never, Context>;
  }

  return constant(value);
}
