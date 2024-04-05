import type { KeyedLinkCustomizer, Link, PropertyExtractor } from 'jest-allure2-reporter';

import { groupBy, uniq } from '../../../utils';

import { simplifyLinksMap } from './simplifyLinksMap';

export function linksMap<Context>(
  customizer: Record<string, KeyedLinkCustomizer<Context>>,
): PropertyExtractor<Link[], Context> {
  const simplifiedCustomizer = simplifyLinksMap(customizer);
  const customizerKeys = Object.keys(simplifiedCustomizer);

  return async (context) => {
    const links = groupBy(await context.value, 'name');
    const keys = uniq([...customizerKeys, ...Object.keys(links)]);
    const batches: Link[][] = await Promise.all(
      keys.map((key) => {
        const keyedContext = { ...context, value: links[key] ?? [] };
        const keyedCustomizer = simplifiedCustomizer[key];
        return keyedCustomizer ? keyedCustomizer(keyedContext) : keyedContext.value;
      }),
    );

    return batches.flat();
  };
}
