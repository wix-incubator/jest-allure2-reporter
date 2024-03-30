import type { TestCaseCustomizer, TestRunExtractorContext } from 'jest-allure2-reporter';

import * as custom from '../custom';
import { compose2 } from '../common';

export const testRun: TestCaseCustomizer<TestRunExtractorContext> = {
  ignored: ({ aggregatedResult }) => aggregatedResult.numFailedTestSuites > 0,
  historyId: ({ result }) => result.fullName ?? String(Math.random()),
  fullName: async ({ $ }) => (await $.manifest((x) => x.name)) ?? '',
  displayName: () => '(test run)',
  description: ({ testRunMetadata }) => testRunMetadata.description?.join('\n\n') ?? '',
  descriptionHtml: async ({ $, result }) => $.markdown2html((await result.description) ?? ''),
  start: ({ aggregatedResult }) => aggregatedResult.startTime,
  stop: () => Date.now(),
  stage: ({ aggregatedResult }) => (aggregatedResult.wasInterrupted ? 'interrupted' : 'finished'),
  status: ({ aggregatedResult }) =>
    aggregatedResult.numFailedTestSuites > 0 ? 'failed' : 'passed',
  statusDetails: ({ testRunMetadata }) => testRunMetadata.statusDetails,
  attachments: ({ testRunMetadata }) => testRunMetadata.attachments ?? [],
  parameters: compose2(
    custom.parameters({
      'Suites passed': ({ aggregatedResult }) => aggregatedResult.numPassedTestSuites,
      'Suites failed': ({ aggregatedResult }) => aggregatedResult.numFailedTestSuites,
      'Suites broken': ({ aggregatedResult }) => aggregatedResult.numRuntimeErrorTestSuites,
      'Suites pending': ({ aggregatedResult }) => aggregatedResult.numPendingTestSuites,
    }),
    ({ testRunMetadata }) => testRunMetadata.parameters ?? [],
  ),
  labels: compose2(
    custom.labels({
      suite: '(test file execution)',
    }),
    ({ testRunMetadata }) => testRunMetadata.labels ?? [],
  ),
  links: ({ testRunMetadata }) => testRunMetadata.links ?? [],
};
