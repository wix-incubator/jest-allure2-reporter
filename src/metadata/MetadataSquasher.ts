import type {
  TestFileMetadata,
  TestInvocationMetadata,
} from 'jest-metadata';
import type {
  AllureTestFileMetadata,
  AllureTestCaseMetadata,
  AllureTestStepMetadata,
} from 'jest-allure2-reporter';

import { getStart, getStop } from './utils';
import { PREFIX } from './constants';
import { mergeTestCaseMetadata, mergeTestFileMetadata } from './mergers';

export class MetadataSquasher {
  testFile(metadata: TestFileMetadata): AllureTestFileMetadata {
    const input = [metadata.globalMetadata.get(PREFIX), metadata.get(PREFIX)];
    return (input as AllureTestFileMetadata[]).reduce(mergeTestFileMetadata);
  }

  testInvocation(metadata: TestInvocationMetadata): AllureTestCaseMetadata {
    const ancestors = [
      metadata.file.globalMetadata,
      metadata.file,
      ...metadata.definition.ancestors(),
      metadata.definition,
      metadata,
    ].map((item) => item.get(PREFIX) as AllureTestCaseMetadata);
    const result = ancestors.reduce(mergeTestCaseMetadata);
    // TODO: handle .hidden metadata
    const befores = [...metadata.beforeAll, ...metadata.beforeEach].map(
      (item) => item.get(PREFIX) as AllureTestStepMetadata,
    );
    const afters = [...metadata.afterEach, ...metadata.afterAll].map(
      (item) => item.get(PREFIX) as AllureTestStepMetadata,
    );
    const steps = result.steps ?? [];

    return {
      ...result,

      start: getStart(metadata),
      stop: getStop(metadata),
      steps: [...befores, ...steps, ...afters],
    };
  }
}
