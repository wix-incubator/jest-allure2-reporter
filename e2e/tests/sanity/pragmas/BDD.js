/**
 * @epic Arithmetic operations
 * @feature Addition
 */

const { describe, expect, test } = require('@jest/globals');

describe('Test suite', () => {
  /**
   * @story Sane assumptions
   */
  test('First test', () => {
    expect(1 + 1).toBe(2);
  });

  /**
   * @story Insane assumptions
   */
  test('Second test', () => {
    expect(2 + 2).toBe(3);
  });
});
