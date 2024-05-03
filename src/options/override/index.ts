import type { ReporterOptions } from 'jest-allure2-reporter';

import { attachments } from './attachments';
import { labels } from './labels';
import { historyId } from './historyId';
import { uuid } from './uuid';

export * from './historyId';

export function defaultOverrides(): ReporterOptions {
  return {
    testRun: {
      attachments,
      historyId,
      labels,
      uuid,
    },
    testFile: {
      attachments,
      historyId,
      labels,
      uuid,
    },
    testCase: {
      attachments,
      historyId,
      labels,
      uuid,
    },
  };
}
