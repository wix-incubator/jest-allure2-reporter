import type { KeyedLinkCustomizer, Link, PropertyExtractor } from 'jest-allure2-reporter';

import { constant } from '../../common';

export function resolveKeyedLinkCustomizer<Context>(
  value: KeyedLinkCustomizer<Context>,
  key: string,
): PropertyExtractor<unknown, Context> | undefined {
  if (value == null) {
    return;
  }

  if (typeof value === 'function') {
    return value as PropertyExtractor<unknown, Context>;
  }

  return constant([
    typeof value === 'string'
      ? { name: key, value }
      : {
          ...(value as Link),
          name: key,
        },
  ]);
}
