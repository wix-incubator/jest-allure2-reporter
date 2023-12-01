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
  return composeOptions(context, defaultOptions(context), options);
}
