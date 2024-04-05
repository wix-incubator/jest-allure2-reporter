import type { KeyedLinkCustomizer, Link, PropertyExtractor } from 'jest-allure2-reporter';

import { compactObject, mapValues } from '../../../utils';
import { compose2 } from '../../common';

import { resolveKeyedLinkCustomizer } from './resolveKeyedLinkCustomizer';
import { linksFlattener } from './linksFlattener';

export function simplifyLinksMap<Context>(
  customizer: Record<string, KeyedLinkCustomizer<Context>>,
): Record<string, PropertyExtractor<Link[], Context>> {
  const result = mapValues(
    customizer,
    (
      value: KeyedLinkCustomizer<Context>,
      key: string,
    ): PropertyExtractor<Link[], Context> | undefined => {
      const ambiguousCustomizer = resolveKeyedLinkCustomizer<Context>(value, key);
      if (!ambiguousCustomizer) {
        return;
      }

      return compose2(linksFlattener(key), ambiguousCustomizer);
    },
  );

  return compactObject(result);
}
