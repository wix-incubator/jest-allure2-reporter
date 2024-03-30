import { defaultOptions } from './default';
import { extendOptions } from './extendOptions';
import type { ReporterConfig, ReporterOptions } from './types';
import { defaultOverrides } from './override';

export function resolveOptions(custom?: ReporterOptions | undefined): ReporterConfig {
  return extendOptions(extendOptions(defaultOptions(), custom), defaultOverrides());
}

export { type ReporterConfig } from './types';
