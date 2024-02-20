// eslint-disable-next-line import/no-extraneous-dependencies
import { parseExpression } from '@babel/parser';

const DOCBLOCK_REGEXP = /^\/\*\*[\S\s]*?\*\//m;

export function splitDocblock(
  rawCode: string,
  mode: 'file' | 'function',
): [string, string] {
  const trimmedCode = (
    mode === 'file' ? rawCode : getFunctionBody(rawCode)
  ).trimStart();

  const docblock = trimmedCode.match(DOCBLOCK_REGEXP)?.[0] ?? '';
  return docblock
    ? [docblock, rawCode.replace(docblock, '').trimStart()]
    : ['', rawCode];
}

function getFunctionBody(raw: string) {
  if (!raw.includes('/**')) {
    return raw;
  }

  try {
    const node = parseExpression(raw) as any; // CallExpression
    const {
      body: { start, end },
    } = node.arguments.find(
      (expression: any) =>
        expression.body &&
        (expression.type === 'FunctionExpression' ||
          expression.type === 'ArrowFunctionExpression'),
    );
    if (typeof start === 'number' && typeof end === 'number') {
      return raw.slice(start + 1, end - 1);
    }
    return '';
  } catch {
    // TODO: log parsing error
    return '';
  }
}
