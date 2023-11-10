import type {
  PluginContext,
  ReporterOptions,
  ReporterConfig,
} from 'jest-allure2-reporter';

import { composeOptions } from './composeOptions';
import { defaultOptions } from './defaultOptions';

export function resolveOptions(
  context: PluginContext,
  options?: ReporterOptions | undefined,
): ReporterConfig {
  return composeOptions(context, defaultOptions(context), options);
}
