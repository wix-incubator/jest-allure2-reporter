import type {
  Extractor,
  ExtractorContext,
  TestRunCustomizer,
  TestFileCustomizer,
  TestCaseCustomizer,
} from 'jest-allure2-reporter';
import type { Link } from 'jest-allure2-reporter';

import { isPromiseLike } from '../../utils';

type Customizer = TestFileCustomizer | TestCaseCustomizer | TestRunCustomizer;

export function aggregateLinkCustomizers<C extends Customizer>(
  links: C['links'] | undefined,
): Extractor<Link[]> | undefined {
  if (!links || typeof links === 'function') {
    return links as Extractor<Link[]> | undefined;
  }

  return async (context: ExtractorContext<Link[]>) => {
    const value = isPromiseLike(context.value)
      ? await context.value
      : context.value;

    const promisedLinks =
      value?.map(async (link) => {
        const extractor = links[link.type ?? ''];
        return extractor
          ? await extractor({ ...context, value: link } as any)
          : link;
      }) ?? [];

    const filteredLinks = await Promise.all(promisedLinks);
    return filteredLinks.filter(Boolean);
  };
}
