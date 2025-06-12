const { describe, expect, test } = require('@jest/globals');

describe('Test suite', () => {
  $Thread('T1')
  test.concurrent('First test', () => {
    expect(1 + 1).toBe(2);
  });

  $Thread('T2')
  test.concurrent('Second test', () => {
    expect(3 / 2).toBe(1.5);
  });
});
