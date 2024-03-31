import { format } from 'node:util';

import type { Link, PropertyExtractor } from 'jest-allure2-reporter';

import { compactArray, isPromiseLike, type MaybePromise } from '../../../utils';

import type { AmbiguousLinkValue } from './types';

export function linksFlattener<Context>(
  name: string,
): PropertyExtractor<Link[], never, Context, MaybePromise<AmbiguousLinkValue>> {
  function repair(value: string | Partial<Link>): Link | undefined {
    if (value == null) {
      return;
    }

    if (typeof value === 'string') {
      return { name, url: format(value, name) };
    }

    return value.url == null ? undefined : ({ ...value, name } as Link);
  }

  function repairMaybeArray(value: AmbiguousLinkValue): Link[] {
    return Array.isArray(value) ? compactArray(value.map(repair)) : compactArray([repair(value)]);
  }

  return ({ value }) =>
    isPromiseLike(value) ? value.then(repairMaybeArray) : repairMaybeArray(value);
}
