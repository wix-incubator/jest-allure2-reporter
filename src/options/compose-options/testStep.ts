import type { ReporterConfig, TestStepPropertyCustomizer } from 'jest-allure2-reporter';

import { composeExtractors } from '../extractors';

export function composeTestStepPropertyCustomizers(
  base: ReporterConfig['testStep'],
  custom: Partial<TestStepPropertyCustomizer> | undefined,
): typeof base {
  if (!custom) {
    return base;
  }

  return {
    hidden: composeExtractors(custom.hidden, base.hidden),
    $: composeExtractors(custom.$, base.$),
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
