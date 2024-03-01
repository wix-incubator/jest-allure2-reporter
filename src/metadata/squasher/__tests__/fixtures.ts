import type {
  AllureTestCaseMetadata,
  AllureTestFileMetadata,
  AllureTestItemMetadata,
  AllureTestStepMetadata,
  Stage,
  Status,
} from 'jest-allure2-reporter';

import type {
  LikeDescribeBlock,
  LikeStepInvocation,
  LikeTestFile,
  LikeTestInvocation,
} from '../MetadataSelector';

const SCOPE_NUMBERS = {
  global: 0,
  file_docblock: 1,
  file: 2,
  describe_block: 3,
  hook_definition: 4,
  test_definition_docblock: 5,
  test_definition: 6,
  test_invocation: 7,
  test_fn_invocation: 8,
  hook_invocation: 9,
  step_invocation: 10,
} as const;

type Scope = keyof typeof SCOPE_NUMBERS;

export function createTestItemMetadata(
  scope: Scope,
  extra?: AllureTestItemMetadata,
): AllureTestItemMetadata {
  return {
    attachments: [
      {
        name: scope + '.txt',
        type: 'text/plain',
        source: `/tmp/${scope}.txt`,
      },
    ],
    displayName: `displayName:${scope}`,
    historyId: `historyId:${scope}`,
    parameters: [
      {
        name: `parameter:${scope}`,
        value: `value:${scope}`,
      },
    ],
    sourceCode: `sourceCode:${scope}`,
    sourceLocation: {
      fileName: `fileName:${scope}`,
      lineNumber: 1,
      columnNumber: 2,
    },
    stage: castStage(scope),
    start: castStart(scope),
    status: castStatus(scope),
    statusDetails: {
      message: `message:${scope}`,
      trace: `trace:${scope}`,
    },
    stop: castStop(scope),
    ...extra,
  };
}

export function createTestStepMetadata(
  scope: 'hook_definition' | 'hook_invocation' | 'step_invocation',
  extra?: AllureTestStepMetadata,
): AllureTestItemMetadata {
  return {
    ...createTestCaseMetadata(scope, extra),
    ...extra,
  };
}

export function createTestFileMetadata(
  scope: Scope,
  extra?: AllureTestFileMetadata,
): AllureTestFileMetadata {
  return {
    ...createTestItemMetadata(scope, extra),
    fullName: `fullName:${scope}`,
    description: [`description:${scope}`],
    descriptionHtml: [`descriptionHtml:${scope}`],
    labels: [
      {
        name: 'tag',
        value: scope,
      },
    ],
    links: [
      {
        name: 'link',
        url: `https://example.com/${scope}`,
        type: scope,
      },
    ],
    workerId: castWorkerId(scope),
    ...extra,
  };
}

export function createTestCaseMetadata(
  scope: Scope,
  extra?: AllureTestCaseMetadata,
): AllureTestCaseMetadata {
  return {
    ...createTestFileMetadata(scope, extra),
  };
}

type StubMetadata<T> = {
  data: T;
};

export type StubTestCaseMetadata = StubMetadata<AllureTestCaseMetadata>;
export type StubTestFileMetadata = StubMetadata<AllureTestFileMetadata>;
export type StubTestStepMetadata = StubMetadata<AllureTestStepMetadata>;

function createHookMetadata(
  hookType: AllureTestStepMetadata['hookType'],
): LikeStepInvocation<StubTestCaseMetadata> {
  return {
    definition: {
      data: createTestStepMetadata('hook_definition', {
        hookType,
      }),
    },
    data: createTestStepMetadata('hook_invocation', {
      hookType,
    }),
  };
}

export function getFullBlownTestCase(): LikeTestInvocation<StubTestCaseMetadata> {
  const testFile: LikeTestFile<StubTestFileMetadata> = {
    globalMetadata: { data: createTestFileMetadata('global') },
    data: createTestFileMetadata('file'),
  };

  const rootDescribeBlock: LikeDescribeBlock<StubTestCaseMetadata> = {
    data: createTestCaseMetadata('describe_block'),
  };

  const describeBlock: LikeDescribeBlock<StubTestCaseMetadata> = {
    parent: rootDescribeBlock,
    data: createTestCaseMetadata('describe_block'),
  };

  const beforeAll = [createHookMetadata('beforeAll')];
  const beforeEach = [createHookMetadata('beforeEach')];
  const afterEach = [createHookMetadata('afterEach')];
  const afterAll = [createHookMetadata('afterAll')];

  return {
    beforeAll,
    beforeEach,
    afterEach,
    afterAll,
    *allInvocations(): Iterable<StubTestCaseMetadata> {
      yield* this.beforeAll;
      yield* this.beforeEach;
      if (this.fn) yield this.fn;
      yield* this.afterEach;
      yield* this.afterAll;
    },
    definition: {
      data: createTestCaseMetadata('test_definition'),
      describeBlock,
    },
    file: testFile,
    fn: { data: createTestCaseMetadata('test_fn_invocation') },
    data: createTestCaseMetadata('test_invocation'),
  };
}

const STAGES: Stage[] = [
  'scheduled',
  'running',
  'finished',
  'pending',
  'interrupted',
];
const STATUSES: Status[] = ['passed', 'skipped', 'unknown', 'failed', 'broken'];

function castStart(scope: Scope): number {
  return toNumber(scope);
}

function castStop(scope: Scope): number {
  return 100 + toNumber(scope);
}

function castStage(scope: Scope): Stage {
  const index = toNumber(scope) % 5;
  return STAGES[index];
}

function castStatus(scope: Scope): Status {
  const index = toNumber(scope) % 5;
  return STATUSES[index];
}

function castWorkerId(scope: Scope): string {
  return String(toNumber(scope));
}

function toNumber(scope: Scope): number {
  return SCOPE_NUMBERS[scope];
}
