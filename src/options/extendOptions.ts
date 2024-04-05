import path from 'node:path';

import * as customizers from './custom';
import * as extractors from './common';
import type { ReporterConfig, ReporterOptions } from './types';

export function extendOptions(
  base: ReporterConfig,
  custom?: ReporterOptions | undefined,
): ReporterConfig {
  return {
    overwrite: custom?.overwrite ?? base.overwrite,
    resultsDir: path.resolve(custom?.resultsDir ?? base.resultsDir),
    injectGlobals: custom?.injectGlobals ?? base.injectGlobals,
    attachments: {
      subDir: custom?.attachments?.subDir ?? base.attachments.subDir,
      contentHandler: custom?.attachments?.contentHandler ?? base.attachments.contentHandler,
      fileHandler: custom?.attachments?.fileHandler ?? base.attachments.fileHandler,
    },
    categories: extractors.compose2(extractors.appender(custom?.categories), base.categories),
    environment: extractors.compose2(extractors.merger(custom?.environment, {}), base.environment),
    executor: extractors.compose2(extractors.merger(custom?.executor), base.executor),
    helpers: extractors.compose2(customizers.helpers(custom?.helpers), base.helpers),
    testRun: extractors.compose2(customizers.testCase(custom?.testRun), base.testRun),
    testFile: extractors.compose2(customizers.testCase(custom?.testFile), base.testFile),
    testCase: extractors.compose2(customizers.testCase(custom?.testCase), base.testCase),
    testStep: extractors.compose2(customizers.testStep(custom?.testStep), base.testStep),
  };
}
