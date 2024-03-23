import type { TestCaseCustomizer } from 'jest-allure2-reporter';

import type { TestCaseCompositeExtractor } from '../types';

import { labels } from './labels';
import { links } from './links';

export function composeTestCasePropertyCustomizers<Context>(
  custom: TestCaseCustomizer<Context> | undefined,
  base: TestCaseCompositeExtractor<Context>,
): TestCaseCompositeExtractor<Context> {
  if (!custom) {
    return base;
  }

  return {
    hidden: composeExtractors2(custom.hidden, base.hidden),
    historyId: composeExtractors2(custom.historyId, base.historyId),
    fullName: composeExtractors2(custom.fullName, base.fullName),
    displayName: composeExtractors2(custom.displayName, base.displayName),
    description: composeExtractors2(custom.description, base.description),
    descriptionHtml: composeExtractors2(
      custom.descriptionHtml,
      base.descriptionHtml,
    ),
    start: composeExtractors2(custom.start, base.start),
    stop: composeExtractors2(custom.stop, base.stop),
    stage: composeExtractors2(custom.stage, base.stage),
    status: composeExtractors2(custom.status, base.status),
    statusDetails: composeExtractors2(custom.statusDetails, base.statusDetails),
    attachments: composeExtractors2(custom.attachments, base.attachments),
    parameters: composeExtractors2(custom.parameters, base.parameters),
    labels: composeExtractors2(labels(custom.labels), base.labels),
    links: composeExtractors2(links(custom.links), base.links),
  };
}
