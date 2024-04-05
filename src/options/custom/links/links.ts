import type {
  Link,
  LinksCustomizer,
  MaybeNullish,
  MaybePromise,
  PropertyExtractor,
} from 'jest-allure2-reporter';

import { appender, constant } from '../../common';

import { linksMap } from './linksMap';

export function links<Context>(
  customizer: MaybeNullish<LinksCustomizer<Context>>,
): PropertyExtractor<Context, MaybePromise<Link[]>> | undefined {
  if (customizer == null || typeof customizer === 'function') {
    return constant(customizer);
  }

  if (Array.isArray(customizer)) {
    return appender(customizer);
  }

  return linksMap(customizer);
}
