import type { HookInvocationMetadata } from 'jest-metadata';
import type { TestFileMetadata, TestInvocationMetadata } from 'jest-metadata';
import type {
  AllureTestCaseMetadata,
  AllureTestFileMetadata,
  AllureTestStepMetadata,
} from 'jest-allure2-reporter';

import { getStage, getStart, getStatusAndDetails, getStop } from './utils';
import { PREFIX } from './constants';
import {
  mergeTestCaseMetadata,
  mergeTestFileMetadata,
  mergeTestStepMetadata,
} from './mergers';

export class MetadataSquasher {
  testFile(metadata: TestFileMetadata): AllureTestFileMetadata {
    const input = [metadata.globalMetadata.get(PREFIX), metadata.get(PREFIX)];
    return (input as AllureTestFileMetadata[]).reduce(
      mergeTestFileMetadata,
      {},
    );
  }

  testInvocation(
    fileMetadata: AllureTestFileMetadata,
    metadata: TestInvocationMetadata,
  ): AllureTestCaseMetadata {
    const ancestors = [
      ...metadata.definition.ancestors(),
      metadata.definition,
      metadata,
      metadata.fn,
    ]
      .map((item) =>
        item ? (item.get(PREFIX) as AllureTestCaseMetadata) : undefined,
      )
      .filter(Boolean) as AllureTestCaseMetadata[];
    ancestors.unshift(fileMetadata);

    const result = ancestors.reduce(mergeTestCaseMetadata, {});
    const befores = [...metadata.beforeAll, ...metadata.beforeEach].map(
      resolveTestStep,
    );
    const afters = [...metadata.afterEach, ...metadata.afterAll].map(
      resolveTestStep,
    );
    const steps = result.steps ?? [];

    return {
      ...result,
      ...getStatusAndDetails(metadata),
      stage: getStage(metadata),
      start: getStart(metadata),
      stop: getStop(metadata),
      steps: [...befores, ...steps, ...afters],
    };
  }
}

const resolveTestStep = (item: HookInvocationMetadata) =>
  mergeTestStepMetadata(
    item.definition.get(PREFIX) as AllureTestStepMetadata,
    item.get(PREFIX) as AllureTestStepMetadata,
  );
