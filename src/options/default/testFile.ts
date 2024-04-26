import path from 'node:path';

import type { TestCaseCustomizer, TestFileExtractorContext } from 'jest-allure2-reporter';

import { getStatusDetails, isNonNullish } from '../../utils';
import * as custom from '../custom';
import { compose2 } from '../common';

export const testFile: TestCaseCustomizer<TestFileExtractorContext> = {
  ignored: ({ testFile }) => !testFile.testExecError,
  historyId: ({ testFileMetadata, result }) => testFileMetadata.historyId ?? result.fullName,
  displayName: ({ testFileMetadata, filePath }) =>
    testFileMetadata.displayName ?? filePath.join(path.sep),
  fullName: ({ filePath }) => filePath.join('/'),
  description: async ({ $, testFileMetadata }) => {
    const text = testFileMetadata.description?.join('\n') ?? '';
    const code = await $.extractSourceCode(testFileMetadata);
    return [text, $.source2markdown(code)].filter(isNonNullish).join('\n\n');
  },
  descriptionHtml: async ({ $, testFileMetadata, result }) => {
    const html = testFileMetadata.descriptionHtml?.join('\n\n') ?? '';
    const md2html = (await $.markdown2html?.((await result.description) ?? '')) ?? '';
    return [html, md2html].filter(isNonNullish).join('\n\n');
  },
  start: ({ testFileMetadata }) => testFileMetadata.start!,
  stop: ({ testFileMetadata }) => testFileMetadata.stop!,
  stage: ({ testFileMetadata, testFile }) =>
    testFileMetadata.stage ?? (testFile.testExecError == null ? 'finished' : 'interrupted'),
  status: ({ testFileMetadata, testFile }) => testFileMetadata.status ?? getStatus(testFile),
  statusDetails: ({ $, testFile, testFileMetadata }) =>
    testFileMetadata.statusDetails ?? $.stripAnsi(getStatusDetails(testFile.testExecError)),
  attachments: ({ testFileMetadata }) => testFileMetadata.attachments ?? [],
  parameters: ({ testFileMetadata }) => testFileMetadata.parameters ?? [],
  labels: compose2(
    custom.labels<TestFileExtractorContext>({
      suite: '(test file execution)',
    }),
    ({ testFileMetadata }) => testFileMetadata.labels ?? [],
  ),
  links: ({ testFileMetadata }) => testFileMetadata.links ?? [],
};

function getStatus(testFile: TestFileExtractorContext['testFile']) {
  if (testFile.testExecError != null) {
    return 'broken';
  }

  return testFile.numFailingTests > 0 ? 'failed' : 'passed';
}
