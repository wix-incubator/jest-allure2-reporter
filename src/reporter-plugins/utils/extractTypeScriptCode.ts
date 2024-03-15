// eslint-disable-next-line node/no-unpublished-import
import type TypeScript from 'typescript';

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

function autoIndent(text: string) {
  const [first, ...rest] = text.split('\n');
  const indent = detectIndent(rest);
  if (indent > 0) {
    return [first, ...rest.map((line) => line.slice(indent))].join('\n');
  }

  return text;
}

function detectIndent(lines: string[]) {
  return lines.reduce((indent, line) => {
    const size = line.length - line.trimStart().length;
    return size < indent ? size : indent;
  }, Number.POSITIVE_INFINITY);
}
