describe('Test suite', () => {
  /**
   * @historyId HISTORY-2
   */
  test('First test', () => {
    expect(2 + 2).toBe(3);
  });

  /**
   * Open "Retries" tab in the report to see the history of this test
   *
   * @historyId HISTORY-2
   */
  test('Considered as repetition of the first test', () => {
    // Open "Retries" tab in the report to see the history of this test
    expect(1 + 1).toBe(2);
  });
});
