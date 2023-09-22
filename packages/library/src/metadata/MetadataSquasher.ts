import type {
  AggregatedResultMetadata,
  DescribeBlockMetadata,
  RunMetadata,
  TestEntryMetadata,
  TestFnInvocationMetadata,
  TestInvocationMetadata,
} from 'jest-metadata';

import { PREFIX } from '../constants';

import { chain, extractCode, getStart, getStop } from './utils';
import type { AllureTestCaseMetadata } from './metadata';

export class MetadataSquasher {
  protected readonly testInvocationConfig: MetadataSquasherConfig<AllureTestCaseMetadata>;

  constructor(flat: boolean) {
    this.testInvocationConfig = flat
      ? MetadataSquasher.flatConfig()
      : MetadataSquasher.deepConfig();
  }

  testInvocation(metadata: TestInvocationMetadata): AllureTestCaseMetadata {
    const config = this.testInvocationConfig as any;
    const keys = Object.keys(config) as (keyof AllureTestCaseMetadata)[];
    const result: Partial<AllureTestCaseMetadata> = {};
    const context = {
      aggregatedResult: metadata.entry.describeBlock.run.aggregatedResult,
      run: metadata.entry.describeBlock.run,
      describeBlock: [...metadata.entry.ancestors()],
      testEntry: metadata.entry,
      testInvocation: metadata,
      testFnInvocation: metadata.fn,
    };

    for (const key of keys) {
      result[key] = config[key](context, key);
    }

    return result as AllureTestCaseMetadata;
  }

  private static flatConfig(): MetadataSquasherConfig<AllureTestCaseMetadata> {
    return {
      code: extractCode,
      workerId: ({ run }) => run?.get([PREFIX, 'workerId']) as string,
      description: chain(['testEntry', 'testInvocation', 'testFnInvocation']),
      descriptionHtml: chain([
        'testEntry',
        'testInvocation',
        'testFnInvocation',
      ]),
      attachments: chain(['testEntry', 'testInvocation', 'testFnInvocation']),
      parameters: chain(['testEntry', 'testInvocation', 'testFnInvocation']),
      labels: chain([
        'aggregatedResult',
        'run',
        'describeBlock',
        'testEntry',
        'testInvocation',
        'testFnInvocation',
      ]),
      links: chain([
        'aggregatedResult',
        'run',
        'describeBlock',
        'testEntry',
        'testInvocation',
        'testFnInvocation',
      ]),
      start: getStart,
      stop: getStop,
    };
  }

  private static deepConfig(): MetadataSquasherConfig<AllureTestCaseMetadata> {
    return {
      ...this.flatConfig(),
      attachments: chain(['testEntry', 'testInvocation']),
      parameters: chain(['testEntry', 'testInvocation']),
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
  aggregatedResult: AggregatedResultMetadata;
  run: RunMetadata;
  describeBlock: DescribeBlockMetadata[];
  testEntry: TestEntryMetadata;
  testInvocation: TestInvocationMetadata;
  testFnInvocation: TestFnInvocationMetadata;
}>;
