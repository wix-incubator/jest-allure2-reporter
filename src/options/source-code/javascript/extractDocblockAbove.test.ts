import { FileNavigator } from '../../../utils';

import { extractDocblockAbove as extractJsDocument_ } from './extractDocblockAbove';

const FIXTURES = [
  `\
/**
 * This is a multiline docblock
 */`,
  '  /** This is a single line docblock */',
  `/**
 * This is a broken docblock
   * but it's still a docblock
*/`,
  `/**
    * This is a weird two-line docblock */`,
  `/*
    * This is not a docblock
    */`,
].map((sourceCode) => sourceCode + '\n' + 'function test() {}\n');

describe('extractJsDoc', () => {
  const extract = (index: number, line: number) =>
    extractJsDocument_(new FileNavigator(FIXTURES[index]), line);

  it('should extract a multiline docblock', () => expect(extract(0, 4)).toMatchSnapshot());

  it('should extract a single line docblock', () => expect(extract(1, 2)).toMatchSnapshot());

  it('should extract a broken docblock', () => expect(extract(2, 5)).toMatchSnapshot());

  it('should extract a weird two-line docblock', () => expect(extract(3, 3)).toMatchSnapshot());

  it('should not extract a non-docblock', () => expect(extract(4, 4)).toMatchSnapshot());

  it('should ignore out of range line index', () => expect(extract(0, 5)).toBe(''));

  it('should ignore zero line index', () => expect(extract(0, 0)).toBe(''));

  it('should ignore the middle of a docblock', () => expect(extract(0, 2)).toBe(''));
});
