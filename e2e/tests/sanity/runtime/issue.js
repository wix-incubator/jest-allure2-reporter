const { describe, expect, test } = require('@jest/globals');

describe('Regression tests', () => {
  test('Proving the fix', () => {
    allure.issue('XMLRPC-15');
    expect(1 + 1).toBe(2);
  });

  test.failing('Demonstrating an existing bug', () => {
    allure.issue('XMLRPC-16');
    expect(2 + 2).toBe(3);
  });
});
