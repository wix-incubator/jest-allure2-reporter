import type { AllureRuntime } from 'allure-js-commons';
import type { Selectors } from '../selectors';

export type TestRunContextConfig = {
  allureRuntime: AllureRuntime;

  getEnvironmentInfo: boolean | (() => Promise<Record<string, string>>);
  select: Selectors;
  rootDir: string;
};
