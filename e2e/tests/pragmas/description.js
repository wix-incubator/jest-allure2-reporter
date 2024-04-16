/**
 * @description
 * ### File-level description
 */

describe('Test suite', () => {
  /**
   * @description
   * Demonstrates a **passing** test case
   */
  test('First test', () => {
    expect(1 + 1).toBe(2);
  });

  /**
   * @description
   * Demonstrates a **failing** test case
   */
  test('Second test', () => {
    expect(2 + 2).toBe(3);
  });
});
