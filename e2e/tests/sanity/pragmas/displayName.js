describe('Test suite', () => {
  /**
   * @displayName Custom "beforeEach" hook
   */
  beforeEach(() => {
    // Hooks can be renamed too
  });

  /**
   * @displayName 1 + 1 = 2
   */
  test('First test', () => {
    expect(1 + 1).toBe(2);
  });

  /**
   * @displayName 2 + 2 = 3
   */
  test('Second test', () => {
    expect(2 + 2).toBe(3);
  });
});
