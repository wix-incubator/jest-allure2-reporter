const { describe, expect, test } = require('@jest/globals');

describe('Test suite', () => {
  $HistoryId('HISTORY-1')
  test('First test', () => {
    expect(2 + 2).toBe(3);
  });

  $HistoryId('HISTORY-1')
  test('Considered as repetition of the first test', () => {
    // Open "Retries" tab in the report to see the history of this test
    expect(1 + 1).toBe(2);
  });
});
