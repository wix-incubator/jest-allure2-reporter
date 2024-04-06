import type { ReporterOptions } from 'jest-allure2-reporter';

import { testCaseSteps } from './custom';
import { defaultOptions } from './default';
import { extendOptions } from './extendOptions';
import type { ReporterConfig, ReporterFinalConfig } from './types';
import { defaultOverrides } from './override';

export function resolveOptions(custom?: ReporterOptions | undefined): ReporterFinalConfig {
  const config: ReporterConfig = extendOptions(
    extendOptions(defaultOptions(), custom),
    defaultOverrides(),
  );

  return {
    ...config,
    testFileSteps: testCaseSteps(config.testStep, 'testFileMetadata'),
    testCaseSteps: testCaseSteps(config.testStep, 'testCaseMetadata'),
    testRunSteps: testCaseSteps(config.testStep, 'testRunMetadata'),
  } as ReporterFinalConfig;
}

export { type ReporterFinalConfig as ReporterConfig } from './types';
