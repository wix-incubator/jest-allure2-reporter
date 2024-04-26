describe('Test suite', () => {
  test('First test', () => {
    allure.historyId('HISTORY-3');
    expect(2 + 2).toBe(3);
  });

  /** Open "Retries" tab in the report to see the history of this test */
  test('Considered as repetition of the first test', () => {
    allure.historyId('HISTORY-3');
    expect(1 + 1).toBe(2);
  });
});
