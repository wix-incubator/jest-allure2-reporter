import crypto from 'node:crypto';

import type { TestCaseCustomizer } from 'jest-allure2-reporter';

import { md5 } from '../../utils';

export const historyId: TestCaseCustomizer['historyId'] = async ({ value }) => {
  const id = await value;
  return md5(String(id ?? crypto.randomBytes(16).toString('hex')));
};
