describe('Test suite', () => {
  /**
   * @thread T1
   */
  test.concurrent('First test', () => {
    expect(1 + 1).toBe(2);
  });

  /**
   * @thread T2
   */
  test.concurrent('Second test', () => {
    expect(3 / 2).toBe(1.5);
  });
});
