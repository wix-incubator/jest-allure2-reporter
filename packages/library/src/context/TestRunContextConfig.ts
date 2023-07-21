import type { AllureRuntime } from '@noomorph/allure-js-commons';

import type { Selectors } from '../selectors';
import type { ReporterOptions } from '../ReporterOptions';

export type TestRunContextConfig = {
  allureRuntime: AllureRuntime;

  environmentInfo: ReporterOptions['environment'];
  select: Selectors;
  rootDir: string;
};
