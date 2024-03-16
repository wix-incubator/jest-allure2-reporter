import type { ExecutorInfo } from 'jest-allure2-reporter';

export interface ExecutorInfoProvider {
  readonly enabled: boolean;
  getExecutorInfo(): Promise<ExecutorInfo>;
}
