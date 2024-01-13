import type { Metadata } from 'jest-metadata';

import type { SharedReporterConfig } from './types';

export interface AllureRuntimeConfig {
  getReporterConfig(): SharedReporterConfig;
  getMetadata(): Metadata;
  getNow(): number;
}
