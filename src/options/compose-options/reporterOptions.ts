import type {
  ReporterOptions,
  ReporterConfig,
  TestStepCustomizer,
} from 'jest-allure2-reporter';

import { asExtractor, composeExtractors } from '../extractors';

import { composeAttachments } from './attachments';
import { composeTestCaseCustomizers } from './testCase';
import { composeTestStepCustomizers } from './testStep';
import { aggregateHelpersCustomizers } from './aggregateHelpersCustomizers';

export function reporterOptions(
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
    injectGlobals: custom.injectGlobals ?? base.injectGlobals,
    attachments: composeAttachments(base.attachments, custom.attachments),
    categories: composeExtractors(
      asExtractor(custom.categories),
      base.categories,
    ),
    environment: composeExtractors(
      asExtractor(custom.environment),
      base.environment,
    ),
    executor: composeExtractors(asExtractor(custom.executor), base.executor),
    helpers: composeExtractors(
      aggregateHelpersCustomizers(custom.helpers),
      base.helpers,
    ),
    testRun: composeTestCaseCustomizers(base.testRun, custom.testRun),
    testCase: composeTestCaseCustomizers(base.testCase, custom.testCase),
    testFile: composeTestCaseCustomizers(base.testFile, custom.testFile),
    testStep: composeTestStepCustomizers(
      base.testStep as TestStepCustomizer,
      custom.testStep,
    ),
  };
}
