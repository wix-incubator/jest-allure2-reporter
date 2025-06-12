const { describe, expect, test } = require('@jest/globals');

describe('Test suite', () => {
  /**
   * @fullName Arithmetic > Addition > Valid assertion
   */
  test('First test', () => {
    expect(1 + 1).toBe(2);
  });

  /**
   * @fullName Arithmetic > Addition > Invalid assertion
   */
  test('Second test', () => {
    expect(2 + 2).toBe(3);
  });
});
