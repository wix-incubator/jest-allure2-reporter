import type {
  GlobalMetadata,
  DescribeBlockMetadata,
  TestFileMetadata,
  TestEntryMetadata,
  TestFnInvocationMetadata,
  TestInvocationMetadata,
  HookInvocationMetadata,
} from 'jest-metadata';
import type { AllureTestCaseMetadata } from 'jest-allure2-reporter';

import { WORKER_ID } from '../constants';

import { chain, chainLast, extractCode, getStart, getStop } from './utils';

export class MetadataSquasher {
  protected readonly testInvocationConfig: MetadataSquasherConfig<AllureTestCaseMetadata>;

  constructor() {
    this.testInvocationConfig = MetadataSquasher.flatConfig();
  }

  testInvocation(metadata: TestInvocationMetadata): AllureTestCaseMetadata {
    const config = this.testInvocationConfig as any;
    const keys = Object.keys(config) as (keyof AllureTestCaseMetadata)[];
    const result: Partial<AllureTestCaseMetadata> = {};
    const context: MetadataSquasherContext = {
      globalMetadata: metadata.file.globalMetadata,
      testFile: metadata.file,
      describeBlock: [...metadata.definition.ancestors()],
      testEntry: metadata.definition,
      testInvocation: metadata,
      testFnInvocation: [...metadata.invocations()],
      anyInvocation: [...metadata.allInvocations()],
    };

    for (const key of keys) {
      result[key] = config[key](context, key);
    }

    return result as AllureTestCaseMetadata;
  }

  private static flatConfig(): MetadataSquasherConfig<AllureTestCaseMetadata> {
    return {
      code: extractCode,
      workerId: ({ testFile }) => {
        return testFile?.get(WORKER_ID) as string;
      },
      description: chain(['testEntry', 'testInvocation', 'testFnInvocation']),
      descriptionHtml: chain([
        'testEntry',
        'testInvocation',
        'testFnInvocation',
      ]),
      attachments: chain(['testEntry', 'testInvocation', 'anyInvocation']),
      parameters: chain(['testEntry', 'testInvocation', 'anyInvocation']),
      status: chainLast(['testInvocation']),
      statusDetails: chainLast(['anyInvocation', 'testInvocation']),
      labels: chain([
        'globalMetadata',
        'testFile',
        'describeBlock',
        'testEntry',
        'testInvocation',
        'anyInvocation',
      ]),
      links: chain([
        'globalMetadata',
        'testFile',
        'describeBlock',
        'testEntry',
        'testInvocation',
        'anyInvocation',
      ]),
      start: getStart,
      stop: getStop,
    };
  }
}

export type MetadataSquasherConfig<T extends object> = {
  [K in keyof T]: MetadataSquasherMapping<T, K>;
};

export type MetadataSquasherMapping<T, K extends keyof T = keyof T> = (
  context: MetadataSquasherContext,
  key: K,
) => T[K];

export type MetadataSquasherContext = Partial<{
  globalMetadata: GlobalMetadata;
  testFile: TestFileMetadata;
  describeBlock: DescribeBlockMetadata[];
  testEntry: TestEntryMetadata;
  testInvocation: TestInvocationMetadata;
  testFnInvocation: (HookInvocationMetadata<any> | TestFnInvocationMetadata)[];
  anyInvocation: (HookInvocationMetadata<any> | TestFnInvocationMetadata)[];
}>;
