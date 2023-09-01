import type { ReporterOptions } from './ReporterOptions';

export * from './ReporterOptions';

export function resolveOptions(
  options: Partial<ReporterOptions> | undefined,
): ReporterOptions {
  return {
    overwrite: true,
    resultsDir: 'allure-results',
    testCase: {},
    environment: () => void 0,
    executor: () => void 0,
    categories: () => void 0,

    ...options,
  };
}
