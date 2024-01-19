import path from 'node:path';

import type {
  PluginContext,
  ReporterOptions,
  ReporterConfig,
} from 'jest-allure2-reporter';

import { composeOptions } from './compose-options';
import { defaultOptions } from './default-options';

export function resolveOptions(
  context: PluginContext,
  options?: ReporterOptions | undefined,
): ReporterConfig {
  const result = composeOptions(context, defaultOptions(context), options);
  result.resultsDir = path.resolve(result.resultsDir);
  return result;
}
