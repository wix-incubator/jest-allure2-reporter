import path from 'node:path';

import type {
  ExtractorContext,
  Label,
  Link,
  ResolvedTestFileCustomizer,
  TestCaseCustomizer,
  TestFileExtractorContext,
} from 'jest-allure2-reporter';

import { getStatusDetails } from '../../utils';
import {
  aggregateLabelCustomizers,
  composeExtractors,
  stripStatusDetails,
} from '../utils';

const identity = <T>(context: ExtractorContext<T>) => context.value;
const last = <T>(context: ExtractorContext<T[]>) => context.value?.at(-1);
const all = identity;

export const testFile: ResolvedTestFileCustomizer = {
  hidden: ({ testFile }) => !testFile.testExecError,
  historyId: ({ filePath }) => filePath.join('/'),
  name: ({ filePath }) => filePath.join(path.sep),
  fullName: ({ globalConfig, testFile }) =>
    path.relative(globalConfig.rootDir, testFile.testFilePath),
  description: async ({ $, testFileMetadata }) => {
    const text = testFileMetadata.description?.join('\n') ?? '';
    const code = await $.extractSourceCode(testFileMetadata);
    return [text, $.sourceCode2Markdown(code)].filter(Boolean).join('\n\n');
  },
  descriptionHtml: ({ testFileMetadata }) =>
    testFileMetadata.descriptionHtml?.join('\n'),
  start: ({ testFileMetadata }) => testFileMetadata.start,
  stop: ({ testFileMetadata }) => testFileMetadata.stop,
  stage: ({ testFile }) =>
    testFile.testExecError == null ? 'finished' : 'interrupted',
  status: ({ testFile }) =>
    testFile.testExecError == null ? 'passed' : 'broken',
  statusDetails: ({ testFile }) =>
    stripStatusDetails(getStatusDetails(testFile.testExecError)),
  attachments: ({ testFileMetadata }) => testFileMetadata.attachments ?? [],
  parameters: ({ testFileMetadata }) => testFileMetadata.parameters ?? [],
  labels: composeExtractors<Label[], TestFileExtractorContext<Label[]>>(
    aggregateLabelCustomizers({
      package: last,
      testClass: last,
      testMethod: last,
      parentSuite: last,
      subSuite: last,
      suite: () => '(test file execution)',
      epic: all,
      feature: all,
      story: all,
      thread: ({ testFileMetadata }) => testFileMetadata.workerId,
      severity: last,
      tag: all,
      owner: last,
    } as TestCaseCustomizer['labels']),
    ({ testFileMetadata }) => testFileMetadata.labels ?? [],
  ),
  links: ({ testFileMetadata }: TestFileExtractorContext<Link[]>) =>
    testFileMetadata.links ?? [],
};
