import type {
  ResolvedTestCaseCustomizer,
  TestCaseCustomizer,
} from 'jest-allure2-reporter';

import {
  aggregateLabelCustomizers,
  aggregateLinkCustomizers,
  composeExtractors,
} from '../utils';

export function composeTestCaseCustomizers(
  base: ResolvedTestCaseCustomizer,
  custom: Partial<TestCaseCustomizer> | undefined,
): ResolvedTestCaseCustomizer {
  if (!custom) {
    return base;
  }

  return {
    hidden: composeExtractors(custom.hidden, base.hidden),
    historyId: composeExtractors(custom.historyId, base.historyId),
    fullName: composeExtractors(custom.fullName, base.fullName),
    name: composeExtractors(custom.name, base.name),
    description: composeExtractors(custom.description, base.description),
    descriptionHtml: composeExtractors(
      custom.descriptionHtml,
      base.descriptionHtml,
    ),
    start: composeExtractors(custom.start, base.start),
    stop: composeExtractors(custom.stop, base.stop),
    stage: composeExtractors(custom.stage, base.stage),
    status: composeExtractors(custom.status, base.status),
    statusDetails: composeExtractors(custom.statusDetails, base.statusDetails),
    attachments: composeExtractors(custom.attachments, base.attachments),
    parameters: composeExtractors(custom.parameters, base.parameters),
    labels: composeExtractors(
      aggregateLabelCustomizers(custom.labels),
      base.labels,
    ),
    links: composeExtractors(
      aggregateLinkCustomizers(custom.links),
      base.links,
    ),
  };
}
