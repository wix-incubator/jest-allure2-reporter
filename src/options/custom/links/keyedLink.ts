import type {
  KeyedLinkCustomizer,
  Link,
  MaybePromise,
  PropertyExtractor,
} from 'jest-allure2-reporter';
import Handlebars from 'handlebars';

import { appender, compose2 } from '../../common';
import { asArray, thruMaybePromise } from '../../../utils';

export function keyedLink<Context>(
  value: KeyedLinkCustomizer<Context>,
  type: string,
): PropertyExtractor<Context, Link[], MaybePromise<Link[]>> | undefined {
  if (value == null) {
    return;
  }

  if (typeof value === 'string') {
    return linkFormatter(value);
  }

  const overrideType = createTypeOverride(type);

  if (typeof value === 'function') {
    return compose2(({ value }) => {
      return thruMaybePromise(thruMaybePromise(value, asArray), overrideType);
    }, value);
  }

  const links: Link[] = overrideType(Array.isArray(value) ? value : [value]);

  return appender(links);
}

function createTypeOverride(type: string): (links: Link[]) => Link[] {
  return (links) => links.map((link) => ({ ...link, type }));
}

function linkFormatter(format: string): PropertyExtractor<{}, Link[]> {
  const formatter = Handlebars.compile(format);

  return ({ value }) => {
    return value.map((link) => ({
      ...link,
      url: formatter(link),
    }));
  };
}
