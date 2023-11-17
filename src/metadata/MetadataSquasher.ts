import type {
  DescribeBlockMetadata,
  GlobalMetadata,
  HookInvocationMetadata,
  TestEntryMetadata,
  TestFileMetadata,
  TestFnInvocationMetadata,
  TestInvocationMetadata,
} from 'jest-metadata';
import type {
  AllureTestFileMetadata,
  AllureTestCaseMetadata,
} from 'jest-allure2-reporter';

import { chain, chainLast, extractCode, getStart, getStop } from './utils';

export class MetadataSquasher {
  protected readonly testFileConfig: MetadataSquasherConfig<AllureTestCaseMetadata> =
    {
      code: chainLast(['testFile']),
      workerId: chainLast(['testFile']),
      description: chain(['globalMetadata', 'testFile']),
      descriptionHtml: chain(['globalMetadata', 'testFile']),
      attachments: chain(['testEntry', 'testInvocation', 'anyInvocation']),
      parameters: chain(['testEntry', 'testInvocation', 'anyInvocation']),
      status: chainLast(['testFile']),
      statusDetails: chainLast(['testFile']),
      labels: chain(['globalMetadata', 'testFile']),
      links: chain(['globalMetadata', 'testFile']),
      start: chainLast(['testFile']),
      stop: chainLast(['testFile']),
    };

  protected readonly testInvocationConfig: MetadataSquasherConfig<AllureTestCaseMetadata> =
    {
      code: extractCode,
      workerId: chainLast(['testFile']),
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

  testFile(metadata: TestFileMetadata): AllureTestFileMetadata {
    const config = this.testInvocationConfig as any;
    const keys = Object.keys(config) as (keyof AllureTestCaseMetadata)[];
    const result: Partial<AllureTestCaseMetadata> = {};
    const context: MetadataSquasherContext = {
      globalMetadata: metadata.globalMetadata,
      testFile: metadata,
    };

    for (const key of keys) {
      result[key] = config[key](context, key);
    }

    return result as AllureTestFileMetadata;
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
}

export type MetadataSquasherConfig<T extends object> = {
  [K in keyof T]: MetadataSquasherMapping<T, K>;
};

export type MetadataSquasherMapping<T, K extends keyof T = keyof T> = (
  context: MetadataSquasherContext,
  key: K,
) => T[K];

export type MetadataSquasherContext = {
  globalMetadata: GlobalMetadata;
  testFile: TestFileMetadata;
  describeBlock?: DescribeBlockMetadata[];
  testEntry?: TestEntryMetadata;
  testInvocation?: TestInvocationMetadata;
  testFnInvocation?: (HookInvocationMetadata<any> | TestFnInvocationMetadata)[];
  anyInvocation?: (HookInvocationMetadata<any> | TestFnInvocationMetadata)[];
};
