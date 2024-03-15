// eslint-disable-next-line node/no-unpublished-import
import type TypeScript from 'typescript';

import { FileNavigatorCache } from '../utils';

const sourceFileMap = new Map<
  string,
  Promise<TypeScript.SourceFile | undefined>
>();

export function ensureTypeScriptAST(
  ts: typeof TypeScript,
  filePath: string,
): Promise<TypeScript.SourceFile | undefined> {
  if (!sourceFileMap.has(filePath)) {
    sourceFileMap.set(filePath, parseFile(ts, filePath));
  }

  return sourceFileMap.get(filePath)!;
}

async function parseFile(
  ts: typeof TypeScript,
  filePath: string,
): Promise<TypeScript.SourceFile | undefined> {
  const { sourceCode } = await FileNavigatorCache.instance.resolve(filePath);
  return sourceCode
    ? ts.createSourceFile(filePath, sourceCode, ts.ScriptTarget.Latest, true)
    : undefined;
}
