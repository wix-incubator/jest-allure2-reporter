import type { LabelsCustomizer } from 'jest-allure2-reporter';

import { last } from '../common';
import { thruMaybePromise } from '../../utils';

export const labels = {
  owner: last,
  package: last,
  parentSuite: last,
  severity: last,
  subSuite: last,
  suite: last,
  testClass: last,
  testMethod: last,
  thread: ({ value }) => thruMaybePromise(value, (value) => prefix(value.at(-1))),
} as LabelsCustomizer<{}>;

function prefix(value: string | undefined) {
  return typeof value === 'string' && Number.parseInt(value, 10) ? value.padStart(2, '0') : value;
}
