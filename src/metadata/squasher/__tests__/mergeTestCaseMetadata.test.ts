import { beforeEach, describe, expect, test } from '@jest/globals';
import type { AllureTestCaseMetadata, AllureTestStepMetadata } from 'jest-allure2-reporter';

import { MetadataSelector } from '../MetadataSelector';
import { mergeTestCaseMetadata, mergeTestStepMetadata } from '../mergers';

import {
  createTestCaseMetadata,
  createTestFileMetadata,
  getFullBlownTestCase,
  type StubTestCaseMetadata,
  type StubTestStepMetadata,
} from './fixtures';

describe('mergeTestCaseMetadata', () => {
  let docblocks = new WeakMap();
  let stepSelector: MetadataSelector<StubTestStepMetadata, AllureTestStepMetadata>;
  let testSelector: MetadataSelector<StubTestCaseMetadata, AllureTestCaseMetadata>;
  let testCase: ReturnType<typeof getFullBlownTestCase>;

  beforeEach(() => {
    docblocks = new WeakMap();
  });

  beforeEach(() => {
    testSelector = new MetadataSelector({
      empty: () => ({}),
      getDocblock: (metadata) => docblocks.get(metadata),
      getMetadata: (metadata) => metadata.data,
      mergeUnsafe: mergeTestCaseMetadata,
    });

    stepSelector = new MetadataSelector({
      empty: () => ({}),
      getDocblock: (metadata) => docblocks.get(metadata),
      getMetadata: (metadata) => metadata.data,
      mergeUnsafe: mergeTestStepMetadata,
    });

    testCase = getFullBlownTestCase();
    docblocks.set(testCase.file, createTestFileMetadata('file_docblock'));
    docblocks.set(testCase.definition, createTestCaseMetadata('test_definition_docblock'));
  });

  test('merge', () => {
    expect(testSelector.merge(void 0, void 0)).toMatchSnapshot();
  });

  test('testInvocation', () => {
    expect(testSelector.testInvocation(testCase)).toMatchSnapshot();
  });

  test('testDefinition', () => {
    expect(testSelector.testDefinition(testCase)).toMatchSnapshot();
  });

  test('belowTestInvocation', () => {
    expect(testSelector.belowTestInvocation(testCase)).toMatchSnapshot();
  });

  test('testInvocationAndBelow', () => {
    expect(testSelector.testInvocationAndBelow(testCase)).toMatchSnapshot();
  });

  test('testInvocationAndBelowDirect', () => {
    expect(testSelector.testInvocationAndBelowDirect(testCase)).toMatchSnapshot();
  });

  test('testDefinitionAndBelow', () => {
    expect(testSelector.testDefinitionAndBelow(testCase)).toMatchSnapshot();
  });

  test('testDefinitionAndBelowDirect', () => {
    expect(testSelector.testDefinitionAndBelowDirect(testCase)).toMatchSnapshot();
  });

  test('testVertical', () => {
    expect(testSelector.testVertical(testCase)).toMatchSnapshot();
  });

  test('testVertical (no overrides in step invocations)', () => {
    for (const invocation of testCase.allInvocations()) {
      invocation.data = {};
    }

    // we are testing that hook definition metadata
    // does not override the test metadata here
    expect(testSelector.testVertical(testCase)).toMatchSnapshot();
  });

  test('steps', () => {
    expect(stepSelector.steps(testCase)).toMatchSnapshot();
  });

  test('steps (no overrides in invocations)', () => {
    for (const invocation of testCase.allInvocations()) {
      invocation.data = {};
    }

    // we are testing that hook definition metadata
    // does not override the test metadata here
    expect(stepSelector.steps(testCase)).toMatchSnapshot();
  });

  test('globalAndTestFile', () => {
    expect(testSelector.globalAndTestFile(testCase.file)).toMatchSnapshot();
  });

  test('globalAndTestFileAndTestInvocation', () => {
    expect(testSelector.globalAndTestFileAndTestInvocation(testCase)).toMatchSnapshot();
  });

  test('stepsSelector merge', () => {
    expect(stepSelector.merge(void 0, void 0)).toMatchSnapshot();
    expect(stepSelector.merge({}, {})).toMatchSnapshot();
  });
});
