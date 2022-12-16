import type { AllureRuntime } from 'allure-js-commons';
import type { Selectors } from '../selectors';

export type TestRunContextConfig = {
  allureRuntime: AllureRuntime;

  select: Selectors;
  rootDir: string;
};
