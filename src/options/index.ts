import type { ReporterOptions } from 'jest-allure2-reporter';

import { defaultOptions } from './default';
import { extendOptions } from './extendOptions';
import type { ReporterConfig } from './types';
import { defaultOverrides } from './override';

export function resolveOptions(custom?: ReporterOptions | undefined): ReporterConfig {
  return extendOptions(extendOptions(defaultOptions(), custom), defaultOverrides());
}

export { type ReporterConfig } from './types';
