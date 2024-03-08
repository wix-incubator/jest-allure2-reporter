/// <reference path="augs.d.ts" />

import fs from 'node:fs/promises';

import type {
  AllureTestItemSourceLocation,
  Plugin,
  PluginConstructor,
} from 'jest-allure2-reporter';

export const sourceCodePlugin: PluginConstructor = () => {
  const plugin: Plugin = {
    name: 'jest-allure2-reporter/plugins/source-code',

    async onTestFileStart({ test, testFileMetadata }) {
      testFileMetadata.sourceCode = await fs.readFile(test.path, 'utf8');
    },

    async onTestCaseResult({ testCaseMetadata }) {
      await getSourceCode(testCaseMetadata.sourceLocation);
    },
  };

  let lastFilePath: string | undefined;
  let lastFileContent: string | undefined;

  async function getSourceCode(
    location?: AllureTestItemSourceLocation,
  ): Promise<string | undefined> {
    if (location && location.fileName && Number.isFinite(location.lineNumber)) {
      const fileContent = await getTestFileSourceCode(location.fileName);
      if (fileContent) {
        return extractByLineAndColumn(
          fileContent,
          location.lineNumber!,
          location.columnNumber,
        );
      }
    }

    return;
  }

  async function getTestFileSourceCode(
    testFilePath: string,
  ): Promise<string | undefined> {
    if (lastFilePath !== testFilePath) {
      lastFilePath = testFilePath;
      if (await fs.access(testFilePath).catch(() => false)) {
        lastFileContent = await fs.readFile(testFilePath, 'utf8');
      }
    }

    return lastFileContent;
  }

  async function extractByLineAndColumn(
    fileContent: string,
    lineNumber: number,
    columnNumber = 1,
  ): Promise<string | undefined> {
    const lines = fileContent.split('\n');
    if (lineNumber > 0 && lineNumber <= lines.length) {
      const line = lines[lineNumber - 1];
      if (columnNumber > 0 && columnNumber <= line.length) {
        return line.slice(Math.max(0, columnNumber - 1));
      }
    }

    return;
  }

  return plugin;
};
