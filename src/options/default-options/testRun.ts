import type { ReporterConfig } from 'jest-allure2-reporter';

const fullName: ReporterConfig['testRun']['fullName'] = async ({ $ }) =>
  (await $.manifest((x) => x.name)) ?? '';

export const testRun: ReporterConfig['testRun'] = {
  hidden: ({ aggregatedResult }) => aggregatedResult.numFailedTestSuites > 0,
  $: ({ $ }) => $,
  historyId: fullName,
  fullName,
  name: () => '(test run)',
  description: () => void 0,
  descriptionHtml: () => void 0,
  start: ({ aggregatedResult }) => aggregatedResult.startTime,
  stop: () => Date.now(),
  stage: ({ aggregatedResult }) =>
    aggregatedResult.wasInterrupted ? 'interrupted' : 'finished',
  status: ({ aggregatedResult }) =>
    aggregatedResult.numFailedTestSuites > 0 ? 'failed' : 'passed',
  statusDetails: () => void 0,
  attachments: () => void 0,
  parameters: ({ aggregatedResult }) => [
    {
      name: 'Suites passed',
      value: `${aggregatedResult.numPassedTestSuites}`,
    },
    {
      name: 'Suites failed',
      value: `${aggregatedResult.numFailedTestSuites}`,
    },
    {
      name: 'Suites broken',
      value: `${aggregatedResult.numRuntimeErrorTestSuites}`,
    },
    {
      name: 'Suites pending',
      value: `${aggregatedResult.numPendingTestSuites}`,
    },
  ],
  labels: () => [{ name: 'suite', value: '(test file execution)' }],
  links: () => [],
};
