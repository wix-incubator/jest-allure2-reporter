/**
 * ### File-level description
 */

const { describe, expect, test } = require('@jest/globals');

describe('Test suite', () => {
  /**
   * Custom "beforeEach" hook
   */
  beforeEach(() => {
    // Comments over the hooks change their display names
  });

  /**
   * Demonstrates a **passing** test case
   */
  test('First test', () => {
    // Comments over the tests add descriptions
    expect(1 + 1).toBe(2);
  });

  /**
   * Demonstrates a **failing** test case
   */
  test('Second test', () => {
    // Comments over the tests add descriptions
    expect(2 + 2).toBe(3);
  });
});
