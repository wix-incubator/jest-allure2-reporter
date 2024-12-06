// allure-store/index.ts

import type { FileSystemAllureWriterConfig } from './FileAllureWriter';
import type { AllureStoreConfig } from './AllureStore';
import { AllureStore } from './AllureStore';

/**
 * Create an AllureStore from a configuration object.
 */
export async function fromConfig(options: AllureStoreConfig): Promise<AllureStore> {
  return AllureStore.fromConfig(options);
}

/**
 * Create an AllureStore from a directory configuration.
 */
export async function fromDirectory(options: FileSystemAllureWriterConfig): Promise<AllureStore> {
  return AllureStore.fromDirectory(options);
}

export { type Category, type ExecutorInfo } from 'jest-allure2-reporter';
export { type AllureWriter } from './AllureWriter';
export { type AllureReader } from './AllureReader';
export {
  type AllureResult,
  type AllureContainer,
  type AllureStep,
  type AllureParameter,
} from './types';
export { type AllureStoreConfig, AllureStore } from './AllureStore';
export { FileAllureWriter, type FileSystemAllureWriterConfig } from './FileAllureWriter';
export { FileAllureReader } from './FileAllureReader';
