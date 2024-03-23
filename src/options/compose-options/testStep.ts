import type { TestStepCustomizer } from 'jest-allure2-reporter';

import * as customExtractors from '../custom-extractors';
import * as extractors from '../extractors';
import type { TestStepCompositeExtractor } from '../types';

export function composeTestStepPropertyCustomizers<Context>(
  custom: TestStepCustomizer<Context> | undefined,
  base: TestStepCompositeExtractor<Context>,
): typeof base {
  if (!custom) {
    return base;
  }

  return {
    hidden: extractors.compose2(
      extractors.constant(custom.hidden),
      base.hidden,
    ),
    displayName: extractors.compose2(
      extractors.constant(custom.displayName),
      base.displayName,
    ),
    stage: extractors.compose2(extractors.constant(custom.stage), base.stage),
    start: extractors.compose2(extractors.constant(custom.start), base.start),
    stop: extractors.compose2(extractors.constant(custom.stop), base.stop),
    status: extractors.compose2(
      extractors.constant(custom.status),
      base.status,
    ),
    statusDetails: extractors.compose2(
      extractors.merger(custom.statusDetails),
      base.statusDetails,
    ),
    attachments: extractors.compose2(
      extractors.appender(custom.attachments),
      base.attachments,
    ),
    parameters: extractors.compose2(
      customExtractors.parameters(custom.parameters),
      base.parameters,
    ),
  };
}
