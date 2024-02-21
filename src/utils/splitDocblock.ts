/* eslint-disable unicorn/prevent-abbreviations */

const DOCBLOCK_REGEXP = /\s*\/\*\*[\S\s]*?\*\//m;

export function splitDocblock(rawCode: string): [string, string] {
  let docblock = '';
  const code = rawCode.replace(DOCBLOCK_REGEXP, (match) => {
    docblock = match.trim();
    return '';
  });

  return [docblock, code];
}
