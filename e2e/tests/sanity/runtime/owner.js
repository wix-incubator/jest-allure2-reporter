const { describe, expect, test } = require('@jest/globals');

allure.owner('John Doe');

describe('Suite maintained by John', () => {
  test('First test', () => {
    // John maintains this test
  });

  test('Second test', () => {
    // John maintains this test too
  });

  test('Third test', () => {
    allure.owner('Jane Doe')
    // Unlike the other tests, Jane maintains this one
  });
});
