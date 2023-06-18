import type { AllureRuntime } from 'allure-js-commons';

import type { Selectors } from '../selectors';
import type { JestAllure2ReporterOptions } from '../JestAllure2ReporterOptions';

export type TestRunContextConfig = {
  allureRuntime: AllureRuntime;

  environmentInfo: JestAllure2ReporterOptions['environmentInfo'];
  select: Selectors;
  rootDir: string;
};
