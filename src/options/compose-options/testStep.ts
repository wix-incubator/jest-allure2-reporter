import type { TestStepCustomizer } from 'jest-allure2-reporter';

import { composeExtractors } from '../utils';

export function composeTestStepCustomizers(
  base: TestStepCustomizer,
  custom: Partial<TestStepCustomizer> | undefined,
): TestStepCustomizer {
  if (!custom) {
    return base;
  }

  return {
    name: composeExtractors(custom.name, base.name),
    stage: composeExtractors(custom.stage, base.stage),
    start: composeExtractors(custom.start, base.start),
    stop: composeExtractors(custom.stop, base.stop),
    status: composeExtractors(custom.status, base.status),
    statusDetails: composeExtractors(custom.statusDetails, base.statusDetails),
    attachments: composeExtractors(custom.attachments, base.attachments),
    parameters: composeExtractors(custom.parameters, base.parameters),
  };
}
