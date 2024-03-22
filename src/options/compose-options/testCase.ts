import type { ReporterConfig, TestCasePropertyCustomizer } from 'jest-allure2-reporter';

import { composeExtractors } from '../extractors';

import { labels } from './labels';
import { links } from './links';

export function composeTestCasePropertyCustomizers(
  base: ReporterConfig['testRun'],
  custom: Partial<TestCasePropertyCustomizer> | undefined,
): typeof base;
export function composeTestCasePropertyCustomizers(
  base: ReporterConfig['testFile'],
  custom: Partial<TestCasePropertyCustomizer> | undefined,
): typeof base;
export function composeTestCasePropertyCustomizers(
  base: ReporterConfig['testCase'],
  custom: Partial<TestCasePropertyCustomizer> | undefined,
): typeof base;
export function composeTestCasePropertyCustomizers(
  base: ReporterConfig['testRun' | 'testFile' | 'testCase'],
  custom: Partial<TestCasePropertyCustomizer> | undefined,
): typeof base {
  if (!custom) {
    return base;
  }

  return {
    hidden: composeExtractors(custom.hidden, base.hidden),
    $: composeExtractors(custom.$, base.$),
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
      labels(custom.labels),
      base.labels,
    ),
    links: composeExtractors(
      links(custom.links),
      base.links,
    ),
  };
}
