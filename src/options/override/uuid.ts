import type {
  AllureTestCaseResult,
  TestCaseCustomizer,
  TestItemExtractorContext,
} from 'jest-allure2-reporter';
import { validate, v4 } from 'uuid';

import { log } from '../../logger';
import { thruMaybePromise } from '../../utils';

export const uuid: TestCaseCustomizer<
  TestItemExtractorContext<AllureTestCaseResult>
>['uuid'] = async ({ result, value }) => {
  return thruMaybePromise(value, (uuid) => {
    if (!uuid) {
      return v4();
    }

    if (!validate(uuid)) {
      // TODO: add async handling to result.fullName
      log.warn(`Detected invalid "uuid" (${uuid}) in test: ${result.fullName}`);
      return v4();
    }

    return uuid;
  });
};
