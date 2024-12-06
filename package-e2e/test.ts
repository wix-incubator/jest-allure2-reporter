import Reporter from 'jest-allure2-reporter';
import type { ReporterOptions } from 'jest-allure2-reporter';
import JsdomTestEnvironment from 'jest-allure2-reporter/environment-jsdom';
import NodeTestEnvironment from 'jest-allure2-reporter/environment-node';
import environmentListener from 'jest-allure2-reporter/environment-listener';

function assertType<T>(_actual: T): void {
  // no-op
}

const reporter = new Reporter({} as any, {} as any);
assertType<Promise<void>>(reporter.onRunStart({} as any, {} as any));
assertType<Reporter>(repgorter);
// assertType<object>(Reporter.query);
assertType<ReporterOptions>({
  overwrite: false,
  resultsDir: 'allure-results',
  attachments: {
    subDir: 'attachments',
    fileHandler: 'copy',
  },
  testFile: {
    labels: {
      tag: ['unit', 'javascript'],
      package: 'Some Package',
      severity: (context) => context.value ?? 'critical',
    },
    links: {
      github: ({ filePath }) => ({
        name: 'GitHub',
        url: `https://github.com/owner/repo/tree/master/${filePath.join('/')}`,
      }),
    },
  },
  testCase: {
    labels: {
      tag: ['unit', 'javascript'],
      severity: 'normal',
      story: () => 'Some Story',
    },
  },
});

assertType<Function>($Owner);
assertType<Function>(JsdomTestEnvironment);
assertType<Function>(NodeTestEnvironment);
assertType<Function>(environmentListener);
