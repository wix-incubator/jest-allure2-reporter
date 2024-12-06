import type { Category, ExecutorInfo } from 'jest-allure2-reporter';

import type { AllureContainer, AllureResult } from './types';

export interface AllureReader {
  /**
   * (Optional) Initializes the reader.
   */
  init?(): Promise<void>;

  /**
   * (Optional) Cleans up any resources used by the reader.
   */
  cleanup?(): Promise<void>;

  /**
   * Returns identifiers for available containers
   */
  getContainerIds(): Promise<string[]>;

  /**
   * Returns identifiers for available results
   */
  getResultIds(): Promise<string[]>;

  /**
   * Reads a container by ID.
   */
  readContainer(id: string): Promise<AllureContainer | null>;

  /**
   * Reads a result by ID.
   */
  readResult(id: string): Promise<AllureResult | null>;

  /**
   * Reads the categories from the categories.json file.
   */
  readCategories(): Promise<Category[] | null>;

  /**
   * Reads the environment information from the environment.properties file.
   */
  readEnvironmentInfo(): Promise<Record<string, string> | null>;

  /**
   * Reads the executor information from the executor.json file.
   */
  readExecutorInfo(): Promise<ExecutorInfo | null>;
}
