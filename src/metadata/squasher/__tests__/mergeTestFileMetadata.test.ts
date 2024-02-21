import type {
  AllureTestFileMetadata,
  AllureTestStepMetadata,
} from 'jest-allure2-reporter';

import { MetadataSelector } from '../MetadataSelector';
import { mergeTestFileMetadata, mergeTestStepMetadata } from '../mergers';

import {
  createTestFileMetadata,
  createTestStepMetadata,
  getFullBlownTestCase,
  type StubTestFileMetadata,
  type StubTestStepMetadata,
} from './fixtures';

describe('mergeTestFileMetadata', () => {
  let docblocks = new WeakMap();
  let stepSelector: MetadataSelector<
    StubTestStepMetadata,
    AllureTestStepMetadata
  >;
  let fileSelector: MetadataSelector<
    StubTestFileMetadata,
    AllureTestFileMetadata
  >;
  let testCase: ReturnType<typeof getFullBlownTestCase>;

  beforeEach(() => {
    docblocks = new WeakMap();
  });

  beforeEach(() => {
    fileSelector = new MetadataSelector({
      empty: () => ({}),
      getDocblock: (metadata) => docblocks.get(metadata),
      getMetadata: (metadata) => metadata.data,
      mergeUnsafe: mergeTestFileMetadata,
    });

    stepSelector = new MetadataSelector({
      empty: () => ({}),
      getDocblock: (metadata) => docblocks.get(metadata),
      getMetadata: (metadata) => metadata.data,
      mergeUnsafe: mergeTestStepMetadata,
    });

    testCase = getFullBlownTestCase();
    testCase.file.data.steps = [
      createTestStepMetadata('step_invocation', { steps: [{}] }),
    ];
    docblocks.set(testCase.file, createTestFileMetadata('file_docblock'));
  });

  test('merge', () => {
    expect(fileSelector.merge(void 0, void 0)).toMatchSnapshot();
    expect(fileSelector.merge({}, {})).toMatchSnapshot();
  });

  test('getMetadataWithDocblock', () => {
    expect(
      fileSelector.getMetadataWithDocblock(testCase.file),
    ).toMatchSnapshot();
  });

  test('globalAndTestFile', () => {
    expect(fileSelector.globalAndTestFile(testCase.file)).toMatchSnapshot();
  });

  test('steps', () => {
    expect(
      stepSelector.getMetadataWithDocblock(testCase.file).steps,
    ).toMatchSnapshot();
  });
});
