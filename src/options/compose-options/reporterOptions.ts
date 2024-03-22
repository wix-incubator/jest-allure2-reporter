import type {
  ReporterOptions,
  ReporterConfig,
  TestStepPropertyCustomizer,
} from 'jest-allure2-reporter';

import { asExtractor, composeExtractors } from '../extractors';

import { composeAttachments } from './attachments';
import { composeTestCasePropertyCustomizers } from './testCase';
import { composeTestStepPropertyCustomizers } from './testStep';
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
    testRun: composeTestCasePropertyCustomizers(base.testRun, custom.testRun),
    testCase: composeTestCasePropertyCustomizers(base.testCase, custom.testCase),
    testFile: composeTestCasePropertyCustomizers(base.testFile, custom.testFile),
    testStep: composeTestStepPropertyCustomizers(
      base.testStep as TestStepPropertyCustomizer,
      custom.testStep,
    ),
  };
}
