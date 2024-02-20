/* eslint-disable unicorn/prevent-abbreviations */

import { splitDocblock } from './splitDocblock';

describe('splitDocblock', () => {
  it('should split a docblock from code', function testFunction() {
    /**
     * @severity blocker
     * @issue 123
     */

    const [docblock, code] = splitDocblock(asTest(testFunction), 'function');
    const docblockLines = docblock
      .split('\n')
      .map((s) => s.trimStart())
      .filter(Boolean);

    expect(docblockLines).toEqual([
      '/**',
      '* @severity blocker',
      '* @issue 123',
      '*/',
    ]);

    expect(code.includes(docblock)).toBe(false);
  });

  it('should return an empty docblock if code has no such', function testFunction() {
    const [docblock, code] = splitDocblock(asTest(testFunction), 'function');
    expect(docblock).toBe('');
    expect(code).toBe(asTest(testFunction));
  });

  it('should find a docblock if it is at the beginning of the file', () => {
    const theDocBlock = `
    /**
     * @severity blocker
     * @issue 123
     */
     // something else
     `.trim();
    const [docblock, code] = splitDocblock(theDocBlock, 'file');
    expect(theDocBlock.startsWith(docblock)).toBe(true);
    expect(code.trim()).toBe('// something else');
    expect(docblock.includes(code)).toBe(false);
  });

  function asTest(fn: Function) {
    return `it("some test", ${fn})`;
  }
});
