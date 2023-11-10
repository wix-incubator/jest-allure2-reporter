import type { Link } from '@noomorph/allure-js-commons';
import type {
  LinksCustomizer,
  TestCaseExtractor,
  TestCaseExtractorContext,
} from 'jest-allure2-reporter';

export function aggregateLinkCustomizers(
  links: LinksCustomizer | undefined,
): TestCaseExtractor<Link[]> | undefined {
  if (!links || typeof links === 'function') {
    return links;
  }

  return (context: TestCaseExtractorContext<Link[]>) => {
    return context.value
      ?.map((link) => {
        const extractor = links[link.type ?? ''];
        return extractor ? extractor({ ...context, value: link }) : link;
      })
      ?.filter(Boolean) as Link[] | undefined;
  };
}
