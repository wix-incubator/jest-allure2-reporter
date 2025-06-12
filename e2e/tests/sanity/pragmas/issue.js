const { describe, expect, test } = require('@jest/globals');

describe('Regression tests', () => {
  /**
   * @issue XMLRPC-15
   */
  test('Proving the fix', () => {
    expect(1 + 1).toBe(2);
  });

  /**
   * @issue XMLRPC-16
   */
  test.failing('Demonstrating an existing bug', () => {
    expect(2 + 2).toBe(3);
  });
});
