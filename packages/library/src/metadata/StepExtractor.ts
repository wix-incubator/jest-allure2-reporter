import type {
  HookInvocationMetadata,
  TestFnInvocationMetadata,
} from 'jest-metadata';

import { PREFIX } from '../constants';

import type { AllureTestStepMetadata } from './metadata';

export class StepExtractor {
  constructor(protected readonly flat: boolean) {}

  public extractFromHook(
    metadata: HookInvocationMetadata,
  ): AllureTestStepMetadata {
    const data = {
      name: metadata.definition.hookType,
      ...(metadata.get([PREFIX]) as AllureTestStepMetadata),
    };

    if (this.flat) {
      delete data.attachments;
      delete data.parameters;
    }

    return data;
  }

  public extractFromTestFn(
    metadata: TestFnInvocationMetadata,
  ): AllureTestStepMetadata {
    const data = {
      name: 'test',
      ...(metadata.get([PREFIX]) as AllureTestStepMetadata),
    };

    if (this.flat) {
      delete data.attachments;
      delete data.parameters;
    }

    return data;
  }
}
