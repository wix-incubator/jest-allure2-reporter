import path from 'node:path';

import type {
  TestRunExtractorContext,
  TestFileExtractorContext,
  TestCaseExtractorContext,
  TestStepExtractorContext,
} from 'jest-allure2-reporter';

import { defaultOptions } from './default-options';
import * as customizers from './customizers';
import * as extractors from './extractors';
import type { ReporterConfig, ReporterOptions } from './types';
import { composeTestStepPropertyCustomizers } from './compose-options/testStep';
import { composeTestCasePropertyCustomizers } from './compose-options/testCase';

export function resolveOptions(
  custom?: ReporterOptions | undefined,
): ReporterConfig {
  const base = defaultOptions();

  const testStep = customizers.testStep(
    composeTestStepPropertyCustomizers<TestStepExtractorContext>(
      custom?.testStep,
      base.testStep,
    ),
  );

  return {
    overwrite: custom?.overwrite ?? base.overwrite,
    resultsDir: path.resolve(custom?.resultsDir ?? base.resultsDir),
    injectGlobals: custom?.injectGlobals ?? base.injectGlobals,
    attachments: {
      subDir: custom?.attachments?.subDir ?? base.attachments.subDir,
      contentHandler:
        custom?.attachments?.contentHandler ?? base.attachments.contentHandler,
      fileHandler:
        custom?.attachments?.fileHandler ?? base.attachments.fileHandler,
    },
    categories: extractors.compose2(
      extractors.appender(custom?.categories),
      base.categories,
    ),
    environment: extractors.compose2(
      extractors.merger(custom?.environment),
      base.environment,
    ),
    executor: extractors.compose2(
      extractors.merger(custom?.executor),
      base.executor,
    ),
    helpers: extractors.compose2(
      extractors.merger(custom?.helpers),
      base.helpers,
    ),
    testRun: customizers.testRun(
      composeTestCasePropertyCustomizers<TestRunExtractorContext>(
        custom?.testRun,
        base.testRun,
      ),
      testStep,
    ),
    testFile: customizers.testFile(
      composeTestCasePropertyCustomizers<TestFileExtractorContext>(
        custom?.testFile,
        base.testFile,
      ),
      testStep,
    ),
    testCase: customizers.testCase(
      composeTestCasePropertyCustomizers<TestCaseExtractorContext>(
        custom?.testCase,
        base.testCase,
      ),
      testStep,
    ),
    testStep,
  };
}

export { type ReporterConfig } from './types';
