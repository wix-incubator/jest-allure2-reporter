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
assertType<Reporter>(reporter);
// assertType<object>(Reporter.query);
assertType<ReporterOptions>({
  overwrite: false,
  resultsDir: 'allure-results',
  attachments: {
    subDir: 'attachments',
    fileHandler: 'copy',
  },
});

assertType<Function>($Owner);
assertType<Function>(JsdomTestEnvironment);
assertType<Function>(NodeTestEnvironment);
assertType<Function>(environmentListener);
