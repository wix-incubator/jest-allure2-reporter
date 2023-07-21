import type { AllureGroup } from '@noomorph/allure-js-commons';

import type { Selectors } from '../selectors';

export type TestFileContextConfig = {
  select: Selectors;
  testFileGroup: AllureGroup;
};
