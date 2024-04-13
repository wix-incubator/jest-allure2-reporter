import type { ReporterOptions } from 'jest-allure2-reporter';

import { testCaseSteps } from './custom';
import { defaultOptions } from './default';
import { extendOptions } from './extendOptions';
import type { ReporterConfig } from './types';
import { defaultOverrides } from './override';
import { combineTestCaseAndSteps } from './combineTestCaseAndSteps';

export function resolveOptions(custom?: ReporterOptions | undefined) {
  const config: ReporterConfig = extendOptions(
    extendOptions(defaultOptions(), custom),
    defaultOverrides(),
  );

  config.testFile = combineTestCaseAndSteps(
    config.testFile,
    testCaseSteps(config.testStep, 'testFileMetadata'),
  );
  config.testCase = combineTestCaseAndSteps(
    config.testCase,
    testCaseSteps(config.testStep, 'testCaseMetadata'),
  );
  config.testRun = combineTestCaseAndSteps(
    config.testRun,
    testCaseSteps(config.testStep, 'testRunMetadata'),
  );

  return config as ReporterConfig<void>;
}

export { ReporterConfig } from './types';
