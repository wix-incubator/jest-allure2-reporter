import type {
  KeyedLinkCustomizer,
  Link,
  MaybePromise,
  PropertyExtractor,
} from 'jest-allure2-reporter';

import {
  compactObject,
  groupBy,
  mapValues,
  maybePromiseAll,
  thruMaybePromise,
  uniq,
} from '../../../utils';

import { keyedLink } from './keyedLink';

export function linksMap<Context>(
  customizer: Record<string, KeyedLinkCustomizer<Context>>,
): PropertyExtractor<Context, MaybePromise<Link[]>> {
  const simplifiedCustomizer = simplifyLinksMap(customizer);
  const customizerKeys = Object.keys(simplifiedCustomizer);

  return async (context) => {
    return thruMaybePromise<Link[]>(context.value, (value) => {
      const links = groupBy(value, 'type');
      const keys = uniq([...customizerKeys, ...Object.keys(links)]);
      const batches: MaybePromise<Link[]>[] = keys.map((key) => {
        const keyedContext = { ...context, value: links[key] ?? [] };
        const keyedCustomizer = simplifiedCustomizer[key];
        return keyedCustomizer ? keyedCustomizer(keyedContext) : keyedContext.value;
      });

      return maybePromiseAll<Link[], Link[]>(batches, (batches) => batches.flat());
    });
  };
}

function simplifyLinksMap<Context>(
  customizer: Record<string, KeyedLinkCustomizer<Context>>,
): Record<string, PropertyExtractor<Context, Link[], MaybePromise<Link[]>>> {
  return compactObject(mapValues(customizer, (value, key) => keyedLink<Context>(value, key)));
}
