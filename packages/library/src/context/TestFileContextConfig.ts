import type { AllureGroup } from 'allure-js-commons';

import type { Selectors } from '../selectors';

export type TestFileContextConfig = {
  select: Selectors;
  testFileGroup: AllureGroup;
};
