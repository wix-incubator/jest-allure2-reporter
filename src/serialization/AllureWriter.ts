import type {
  AllureTestCaseResult,
  AllureTestStepResult,
  Category,
  ExecutorInfo,
} from 'jest-allure2-reporter';

export interface AllureWriter {
  init?(): Promise<void>;
  cleanup?(): Promise<void>;

  writeCategories(categories: Category[]): Promise<void>;

  writeEnvironmentInfo(info: Record<string, string | undefined>): Promise<void>;

  writeExecutorInfo(info: ExecutorInfo): Promise<void>;

  writeContainer(result: AllureTestResultContainer): Promise<void>;

  writeResult(result: AllureTestResult): Promise<void>;
}

export interface AllureTestResultContainer {
  uuid: string;
  name?: string;
  children: string[];
  befores: AllureTestStepResult[];
  afters: AllureTestStepResult[];
}

export type AllureTestResult = Omit<AllureTestCaseResult, 'ignored'>;
