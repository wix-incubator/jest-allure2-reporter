// eslint-disable-next-line node/no-unpublished-import
import type TypeScript from 'typescript';

import { autoIndent } from './autoIndent';

export async function extractTypeScriptCode(
  ts: typeof TypeScript,
  ast: TypeScript.SourceFile | undefined,
  [lineNumber, columnNumber]: readonly [number | undefined, number | undefined],
  includeComments = false,
): Promise<string | undefined> {
  if (lineNumber == null || columnNumber == null || ast == null) {
    return;
  }

  const pos = ast.getPositionOfLineAndCharacter(
    lineNumber - 1,
    columnNumber - 1,
  );

  // TODO: find a non-private API for `getTouchingToken`
  const token = (ts as any).getTouchingToken(ast, pos) as TypeScript.Node;
  let node = token;
  while (
    node.kind !== ts.SyntaxKind.ExpressionStatement &&
    node !== token.parent.parent
  ) {
    node = node.parent;
  }
  const expression = node;
  if (includeComments) {
    const start = expression.getFullStart();
    return ast.text.slice(start, start + expression.getFullWidth());
  } else {
    return autoIndent(
      ast.text.slice(expression.getStart(), expression.getEnd()),
    );
  }
}
