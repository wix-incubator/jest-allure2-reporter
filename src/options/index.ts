import type { ReporterOptions } from 'jest-allure2-reporter';

import { asArray, importCwd } from '../utils';

import { testCaseSteps } from './custom';
import { defaultOptions } from './default';
import { extendOptions } from './extendOptions';
import type { ReporterConfig } from './types';
import { defaultOverrides } from './override';
import { combineTestCaseAndSteps } from './combineTestCaseAndSteps';

export async function resolveOptions(custom?: ReporterOptions | undefined) {
  const extensions = custom ? await resolveExtendsChain(custom) : [];

  let config: ReporterConfig = defaultOptions();
  for (const extension of extensions) {
    config = extendOptions(config, extension);
  }

  config = extendOptions(config, defaultOverrides());
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

export async function resolveExtendsChain(
  custom: ReporterOptions | undefined,
): Promise<ReporterOptions[]> {
  if (custom) {
    const chain: ReporterOptions[] = [custom];
    for (const reference of asArray(custom.extends)) {
      const config = typeof reference === 'string' ? await importCwd(reference) : reference;
      chain.unshift(...(await resolveExtendsChain(config)));
    }
    return chain;
  }

  return [];
}

export { ReporterConfig } from './types';
