/// <reference path="augs.d.ts" />

import fs from 'node:fs/promises';

import type {
  AllureTestItemMetadata,
  Plugin,
  PluginConstructor,
} from 'jest-allure2-reporter';
// eslint-disable-next-line node/no-unpublished-import
import type ts from 'typescript';

export const sourceCodePlugin: PluginConstructor = () => {
  const promises: Promise<unknown>[] = [];
  // eslint-disable-next-line node/no-unpublished-import,import/no-extraneous-dependencies
  const tsPromise = import('typescript').catch(() => null);
  const sourceCodeMap = new Map<string, string>();
  const sourceFileMap = new Map<string, ts.SourceFile>();

  async function ensureSourceCode(filePath: string): Promise<string> {
    if (!sourceCodeMap.has(filePath)) {
      sourceCodeMap.set(filePath, await fs.readFile(filePath, 'utf8'));
    }

    return sourceCodeMap.get(filePath)!;
  }

  async function ensureSourceFile(
    filePath: string,
  ): Promise<ts.SourceFile | undefined> {
    if (sourceFileMap.has(filePath)) {
      return sourceFileMap.get(filePath);
    }

    const ts = await tsPromise;
    if (ts) {
      const sourceCode = await ensureSourceCode(filePath);
      const sourceFile = ts.createSourceFile(
        filePath,
        sourceCode,
        ts.ScriptTarget.Latest,
        true,
      );
      sourceFileMap.set(filePath, sourceFile);
      return sourceFile;
    }

    return;
  }

  async function getSourceCode({
    fileName,
    lineNumber,
    columnNumber = 1,
  }: AllureTestItemMetadata['sourceLocation'] = {}) {
    if (!fileName || lineNumber == null) {
      return;
    }

    const ts = await tsPromise;
    if (!ts) {
      return;
    }

    const sourceFile = await ensureSourceFile(fileName);
    if (!sourceFile) {
      return;
    }

    const pos = sourceFile.getPositionOfLineAndCharacter(
      lineNumber - 1,
      columnNumber - 1,
    );
    // TODO: find a non-private API for `getTouchingToken`
    const token = (ts as any).getTouchingToken(sourceFile, pos) as ts.Node;
    let node = token;
    while (
      node.kind !== ts.SyntaxKind.ExpressionStatement &&
      node !== token.parent.parent
    ) {
      node = node.parent;
    }
    const expression = node;
    const start = expression.getFullStart();
    const end = start + expression.getFullWidth();
    return sourceFile.text.slice(start, end);
  }

  const plugin: Plugin = {
    name: 'jest-allure2-reporter/plugins/source-code',

    async onTestFileStart(context) {
      promises.push(ensureSourceFile(context.test.path));
    },

    async onTestCaseResult({ testCaseMetadata }) {
      const filePath = testCaseMetadata.sourceLocation?.fileName;
      if (!filePath) {
        return;
      }

      // TODO: promise optimization can be improved
      await Promise.allSettled(promises);
      testCaseMetadata.sourceCode =
        (await getSourceCode(testCaseMetadata.sourceLocation)) ??
        testCaseMetadata.sourceCode;
    },
  };

  return plugin;
};
