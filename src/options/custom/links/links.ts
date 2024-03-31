import type { Link, LinksCustomizer, PropertyExtractor } from 'jest-allure2-reporter';

import { appender, constant } from '../../common';

import { linksMap } from './linksMap';

export function links<Context>(
  customizer: undefined | null | LinksCustomizer<Context>,
): PropertyExtractor<Link[], never, Context> | undefined {
  if (customizer == null || typeof customizer === 'function') {
    return constant(customizer);
  }

  if (Array.isArray(customizer)) {
    return appender(customizer);
  }

  return linksMap(customizer);
}
