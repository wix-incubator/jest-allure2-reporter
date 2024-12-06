import type { AllureTestStepResult } from 'jest-allure2-reporter';

import type { AllureStep as Serialized } from '../../store';

import { normalizeAttachments } from './normalizeAttachments';
import { normalizeParameters } from './normalizeParameters';

export function toTestStep(rootDirectory: string, step: AllureTestStepResult): Serialized {
  return {
    name: step.displayName,
    start: step.start,
    stop: step.stop,
    stage: step.stage,
    status: step.status,
    statusDetails: step.statusDetails,
    steps: step.steps?.map((inner) => toTestStep(rootDirectory, inner)),
    attachments: normalizeAttachments(rootDirectory, step),
    parameters: normalizeParameters(step),
  };
}
