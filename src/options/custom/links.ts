import type { LinksCustomizer, PropertyExtractor } from 'jest-allure2-reporter';
import type { Link } from 'jest-allure2-reporter';

import { constant } from '../common';

export function links<Context>(
  customizer: undefined | null | LinksCustomizer<Context>,
): PropertyExtractor<Link[], never, Context> | undefined {
  if (customizer !== null && typeof customizer === 'object') {
    return linksMap(customizer);
  }

  return constant(customizer);
}

// return async (context: ExtractorContext<Link[]>) => {
//   const value = isPromiseLike(context.value)
//     ? await context.value
//     : context.value;
//
//   const promisedLinks =
//     value?.map(async (link) => {
//       const extractor = links[link.type ?? ''];
//       return extractor
//         ? await extractor({ ...context, value: link } as any)
//         : link;
//     }) ?? [];
//
//   const filteredLinks = await Promise.all(promisedLinks);
//   return filteredLinks.filter(Boolean);
// };
