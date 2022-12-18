// eslint-disable-next-line node/no-unpublished-import
import type { Test, TestResult, TestCaseResult, AggregatedResult } from '@jest/reporters';
import { isAggregatedResult, isTestCaseResult, isTestResult, isTest } from '../../utils/predicates';

interface GetMetadata {
  (item: Test): AllureTestFileMetadata | void;
  (item: TestCaseResult): AllureTestMetadata | void;
  (item: TestResult): AllureTestFileMetadata | void;
  (item: AggregatedResult): AllureRunMetadata | void;
}

export class MetadataService {
  public readonly get: GetMetadata = (item) => {
    if (isAggregatedResult(item)) {
      return;
    }

    if (isTestResult(item)) {
      return;
    }

    if (isTestCaseResult(item)) {
      return;
    }

    if (isTest(item)) {
      return;
    }

    return;
  };
}

export type AllureAnyMetadata =
  | AllureRunMetadata
  | AllureTestFileMetadata
  | AllureTestMetadata
  | AllureSuiteMetadata
  | AllureCodeMetadata
  | AllureAttachmentMetadata;

export type AllureRunMetadata = {
  startedAt: number;
};

export type AllureTestFileMetadata = {
  startedAt: number;
  endedAt: number;
  workerId: string;
};

export type AllureTestMetadata = {
  beforeHooks: AllureCodeMetadata[];
  testFn: AllureCodeMetadata;
  afterHooks: AllureCodeMetadata[];

  startedAt: number;
  duration: number;
  errors: unknown[];
  attachments: AllureAttachmentMetadata[];

  parentSuites: AllureSuiteMetadata[];
  testFile: AllureTestFileMetadata;
};

export type AllureSuiteMetadata = {
  beforeHooks: AllureCodeMetadata[];
  afterHooks: AllureCodeMetadata[];

  startedAt: number;
  duration: number;
  errors: unknown[];
  attachments: AllureAttachmentMetadata[];

  testFile: AllureTestFileMetadata;
};

export type AllureCodeMetadata = {
  code: string;
};

export type AllureAttachmentMetadata = {
  filePath: string;
  fileName?: string;
  mimeType?: string;
};
