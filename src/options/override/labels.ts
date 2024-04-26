import type { LabelsCustomizer } from 'jest-allure2-reporter';

import { last } from '../common';

export const labels = {
  owner: last,
  package: last,
  parentSuite: last,
  severity: last,
  subSuite: last,
  suite: last,
  testClass: last,
  testMethod: last,
  thread: last,
} as LabelsCustomizer<{}>;
