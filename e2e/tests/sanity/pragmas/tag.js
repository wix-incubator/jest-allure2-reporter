/**
 * @tag docblock, arithmetic
 */

const { describe, expect, test } = require('@jest/globals');

describe('Test suite', () => {
  /**
   * @tag addition
   */
  test('First test', () => {
    expect(1 + 1).toBe(2);
  });

  /**
   * @tag division
   */
  test('Second test', () => {
    expect(3 / 2).toBe(1.5);
  });
});
