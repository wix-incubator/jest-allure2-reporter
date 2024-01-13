import type { GlobalMetadata, Metadata, TestFileMetadata } from 'jest-metadata';

import type { SharedReporterConfig } from './types';

export interface AllureRuntimeConfig {
  getReporterConfig(): SharedReporterConfig;
  getCurrentMetadata(): Metadata;
  getFileMetadata(): TestFileMetadata;
  getGlobalMetadata(): GlobalMetadata;
  getNow(): number;
}
