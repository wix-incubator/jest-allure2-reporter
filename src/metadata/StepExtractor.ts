import type {
  HookDefinitionMetadata,
  HookInvocationMetadata,
  TestFnInvocationMetadata,
} from 'jest-metadata';

import { HIDDEN, PREFIX } from '../constants';

import type { AllureTestStepMetadata } from './metadata';

export class StepExtractor {
  public extractFromInvocation(
    metadata: HookInvocationMetadata<any> | TestFnInvocationMetadata,
  ): AllureTestStepMetadata | null {
    const definition = metadata.definition as HookDefinitionMetadata;
    const hidden = metadata.get(HIDDEN, definition.get(HIDDEN, false));
    if (hidden) {
      return null;
    }

    const hookType = definition.hookType;
    const data = {
      name: hookType,
      ...(metadata.get([PREFIX]) as AllureTestStepMetadata),
    };

    if (!hookType) {
      delete data.attachments;
      delete data.parameters;
    }

    return data;
  }
}
