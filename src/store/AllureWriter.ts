import type { Category, ExecutorInfo } from 'jest-allure2-reporter';

import type { AllureContainer, AllureResult } from './types';

export interface AllureWriter {
  init?(): Promise<void>;

  cleanup?(): Promise<void>;

  writeCategories(categories: Category[]): Promise<void>;

  writeEnvironmentInfo(info: Record<string, string>): Promise<void>;

  writeExecutorInfo(info: ExecutorInfo): Promise<void>;

  writeContainer(result: AllureContainer): Promise<void>;

  writeResult(result: AllureResult): Promise<void>;
}
