import type { ReporterOptions } from 'jest-allure2-reporter';

import { attachments } from './attachments';
import { labels } from './labels';
import { historyId } from './historyId';

export * from './historyId';

export function defaultOverrides(): ReporterOptions {
  return {
    testRun: {
      attachments,
      historyId,
      labels,
    },
    testFile: {
      attachments,
      historyId,
      labels,
    },
    testCase: {
      attachments,
      historyId,
      labels,
    },
  };
}
