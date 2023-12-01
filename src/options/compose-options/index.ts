import type { PluginContext } from 'jest-allure2-reporter';
import type {
  ReporterOptions,
  ReporterConfig,
  TestStepCustomizer,
} from 'jest-allure2-reporter';

import { asExtractor, composeExtractors } from '../utils';

import { composeAttachments } from './attachments';
import { composePlugins } from './plugins';
import { composeTestCaseCustomizers } from './testCase';
import { composeTestFileCustomizers } from './testFile';
import { composeTestStepCustomizers } from './testStep';

export function composeOptions(
  context: PluginContext,
  base: ReporterConfig,
  custom: ReporterOptions | undefined,
): ReporterConfig {
  if (!custom) {
    return base;
  }

  return {
    ...custom,

    overwrite: custom.overwrite ?? base.overwrite,
    resultsDir: custom.resultsDir ?? base.resultsDir,
    attachments: composeAttachments(base.attachments, custom.attachments),
    testCase: composeTestCaseCustomizers(base.testCase, custom.testCase),
    testFile: composeTestFileCustomizers(base.testFile, custom.testFile),
    testStep: composeTestStepCustomizers(
      base.testStep as TestStepCustomizer,
      custom.testStep,
    ),
    environment: composeExtractors(
      asExtractor(custom.environment),
      base.environment,
    ),
    executor: composeExtractors(asExtractor(custom.executor), base.executor),
    categories: composeExtractors(
      asExtractor(custom.categories),
      base.categories,
    ),
    plugins: composePlugins(context, base.plugins, custom.plugins),
  };
}
