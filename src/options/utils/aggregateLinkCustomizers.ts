import type { Link } from '@noomorph/allure-js-commons';
import type {
  Extractor,
  ExtractorContext,
  TestFileCustomizer,
  TestCaseCustomizer,
} from 'jest-allure2-reporter';

type Customizer = TestFileCustomizer | TestCaseCustomizer;

export function aggregateLinkCustomizers<C extends Customizer>(
  links: C['links'] | undefined,
): Extractor<Link[]> | undefined {
  if (!links || typeof links === 'function') {
    return links as Extractor<Link[]> | undefined;
  }

  return (context: ExtractorContext<Link[]>) => {
    return context.value
      ?.map((link) => {
        const extractor = links[link.type ?? ''];
        return extractor ? extractor({ ...context, value: link } as any) : link;
      })
      ?.filter(Boolean) as Link[] | undefined;
  };
}
