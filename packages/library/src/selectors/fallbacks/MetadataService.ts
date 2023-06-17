import type { TestCaseResult } from '@jest/reporters';
import { query } from 'jest-metadata/reporter';

const NS = 'allure2';

export class MetadataService {
  getWorkerId(testCaseResult: TestCaseResult): string | undefined {
    const testMetadata = query.testCaseResult(testCaseResult);
    const runMetadata = testMetadata?.describeBlock.run;
    const $run = runMetadata?.get(NS) as AllureRunMetadata | undefined;
    return $run?.workerId;
  }

  getCode(testCaseResult: TestCaseResult): MetadataService$GetCode {
    const testMetadata = query.testCaseResult(testCaseResult);
    const $entry = testMetadata?.get(NS) as AllureTestEntryMetadata | undefined;
    const $before =
      testMetadata?.lastInvocation?.before
        .map((hook) => hook.definition.get(NS) as AllureHookDefinitionMetadata)
        .map((data) => data?.code ?? 'Code is not available for preview') ?? [];

    const $after =
      testMetadata?.lastInvocation?.after
        .map((hook) => hook.definition.get(NS) as AllureHookDefinitionMetadata)
        .map((data) => data?.code ?? 'Code is not available for preview') ?? [];

    return {
      beforeHooks: ($before ?? []).map((code) => ({ code })),
      testFn: { code: $entry?.code ?? 'Code is not available for preview' },
      afterHooks: ($after ?? []).map((code) => ({ code })),
    };
  }
}

export type MetadataService$GetCode = {
  beforeHooks: AllureCodeMetadata[];
  testFn: AllureCodeMetadata;
  afterHooks: AllureCodeMetadata[];
};

export type AllureMetadata =
  | AllureRunMetadata
  | AllureTestEntryMetadata
  | AllureHookDefinitionMetadata
  | AllureCodeMetadata
  | AllureAttachmentMetadata;

export type AllureRunMetadata = {
  workerId: string;
};

export type AllureCodeMetadata = {
  code: string;
};

export type AllureTestEntryMetadata = {
  code: string;
};

export type AllureHookDefinitionMetadata = {
  code: string;
};

export type AllureAttachmentMetadata = {
  filePath: string;
  fileName?: string;
  mimeType?: string;
};
