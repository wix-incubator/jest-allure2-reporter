/**
 * @descriptionHtml
 * <h3>File-level description</h3>
 */

describe('Test suite', () => {
  /**
   * @descriptionHtml
   * Demonstrates a <b>passing</b> test case
   */
  test('First test', () => {
    expect(1 + 1).toBe(2);
  });

  /**
   * @descriptionHtml
   * Demonstrates a <b>failing</b> test case
   */
  test('Second test', () => {
    expect(2 + 2).toBe(3);
  });
});
