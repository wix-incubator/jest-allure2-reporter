import fs from 'node:fs';
import path from 'node:path';

import type { TestResult } from '@jest/reporters';
import type { Label, Link, StatusDetails } from '@noomorph/allure-js-commons';
import { Stage, Status } from '@noomorph/allure-js-commons';
import type {
  ExtractorContext,
  TestFileExtractorContext,
  ResolvedTestFileCustomizer,
  TestCaseCustomizer,
} from 'jest-allure2-reporter';

import {
  aggregateLabelCustomizers,
  composeExtractors,
  stripStatusDetails,
} from '../utils';

const identity = <T>(context: ExtractorContext<T>) => context.value;
const last = <T>(context: ExtractorContext<T[]>) => context.value?.at(-1);
const all = identity;

export const testFile: ResolvedTestFileCustomizer = {
  ignored: ({ testFile }) => !testFile.testExecError,
  historyId: ({ filePath }) => filePath.join('/'),
  name: () => '(generic suite error)',
  fullName: ({ testFile }) => testFile.testFilePath,
  description: ({ detectLanguage, testFile, testFileMetadata }) => {
    const text = testFileMetadata.description?.join('\n') ?? '';
    const contents = fs.readFileSync(testFile.testFilePath, 'utf8');
    const lang = detectLanguage?.(testFile.testFilePath, contents) ?? '';
    const fence = '```';
    const code = `${fence}${lang}\n${contents}\n${fence}`;
    return [text, code].filter(Boolean).join('\n\n');
  },
  descriptionHtml: () => void 0,
  start: ({ testFileMetadata }) => testFileMetadata.start,
  stop: ({ testFileMetadata }) => testFileMetadata.stop,
  stage: () => Stage.FINISHED,
  status: ({ testFile }: TestFileExtractorContext) =>
    testFile.testExecError ? Status.BROKEN : Status.PASSED,
  statusDetails: ({ testFile }) =>
    stripStatusDetails(getTestFileStatusDetails(testFile)),
  attachments: ({ testFileMetadata }) => testFileMetadata.attachments ?? [],
  parameters: ({ testFileMetadata }) => testFileMetadata.parameters ?? [],
  labels: composeExtractors<Label[], TestFileExtractorContext<Label[]>>(
    aggregateLabelCustomizers({
      package: last,
      testClass: last,
      testMethod: last,
      parentSuite: last,
      suite: ({ testFile }) => path.basename(testFile.testFilePath),
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

function getTestFileStatusDetails(
  testFile: TestResult,
): StatusDetails | undefined {
  const message =
    testFile.testExecError?.stack ?? `${testFile.testExecError ?? ''}`;

  return message
    ? stripStatusDetails({
        message: message.split('\n', 2).join('\n'),
        trace: message,
      })
    : undefined;
}
