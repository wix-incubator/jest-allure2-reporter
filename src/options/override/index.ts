import type { ReporterOptions } from 'jest-allure2-reporter';

import { labels } from './labels';

export function defaultOverrides(): ReporterOptions {
  return {
    testRun: {
      labels,
    },
    testFile: {
      labels,
    },
    testCase: {
      labels,
    },
  };
}
