import type {
  HookDefinitionMetadata,
  HookInvocationMetadata,
  TestFnInvocationMetadata,
} from 'jest-metadata';

import { PREFIX } from '../constants';

import type { AllureTestStepMetadata } from './metadata';

export class StepExtractor {
  constructor(protected readonly flat: boolean) {}

  public extractFromInvocation(
    metadata: HookInvocationMetadata<any> | TestFnInvocationMetadata,
  ): AllureTestStepMetadata {
    const data = {
      name: (metadata.definition as HookDefinitionMetadata).hookType ?? 'test',
      ...(metadata.get([PREFIX]) as AllureTestStepMetadata),
    };

    if (this.flat) {
      delete data.attachments;
      delete data.parameters;
    }

    return data;
  }
}
