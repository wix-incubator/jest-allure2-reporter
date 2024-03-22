import path from 'node:path';

import type { ReporterOptions, ReporterConfig } from 'jest-allure2-reporter';

import { reporterOptions } from './compose-options';
import { defaultOptions } from './default-options';

export function resolveOptions(
  customOptions?: ReporterOptions | undefined,
): ReporterConfig {
  const result = reporterOptions(defaultOptions(), customOptions);
  result.resultsDir = path.resolve(result.resultsDir);

  return result;
}
