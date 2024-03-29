import crypto from 'node:crypto';

import type { GlobalExtractor } from 'jest-allure2-reporter';

import { md5 } from '../../utils';

export const historyId: GlobalExtractor<string> = async ({ value }) => {
  const id = await value;
  return md5(id ?? crypto.randomBytes(16).toString('hex'));
};
