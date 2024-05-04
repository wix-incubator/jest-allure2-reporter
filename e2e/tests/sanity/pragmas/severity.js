/**
 * @severity critical
 */
describe('Test suite', () => {
  test('Important test 1', () => {
    expect(1 + 1).toBe(2);
  });

  test('Important test 2', () => {
    expect(2 + 2).toBe(4);
  });

  /**
   * @severity trivial
   */
  test('Unimportant test', () => {
    expect(true).toBe(true);
  });
});
