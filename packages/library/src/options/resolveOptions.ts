import type { ReporterOptions, ReporterConfig } from './ReporterOptions';
import { composeOptions } from './composeOptions';
import { defaultOptions } from './defaultOptions';

export * from './ReporterOptions';

export function resolveOptions(
  options?: ReporterOptions | undefined,
): ReporterConfig {
  return composeOptions(defaultOptions(), options ?? {});
}
