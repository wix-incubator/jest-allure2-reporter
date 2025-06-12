const { describe, expect, test } = require('@jest/globals');

describe('Test suite', () => {
  test.concurrent('First test', () => {
    allure.thread('T1');
    expect(1 + 1).toBe(2);
  });

  test.concurrent('Second test', () => {
    allure.thread('T2');
    expect(3 / 2).toBe(1.5);
  });
});
