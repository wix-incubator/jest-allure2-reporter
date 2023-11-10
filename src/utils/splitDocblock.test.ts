/* eslint-disable unicorn/prevent-abbreviations */

import { splitDocblock } from './splitDocblock';

describe('splitDocblock', () => {
  it('should split a docblock from code', function testFunction() {
    /**
     * @severity blocker
     * @issue 123
     */

    const [docblock, code] = splitDocblock(testFunction.toString());
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
    const [docblock, code] = splitDocblock(testFunction.toString());
    expect(docblock).toBe('');
    expect(code).toBe(testFunction.toString());
  });
});
