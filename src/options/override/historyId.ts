import crypto from 'node:crypto';

import type {
  AllureTestCaseResult,
  TestCaseCustomizer,
  TestItemExtractorContext,
} from 'jest-allure2-reporter';

import { md5, thruMaybePromise } from '../../utils';
import { log } from '../../logger';

export const historyId: TestCaseCustomizer<
  TestItemExtractorContext<AllureTestCaseResult>
>['historyId'] = async ({ result, value }) => {
  return thruMaybePromise(value, (historyId) => {
    if (!historyId) {
      // TODO: add async handling to result.fullName
      log.warn(`Detected empty "historyId" in test: ${result.fullName}`);
      return md5(crypto.randomBytes(16));
    }

    return md5(String(historyId));
  });
};
