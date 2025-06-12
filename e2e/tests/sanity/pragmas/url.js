/**
 * @url https://en.wikipedia.org/wiki/Arithmetic 🔢 Arithmetic
 */

const { describe, expect, test } = require('@jest/globals');

describe('Arithmetics', () => {
  /**
   * @url https://en.wikipedia.org/wiki/Addition ➕ Addition
   */
  test('1 + 1 = 2', () => {
    expect(1 + 1).toBe(2);
  });

  /**
   * @url https://en.wikipedia.org/wiki/Division_(mathematics) ➗ Division
   */
  test('3 / 2 = 1.5', () => {
    expect(3 / 2).toBe(1.5);
  });
});
