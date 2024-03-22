import path from 'node:path';

import type {
  ExtractorContext,
  Label,
  Link,
  ReporterConfig,
  TestCasePropertyCustomizer,
  TestFileExtractorContext,
} from 'jest-allure2-reporter';

import {getStatusDetails, isDefined} from '../../utils';
import { labels } from '../compose-options';
import { composeExtractors, last } from '../extractors';

const all = <T>(context: ExtractorContext<T>) => context.value;

export const testFile: ReporterConfig['testFile'] = {
  hidden: ({ testFile }) => !testFile.testExecError,
  $: ({ $ }) => $,
  historyId: ({ filePath }) => filePath.join('/'),
  name: ({ filePath }) => filePath.join(path.sep),
  fullName: ({ globalConfig, testFile }) =>
    path.relative(globalConfig.rootDir, testFile.testFilePath),
  description: async ({ $, testFileMetadata }) => {
    const text = testFileMetadata.description?.join('\n') ?? '';
    const code = await $.extractSourceCode(testFileMetadata);
    return [text, $.sourceCode2Markdown(code)].filter(isDefined).join('\n\n');
  },
  descriptionHtml: ({ testFileMetadata }) =>
    testFileMetadata.descriptionHtml?.join('\n'),
  start: ({ testFileMetadata }) => testFileMetadata.start,
  stop: ({ testFileMetadata }) => testFileMetadata.stop,
  stage: ({ testFile }) =>
    testFile.testExecError == null ? 'finished' : 'interrupted',
  status: ({ testFile }) =>
    testFile.testExecError == null ? 'passed' : 'broken',
  statusDetails: ({ $, testFile }) =>
    $.stripAnsi(getStatusDetails(testFile.testExecError)),
  attachments: ({ testFileMetadata }) => testFileMetadata.attachments ?? [],
  parameters: ({ testFileMetadata }) => testFileMetadata.parameters ?? [],
  labels: labels({
    package: last,
    testClass: last,
    testMethod: last,
    parentSuite: last,
    subSuite: last,
    suite: () => '(test file execution)',
    thread: ({ testFileMetadata }) => testFileMetadata.workerId,
    severity: last,
    owner: last,
  } as TestCasePropertyCustomizer['labels']),
  links: ({ testFileMetadata }: TestFileExtractorContext<Link[]>) =>
    testFileMetadata.links ?? [],
};
