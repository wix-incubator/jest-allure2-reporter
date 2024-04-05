import path from 'node:path';

import type {
  TestCaseCustomizer,
  TestFileExtractorContext,
} from 'jest-allure2-reporter';

import { getStatusDetails, isNonNullish } from '../../utils';
import * as custom from '../custom';
import { compose2 } from '../common';

export const testFile: TestCaseCustomizer<TestFileExtractorContext> = {
  ignored: ({ testFile }) => !testFile.testExecError,
  historyId: ({ filePath }) => filePath.join('/'),
  displayName: ({ filePath }) => filePath.join(path.sep),
  fullName: ({ globalConfig, testFile }) =>
    path.relative(globalConfig.rootDir, testFile.testFilePath),
  description: async ({ $, testFileMetadata }) => {
    const text = testFileMetadata.description?.join('\n') ?? '';
    const code = await $.extractSourceCode(testFileMetadata);
    return [text, $.source2markdown(code)].filter(isNonNullish).join('\n\n');
  },
  descriptionHtml: async ({ $, result }) =>
    $.markdown2html?.((await result.description) ?? '') ?? '',
  start: ({ testFileMetadata }) => testFileMetadata.start!,
  stop: ({ testFileMetadata }) => testFileMetadata.stop!,
  stage: ({ testFile }) => (testFile.testExecError == null ? 'finished' : 'interrupted'),
  status: ({ testFile }) => (testFile.testExecError == null ? 'passed' : 'broken'),
  statusDetails: ({ $, testFile }) => $.stripAnsi(getStatusDetails(testFile.testExecError)),
  attachments: ({ testFileMetadata }) => testFileMetadata.attachments ?? [],
  parameters: ({ testFileMetadata }) => testFileMetadata.parameters ?? [],
  labels: compose2(
    custom.labels<TestFileExtractorContext>({
      suite: () => '(test file execution)',
      thread: ({ testFileMetadata }) => testFileMetadata.workerId,
    }),
    ({ testFileMetadata }) => testFileMetadata.labels ?? [],
  ),
  links: ({ testFileMetadata }) => testFileMetadata.links ?? [],
};